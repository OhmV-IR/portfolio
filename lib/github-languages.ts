export interface ProjectLanguageBreakdown {
  repoName: string;
  totalBytes: number;
  languages: Array<{
    name: string;
    bytes: number;
    percentage: number;
  }>;
}

export interface GitHubLanguageStat {
  name: string;
  repoCount: number;
  percentage: number;
}

export interface GitHubLanguageAnalysis {
  overall: GitHubLanguageStat[];
  projects: ProjectLanguageBreakdown[];
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

export async function getGitHubLanguageStats(): Promise<GitHubLanguageAnalysis> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn("GITHUB_TOKEN missing.");
    return { overall: [], projects: [] };
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

    if (!response.ok) return { overall: [], projects: [] };

    const json: GraphQLResponse = await response.json();
    if (json.errors) return { overall: [], projects: [] };

    const repos = json.data?.user?.repositories.nodes ?? [];
    const blacklist = getRepoBlacklist();
    const includeForks = process.env.GITHUB_LANGUAGE_INCLUDE_FORKS === "true";
    const minRatio = getMinCommitRatio();

    // 1. Initial basic filter (archived, forks, blacklist)
    const candidateRepos = repos.filter((repo) => {
      const fullName = repo.nameWithOwner.toLowerCase();
      const shortName = repo.name.toLowerCase();

      return (
        !repo.isArchived &&
        (includeForks || !repo.isFork) &&
        !blacklist.has(fullName) &&
        !blacklist.has(shortName)
      );
    });

    // 2. Parallel contribution ratio check
    const verifiedRepoResults = await Promise.all(
      candidateRepos.map(async (repo) => {
        const [owner, name] = repo.nameWithOwner.split("/");

        // Personal repos are automatically included
        if (owner.toLowerCase() === GITHUB_USER.toLowerCase()) {
          return { repo, keep: true };
        }

        const isSignificant = await hasSignificantContributions(owner, name, minRatio);
        return { repo, keep: isSignificant };
      })
    );

    const verifiedRepos = verifiedRepoResults
      .filter((item) => item.keep)
      .map((item) => item.repo);

    // 3. Aggregate language data across verified repos
    const projects: ProjectLanguageBreakdown[] = [];
    const languageTotals = new Map<string, { bytes: number; repoSet: Set<string> }>();
    let grandTotalBytes = 0;

    for (const repo of verifiedRepos) {
      const fullName = repo.nameWithOwner.toLowerCase();
      let repoTotalBytes = 0;
      const repoLanguageBytesMap = new Map<string, number>();

      for (const edge of repo.languages.edges) {
        const langName = getLanguageGroup(edge.node.name);
        const bytes = edge.size;

        repoTotalBytes += bytes;
        grandTotalBytes += bytes;

        // Collect repository-level byte totals
        repoLanguageBytesMap.set(
          langName,
          (repoLanguageBytesMap.get(langName) ?? 0) + bytes
        );

        // Collect global byte totals
        const globalCurrent = languageTotals.get(langName) ?? { bytes: 0, repoSet: new Set() };
        globalCurrent.bytes += bytes;
        globalCurrent.repoSet.add(fullName);
        languageTotals.set(langName, globalCurrent);
      }

      if (repoTotalBytes === 0) continue;

      // Format per-project breakdown
      const projectLanguages = Array.from(repoLanguageBytesMap.entries())
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage: Math.round((bytes / repoTotalBytes) * 100),
        }))
        .sort((a, b) => b.bytes - a.bytes);

      projects.push({
        repoName: repo.nameWithOwner,
        totalBytes: repoTotalBytes,
        languages: projectLanguages,
      });
    }

    if (grandTotalBytes === 0) return { overall: [], projects: [] };

    // Format global stats
    const overall = Array.from(languageTotals.entries())
      .map(([name, data]) => ({
        name,
        repoCount: data.repoSet.size,
        percentage: Math.round((data.bytes / grandTotalBytes) * 100),
      }))
      .filter((lang) => lang.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name))
      .slice(0, 6);

    // Sort projects by total size descending
    projects.sort((a, b) => b.totalBytes - a.totalBytes);

    return { overall, projects };

  } catch (error) {
    console.error("Failed to fetch GitHub language stats:", error);
    return { overall: [], projects: [] };
  }
}

/**
 * Checks whether GITHUB_USER authored at least `minRatio` (e.g., 0.05 = 5%)
 * of the top contributor's total commits in a non-owned repository.
 */
async function hasSignificantContributions(
  owner: string,
  repo: string,
  minRatio: number
): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["github-contributors"],
      },
    });

    if (!response.ok) return false;

    const contributors: Array<{ login: string; contributions: number }> = await response.json();
    if (!contributors || contributors.length === 0) return false;

    const topContributorCommits = contributors[0].contributions;
    if (topContributorCommits === 0) return false;

    const userEntry = contributors.find(
      (c) => c.login?.toLowerCase() === GITHUB_USER.toLowerCase()
    );

    if (!userEntry) return false;

    const userRatio = userEntry.contributions / topContributorCommits;
    return userRatio >= minRatio;
  } catch {
    return false;
  }
}

function getMinCommitRatio(): number {
  const envRatio = process.env.GITHUB_LANGUAGE_MIN_COMMIT_RATIO;
  if (!envRatio) return 0.05; // Default: 5% of top contributor

  const parsed = parseFloat(envRatio);
  return isNaN(parsed) ? 0.05 : parsed;
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