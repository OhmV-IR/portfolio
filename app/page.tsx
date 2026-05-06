import Link from "next/link";
import { IconArrowRight, IconFileCv, IconShare2 } from "@tabler/icons-react";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { getFeaturedProjects, skills } from "@/lib/portfolio-data";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const competitiveSkills = skills.slice(0, 5);

  return (
    <>
      <section className="portfolio-hero">
        <div className="container-xl">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="page-pretitle">Portfolio</div>
              <h1 className="display-5 fw-bold mb-3">Building thoughtful web products with React, Next.js, and polished interfaces.</h1>
              <p className="lead text-secondary mb-4">
                A focused collection of active projects, competitive skills, social links, and a resume preview in one clean Tabler-styled experience.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link href="/projects" className="btn btn-primary">
                  View Projects
                  <IconArrowRight size={18} stroke={1.75} />
                </Link>
                <Link href="/socials" className="btn btn-outline-primary">
                  <IconShare2 size={18} stroke={1.75} />
                  Socials
                </Link>
                <Link href="/resume" className="btn btn-outline-secondary">
                  <IconFileCv size={18} stroke={1.75} />
                  Resume
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Competitive Skills</h2>
                  <div className="list-group list-group-flush">
                    {competitiveSkills.map((skill) => (
                      <SkillBadge skill={skill} key={skill.name} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-body">
        <div className="container-xl">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h2 className="mb-1">Featured Projects</h2>
              <div className="text-secondary">The top workstreams currently worth a closer look.</div>
            </div>
            <Link href="/projects" className="btn btn-outline-primary">
              All Projects
            </Link>
          </div>
          <div className="row row-cards">
            {featuredProjects.map((project) => (
              <div className="col-md-6 col-xl-4" key={project.slug}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
