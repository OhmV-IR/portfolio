import type { Project } from "../Project";
import type { Skill } from "../Skill";

export const projects: Project[] = [
  {
    slug: "2702-vision",
    title: "2702 Rebels Robotics Team",
    summary: "I worked on computer vision for the 2702 Rebels First Robotics Competition team",
    description: "I took full advantage of this opportunity to solve real challenges and face real-world problems to learn a lot about embedded programming and optimization at scale as well as designing with reliability and precision in mind. I engineered a system for the detection of objects via camera and locating them relative to the robot as well as a system for calibration cameras to achieve sub-micron levels of accuracy. These experiences taught me much of what I know about the scene of programming and robotics today. I would definitely recommend joining an FRC team to anyone looking to learn and develop skills. I also learned some practical skills with power tools, CAD and electrical work while on the team.",
    tags: ["Computer Vision", "Electrical", "Real-World", "Closed-Source", "Optimization", "Accuracy", "Reliability"],
    skillTags: ["C++ / CMake", "CAD", "CI/CD", "Systems Design", "API development"],
    featured: true,
    status: "Past Contributor",
    liveUrl: "https://2702rebels.com/robots"
  },
  {
    slug: "salvage",
    title: "Salvage",
    summary: "A indie game project to accomplish something big with little, currently unreleased.",
    description: "I was given the opportunity to work with industry professionals on a new UE5 indie game to bolster my game development skills by working on an Unreal Engine 5 game that would allow me to learn the engine and improve my game development knowledge and skills.",
    tags: ["Closed-Source"],
    skillTags: ["Unreal Engine 5", "C++ / CMake", "Systems Design"],
    featured: false,
    status: "Active",
    liveUrl: "https://www.playsalvage.com/",
    carouselImages: ["/SLVG_Splash_Ultrawide.png", "/SLVG_WallP_RustedGiants.png"]
  },
  {
    slug: "jenkins-ai-synapse",
    title: "Jenkins AI Synapse",
    summary: "A plugin powering agentic automation workflows in Jenkins",
    description: "I want this project to be highly modular and extensible so people can use this to build whatever they want. Currently the most powerful tools in AI are those that can provide specialized data and inputs to AI models, typically via tools or skills and this framework allows for anyone to add their skills, custom tools and other AI infrastructure to the plugin to make it specialized to their use case. It also is designed to support a variety of clients and APIs while providing a solid API base for workflows to build on top of so workflow developers don't have to worry about what client is executing the request and clients don't have to worry about the overall workflow and vice versa. This project also includes CI/CD for publishing to maven, running unit tests and code style formatting.",
    tags: ["Closed-Source"],
    skillTags: ["API development", "Java", "Systems Design"],
    featured: true,
    status: "Active"
  },
  {
    slug: "subnautica-nitrox",
    title: "Subnautica Nitrox",
    summary: "Open-source multiplayer mod for Subnautica, developed with the SubnauticaNitrox organization.",
    description:
      "Nitrox is a large C# and Unity modding project that brings multiplayer support to Subnautica. With over 70 thousand members in the discord, this project reaches a large audience to provide a revolutionary new gameplay experience for the game Subnautica. During my time as a contributor, I added new functionality such as footsteps replication and implemented quality of life features like death beacons which show the location of player deaths so that players can retrieve their items.",
    tags: ["C#", "Unity", "Game Modding", "Open Source"],
    skillTags: ["C#", "Unity", "Open Source Collaboration"],
    status: "Past Contributor",
    featured: false,
    repoUrl: "https://github.com/SubnauticaNitrox/Nitrox",
    liveUrl: "https://nitrox.rux.gg",
  },
  {
    slug: "pragmabackend",
    title: "Pragma Backend Recreation",
    summary: "A recreation of Pragma's template backend for games used by Spectre Divide and many others.",
    description: "As game studios seek to move fast, purchasing an already made and bug-free established backend from a vendor can often be a good development choice that saves time and money compared to trying to develop an in-house solution. This has led many startups to use it, including Mountaintop Studios who made Spectre Divide. Unfortunately many of these games shut down, but with this software we will be able to emulate the pragma servers and bring these games one step closer to revival by reducing the amount of reverse engineering required to only what is needed to reverse engineer the game server.",
    tags: ["Open-Source", "Reverse Engineering"],
    skillTags: ["CI/CD", "C#", "ASP.NET", "Open Source Collaboration", "API development"],
    status: "Active",
    featured: true,
    repoUrl: "https://github.com/SpectreRevival/pragmabackend"
  },
  {
    slug: "spectrelauncher",
    title: "Spectre Revival Launcher",
    summary: "A Qt based game launcher written in C++ to run pragmabackend servers and Spectre Divide instances for when the SpectreRevival project is ready for public release.",
    description: "Mostly a learning project for Qt and how GUI interfaces are written with it. Also will teach me some things about process management and OSs as I will need to handle output stream redirection and the starting of server processes in order to make managing servers easy for the users",
    tags: ["Qt", "GUI"],
    skillTags: ["C++ / CMake", "CI/CD"],
    featured: false,
    status: "Active",
    repoUrl: "https://github.com/SpectreRevival/spectrelauncher"
  },
  {
    slug: "septic",
    title: "Septic Tank Monitor",
    summary: "An ESP32 septic tank volume monitor and attached webapp for remote viewing.",
    description: "I created this system to help my grandparents who have a cottage in a remote area which is on a septic tank system. This allows them to view the level of the septic tank without needing to physically measure it which is annoying and allows them to schedule it to be emptied on time and only when necessary. This project has 2 main components: The embedded firmware which takes readings from the sensor, checks for OTA updates and publishes the data to an Azure event hub where it is then processed and made viewable to the webapp (the other component). This project taught me a lot about embedded development and C++ as I investigated complex memory leaks, crashes and made the device as resilient as I could. At this point, the embedded firmware is done with only the webapp left to do.",
    tags: ["Embedded", "Closed-Source"],
    skillTags: ["C++ / CMake", "JavaScript / TypeScript", "CAD"],
    status: "Active",
    featured: true
  },
  {
    slug: "visionimages",
    title: "Embedded Device Image Generation",
    summary: "Generates OS images for use on embedded devices where dependency building takes forever",
    description: "I created this system out of frustration after my experience on my local robotics team where we had several Raspberry PIs and Jetson Orins/Nanos that all required custom built dependencies and specific configurations. This would often take multiple days to setup and if the OS installation was ever corrupted or lost, it would be a major time loss for the team. Therefore this project uses a docker-based image architecture to build the dependencies and configuration inside of an emulator and then inject them into an OS base image so that the installation can be recovered in a few hours instead of days and it is clear what settings should be used for the OS instead of guessing what was in place before. I have also implemented CI/CD for this project to build the images after every push so that we always have a built copy on hand, speeding up recovery when they are required.",
    tags: ["Embedded", "Closed-Source", "Docker", "Infrastructure"],
    skillTags: ["CI/CD"],
    status: "Active",
    featured: false,
    liveUrl: "https://2702rebels.com/robots/"
  },
  {
    slug: "unitygame",
    title: "Exorcist",
    summary: "A never-released Unity game for me to learn the game engine.",
    description: "While this game never was released anywhere and did not make it into a playable state before I abandoned it, this was mainly because the goal of the project was not to get to the playable stage. I accomplished my goals of making a networked game in Unity, learning about the component system and other engine system. I abandoned this project because of the amount of time I would have to spend on non-coding tasks like art and marketing to bring it to fruition. Some of the notable things I accomplished on this project was player replication, a server inventory system, asynchronous map loading, and many other features like placing and picking up items.",
    tags: ["Closed-Source"],
    skillTags: ["C#", "Unity", "Game development"],
    status: "Archived",
    featured: false
  },
  {
    slug: "rebar",
    title: "Rebar",
    summary: "A modern Kotlin framework for Paper-based Minecraft plugin development.",
    description: "Rebar is a framework for the creation of Minecraft plugins that function similarly to mods that work using only a modified server without the need to mod the vanilla client. This significantly broadens the accessibility of these plugins as the strain is placed on the server instead of the computers of the individual players and it is simply easier for players to use as well. This project demonstrates my skills in Kotlin, API development and teamwork as I work with the rest of the PylonMC team. This project is intended to be a functional replacement to Slimefun(https://github.com/Slimefun/Slimefun4), one of the most popular plugin frameworks that gathered over 1500 concurrent players and 814 concurrent servers from all over the world.",
    tags: ["Kotlin", "PaperMC", "Minecraft", "Open Source"],
    skillTags: ["Kotlin / Java", "Open Source Collaboration", "API development"],
    status: "Active Contributor",
    featured: true,
    repoUrl: "https://github.com/pylonmc/rebar",
  },
  {
    slug: "pylon",
    title: "Pylon",
    summary: "A Rebar plugin that adds tons of new content to Minecraft.",
    description: "A Rebar plugin that adds tons of new content to Minecraft for players to enjoy. Aims to appeal to the same playerbase that Slimefun had. Offers a mod-like gameplay experience without the need to have players modify their game clients. An exercise in teamwork, player feedback iteration and maintainer tasks such as code review.",
    tags: ["Java", "Paper", "Minecraft", "Open Source", "Game development"],
    skillTags: ["Kotlin / Java", "Open Source Collaboration", "Game development"],
    status: "Active Contributor",
    featured: false,
    repoUrl: "https://github.com/pylonmc/pylon"
  },
  {
    slug: "vcpkg",
    title: "vcpkg",
    summary: "Microsoft's cross-platform C/C++ package manager.",
    description:
      "vcpkg is Microsoft's C/C++ library manager for Windows, Linux, and macOS. As I use this extensively in my projects, I often contribute back to it to add updates to ports, new ports and fixes whenever I discover bugs or build failures. In contributing to this project, I have learned a lot about the C++ compilation process as well as best practices for package development and dependency management.",
    tags: ["C++", "CMake", "Package Management", "Build Systems"],
    skillTags: ["C++ / CMake", "Open Source Collaboration"],
    status: "Active",
    featured: true,
    repoUrl: "https://github.com/microsoft/vcpkg",
  },
  {
    slug: "gamejamsite",
    title: "Game Jam Site",
    summary: "A full stack TypeScript website made for a game jam.",
    description:
      "I started this project for JamBytes, my CAS project to complete my IB diploma, and it taught me a lot about how to build a full stack API architecture and designing a service within budget costs. I was able to make this website run only with the cost of storing the submissions from users, which was very low (under 1$/mo with less than 50GB of submissions). It was definitely a lesson in systems design as I needed to thread together many different services from Azure to make it all work. This represents my desire to achieve community impact with my code as I hope others will be able to use this template to streamline their efforts to drive change in their community and bring awareness about STEM. I also implemented CI/CD on this project to check for linter and build errors which made approving small PRs from my team as the event was going on much easier since I could be reasonably confident that there were no logic errors and it saved me the time of needing to spin up the PR and test it myself.",
    tags: ["TypeScript", "Web Design", "Full Stack"],
    skillTags: ["JavaScript / TypeScript", "HTML/CSS", "React", "CI/CD", "Systems Design", "API development"],
    status: "Archived",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/gamejamsite",
    liveUrl: "https://jambytes.ca",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    summary: "The site you're on right now!",
    description: "A public static website using React with a highly component-based and reusable structure to provide insights on my past projects and future goals. It also serves as a hub for my social links and a way for potential employers or people looking for help on their projects to contact me. It's also likely I will continue adding features to it over time that I find useful. I also setup CI/CD on this project so that the website will automatically redeploy when I push updates to the data, simplifying the update process and making it easier for me to keep this site up to date.",
    tags: ["JavaScript", "Web Design"],
    skillTags: ["JavaScript / TypeScript", "HTML/CSS", "React", "CI/CD"],
    status: "Active",
    featured: false,
    liveUrl: "https://portfolio.ohmvir.dev"
  },
  {
    slug: "github-transfer-bot",
    title: "GitHub Issue Transfer Discord Bot",
    summary: "A TypeScript automation project for GitHub repository/workflow operations.",
    description:
      "A Discord bot written in TypeScript to help with moving bug reports and feature requests from Discord threads to GitHub issues to be able to assign them to developers, milestones and centralize the collection of things to do in GitHub instead of needing to check multiple places for what needs to be done. This was also where I tested my skills in continous deployment as my Jenkins pipeline pushes the build to my raspberry pi, builds it and restarts the bot on a successful new commit to master.",
    tags: ["TypeScript", "GitHub", "Developer Tools", "Discord"],
    skillTags: ["JavaScript / TypeScript", "CI/CD"],
    status: "Active",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/github-transfer-bot",
  },
  {
    slug: "jenkins-agents",
    title: "Jenkins Agents",
    summary: "Docker-based infrastructure work for CI agents.",
    description:
      "This is my repository for creating my builder agents that I deploy and run locally for doing CI on my projects. This allows me greater control and to allocate more resources such as RAM to my runners when I have projects that require it. This enables my Jenkins setup to exceed the capabilities of GitHub actions which was why I switched over. I also made the switch because of budgeting, as GitHub was planning to add a charge for the usage of self-hosted runners which I could not tolerate. In CI, I build the images and am working towards achieving CD where the containers will automatically be recreated with the new images when a push occurs, but this is a bit more difficult as I want to avoid interrupting active builds.",
    tags: ["Docker", "Jenkins"],
    skillTags: ["Systems Design", "CI/CD"],
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
    tags: ["Raytracing", "Graphics", "Algorithms"],
    skillTags: ["Python"],
    status: "Archived",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/python-raytracer",
  },
  {
    slug: "ti84-tictactoe",
    title: "TI-84 Tic-Tac-Toe",
    summary: "A project to be able to play Tic Tac Toe on your graphing calculator.",
    description:
      "Programmed over the course of one evening, this was a fun project to be able to test out my new graphing calculator that I had gotten for school as well as learning a bit more about embedded programming and the project setup around it, as figuring out how to install the developer tools and compiler was a bit difficult. I also learned a bit about the OS structure as I read the documentation for the OS functions and its overall architecture. I also added CI/CD to this project to help me learn how to integrate custom buildtools with Jenkins",
    tags: ["C++", "Games"],
    skillTags: ["C++ / CMake", "CI/CD"],
    status: "Archived",
    featured: false,
    repoUrl: "https://github.com/OhmV-IR/ti84-tictactoe",
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured).slice(0, 6);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSkillTags() {
  return Array.from(new Set(projects.flatMap((project) => project.skillTags))).sort((left, right) => left.localeCompare(right));
}

export function getTopProjectSkills(limit = 5): Skill[] {
  const skillMentions = projects.reduce((mentions, project) => {
    project.skillTags.forEach((skillTag) => {
      mentions.set(skillTag, (mentions.get(skillTag) ?? 0) + 1);
    });

    return mentions;
  }, new Map<string, number>());

  const highestMentionCount = Math.max(...skillMentions.values());

  return Array.from(skillMentions.entries())
    .sort(([leftSkill, leftCount], [rightSkill, rightCount]) => {
      if (leftCount !== rightCount) {
        return rightCount - leftCount;
      }

      return leftSkill.localeCompare(rightSkill);
    })
    .slice(0, limit)
    .map(([name, mentionCount]) => ({
      name,
      category: `Mentioned in ${mentionCount} project${mentionCount === 1 ? "" : "s"}`,
      level: Math.round((mentionCount / highestMentionCount) * 100),
    }));
}

export function getProjectDisplayTags(project: Project) {
  return Array.from(new Set([...project.skillTags, ...project.tags]));
}
