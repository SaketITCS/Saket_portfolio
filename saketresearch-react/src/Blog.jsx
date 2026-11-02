import {useEffect,useRef,useState} from 'react';
import {Reveal,Tilt} from './ui.jsx';
import {BLOG} from './data.js';

const words=b=>b.reduce((n,x)=>n+(typeof x==='string'?x:Array.isArray(x[1])?x[1].join(' '):x[1]).split(/\s+/).length,0);
const mins=b=>Math.max(1,Math.round(words(b.body)/200));

function Block({x}){
  if(typeof x==='string')return <p>{x}</p>;
  if(x[0]==='h')return <h4>{x[1]}</h4>;
  if(x[0]==='q')return <blockquote>{x[1]}</blockquote>;
  if(x[0]==='ul')return <ul>{x[1].map(i=><li key={i}>{i}</li>)}</ul>;
  return null}

function Reader({post,onClose}){
  const box=useRef();
  useEffect(()=>{const k=e=>e.key==='Escape'&&onClose();addEventListener('keydown',k);document.body.style.overflow='hidden';box.current?.focus();
    return()=>{removeEventListener('keydown',k);document.body.style.overflow=''}},[]);
  return <div className="modal" onClick={onClose}><article className="card pad box reader" ref={box} tabIndex="-1" onClick={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label={post.title}>
    <button className="icon-btn x" onClick={onClose} aria-label="Close">✕</button>
    <div className="muted small"><span className="acc">{post.cat}</span> · {mins(post)} min read · by Saket Maheshwari</div>
    <h3 className="reader-title">{post.title}</h3>
    {post.body.map((x,i)=><Block key={i} x={x}/>)}
  </article></div>}

export default function Blog(){
  const[open,setOpen]=useState(null),[f,...rest]=BLOG;
  return <>
    <Reveal><Tilt className="pad feat"><div className="muted small"><span className="acc">{f.cat}</span> · {mins(f)} min read · Featured</div>
      <h3>{f.title}</h3><p className="muted">{f.excerpt}</p><button className="more linkbtn" onClick={()=>setOpen(f)}>Read article →</button></Tilt></Reveal>
    <div className="grid2 mt">{rest.map((b,i)=><Reveal key={b.slug} d={i*90}><Tilt className="pad col"><div className="muted small"><span className="acc">{b.cat}</span> · {mins(b)} min read</div>
      <h3>{b.title}</h3><p className="muted small">{b.excerpt}</p><div className="row-btns end"><button className="more linkbtn" onClick={()=>setOpen(b)}>Read article →</button></div></Tilt></Reveal>)}</div>
    {open&&<Reader post={open} onClose={()=>setOpen(null)}/>}
  </>}
