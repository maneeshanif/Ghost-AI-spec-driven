"use client";

import type { FormEvent } from "react";

import { AlertTriangle } from "lucide-react";

import { EditorDialogPattern } from "@/components/editor/editor-dialog-pattern";
import type { useProjectDialogs } from "@/components/editor/use-project-dialogs";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ProjectDialogsProps {
  manager: ReturnType<typeof useProjectDialogs>;
}

export function ProjectDialogs({ manager }: ProjectDialogsProps) {
  const {
    dialog,
    projectName,
    slugPreview,
    isLoading,
    isProjectNameValid,
    closeDialog,
    setProjectName,
    submitCreate,
    submitRename,
    submitDelete,
  } = manager;

  const isOpen = dialog.type !== null;
  const formId = `project-${dialog.type ?? "closed"}-form`;

  function handleOpenChange(open: boolean) {
    if (!open) {
      closeDialog();
    }
  }

  function handleCreateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitCreate();
  }

  function handleRenameSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitRename();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {dialog.type === "create" ? (
        <EditorDialogPattern
          title="Create Project"
          description="Name the workspace and use the generated slug preview before creating it."
          footerActions={
            <>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                form={formId}
                disabled={!isProjectNameValid || isLoading}
              >
                Create Project
              </Button>
            </>
          }
        >
          <form id={formId} className="space-y-4" onSubmit={handleCreateSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-copy-secondary">
                Project name
              </span>
              <Input
                className="bg-input/30 text-copy-primary caret-brand placeholder:text-copy-muted"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="Architecture workspace"
              />
            </label>
            <div className="rounded-xl border border-surface-border bg-subtle px-3 py-2">
              <p className="text-xs font-medium uppercase text-copy-muted">
                Slug preview
              </p>
              <p className="mt-1 font-mono text-sm text-brand">{slugPreview}</p>
            </div>
          </form>
        </EditorDialogPattern>
      ) : null}

      {dialog.type === "rename" && dialog.project ? (
        <EditorDialogPattern
          title="Rename Project"
          description={`Current project: ${dialog.project.name}`}
          footerActions={
            <>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                form={formId}
                disabled={!isProjectNameValid || isLoading}
              >
                Rename Project
              </Button>
            </>
          }
        >
          <form id={formId} className="space-y-4" onSubmit={handleRenameSubmit}>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-copy-secondary">
                Project name
              </span>
              <Input
                autoFocus
                className="bg-input/30 text-copy-primary caret-brand placeholder:text-copy-muted"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
                placeholder="Project name"
              />
            </label>
            <div className="rounded-xl border border-surface-border bg-subtle px-3 py-2">
              <p className="text-xs font-medium uppercase text-copy-muted">
                Slug preview
              </p>
              <p className="mt-1 font-mono text-sm text-brand">{slugPreview}</p>
            </div>
          </form>
        </EditorDialogPattern>
      ) : null}

      {dialog.type === "delete" && dialog.project ? (
        <EditorDialogPattern
          title="Delete Project"
          description={`This will remove ${dialog.project.name} from the mock project list.`}
          footerActions={
            <>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={isLoading}
                onClick={submitDelete}
              >
                Delete Project
              </Button>
            </>
          }
        >
          <div className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-destructive">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <p>
              This destructive action only affects local mock data for this
              screen.
            </p>
          </div>
        </EditorDialogPattern>
      ) : null}
    </Dialog>
  );
}
