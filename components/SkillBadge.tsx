import type { Skill } from "@/lib/portfolio-data";

interface SkillBadgeProps {
  skill: Skill;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <div className="list-group-item">
      <div className="row align-items-center">
        <div className="col">
          <div className="d-flex align-items-center gap-2">
            <strong>{skill.name}</strong>
            {skill.emphasis ? <span className="badge bg-green-lt text-green">Competitive</span> : null}
          </div>
          <div className="text-secondary small">{skill.category}</div>
        </div>
        {typeof skill.level === "number" ? (
          <div className="col-4 col-md-3">
            <div className="progress progress-sm">
              <div className="progress-bar bg-primary" style={{ width: `${skill.level}%` }} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
