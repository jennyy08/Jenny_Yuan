import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <section className="pt-14 pb-20">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted mb-4">
        get in touch
      </p>
      <h2 className="text-2xl font-medium text-ink mb-6">
        let&apos;s build something.
      </h2>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a
          href={`mailto:${profile.email}`}
          className="link-underline text-ink"
        >
          email
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-ink"
        >
          github
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-ink"
        >
          linkedin
        </a>
        <a
          href={profile.links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-ink"
        >
          resume
        </a>
      </div>
      <p className="text-xs text-muted mt-14">
        {profile.name} © {new Date().getFullYear()}
      </p>
    </section>
  );
}
