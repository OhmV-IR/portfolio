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

interface GitHubCommitSearchResponse {
  items: Array<{
    repository?: GitHubRepo;
  }>;
}

const GITHUB_USER = "OhmV-IR";
const REVALIDATE_SECONDS = 60 * 60 * 24;
const INCLUDE_FORKS = process.env.GITHUB_LANGUAGE_INCLUDE_FORKS === "true";
const AUTO_DISCOVER = process.env.GITHUB_LANGUAGE_AUTO_DISCOVER !== "false";

// Add stable exclusions here using either "owner/repo" or just "repo".
const BLACKLISTED_LANGUAGE_REPOS = new Set<string>([
  // "OhmV-IR/example-repo",
]);

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
        try {
          const languages = await fetchGitHub<Record<string, number>>(repo.languages_url);
          const totalBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

          if (totalBytes === 0) {
            return null;
          }

          return Object.entries(languages).map(([name, bytes]) => ({
            name,
            percentage: (bytes / totalBytes) * 100,
          }));
        } catch {
          return null;
        }
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
      return [];
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
    return [];
  }
}

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const repos = new Map<string, GitHubRepo>();
  const organizations = getConfiguredOrganizations();

  if (AUTO_DISCOVER || organizations.length > 0) {
    const queries = AUTO_DISCOVER
      ? ["author", "committer"].map((role) => `${role}:${GITHUB_USER}`)
      : ["author", "committer"].flatMap((role) =>
          organizations.map((organization) => `${role}:${GITHUB_USER} org:${organization}`),
        );

    for (const query of queries) {
      let discoveredRepos: GitHubRepo[] = [];

      try {
        discoveredRepos = await searchGitHubRepos(query);
      } catch {
        continue;
      }

      for (const repo of discoveredRepos) {
        repos.set(repo.full_name.toLowerCase(), repo);
      }
    }

    return Array.from(repos.values());
  }

  const affiliatedRepos = await getAffiliatedGitHubRepos();

  for (const repo of affiliatedRepos) {
    repos.set(repo.full_name.toLowerCase(), repo);
  }

  return Array.from(repos.values());
}

async function searchGitHubRepos(query: string): Promise<GitHubRepo[]> {
  const repos = new Map<string, GitHubRepo>();

  // GitHub caps search results at 1,000 results, so ten pages is the useful maximum.
  for (let page = 1; page <= 10; page += 1) {
    const params = new URLSearchParams({ q: query, per_page: "100", page: String(page) });
    const result = await fetchGitHub<GitHubCommitSearchResponse>(
      `https://api.github.com/search/commits?${params.toString()}`,
    );

    for (const item of result.items) {
      const repo = item.repository;

      if (repo?.full_name && repo.languages_url) {
        repos.set(repo.full_name.toLowerCase(), repo);
      }
    }

    if (result.items.length < 100) {
      break;
    }
  }

  return Array.from(repos.values());
}

async function getAffiliatedGitHubRepos(): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  const baseUrl = token
    ? "https://api.github.com/user/repos?visibility=all&affiliation=owner,collaborator,organization_member&per_page=100&sort=updated"
    : `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;

  const repos: GitHubRepo[] = [];

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

function getConfiguredOrganizations() {
  return (process.env.GITHUB_LANGUAGE_ORGS ?? "")
    .split(",")
    .map((organization) => organization.trim())
    .filter(Boolean);
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
