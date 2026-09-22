import { NextRequest, NextResponse } from "next/server";
import { joinProject, leaveProject, getRoster } from "@/lib/store";
import { projects } from "@/lib/projects";

export async function GET() {
  const roster = await getRoster();
  return NextResponse.json({ roster });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const projectId = typeof body?.projectId === "string" ? body.projectId : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!projectId || !projects.some((p) => p.id === projectId)) {
    return NextResponse.json({ ok: false, error: "Unknown project." }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ ok: false, error: "Your name is required." }, { status: 400 });
  }

  const result = await joinProject(projectId, name);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const projectId = typeof body?.projectId === "string" ? body.projectId : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!projectId || !projects.some((p) => p.id === projectId)) {
    return NextResponse.json({ ok: false, error: "Unknown project." }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ ok: false, error: "Name is required." }, { status: 400 });
  }

  const result = await leaveProject(projectId, name);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}
