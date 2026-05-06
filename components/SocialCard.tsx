import type { SocialLink } from "@/lib/SocialLink";

interface SocialCardProps {
  social: SocialLink;
}

export default function SocialCard({ social }: SocialCardProps) {
  const Icon = social.icon;

  return (
    <a
      href={social.url}
      className="card card-link portfolio-card h-100 text-decoration-none"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${social.platform} profile for ${social.username}`}
    >
      <div className={`card-status-start bg-${social.accentColor}`}></div>
      <div className="card-body">
        <div className="d-flex align-items-center gap-3">
          <span className={`avatar avatar-lg bg-${social.accentColor}-lt text-${social.accentColor}`}>
            <Icon size={34} stroke={1.6} />
          </span>
          <div className="text-truncate">
            <h2 className="card-title h3 mb-1 text-truncate">{social.platform}</h2>
            <div className="text-secondary text-truncate">{social.username}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
