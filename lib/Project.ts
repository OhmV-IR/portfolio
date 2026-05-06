export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  skillTags: string[];
  status: "Active" | "Prototype" | "Maintained" | "Archived";
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
}
