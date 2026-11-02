import {useEffect,useRef,useState} from 'react';

/* ---------- shared helpers used by App and the section components ---------- */
export const RM=()=>typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
export const asset=p=>p&&!/^(https?:|data:)/.test(p)?import.meta.env.BASE_URL+p:p;

export function useSeen(th=.15){const r=useRef(null),[s,set]=useState(false);
  useEffect(()=>{const io=new IntersectionObserver(([e])=>e.isIntersecting&&(set(true),io.disconnect()),{threshold:th});io.observe(r.current);return()=>io.disconnect()},[]);return[r,s]}

export const Reveal=({d=0,children,className=''})=>{const[r,s]=useSeen();return <div ref={r} className={`rv ${s?'in':''} ${className}`} style={{transitionDelay:d+'ms'}}>{children}</div>};

export function Count({to,suffix='',dec=0}){const[r,s]=useSeen(),[n,setN]=useState(0);
  useEffect(()=>{if(!s)return;let t0;const f=t=>{t0??=t;const p=Math.min((t-t0)/1400,1);setN(+(to*(1-Math.pow(1-p,3))).toFixed(dec));p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)},[s]);
  return <span ref={r}>{n.toFixed(dec)}{suffix}</span>}

/* 3D tilt card with cursor spotlight */
export const Tilt=({children,className=''})=>{const r=useRef();
  const mv=e=>{const b=r.current.getBoundingClientRect(),px=(e.clientX-b.left)/b.width,py=(e.clientY-b.top)/b.height,s=r.current.style;
    s.setProperty('--mx',px*100+'%');s.setProperty('--my',py*100+'%');s.transform=`perspective(800px) rotateX(${(.5-py)*9}deg) rotateY(${(px-.5)*9}deg) translateY(-4px)`};
  return <div ref={r} className={'card '+className} onMouseMove={mv} onMouseLeave={()=>r.current.style.transform=''}>{children}</div>};

/* Magnetic button (link) and plain button */
export const Btn=({alt,children,...p})=>{const r=useRef();
  return <a ref={r} className={'btn'+(alt?' alt':'')} {...p}
    onMouseMove={e=>{const b=r.current.getBoundingClientRect();r.current.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.2}px,${(e.clientY-b.top-b.height/2)*.3}px)`}}
    onMouseLeave={()=>r.current.style.transform=''}>{children}</a>};
export const Btn2=({alt,children,...p})=><button className={'btn'+(alt?' alt':'')} {...p}>{children}</button>;

export const Tags=({a=[],c=''})=>a.map(t=><span key={t} className={'tag '+c}>{t}</span>);

export const Sec=({id,n,title,sub,children})=><section id={id} className="sec"><div className="wrap"><Reveal><div className="eyebrow">{String(n).padStart(2,'0')} / {id}</div><h2 className="sec-title">{title}</h2>{sub&&<p className="sec-sub muted">{sub}</p>}</Reveal>{children}</div></section>;

/* Animated progress ring. value = fill percentage (0-100); to/dec/suffix = number shown in the middle */
export function Ring({value,to,dec=0,suffix='',label,sub,color='var(--c)'}){const[r,s]=useSeen(.3);
  return <div ref={r} className="ring-box">
    <svg viewBox="0 0 120 120" className="ring" role="img" aria-label={`${to}${suffix} ${label}`}>
      <circle cx="60" cy="60" r="52" pathLength="100" className="ring-bg"/>
      <circle cx="60" cy="60" r="52" pathLength="100" className="ring-fg" style={{stroke:color,strokeDasharray:100,strokeDashoffset:s?100-value:100}}/>
    </svg>
    <div className="ring-num"><Count to={to} dec={dec} suffix={suffix}/></div>
    <div className="ring-label">{label}</div>{sub&&<div className="muted small">{sub}</div>}
  </div>}
