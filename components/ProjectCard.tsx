import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { getProjectDisplayTags, type Project } from "@/lib/portfolio-data";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const displayTags = getProjectDisplayTags(project);

  return (
    <Link href={`/projects/${project.slug}`} className="card card-link portfolio-card h-100 text-decoration-none">
      <div className="card-status-start bg-primary"></div>
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            <div className="text-secondary small mb-1">{project.status}</div>
            <h2 className="card-title h3 mb-0">{project.title}</h2>
          </div>
          <span className="avatar avatar-sm bg-primary-lt text-primary">
            <IconArrowRight size={18} stroke={1.75} />
          </span>
        </div>
        <p className="text-secondary flex-fill">{project.summary}</p>
        <div className="d-flex flex-wrap gap-2 mt-3">
          {displayTags.map((tag) => (
            <span className="badge bg-blue-lt text-blue" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
