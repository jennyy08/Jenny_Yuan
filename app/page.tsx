'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { projects, profile } from '../lib/data';
const kits = [
 {name:'Real Madrid', label:'The classic', color:'#f5f3eb', trim:'#333d49', accent:'#526d99', crest:'madrid'},
 {name:'Paris Saint-Germain', label:'After dark', color:'#23252c', trim:'#d5d3c6', accent:'#41434a', crest:'psg'},
 {name:'Bayern Munich', label:'Seeing red', color:'#df263d', trim:'#f1e6bd', accent:'#bc243b', crest:'bayern'},
 {name:'Real Madrid', label:'Pretty in pink', color:'#d76d92', trim:'#fff2d5', accent:'#ad4571', crest:'madrid'},
 {name:'Arsenal', label:'True blue', color:'#234c80', trim:'#f5d470', accent:'#2c5799', crest:'arsenal'},
];
function Shirt({index}: {index:number}) { const k=kits[index]; return <svg viewBox="0 0 240 260" role="img" aria-label={`${k.label} ${k.name} jersey`}>
<defs><pattern id={`texture${index}`} width="8" height="8" patternUnits="userSpaceOnUse"><path d="M0 0V8" stroke="#fff" strokeOpacity=".08" strokeWidth="2"/></pattern></defs>
<path d="M77 27L48 37 12 89 45 114 66 89 62 231Q120 244 178 231L174 89 195 114 228 89 192 37 163 27Z" fill={k.color} stroke="#172b3a" strokeWidth="3" strokeLinejoin="round"/>
<path d="M77 27L48 37 12 89 45 114 66 89 62 231Q120 244 178 231L174 89 195 114 228 89 192 37 163 27Z" fill={`url(#texture${index})`}/>
<path d="M79 28Q120 77 161 28L148 26Q120 50 92 26Z" fill={k.trim}/>
<path d="M20 79L51 102M189 102L220 79" stroke={k.trim} strokeWidth="8"/>
{index!==1 && <path d="M52 41L78 33M48 47L81 37M188 41L162 33M192 47L159 37" stroke={k.trim} strokeWidth="3"/>}
{index===1 && <g><path d="M102 58H133V233H102Z" fill="#434449"/>{[70,108,147,184].map((y,i)=><g key={y} fill="none" stroke="#55565b" strokeWidth="7" strokeLinecap="round" opacity=".65"><path d={`M76 ${y}q-10 9 2 18m12 -9q8 5 0 13M151 ${y+4}q15 -9 14 6m-14 8q-6 9 8 12`}/></g>)}</g>}
{index===2 && <path d="M82 110V227M97 110V230M143 110V230M158 110V227" stroke="#f65e42" strokeOpacity=".3" strokeWidth="6"/>}
{index===3 && <path d="M72 129L168 190M72 180L168 120" stroke="#f2a1bb" strokeOpacity=".16" strokeWidth="25"/>}
<image style={index===1?{filter:"grayscale(1)"}:undefined} href={`/crests/${k.crest}.png`} x="137" y="65" width="30" height="34"/>
<path d="M77 84h18m-18 5h13" stroke={k.trim} strokeWidth="3"/>
<path d="M73 218Q120 227 168 218" fill="none" stroke="#000" strokeOpacity=".1" strokeWidth="2"/>
</svg> }
function GoalNet({side}: {side:'left'|'right'}) {
 return <svg viewBox="0 0 120 160" preserveAspectRatio="none" aria-hidden="true"><defs><pattern id={`net-${side}`} width="9" height="9" patternUnits="userSpaceOnUse"><path d="M9 0H0V9" fill="none" stroke="#f4f2d9" strokeWidth="1" opacity=".65"/></pattern></defs>
 <g transform={side==='left'?'translate(120 0) scale(-1 1)':undefined}>
 <path d="M10 18L43 12 83 62 50 68V150L10 100Z" fill="#274732" opacity=".17"/>
 <path d="M10 18L43 12 83 62 50 68Z M43 12L83 62V144L43 94Z M50 68L83 62V144L50 150Z" fill={`url(#net-${side})`} stroke="#d1dac5" strokeWidth="2"/>
 <path d="M10 100L43 94L83 144L50 150" fill={`url(#net-${side})`} stroke="#d1dac5" strokeWidth="2"/>
 <path d="M10 100V18L50 68V150" fill="none" stroke="#42583d" strokeWidth="8" strokeLinejoin="round"/>
 <path d="M10 100V18L50 68V150" fill="none" stroke="#fffdec" strokeWidth="5" strokeLinejoin="round"/>
 
 </g></svg>
}
function Pitch({kit}: {kit:number}) {
 const [ball,setBall]=useState({x:40,y:74,turn:0});
 const [calling,setCalling]=useState(-1);
 const [scored,setScored]=useState(false);
 const locked=useRef(false);
 const timers=useRef<ReturnType<typeof setTimeout>[]>([]);
 useEffect(()=>{
  const first=setTimeout(()=>setCalling(2),3000);
  const cycle=setInterval(()=>setCalling(current=>(current+1)%5),5500);
  return ()=>{clearTimeout(first);clearInterval(cycle);timers.current.forEach(clearTimeout)};
 },[]);
 function pass(x:number,y:number,goal=false){
  if(locked.current)return;
  setBall(old=>({x:Math.max(3,Math.min(97,x)),y:Math.max(6,Math.min(88,y)),turn:old.turn+1}));
  setCalling(-1);
  if(goal){
   locked.current=true;
   timers.current.push(setTimeout(()=>setScored(true),650));
   timers.current.push(setTimeout(()=>{setScored(false);setBall({x:40,y:74,turn:0});locked.current=false},3300));
  }
 }
 return <div className="field-world">
  <div className="horizon" aria-hidden="true"><div className="trees trees-left"/><div className="trees trees-right"/><div className="club-banner"><img src={`/crests/${kits[kit].crest}.png`} alt=""/><span>{kits[kit].name.toUpperCase()}</span><img src={`/crests/${kits[kit].crest}.png`} alt=""/></div></div>
  <div className="full-pitch" onClick={event=>{
   if((event.target as HTMLElement).closest('button,a'))return;
   const bounds=event.currentTarget.getBoundingClientRect();
   pass((event.clientX-bounds.left)/bounds.width*100,(event.clientY-bounds.top)/bounds.height*100);
  }} aria-label={`Soccer field with players wearing the ${kits[kit].label} kit`}>
   <svg className="field-markings" viewBox="0 0 1400 600" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#eff7d5" strokeOpacity=".65" strokeWidth="3"><path d="M128 42H1272V555H128Z M700 42V555"/><ellipse cx="700" cy="266" rx="128" ry="93"/><path d="M128 180H240V375H128M1272 180H1160V375H1272 M128 120H340V438H128 M1272 120H1060V438H1272"/><path d="M340 200Q415 277 340 365M1060 200Q985 277 1060 365"/></g><circle cx="700" cy="266" r="5" fill="#eff7d5"/></svg>
   <button className="goal goal-left" aria-label="Shoot into the left goal" onClick={()=>pass(6,45,true)}><GoalNet side="left"/></button><button className="goal goal-right" aria-label="Shoot into the right goal" onClick={()=>pass(94,45,true)}><GoalNet side="right"/></button>
   {[['18','28'],['38','61'],['57','24'],['76','59'],['79','22']].map(([x,y],i)=><button key={i} type="button" className={`field-player player-${i}`} aria-label={`Pass to player ${[7,10,8,11,3][i]}`} onClick={()=>pass(Number(x)+2,Number(y)+13)} style={{left:`${x}%`,top:`${y}%`,'--skin':['#dba67d','#a76e4b','#f2c7a2','#c68b5f','#edba8d'][i]} as CSSProperties}>{calling===i && !scored && <span className="player-bubble">{i%2?"I’m open!":"Pass to me!"}</span>}<span className="pixel-head"/><span className="pixel-shirt"><small>{[7,10,8,11,3][i]}</small></span><span className="pixel-legs"/><span className="player-shadow"/></button>)}
   <div className="football free-ball" aria-hidden="true" style={{left:`${ball.x}%`,top:`${ball.y}%`,transform:`translate(-50%,-50%) rotate(${ball.turn*360}deg)`}}><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#fff9e9" stroke="#284334" strokeWidth="2"/><path d="M16 9L23 14 20 22H12L9 14Z M4 8L9 6 11 2 M24 5L27 10 30 11 M4 22L10 24 12 30 M24 25L28 21" fill="#314a3b"/></svg></div>
   <div className="goal-announcement" role="status" aria-live="polite">{scored && <span>You scored! <small>What a finish.</small></span>}</div>
   {scored && <div className="confetti" aria-hidden="true">{Array.from({length:36},(_,i)=><i key={i} style={{left:`${(i*29)%100}%`,'--fall-delay':`${(i%7)*.07}s`,'--confetti-color':i%3===0?'var(--kit)':i%3===1?'var(--trim)':'#fff4b8','--drift':`${i%2?80:-80}px`} as CSSProperties}/>)}</div>}
   <div className="corner-flag flag-left flag-near" aria-hidden="true"/><div className="corner-flag flag-right flag-near" aria-hidden="true"/><div className="corner-flag flag-left flag-far" aria-hidden="true"/><div className="corner-flag flag-right flag-far" aria-hidden="true"/>
   <a className="scroll-field" href="#experience">Scroll <span>↓</span></a>
  </div>
 </div>
}
const introWords = ['learning', 'building', 'experimenting', 'exploring', 'improving'];
function Intro() {
 const [word,setWord]=useState(0);
 useEffect(()=>{
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer:ReturnType<typeof setInterval>|undefined;
  function sync(){if(timer)clearInterval(timer);if(!motion.matches)timer=setInterval(()=>setWord(current=>(current+1)%introWords.length),3000);else setWord(0)}
  sync();motion.addEventListener('change',sync);
  return ()=>{if(timer)clearInterval(timer);motion.removeEventListener('change',sync)};
 },[]);
 return <div className="field-bio"><h1>Jenny Yuan</h1><a className="school-line" href={profile.schoolUrl} target="_blank" rel="noopener noreferrer">Computer Science @ University of Waterloo</a><p className="rotating-line" aria-label="Always learning, building, experimenting, exploring, and improving."><span aria-hidden="true">Always <span className="word-slot"><span key={word} className="rotating-word">{introWords[word]}.</span></span></span></p><a className="seeking-line" href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span> Seeking Summer 2027 internship opportunities</a></div>
}
export default function Home(){const [selected,setSelected]=useState<number|null>(null); const [entered,setEntered]=useState(false); const kit=selected??0;
useEffect(()=>{try {const saved=localStorage.getItem('jenny-kit');if(saved!==null && Number.isInteger(Number(saved)) && Number(saved)>=0 && Number(saved)<5){setSelected(Number(saved));setEntered(true)}}catch{}},[]);
function enter(){if(selected===null)return;try{localStorage.setItem('jenny-kit',String(selected))}catch{}setEntered(true);window.scrollTo(0,0)}
return <div className={`${entered?'site-entered':''} ${kit===1?'psg-theme':''}`} style={{'--accent':kits[kit].accent,'--kit':kits[kit].color,'--trim':kits[kit].trim} as CSSProperties}><div className="sky"><div className="cloud c1"/><div className="cloud c2"/><div className="cloud c3"/></div>
{!entered?<main className="selection"><header className="picker-header"><a href="mailto:jyuan042508@gmail.com" target="_blank" rel="noopener noreferrer">jenny yuan<span> / portfolio</span></a><span>YOUR VISIT. YOUR COLOURS.</span></header><div className="picker-title"><span className="eyebrow">WELCOME TO MY SIDE OF THE FIELD</span><h1>Choose your <em>kit.</em></h1><p>A few of my favourite teams and kits. Pick one to wear.</p></div><div className="kit-grid" role="group" aria-label="Choose a kit">{kits.map((k,i)=><button key={i} className={`kit ${selected===i?'selected':''}`} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="kit-number">0{i+1}</span><div className="jersey"><Shirt index={i}/></div><span className="kit-name">{k.name}</span><span className="kit-label">{k.label}</span><span className="radio">{selected===i?'✓':''}</span></button>)}</div><div className="enter-area"><button className="enter" disabled={selected===null} onClick={enter}>Enter the pitch <span>↗</span></button></div><footer className="picker-footer"><span>COMPUTER SCIENCE @ WATERLOO</span><span>You can switch kits anytime.</span><span>EST. 2026</span></footer><div className="grass"/></main>:<><header className="nav"><a className="brand" href="#about">jenny yuan<span> ✦</span></a><nav><a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a></nav><div className="nav-contact"><a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">Email ↗</a><a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><button onClick={()=>{setEntered(false);window.scrollTo(0,0)}}><img src={`/crests/${kits[kit].crest}.png`} alt=""/> Change kit</button></div></header><main className="portfolio"><section className="intro field-intro" id="about"><Intro/><Pitch kit={kit}/></section><section id="experience"><div className="section-heading"><span>01 / THE JOURNEY</span><h2>Experience</h2></div><div className="experience"><img src="/images/nokia-logo.png" alt="Nokia"/><div><h3>Software Engineering Intern</h3><p>Nokia</p><p>Built Python and React tools for internal deployment visibility.</p></div><span>Summer 2025</span></div></section><section id="projects"><div className="section-heading"><span>02 / THINGS I'VE BUILT</span><h2>Selected projects</h2></div><div className="projects">{projects.map((p,i)=><article key={p.title}><div className="project-image"><img src={p.images[0]} alt={`${p.title} application preview`}/><span>0{i+1} / {p.tag}</span></div><div className="project-title"><h3>{p.title}</h3><span>{p.year}</span></div><p>{p.description}</p></article>)}</div></section><footer id="contact" className="contact"><span className="eyebrow">03 / NEXT PLAY</span><h2>Let’s make<br/><em>something good.</em></h2><a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">{profile.email} ↗</a><div><span>© 2026 Jenny Yuan</span><a href="#about">Back to the top ↑</a></div></footer></main></> }</div>}
