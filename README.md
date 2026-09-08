# Portfolio

A Next.js and Tabler CSS portfolio.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GitHub Language Stats

The homepage languages card pulls from GitHub server-side and revalidates daily. By default it auto-discovers repositories where `OhmV-IR` has authored commits, including repositories outside the personal account. GitHub's search API limits discovery to its first 1,000 matching commits.

To include private repositories, create `.env.local` and add a GitHub token. A fine-grained token needs repository metadata access for each organization. A classic token also works; use the `repo` scope if private repositories are required:

```bash
GITHUB_TOKEN=github_pat_...
```

A single classic token can cover multiple organizations, provided your account has access and each organization permits classic tokens. If an organization enforces SAML SSO, authorize the token for that organization in GitHub under **Settings > Developer settings > Personal access tokens > Configure SSO**.

To discover commits in specific organizations instead of searching all of your commits, disable auto-discovery and add a comma-separated list:

```bash
GITHUB_LANGUAGE_ORGS=organization-one,organization-two
GITHUB_LANGUAGE_AUTO_DISCOVER=false
```

Auto-discovery is enabled by default and searches both commit authorship and committer identity. If auto-discovery is disabled without organization names, the app uses GitHub's repository affiliation list instead (owner, collaborator, and organization-member repositories).

To exclude repositories from the language calculation, use comma-separated repo names or full names:

```bash
GITHUB_LANGUAGE_REPO_BLACKLIST=OhmV-IR/old-demo,scratch-repo
```

Forks are excluded by default so large upstream forks do not overwhelm the chart. To include forks:

```bash
GITHUB_LANGUAGE_INCLUDE_FORKS=true
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
