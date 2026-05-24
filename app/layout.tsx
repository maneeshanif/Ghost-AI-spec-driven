import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

import { getSignInPath, getSignUpPath } from "@/lib/clerk-routes";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "Collaborative system design workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-base font-sans text-copy-primary">
        <ClerkProvider
          signInUrl={getSignInPath()}
          signUpUrl={getSignUpPath()}
          appearance={{
            theme: dark,
            variables: {
              colorBackground: "var(--bg-elevated)",
              colorBorder: "var(--border-default)",
              colorDanger: "var(--state-error)",
              colorForeground: "var(--text-primary)",
              colorInput: "var(--bg-subtle)",
              colorInputForeground: "var(--text-primary)",
              colorModalBackdrop: "var(--bg-base)",
              colorMuted: "var(--bg-subtle)",
              colorMutedForeground: "var(--text-muted)",
              colorNeutral: "var(--text-muted)",
              colorPrimary: "var(--accent-primary)",
              colorPrimaryForeground: "var(--bg-base)",
              colorRing: "var(--accent-primary)",
              colorSuccess: "var(--state-success)",
              colorWarning: "var(--state-warning)",
              fontFamily: "var(--font-geist-sans)",
              fontFamilyButtons: "var(--font-geist-sans)",
              fontFamilyMono: "var(--font-geist-mono)",
            },
            elements: {
              cardBox: "rounded-3xl border border-surface-border bg-elevated shadow-2xl",
              formButtonPrimary: "bg-brand text-base hover:bg-brand/90",
              footerActionLink: "text-brand hover:text-brand",
              headerSubtitle: "text-copy-muted",
              headerTitle: "text-copy-primary",
              socialButtonsBlockButton:
                "border-surface-border bg-subtle text-copy-primary hover:bg-surface",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
