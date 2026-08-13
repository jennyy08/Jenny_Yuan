import { profile } from "@/lib/data";

export default function Hero() {
  return <section id="top" className="hero">
    <p className="eyebrow">Toronto, ON · Canada</p>
    <h1>hi, i&apos;m <em>jenny.</em><br />i like building things.</h1>
    <div className="hero-bottom"><p>{profile.tagline} Currently studying at the University of Waterloo and looking for a summer 2027 internship.</p><a href="#projects" className="round-link">see my work <span>↓</span></a></div>
    <p className="click-note">psst — click anywhere to send the ball rolling</p>
  </section>;
}
