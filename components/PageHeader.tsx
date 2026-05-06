interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="page-header d-print-none">
      <div className="container-xl">
        <div className="row align-items-center">
          <div className="col">
            {eyebrow ? <div className="page-pretitle">{eyebrow}</div> : null}
            <h1 className="page-title">{title}</h1>
            <div className="text-secondary mt-2 col-lg-8">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
