import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import PageHeader from "@/components/PageHeader";
import { getProjectBySlug, getProjectDisplayTags, projects } from "@/lib/data/projects";
import { ImageCarousel } from "@/components/ImageCarousel";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Portfolio",
    };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const displayTags = getProjectDisplayTags(project);

  return (
    <>
      <PageHeader eyebrow={project.status} title={project.title} description={project.summary} />
      <div className="page-body">
        <div className="container-xl">
          <div className="row g-4 mb-3">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Overview</h2>
                  <p className="text-secondary mb-0">{project.description}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Project Details</h2>
                  <div className="mb-3">
                    <div className="text-secondary small mb-2">Tags</div>
                    <div className="d-flex flex-wrap gap-2">
                      {displayTags.map((tag) => (
                        <span className="badge bg-blue-lt text-blue" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-2">
                    {project.liveUrl ? (
                      <a href={project.liveUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        <IconExternalLink size={18} stroke={1.75} />
                        Live Site
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a href={project.repoUrl} className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
                        <IconBrandGithub size={18} stroke={1.75} />
                        Repository
                      </a>
                    ) : null}
                    <Link href="/projects" className="btn btn-outline-secondary">
                      Back to Projects
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4">
             { project.carouselImages ? <ImageCarousel images={project.carouselImages}></ImageCarousel> : null }
          </div>
        </div>
      </div>
    </>
  );
}
