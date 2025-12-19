# Food Donation Platform

![status](https://img.shields.io/badge/status-active-brightgreen)

A simple platform for coordinating food donations between donors, riders, and organisations. This repository contains a Node.js/Express backend (Postgres + Prisma) and a Vite + React + TypeScript frontend (shadcn/ui components).

## Table of Contents

- [What this project does](#what-this-project-does)
- [Why it is useful](#why-it-is-useful)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the repo](#clone-the-repo)
  - [Backend: Local setup](#backend-local-setup)
  - [Frontend: Local setup](#frontend-local-setup)
  - [Running both](#running-both)
- [API overview](#api-overview)
- [Project structure](#project-structure)
- [Where to get help](#where-to-get-help)
- [Maintainers & Contributing](#maintainers--contributing)
- [License](#license)

---

## What this project does

**Food Donation Platform** helps donors publish food donations, allows riders to pick up donations, and organisations to receive and track donations. It includes role-based authentication, donation lifecycle management, automatic rider assignment helpers, and administrative dashboards.

Key features
- Role-based users: DONOR, RIDER, ORGANISATION, ADMIN
- Create donations with multiple food items
- Rider assignment and donation status updates (PENDING ➜ ASSIGNED ➜ ACCEPTED ➜ IN_TRANSIT ➜ DELIVERED)
- Admin endpoints for metrics and listing resources

## Why it is useful

- Streamlines coordination between donors and food redistribution organisations
- Tracks donation lifecycle and provides basic admin analytics
- Built with well-known, easy-to-extend technologies (Express, Prisma, React)

## Tech stack

- Backend: Node.js, Express, Prisma (Postgres), JWT auth
- Frontend: Vite, React, TypeScript, shadcn/ui components
- Database: PostgreSQL

---

## Getting started

### Prerequisites

- Node.js (>= 18 recommended)
- npm (or pnpm/yarn)
- PostgreSQL database

### Clone the repo

```bash
git clone <repo-url>
cd Food-Donation
```

### Backend: Local setup

1. Install dependencies

```bash
cd backend
npm install
```

2. Create a `.env` in `backend/` (example values):

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/foodDonation
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

> Note: Example DB connection is present in `backend/.env` in this workspace; **do not** commit secrets to source control.

3. Run Prisma migrations and generate client

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Seed initial data (creates an admin user by default)

```bash
node prisma/seed.js
```

5. Start the backend server (development)

```bash
npm run dev
# server will run on http://localhost:5000 by default
```

Files to check
- `backend/prisma/schema.prisma` — DB schema
- `backend/prisma/seed.js` — seed script
- `backend/src/app.js` — express app & routes

### Frontend: Local setup

1. Install dependencies

```bash
cd frontend
npm install
```

2. Start the dev server

```bash
npm run dev
```

Visit the site at the address printed by Vite (usually http://localhost:5173). The frontend calls the backend at `http://localhost:5000/api` by default (see `frontend/src/lib/api.ts`). Update that file if your API is hosted elsewhere.

### Running both

Open two shells or use a process manager like `concurrently`:

- Terminal 1: `cd backend && npm run dev`
- Terminal 2: `cd frontend && npm run dev`

---

## API overview (selected endpoints)

> See route handlers for full details: `backend/src/routes` and `backend/src/controllers`

Auth
- POST `/api/auth/signup` — register user (body: role, name, email, password, plus role-specific fields)
- POST `/api/auth/login` — login (body: email, password, role)

Donations
- POST `/api/donations` — create donation (auth: DONOR)
- GET `/api/donations/my` — donor's donations (auth)
- GET `/api/donations/rider` — rider assigned donations (auth)
- PATCH `/api/donations/:id/status` — update donation status (auth)
- GET `/api/donations/organisation` — organisation donations (auth)

Admin
- GET `/api/admin/donations` — list donations (ADMIN)
- GET `/api/admin/donations/:id` — get donation details (ADMIN)

Example: Create a user via curl

```bash
# Signup (DONOR)
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"role":"DONOR","name":"Alice","email":"alice@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"pass123","role":"DONOR"}'
```

---

## Project structure

Top-level folders
- `backend/` — Express API, Prisma schema, migrations, seed scripts
- `frontend/` — Vite + React app with shadcn components

Key files
- `backend/package.json` — backend scripts (`npm run dev`)
- `backend/prisma/schema.prisma` — database schema
- `backend/prisma/seed.js` — seed data
- `frontend/package.json` — frontend scripts (`npm run dev`, `npm run build`)
- `frontend/src/lib/api.ts` — axios wrapper / API base URL

---

## Where to get help

- Open an issue in this repository for bugs or feature requests
- For questions, open a discussion or create an issue with the `question` label

---

## Maintainers & Contributing

- Maintainers: see the repository `Contributors` or the repo owner on GitHub.

Contributing
- Contributions are welcome — please open a PR with a clear description and tests if applicable.
- If you plan to contribute regularly, please add a `CONTRIBUTING.md` file with the project's preferred workflow. For now, open issues/PRs as described above.

Suggested workflow
1. Fork the repo, create a feature branch
2. Run the test/dev environment locally
3. Open a pull request describing the change

---

## License

No `LICENSE` file is included in this repository. Add a `LICENSE` file to clearly state the project's license (e.g., MIT, Apache-2.0) if you intend to make this project open source.

---

## Acknowledgements

This project uses Prisma, Express, and shadcn/ui with Vite + React.

---

If you'd like, I can also:
- Add a `CONTRIBUTING.md` template and `LICENSE` file
- Add simple GitHub Actions for CI (lint + build)

If you want changes or extra sections (developer setup for Docker, CI, or env templates), tell me which items to include and I'll add them.
