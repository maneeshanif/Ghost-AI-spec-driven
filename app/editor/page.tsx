"use client";

import { Plus } from "lucide-react";

import { useEditorProjectActions } from "@/components/editor/editor-shell";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  const { openCreateDialog } = useEditorProjectActions();

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-base px-6 text-center">
      <div className="max-w-xl">
        <h1 className="font-heading text-3xl font-semibold text-copy-primary">
          Create a project or open an existing one
        </h1>
        <p className="mt-3 text-base leading-7 text-copy-muted">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
        <Button type="button" className="mt-7" onClick={openCreateDialog}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          New Project
        </Button>
      </div>
    </div>
  );
}
