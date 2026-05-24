import { SignUp } from "@clerk/nextjs";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { getSignInPath, getSignUpPath } from "@/lib/clerk-routes";

export default function SignUpPage() {
  return (
    <AuthPageShell
      title="Design systems at the speed of thought."
      intro="Create a workspace where architecture ideas become shared diagrams, durable decisions, and implementation-ready specs."
      features={[
        {
          title: "AI Architecture Generation",
          description:
            "Describe your system, AI maps it to nodes and edges on a live canvas.",
        },
        {
          title: "Real-time Collaboration",
          description:
            "Invite teammates into one focused editor with shared project context.",
        },
        {
          title: "Instant Spec Generation",
          description:
            "Turn the final canvas graph into a complete Markdown technical spec.",
        },
      ]}
    >
      <SignUp
        routing="path"
        path={getSignUpPath()}
        signInUrl={getSignInPath()}
      />
    </AuthPageShell>
  );
}
