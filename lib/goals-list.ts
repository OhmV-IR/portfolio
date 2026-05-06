export interface ImpossibleSubtask {
  title: string;
  completed: boolean;
  completedAt?: string;
  note?: string;
  evidenceUrl?: string;
}

export interface ImpossibleGoal {
  title: string;
  completed: boolean;
  completedAt?: string;
  note?: string;
  evidenceUrl?: string;
  subtasks?: ImpossibleSubtask[];
}

export interface ImpossibleGoalSection {
  title: string;
  goals: ImpossibleGoal[];
}

export const impossibleList: ImpossibleGoalSection[] = [
  {
    title: "Open Source",
    goals: [
      {
        title: "Make a meaningful contribution to a major open-source project",
        evidenceUrl: "https://github.com/SubnauticaNitrox/Nitrox/graphs/contributors",
        note: "The idea is to learn how to work with a team and the general architecture of open-source software development",
        completed: true,
        subtasks: [
          { title: "Find an issue or contribution area", completed: true },
          { title: "Build the project locally", completed: true },
          { title: "Submit a pull request or maintained fork work", completed: true },
        ],
      },
      {
        title: "Maintain a public developer tool that other people can use",
        evidenceUrl: "https://2702rebels.com/robots/",
        completed: false,
        subtasks: [
          { title: "Ship a first usable release", completed: true },
          { title: "Write setup documentation", completed: true },
          { title: "Have other developers adopt it", completed: false },
        ],
      },
      {
        title: "Contribute to a major project, eg linux kernel",
        completed: false,
        subtasks: [
          {title: "Decide which project to contribute to", completed: false},
          {title: "Find an issue I can help with", completed: false},
          {title: "Create a pull request to fix it", completed: false},
          {title: "Have the pull request merged", completed: false}
        ]
      }
    ],
  },
  {
    title: "Engineering",
    goals: [
      {
        title: "Build a CI/CD infrastructure project",
        evidenceUrl: "https://jenkins.bgfamily.ca",
        completed: true,
        note: "Creating a Jenkins controller/agent CI/CD infrastructure and using it for my projects.",
        subtasks: [
          { title: "Containerize the build environment", completed: true },
          { title: "Document required tools and images", completed: true },
          { title: "Host it and run it locally", completed: true },
          { title: "Migrate all my github actions to the Jenkins system", completed: true }
        ],
      },
      {
        title: "Write an actual CI/CD pipeline",
        completed: true,
        note: "These pipelines are often used in industry to automate testing and deployment at scale, so learning them is important to me",
        evidenceUrl: "https://github.com/SpectreRevival/pragmabackend/blob/master/Jenkinsfile",
        subtasks: [
          { title: "Get a project that is in need of CI", completed: true},
          { title: "Create an action to build on PR receive or push", completed: true },
          { title: "Create an action to run unit tests automatically", completed: true },
          { title: "Create an action to check code quality on every PR", completed: true},
          { title: "Release action", completed: true},
          { title: "Caching and dependency management", completed: true}
        ],
      },
    ],
  },
  {
    title: "Learning",
    goals: [
      {
        title: "Ship a public API",
        completed: false,
        evidenceUrl: "https://pylonmc.github.io/",
        note: "Ship something that is nice to work with and used by others to make software.",
        subtasks: [
          { title: "Build/Contribute to the interface", completed: true },
          { title: "Work with / test the interface", completed: true },
          { title: "Publish a stable release", completed: false },
        ],
      },
      {
        title: "Make a somewhat playable video game",
        completed: true,
        note: "Make a game to learn Unreal engine, a new technology for me. Ideally people will find the experience of playing it somewhat pleasing.",
        subtasks: [
          { title: "Design the game loop", completed: true },
          { title: "Create the gameplay mechanics", completed: false },
          { title: "Create the maps / art", completed: false },
          { title: "Ship it publicly on steam or otherwise", completed: false },
          { title: "Get actual players and feedback", completed: false }
        ],
      },
      {
        title: "Complete a reverse engineering project",
        evidenceUrl: "https://github.com/SpectreRevival",
        note: "Could be a decompile (even partial), or a revival project. Just something to teach me the inner workings of the machines I spend so much of my time working with.",
        completed: false,
        subtasks: [
          { title: "Decide on a project", completed: true},
          { title: "Research the scope and time investment of the project", completed: true},
          { title: "Decide on an approach", completed: true},
          { title: "Complete the frontend server", completed: false },
          { title: "Complete the gameserver", completed: false},
          { title: "Publish it and evaluate community impact", completed: false}
        ]
      }
    ],
  },
  {
    title: "Community & Events",
    goals: [
      {
        title: "Work to make a community event possible",
        completed: true,
        evidenceUrl: "https://gamejamsite.vercel.app",
        note: "The idea of this goal is to translate making software into real-world community impact.",
        subtasks: [
          { title: "Contact an organization in need of my skills", completed: true },
          { title: "Make something that fulfills their needs", completed: true },
          { title: "Volunteer and see the impact in-person", completed: true },
        ],
      },
      {
        title: "Give a technical workshop or demo",
        completed: false,
        evidenceUrl: "https://www.youtube.com/@OhmVIR",
        note: "Likely in the form of reviving my programming tutorials / system design dictation videos on my youtube channel.",
        subtasks: [
          { title: "Pick a topic", completed: true },
          { title: "Prepare the script", completed: false },
          { title: "Record the raw footage", completed: false },
          { title: "Edit the video", completed: false },
          { title: "Post it", completed: false },
          { title: "Have someone learn something from it", completed: false },
        ],
      },
    ],
  },
];

export function getImpossibleListProgress() {
  const goals = impossibleList.flatMap((section) => section.goals);
  const subtasks = goals.flatMap((goal) => goal.subtasks ?? []);
  const totalItems = goals.length + subtasks.length;
  const completedItems = goals.filter((goal) => goal.completed).length + subtasks.filter((subtask) => subtask.completed).length;

  return {
    completedItems,
    totalItems,
    percentage: totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100),
  };
}
