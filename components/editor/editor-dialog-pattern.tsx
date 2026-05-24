"use client";

import type { ReactNode } from "react";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface EditorDialogPatternProps {
  title: ReactNode;
  description?: ReactNode;
  footerActions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function EditorDialogPattern({
  title,
  description,
  footerActions,
  children,
  className,
}: EditorDialogPatternProps) {
  return (
    <DialogContent
      className={cn(
        "rounded-3xl border border-surface-border bg-elevated text-copy-primary shadow-2xl sm:max-w-lg",
        className
      )}
    >
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-copy-primary">
          {title}
        </DialogTitle>
        {description ? (
          <DialogDescription className="text-sm leading-relaxed text-copy-muted">
            {description}
          </DialogDescription>
        ) : null}
      </DialogHeader>

      {children ? <div className="text-sm text-copy-secondary">{children}</div> : null}

      {footerActions ? (
        <DialogFooter className="border-surface-border bg-subtle/50">
          {footerActions}
        </DialogFooter>
      ) : null}
    </DialogContent>
  );
}
