# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Complete

## Current Goal

- Prisma project models, client singleton, migration, and generated client from `context/feature-specs/05-prisma.md` are implemented.

## Completed

- Added Prisma `ProjectStatus`, `Project`, and `ProjectCollaborator` schema definitions in `prisma/models/project.prisma`.
- Added the first Prisma migration for project and collaborator storage.
- Generated the Prisma client to the configured `app/generated/prisma` output.
- Added `lib/prisma.ts` with a cached Prisma singleton that uses Accelerate for `prisma+postgres://` URLs and `@prisma/adapter-pg` for direct Postgres URLs.
- Built the `/editor` home screen with the centered heading, description, and New Project CTA.
- Added a dedicated project dialog hook for mock project data, dialog state, form state, slug preview, and loading state.
- Added Create Project, Rename Project, and Delete Project dialogs wired through the reusable editor dialog pattern.
- Wired the editor home CTA, sidebar create button, owned-project rename actions, and owned-project delete actions to the dialog manager.
- Added owned and shared mock project lists; shared projects intentionally hide rename/delete actions.
- Added the mobile sidebar backdrop scrim so tapping outside the sidebar closes it.
- Updated auth pages to match the screenshot direction with a 50/50 desktop split, distinct left panel, compact brand block, structured feature list, and centered Clerk form.
- Explicitly mapped Clerk typography to the Geist Sans and Geist Mono variables from the UI guidelines.
- Fixed the Tailwind heading font token to resolve directly to Geist Sans.
- Fixed Clerk unauthenticated redirects to use the local sign-in page instead of the hosted Clerk Account Portal.
- Installed `@clerk/ui`.
- Wrapped the root app with `ClerkProvider` using Clerk's `dark` theme and app CSS variables.
- Added custom sign-in and sign-up pages with minimal two-panel desktop auth layout and form-only mobile layout.
- Added root `proxy.ts` with Clerk route protection; only sign-in and sign-up paths are public.
- Updated `/` to redirect authenticated users to `/editor` and unauthenticated users to `/sign-in`.
- Added Clerk's built-in `UserButton` to the editor navbar.
- Moved editor chrome into the `/editor` layout so auth pages stay minimal.
- Added `components/editor/editor-shell.tsx` to own sidebar state and compose the editor navbar/sidebar.
- Built the base editor navbar in `components/editor/editor-navbar.tsx`.
- Built the floating project sidebar shell in `components/editor/project-sidebar.tsx`.
- Added the reusable editor dialog pattern in `components/editor/editor-dialog-pattern.tsx`.
- Cleaned up the initial Next.js boilerplate.
- Added the dark-only design-system token foundation in `app/globals.css`.
- Applied Ghost AI metadata and root layout token classes in `app/layout.tsx`.
- Installed and configured shadcn/ui.
- Added generated shadcn/ui primitives: Button, Card, Dialog, Input, Tabs, Textarea, and ScrollArea.
- Installed `lucide-react`.
- Added `lib/utils.ts` with the reusable `cn()` helper.
- Remapped shadcn theme tokens to the Ghost AI dark theme so generated components do not fall back to default light styling.

## In Progress

- None currently.

## Next Up

- Read the next feature spec when ready.

## Open Questions

- None currently.

## Architecture Decisions

- Prisma schema is split with generator/datasource in `prisma/schema.prisma` and project domain models in `prisma/models/project.prisma`.
- Prisma client creation reads `DATABASE_URL` once, uses `accelerateUrl` for Prisma Postgres Accelerate URLs, uses `PrismaPg` for direct Postgres URLs, and caches the instance on `globalThis` outside production.
- Project dialog workflows are local-only mock state inside `useProjectDialogs`; no API calls or persistence were added.
- The `/editor` page consumes a tiny editor actions context so the layout-owned dialog manager can be triggered from the page CTA without moving sidebar/navbar state out of `EditorShell`.
- Auth routes are the only public routes in `proxy.ts`; every other route is protected by default with `auth.protect()`.
- Auth URL helpers read Clerk's standard sign-in/sign-up env vars and fall back to `/sign-in` and `/sign-up` when those optional env vars are not present locally.
- Editor chrome lives under `app/editor/layout.tsx`, keeping root auth pages free of editor navigation.
- Root layout remains a Server Component; interactive sidebar state lives in the client `EditorShell`.
- Editor chrome components are Client Components because they expose event-handler props and compose shadcn tabs/dialog primitives.
- The project sidebar uses fixed positioning and transform-based animation so opening it does not push canvas content.
- The dialog pattern is a reusable content wrapper only; no actual dialog workflow or trigger was built yet.
- Tailwind 4 tokens are mapped from CSS custom properties with `@theme inline`, matching the project rule to use semantic utilities instead of raw Tailwind colors.
- The app is dark-only at the base layer via `color-scheme: dark`, `--bg-base`, and `--text-primary`.
- shadcn/ui generated files under `components/ui/*` are left unmodified; dark theme compatibility is handled through global CSS tokens and the root `dark` class.

## Session Notes

- Implemented `context/feature-specs/05-prisma.md`; `npx prisma format`, `npx prisma validate`, `npx prisma migrate dev --name add_project_models`, `npx prisma generate`, `npx tsc --noEmit`, `npm run lint`, and `npm run build` passed. Prisma commands needed elevated network access for the engine/database, and the first sandboxed build hit the recurring `.next` unlink permission issue before the elevated rerun passed.
- Re-read `context/feature-specs/05-prisma.md`; the spec requires project/collaborator models, cached Prisma singleton branching between Accelerate and direct Postgres adapter, migration, generate, and build.
- Centered the `/editor` home CTA against the viewport below the navbar and set project dialog input text/caret/placeholder colors to dark-theme tokens.
- Implemented `context/feature-specs/04-project-dialogs.md`; `npx tsc --noEmit`, `npm run lint`, and `npm run build` passed. The first sandboxed build hit the recurring `.next` unlink permission issue, and the elevated rerun passed.
- Re-read `context/feature-specs/04-project-dialogs.md`; the spec requires mock project dialogs/sidebar actions only, with no API calls or persistence.
- Auth UI screenshot polish passed `npx tsc --noEmit`, `npm run lint`, and `npm run build` after the recurring elevated `.next` cleanup rerun.
- Added explicit `signInUrl` and `signUpUrl` to `ClerkProvider`, and `unauthenticatedUrl` to `auth.protect()` in `proxy.ts`.
- Updated `proxy.ts` to pass an absolute `unauthenticatedUrl` built from `request.url`, because Next.js middleware rejects relative redirect URLs.
- `npx tsc --noEmit` and `npm run lint` passed after the local auth redirect fix.
- Re-read `context/feature-specs/03-auth.md`; Clerk auth implementation is complete.
- `npx tsc --noEmit` passed after auth wiring.
- `npm run lint` passed after auth wiring.
- A scan of auth-related files found no hardcoded light colors or gradients.
- `npm run build` passed after rerunning with elevated filesystem access; the first sandboxed attempt could not unlink an existing `.next` chunk file.
- Re-read `context/feature-specs/03-auth.md`; the spec requires ClerkProvider, sign-in/sign-up pages, `proxy.ts` route protection, `/` redirects, and Clerk `UserButton` in the editor navbar.
- The editor navbar and project sidebar now mount through `app/editor/layout.tsx`; the dialog pattern remains unrendered until a future real dialog flow exists.
- `npx tsc --noEmit` passed after mounting `EditorShell` in the root layout.
- `npm run lint` passed after mounting `EditorShell` in the root layout.
- `npm run build` still hit the sandbox `.next/app-path-routes-manifest.json` unlink issue first; the elevated rerun then failed because `next/font` could not fetch `Geist` and `Geist Mono` from Google Fonts.
- Re-read `context/feature-specs/02-editor.md`; the spec requires reusable editor chrome: top navbar, floating project sidebar, and dialog styling pattern support.
- `npx tsc --noEmit` passed for the editor components.
- `npm run lint` passed for the editor components.
- `npm run build` passed after rerunning with elevated filesystem access; the first sandboxed attempt could not unlink `.next/app-path-routes-manifest.json`.
- The design-system task was marked in progress before implementation work began.
- `npm run lint` passed.
- `npm run build` passed after rerunning with elevated filesystem access; the first sandboxed attempt could not unlink `.next/types/cache-life.d.ts`.
- Re-read `context/feature-specs/01-design-system.md`; the spec now requires shadcn/ui, Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea, `lucide-react`, and `lib/utils.ts`.
- `npx tsc --noEmit` passed.
- `cn()` merge behavior was checked with `clsx` and `tailwind-merge`.
- A scan found no hardcoded default light styling patterns in `components`, `app`, or `lib`.
- `npm run lint` passed after implementation.
- `npm run build` passed after rerunning with elevated filesystem access; the first sandboxed attempt could not unlink `.next/app-path-routes-manifest.json`.
