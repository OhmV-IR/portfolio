import {
  IconBrandDiscord,
  IconBrandDocker,
  IconBrandGithub,
  IconBrandGmail,
  IconBrandLinkedin,
  IconBrandSteam,
  IconBrandTwitch,
  IconBrandXbox,
  IconBrandYoutube,
  IconChess,
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
    platform: "Email",
    username: "bourdeaux.adrien@gmail.com",
    url: "mailto:bourdeaux.adrien@gmail.com",
    icon: IconBrandGmail,
    accentColor: "red"
  },
  {
    platform: "Discord",
    username: "ohmvir",
    url: "https://discord.com/users/695056854488973364",
    icon: IconBrandDiscord,
    accentColor: "purple"
  },
  {
    platform: "Linkedin",
    username: "",
    url: "https://www.linkedin.com/in/adrien-bourdeaux-429427312/",
    icon: IconBrandLinkedin,
    accentColor: "blue"
  },
  {
    platform: "Twitch",
    username: "ohmvir",
    url: "https://www.twitch.tv/ohmvir",
    icon: IconBrandTwitch,
    accentColor: "purple"
  },
  {
    platform: "Steam",
    username: "OhmVIR",
    url: "https://steamcommunity.com/id/OhmVIR/",
    icon: IconBrandSteam,
    accentColor: "blue"
  },
  {
    platform: "Xbox",
    username: "OhmVIR2427",
    url: "https://www.xbox.com/en-CA/play/user/OhmVIR2427",
    icon: IconBrandXbox,
    accentColor: "green"
  },
  {
    platform: "DockerHub",
    username: "ohmivr",
    url: "https://hub.docker.com/repositories/ohmivr",
    icon: IconBrandDocker,
    accentColor: "blue"
  },
  {
    platform: "Chess.com",
    username: "adrienbourdeaux",
    url: "https://www.chess.com/member/adrienbourdeaux",
    icon: IconChess,
    accentColor: "green"
  }
];
