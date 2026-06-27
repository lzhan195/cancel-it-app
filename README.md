# Cancel-It

Find the recurring subscriptions hiding in your bank statement, see what they cost you per year, and cancel or set a reminder in one click.

Paste or upload a statement and Cancel-It uses Claude to extract only the recurring charges — filtering out groceries, gas, restaurants, and one-off purchases — cleans up the merchant names, flags free trials before they convert, and ranks everything by annual cost. From the dashboard you can fire off a cancellation email or schedule a reminder to cancel before a trial ends.

Built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.

## How it works

1. **Parse** — `POST /api/parse` sends the statement text to Claude (via the Vercel AI SDK) and gets back a structured list of subscriptions validated with Zod.
2. **Review** — the dashboard lists each subscription with its category, billing cadence, confidence score, and annualized cost.
3. **Act** — `POST /api/cancel` emails a cancellation request to the merchant; `POST /api/remind` schedules a reminder (2 days before a trial ends, when known).

### Works out of the box

Every external integration is optional and gated behind environment variables. With **no configuration at all**, the app still runs end-to-end:

- AI extraction falls back to bundled mock subscriptions.
- Emails are logged to the console as an `[Email Preview]` instead of being sent.
- Data is held in an in-memory store.
- Auth is disabled and the dashboard is publicly accessible.

Add credentials to switch each piece from demo mode to live. Check `GET /api/status` to see which integrations are currently active.

## Integrations

| Integration | Purpose | Env vars |
|-------------|---------|----------|
| **Claude** (`@ai-sdk/anthropic`) | Extract subscriptions from statements | `ANTHROPIC_API_KEY`, `AI_MODEL` *(optional, default `claude-sonnet-4-6`)* |
| **Auth0** (`@auth0/nextjs-auth0`) | Login + `/dashboard` protection | `AUTH0_SECRET`, `AUTH0_ISSUER_BASE_URL`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET` |
| **Supabase** (`@supabase/supabase-js`) | Persist subscriptions & reminders | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| **Resend** (`resend`) | Send cancellation & reminder emails | `RESEND_API_KEY`, `NOTIFY_EMAIL` *(optional)* |
| **Sentry** (`@sentry/nextjs`) | Error monitoring | `SENTRY_DSN` *or* `NEXT_PUBLIC_SENTRY_DSN` |

When Auth0 is configured, `middleware.ts` handles the `/auth/*` routes (login, logout, callback) and redirects unauthenticated visitors away from `/dashboard`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To enable any integrations, create a `.env.local` file with the relevant variables from the table above. For example, to turn on live AI extraction:

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

### Supabase setup

If you're enabling persistence, run the schema once against your project:

```bash
psql "$SUPABASE_DB_URL" -f supabase/schema.sql
```

It creates `subscriptions` and `reminders` tables with row-level security enabled — all writes go through the service-role key, so there are no public policies.

## API routes

| Method & path | Body | Description |
|---------------|------|-------------|
| `POST /api/parse` | `{ statement }` | Extract subscriptions from statement text |
| `POST /api/cancel` | `{ subscriptionId }` | Send a cancellation email |
| `POST /api/remind` | `{ subscriptionId }` | Schedule a cancel reminder |
| `GET /api/status` | — | Active integrations and the logged-in user's email |

## Project structure

```
app/
  api/            parse · cancel · remind · status routes
  dashboard/      subscription dashboard (auth-protected when Auth0 is on)
  page.tsx        landing page
lib/
  ai.ts            Claude extraction with mock-data fallback
  subscriptions.ts Zod schema + annualized-cost helpers
  store.ts         in-memory store, optionally backed by Supabase
  email.ts         Resend sending with console-preview fallback
  auth0.ts         Auth0 client (lazy, env-gated)
  supabase.ts      Supabase client (lazy, env-gated)
  config.ts        integration-status detection
  mock-data.ts     demo subscriptions + email templates
middleware.ts      Auth0 route handling & dashboard protection
supabase/
  schema.sql       database schema
```

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## Deployment

This repository is linked to a [v0](https://v0.app) project — every merge to `main` deploys automatically.

[Continue working on v0 →](https://v0.app/chat/projects/prj_IRxwtG3SWkC6Qd1dwkG1uQXs1PgW)
