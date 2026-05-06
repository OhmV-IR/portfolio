import type { ComponentType } from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandNextjs,
  IconBrandX,
  IconBrandYoutube,
} from "@tabler/icons-react";

export type TablerIcon = ComponentType<{
  size?: number | string;
  stroke?: number;
  className?: string;
}>;

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  status: "Active" | "Prototype" | "Maintained" | "Archived";
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  category: string;
  level?: number;
  emphasis?: boolean;
}

export interface SocialLink {
  platform: string;
  username: string;
  url: string;
  icon: TablerIcon;
  accentColor: string;
}

export const projects: Project[] = [
  {
    slug: "portfolio-platform",
    title: "Portfolio Platform",
    summary: "A clean personal site for presenting projects, skills, links, and a resume.",
    description:
      "A Next.js and Tabler CSS portfolio focused on fast navigation, reusable data-driven cards, and a professional presentation layer that can grow with new projects over time.",
    tags: ["Next.js", "React", "TypeScript", "Tabler CSS"],
    status: "Active",
    featured: true,
    repoUrl: "https://github.com/your-username/portfolio",
  },
  {
    slug: "project-command-center",
    title: "Project Command Center",
    summary: "A dashboard concept for tracking project status, milestones, and priorities.",
    description:
      "A compact project operations interface with cards, status labels, and quick actions designed for scanning many workstreams without losing context.",
    tags: ["Dashboard", "UX", "React", "Data Modeling"],
    status: "Prototype",
    featured: true,
  },
  {
    slug: "automation-toolkit",
    title: "Automation Toolkit",
    summary: "A set of workflow utilities for reducing repetitive development tasks.",
    description:
      "A practical automation collection built around repeatable scripts, typed configuration, and clear operator feedback for day-to-day engineering workflows.",
    tags: ["Automation", "Node.js", "CLI", "Developer Tools"],
    status: "Maintained",
    featured: true,
  },
  {
    slug: "social-card-system",
    title: "Social Card System",
    summary: "Reusable social link cards with brand icons and consistent visual treatment.",
    description:
      "A component pattern for external profiles that combines accessible links, Tabler icons, brand-aware accents, and responsive card layouts.",
    tags: ["Components", "Design System", "Accessibility"],
    status: "Active",
    featured: false,
  },
];

export const skills: Skill[] = [
  { name: "React Architecture", category: "Frontend", level: 92, emphasis: true },
  { name: "Next.js App Router", category: "Frontend", level: 88, emphasis: true },
  { name: "TypeScript", category: "Language", level: 90, emphasis: true },
  { name: "UI Systems", category: "Design Engineering", level: 84 },
  { name: "Automation", category: "Engineering", level: 82 },
  { name: "CI/CD", category: "Delivery", level: 78 },
];

export const socials: SocialLink[] = [
  {
    platform: "GitHub",
    username: "your-username",
    url: "https://github.com/your-username",
    icon: IconBrandGithub,
    accentColor: "dark",
  },
  {
    platform: "LinkedIn",
    username: "your-name",
    url: "https://www.linkedin.com/in/your-name",
    icon: IconBrandLinkedin,
    accentColor: "azure",
  },
  {
    platform: "X",
    username: "@your-handle",
    url: "https://x.com/your-handle",
    icon: IconBrandX,
    accentColor: "blue",
  },
  {
    platform: "Instagram",
    username: "@your-handle",
    url: "https://www.instagram.com/your-handle",
    icon: IconBrandInstagram,
    accentColor: "pink",
  },
  {
    platform: "YouTube",
    username: "@your-channel",
    url: "https://www.youtube.com/@your-channel",
    icon: IconBrandYoutube,
    accentColor: "red",
  },
  {
    platform: "Next.js Work",
    username: "featured-stack",
    url: "https://nextjs.org",
    icon: IconBrandNextjs,
    accentColor: "dark",
  },
];

export const resume = {
  title: "Resume / CV",
  filePath: "/resume.pdf",
  downloadName: "resume.pdf",
};

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured).slice(0, 3);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
