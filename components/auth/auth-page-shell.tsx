import { BrainCircuit, FileText, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

interface AuthFeature {
  title: string;
  description: string;
}

interface AuthPageShellProps {
  children: ReactNode;
  title: string;
  intro: string;
  features: AuthFeature[];
}

export function AuthPageShell({
  children,
  title,
  intro,
  features,
}: AuthPageShellProps) {
  const featureIcons = [BrainCircuit, UsersRound, FileText];

  return (
    <main className="grid min-h-screen bg-base font-sans text-copy-primary lg:grid-cols-2">
      <section className="hidden border-r border-surface-border bg-surface px-10 py-10 lg:flex lg:flex-col lg:justify-between xl:px-12">
        <div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl border border-brand/40 bg-brand shadow-lg shadow-brand/20" />
            <div className="text-lg font-semibold text-copy-primary">
              Ghost AI
            </div>
          </div>

          <div className="mt-36 max-w-xl">
            <h1 className="max-w-lg text-4xl font-semibold leading-tight text-copy-primary">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-copy-muted">
              {intro}
            </p>

            <ul className="mt-16 space-y-9">
              {features.map((feature, index) => {
                const FeatureIcon = featureIcons[index] ?? BrainCircuit;

                return (
                  <li key={feature.title} className="flex gap-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-brand/30 bg-accent-dim text-brand">
                      <FeatureIcon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-base font-medium text-copy-primary">
                        {feature.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-copy-muted">
                        {feature.description}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="text-sm text-copy-faint">
          (c) 2026 Ghost AI. All rights reserved.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-base px-4 py-8 sm:px-6 lg:px-12">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
