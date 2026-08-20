# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 14 App Router site for Dr. Health/Skinetics. Routes and page layouts live in `app/`: page-specific components may sit beside their route (for example, `app/contacts/_components/`), while reusable UI belongs in `app/_components/`. API handlers are in `app/api/<name>/route.ts`. Put shared validation schemas and form DTOs in `lib/dto/`, analytics helpers in `lib/`, and cross-page constants/types in `constants.ts` and `types.ts`. Static images, SEO files, and web-manifest assets belong in `public/`. See `docs/skinetics-seo-context.md` before making SEO-content changes.

## Build, Test, and Development Commands

- `npm install` installs the locked dependencies from `package-lock.json`.
- `npm run dev` runs the development server at `http://localhost:3000`.
- `npm run lint` runs Next.js linting; use it before submitting changes.
- `npm run build` creates the production build and catches type, route, and rendering failures.
- `npm run start` serves a completed production build locally.
- `./build.sh` creates `skinetics-release.tar.gz`, the production artifact for the Ubuntu VM. It requires Docker Desktop and uses Buildx to install and build dependencies inside a `linux/amd64`, Node 24 container. Do not deploy a `.next` directory built directly on macOS.

## Production Build and Deployment

`next.config.mjs` uses standalone output. `Dockerfile.build` produces the minimal runtime artifact, and `.dockerignore` must continue to exclude Mac `node_modules`, `.next`, generated release files, and `.env*` files from the build context. The build script clears only the local `release/` directory and prior `skinetics-release.tar.gz`, verifies `server.js`, `.next`, `node_modules`, and `public`, then creates the archive.

The Ubuntu VM runs Node.js 24 on `linux/amd64`; keep the Docker base image on the same Node major version. Upload and extract only `skinetics-release.tar.gz`, then launch the standalone server with `node server.js` behind the reverse proxy. Supply `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_SENDER` on the VM at runtime—never bake secrets into the Docker image or release archive.

## Coding Style & Naming Conventions

Write TypeScript with `strict` compiler settings. Follow the surrounding code: two-space indentation, semicolons, double-quoted imports/strings, and trailing commas only where the existing formatter produces them. Use PascalCase for React components and their default-export file names where established (for example, `DoctorForm` in `form.tsx`); use camelCase for functions, variables, schemas, and DTO fields. Prefer the `@/` import alias for shared modules. Mark browser-interactive components with `"use client"`; keep server-only code and credentials inside route handlers.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. At minimum, run `npm run lint` and `npm run build`, then manually exercise affected routes and form/API flows. For validation changes, cover both accepted and rejected input; keep Zod schemas in `lib/dto/` aligned with their client forms and API handlers. Add focused tests alongside new test infrastructure rather than committing unverified behavior.

## Commit & Pull Request Guidelines

Recent history uses short, imperative subjects such as `security patch`, `Update requisites`, and `seo fixes`; keep the subject concise and scoped to one change. In pull requests, describe the user-facing effect, list validation performed, link the relevant issue when available, and include screenshots for visual changes. Call out SEO, analytics, sitemap, and environment-variable changes explicitly. Never commit `.env*.local`, production credentials, or mail settings; the feedback APIs require `EMAIL_USER`, `EMAIL_PASS`, and `EMAIL_SENDER` at runtime.
