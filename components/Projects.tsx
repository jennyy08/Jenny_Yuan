import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="hr-line pt-10 pb-14">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted mb-6">
        projects
      </p>
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <a
            key={project.title}
            href={project.live ?? project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col sm:flex-row sm:items-center gap-4 py-6 ${
              i !== 0 ? "hr-line" : ""
            }`}
          >
            <div className="sm:w-32 flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-muted">
                {project.year}
              </span>
              <span className="text-[11px] uppercase tracking-wide bg-accent-soft text-accent px-2 py-0.5 rounded-full">
                {project.tag}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-ink group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted mt-1 leading-relaxed">
                {project.description}
              </p>
            </div>
            <span className="hidden sm:block text-muted group-hover:text-accent group-hover:translate-x-1 transition-all">
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
