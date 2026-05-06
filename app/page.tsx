import Link from "next/link";
import { IconArrowRight, IconFileCv, IconShare2 } from "@tabler/icons-react";
import LanguagePanel from "@/components/LanguagePanel";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import { getGitHubLanguageStats } from "@/lib/github-languages";
import { getFeaturedProjects, getTopProjectSkills } from "@/lib/data/projects";

export default async function Home() {
  const featuredProjects = getFeaturedProjects();
  const competitiveSkills = getTopProjectSkills(5);
  const languages = await getGitHubLanguageStats();

  return (
    <>
      <section className="portfolio-hero">
        <div className="container-xl">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <div className="page-pretitle">Ohm&apos;s Portfolio</div>
              <h1 className="display-5 fw-bold mb-3">Building systems from the microscopic details to the high-level patterns.</h1>
              <p className="lead text-secondary mb-4">
                A passionate software developer working on large-scale projects spanning across embedded systems, web development and high-level systems design and infrastructure work with a strong belief in community impact and contributing to the open-source community wherever possible.
              </p>
              <div className="d-flex flex-wrap gap-2">
                <Link href="/projects" className="btn btn-primary btn-lg">
                  View Projects
                  <IconArrowRight size={18} stroke={1.75} />
                </Link>
                <Link href="/socials" className="btn btn-outline-primary btn-lg">
                  <IconShare2 size={18} stroke={1.75} />
                  Socials
                </Link>
                <Link href="/resume" className="btn btn-outline-secondary btn-lg">
                  <IconFileCv size={18} stroke={1.75} />
                  Resume
                </Link>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="row row-cards">
                <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Skills</h2>
                  <div className="list-group list-group-flush">
                    {competitiveSkills.map((skill) => (
                      <SkillBadge skill={skill} key={skill.name} />
                    ))}
                  </div>
                </div>
              </div>
                </div>
                <div className="col-12">
                  <LanguagePanel languages={languages} />
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
              <div className="text-secondary">The projects I'm currently working on or the projects I liked the most.</div>
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
