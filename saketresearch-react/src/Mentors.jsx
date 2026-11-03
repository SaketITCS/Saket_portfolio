import {Reveal,Tilt,Btn,asset} from './ui.jsx';
import {MENTORS,PUBLICATIONS} from './data.js';

function Photo({m}){
  return <div className="m-photo"><span className="m-ini">{m.initials}</span>
    <img src={asset(`assets/images/mentors/${m.slug}.jpg`)} alt={`Portrait of ${m.name}`} loading="lazy" onError={e=>{e.currentTarget.style.display='none'}}/></div>}

export default function Mentors(){
  return <div className="grid2 mentors">{MENTORS.map((m,i)=>{
    const papers=PUBLICATIONS.filter(p=>p.authors.includes(m.match));
    return <Reveal key={m.slug} d={i*120}><Tilt className="pad col mentor">
      <div className="m-top"><Photo m={m}/><div><span className="tag ok">{m.role}</span><h3>{m.name}</h3>{m.affil&&<p className="muted small">{m.affil}</p>}</div></div>
      <div className="m-count"><b>{papers.length}</b><span>joint publication{papers.length===1?'':'s'} with me</span></div>
      <ul className="m-papers">{papers.map(p=><li key={p.title}><span className="small">{p.title}</span>
        <span className="muted small"><em>{p.venue.split(',')[0]}</em> · {p.year}{p.doi&&<> · <a href={p.doi} target="_blank" rel="noopener">DOI</a></>}</span></li>)}</ul>
      <p className="muted small m-thanks">Thank you for the guidance and collaboration.</p></Tilt></Reveal>})}</div>}
