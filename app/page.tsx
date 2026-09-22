"use client";

import { useEffect, useState } from "react";
import { projects, TEAM_CAPACITY } from "@/lib/projects";
import type { Roster } from "@/lib/store";
import { getMyJoins, rememberMyJoin, forgetMyJoin, isMine, type MyJoin } from "@/lib/myJoins";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function ProjectsPage() {
  const [roster, setRoster] = useState<Roster>({});
  const [loading, setLoading] = useState(true);
  const [myJoins, setMyJoins] = useState<MyJoin[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const [joinProjectId, setJoinProjectId] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinSubmitting, setJoinSubmitting] = useState(false);
  const [joinMessage, setJoinMessage] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );

  async function load() {
    setLoading(true);
    const res = await fetch("/api/teams", { cache: "no-store" });
    const data = await res.json();
    setRoster(data.roster ?? {});
    setLoading(false);
  }

  useEffect(() => {
    load();
    setMyJoins(getMyJoins());
  }, []);

  const openProjects = projects.filter((p) => (roster[p.id]?.length ?? 0) < TEAM_CAPACITY);

  useEffect(() => {
    if (!joinProjectId && openProjects.length) {
      setJoinProjectId(openProjects[0].id);
    }
    if (joinProjectId && !openProjects.some((p) => p.id === joinProjectId) && openProjects.length) {
      setJoinProjectId(openProjects[0].id);
    }
  }, [roster]); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setJoinMessage(null);
    const name = joinName.trim();
    if (!name) {
      setJoinMessage({ type: "error", text: "Please enter your name." });
      return;
    }
    if (!joinProjectId) {
      setJoinMessage({ type: "error", text: "Please pick a project." });
      return;
    }
    setJoinSubmitting(true);
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: joinProjectId, name }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setJoinMessage({ type: "error", text: data.error ?? "Could not save your pick." });
      } else {
        rememberMyJoin(joinProjectId, name);
        setMyJoins(getMyJoins());
        setJoinMessage({ type: "success", text: "You're in! Good luck." });
        setJoinName("");
        await load();
      }
    } catch {
      setJoinMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setJoinSubmitting(false);
    }
  }

  async function handleLeave(projectId: string, name: string) {
    const confirmed = window.confirm(`Remove ${name} from this project?`);
    if (!confirmed) return;

    try {
      const res = await fetch("/api/teams", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, name }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        forgetMyJoin(projectId, name);
        setMyJoins(getMyJoins());
        await load();
      }
    } catch {
      // silently ignore — the roster just won't update
    }
  }

  return (
    <>
      <h1 className="page-title">Workshop Projects</h1>
      <p className="page-subtitle">
        Six agentic AI systems to build during the workshop. Join any one project based on your
        interest. Each team fills up at {TEAM_CAPACITY} members, first come first served.
      </p>

      <div className="join-panel">
        <h2 className="section-title" style={{ margin: "0 0 12px" }}>
          Join a project
        </h2>
        {openProjects.length === 0 ? (
          <p style={{ color: "var(--text-muted)", margin: 0 }}>
            All project teams are full.
          </p>
        ) : (
          <form className="claim-form" onSubmit={handleJoin}>
            <label>
              Project
              <select value={joinProjectId} onChange={(e) => setJoinProjectId(e.target.value)}>
                {openProjects.map((p) => {
                  const count = roster[p.id]?.length ?? 0;
                  return (
                    <option key={p.id} value={p.id}>
                      {p.name} ({count}/{TEAM_CAPACITY})
                    </option>
                  );
                })}
              </select>
            </label>
            <label>
              Your name
              <input
                type="text"
                value={joinName}
                onChange={(e) => setJoinName(e.target.value)}
                placeholder="e.g. Vidhya M"
              />
            </label>
            {joinMessage && (
              <div className={`form-message ${joinMessage.type}`}>{joinMessage.text}</div>
            )}
            <button type="submit" disabled={joinSubmitting}>
              {joinSubmitting ? "Joining…" : "Join this project"}
            </button>
          </form>
        )}
      </div>

      <div className="project-grid">
        {projects.map((project) => {
          const members = roster[project.id] ?? [];
          const isFull = members.length >= TEAM_CAPACITY;
          const isExpanded = !!expanded[project.id];

          return (
            <div className="card" key={project.id} style={{ "--dom": project.color } as React.CSSProperties}>
              <div className="card-strip">
                <span className="badge">{project.domain}</span>
                <div className="dots" aria-hidden="true">
                  {Array.from({ length: TEAM_CAPACITY }, (_, i) => (
                    <span key={i} className={`dot${i < members.length ? " filled" : ""}`} />
                  ))}
                </div>
              </div>

              <div className="card-body">
                <div className="title-row">
                  <span className="card-icon" aria-hidden="true">
                    {project.icon}
                  </span>
                  <h3>{project.name}</h3>
                </div>
                <p>{project.workflow}</p>

                {members.length > 0 ? (
                  <button
                    type="button"
                    className="card-tap-area"
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpanded((exp) => ({ ...exp, [project.id]: !exp[project.id] }))
                    }
                  >
                    <div className="card-status">
                      <span className={isFull ? "status-taken" : "status-open"}>
                        {isFull ? "Full" : "Open"} · {members.length}/{TEAM_CAPACITY}
                      </span>
                      <svg
                        className="chevron"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                    <div className="avatar-row">
                      {members.map((m) => (
                        <span key={m.name} className="avatar" title={m.name}>
                          {initials(m.name)}
                        </span>
                      ))}
                    </div>
                  </button>
                ) : (
                  <div className="card-status">
                    <span className="status-open">
                      Open · {members.length}/{TEAM_CAPACITY}
                    </span>
                  </div>
                )}

                {isExpanded && members.length > 0 && (
                  <ul className="member-list">
                    {members.map((m) => {
                      const mine = isMine(myJoins, project.id, m.name);
                      return (
                        <li key={m.name}>
                          <span>{m.name}</span>
                          {mine && (
                            <button
                              type="button"
                              className="leave-btn"
                              aria-label={`Remove ${m.name}`}
                              onClick={() => handleLeave(project.id, m.name)}
                            >
                              ×
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
