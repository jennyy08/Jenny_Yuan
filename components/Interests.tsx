import { interests } from "@/lib/data";

export default function Interests() {
  // duplicated once so the marquee loop is seamless
  const loop = [...interests, ...interests];

  return (
    <section className="hr-line py-8 -mx-6 sm:-mx-10 overflow-hidden">
      <div className="bg-pitch">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {loop.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              className="group flex items-baseline gap-3 px-8 shrink-0"
            >
              <span className="font-display text-paper/90 text-sm uppercase tracking-wide">
                {item.label}
              </span>
              <span className="font-mono text-paper/50 text-xs">
                {item.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
