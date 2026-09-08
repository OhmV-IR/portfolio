export interface GitHubLanguageStat {
  name: string;
  repoCount: number;
  percentage: number;
}

const GITHUB_USER = "OhmV-IR";
const REVALIDATE_SECONDS = 60 * 60 * 24;

interface GraphQLResponse {
  data?: {
    user?: {
      repositories: {
        nodes: Array<{
          name: string;
          nameWithOwner: string;
          isArchived: boolean;
          isFork: boolean;
          languages: {
            edges: Array<{
              size: number;
              node: { name: string };
            }>;
          };
        }>;
      };
    };
  };
  errors?: Array<{ message: string }>;
}

export async function getGitHubLanguageStats(): Promise<GitHubLanguageStat[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN missing. Returning empty language stats.");
    return [];
  }

  const query = `
    query getLanguages($login: String!) {
      user(login: $login) {
        repositories(
          first: 100
          ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]
          orderBy: { field: UPDATED_AT, direction: DESC }
        ) {
          nodes {
            name
            nameWithOwner
            isArchived
            isFork
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["github-languages"],
      },
    });

    if (!response.ok) {
      console.error(`GitHub GraphQL API Error: ${response.statusText}`);
      return [];
    }

    const json: GraphQLResponse = await response.json();
    if (json.errors) {
      console.error("GitHub GraphQL Errors:", json.errors);
      return [];
    }

    const repos = json.data?.user?.repositories.nodes ?? [];
    const blacklist = getRepoBlacklist();
    const includeForks = process.env.GITHUB_LANGUAGE_INCLUDE_FORKS === "true";

    const languageTotals = new Map<string, { bytes: number; repoSet: Set<string> }>();
    let grandTotalBytes = 0;

    for (const repo of repos) {
      const fullName = repo.nameWithOwner.toLowerCase();
      const shortName = repo.name.toLowerCase();

      if (
        repo.isArchived ||
        (!includeForks && repo.isFork) ||
        blacklist.has(fullName) ||
        blacklist.has(shortName)
      ) {
        continue;
      }

      for (const edge of repo.languages.edges) {
        const langName = getLanguageGroup(edge.node.name);
        const bytes = edge.size;

        grandTotalBytes += bytes;

        const current = languageTotals.get(langName) ?? { bytes: 0, repoSet: new Set() };
        current.bytes += bytes;
        current.repoSet.add(fullName);
        languageTotals.set(langName, current);
      }
    }

    if (grandTotalBytes === 0) return [];

    return Array.from(languageTotals.entries())
      .map(([name, data]) => ({
        name,
        repoCount: data.repoSet.size,
        percentage: Math.round((data.bytes / grandTotalBytes) * 100),
      }))
      .filter((lang) => lang.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name))
      .slice(0, 6);

  } catch (error) {
    console.error("Failed to fetch GitHub language stats:", error);
    return [];
  }
}

function getRepoBlacklist(): Set<string> {
  const envBlacklist = process.env.GITHUB_LANGUAGE_REPO_BLACKLIST ?? "";
  const blacklist = new Set<string>();

  for (const repo of envBlacklist.split(",")) {
    const normalized = repo.trim().toLowerCase();
    if (normalized) blacklist.add(normalized);
  }

  return blacklist;
}

function getLanguageGroup(language: string): string {
  if (language === "JavaScript" || language === "TypeScript") {
    return "JavaScript/TypeScript";
  }
  if (language === "C" || language === "C++") {
    return "C/C++";
  }
  return language;
}