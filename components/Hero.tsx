import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="pt-20 pb-14 sm:pt-28 sm:pb-16">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted mb-5">
        {profile.status}
      </p>
      <h1 className="text-3xl sm:text-4xl font-medium leading-snug text-ink text-balance">
        hi, i&apos;m {profile.name.split(" ")[0].toLowerCase()}, a{" "}
        {profile.tagline}
      </h1>
      <a
        href={profile.schoolUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline inline-block mt-4 text-sm text-muted hover:text-ink transition-colors"
      >
        {profile.school} →
      </a>
    </section>
  );
}
