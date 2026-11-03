import {useState} from 'react';
import {Reveal,Tilt,Ring,Btn,Tags} from './ui.jsx';
import {MAINT,PUBLICATIONS} from './data.js';

/* Illustrative degradation curve: health index falls over time, with sensor wobble */
const TMAX=100,trend=t=>100*(1-Math.pow(t/112,2.3)),obs=t=>trend(t)+2.2*Math.sin(t*.9)+1.5*Math.sin(t*2.3+1);
const X=t=>46+t*5.1,Y=h=>16+(100-h)*2.2;

function Simulator(){
  const[c,setC]=useState(30),[thr,setThr]=useState(35);
  const tc=112*Math.pow(1-thr/100,1/2.3);                    // time the trend crosses the threshold
  const warn=tc-22,win=tc-9;
  const state=c<warn?['ok','Healthy','The health index is well above the threshold. Keep monitoring.']
    :c<win?['warn','Degrading','The model forecasts a threshold crossing ahead. Time to plan maintenance.']
    :c<tc?['crit','Maintenance window','Act now: service the component before the forecast crossing.']
    :['fail','Threshold crossed','Past the forecast crossing. Without maintenance this is where unplanned downtime happens.'];
  const past=Array.from({length:Math.floor(c)+1},(_,i)=>`${i?'L':'M'}${X(i).toFixed(1)},${Y(obs(i)).toFixed(1)}`).join('');
  const fut=[];for(let t=c;t<=TMAX;t+=2)fut.push([t,trend(t)]);
  const line=fut.map(([t,h],i)=>`${i?'L':'M'}${X(t).toFixed(1)},${Y(h).toFixed(1)}`).join('');
  const band='M'+fut.map(([t,h])=>`${X(t).toFixed(1)},${Y(Math.min(100,h+(t-c)*.16+1)).toFixed(1)}`).join(' L')+' L'+fut.slice().reverse().map(([t,h])=>`${X(t).toFixed(1)},${Y(Math.max(0,h-(t-c)*.16-1)).toFixed(1)}`).join(' L')+'Z';
  return <Tilt className="sim">
    <div className="studio-head"><div><h3>From sensor trend to maintenance window</h3><p className="muted small">An illustrative simulation (not real aircraft data) of how a predictive-maintenance model uses a health indicator to plan service before a failure.</p></div></div>
    <div className="sim-svg"><svg viewBox="0 0 580 250" role="img" aria-label="Health index over time with forecast, threshold and maintenance window">
      <defs><linearGradient id="hg" x1="0" x2="1"><stop offset="0" stopColor="#22d3ee"/><stop offset="1" stopColor="#a78bfa"/></linearGradient></defs>
      {[0,25,50,75,100].map(h=><g key={h}><line x1="46" x2="560" y1={Y(h)} y2={Y(h)} className="gl"/><text x="38" y={Y(h)+4} className="ax" textAnchor="end">{h}</text></g>)}
      <text x="46" y="8" className="ax">Health index</text><text x="560" y="246" className="ax" textAnchor="end">Operating time →</text>
      {tc<=TMAX&&<rect x={X(win)} y={Y(100)} width={Math.max(0,X(tc)-X(win))} height={Y(0)-Y(100)} className="win"/>}
      <line x1="46" x2="560" y1={Y(thr)} y2={Y(thr)} className="thr"/><text x="556" y={Y(thr)-6} className="ax thr-t" textAnchor="end">Maintenance threshold {thr}</text>
      <path d={band} className="band"/><path d={line} className="fc"/>
      <path d={past} className="obs"/>
      {tc<=TMAX&&<g><line x1={X(tc)} x2={X(tc)} y1={Y(100)} y2={Y(0)} className="cross"/><text x={X(tc)-5} y={Y(100)+12} className="ax" textAnchor="end">forecast crossing</text></g>}
      <g transform={`translate(${X(c)},${Y(obs(c))})`}><circle r="12" className="halo"/><circle r="5" className="pt"/></g>
    </svg></div>
    <div className="sim-ctl"><label className="ctl wide">Operating time <input type="range" min="0" max="100" value={c} onChange={e=>setC(+e.target.value)} aria-label="Operating time"/></label>
      <label className="ctl wide">Threshold <input type="range" min="15" max="60" value={thr} onChange={e=>setThr(+e.target.value)} aria-label="Maintenance threshold"/></label></div>
    <div className={'state '+state[0]} aria-live="polite"><b>{state[1]}</b><span>{state[2]}</span></div>
  </Tilt>}

function Flow(){return <div className="card pad flowcard"><h3>Typical predictive-maintenance workflow</h3>
  <p className="muted small">The pattern behind my maintenance and forecasting work.</p>
  <ol className="vflow">{MAINT.flow.map(([t,s],i)=><li key={t} style={{animationDelay:i*.5+'s'}}><span className="vn">{i+1}</span><div><b>{t}</b><small>{s}</small></div></li>)}</ol></div>}

export default function Maintenance(){
  const pubs=MAINT.pubs.map(k=>PUBLICATIONS.find(p=>p.title.startsWith(k))).filter(Boolean);
  return <>
    <div className="grid2 sim-grid"><Reveal><Simulator/></Reveal><Reveal d={120}><Flow/></Reveal></div>

    <Reveal><div className="results mt">
      <div className="card pad res"><Ring value={87} to={87} suffix="%" label="Failure prediction accuracy" sub="Feynn Labs · Random Forest, LSTM, SARIMA" color="var(--c)"/></div>
      <div className="card pad res"><Ring value={23} to={23} suffix="%" label="Lower forecasting error" sub="vs. traditional baselines · Feynn Labs" color="var(--b)"/></div>
      <div className="card pad res"><Ring value={18} to={18} suffix="%" label="Lower prediction error" sub="Computer vision + AutoCAD for building energy · NIT Jalandhar" color="var(--d)"/></div>
    </div></Reveal>

    <div className="grid3 mt">{pubs.map((p,i)=><Reveal key={p.title} d={i*100}><Tilt className="pad col pubmini">
      <div className="chips"><span className="tag">{p.venue.split(',')[0]}</span>{p.status&&<span className="tag tech">{p.status}</span>}</div>
      <h3>{p.title.replace(/^Exploring /,'')}</h3><p className="small muted">{p.authors}</p>
      <div className="row-btns end">{p.doi?<Btn href={p.doi} target="_blank" rel="noopener">DOI</Btn>:<span className="small muted">Accepted. DOI to follow.</span>}</div></Tilt></Reveal>)}</div>
  </>}
