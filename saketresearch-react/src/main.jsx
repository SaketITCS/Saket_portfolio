import {useEffect,useRef,useState} from 'react';import {createRoot} from 'react-dom/client';
import App from './App.jsx';import CoAuthors from './CoAuthors.jsx';import './styles.css';import './extra.css';

/* tiny hash router: #/coauthors is its own page, everything else is the one-page site */
const route=()=>location.hash.startsWith('#/coauthors')?'coauthors':'home';
function Root(){const[r,setR]=useState(route),last=useRef(route());
  useEffect(()=>{const f=()=>{const n=route(),was=last.current;last.current=n;setR(n);
      if(n==='coauthors'){scrollTo(0,0)}
      else if(was==='coauthors'){const id=location.hash.slice(1);setTimeout(()=>{const e=id&&document.getElementById(id);e?e.scrollIntoView():scrollTo(0,0)},150)}};
    addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);
  return r==='coauthors'?<CoAuthors/>:<App/>}
createRoot(document.getElementById('root')).render(<Root/>);
