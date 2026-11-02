import {useEffect,useRef,useState} from 'react';
import {SITE,SOCIALS,STATS,INTERESTS,PROJECTS,PUBLICATIONS,PUB_FILTERS,TIMELINE,SKILLS,BLOG} from './data.js';

const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const asset=p=>p&&!/^(https?:|data:)/.test(p)?import.meta.env.BASE_URL+p:p;
const GL={"Google Scholar":"GS",LinkedIn:"in",GitHub:"GH",ORCID:"ID",Email:"@"};
const SECS=["Home","About","Research","Projects","Publications","Experience","Skills","Blog","Contact"];

function useSeen(th=.15){const r=useRef(null),[s,set]=useState(false);
  useEffect(()=>{const io=new IntersectionObserver(([e])=>e.isIntersecting&&(set(true),io.disconnect()),{threshold:th});io.observe(r.current);return()=>io.disconnect()},[]);return[r,s]}
const Reveal=({d=0,children,className=''})=>{const[r,s]=useSeen();return <div ref={r} className={`rv ${s?'in':''} ${className}`} style={{transitionDelay:d+'ms'}}>{children}</div>};
function Count({to}){const[r,s]=useSeen(),[n,setN]=useState(0);
  useEffect(()=>{if(!s)return;let t0;const f=t=>{t0??=t;const p=Math.min((t-t0)/1400,1);setN(Math.round(to*(1-Math.pow(1-p,3))));p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)},[s]);return <span ref={r}>{n}</span>}

/* Interactive neural-network background: reacts to mouse, click spawns a burst of neurons */
function Neural(){const c=useRef(null);
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

function Glow(){const r=useRef();useEffect(()=>{const f=e=>r.current&&(r.current.style.transform=`translate(${e.clientX}px,${e.clientY}px)`);addEventListener('mousemove',f);return()=>removeEventListener('mousemove',f)},[]);return <div className="glow" ref={r} aria-hidden="true"/>}

/* 3D tilt card with cursor spotlight */
const Tilt=({children,className=''})=>{const r=useRef();
  const mv=e=>{const b=r.current.getBoundingClientRect(),px=(e.clientX-b.left)/b.width,py=(e.clientY-b.top)/b.height,s=r.current.style;
    s.setProperty('--mx',px*100+'%');s.setProperty('--my',py*100+'%');s.transform=`perspective(800px) rotateX(${(.5-py)*9}deg) rotateY(${(px-.5)*9}deg) translateY(-4px)`};
  return <div ref={r} className={'card '+className} onMouseMove={mv} onMouseLeave={()=>r.current.style.transform=''}>{children}</div>};

/* Magnetic button */
const Btn=({alt,children,...p})=>{const r=useRef();
  return <a ref={r} className={'btn'+(alt?' alt':'')} {...p}
    onMouseMove={e=>{const b=r.current.getBoundingClientRect();r.current.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.2}px,${(e.clientY-b.top-b.height/2)*.3}px)`}}
    onMouseLeave={()=>r.current.style.transform=''}>{children}</a>};
const Btn2=({alt,children,...p})=>{const r=useRef();return <button ref={r} className={'btn'+(alt?' alt':'')} {...p}>{children}</button>};

function Type({words}){const[t,setT]=useState('');
  useEffect(()=>{let i=0,j=0,del=false,id;const f=()=>{const w=words[i];setT(w.slice(0,j));
    if(!del&&j===w.length){del=true;id=setTimeout(f,1400);return}
    if(del&&j===0){del=false;i=(i+1)%words.length}j+=del?-1:1;id=setTimeout(f,del?35:70)};f();return()=>clearTimeout(id)},[]);
  return <span className="type">{t}</span>}

const wave=Array.from({length:601},(_,x)=>`${x?'L':'M'}${x},${(30+11*Math.sin(x/300*6.283*3)+6*Math.sin(x/300*6.283*7)+(x%300>130&&x%300<150?-14*Math.sin((x%300-130)/20*3.14):0)).toFixed(1)}`).join('');
const Socials=()=><div className="socials">{SOCIALS.map(s=><a key={s.name} href={s.url} {...(s.url!=='#'&&{target:'_blank',rel:'noopener'})} aria-label={s.name} title={s.name}>{GL[s.name]}</a>)}</div>;

const Sec=({id,n,title,children})=><section id={id} className="sec"><div className="wrap"><Reveal><div className="eyebrow">0{n} / {id}</div><h2 className="sec-title">{title}</h2></Reveal>{children}</div></section>;
const Tags=({a,c=''})=>a.map(t=><span key={t} className={'tag '+c}>{t}</span>);

export default function App(){
  const[ready,setReady]=useState(false),[sp,setSp]=useState(0),[act,setAct]=useState('home'),[menu,setMenu]=useState(false);
  const[theme,setTheme]=useState(()=>{try{return localStorage.getItem('theme')||'dark'}catch{return'dark'}});
  const[pf,setPf]=useState('All'),[modal,setModal]=useState(null),[q,setQ]=useState(''),[pubF,setPubF]=useState('All Publications'),[sent,setSent]=useState(false);
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('theme',theme)}catch{}},[theme]);
  useEffect(()=>{const t=setTimeout(()=>setReady(true),1300);return()=>clearTimeout(t)},[]);
  useEffect(()=>{const f=()=>{const d=document.documentElement;setSp(scrollY/(d.scrollHeight-innerHeight||1));
    let cur='home';SECS.forEach(s=>{const e=document.getElementById(s.toLowerCase());if(e&&e.getBoundingClientRect().top<innerHeight*.4)cur=s.toLowerCase()});setAct(cur)};
    f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
  useEffect(()=>{const k=e=>e.key==='Escape'&&setModal(null);addEventListener('keydown',k);document.body.style.overflow=modal!==null?'hidden':'';return()=>removeEventListener('keydown',k)},[modal]);

  const projs=PROJECTS.map((p,i)=>({p,i})).filter(({p})=>pf==='All'||p.cat===pf);
  const pubs=PUBLICATIONS.filter(p=>{const f=pubF==='All Publications'||(pubF==='Journal Articles'&&p.type==='Journal')||(pubF==='Conference Papers'&&p.type==='Conference')||p.category===pubF;
    return f&&[p.title,p.authors,p.year,(p.keywords||[]).join(' ')].join(' ').toLowerCase().includes(q.toLowerCase())});
  const submit=e=>{e.preventDefault();const f=e.target;if(!f.checkValidity()){f.classList.add('was');return}
    const g=n=>f.elements[n].value;location.href=`mailto:${SITE.email}?subject=${encodeURIComponent(g('s'))}&body=${encodeURIComponent(g('m')+'\n\nFrom: '+g('n')+' ('+g('e')+')')}`;setSent(true)};
  const skillsAll=Object.values(SKILLS).flat();

  return <>
    <div className={'pre'+(ready?' off':'')}><svg viewBox="0 0 300 60"><path d={wave.slice(0,wave.indexOf('L301'))} className="pre-line"/></svg><span>Initialising neural interface…</span></div>
    <Neural/><Glow/><div className="aurora a1"/><div className="aurora a2"/><div className="aurora a3"/><div className="gridbg"/>
    <div className="progress" style={{transform:`scaleX(${sp})`}}/>

    <nav className="nav"><div className="wrap nav-in">
      <a href="#home" className="brand"><span className="logo">SM</span>Saket Maheshwari</a>
      <div className={'links'+(menu?' open':'')}>{SECS.slice(1).map(s=><a key={s} href={'#'+s.toLowerCase()} className={act===s.toLowerCase()?'on':''} onClick={()=>setMenu(false)}>{s}</a>)}</div>
      <div className="nav-r"><button className="icon-btn" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">{theme==='dark'?'☀':'☾'}</button>
        <button className="icon-btn burger" onClick={()=>setMenu(!menu)} aria-label="Menu">{menu?'✕':'☰'}</button></div>
    </div></nav>

    <main>
    <section id="home" className="hero"><div className="wrap hero-in">
      <div>
        <span className="status"><i className="pulse"/>AI &amp; ML Researcher · Biomedical AI · EEG &amp; Speech</span>
        <h1 className="name" aria-label="Saket Maheshwari">{'Saket Maheshwari'.split('').map((c,i)=><span key={i} className="ch" style={{animationDelay:1300+i*55+'ms'}}>{c===' '?'\u00a0':c}</span>)}</h1>
        <h2 className="headline">Exploring <Type words={['EEG Signal Processing','Neural Speech Reconstruction','Brain-Computer Interfaces','Biomedical AI','Deep Learning']}/><i className="caret"/></h2>
        <p className="muted lead">Advancing Artificial Intelligence for Biomedical Research and Human Understanding: EEG signal processing, neural speech reconstruction, biomedical AI and deep learning for intelligent healthcare systems.</p>
        <div className="row-btns"><Btn href="#research">Explore My Research</Btn><Btn alt href="#publications">View Publications</Btn><Btn alt href={asset('assets/documents/cv.pdf')}>⬇ Download CV</Btn></div>
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

    <div className="wrap stats">{STATS.map((s,i)=><Reveal key={s.label} d={i*100}><Tilt className="stat"><div className="num"><Count to={s.value}/></div><div className="muted">{s.label}</div></Tilt></Reveal>)}</div>

    <Sec id="about" n={1} title="About Me"><div className="grid2">
      <Reveal><Tilt className="pad"><p>I am an AI and Machine Learning researcher with a strong interest in biomedical signal processing, EEG-based brain-computer interfaces, neural speech reconstruction, and deep learning. My research focuses on developing intelligent computational frameworks for analyzing neural signals, understanding human cognition, and advancing AI-driven biomedical applications.</p><p>My academic journey has provided me with experience in machine learning, deep learning, signal processing, computer vision, and research-oriented experimentation. I am particularly interested in interdisciplinary research at the intersection of artificial intelligence, neuroscience, and healthcare.</p><Btn href={asset('assets/documents/cv.pdf')}>⬇ Download CV</Btn></Tilt></Reveal>
      <Reveal d={120}><Tilt className="pad"><h3>Academic Background</h3>
        <p>🎓 <strong>M.Tech</strong>, Computer Science and Engineering (AI)<br/><span className="muted">C-DAC Mohali</span></p>
        <p>🎓 <strong>B.Tech</strong>, Computer Science and Engineering (AI &amp; ML)<br/><span className="muted">GLA University, Mathura</span></p>
        <h3 className="mt">Research Profile</h3><div className="chips"><Tags a={['EEG','Speech','Biomedical AI','Deep Learning']}/></div></Tilt></Reveal>
    </div></Sec>

    <Sec id="research" n={2} title="Research Interests"><div className="grid3">{INTERESTS.map(([,t,d],i)=><Reveal key={t} d={(i%3)*100}><Tilt className="pad int"><span className="idx">{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p className="muted small">{d}</p></Tilt></Reveal>)}</div></Sec>

    <Sec id="projects" n={3} title="Featured Research Projects">
      <div className="filters">{['All',...new Set(PROJECTS.map(p=>p.cat))].map(f=><button key={f} className={pf===f?'active':''} onClick={()=>setPf(f)}>{f}</button>)}</div>
      <div className="grid3" key={pf}>{projs.map(({p,i},k)=><div key={i} className="pop" style={{animationDelay:k*80+'ms'}}><Tilt className="pad col">
        <div className="proj-img">{p.img?<img src={asset(p.img)} alt={p.title} loading="lazy"/>:<span>{p.cat}</span>}</div>
        <h3>{p.title}</h3><p className="muted small">{p.desc.slice(0,120)}…</p><div className="chips"><Tags a={p.tags}/></div><div className="chips"><Tags a={p.tech} c="tech"/></div>
        <div className="row-btns end"><Btn2 onClick={()=>setModal(i)}>View Details</Btn2>{p.github&&<Btn alt href={p.github} target="_blank" rel="noopener">GitHub</Btn>}</div></Tilt></div>)}</div>
    </Sec>

    <Sec id="publications" n={4} title="Publications">
      <div className="filters">{PUB_FILTERS.map(f=><button key={f} className={pubF===f?'active':''} onClick={()=>setPubF(f)}>{f}</button>)}</div>
      <input className="search" type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title, author, year, or keyword" aria-label="Search publications"/>
      <div className="grid2" key={pubF}>{pubs.map((p,k)=><div key={p.title} className="pop" style={{animationDelay:k*90+'ms'}}><Tilt className="pad col">
        <div className="chips"><span className="tag">{p.type}</span><span className="tag tech">{p.year}</span></div><h3>{p.title}</h3>
        {p.authors&&<p className="small">{p.authors}</p>}<p className="muted small"><em>{p.venue}</em></p>
        {p.doi&&<p className="small brk">DOI: <a href={p.doi} target="_blank" rel="noopener">{p.doi.replace('https://doi.org/','')}</a></p>}
        {p.abstract&&<p className="small muted">{p.abstract}</p>}{p.keywords?.length>0&&<div className="chips"><Tags a={p.keywords}/></div>}
        <div className="row-btns end">{p.doi&&<Btn href={p.doi} target="_blank" rel="noopener">DOI</Btn>}{p.pdf&&<Btn alt href={p.pdf} target="_blank" rel="noopener">PDF</Btn>}{p.scholar&&<Btn alt href={p.scholar} target="_blank" rel="noopener">Google Scholar</Btn>}</div></Tilt></div>)}</div>
      {!pubs.length&&<p className="muted">No publications match your search.</p>}
    </Sec>

    <Sec id="experience" n={5} title="Education & Experience"><TL/></Sec>

    <Sec id="skills" n={6} title="Skills & Technologies"><div className="grid2">{Object.entries(SKILLS).map(([k,v],i)=><Reveal key={k} d={i*100}><Tilt className="pad"><h3>{k}</h3>{v.map((s,j)=><span key={s} className="tag skill" style={{animationDelay:j*60+'ms'}}>{s}</span>)}</Tilt></Reveal>)}</div></Sec>

    <Sec id="blog" n={7} title="Research Updates & Blog"><div className="grid3">{BLOG.map((b,i)=><Reveal key={i} d={i*100}><Tilt className="pad"><div className="muted small">{b.date} · <span className="acc">{b.cat}</span></div><h3>{b.title}</h3><p className="muted small">{b.excerpt}</p><a href={b.url} className="more">Read More →</a></Tilt></Reveal>)}</div></Sec>

    <Sec id="contact" n={8} title="Let's Collaborate"><div className="grid2">
      <Reveal><Tilt className="pad"><p className="muted">Interested in collaborating or discussing research? Reach out directly.</p><p>✉ <a href={'mailto:'+SITE.email}>{SITE.email}</a></p><Socials/></Tilt></Reveal>
      <Reveal d={120}><div className="card pad"><form onSubmit={submit} noValidate className="form">
        <label><input name="n" placeholder=" " required/><span>Name</span></label><label><input name="e" type="email" placeholder=" " required/><span>Email</span></label>
        <label className="full"><input name="s" placeholder=" " required/><span>Subject</span></label><label className="full"><textarea name="m" rows="4" placeholder=" " required/><span>Message</span></label>
        <Btn2 type="submit">{sent?'✓ Opening your email app…':'Send Message (opens email app)'}</Btn2></form></div></Reveal>
    </div></Sec>
    </main>

    <footer><div className="wrap"><strong>Saket Maheshwari</strong> <span className="muted">· AI &amp; Machine Learning Researcher</span>
      <p className="muted small">Exploring the intersection of Artificial Intelligence, Neuroscience, and Biomedical Research.</p><Socials/><p className="muted small">© {new Date().getFullYear()} Saket Maheshwari</p></div></footer>

    <button className={'top'+(sp>.1?' show':'')} onClick={()=>scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top">
      <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" pathLength="100" strokeDasharray="100" strokeDashoffset={100-sp*100}/></svg>↑</button>

    {modal!==null&&<div className="modal" onClick={()=>setModal(null)}><div className="card pad box" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true">
      <button className="icon-btn x" onClick={()=>setModal(null)} aria-label="Close">✕</button><h3>{PROJECTS[modal].title}</h3><p>{PROJECTS[modal].desc}</p>
      <div className="chips"><Tags a={PROJECTS[modal].tags}/></div><div className="chips"><Tags a={PROJECTS[modal].tech} c="tech"/></div></div></div>}
  </>}

function TL(){const[r,s]=useSeen(.1);
  return <div ref={r} className={'timeline'+(s?' go':'')}><div className="tl-line"/>{TIMELINE.map((t,i)=><div key={i} className="tl-item" style={{transitionDelay:300+i*250+'ms'}}><span className="dot"/>
    <div className="card pad"><span className="tag">{t.kind}</span><h3>{t.role}</h3><p className="acc">{t.org}</p><p className="muted small">{t.date}</p>{t.desc&&<p className="small">{t.desc}</p>}<Tags a={t.skills}/></div></div>)}</div>}
