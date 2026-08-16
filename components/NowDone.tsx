import { now, done } from "@/lib/data";
import Image from "next/image";
function List({ label, items }: { label: string; items: string[] }) { return <div className="status-list"><p className="eyebrow">{label}</p>{items.map(item => <p key={item}><span>↳</span>{item}</p>)}</div>; }
function NokiaCard() { return <div className="nokia-card"><Image className="nokia-logo" src="/images/nokia-logo.png" width={46} height={46} alt="Nokia"/><div><p className="eyebrow">software engineering intern · summer 2025</p><p>Nokia Services Platform UI team <span aria-hidden="true">📡</span></p></div></div>; }
export default function NowDone() { return <section className="status-grid"><List label="what i'm doing" items={now}/><div className="status-list"><p className="eyebrow">what i've done</p><NokiaCard />{done.map(item => <p key={item}><span>↳</span>{item}</p>)}</div></section>; }
