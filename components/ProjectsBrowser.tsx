"use client";

import { useMemo, useState } from "react";
import { IconFilter, IconX } from "@tabler/icons-react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/lib/portfolio-data";

interface ProjectsBrowserProps {
  projects: Project[];
  skillTags: string[];
}

export default function ProjectsBrowser({ projects, skillTags }: ProjectsBrowserProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    if (activeTags.length === 0) {
      return projects;
    }

    return projects.filter((project) => activeTags.every((tag) => project.skillTags.includes(tag)));
  }, [activeTags, projects]);

  function toggleTag(tag: string) {
    setActiveTags((currentTags) => (currentTags.includes(tag) ? currentTags.filter((activeTag) => activeTag !== tag) : [...currentTags, tag]));
  }

  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
            <div>
              <h2 className="card-title mb-1">Filter by Skill</h2>
              <div className="text-secondary small">
                Showing {filteredProjects.length} of {projects.length} projects
              </div>
            </div>
            {activeTags.length > 0 ? (
              <button className="btn btn-outline-secondary" type="button" onClick={() => setActiveTags([])}>
                <IconX size={18} stroke={1.75} />
                Clear
              </button>
            ) : null}
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button className={`btn ${activeTags.length === 0 ? "btn-primary" : "btn-outline-primary"}`} type="button" onClick={() => setActiveTags([])}>
              <IconFilter size={18} stroke={1.75} />
              All
            </button>
            {skillTags.map((tag) => {
              const isActive = activeTags.includes(tag);

              return (
                <button className={`btn ${isActive ? "btn-primary" : "btn-outline-primary"}`} type="button" onClick={() => toggleTag(tag)} key={tag}>
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="row row-cards">
          {filteredProjects.map((project) => (
            <div className="col-md-6 col-xl-4" key={project.slug}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p className="empty-title">No projects match those skills.</p>
          <p className="empty-subtitle text-secondary">Clear a filter to broaden the project list.</p>
        </div>
      )}
    </>
  );
}
