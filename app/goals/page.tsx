import ImpossibleList from "@/components/ImpossibleList";
import PageHeader from "@/components/PageHeader";
import { getImpossibleListProgress, impossibleList } from "@/lib/goals-list";

export const metadata = {
  title: "Coding Bucket List",
  description: "An evolving public list of goals, milestones, and progress.",
};

export default function GoalsPage() {
  const progress = getImpossibleListProgress();

  return (
    <>
      <PageHeader
        eyebrow="Progress"
        title="Coding Bucket List"
        description="A public, always-evolving todo list for engineering, learning, community, and long-term goals."
      />
      <div className="page-body">
        <div className="container-xl">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row align-items-center g-3">
                <div className="col-md">
                  <h2 className="card-title mb-1">Overall Progress</h2>
                  <div className="text-secondary">
                    {progress.completedItems} of {progress.totalItems} goals and subtasks completed.
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="d-flex align-items-center gap-3">
                    <div className="progress flex-fill">
                      <div className="progress-bar bg-primary" style={{ width: `${progress.percentage}%` }} />
                    </div>
                    <strong>{progress.percentage}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ImpossibleList sections={impossibleList} />
        </div>
      </div>
    </>
  );
}
