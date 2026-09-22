# Agentic AI Workshop Site

Three pages:

- `/` — the 6 project ideas, with live member counts (open / full)
- `/teams` — roster of who joined each project, plus a form for a student to join one
- `/poster` — the event poster

Students join individually based on interest; each project's team closes once 5 people
have joined (`TEAM_CAPACITY` in `lib/projects.ts`). A name can only join one project.

## Local development

```bash
npm install
npm run dev
```

Without any setup, joins are stored in a local `.data/roster.json` file — fine for
testing on your machine, but it will **not** persist on Vercel (serverless functions don't
share a filesystem between requests/deploys).

## Enabling persistent storage on Vercel

For joins to actually stick in production, add **Vercel KV** (free tier is enough for this):

1. In your Vercel project dashboard: Storage → Create Database → KV.
2. Connect it to this project — Vercel automatically sets the `KV_REST_API_URL` and
   `KV_REST_API_TOKEN` env vars for you.
3. Redeploy. The site will now use KV automatically (see `lib/store.ts`).

## Editing project details

Edit `lib/projects.ts` — each project has an id, domain, name, and workflow description.

## Deploying

```bash
npx vercel
```

or connect this folder as a GitHub repo and import it in the Vercel dashboard.
