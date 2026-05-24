"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectDialogs } from "@/components/editor/project-dialogs";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { useProjectDialogs } from "@/components/editor/use-project-dialogs";

interface EditorShellProps {
  children: ReactNode;
}

interface EditorProjectActionsContextValue {
  openCreateDialog: () => void;
}

const EditorProjectActionsContext =
  createContext<EditorProjectActionsContextValue | null>(null);

export function useEditorProjectActions() {
  const context = useContext(EditorProjectActionsContext);

  if (!context) {
    throw new Error(
      "useEditorProjectActions must be used within an EditorShell."
    );
  }

  return context;
}

export function EditorShell({ children }: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const projectDialogs = useProjectDialogs();

  return (
    <div className="flex min-h-screen flex-col bg-base text-copy-primary">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((current) => !current)}
        centerContent="Ghost AI"
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projectDialogs.projects}
        onCreateProject={projectDialogs.openCreateDialog}
        onRenameProject={projectDialogs.openRenameDialog}
        onDeleteProject={projectDialogs.openDeleteDialog}
      />
      <EditorProjectActionsContext.Provider
        value={{ openCreateDialog: projectDialogs.openCreateDialog }}
      >
        <main className="min-h-0 flex-1">{children}</main>
      </EditorProjectActionsContext.Provider>
      <ProjectDialogs manager={projectDialogs} />
    </div>
  );
}
