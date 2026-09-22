export type MyJoin = { projectId: string; name: string };

const KEY = "workshop:my-joins";

export function getMyJoins(): MyJoin[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function rememberMyJoin(projectId: string, name: string): void {
  try {
    const joins = getMyJoins();
    joins.push({ projectId, name });
    window.localStorage.setItem(KEY, JSON.stringify(joins));
  } catch {
    // localStorage unavailable — nothing to do, the "x" just won't show later.
  }
}

export function forgetMyJoin(projectId: string, name: string): void {
  try {
    const normalized = name.trim().toLowerCase();
    const joins = getMyJoins().filter(
      (j) => !(j.projectId === projectId && j.name.trim().toLowerCase() === normalized)
    );
    window.localStorage.setItem(KEY, JSON.stringify(joins));
  } catch {
    // localStorage unavailable — nothing to do.
  }
}

export function isMine(joins: MyJoin[], projectId: string, name: string): boolean {
  const normalized = name.trim().toLowerCase();
  return joins.some((j) => j.projectId === projectId && j.name.trim().toLowerCase() === normalized);
}
