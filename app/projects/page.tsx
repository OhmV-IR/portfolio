import PageHeader from "@/components/PageHeader";
import ProjectsBrowser from "@/components/ProjectsBrowser";
import { getProjectSkillTags, projects } from "@/lib/portfolio-data";

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
          <ProjectsBrowser projects={projects} skillTags={getProjectSkillTags()} />
        </div>
      </div>
    </>
  );
}
