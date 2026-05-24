"use client";

import { Folder, Pencil, Plus, Trash2, X } from "lucide-react";

import type { EditorProject } from "@/components/editor/use-project-dialogs";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: EditorProject[];
  onCreateProject: () => void;
  onRenameProject: (project: EditorProject) => void;
  onDeleteProject: (project: EditorProject) => void;
  className?: string;
}

function EmptyProjectState({ label }: { label: string }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border bg-subtle/40 p-6 text-center">
      <p className="text-sm font-medium text-copy-secondary">{label}</p>
      <p className="mt-2 max-w-52 text-sm leading-relaxed text-copy-muted">
        Projects will appear here when they are available.
      </p>
    </div>
  );
}

interface ProjectListProps {
  projects: EditorProject[];
  emptyLabel: string;
  onRenameProject: (project: EditorProject) => void;
  onDeleteProject: (project: EditorProject) => void;
}

function ProjectList({
  projects,
  emptyLabel,
  onRenameProject,
  onDeleteProject,
}: ProjectListProps) {
  if (projects.length === 0) {
    return <EmptyProjectState label={emptyLabel} />;
  }

  return (
    <div className="space-y-2">
      {projects.map((project) => {
        const canManageProject = project.ownership === "owned";

        return (
          <div
            key={project.id}
            className="group flex min-h-14 items-center gap-3 rounded-xl border border-surface-border bg-subtle/40 px-3 py-2"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
              <Folder className="h-4 w-4" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-copy-primary">
                {project.name}
              </p>
              <p className="truncate font-mono text-xs text-copy-muted">
                {project.slug}
              </p>
            </div>
            {canManageProject ? (
              <div className="flex shrink-0 items-center gap-1 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Rename ${project.name}`}
                  onClick={() => onRenameProject(project)}
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Delete ${project.name}`}
                  onClick={() => onDeleteProject(project)}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
  className,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter(
    (project) => project.ownership === "owned"
  );
  const sharedProjects = projects.filter(
    (project) => project.ownership === "shared"
  );

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close project sidebar"
          className="fixed inset-0 z-30 bg-base/75 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      ) : null}
      <aside
        aria-hidden={!isOpen}
        className={cn(
          "fixed bottom-4 left-0 top-16 z-40 flex w-80 flex-col rounded-2xl border border-surface-border bg-surface shadow-2xl transition-transform duration-200 ease-out",
          isOpen ? "translate-x-4" : "-translate-x-full",
          className
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border px-4">
          <h2 className="text-base font-semibold text-copy-primary">Projects</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Close project sidebar"
            onClick={onClose}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <Tabs defaultValue="my-projects" className="min-h-0 flex-1 p-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
          <TabsContent value="my-projects" className="mt-4">
            <ProjectList
              projects={ownedProjects}
              emptyLabel="No projects yet"
              onRenameProject={onRenameProject}
              onDeleteProject={onDeleteProject}
            />
          </TabsContent>
          <TabsContent value="shared" className="mt-4">
            <ProjectList
              projects={sharedProjects}
              emptyLabel="No shared projects yet"
              onRenameProject={onRenameProject}
              onDeleteProject={onDeleteProject}
            />
          </TabsContent>
        </Tabs>

        <div className="shrink-0 border-t border-surface-border p-4">
          <Button type="button" className="w-full" onClick={onCreateProject}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
