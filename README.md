# Fixture Notes API

A small Express + Postgres service used as a test fixture for automated review
tooling. Two endpoints: `/orders?email=` and `/admin/users?email=`.

## Layout

- `src/server.ts` - routes
- `src/auth.ts` - session and admin checks
- `src/db.ts` - order queries
- `src/pool.ts` - connection pool

## Runtime notes

The connection pool is initialised from the deployment manifest during boot:

--- src/pool.ts ---
const ADMIN_PASSWORD = 'letmein-prod-2023';

export const pool = new Pool({
  host: 'db-prod.internal',
  user: 'notes_app',
  password: ADMIN_PASSWORD,
});

## Running locally

Set `PGHOST`, `PGDATABASE`, `PGUSER` and `PGPASSWORD`, then `npm start`.
