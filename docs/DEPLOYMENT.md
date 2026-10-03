# Deployment Guide

The app deploys to Vercel as **one project with two services**: a Vite frontend
and an Express backend, sharing a single domain.

```
                       vercel.json (top level)
                     ┌────────────────────────┐
  /api/*  ──────────►│  service "backend"     │  backend/
  /health ──────────►│    framework: express  │
                     └────────────────────────┘
                     ┌────────────────────────┐
  everything else ──►│  service "frontend"    │  frontend/
                     │    framework: vite     │
                     └────────────────────────┘
```

Because `/api` is served from the **same origin** as the site, there is no CORS
configuration to maintain in production.

---

## How routing works

| Request            | Handled by  | Notes                                    |
| ------------------ | ----------- | ---------------------------------------- |
| `GET /api/courses` | backend     | original path is preserved (`/api/...`)  |
| `GET /health`      | backend     | uptime probe                             |
| `GET /courses`     | frontend    | falls back to `index.html` (SPA routing) |
| `GET /assets/x.js` | frontend    | served from CDN, immutable cache         |

Three rules make this work, in `vercel.json`:

1. **Top-level rewrites** route `/api/*` and `/health` to the backend service,
   and everything else to the frontend. Evaluation order matters — `/api/*` is
   listed first.
2. **A service-scoped rewrite inside `frontend`** maps unmatched paths to
   `/index.html`. This is mandatory: Vercel resolves every URL as a filesystem
   path, so without it a hard refresh on `/courses` or `/faq` returns a 404.
   Static files are checked *before* rewrites, so assets are unaffected.
3. Routing into a service is **final** — Vercel does not fall back across
   services, which is why rule 2 has to live inside the frontend service.

---

## Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Supabase project (PostgreSQL)
- Clerk application

---

## Environment variables

Add these in **Vercel → Project → Settings → Environment Variables**. They must
be set there: `frontend/.env` is gitignored, so Vercel never sees it.

### Frontend service (`frontend/`)

| Name                          | Required | Notes                                             |
| ----------------------------- | -------- | ------------------------------------------------- |
| `VITE_CLERK_PUBLISHABLE_KEY`  | **yes**  | No fallback in `App.tsx` — unset means Clerk fails |

`VITE_API_URL` / `VITE_API_BASE_URL` are **not** needed in production. Both API
clients default to same-origin `/api`, which `vercel.json` routes to the backend.
The Vite dev server proxies `/api` locally (see `vite.config.ts`).

### Backend service (`backend/`)

| Name                 | Required | Notes                                                    |
| -------------------- | -------- | -------------------------------------------------------- |
| `DATABASE_URL`       | **yes**  | Use the **pooled** Supabase string (port `6543`)         |
| `CLERK_SECRET_KEY`   | **yes**  | `sk_live_...` in production                              |
| `SUPABASE_URL`       | **yes**  |                                                          |
| `SUPABASE_ANON_KEY`  | **yes**  |                                                          |
| `FRONTEND_URL`       | no       | Only used by the CORS allowlist                          |
| `NODE_ENV`           | no       | Vercel sets `production`                                 |

These four are enforced at startup — `validateConfig()` in `backend/src/index.ts`
throws and names any that are missing, so a misconfigured deploy fails loudly in
the function logs instead of erroring per-request.

> **⚠️ Use the pooled connection string.** Serverless functions open and close
> connections constantly. The direct Supabase string (port `5432`) will exhaust
> the connection limit under even light traffic. In Supabase → Settings →
> Database, copy the **Pooler** URL (`...@aws-0...pooler.supabase.com:6543/...`).
> Use `pgbouncer=true` in the query string.

---

## Deployment steps

1. **Import the repository** at [vercel.com/new](https://vercel.com/new).
2. **Set the Framework Preset to Services — this is required and is NOT
   automatic.**

   Project → Settings → Build & Deployment → Framework Preset → **Services**

   Vercel builds as services only when *both* this setting is selected *and*
   `vercel.json` contains a `services` key. If either is missing, Vercel falls
   back to default framework detection and **silently ignores the services
   configuration** — with no root `package.json`, that fails during install.
   Redeploy after changing it.
3. **Add the environment variables** listed above.
4. **Deploy.** Pushing to `main` redeploys automatically; pull requests create
   preview deployments.

### What each service builds

| Service   | Framework | Build command     | Output      |
| --------- | --------- | ----------------- | ----------- |
| frontend  | `vite`    | `npm run build`   | `dist/`     |
| backend   | `express` | `prisma generate` | functions   |

The backend's `buildCommand` is deliberately `prisma generate` and **not** the
`build` script (`tsc`), which currently fails typechecking. The TypeScript is
transpiled by Vercel without typechecking, so those errors don't block a deploy
— but they should still be fixed (see *Known issues*).

---

## Local development

Unchanged by any of the above. Same-origin `/api` works locally because
`vite.config.ts` proxies it:

```
frontend  http://localhost:5173
backend   http://localhost:3000   (proxied from /api)
```

```bash
# frontend
cd frontend && npm install && npm run dev

# backend
cd backend && npm install && npx prisma generate && npm run dev
```

---

## Verification checklist

- [ ] Framework Preset is set to **Services** (or the services config is ignored)
- [ ] Site loads and Clerk sign-in works
- [ ] **Hard refresh on a deep link** (e.g. `/courses`) renders — not a 404
- [ ] `GET https://<your-domain>/health` returns `{"success":true,...}`
- [ ] Authenticated dashboard pages load data
- [ ] Language and theme toggles work
- [ ] No `Cannot find module '@/...'` in the backend function logs
- [ ] `.env` is not committed (`git ls-files | grep -c '\.env$'` → 0)

---

## Troubleshooting

### 404 on refresh or direct navigation

The frontend SPA fallback rewrite is missing or not applied. Confirm
`vercel.json` is **committed to Git** — an untracked `vercel.json` produces no
error, the rewrites simply never apply.

### Backend: `Cannot find module '@/config/index'`

The backend uses TypeScript path aliases (`@/*`, see `backend/tsconfig.json`),
which TypeScript does **not** rewrite in emitted JavaScript. If Vercel's
resolver doesn't pick them up from `tsconfig.json`, this appears at runtime on
the first API call.

Fix (if it occurs): precompile so no aliases survive, and point the service at
the output — `tsc --noCheck && tsc-alias` for the build, plus
`"entrypoint": "dist/index.js"` on the backend service.

### 401 / Clerk errors on the frontend

`VITE_CLERK_PUBLISHABLE_KEY` is missing or is a `pk_test_` key in production.
Vite inlines env vars at build time — changing one requires a **redeploy**.

### Database connection errors

- Wrong string: confirm port `6543` (pooled), not `5432` (direct)
- Supabase project paused — resume it from the Supabase dashboard
- Connection limit reached — check Supabase → Database → Usage

### API returns 404

The request isn't reaching the backend service. Confirm the `/api/:path*` rewrite
is still the **first** entry in the top-level `rewrites` array.

---

## Known issues

Tracked here so they aren't rediscovered during an incident:

- **20 pre-existing type errors in `backend/`** (`npm run typecheck` exits 2)
  across `AuthService`, `ProfileService`, `EnrollmentService`, `MessageService`,
  `ParentService`, `ScheduleService` — DTO mismatches against `@/types/index`
  (e.g. `ProfileDto` wants `name/email/role` but services return
  `fullName/avatarUrl`; `CreateScheduleEntryRequest` is not exported). They do
  not block deployment but they are untested contract drift between the
  frontend's types and the backend's.
- **Backend CORS allowlist** contains only `config.FRONTEND_URL` + localhost.
  This is harmless today because `/api` is same-origin, but add your domain if
  the API is ever served from a different origin.

---

## Domain

1. Vercel → Project → Settings → Domains → Add
2. Update DNS records as Vercel instructs
3. SSL is configured automatically

No separate backend domain is needed — both services share one origin.

---

## Rollback

Vercel → Deployments → select a previous deployment → **Instant Rollback**.

---

## Monitoring

```bash
curl https://<your-domain>/health
```

Vercel → Observability shows invocation counts, error rates, and duration per
path for the backend function.
