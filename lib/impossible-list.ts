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
        completed: true,
        note: "Contribution context through projects such as vcpkg, Nitrox, and PylonMC.",
        subtasks: [
          { title: "Find an issue or contribution area", completed: true },
          { title: "Build the project locally", completed: true },
          { title: "Submit a pull request or maintained fork work", completed: true },
        ],
      },
      {
        title: "Maintain a public developer tool that other people can use",
        completed: false,
        subtasks: [
          { title: "Ship a first usable release", completed: true },
          { title: "Write setup documentation", completed: false },
          { title: "Get feedback from another developer", completed: false },
        ],
      },
      {
        title: "Contribute to a game or modding framework",
        completed: true,
        note: "Public work around SubnauticaNitrox and PylonMC projects.",
        subtasks: [
          { title: "Join or follow an active modding project", completed: true },
          { title: "Understand the project architecture", completed: true },
          { title: "Contribute code, tooling, or integration work", completed: true },
        ],
      },
    ],
  },
  {
    title: "Engineering",
    goals: [
      {
        title: "Build a CI/CD infrastructure project",
        completed: true,
        note: "Jenkins agent infrastructure and build tooling work.",
        subtasks: [
          { title: "Containerize the build environment", completed: true },
          { title: "Document required tools and images", completed: false },
          { title: "Run it from a real pipeline", completed: true },
        ],
      },
      {
        title: "Write a C/C++ project with a clean build system",
        completed: true,
        subtasks: [
          { title: "Use CMake or a comparable build system", completed: true },
          { title: "Separate source and build artifacts", completed: true },
          { title: "Add repeatable build instructions", completed: false },
        ],
      },
      {
        title: "Build a production-quality portfolio",
        completed: false,
        subtasks: [
          { title: "Create reusable project and social cards", completed: true },
          { title: "Pull GitHub language stats automatically", completed: true },
          { title: "Add a real resume PDF", completed: false },
          { title: "Polish mobile layout with screenshots", completed: false },
        ],
      },
    ],
  },
  {
    title: "Learning",
    goals: [
      {
        title: "Build a raytracer",
        completed: true,
        evidenceUrl: "https://github.com/OhmV-IR/python-raytracer",
        subtasks: [
          { title: "Render basic primitives", completed: true },
          { title: "Add lighting and shadows", completed: true },
          { title: "Write up the implementation", completed: false },
        ],
      },
      {
        title: "Ship a Kotlin/JVM project",
        completed: false,
        subtasks: [
          { title: "Build a working local prototype", completed: true },
          { title: "Integrate with a real plugin/framework ecosystem", completed: true },
          { title: "Publish a stable release", completed: false },
        ],
      },
      {
        title: "Make a constrained-device game",
        completed: true,
        evidenceUrl: "https://github.com/OhmV-IR/ti84-tictactoe",
        subtasks: [
          { title: "Design the game loop", completed: true },
          { title: "Implement win/draw detection", completed: true },
          { title: "Package it for easy installation", completed: false },
        ],
      },
    ],
  },
  {
    title: "Community & Events",
    goals: [
      {
        title: "Build a website for a game jam or community event",
        completed: true,
        evidenceUrl: "https://gamejamsite.vercel.app",
        subtasks: [
          { title: "Publish the site publicly", completed: true },
          { title: "Make the layout readable on mobile", completed: true },
          { title: "Archive event materials after the event", completed: false },
        ],
      },
      {
        title: "Give a technical workshop or demo",
        completed: false,
        subtasks: [
          { title: "Pick a topic", completed: true },
          { title: "Prepare a small demo project", completed: true },
          { title: "Present it to an audience", completed: false },
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
