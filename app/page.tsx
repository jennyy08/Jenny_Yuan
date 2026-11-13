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
 // The button uses the same 1400 × 600 coordinates as the pitch:
 // its top is y=110, so the post feet land at (158,222) and (110,342).
 return <svg viewBox="0 0 190 240" preserveAspectRatio="none" aria-hidden="true">
 <defs><pattern id={`net-${side}`} width="10" height="10" patternUnits="userSpaceOnUse"><path d="M0 5L5 0 10 5 5 10Z" fill="none" stroke="#f9f7dc" strokeWidth=".9"/></pattern></defs>
 <g transform={side==='right'?'translate(190 0) scale(-1 1)':undefined}>
 <path d="M158 44L96 53 48 173 110 164Z M96 53L48 173V232L96 112Z M48 173L110 164V232H48Z" fill={`url(#net-${side})`} stroke="#cfdbc9" strokeWidth="2"/>
 <path d="M158 112V44L110 164V232" fill="none" stroke="#42583d" strokeWidth="7" strokeLinejoin="round"/>
 <path d="M158 112V44L110 164V232" fill="none" stroke="#fffdec" strokeWidth="4" strokeLinejoin="round"/>
 </g></svg>
}
function Pitch({kit}: {kit:number}) {
 const field=useRef<HTMLDivElement>(null);
 const [ball,setBall]=useState({x:40,y:74,turn:0,ms:0,angle:0});
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
  const node=field.current;
  if(!node)return;
  const ballNode=node.querySelector('.free-ball') as HTMLElement;
  x=Math.max(3,Math.min(97,x));y=Math.max(6,Math.min(88,y));
  const dx=node.clientWidth*x/100-parseFloat(getComputedStyle(ballNode).left);
  const dy=node.clientHeight*y/100-parseFloat(getComputedStyle(ballNode).top);
  const distance=Math.hypot(dx,dy);
  const ms=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:Math.min(1900,290+distance*1.1);
  setBall(old=>({x,y,turn:old.turn+Math.min(3.25, Math.max(.18,distance/245)),ms,angle:Math.atan2(dy,dx)*180/Math.PI}));
  setCalling(-1);
  if(goal){
   locked.current=true;
   timers.current.push(setTimeout(()=>setScored(true),ms));
   timers.current.push(setTimeout(()=>{setScored(false);setBall({x:40,y:74,turn:0,ms:0,angle:0});locked.current=false},ms+2400));
  }
 }
 return <div className="field-world">
  <div className="horizon" aria-hidden="true"><div className="trees trees-left"/><div className="trees trees-right"/><div className="club-banner"><img src={`/crests/${kits[kit].crest}.png`} alt=""/><span>{kits[kit].name.toUpperCase()}</span><img src={`/crests/${kits[kit].crest}.png`} alt=""/></div></div>
  <div ref={field} className="full-pitch" onClick={event=>{
   if((event.target as HTMLElement).closest('button,a'))return;
   const bounds=event.currentTarget.getBoundingClientRect();
   pass((event.clientX-bounds.left)/bounds.width*100,(event.clientY-bounds.top)/bounds.height*100);
  }} aria-label={`Soccer field with players wearing the ${kits[kit].label} kit`}>
   <svg className="field-markings" viewBox="0 0 1400 600" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#eff7d5" strokeOpacity=".65" strokeWidth="3"><path d="M230 42H1170L1375 555H25Z M700 42V555"/><ellipse cx="700" cy="266" rx="128" ry="93"/><path d="M175 180H268L207 375H97 M1225 180H1132L1193 375H1303 M199 120H369L286 438H72 M1201 120H1031L1114 438H1328"/><path d="M348 200Q407 277 305 365 M1052 200Q993 277 1095 365"/></g><circle cx="700" cy="266" r="5" fill="#eff7d5"/></svg>
   <button className="goal goal-left" aria-label="Shoot into the left goal" onClick={()=>pass(8,43,true)}><GoalNet side="left"/></button><button className="goal goal-right" aria-label="Shoot into the right goal" onClick={()=>pass(92,43,true)}><GoalNet side="right"/></button>
   {[['18','28'],['38','61'],['57','24'],['76','59'],['79','22']].map(([x,y],i)=><button key={i} type="button" className={`field-player player-${i}`} aria-label={`Pass to player ${[7,10,8,11,3][i]}`} onClick={()=>pass(Number(x)+2,Number(y)+13)} style={{left:`${x}%`,top:`${y}%`,'--skin':['#dba67d','#a76e4b','#f2c7a2','#c68b5f','#edba8d'][i]} as CSSProperties}>{calling===i && !scored && <span className="player-bubble">{i%2?"I’m open!":"Pass to me!"}</span>}<span className="pixel-head"/><span className="pixel-shirt"><small>{[7,10,8,11,3][i]}</small></span><span className="pixel-legs"/><span className="player-shadow"/></button>)}
   <div className="ball-traces" aria-hidden="true">{[3,2,1].map(n=><i key={n} style={{left:`${ball.x}%`,top:`${ball.y}%`,width:5+n,height:5+n,opacity:.85-n*.13,transitionDuration:`${ball.ms}ms`,transitionDelay:`${ball.ms?n*28:0}ms`}}/>)}</div>
   <div className="football free-ball" aria-hidden="true" style={{left:`${ball.x}%`,top:`${ball.y}%`,transform:'translate(-50%,-50%)',transitionDuration:`${ball.ms}ms`}}><svg style={{transform:`rotate(${ball.turn*360}deg)`,transitionDuration:`${ball.ms}ms`}} viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="#fffdf4" stroke="#26362d" strokeWidth="1.5"/><g fill="#25342e" stroke="#25342e" strokeWidth=".6">{[0,72,144,216,288].map(d=><g key={d} transform={`rotate(${d} 16 16)`}><path d="M12 2Q16 0 20 2L19 5H14Z"/><path d="M16 5L16 10" fill="none"/></g>)}<path d="M16 10L22 14L20 21H12L10 14Z"/></g></svg></div>
   <div className="goal-announcement" role="status" aria-live="polite">{scored && <span>You scored! <small>What a finish.</small></span>}</div>
   {scored && <div className="confetti" aria-hidden="true">{Array.from({length:36},(_,i)=><i key={i} style={{left:`${(i*29)%100}%`,'--fall-delay':`${(i%7)*.07}s`,'--confetti-color':i%3===0?'var(--kit)':i%3===1?'var(--trim)':'#fff4b8','--drift':`${i%2?80:-80}px`} as CSSProperties}/>)}</div>}
   <div className="corner-flag flag-left flag-near" aria-hidden="true"/><div className="corner-flag flag-right flag-near" aria-hidden="true"/><div className="corner-flag flag-left flag-far" aria-hidden="true"/><div className="corner-flag flag-right flag-far" aria-hidden="true"/>
   <a className="scroll-field" href="#experience" aria-label="Scroll to experience"><span aria-hidden="true">↓</span></a>
  </div>
 </div>
}
const introWords = ['learning', 'building', 'experimenting', 'exploring', 'improving'];
function Intro({onField=false}:{onField?:boolean}) {
 const Name=onField?"h2":"h1";
 const [word,setWord]=useState(0);
 useEffect(()=>{
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer:ReturnType<typeof setInterval>|undefined;
  function sync(){if(timer)clearInterval(timer);if(!motion.matches)timer=setInterval(()=>setWord(current=>(current+1)%introWords.length),3000);else setWord(0)}
  sync();motion.addEventListener('change',sync);
  return ()=>{if(timer)clearInterval(timer);motion.removeEventListener('change',sync)};
 },[]);
 return <div className="field-bio"><Name>Jenny Yuan</Name><a className="school-line" href={profile.schoolUrl} target="_blank" rel="noopener noreferrer">Computer Science @ University of Waterloo</a><p className="rotating-line" aria-label="Always learning, building, experimenting, exploring, and improving."><span aria-hidden="true">Always <span className="word-slot"><span key={word} className="rotating-word">{introWords[word]}.</span></span></span></p><a className="seeking-line" href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span> Seeking Summer 2027 internship opportunities</a></div>
}
function KitBar({kit,choose}:{kit:number;choose:(i:number)=>void}){
 const [preview,setPreview]=useState<number|null>(null);
 const timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 function clear(){clearTimeout(timer.current);setPreview(null)}
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 return <div className="field-kits" role="group" aria-label="Choose a kit" onPointerLeave={clear} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))clear()}} onKeyDown={e=>{if(e.key==='Escape')clear()}}>
 {preview!==null && <div className="kit-peek" aria-hidden="true"><Shirt index={preview}/><strong>{kits[preview].name}</strong></div>}
 {kits.map((k,i)=><button key={k.label} type="button" aria-label={k.name+' · '+k.label} aria-pressed={kit===i} style={{'--fabric':k.color,'--stripe':k.trim} as CSSProperties} onPointerEnter={e=>{if(e.pointerType==='mouse'){clear();timer.current=setTimeout(()=>setPreview(i),500)}}} onFocus={e=>{if(e.currentTarget.matches(':focus-visible'))setPreview(i)}} onClick={()=>{clearTimeout(timer.current);choose(i);setPreview(i);timer.current=setTimeout(()=>setPreview(null),1500)}}><i/></button>)}</div>
}
function WorkCard({p}:{p:(typeof projects)[number]}){
 const ref=useRef<HTMLVideoElement>(null);
 const [playing,setPlaying]=useState(false);
 const stop=()=>{const v=ref.current;if(v){v.pause();v.currentTime=0}setPlaying(false)};
 const start=()=>{ref.current?.play().catch(()=>setPlaying(false))};
 const media=<><img src={p.images[0]} alt={p.title+' preview'} loading="lazy"/>{p.video && <><video ref={ref} src={p.video} preload="none" muted playsInline loop aria-hidden="true" onPlaying={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/><span className="work-play">{playing?'Ⅱ Pause':'▷ Preview'}</span></>}</>;
 return <article className={'work-card work-'+p.title.split(' ')[0].toLowerCase()}>
 {p.video?<button type="button" className="work-media" data-playing={playing} onPointerEnter={e=>{if(e.pointerType==='mouse'&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)start()}} onPointerLeave={e=>{if(e.pointerType==='mouse')stop()}} onClick={()=>playing?stop():start()} aria-label={(playing?'Pause ':'Play ')+p.title+' preview'}>{media}</button>:<div className="work-media">{media}</div>}
 <div className="work-meta">{p.tag} · {p.year}</div><div className="work-title-links"><h3>{p.title}</h3><div>{([['GitHub',p.github],['Devpost',p.devpost],['Live demo',p.live]] as const).map(([label,url])=>url&&<a key={label} href={url} target="_blank" rel="noopener noreferrer" title={label} aria-label={p.title+' · '+label}><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{label==='Live demo'?<path d="M14 3h7v7m0-7L10 14m0-10H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-5"/>:label==='Devpost'?<><path d="M6 3h12l5 9-5 9H6l-5-9z"/><path d="M9 7h3a5 5 0 0 1 0 10H9z"/></>:<path d="M9 21v-3c-4 1-4-2-6-2m12 5v-3.4c0-1-.3-1.7-.9-2.1 3.1-.4 6.4-1.5 6.4-6.8 0-1.5-.5-2.7-1.4-3.6.2-.6.6-1.8-.1-3.2 0 0-1.2-.4-3.8 1.4a13 13 0 0 0-6.6 0C6 1.5 4.8 1.9 4.8 1.9c-.7 1.4-.3 2.6-.1 3.2a5 5 0 0 0-1.4 3.6c0 5.3 3.3 6.4 6.4 6.8-.5.4-.8 1.1-.8 2.1"/>}</svg></a>)}</div></div>{p.award&&<strong className="work-award">{p.award}</strong>}<p>{p.description}</p></article>
}
export default function Home(){
 const story=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=story.current;if(!el)return;
  function update(){
   if(!el)return;
   const progress=Math.max(0,Math.min(1,-el.getBoundingClientRect().top/(1.15*el.clientHeight/2.75)));
   el.style.setProperty('--descent',String(progress));
   el.style.setProperty('--approach',String(Math.sin(Math.PI*Math.max(0,(progress-.25)/.75))));
   el.dataset.landed=String(progress>.85 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  return ()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update)};
 },[]);
 const [kit,setKit]=useState(0);
 useEffect(()=>{try{const value=Number(localStorage.getItem('jenny-kit'));if(Number.isInteger(value)&&value>=0&&value<kits.length)setKit(value)}catch{}},[]);
 function choose(i:number){setKit(i);try{localStorage.setItem('jenny-kit',String(i))}catch{}}
 return <div className={`site-entered ${kit===1?'psg-theme':''}`} style={{'--accent':kits[kit].accent,'--kit':kits[kit].color,'--trim':kits[kit].trim} as CSSProperties}><header className="nav"><a className="brand" href="#about">jenny yuan<span> ✦</span></a><nav><a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a></nav><div className="nav-contact"><a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">Email ↗</a><a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></header><main className="portfolio"><div ref={story} className="field-story" id="about"><div className="pitch-marker" id="pitch"/><div className="story-frame"><div className="sky-layers" aria-hidden="true">{['a','b','c','d','e','f'].map(n=><i key={n} className={'sky-wisp sky-'+n}/>)}</div><div className="story-copy"><Intro/><a className="built-link" href="#projects">See what I built ↗</a></div><div className="story-grass"><Pitch kit={kit}/><KitBar kit={kit} choose={choose}/></div></div></div><section id="experience"><div className="section-heading"><span>01 / THE JOURNEY</span><h2>Experience</h2></div><div className="experience"><img src="/images/nokia-logo.png" alt="Nokia"/><div><h3>Software Engineering Intern</h3><p>Nokia</p><p>Built Python and React tools for internal deployment visibility.</p></div><span>Summer 2025</span></div></section><section id="projects"><div className="section-heading"><span>02 / THINGS I'VE BUILT</span><h2>Selected projects</h2></div><div className="work-gallery">{projects.map(p=><WorkCard key={p.title} p={p}/>)}</div></section><footer id="contact" className="contact"><span className="eyebrow">03 / CONNECT</span><h2>Let’s connect.</h2><a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">{profile.email} ↗</a><div><span>© 2026 Jenny Yuan</span><a href="#about">Back to the top ↑</a></div></footer></main></div>}
