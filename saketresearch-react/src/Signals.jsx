import {useEffect,useMemo,useRef,useState} from 'react';
import {Reveal,Tilt,Ring,RM,Tags,Count,useSeen} from './ui.jsx';
import {SIGNALS} from './data.js';

/* ============ Synthetic EEG + real DSP, computed in the browser ============ */
const FS=256,N=512;                       // 256 Hz sampling, 2 second window
const BANDS=[
  {k:'delta',sym:'δ',name:'Delta',rng:'0.5–4 Hz',f:2,a:1.0,col:'#60a5fa'},
  {k:'theta',sym:'θ',name:'Theta',rng:'4–8 Hz',f:6,a:.6,col:'#22d3ee'},
  {k:'alpha',sym:'α',name:'Alpha',rng:'8–13 Hz',f:10,a:.8,col:'#34d399'},
  {k:'beta',sym:'β',name:'Beta',rng:'13–30 Hz',f:20,a:.45,col:'#fbbf24'},
  {k:'gamma',sym:'γ',name:'Gamma',rng:'30+ Hz',f:40,a:.35,col:'#f472b6'}];
const FILTERS=[{k:'off',name:'No filter'},{k:'bp',name:'Band-pass 1–45 Hz',lo:1,hi:45},{k:'gamma',name:'Isolate gamma 30–80 Hz',lo:30,hi:80}];
const bandOf=hz=>hz<4?BANDS[0]:hz<8?BANDS[1]:hz<13?BANDS[2]:hz<30?BANDS[3]:BANDS[4];

const rnd=(a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296})(7);
const NOISE=Float32Array.from({length:N},()=>(rnd()+rnd()+rnd()-1.5)*1.6);
const COS=Float32Array.from({length:N},(_,i)=>Math.cos(2*Math.PI*i/N)),SIN=Float32Array.from({length:N},(_,i)=>Math.sin(2*Math.PI*i/N));
const HANN=Float32Array.from({length:N},(_,i)=>.5-.5*Math.cos(2*Math.PI*i/N));

function compose(on,burst,noise){const s=new Float32Array(N);
  for(let n=0;n<N;n++){const t=n/FS;let v=0;
    for(const b of BANDS)if(on[b.k])v+=b.a*Math.sin(2*Math.PI*b.f*t+b.f);
    if(burst){const c=t-1.2;v+=1.1*Math.exp(-c*c/(2*.09*.09))*Math.sin(2*Math.PI*(44+10*c)*t)}
    s[n]=v+noise*NOISE[n]}
  return s}

function dft(x){const K=N/2+1,re=new Float32Array(K),im=new Float32Array(K);
  for(let k=0;k<K;k++){let a=0,b=0;for(let n=0;n<N;n++){const i=(k*n)%N;a+=x[n]*COS[i];b-=x[n]*SIN[i]}re[k]=a;im[k]=b}
  return{re,im}}

function bandpass(x,lo,hi){const{re,im}=dft(x),K=re.length,y=new Float32Array(N);
  for(let k=0;k<K;k++){const hz=k*FS/N;if(hz<lo||hz>hi){re[k]=0;im[k]=0}}
  for(let n=0;n<N;n++){let v=re[0];for(let k=1;k<K-1;k++){const i=(k*n)%N;v+=2*(re[k]*COS[i]-im[k]*SIN[i])}
    v+=re[K-1]*(n%2?-1:1);y[n]=v/N}
  return y}

function spectrum(x){const w=new Float32Array(N);for(let n=0;n<N;n++)w[n]=x[n]*HANN[n];
  const{re,im}=dft(w),out=[];for(let k=1;k<=128;k++)out.push(Math.hypot(re[k],im[k])*4/N);return out}  // amplitude, 0.5-64 Hz

/* Morlet continuous wavelet transform (periodic boundary so the looping window has no edge artefacts) */
const FREQS=Array.from({length:40},(_,i)=>2*Math.pow(30,i/39));   // 2 → 60 Hz, log-spaced
function cwt(x){const out=new Float32Array(FREQS.length*N);
  FREQS.forEach((f,fi)=>{const s=6/(2*Math.PI*f)*FS,L=Math.min(Math.ceil(3*s),N/2-1),wr=new Float32Array(2*L+1),wi=new Float32Array(2*L+1);
    for(let j=-L;j<=L;j++){const e=Math.exp(-j*j/(2*s*s)),ph=2*Math.PI*f*j/FS;wr[j+L]=e*Math.cos(ph);wi[j+L]=e*Math.sin(ph)}
    const nm=1/s;
    for(let n=0;n<N;n++){let a=0,b=0;for(let j=-L;j<=L;j++){const v=x[(n+j+N)%N];a+=v*wr[j+L];b+=v*wi[j+L]}out[fi*N+n]=(a*a+b*b)*nm}});
  return out}

const STOPS=[[6,8,24],[44,26,118],[124,44,172],[232,72,132],[251,191,36],[255,248,214]];
function cmap(t){t=Math.max(0,Math.min(1,t))*(STOPS.length-1);const i=Math.min(STOPS.length-2,t|0),f=t-i,a=STOPS[i],b=STOPS[i+1];
  return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f]}

/* ============ Signal Studio ============ */
function Studio(){
  const[on,setOn]=useState({delta:true,theta:true,alpha:true,beta:true,gamma:true}),[burst,setBurst]=useState(true),[noise,setNoise]=useState(.4),
    [filt,setFilt]=useState('off'),[play,setPlay]=useState(true);
  const raw=useMemo(()=>compose(on,burst,noise),[on,burst,noise]);
  const sig=useMemo(()=>{const f=FILTERS.find(f=>f.k===filt);return f.lo?bandpass(raw,f.lo,f.hi):raw},[raw,filt]);
  const psd=useMemo(()=>spectrum(sig),[sig]);
  const cw=useMemo(()=>cwt(sig),[sig]);
  const tr=useRef(),sc=useRef(),ps=useRef(),cur=useRef(),live=useRef({});
  live.current={raw,sig,filt,play};

  /* scalogram */
  useEffect(()=>{const cv=sc.current,x=cv.getContext('2d'),oc=document.createElement('canvas');oc.width=N;oc.height=FREQS.length;
    const ox=oc.getContext('2d'),im=ox.createImageData(N,FREQS.length);let mx=1e-9;for(let i=0;i<cw.length;i++)mx=Math.max(mx,cw[i]);
    const ref=Math.max(mx,6);                                  // fixed floor so quiet signals don't get auto-stretched
    for(let fi=0;fi<FREQS.length;fi++)for(let n=0;n<N;n++){const v=(Math.log10(cw[fi*N+n]+1e-6)-Math.log10(ref*1e-3))/3,[r,g,b]=cmap(v),o=((FREQS.length-1-fi)*N+n)*4;
      im.data[o]=r;im.data[o+1]=g;im.data[o+2]=b;im.data[o+3]=255}
    ox.putImageData(im,0,0);x.imageSmoothingEnabled=true;x.clearRect(0,0,cv.width,cv.height);x.drawImage(oc,0,0,cv.width,cv.height)},[cw]);

  /* power spectrum */
  useEffect(()=>{const cv=ps.current,x=cv.getContext('2d'),W=cv.width,H=cv.height;x.clearRect(0,0,W,H);
    x.strokeStyle='rgba(128,140,170,.25)';x.lineWidth=1;for(let i=1;i<4;i++){x.beginPath();x.moveTo(0,H*i/4);x.lineTo(W,H*i/4);x.stroke()}
    const bw=W/psd.length;psd.forEach((a,i)=>{const hz=(i+1)*.5,h=Math.min(1,Math.sqrt(a/1.2))*(H-6);x.fillStyle=bandOf(hz).col;x.globalAlpha=.9;
      x.beginPath();x.roundRect?x.roundRect(i*bw+1,H-h,Math.max(1,bw-2),h,2):x.rect(i*bw+1,H-h,Math.max(1,bw-2),h);x.fill()});x.globalAlpha=1},[psd]);

  /* oscilloscope-style trace with a playhead shared with the scalogram */
  useEffect(()=>{const cv=tr.current,x=cv.getContext('2d'),W=cv.width,H=cv.height,rm=RM();let raf,head=rm?N-1:0,last=0;
    const path=a=>{const p=new Path2D();for(let i=0;i<N;i++){const X=i/(N-1)*W,Y=H/2-Math.max(-1.4,Math.min(1.4,a[i]/3.4))*H/2*.92;i?p.lineTo(X,Y):p.moveTo(X,Y)}return p};
    let cache={raw:null,sig:null,pr:null,ps:null};
    const frame=t=>{const L=live.current,light=document.documentElement.dataset.theme==='light',ink=light?'15,23,42':'232,237,255';
      if(cache.raw!==L.raw||cache.sig!==L.sig){cache={raw:L.raw,sig:L.sig,pr:path(L.raw),ps:path(L.sig)}}
      if(!rm&&L.play){head=(head+(t-(last||t))*.14)%N}last=t;
      x.clearRect(0,0,W,H);x.strokeStyle='rgba(128,140,170,.22)';x.lineWidth=1;for(let i=1;i<4;i++){x.beginPath();x.moveTo(0,H*i/4);x.lineTo(W,H*i/4);x.stroke()}
      if(L.filt!=='off'){x.strokeStyle=`rgba(${ink},.2)`;x.lineWidth=1.2;x.stroke(cache.pr)}
      x.strokeStyle=`rgba(${ink},${L.filt==='off'?.32:.22})`;x.lineWidth=1.4;x.stroke(L.filt==='off'?cache.pr:cache.ps);
      /* bright trail behind the playhead */
      const i1=head|0,i0=Math.max(0,i1-130);x.beginPath();x.lineWidth=2.6;x.shadowColor='#22d3ee';x.shadowBlur=10;
      const g=x.createLinearGradient((i0/(N-1))*W,0,(i1/(N-1))*W,0);g.addColorStop(0,'rgba(34,211,238,0)');g.addColorStop(1,'#22d3ee');x.strokeStyle=g;
      for(let i=i0;i<=i1;i++){const X=i/(N-1)*W,Y=H/2-Math.max(-1.4,Math.min(1.4,L.sig[i]/3.4))*H/2*.92;i===i0?x.moveTo(X,Y):x.lineTo(X,Y)}x.stroke();x.shadowBlur=0;
      if(cur.current)cur.current.style.left=(head/(N-1)*100)+'%';
      if(!rm)raf=requestAnimationFrame(frame)};
    raf=requestAnimationFrame(frame);return()=>cancelAnimationFrame(raf)},[]);

  const tog=k=>setOn(o=>({...o,[k]:!o[k]}));
  const note=filt==='gamma'?(burst||on.gamma?'Gamma isolated: only the 30–80 Hz activity remains, and the burst around 1.2 s stands out in the scalogram. This band-limited time-frequency view is the kind of input used in EEG-to-speech reconstruction.':'Gamma isolated, but no gamma activity is switched on, so almost nothing is left. Switch the gamma band or the burst back on.')
    :filt==='bp'?'Band-pass filtering removes the very slow drift and the high-frequency noise. Compare the power spectrum with and without it.'
    :'Each coloured bar in the power spectrum is a rhythm you switched on. The scalogram shows the same signal as time on the x-axis and frequency on the y-axis, so you can see when each rhythm is active.';
  return <Tilt className="studio">
    <div className="studio-head"><div><h3>EEG Signal Studio</h3><p className="muted small">A synthetic signal processed live in your browser: band-pass filtering, a DFT power spectrum and a Morlet wavelet transform. Simulated for illustration, not a real recording.</p></div>
      <button className="btn alt sm" onClick={()=>setPlay(p=>!p)} aria-pressed={!play}>{play?'⏸ Pause':'▶ Play'}</button></div>

    <div className="chipbar" role="group" aria-label="Frequency bands">{BANDS.map(b=><button key={b.k} className={'bchip'+(on[b.k]?' on':'')} style={{'--bc':b.col}} aria-pressed={on[b.k]} onClick={()=>tog(b.k)}><i/>{b.sym} {b.name}<small>{b.rng}</small></button>)}
      <button className={'bchip burst'+(burst?' on':'')} style={{'--bc':'#f472b6'}} aria-pressed={burst} onClick={()=>setBurst(b=>!b)}><i/>⚡ Gamma burst<small>at 1.2 s</small></button></div>

    <div className="studio-ctl"><label className="ctl">Noise <input type="range" min="0" max="1" step=".05" value={noise} onChange={e=>setNoise(+e.target.value)} aria-label="Noise level"/><span>{Math.round(noise*100)}%</span></label>
      <div className="seg" role="group" aria-label="Spectral filter">{FILTERS.map(f=><button key={f.k} className={filt===f.k?'on':''} aria-pressed={filt===f.k} onClick={()=>setFilt(f.k)}>{f.name}</button>)}</div></div>

    <div className="lab-label">Time series <span className="muted">· 2 s window</span></div>
    <div className="plot trace"><canvas ref={tr} width="1000" height="190" role="img" aria-label="Simulated EEG time series"/></div>

    <div className="lab-label">Wavelet scalogram <span className="muted">· time × frequency (Morlet CWT)</span></div>
    <div className="plot scal"><canvas ref={sc} width="1000" height="300" role="img" aria-label="Wavelet scalogram of the simulated signal"/>
      <div className="yax">{[60,40,20,10,4].map(f=><span key={f} style={{top:`${(1-Math.log(f/2)/Math.log(30))*100}%`}}>{f} Hz</span>)}</div>
      <div className="playhead" ref={cur}/></div>
    <div className="xax"><span>0 s</span><span>0.5</span><span>1.0</span><span>1.5</span><span>2.0 s</span></div>

    <div className="lab-label">Power spectrum <span className="muted">· 0.5–64 Hz</span></div>
    <div className="plot psd"><canvas ref={ps} width="1000" height="150" role="img" aria-label="Power spectrum of the simulated signal"/></div>
    <div className="xax f"><span>0 Hz</span><span>16</span><span>32</span><span>48</span><span>64 Hz</span></div>
    <p className="studio-note" aria-live="polite">{note}</p>
  </Tilt>}

/* ============ Pipeline stepper ============ */
const glyphs=[
  ()=>{const p=Array.from({length:60},(_,i)=>`${i?'L':'M'}${i*2},${25+((Math.sin(i*12.9)*43758.5)%1)*18-9+4*Math.sin(i/3)}`).join('');return<path d={p} fill="none" strokeWidth="1.6"/>},
  ()=>{const p=Array.from({length:60},(_,i)=>`${i?'L':'M'}${i*2},${25+7*Math.sin(i/4)+4*Math.sin(i/1.7)}`).join('');return<path d={p} fill="none" strokeWidth="2"/>},
  ()=><g>{Array.from({length:60},(_,i)=>{const c=i%12,r=(i/12)|0;const v=.5+.5*Math.sin(c*.9+r*1.3);return<rect key={i} x={c*10} y={r*10} width="9" height="9" rx="2" style={{fill:`rgba(124,58,237,${.15+v*.8})`}}/>})}</g>,
  ()=><g>{Array.from({length:60},(_,i)=>{const c=i%12,r=(i/12)|0;const hot=r<2&&c>3&&c<8;return<rect key={i} x={c*10} y={r*10} width="9" height="9" rx="2" style={{fill:hot?'rgba(244,114,182,.95)':'rgba(124,58,237,.18)'}}/>})}</g>,
  ()=><g>{[1,2,4,8].map((d,l)=>Array.from({length:12},(_,i)=>{const x=i*10+5,y=40-l*12;return<g key={l+'-'+i}><circle cx={x} cy={y} r="2.4"/>{l>0&&i-d>=0&&<line x1={x} y1={y} x2={(i-d)*10+5} y2={y+12} strokeWidth=".8"/>}</g>}))}</g>,
  ()=><g>{Array.from({length:40},(_,i)=>{const h=4+22*Math.abs(Math.sin(i/3))*Math.exp(-Math.pow((i-20)/16,2));return<rect key={i} x={i*3} y={25-h} width="2" height={h*2} rx="1"/>})}</g>
];

function Pipeline(){
  const P=SIGNALS.pipeline,[a,setA]=useState(0),[auto,setAuto]=useState(true),[r,seen]=useSeen(.25);
  useEffect(()=>{if(!auto||!seen||RM())return;const id=setInterval(()=>setA(i=>(i+1)%P.length),3200);return()=>clearInterval(id)},[auto,seen]);
  const G=glyphs[a];
  return <div ref={r} className="pipe card pad">
    <div className="studio-head"><div><h3>From EEG to speech</h3><p className="muted small">The signal-processing path behind my EEG-to-speech work. Select a stage.</p></div>
      <button className="btn alt sm" onClick={()=>setAuto(v=>!v)} aria-pressed={auto}>{auto?'⏸ Auto-play':'▶ Auto-play'}</button></div>
    <div className="steps" role="tablist"><div className="steps-line"><i style={{width:`${a/(P.length-1)*100}%`}}/></div>
      {P.map((s,i)=><button key={s.t} role="tab" aria-selected={a===i} className={'step'+(i<=a?' done':'')+(i===a?' cur':'')} onClick={()=>{setA(i);setAuto(false)}}><span className="sn">{i+1}</span><span className="st">{s.t}</span></button>)}</div>
    <div className="pipe-detail" key={a}><svg viewBox="0 0 120 50" className="glyph" aria-hidden="true"><G/></svg>
      <div><h4>{a+1}. {P[a].t}</h4><p>{P[a].d}</p><div className="chips"><Tags a={P[a].tools} c="tech"/></div></div></div>
  </div>}

/* ============ Speech intelligibility card ============ */
function Intel(){return <div className="card pad intel">
  <h3>Predicting speech intelligibility, no manual labels</h3>
  <p className="muted small">Whisper encoder embeddings with a BiLSTM, on a large-scale FLAC dataset.</p>
  <div className="flow">{SIGNALS.intel.map((s,i)=><div key={s.t} className="flow-node" style={{animationDelay:i*.45+'s'}}><b>{s.t}</b><small>{s.s}</small></div>)}</div>
  <div className="rings"><Ring value={89} to={.89} dec={2} label="Pearson correlation" sub="Closer to 1 is better" color="var(--c)"/>
    <div className="ring-box tile"><div className="ring-num big"><Count to={.052} dec={3}/></div><div className="ring-label">RMSE</div><div className="muted small">Lower is better</div></div></div>
</div>}

export default function Signals(){
  return <>
    <Reveal><Studio/></Reveal>
    <div className="grid2 mt"><Reveal><Pipeline/></Reveal><Reveal d={120}><Intel/></Reveal></div>
    <Reveal><div className="results mt">
      <div className="card pad res"><Ring value={92} to={92} suffix="%" label="EEG classification accuracy" sub="Wavelet + spectral-filtering pipelines on biomedical benchmarks" color="var(--d)"/></div>
      <div className="card pad res award"><div className="ring-num big grad">Interspeech 2026</div><div className="ring-label">Accepted</div><p className="muted small">EEG-to-speech reconstruction, a top-tier venue in speech and language processing.</p></div>
      <div className="card pad res"><div className="ring-num big"><Count to={5} suffix="+"/></div><div className="ring-label">Paper submissions</div><p className="muted small">Co-authored in EEG signal processing, speech reconstruction and audio intelligibility prediction.</p></div>
    </div></Reveal>
  </>}
