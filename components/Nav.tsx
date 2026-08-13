import { profile } from "@/lib/data";

export default function Nav() {
  return <nav className="site-nav"><a href="#top" className="wordmark">JY<span>·</span></a><div><a href="#projects">projects</a><a href="#interests">off the clock</a><a href={`mailto:${profile.email}`}>say hi</a></div></nav>;
}
