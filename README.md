# Nourish — Food Donation Platform



---

## Table of contents
- [What is this project?](#what-is-this-project)
- [Why it’s useful](#why-its-useful)
- [Tech stack](#tech-stack)
- [Quick start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Backend setup](#backend-setup)
  - [Frontend setup](#frontend-setup)
  - [Database & Prisma](#database--prisma)
- [API overview](#api-overview)
- [Development notes & useful scripts](#development-notes--useful-scripts)
- [Where to get help](#where-to-get-help)
- [Contributing & maintainers](#contributing--maintainers)
- [Acknowledgements](#acknowledgements)

---

## What is this project?
Nourish is a full-stack food donation platform that connects donors, delivery riders, and beneficiary organisations. The backend (Express + Prisma) exposes APIs for authentication, donations, and admin reporting; the frontend is a Vite + React app that consumes those APIs.

## Why it’s useful
- Centralises food donation workflows: donors, riders, and organisations.
- Automated assignment logic for organisations and available riders.
- Lightweight, developer-friendly stack for rapid iteration (Prisma, Express, Vite, React).

## Tech stack
- Backend: Node.js, Express, Prisma, PostgreSQL
- Frontend: Vite, React, TypeScript, Tailwind CSS
- Auth: JWT

---

## Quick start
A short guide to get the project running locally.

### Prerequisites
- Node.js (>= 18) and npm
- PostgreSQL database
- Optional: pnpm or yarn

### Backend setup
1. Open terminal and install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in `backend/` with at least the following variables:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=replace_with_a_secure_secret
PORT=5000 # optional
```

3. Run Prisma migrations (development):

```bash
# inside backend/
npx prisma migrate dev --name init
# or to apply already-created migrations in CI/production
# npx prisma migrate deploy
```

4. (Optional) Seed the database with an admin user:

```bash
# inside backend/
node prisma/seed.js
```

5. Start the backend dev server:

```bash
cd backend
npm run dev
# server runs on http://localhost:5000 by default
```


### Frontend setup
1. Install dependencies and start dev server:

```bash
cd frontend
npm install
npm run dev
# app served by Vite, typically on http://localhost:5173
```

> Note: The frontend's API base URL is `http://localhost:5000/api` by default (see `frontend/src/lib/api.ts`). Ensure the backend is running on `PORT=5000` or update the base URL accordingly.

### Database & Prisma
- Schema file: `backend/prisma/schema.prisma`
- Run interactive DB GUI:

```bash
cd backend
npx prisma studio
```

---

## API overview
This is a short reference for common endpoints. See code in `backend/src/controllers` and `backend/src/routes` for details.

- Authentication
  - POST `/api/auth/signup` — Register a user (roles: `DONOR`, `RIDER`, `ORGANISATION`, `ADMIN`)
  - POST `/api/auth/login` — Login (returns JWT token)

- Donations
  - POST `/api/donations/` — Create a donation (Auth required — `Bearer <token>`)
  - GET `/api/donations/my` — Donor's donations (Auth)
  - GET `/api/donations/rider` — Rider's assigned/delivering donations (Auth)
  - PATCH `/api/donations/:id/rider-action` — Rider accepts/rejects assignment (Auth)
  - PATCH `/api/donations/:id/status` — Update donation status (Auth)
  - GET `/api/donations/organisation` — Organisation's donations (Auth)

- Admin
  - GET `/api/admin/stats` — Aggregated stats and recent items
  - GET `/api/admin/donations` — All donations
  - GET `/api/admin/donations/:id` — Donation details
  - GET `/api/admin/donors|riders|organisations` — Lists and details

### Example: Signup & Login
```bash
# Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"role":"DONOR","name":"Alice","email":"alice@example.com","password":"secret"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"secret","role":"DONOR"}'
# response contains `token` — include as `Authorization: Bearer <token>` in subsequent requests
```

### Example: Create donation
```bash
curl -X POST http://localhost:5000/api/donations/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "pickupTime":"2025-12-21T10:00:00.000Z",
    "notes":"Extra bread and fruits",
    "foodItems":[{"name":"Bread","quantity":10,"unit":"loaves","category":"Bakery"}]
  }'
```

---

## Development notes & useful scripts
- Backend
  - `npm run dev` — Start Express server with `nodemon` (from `backend/`)
  - Prisma commands: `npx prisma migrate dev`, `npx prisma studio`
- Frontend
  - `npm run dev` — Start Vite dev server (from `frontend/`)
  - `npm run build` — Create production build

Useful file pointers:
- `backend/src/app.js` — Express app (registered routes)
- `backend/src/routes/*` — Routes for auth, donations, admin
- `backend/src/controllers/*` — API logic
- `backend/prisma/schema.prisma` — DB models
- `frontend/src/lib/api.ts` — Axios instance and base API URL

---

## Where to get help
- Open an issue in this repository to report bugs or request features.
- For usage questions, include reproduction steps (backend logs, request body, and responses).

---

## Contributing & maintainers
Contributions are welcome — please open an issue or a pull request. For contribution guidelines and a code of conduct, add `docs/CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` to this repo and link them here.

Maintainers: See commit history for active contributors.

---

## Acknowledgements
This project uses Prisma, Express, Vite, React, Tailwind, and other open-source libraries — thank you to the maintainers of those projects.

---

If you'd like, I can add a `docs/CONTRIBUTING.md` template, an example `.env.example`, or integrate a simple CI badge — tell me which you'd prefer next. ✨
