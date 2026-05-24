import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

function forbidden() {
  return Response.json({ error: "Forbidden" }, { status: 403 });
}

async function readRequestJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function getProjectNameFromBody(body: unknown) {
  if (!body || typeof body !== "object" || !("name" in body)) {
    return null;
  }

  const name = (body as { name?: unknown }).name;

  if (typeof name !== "string") {
    return null;
  }

  return name.trim() || null;
}

async function getOwnedProject(projectId: string, ownerId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { id: true, ownerId: true },
  });

  if (!project) {
    return { status: "not-found" as const };
  }

  if (project.ownerId !== ownerId) {
    return { status: "forbidden" as const };
  }

  return { status: "owned" as const };
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return unauthorized();
  }

  const { projectId } = await params;
  const ownership = await getOwnedProject(projectId, userId);

  if (ownership.status === "forbidden") {
    return forbidden();
  }

  if (ownership.status === "not-found") {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  const body = await readRequestJson(request);
  const name = getProjectNameFromBody(body);

  if (!name) {
    return Response.json({ error: "Project name is required" }, { status: 400 });
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { name },
  });

  return Response.json({ project });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth();

  if (!userId) {
    return unauthorized();
  }

  const { projectId } = await params;
  const ownership = await getOwnedProject(projectId, userId);

  if (ownership.status === "forbidden") {
    return forbidden();
  }

  if (ownership.status === "not-found") {
    return Response.json({ error: "Project not found" }, { status: 404 });
  }

  await prisma.project.delete({
    where: { id: projectId },
  });

  return Response.json({ success: true });
}
