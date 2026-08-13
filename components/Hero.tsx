import { profile } from "@/lib/data";
import SocialRail from "@/components/SocialRail";

export default function Hero() {
  return <section id="top" className="hero">
    <p className="eyebrow">Toronto, ON · Canada</p>
    <h1>hi, i&apos;m <em>jenny.</em><br />i like building things.</h1>
    <div className="hero-bottom"><p>{profile.tagline} Looking for a summer 2027 internship.</p><div className="hero-actions"><SocialRail /><a href="#projects" className="round-link">see my work <span>↓</span></a></div></div>
  </section>;
}
