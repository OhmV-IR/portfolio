import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/portfolio-data";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Projects"
        description="A card-based overview of current and past work. Each card opens a deeper project view with context, tags, and useful links."
      />
      <div className="page-body">
        <div className="container-xl">
          <div className="row row-cards">
            {projects.map((project) => (
              <div className="col-md-6 col-xl-4" key={project.slug}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
