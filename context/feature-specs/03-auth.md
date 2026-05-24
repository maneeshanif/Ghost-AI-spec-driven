Clerk is already installed and connected .Wire it into the Next.js app: provider ,auth pages ,  redirect , route protection , and the user menu

## Design

Use Clerk's `dark` theme from `@clerk/ui/themes` as the base.

Override Clerk appearance variables using the app's existing CSS variables. Do not hardcode colors.

### Sign-in and sign-up pages:

- large screens: simple two-panel layout
- left: compact logo, tagline, short text-only feature list
- right: centered Clerk form
- small screens: form only
- no gradients
- no oversized hero sections
- no feature cards
- no scroll-heavy layouts


Keep the layout minimal and professional.

## Implementation 

Wrap the root layout with `ClerkProvider` using Clerk's `dark` theme.

Create sign-in and sign-up pages using Clerk components.

Use `proxy.ts` at the project root , not `middleware.ts` .

Define Public routes using existing sign-up and sign-in env vars .Project everythink else by default 

Update `/` :

- authenticated users: redirect to `/editor`
- unauthenticated users: redirect to `/sign-in`

Add Clerk's built-in `UserButton` to the editor navbar for user profile settings and logout.

Keep Clerk's default user menu and profile flow intact . Do no build or heavily customize Clerk internal. 

Use Existing Clerk env vars . Do not rename or invent new ones.


## Dependencies

install: @clerk/ui

## Check When Done

- `proxy.ts` exists at the root
- all routes are protected except public auth paths
- auth pages use CSS variables with no hardcoded colors - `ClerkProvider` wraps the root layout
- `npm run build` passes
