import type { GitHubLanguageStat } from "@/lib/github-languages";

interface LanguagePanelProps {
  languages: GitHubLanguageStat[];
}

export default function LanguagePanel({ languages }: LanguagePanelProps) {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            <h2 className="card-title mb-1">Top Languages</h2>
          </div>
          <span className="badge bg-blue-lt text-blue">Live</span>
        </div>
        <div className="list-group list-group-flush">
          {languages.map((language) => (
            <div className="list-group-item" key={language.name}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <strong>{language.name}</strong>
                <span className="text-secondary small">
                  {language.percentage}%
                </span>
              </div>
              <div className="progress progress-sm">
                <div className="progress-bar bg-primary" style={{ width: `${language.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
