import {useState} from 'react';
import {Reveal,Tilt,Tags} from './ui.jsx';
import {BIO} from './data.js';

const POS=[[110,92],[490,92],[490,258],[110,258]];            // node centres around the hub (300,175)
const HUB=[300,175];
const strip=(a,b,ph)=>Array.from({length:301},(_,i)=>`${i?'L':'M'}${i*2},${(20+a*Math.sin(i/9+ph)+b*Math.sin(i/3.1+ph*2)).toFixed(1)}`).join('');

function Hub(){
  const[k,setK]=useState('eeg'),cur=BIO.find(b=>b.k===k);
  return <div className="grid2 bio">
    <Reveal><Tilt className="hubcard">
      <svg viewBox="0 0 600 350" role="group" aria-label="Biomedical AI focus areas">
        <defs><radialGradient id="hubg"><stop offset="0" stopColor="#8b5cf6"/><stop offset="1" stopColor="#2563eb"/></radialGradient></defs>
        {BIO.map((b,i)=><line key={b.k} x1={HUB[0]} y1={HUB[1]} x2={POS[i][0]} y2={POS[i][1]} className={'spoke'+(k===b.k?' on':'')}/>)}
        <circle cx={HUB[0]} cy={HUB[1]} r="62" className="hub-ring"/><circle cx={HUB[0]} cy={HUB[1]} r="50" fill="url(#hubg)"/>
        <text x={HUB[0]} y={HUB[1]-2} className="hub-t" textAnchor="middle">Biomedical</text><text x={HUB[0]} y={HUB[1]+16} className="hub-t" textAnchor="middle">AI</text>
        {BIO.map((b,i)=><g key={b.k} className={'bnode'+(k===b.k?' on':'')} transform={`translate(${POS[i][0]},${POS[i][1]})`} tabIndex="0" role="button" aria-pressed={k===b.k} aria-label={b.title}
          onClick={()=>setK(b.k)} onMouseEnter={()=>setK(b.k)} onFocus={()=>setK(b.k)} onKeyDown={e=>(e.key==='Enter'||e.key===' ')&&(e.preventDefault(),setK(b.k))}>
          <circle r="44" className="bn-bg"/><circle r="44" className="bn-ring"/><text y="8" textAnchor="middle" fontSize="26">{b.icon}</text>
          <text y="64" textAnchor="middle" className="bn-l">{b.title}</text></g>)}
      </svg></Tilt></Reveal>

    <Reveal d={120}><div className="card pad detail" key={k}>
      <div className="detail-ic">{cur.icon}</div><h3>{cur.title}</h3><p className="muted">{cur.blurb}</p>
      <ul className="work">{cur.items.map(it=><li key={it.t}><b>{it.t}</b><span className="small muted">{it.s}</span><span className="tag tech">{it.m}</span></li>)}</ul>
    </div></Reveal>
  </div>}

export default function Biomedical(){
  return <>
    <Reveal><div className="manifest card pad">
      <svg viewBox="0 0 600 40" preserveAspectRatio="none" className="strip" aria-hidden="true">
        <path d={strip(8,4,0)} className="s1"/><path d={strip(5,6,1.5)} className="s2"/><path d={strip(10,3,3)} className="s3"/></svg>
      <p>My focus is <strong>applying machine learning to neurological and physiological signal analysis</strong>, with an emphasis on <strong>low-resource and clinically relevant settings</strong>.</p>
    </div></Reveal>
    <Hub/>
    <Reveal><div className="toolrow card pad"><span className="muted small">Biomedical toolkit</span><div className="chips"><Tags a={['MNE-Python','PyWavelets','librosa','OpenCV','Whisper','PyTorch','TensorFlow','Keras','scikit-learn']} c="tech"/></div></div></Reveal>
  </>}
