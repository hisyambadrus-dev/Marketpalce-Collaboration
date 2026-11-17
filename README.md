# Kampus Konnect

Campus collaboration marketplace starter built from the supplied TSX reference and screenshot.

## Stack

- **Web:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **API:** NestJS 12, TypeScript, class-validator
- **Architecture:** npm workspaces monorepo

## Quick start (Windows / VS Code)

1. Install **Node.js 22 or newer** (an active LTS release is recommended).
2. Extract this ZIP.
3. Open the extracted `kampus-konnect-platform` folder in VS Code.
4. Open Terminal → New Terminal and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the web app at **http://localhost:3000**.
6. The API runs at **http://localhost:4000/api**. Health check: **http://localhost:4000/api/health**.

The root `npm run dev` command runs both apps together. To run separately, use `npm run dev:web` or `npm run dev:api`.

## Project structure

```text
kampus-konnect-platform/
├─ apps/
│  ├─ web/                 # Next.js frontend
│  └─ api/                 # NestJS REST API
├─ docs/
│  ├─ kampus-konnect-original-reference.tsx
│  └─ reference-screenshot.png
├─ package.json            # npm workspaces + shared scripts
└─ README.md
```

## Included workflows

- Project and micro-gig marketplace with type/category/tech-stack filters and search
- Submit a proposal / gig bid
- Review applicants and accept an applicant into a workspace
- Student talent directory with skill and portfolio links
- Workspace progress stages, project metadata, and chat composer
- Escrow status panel (demo UI only)
- Profile showcase, reputation, and skills
- Indonesian / English toggle and dark / light theme
- Responsive desktop navigation and mobile bottom navigation

## API routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | API health |
| GET | `/api/projects` | List projects |
| POST | `/api/projects/:projectId/proposals` | Submit proposal |
| PATCH | `/api/projects/:projectId/proposals/:proposalId/accept` | Accept proposal |
| GET | `/api/students` | List student talent |
| GET | `/api/workspace/:projectId/messages` | Read workspace messages |
| POST | `/api/workspace/:projectId/messages` | Send a message |
| PATCH | `/api/workspace/:projectId/status` | Update project progress |

## Environment variables

Frontend (`apps/web/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

API (`apps/api/.env`):

```env
PORT=4000
WEB_ORIGIN=http://localhost:3000
```

Both values have working defaults, so these files are optional for local development.

## Important implementation notes

- Seed records are mock/demo data taken from the supplied reference file. Replace names, avatars, NIMs, portfolio URLs, and sample amounts before a real launch.
- The API uses **in-memory storage** for this starter. Data resets when the API process restarts. Connect PostgreSQL/MySQL and add migrations/repositories before production.
- The escrow module is a **status/progress demonstration only**. It does not hold funds, create a payment account, or move money. A real escrow/payment workflow needs a compliant payment provider, legal review, signed transaction records, and webhook verification.
- Authentication, campus email/NIM verification, role-based authorization, file uploads, realtime WebSocket delivery, notification delivery, payment integration, and production audit logs are not enabled yet.
- The frontend includes local fallback behavior when the API is unavailable; start both workspaces with `npm run dev` for the full demo.

## Build checks

```bash
npm run typecheck
npm run build
```
