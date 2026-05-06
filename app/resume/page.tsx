import PageHeader from "@/components/PageHeader";
import ResumeViewer from "@/components/ResumeViewer";
import { resume } from "@/lib/data/resume";

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Credentials"
        title={resume.title}
        description="Preview the latest resume PDF directly in the browser, or open and download it as a file."
      />
      <div className="page-body">
        <div className="container-xl">
          <ResumeViewer filePath={resume.filePath} downloadName={resume.downloadName} />
        </div>
      </div>
    </>
  );
}
