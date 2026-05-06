export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  skillTags: string[];
  status: "Active Contributor" | "Prototype" | "Past Contributor" | "Archived" | "Active" | "Maintained";
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
}
