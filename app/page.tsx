'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { projects, profile } from '../lib/data';
const kits = [
 {name:'Real Madrid', label:'The classic', color:'#f5f3eb', trim:'#333d49', accent:'#526d99', crest:'madrid'},
 {name:'Paris Saint-Germain', label:'After dark', color:'#23252c', trim:'#e14158', accent:'#b92e48', crest:'psg'},
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
{index===1 && <path d="M120 59V232" stroke={k.trim} strokeWidth="2"/>}
{index===2 && <path d="M82 110V227M97 110V230M143 110V230M158 110V227" stroke="#f65e42" strokeOpacity=".3" strokeWidth="6"/>}
{index===3 && <path d="M72 129L168 190M72 180L168 120" stroke="#f2a1bb" strokeOpacity=".16" strokeWidth="25"/>}
<image href={`/crests/${k.crest}.png`} x="137" y="65" width="30" height="34"/>
<path d="M77 84h18m-18 5h13" stroke={k.trim} strokeWidth="3"/>
<path d="M73 218Q120 227 168 218" fill="none" stroke="#000" strokeOpacity=".1" strokeWidth="2"/>
</svg> }
function Pitch({kit}: {kit:number}) {
 const [passed,setPassed]=useState(false);
 return <div className="field-world">
  <div className="horizon" aria-hidden="true"><div className="trees trees-left"/><div className="trees trees-right"/><div className="club-banner"><img src={`/crests/${kits[kit].crest}.png`} alt=""/><span>{kits[kit].name.toUpperCase()}</span><img src={`/crests/${kits[kit].crest}.png`} alt=""/></div></div>
  <div className="full-pitch" aria-label={`Soccer field with players wearing the ${kits[kit].label} kit`}>
   <svg className="field-markings" viewBox="0 0 1400 600" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#eff7d5" strokeOpacity=".65" strokeWidth="3"><path d="M175 42H1225L1460 555H-60Z M700 42V555"/><ellipse cx="700" cy="266" rx="128" ry="93"/><path d="M112 180H265L212 375H22M1288 180H1135L1188 375H1378 M142 120H340L252 438H-5 M1258 120H1060L1148 438H1405"/><path d="M321 200Q420 277 286 365M1079 200Q980 277 1114 365"/></g><circle cx="700" cy="266" r="5" fill="#eff7d5"/></svg>
   <div className="goal goal-left" aria-hidden="true"/><div className="goal goal-right" aria-hidden="true"/>
   {[['18','28'],['38','61'],['57','24'],['76','59'],['87','22']].map(([x,y],i)=><div key={i} className={`field-player player-${i}`} aria-hidden="true" style={{left:`${x}%`,top:`${y}%`,'--skin':['#dba67d','#a76e4b','#f2c7a2','#c68b5f','#edba8d'][i]} as CSSProperties}><span className="pixel-head"/><span className="pixel-shirt"><small>{[7,10,8,11,3][i]}</small></span><span className="pixel-legs"/><span className="player-shadow"/></div>)}
   <button className={`football ${passed?'passed':''}`} onClick={()=>setPassed(!passed)} aria-label="Pass the football" title="Make a pass"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="14" fill="#fff9e9" stroke="#284334" strokeWidth="2"/><path d="M16 9L23 14 20 22H12L9 14Z M4 8L9 6 11 2 M24 5L27 10 30 11 M4 22L10 24 12 30 M24 25L28 21" fill="#314a3b"/></svg></button>
   <div className="corner-flag flag-left" aria-hidden="true"/><div className="corner-flag flag-right" aria-hidden="true"/>
   <span className="field-note">a little less scrolling. a little more playing.</span>
   <a className="scroll-field" href="#experience">A little about my work <span>↓</span></a>
  </div>
 </div>
}
export default function Home(){const [selected,setSelected]=useState<number|null>(null); const [entered,setEntered]=useState(false); const kit=selected??0;
useEffect(()=>{try {const saved=localStorage.getItem('jenny-kit');if(saved!==null && Number.isInteger(Number(saved)) && Number(saved)>=0 && Number(saved)<5){setSelected(Number(saved));setEntered(true)}}catch{}},[]);
function enter(){if(selected===null)return;try{localStorage.setItem('jenny-kit',String(selected))}catch{}setEntered(true);window.scrollTo(0,0)}
return <div className={entered?'site-entered':''} style={{'--accent':kits[kit].accent,'--kit':kits[kit].color,'--trim':kits[kit].trim} as CSSProperties}><div className="sky"><div className="cloud c1"/><div className="cloud c2"/><div className="cloud c3"/></div>
{!entered?<main className="selection"><header className="picker-header"><a href="mailto:jyuan042508@gmail.com">jenny yuan<span> / portfolio</span></a><span>YOUR VISIT. YOUR COLOURS.</span></header><div className="picker-title"><span className="eyebrow">WELCOME TO MY SIDE OF THE FIELD</span><h1>Choose your <em>kit.</em></h1><p>Five kits. Same me. Pick your colours and come on in.</p></div><div className="kit-grid" role="group" aria-label="Choose a kit">{kits.map((k,i)=><button key={i} className={`kit ${selected===i?'selected':''}`} aria-pressed={selected===i} onClick={()=>setSelected(i)}><span className="kit-number">0{i+1}</span><div className="jersey"><Shirt index={i}/></div><span className="kit-name">{k.name}</span><span className="kit-label">{k.label}</span><span className="radio">{selected===i?'✓':''}</span></button>)}</div><div className="enter-area"><button className="enter" disabled={selected===null} onClick={enter}>Enter the pitch <span>↗</span></button><p>{selected===null?'Make yourself at home. Start with a kit.':`${kits[kit].label}. Good choice. See you on the field.`}</p></div><footer className="picker-footer"><span>COMPUTER SCIENCE @ WATERLOO</span><span>You can switch kits anytime.</span><span>EST. 2026 · ALWAYS BUILDING</span></footer><div className="grass"/></main>:<><header className="nav"><a className="brand" href="#about">jenny yuan<span> ✦</span></a><nav><a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a></nav><div className="nav-contact"><a href={`mailto:${profile.email}`}>Email ↗</a><a href={profile.links.github}>GitHub ↗</a><a href={profile.links.linkedin}>LinkedIn ↗</a><button onClick={()=>{setEntered(false);window.scrollTo(0,0)}}><img src={`/crests/${kits[kit].crest}.png`} alt=""/> Change kit</button></div></header><main className="portfolio"><section className="intro field-intro" id="about"><div className="field-bio"><span className="eyebrow">COMPUTER SCIENCE @ WATERLOO</span><h1>Hi, I’m Jenny. <em>Welcome to my field.</em></h1><p>I like turning curious ideas into useful things.<br/>Usually building something, watching a match, or figuring out what to try next.</p></div><Pitch kit={kit}/></section><section id="experience"><div className="section-heading"><span>01 / THE JOURNEY</span><h2>Experience</h2></div><div className="experience"><img src="/images/nokia-logo.png" alt="Nokia"/><div><h3>Software Engineering Intern</h3><p>Nokia</p><p>Built Python and React tools for internal deployment visibility.</p></div><span>Summer 2025</span></div></section><section id="projects"><div className="section-heading"><span>02 / THINGS I'VE BUILT</span><h2>Selected projects</h2></div><div className="projects">{projects.map((p,i)=><article key={p.title}><div className="project-image"><img src={p.images[0]} alt={`${p.title} application preview`}/><span>0{i+1} / {p.tag}</span></div><div className="project-title"><h3>{p.title}</h3><span>{p.year}</span></div><p>{p.description}</p></article>)}</div></section><footer id="contact" className="contact"><span className="eyebrow">03 / NEXT PLAY</span><h2>Let’s make<br/><em>something good.</em></h2><a href={`mailto:${profile.email}`}>{profile.email} ↗</a><div><span>© 2026 Jenny Yuan</span><a href="#about">Back to the top ↑</a></div></footer></main></> }</div>}
