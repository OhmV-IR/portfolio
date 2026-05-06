import type { ComponentType } from "react";
import {
  IconBrandGithub,
  IconBrandYoutube,
  IconId,
  IconWorldWww,
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
  skillTags: string[];
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
    slug: "subnautica-nitrox",
    title: "Subnautica Nitrox",
    summary: "Open-source multiplayer mod for Subnautica, developed with the SubnauticaNitrox organization.",
    description:
      "Nitrox is a large C# and Unity modding project that brings multiplayer support to Subnautica. It is one of the major organization projects highlighted on Adrien's GitHub profile and reflects work around game mod architecture, synchronization, open-source collaboration, and C# development.",
    tags: ["C#", "Unity", "Game Modding", "Open Source", "SubnauticaNitrox"],
    skillTags: ["C# / Unity Modding", "Open Source Collaboration"],
    status: "Maintained",
    featured: true,
    repoUrl: "https://github.com/SubnauticaNitrox/Nitrox",
    liveUrl: "https://nitrox.rux.gg",
  },
  {
    slug: "pylonmc-rebar",
    title: "PylonMC Rebar",
    summary: "A modern Kotlin framework for Paper-based Minecraft server development.",
    description:
      "Rebar is a PylonMC project described as a modern mod-like framework for Paper. It shows Adrien's public contributor context in the Minecraft server ecosystem, with Kotlin, plugin architecture, and JVM-based tooling as the core technical surface.",
    tags: ["Kotlin", "Paper", "Minecraft", "JVM", "pylonmc"],
    skillTags: ["Kotlin / JVM", "Open Source Collaboration"],
    status: "Maintained",
    featured: true,
    repoUrl: "https://github.com/pylonmc/rebar",
  },
  {
    slug: "vcpkg",
    title: "vcpkg",
    summary: "Contribution context around Microsoft's cross-platform C/C++ package manager.",
    description:
      "vcpkg is Microsoft's C/C++ library manager for Windows, Linux, and macOS. Adrien's pinned fork points to systems-level package management work involving CMake, C++, build tooling, and dependency integration.",
    tags: ["C++", "CMake", "Package Management", "Build Systems", "Microsoft"],
    skillTags: ["C++ / CMake", "Open Source Collaboration"],
    status: "Maintained",
    featured: true,
    repoUrl: "https://github.com/microsoft/vcpkg",
  },
  {
    slug: "gamejamsite",
    title: "Game Jam Site",
    summary: "A JavaScript/Vercel web project for a game jam experience.",
    description:
      "A public JavaScript project deployed on Vercel. It represents Adrien's web design side: frontend implementation, lightweight product presentation, and public deployment workflows.",
    tags: ["JavaScript", "Web Design", "Vercel", "Frontend"],
    skillTags: ["JavaScript / TypeScript", "Tabler UI Implementation"],
    status: "Active",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/gamejamsite",
    liveUrl: "https://gamejamsite.vercel.app",
  },
  {
    slug: "tabler-example",
    title: "Tabler Example",
    summary: "A public Tabler-styled web experiment deployed on Vercel.",
    description:
      "A small frontend project using Tabler-style interface work. This is also the website linked directly from Adrien's GitHub profile, making it a useful signal for UI work and deployment practice.",
    tags: ["JavaScript", "Tabler", "Frontend", "Vercel"],
    skillTags: ["JavaScript / TypeScript", "Tabler UI Implementation"],
    status: "Active",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/tabler-example",
    liveUrl: "https://tabler-example.vercel.app",
  },
  {
    slug: "github-transfer-bot",
    title: "GitHub Transfer Bot",
    summary: "A TypeScript automation project for GitHub repository/workflow operations.",
    description:
      "A public TypeScript tooling project that fits Adrien's broader automation and contributor workflow interests, especially around GitHub operations and moving work across repository boundaries.",
    tags: ["TypeScript", "GitHub", "Automation", "Developer Tools"],
    skillTags: ["JavaScript / TypeScript"],
    status: "Active",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/github-transfer-bot",
  },
  {
    slug: "jenkins-agents",
    title: "Jenkins Agents",
    summary: "Docker-based infrastructure work for CI agents.",
    description:
      "A recent Dockerfile-based repository focused on Jenkins agent infrastructure. It highlights CI/CD, build environment setup, and the operational side of maintaining larger development workflows.",
    tags: ["Docker", "Jenkins", "CI/CD", "Infrastructure"],
    skillTags: ["Docker / Jenkins"],
    status: "Active",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/jenkinsagents",
  },
  {
    slug: "python-raytracer",
    title: "Python Raytracer",
    summary: "A Python raytracing project from a computer science final project.",
    description:
      "A Python graphics project using raytracing concepts. It demonstrates algorithmic thinking, geometry, rendering fundamentals, and a willingness to explore lower-level visual computing ideas.",
    tags: ["Python", "Raytracing", "Graphics", "Algorithms"],
    skillTags: ["Python Algorithms"],
    status: "Archived",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/python-raytracer",
  },
  {
    slug: "ti84-tictactoe",
    title: "TI-84 Tic-Tac-Toe",
    summary: "A C++ game project targeting calculator-style constraints.",
    description:
      "A compact C++ game project that points to Adrien's interest in constrained systems, game logic, and small interactive programs beyond standard web applications.",
    tags: ["C++", "Games", "Embedded Constraints", "Algorithms"],
    skillTags: ["C++ / CMake"],
    status: "Active",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/ti84-tictactoe",
  },
];

export const skills: Skill[] = [
  { name: "C++ / CMake", category: "Embedded and Performant", level: 88, emphasis: true },
  { name: "Kotlin / JVM", category: "Backend & Tooling", level: 82, emphasis: true },
  { name: "JavaScript / TypeScript", category: "Web & Automation", level: 84, emphasis: true },
  { name: "Docker / Jenkins", category: "CI/CD", level: 78 },
  { name: "Python Algorithms", category: "Graphics & Scripting", level: 76 },
  { name: "Open Source Collaboration", category: "Engineering Practice", level: 86, emphasis: true },
  { name: "Tabler UI Implementation", category: "Frontend", level: 80 },
  { name: "C# / Unity Modding", category: "Game Engineering", level: 90, emphasis: true },
];

export const socials: SocialLink[] = [
  {
    platform: "GitHub",
    username: "OhmV-IR",
    url: "https://github.com/OhmV-IR",
    icon: IconBrandGithub,
    accentColor: "dark",
  },
  {
    platform: "YouTube",
    username: "@OhmVIR",
    url: "https://www.youtube.com/@OhmVIR",
    icon: IconBrandYoutube,
    accentColor: "red",
  },
  {
    platform: "ORCID",
    username: "0009-0004-2370-4155",
    url: "https://orcid.org/0009-0004-2370-4155",
    icon: IconId,
    accentColor: "green",
  },
  {
    platform: "Tabler Demo",
    username: "tabler-example.vercel.app",
    url: "https://tabler-example.vercel.app",
    icon: IconWorldWww,
    accentColor: "azure",
  },
  {
    platform: "SubnauticaNitrox",
    username: "Contributor org",
    url: "https://github.com/SubnauticaNitrox",
    icon: IconBrandGithub,
    accentColor: "cyan",
  },
  {
    platform: "PylonMC",
    username: "Contributor org",
    url: "https://github.com/pylonmc",
    icon: IconBrandGithub,
    accentColor: "purple",
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

export function getProjectSkillTags() {
  return Array.from(new Set(projects.flatMap((project) => project.skillTags))).sort((left, right) => left.localeCompare(right));
}

export function getProjectDisplayTags(project: Project) {
  return Array.from(new Set([...project.skillTags, ...project.tags]));
}
