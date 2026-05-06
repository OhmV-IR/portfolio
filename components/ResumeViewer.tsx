import { IconDownload, IconExternalLink } from "@tabler/icons-react";

interface ResumeViewerProps {
  filePath: string;
  downloadName: string;
}

export default function ResumeViewer({ filePath, downloadName }: ResumeViewerProps) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">CV Preview</h2>
          <div className="card-subtitle">Inline PDF viewer with download fallback</div>
        </div>
        <div className="card-actions">
          <a href={filePath} className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
            <IconExternalLink size={18} stroke={1.75} />
            Open
          </a>
          <a href={filePath} className="btn btn-primary" download={downloadName}>
            <IconDownload size={18} stroke={1.75} />
            Download
          </a>
        </div>
      </div>
      <div className="card-body p-0">
        <object data={filePath} type="application/pdf" className="resume-viewer">
          <div className="empty">
            <p className="empty-title">Resume preview is not available.</p>
            <p className="empty-subtitle text-secondary">
              Check back later for this to be uploaded.
            </p>
          </div>
        </object>
      </div>
    </div>
  );
}
