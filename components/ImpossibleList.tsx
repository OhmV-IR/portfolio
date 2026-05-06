import { IconExternalLink } from "@tabler/icons-react";
import type { ImpossibleGoal, ImpossibleGoalSection, ImpossibleSubtask } from "@/lib/impossible-list";

interface ImpossibleListProps {
  sections: ImpossibleGoalSection[];
}

export default function ImpossibleList({ sections }: ImpossibleListProps) {
  return (
    <div className="row row-cards">
      {sections.map((section) => (
        <div className="col-lg-6" key={section.title}>
          <div className="card h-100">
            <div className="card-header">
              <h2 className="card-title">{section.title}</h2>
            </div>
            <div className="list-group list-group-flush">
              {section.goals.map((goal) => (
                <GoalItem goal={goal} key={goal.title} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GoalItem({ goal }: { goal: ImpossibleGoal }) {
  const completedSubtasks = goal.subtasks?.filter((subtask) => subtask.completed).length ?? 0;
  const totalSubtasks = goal.subtasks?.length ?? 0;

  return (
    <div className="list-group-item">
      <div className="d-flex gap-3">
        <input className="form-check-input m-0 mt-1" type="checkbox" checked={goal.completed} readOnly aria-label={goal.title} />
        <div className="w-100">
          <div className="d-flex align-items-start justify-content-between gap-3">
            <div>
              <div className={goal.completed ? "text-decoration-line-through text-secondary" : "fw-semibold"}>{goal.title}</div>
              {goal.note ? <div className="text-secondary small mt-1">{goal.note}</div> : null}
              {goal.completedAt ? <div className="text-secondary small mt-1">Completed {goal.completedAt}</div> : null}
            </div>
            {goal.evidenceUrl ? <EvidenceLink url={goal.evidenceUrl} /> : null}
          </div>

          {goal.subtasks?.length ? (
            <div className="mt-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small">Subtasks</span>
                <span className="badge bg-blue-lt text-blue">
                  {completedSubtasks}/{totalSubtasks}
                </span>
              </div>
              <div className="list-group list-group-flush impossible-subtasks">
                {goal.subtasks.map((subtask) => (
                  <SubtaskItem subtask={subtask} key={subtask.title} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SubtaskItem({ subtask }: { subtask: ImpossibleSubtask }) {
  return (
    <div className="list-group-item px-0">
      <div className="d-flex align-items-start gap-2">
        <input className="form-check-input m-0 mt-1" type="checkbox" checked={subtask.completed} readOnly aria-label={subtask.title} />
        <div className="w-100">
          <div className={subtask.completed ? "text-decoration-line-through text-secondary small" : "small"}>{subtask.title}</div>
          {subtask.note ? <div className="text-secondary small">{subtask.note}</div> : null}
          {subtask.completedAt ? <div className="text-secondary small">Completed {subtask.completedAt}</div> : null}
        </div>
        {subtask.evidenceUrl ? <EvidenceLink url={subtask.evidenceUrl} /> : null}
      </div>
    </div>
  );
}

function EvidenceLink({ url }: { url: string }) {
  return (
    <a className="btn btn-icon btn-ghost-primary" href={url} target="_blank" rel="noopener noreferrer" aria-label="View evidence">
      <IconExternalLink size={18} stroke={1.75} />
    </a>
  );
}
