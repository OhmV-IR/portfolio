import {
  IconBrandGithub,
  IconBrandYoutube,
  IconId,
  IconWorldWww,
} from "@tabler/icons-react";
import type { SocialLink } from "../SocialLink";

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
