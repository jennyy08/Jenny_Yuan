import { now, done } from "@/lib/data";
function List({ label, items }: { label: string; items: string[] }) { return <div className="status-list"><p className="eyebrow">{label}</p>{items.map(item => <p key={item}><span>↳</span>{item}</p>)}</div>; }
export default function NowDone() { return <section className="status-grid"><List label="what i'm doing" items={now}/><List label="what i've done" items={done}/></section>; }
