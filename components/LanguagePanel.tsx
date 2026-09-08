"use client";

import { useState } from "react";
import type { GitHubLanguageAnalysis } from "@/lib/github-languages";

interface LanguagePanelProps {
  data: GitHubLanguageAnalysis;
}

export default function LanguagePanel({ data }: LanguagePanelProps) {
  const isDev = process.env.NODE_ENV === "development";
  const [showDetails, setShowDetails] = useState(false);
  const { overall = [], projects = [] } = data || {};

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            <h2 className="card-title mb-1">Top Languages</h2>
            <div className="text-secondary">Measured via GitHub repository data</div>
          </div>
          <span className="badge bg-blue-lt text-blue">Live</span>
        </div>

        {/* Overall Top Languages List */}
        <div className="list-group list-group-flush mb-3">
          {overall.length === 0 ? (
            <div className="text-secondary small py-2">No language data available.</div>
          ) : (
            overall.map((language) => (
              <div className="list-group-item px-0" key={language.name}>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <div>
                    <strong>{language.name}</strong>
                    <span className="text-secondary small ms-2">
                      ({language.repoCount} {language.repoCount === 1 ? "repo" : "repos"})
                    </span>
                  </div>
                  <span className="text-secondary small fw-bold">
                    {language.percentage}%
                  </span>
                </div>
                <div className="progress progress-sm">
                  <div
                    className="progress-bar bg-primary"
                    style={{ width: `${language.percentage}%` }}
                    role="progressbar"
                    aria-valuenow={language.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Toggle Detailed View */}
        {isDev && projects.length > 0 && (
          <div>
            <button
              type="button"
              className="btn btn-link btn-sm p-0 text-decoration-none"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {showDetails ? "Hide detailed project breakdown ▲" : "View detailed project breakdown ▼"}
            </button>

            {/* Detailed Project Breakdown */}
            {showDetails && (
              <div className="mt-3 pt-3 border-top">
                <h4 className="mb-2">Project Breakdown</h4>
                <p className="text-secondary small mb-3">
                  Inspect raw byte distribution per repository to identify skewing sources.
                </p>

                <div className="d-flex flex-column gap-3 max-vh-50 overflow-y-auto pe-1">
                  {projects.map((project) => (
                    <div className="card card-sm bg-body-tertiary" key={project.repoName}>
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="fw-bold text-truncate" style={{ maxWidth: "220px" }}>
                            {project.repoName}
                          </span>
                          <span className="badge bg-secondary-lt">
                            {formatBytes(project.totalBytes)}
                          </span>
                        </div>

                        {/* Stacked Progress Bar for Multi-Language Repos */}
                        <div className="progress progress-sm mb-2">
                          {project.languages.map((lang) => (
                            <div
                              key={lang.name}
                              className="progress-bar"
                              style={{ width: `${lang.percentage}%` }}
                              title={`${lang.name}: ${lang.percentage}% (${formatBytes(lang.bytes)})`}
                            />
                          ))}
                        </div>

                        {/* Per-Project Language Legend */}
                        <div className="d-flex flex-wrap gap-2">
                          {project.languages.map((lang) => (
                            <span key={lang.name} className="text-secondary small">
                              <strong>{lang.name}</strong> {lang.percentage}%
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}