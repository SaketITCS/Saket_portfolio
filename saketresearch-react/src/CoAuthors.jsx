import {useEffect,useState} from 'react';
import {Reveal,Tilt,Btn,asset} from './ui.jsx';
import {COAUTHORS,PUBLICATIONS} from './data.js';
import {Neural,Glow} from './App.jsx';

function Photo({m}){
  return <div className="m-photo"><span className="m-ini">{m.initials}</span>
    <img src={asset(`assets/images/coauthors/${m.slug}.jpg`)} alt={`Portrait of ${m.name}`} loading="lazy" onError={e=>{e.currentTarget.style.display='none'}}/></div>}

export default function CoAuthors(){
  const[theme,setTheme]=useState(()=>{try{return localStorage.getItem('theme')||'dark'}catch{return'dark'}});
  const[q,setQ]=useState('');
  useEffect(()=>{document.documentElement.dataset.theme=theme;try{localStorage.setItem('theme',theme)}catch{}},[theme]);
  useEffect(()=>{const t=document.title;document.title='Co-Authors | Saket Maheshwari';return()=>{document.title=t}},[]);

  const people=COAUTHORS.map(m=>({m,papers:PUBLICATIONS.filter(p=>(p.authors||'').includes(m.match))}))
    .sort((a,b)=>b.papers.length-a.papers.length);
  const shown=people.filter(({m})=>(m.name+' '+m.affil+' '+m.role).toLowerCase().includes(q.toLowerCase()));
  const joint=new Set(people.flatMap(x=>x.papers.map(p=>p.title))).size;

  return <>
    <Neural/><Glow/><div className="aurora a1"/><div className="aurora a2"/><div className="aurora a3"/><div className="gridbg"/>
    <nav className="nav"><div className="wrap nav-in">
      <a href="#home" className="brand"><span className="logo">SM</span>Saket Maheshwari</a>
      <div className="nav-r"><a className="btn alt back" href="#publications">← Back to site</a>
        <button className="icon-btn" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">{theme==='dark'?'☀':'☾'}</button></div>
    </div></nav>

    <main><section className="sec page-top"><div className="wrap">
      <Reveal><div className="eyebrow">Collaborators</div><h1 className="sec-title">My Co-Authors</h1>
        <p className="sec-sub muted">{COAUTHORS.length} researchers I have published with, across {joint} joint publications. Thank you for the guidance and collaboration.</p></Reveal>
      <input className="search" type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search co-authors by name or affiliation" aria-label="Search co-authors"/>
      <div className="ca-grid">{shown.map(({m,papers},i)=><Reveal key={m.slug} d={(i%3)*100}><Tilt className="pad col ca">
        <Photo m={m}/><span className="tag ok">{m.role}</span><h3>{m.name}</h3>{m.affil&&<p className="muted small">{m.affil}</p>}
        <div className="m-count"><b>{papers.length}</b><span>joint publication{papers.length===1?'':'s'}</span></div>
        <ul className="m-papers">{papers.map(p=><li key={p.title}><span className="small">{p.title}</span>
          <span className="muted small"><em>{p.venue.split(',')[0]}</em> · {p.year}{p.doi&&<> · <a href={p.doi} target="_blank" rel="noopener">DOI</a></>}</span></li>)}</ul>
      </Tilt></Reveal>)}</div>
      {!shown.length&&<p className="muted">No co-authors match your search.</p>}
      <div className="center"><Btn href="#publications">← Back to publications</Btn></div>
    </div></section></main>

    <footer><div className="wrap"><strong>Saket Maheshwari</strong> <span className="muted">· AI &amp; Machine Learning Researcher</span>
      <p className="muted small">© {new Date().getFullYear()} Saket Maheshwari</p></div></footer>
  </>}
