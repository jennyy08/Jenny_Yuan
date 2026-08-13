import { profile } from "@/lib/data";

const Icon = ({ name }: { name: "github" | "linkedin" | "devpost" | "email" }) => {
  if (name === "github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.4A9.6 9.6 0 0 0 9 21.1c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.6.4-1.1.7-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A9.6 9.6 0 0 0 12 2.4Z" /></svg>;
  if (name === "linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.1 3.5A1.9 1.9 0 1 0 5.1 7.3 1.9 1.9 0 0 0 5.1 3.5ZM3.5 8.7h3.2V20H3.5V8.7ZM8.7 8.7h3.1v1.5h.1c.4-.8 1.5-1.8 3.2-1.8 3.4 0 4 2.2 4 5.1V20h-3.2v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V20H8.7V8.7Z" /></svg>;
  if (name === "devpost") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h9.5C18.7 4 21 7.2 21 12s-2.3 8-6.5 8H5l2-3.5V7.5L5 4Zm5.3 4.1v7.8h3.8c2.3 0 3.6-1.4 3.6-3.9s-1.3-3.9-3.6-3.9h-3.8Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5h17v13h-17v-13Zm1.8 1.8 6.7 5.3 6.7-5.3H5.3Zm13.4 9.4v-7.1L12 14.9 5.3 9.6v7.1h13.4Z" /></svg>;
};

export default function SocialRail() { const links = [{ name: "github" as const, href: profile.links.github }, { name: "linkedin" as const, href: profile.links.linkedin }, { name: "devpost" as const, href: profile.links.devpost }, { name: "email" as const, href: `mailto:${profile.email}` }]; return <div className="social-rail">{links.map(({ name, href }) => <a href={href} key={name} target={name === "email" ? undefined : "_blank"} rel="noreferrer" aria-label={name}><Icon name={name} /></a>)}</div>; }
