export interface GitHubLanguageStat {
  name: string;
  repoCount: number;
  percentage: number;
}

interface GitHubRepo {
  name: string;
  full_name: string;
  languages_url: string;
  archived: boolean;
  fork: boolean;
}

const GITHUB_USER = "OhmV-IR";
const REVALIDATE_SECONDS = 60 * 60 * 24;
const INCLUDE_FORKS = process.env.GITHUB_LANGUAGE_INCLUDE_FORKS === "true";

// Add stable exclusions here using either "owner/repo" or just "repo".
const BLACKLISTED_LANGUAGE_REPOS = new Set<string>([
  // "OhmV-IR/example-repo",
]);

const fallbackLanguages: GitHubLanguageStat[] = [
  { name: "C/C++", repoCount: 10, percentage: 36 },
  { name: "JavaScript/TypeScript", repoCount: 7, percentage: 25 },
  { name: "Java", repoCount: 4, percentage: 14 },
  { name: "Python", repoCount: 3, percentage: 11 },
  { name: "C#", repoCount: 3, percentage: 11 },
];

export async function getGitHubLanguageStats(): Promise<GitHubLanguageStat[]> {
  try {
    const repos = await getGitHubRepos();
    const blacklist = getRepoBlacklist();
    const includedRepos = repos.filter((repo) => {
      const fullName = repo.full_name.toLowerCase();
      const shortName = repo.name.toLowerCase();

      return (
        !repo.archived &&
        (INCLUDE_FORKS || !repo.fork) &&
        !blacklist.has(fullName) &&
        !blacklist.has(shortName)
      );
    });

    const repoLanguagePercentages = await Promise.all(
      includedRepos.map(async (repo) => {
        const languages = await fetchGitHub<Record<string, number>>(repo.languages_url);
        const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

        if (totalBytes === 0) {
          return null;
        }

        return Object.entries(languages).map(([name, bytes]) => ({
          name,
          percentage: (bytes / totalBytes) * 100,
        }));
      }),
    );

    const languageTotals = new Map<string, { percentageTotal: number; repoCount: number }>();
    let reposWithLanguageData = 0;

    for (const repoLanguages of repoLanguagePercentages) {
      if (!repoLanguages) {
        continue;
      }

      reposWithLanguageData += 1;

      for (const language of repoLanguages) {
        const languageName = getLanguageGroup(language.name);
        const current = languageTotals.get(languageName) ?? { percentageTotal: 0, repoCount: 0 };
        current.percentageTotal += language.percentage;
        current.repoCount += 1;
        languageTotals.set(languageName, current);
      }
    }

    if (languageTotals.size === 0 || reposWithLanguageData === 0) {
      return fallbackLanguages;
    }

    return Array.from(languageTotals.entries())
      .map(([name, stats]) => ({
        name,
        repoCount: stats.repoCount,
        percentage: Math.round(stats.percentageTotal / reposWithLanguageData),
      }))
      .filter((language) => language.percentage > 0)
      .sort((left, right) => right.percentage - left.percentage || left.name.localeCompare(right.name))
      .slice(0, 6);
  } catch {
    return fallbackLanguages;
  }
}

async function getGitHubRepos() {
  const repos: GitHubRepo[] = [];
  const token = process.env.GITHUB_TOKEN;
  const baseUrl = token
    ? "https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&per_page=100&sort=updated"
    : `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

  for (let page = 1; page <= 10; page += 1) {
    const separator = baseUrl.includes("?") ? "&" : "?";
    const pageRepos = await fetchGitHub<GitHubRepo[]>(`${baseUrl}${separator}page=${page}`);
    repos.push(...pageRepos);

    if (pageRepos.length < 100) {
      break;
    }
  }

  return repos;
}

async function fetchGitHub<T>(url: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: {
      revalidate: REVALIDATE_SECONDS,
      tags: ["github-languages"],
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function getRepoBlacklist() {
  const envBlacklist = process.env.GITHUB_LANGUAGE_REPO_BLACKLIST ?? "";
  const blacklist = new Set<string>();

  for (const repo of BLACKLISTED_LANGUAGE_REPOS) {
    blacklist.add(repo.toLowerCase());
  }

  for (const repo of envBlacklist.split(",")) {
    const normalizedRepo = repo.trim().toLowerCase();

    if (normalizedRepo) {
      blacklist.add(normalizedRepo);
    }
  }

  return blacklist;
}

function getLanguageGroup(language: string) {
  if (language === "JavaScript" || language === "TypeScript") {
    return "JavaScript/TypeScript";
  }

  if (language === "C" || language === "C++") {
    return "C/C++";
  }

  return language;
}
