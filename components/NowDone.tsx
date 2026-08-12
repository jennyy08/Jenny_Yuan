import { now, done } from "@/lib/data";

function List({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted mb-3">
        {heading}
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed">
            <span className="text-accent select-none">›</span>
            <span className="text-ink/90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NowDone() {
  return (
    <section className="hr-line pt-10 pb-14 grid sm:grid-cols-2 gap-8">
      <List heading="what i'm doing" items={now} />
      <List heading="what i've done" items={done} />
    </section>
  );
}
