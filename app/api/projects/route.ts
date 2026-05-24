import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const DEFAULT_PROJECT_NAME = "Untitled Project";

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

async function readRequestJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function getProjectNameFromBody(body: unknown, fallback: string) {
  if (!body || typeof body !== "object" || !("name" in body)) {
    return fallback;
  }

  const name = (body as { name?: unknown }).name;

  if (typeof name !== "string") {
    return fallback;
  }

  return name.trim() || fallback;
}

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return unauthorized();
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ projects });
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return unauthorized();
  }

  const body = await readRequestJson(request);
  const name = getProjectNameFromBody(body, DEFAULT_PROJECT_NAME);

  const project = await prisma.$transaction(async (tx) => {
    const createdProject = await tx.project.create({
      data: {
        ownerId: userId,
        name,
        canvasJsonPath: "",
      },
    });

    return tx.project.update({
      where: { id: createdProject.id },
      data: {
        canvasJsonPath: `projects/${createdProject.id}/canvas.json`,
      },
    });
  });

  return Response.json({ project }, { status: 201 });
}
