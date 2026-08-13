import Nav from "@/components/Nav";
import type { ReactNode } from "react";

export default function PlaceholderPage({ eyebrow, title, note }: { eyebrow: string; title: ReactNode; note: string }) {
  return <main><Nav /><section className="placeholder-page"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><div className="placeholder-grid"><span>✦</span><p>{note}</p><span>✦</span></div></section></main>;
}
