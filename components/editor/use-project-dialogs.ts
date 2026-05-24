"use client";

import { useMemo, useState } from "react";

export type ProjectOwnership = "owned" | "shared";

export interface EditorProject {
  id: string;
  name: string;
  slug: string;
  ownership: ProjectOwnership;
}

type ProjectDialogType = "create" | "rename" | "delete";

interface ProjectDialogState {
  type: ProjectDialogType | null;
  project: EditorProject | null;
}

const initialProjects: EditorProject[] = [
  {
    id: "owned-ghost-arc",
    name: "GhostArc Platform",
    slug: "ghostarc-platform",
    ownership: "owned",
  },
  {
    id: "owned-infra-map",
    name: "Infrastructure Map",
    slug: "infrastructure-map",
    ownership: "owned",
  },
  {
    id: "shared-system-review",
    name: "System Review",
    slug: "system-review",
    ownership: "shared",
  },
];

export function toProjectSlug(value: string) {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "new-project";
}

export function useProjectDialogs() {
  const [projects, setProjects] = useState<EditorProject[]>(initialProjects);
  const [dialog, setDialog] = useState<ProjectDialogState>({
    type: null,
    project: null,
  });
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slugPreview = useMemo(() => toProjectSlug(projectName), [projectName]);
  const isProjectNameValid = projectName.trim().length > 0;

  function closeDialog() {
    setDialog({ type: null, project: null });
    setProjectName("");
    setIsLoading(false);
  }

  function openCreateDialog() {
    setDialog({ type: "create", project: null });
    setProjectName("");
  }

  function openRenameDialog(project: EditorProject) {
    setDialog({ type: "rename", project });
    setProjectName(project.name);
  }

  function openDeleteDialog(project: EditorProject) {
    setDialog({ type: "delete", project });
    setProjectName(project.name);
  }

  function submitCreate() {
    const name = projectName.trim();

    if (!name) {
      return;
    }

    setIsLoading(true);
    setProjects((currentProjects) => [
      {
        id: `owned-${Date.now()}`,
        name,
        slug: toProjectSlug(name),
        ownership: "owned",
      },
      ...currentProjects,
    ]);
    closeDialog();
  }

  function submitRename() {
    const name = projectName.trim();
    const project = dialog.project;

    if (!name || !project) {
      return;
    }

    setIsLoading(true);
    setProjects((currentProjects) =>
      currentProjects.map((currentProject) =>
        currentProject.id === project.id
          ? {
              ...currentProject,
              name,
              slug: toProjectSlug(name),
            }
          : currentProject
      )
    );
    closeDialog();
  }

  function submitDelete() {
    const project = dialog.project;

    if (!project) {
      return;
    }

    setIsLoading(true);
    setProjects((currentProjects) =>
      currentProjects.filter(
        (currentProject) => currentProject.id !== project.id
      )
    );
    closeDialog();
  }

  return {
    dialog,
    projects,
    projectName,
    slugPreview,
    isLoading,
    isProjectNameValid,
    closeDialog,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    setProjectName,
    submitCreate,
    submitRename,
    submitDelete,
  };
}
