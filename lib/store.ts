import { promises as fs } from "fs";
import path from "path";
import { TEAM_CAPACITY } from "@/lib/projects";

export type Member = {
  name: string;
  joinedAt: string;
};

export type Roster = Record<string, Member[]>;

const KV_CONFIGURED = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

const STORE_KEY = "workshop:project-roster";
const LOCAL_FILE = path.join(process.cwd(), ".data", "roster.json");

async function readLocal(): Promise<Roster> {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf-8");
    return JSON.parse(raw) as Roster;
  } catch {
    return {};
  }
}

async function writeLocal(roster: Roster): Promise<void> {
  await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(roster, null, 2), "utf-8");
}

export async function getRoster(): Promise<Roster> {
  if (KV_CONFIGURED) {
    const { kv } = await import("@vercel/kv");
    const roster = await kv.get<Roster>(STORE_KEY);
    return roster ?? {};
  }
  return readLocal();
}

async function saveRoster(roster: Roster): Promise<void> {
  if (KV_CONFIGURED) {
    const { kv } = await import("@vercel/kv");
    await kv.set(STORE_KEY, roster);
    return;
  }
  await writeLocal(roster);
}

export async function joinProject(
  projectId: string,
  name: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const roster = await getRoster();
  const conflict = validateJoin(roster, projectId, name);
  if (conflict) return { ok: false, error: conflict };

  const members = roster[projectId] ?? [];
  roster[projectId] = [...members, { name, joinedAt: new Date().toISOString() }];
  await saveRoster(roster);
  return { ok: true };
}

export async function leaveProject(
  projectId: string,
  name: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const roster = await getRoster();
  const members = roster[projectId] ?? [];
  const normalized = name.trim().toLowerCase();
  const nextMembers = members.filter((m) => m.name.trim().toLowerCase() !== normalized);

  if (nextMembers.length === members.length) {
    return { ok: false, error: "That name isn't on this project's team." };
  }

  roster[projectId] = nextMembers;
  await saveRoster(roster);
  return { ok: true };
}

function validateJoin(roster: Roster, projectId: string, name: string): string | null {
  const members = roster[projectId] ?? [];
  if (members.length >= TEAM_CAPACITY) {
    return "This project's team is already full (5/5).";
  }
  const normalized = name.trim().toLowerCase();
  if (members.some((m) => m.name.trim().toLowerCase() === normalized)) {
    return "You've already joined this project.";
  }
  for (const [otherId, otherMembers] of Object.entries(roster)) {
    if (otherId === projectId) continue;
    if (otherMembers.some((m) => m.name.trim().toLowerCase() === normalized)) {
      return `"${name}" has already joined a different project.`;
    }
  }
  return null;
}

export const isUsingPersistentStore = KV_CONFIGURED;
