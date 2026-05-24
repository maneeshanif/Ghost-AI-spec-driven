export const DEFAULT_SIGN_IN_PATH = "/sign-in";
export const DEFAULT_SIGN_UP_PATH = "/sign-up";

function normalizeClerkPath(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return new URL(value).pathname || fallback;
  }

  return value.startsWith("/") ? value : `/${value}`;
}

export function getSignInPath() {
  return normalizeClerkPath(
    process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    DEFAULT_SIGN_IN_PATH
  );
}

export function getSignUpPath() {
  return normalizeClerkPath(
    process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    DEFAULT_SIGN_UP_PATH
  );
}

export function toRoutePattern(path: string) {
  return `${path.replace(/\/$/, "")}(.*)`;
}
