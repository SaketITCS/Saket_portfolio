import {useEffect,useRef,useState} from 'react';
import {SITE,SOCIALS,STATS,INTERESTS,PROJECTS,PUBLICATIONS,PUB_FILTERS,TIMELINE,SKILLS} from './data.js';
import {RM,asset,useSeen,Reveal,Count,Tilt,Btn,Btn2,Tags,Sec} from './ui.jsx';
import Signals from './Signals.jsx';
import Biomedical from './Biomedical.jsx';
import Maintenance from './Maintenance.jsx';
import Blog from './Blog.jsx';
import Mentors from './Mentors.jsx';

const GL={"Google Scholar":"GS",LinkedIn:"in",GitHub:"GH",ORCID:"ID",Email:"@"};
const SECS=["Home","About","Research","Signals","Biomedical","Maintenance","Projects","Publications","Mentors","Experience","Skills","Blog","Contact"];
const SHOW=6; // projects shown before "Show all"

/* Interactive neural-network background: reacts to mouse, click spawns a burst of neurons */
export function Neural(){const c=useRef(null);
  useEffect(()=>{if(RM())return;const cv=c.current,x=cv.getContext('2d');let w,h,P=[],m={x:-999,y:-999},raf;
    const rs=()=>{const d=devicePixelRatio||1;w=innerWidth;h=innerHeight;cv.width=w*d;cv.height=h*d;x.setTransform(d,0,0,d,0,0);
      P=Array.from({length:Math.min(90,w/16|0)},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.5,vy:(Math.random()-.5)*.5}))};
    const mv=e=>{m={x:e.clientX,y:e.clientY}},ck=e=>{for(let i=0;i<10;i++)P.push({x:e.clientX,y:e.clientY,vx:(Math.random()-.5)*5,vy:(Math.random()-.5)*5,life:100})};
    rs();addEventListener('resize',rs);addEventListener('mousemove',mv);addEventListener('click',ck);
    const loop=()=>{const L=document.documentElement.dataset.theme==='light',rgb=L?'37,99,235':'125,170,255';x.clearRect(0,0,w,h);
      P=P.filter(p=>p.life===undefined||--p.life>0);
      P.forEach((a,i)=>{if(a.life!==undefined){a.vx*=.96;a.vy*=.96}
        const dm=Math.hypot(a.x-m.x,a.y-m.y);if(dm<170){a.vx+=(m.x-a.x)*.00004*(170-dm)/10;a.vy+=(m.y-a.y)*.00004*(170-dm)/10;x.strokeStyle=`rgba(${rgb},${.5*(1-dm/170)})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(m.x,m.y);x.stroke()}
        const sp=Math.hypot(a.vx,a.vy);if(sp>1.2&&a.life===undefined){a.vx*=.97;a.vy*=.97}
        a.x=(a.x+a.vx+w)%w;a.y=(a.y+a.vy+h)%h;x.fillStyle=`rgba(${rgb},.9)`;x.beginPath();x.arc(a.x,a.y,1.8,0,6.3);x.fill();
        for(let j=i+1;j<P.length;j++){const b=P[j],k=Math.hypot(a.x-b.x,a.y-b.y);if(k<125){x.strokeStyle=`rgba(${rgb},${.3*(1-k/125)})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}});
      raf=requestAnimationFrame(loop)};loop();
    return()=>{cancelAnimationFrame(raf);removeEventListener('resize',rs);removeEventListener('mousemove',mv);removeEventListener('click',ck)}},[]);
  return <canvas id="neural" ref={c} aria-hidden="true"/>}

export function Glow(){const r=useRef();useEffect(()=>{const f=e=>r.current&&(r.current.style.transform=`translate(${e.clientX}px,${e.clientY}px)`);addEventListener('mousemove',f);return()=>removeEventListener('mousemove',f)},[]);return <div className="glow" ref={r} aria-hidden="true"/>}

function Type({words}){const[t,setT]=useState('');
  useEffect(()=>{let i=0,j=0,del=false,id;const f=()=>{const w=words[i];setT(w.slice(0,j));
    if(!del&&j===w.length){del=true;id=setTimeout(f,1400);return}
    if(del&&j===0){del=false;i=(i+1)%words.length}j+=del?-1:1;id=setTimeout(f,del?35:70)};f();return()=>clearTimeout(id)},[]);
  return <span className="type">{t}</span>}

const wave=Array.from({length:601},(_,x)=>`${x?'L':'M'}${x},${(30+11*Math.sin(x/300*6.283*3)+6*Math.sin(x/300*6.283*7)+(x%300>130&&x%300<150?-14*Math.sin((x%300-130)/20*3.14):0)).toFixed(1)}`).join('');

const Socials=()=><div className="socials">{SOCIALS.map(s=><a key={s.name} href={s.url} {...(s.url!=='#'&&!s.url.startsWith('mailto')&&{target:'_blank',rel:'noopener'})} aria-label={s.name} title={s.name}>{GL[s.name]}</a>)}</div>;
const Authors=({a})=><>{a.split(/(S\. Maheshwari)/).map((t,i)=>t==='S. Maheshwari'?<strong key={i} className="me">{t}</strong>:t)}</>;

export default function App(){
  const[ready,setReady]=useState(()=>!!window.__booted),[sp,setSp]=useState(0),[act,setAct]=useState('home'),[menu,setMenu]=useState(false);
  const[theme,setTheme]=useState(()=>{try{return localStorage.getItem('theme')||'dark'}catch{return'dark'}});
  const[pf,setPf]=useState('All'),[all,setAll]=useState(false),[modal,setModal]=useState(null),[q,setQ]=useState(''),[pubF,setPubF]=useState('All Publications'),[sent,setSent]=useState(false);
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('theme',theme)}catch{}},[theme]);
  useEffect(()=>{const t=setTimeout(()=>{window.__booted=true;setReady(true)},window.__booted?0:1300);return()=>clearTimeout(t)},[]);
  useEffect(()=>{const f=()=>{const d=document.documentElement;setSp(scrollY/(d.scrollHeight-innerHeight||1));
    let cur='home';SECS.forEach(s=>{const e=document.getElementById(s.toLowerCase());if(e&&e.getBoundingClientRect().top<innerHeight*.4)cur=s.toLowerCase()});setAct(cur)};
    f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
  useEffect(()=>{const k=e=>e.key==='Escape'&&setModal(null);addEventListener('keydown',k);document.body.style.overflow=modal!==null?'hidden':'';return()=>{removeEventListener('keydown',k);if(modal!==null)document.body.style.overflow=''}},[modal]);

  const projAll=PROJECTS.map((p,i)=>({p,i})).filter(({p})=>pf==='All'||p.cat===pf),projs=all?projAll:projAll.slice(0,SHOW);
  const pubs=PUBLICATIONS.filter(p=>{const f=pubF==='All Publications'||(pubF==='Conference Papers'&&p.type==='Conference')||(pubF==='Book Chapter'&&p.type==='Book Chapter')||p.category===pubF;
    return f&&[p.title,p.authors,p.year,p.venue,(p.keywords||[]).join(' ')].join(' ').toLowerCase().includes(q.toLowerCase())});
  const submit=e=>{e.preventDefault();const f=e.target;if(!f.checkValidity()){f.classList.add('was');return}
    const g=n=>f.elements[n].value;location.href=`mailto:${SITE.email}?subject=${encodeURIComponent(g('s'))}&body=${encodeURIComponent(g('m')+'\n\nFrom: '+g('n')+' ('+g('e')+')')}`;setSent(true)};
  const skillsAll=Object.values(SKILLS).flat(),M=modal!==null?PROJECTS[modal]:null;

  return <>
    <div className={'pre'+(ready?' off':'')}><svg viewBox="0 0 300 60"><path d={wave.slice(0,wave.indexOf('L301'))} className="pre-line"/></svg><span>Initialising neural interface…</span></div>
    <Neural/><Glow/><div className="aurora a1"/><div className="aurora a2"/><div className="aurora a3"/><div className="gridbg"/>
    <div className="progress" style={{transform:`scaleX(${sp})`}}/>

    <nav className="nav"><div className="wrap nav-in">
      <a href="#home" className="brand"><span className="logo">SM</span>Saket Maheshwari</a>
      <div className={'links'+(menu?' open':'')}>{SECS.slice(1).map(s=><a key={s} href={'#'+s.toLowerCase()} className={act===s.toLowerCase()?'on':''} onClick={()=>setMenu(false)}>{s}</a>)}<a href="#/coauthors" onClick={()=>setMenu(false)}>Co-Authors</a></div>
      <div className="nav-r"><button className="icon-btn" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">{theme==='dark'?'☀':'☾'}</button>
        <button className="icon-btn burger" onClick={()=>setMenu(!menu)} aria-label="Menu" aria-expanded={menu}>{menu?'✕':'☰'}</button></div>
    </div></nav>

    <main>
    <section id="home" className="hero"><div className="wrap hero-in">
      <div>
        <span className="status"><i className="pulse"/>M.Tech AI · C-DAC Mohali · Research Intern, IIT Jammu</span>
        <h1 className="name" aria-label="Saket Maheshwari">{'Saket Maheshwari'.split('').map((c,i)=><span key={i} className="ch" style={{animationDelay:1300+i*55+'ms'}}>{c===' '?' ':c}</span>)}</h1>
        <h2 className="headline">Exploring <Type words={['EEG-based Brain-Computer Interfaces','EEG-to-Speech Reconstruction','Wavelet Time-Frequency Analysis','Speech Intelligibility Prediction','Biomedical Signal Processing','Predictive Maintenance']}/><i className="caret"/></h2>
        <p className="muted lead">AI and machine learning researcher working on EEG-based neural decoding, biomedical signal processing and speech AI. EEG-to-speech work accepted at Interspeech 2026.</p>
        <div className="row-btns"><Btn href="#signals">Explore the Signals Lab</Btn><Btn alt href="#publications">View Publications</Btn><Btn alt href={asset('assets/documents/cv.pdf')}>⬇ Download CV</Btn></div>
        <Socials/>
      </div>
      <div className="profile-wrap"><Tilt className="profile">
        <div className="orbit"><i/><i/><i/></div>
        <img src={asset('assets/images/profile/profile.jpg')} alt="Portrait of Saket Maheshwari" className="avatar" width="150" height="150"
          onError={e=>{e.target.onerror=null;e.target.src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%231e2a5a'/%3E%3Ctext x='50%25' y='58%25' fill='%237dd3fc' font-size='64' text-anchor='middle' font-family='sans-serif'%3ESM%3C/text%3E%3C/svg%3E"}}/>
        <h3>Saket Maheshwari</h3><p className="muted small">AI &amp; Machine Learning Researcher</p>
        <svg viewBox="0 0 300 60" className="wave" aria-hidden="true"><defs><linearGradient id="g"><stop offset="0" stopColor="#22d3ee"/><stop offset="1" stopColor="#a78bfa"/></linearGradient></defs><path d={wave} fill="none" stroke="url(#g)" strokeWidth="2"/></svg>
        <div className="chips"><Tags a={['EEG','BCI','Speech AI','Biomedical AI']}/></div>
      </Tilt></div>
    </div><div className="scroll-cue" aria-hidden="true"><i/></div></section>

    <div className="marquee" aria-hidden="true"><div className="track">{[...skillsAll,...skillsAll].map((s,i)=><span key={i}>{s}<b>✦</b></span>)}</div></div>

    <div className="wrap stats">{STATS.map((s,i)=><Reveal key={s.label} d={i*100}><Tilt className="stat"><div className="num"><Count to={s.value} suffix={s.suffix}/></div><div className="muted">{s.label}</div></Tilt></Reveal>)}</div>

    <Sec id="about" n={1} title="About Me"><div className="grid2">
      <Reveal><Tilt className="pad"><p>I am an AI and machine learning researcher interested in EEG-based brain-computer interfaces and neural decoding, biomedical signal processing with time-frequency and wavelet representations, and self-supervised and deep learning methods for speech and audio intelligibility.</p><p>Right now I am working on EEG-to-speech reconstruction with neural vocoder frameworks as a Research Intern at the Indian Institute of Technology Jammu, under Prof. Karan Nathwani. More broadly, I want to apply machine learning to neurological and physiological signal analysis, especially in low-resource and clinically relevant settings.</p><p className="muted small">📍 {SITE.location}</p><Btn href={asset('assets/documents/cv.pdf')}>⬇ Download CV</Btn></Tilt></Reveal>
      <Reveal d={120}><Tilt className="pad"><h3>Academic Background</h3>
        <p>🎓 <strong>M.Tech in Artificial Intelligence</strong><br/><span className="muted">Centre for Development of Advanced Computing (C-DAC) Mohali · 2026 – Present</span></p>
        <p>🎓 <strong>B.Tech in Computer Science (AI &amp; Machine Learning)</strong><br/><span className="muted">GLA University, Mathura · Nov 2022 – May 2026</span></p>
        <h3 className="mt">Research Profile</h3><div className="chips"><Tags a={['EEG','Neural Decoding','Wavelets','Speech AI','Biomedical AI','Predictive Maintenance']}/></div></Tilt></Reveal>
    </div></Sec>

    <Sec id="research" n={2} title="Research Interests"><div className="grid3">{INTERESTS.map(([t,d],i)=><Reveal key={t} d={(i%3)*100}><Tilt className="pad int"><span className="idx">{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p className="muted small">{d}</p></Tilt></Reveal>)}</div></Sec>

    <Sec id="signals" n={3} title="Signals Lab" sub="Interactive signal-processing demos from my EEG and speech research: filter a synthetic EEG, watch the wavelet transform respond, and follow the path from brain signal to speech."><Signals/></Sec>

    <Sec id="biomedical" n={4} title="Biomedical AI" sub="Where machine learning meets neurological, physiological and medical data. Hover or tap a focus area to see the related work."><Biomedical/></Sec>

    <Sec id="maintenance" n={5} title="Predictive Maintenance" sub="Before EEG, I worked on forecasting and failure prediction for real systems, from thermal energy demand to aircraft downtime and inspection."><Maintenance/></Sec>

    <Sec id="projects" n={6} title="Featured Research Projects">
      <div className="filters">{['All',...new Set(PROJECTS.map(p=>p.cat))].map(f=><button key={f} className={pf===f?'active':''} onClick={()=>{setPf(f);setAll(false)}}>{f}</button>)}</div>
      <div className="grid3" key={pf+all}>{projs.map(({p,i},k)=><div key={i} className="pop" style={{animationDelay:(k%SHOW)*80+'ms'}}><Tilt className="pad col">
        <div className="proj-img">{p.img?<img src={asset(p.img)} alt={p.title} loading="lazy"/>:<span>{p.cat}</span>}</div>
        {p.where&&<div className="muted small">{p.where}</div>}<h3>{p.title}</h3><p className="muted small">{p.desc.slice(0,120)}…</p>
        {p.metrics&&<div className="mets">{p.metrics.map(([v,l])=><div key={l}><b>{v}</b><span>{l}</span></div>)}</div>}
        <div className="chips"><Tags a={p.tags}/></div><div className="chips"><Tags a={p.tech} c="tech"/></div>
        <div className="row-btns end"><Btn2 onClick={()=>setModal(i)}>View Details</Btn2>{p.github&&<Btn alt href={p.github} target="_blank" rel="noopener">GitHub</Btn>}</div></Tilt></div>)}</div>
      {projAll.length>SHOW&&<div className="center"><Btn2 alt onClick={()=>setAll(a=>!a)}>{all?'Show fewer':`Show all ${projAll.length} projects`}</Btn2></div>}
    </Sec>

    <Sec id="publications" n={7} title="Publications">
      <div className="filters">{PUB_FILTERS.map(f=><button key={f} className={pubF===f?'active':''} onClick={()=>setPubF(f)}>{f}</button>)}</div>
      <input className="search" type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title, author, venue, year or keyword" aria-label="Search publications"/>
      <div className="grid2" key={pubF}>{pubs.map((p,k)=><div key={p.title} className="pop" style={{animationDelay:k*70+'ms'}}><Tilt className="pad col">
        <div className="chips"><span className="tag">{p.type}</span><span className="tag tech">{p.year}</span>{p.status&&<span className="tag ok">{p.status}</span>}</div><h3>{p.title}</h3>
        {p.authors&&<p className="small"><Authors a={p.authors}/></p>}<p className="muted small"><em>{p.venue}</em></p>
        {p.doi&&<p className="small brk">DOI: <a href={p.doi} target="_blank" rel="noopener">{p.doi.replace('https://doi.org/','')}</a></p>}
        {p.keywords?.length>0&&<div className="chips"><Tags a={p.keywords}/></div>}
        <div className="row-btns end">{p.doi&&<Btn href={p.doi} target="_blank" rel="noopener">DOI</Btn>}</div></Tilt></div>)}</div>
      {!pubs.length&&<p className="muted">No publications match your search.</p>}
    </Sec>

    <Sec id="mentors" n={8} title="Mentors & Co-Authors" sub="The people who guided my work and wrote papers with me."><Mentors/><div className="center"><Btn href="#/coauthors">See all co-authors →</Btn></div></Sec>

    <Sec id="experience" n={9} title="Education & Experience"><TL/></Sec>

    <Sec id="skills" n={10} title="Skills & Technologies"><div className="grid2">{Object.entries(SKILLS).map(([k,v],i)=><Reveal key={k} d={i*100}><Tilt className="pad"><h3>{k}</h3>{v.map((s,j)=><span key={s} className="tag skill" style={{animationDelay:j*60+'ms'}}>{s}</span>)}</Tilt></Reveal>)}</div></Sec>

    <Sec id="blog" n={11} title="Research Updates & Blog" sub="Notes on my research, in my own words."><Blog/></Sec>

    <Sec id="contact" n={12} title="Let's Collaborate"><div className="grid2">
      <Reveal><Tilt className="pad"><p className="muted">Interested in EEG, speech AI or biomedical signal processing, or want to collaborate? Reach out directly.</p><p>✉ <a href={'mailto:'+SITE.email}>{SITE.email}</a></p><p>📍 {SITE.location}</p><Socials/></Tilt></Reveal>
      <Reveal d={120}><div className="card pad"><form onSubmit={submit} noValidate className="form">
        <label><input name="n" placeholder=" " required/><span>Name</span></label><label><input name="e" type="email" placeholder=" " required/><span>Email</span></label>
        <label className="full"><input name="s" placeholder=" " required/><span>Subject</span></label><label className="full"><textarea name="m" rows="4" placeholder=" " required/><span>Message</span></label>
        <Btn2 type="submit">{sent?'✓ Opening your email app…':'Send Message (opens email app)'}</Btn2></form></div></Reveal>
    </div></Sec>
    </main>

    <footer><div className="wrap"><strong>Saket Maheshwari</strong> <span className="muted">· AI &amp; Machine Learning Researcher</span>
      <p className="muted small">EEG · Speech AI · Biomedical Signal Processing · Predictive Maintenance</p><Socials/><p className="muted small">© {new Date().getFullYear()} Saket Maheshwari</p></div></footer>

    <button className={'top'+(sp>.1?' show':'')} onClick={()=>scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">
      <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" pathLength="100" strokeDasharray="100" strokeDashoffset={100-sp*100}/></svg>↑</button>

    {M&&<div className="modal" onClick={()=>setModal(null)}><div className="card pad box" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label={M.title}>
      <button className="icon-btn x" onClick={()=>setModal(null)} aria-label="Close">✕</button>{M.where&&<div className="muted small">{M.where}</div>}<h3>{M.title}</h3><p>{M.desc}</p>
      {M.metrics&&<div className="mets big">{M.metrics.map(([v,l])=><div key={l}><b>{v}</b><span>{l}</span></div>)}</div>}
      {M.points?.length>0&&<ul className="pts">{M.points.map(x=><li key={x}>{x}</li>)}</ul>}
      <div className="chips"><Tags a={M.tags}/></div><div className="chips"><Tags a={M.tech} c="tech"/></div></div></div>}
  </>}

function TL(){const[r,s]=useSeen(.05);
  return <div ref={r} className={'timeline'+(s?' go':'')}><div className="tl-line"/>{TIMELINE.map((t,i)=><div key={i} className="tl-item" style={{transitionDelay:300+i*200+'ms'}}><span className="dot"/>
    <div className="card pad"><span className="tag">{t.kind}</span><h3>{t.role}</h3><p className="acc">{t.org}</p><p className="muted small">{t.date}{t.place?` · ${t.place}`:''}</p>
      {t.bullets.length>0&&<ul className="tl-ul">{t.bullets.map(b=><li key={b}>{b}</li>)}</ul>}<div className="chips"><Tags a={t.skills}/></div></div></div>)}</div>}
