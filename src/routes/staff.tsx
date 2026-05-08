import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteNav } from "@/components/SiteNav";
import { getReports, updateReport, deleteReport, type Report } from "@/lib/reports";
import { getEvents, addEvent, deleteEvent, type GameEvent } from "@/lib/events";
import { getUsers, type User } from "@/lib/users";

const STAFF_PASSWORD = "onecity2025";
const STORAGE_KEY = "onecity_staff_auth";

const STAFF_TEAM = [
  {
    name: "In God",
    role: "Founder",
    initials: "IG",
    bio: "Creator and lead of One City RP. Sets the vision and oversees the entire project.",
  },
  {
    name: "Mr Breeder",
    role: "Assistant Project Curator",
    initials: "MB",
    bio: "Supports daily operations, community management, and project direction.",
  },
];

export const Route = createFileRoute("/staff")({
  head: () => ({
    meta: [
      { title: "Staff Panel — One City RP" },
      { name: "description", content: "Restricted staff access for One City RP." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StaffPage,
});

function StaffPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === STAFF_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Access denied.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SiteNav />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />

      <main className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {!authed ? (
          <div className="mx-auto max-w-md">
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Restricted
              </span>
              <h1 className="mt-3 font-display text-4xl font-black uppercase md:text-5xl">
                Staff <span className="text-gradient-neon">Panel</span>
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Authorized personnel only. Enter the staff password to continue.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="glass mt-10 rounded-2xl p-8 shadow-[var(--shadow-neon)]"
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Staff Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder="••••••••"
                className="mt-3 w-full rounded-md border border-border bg-input/50 px-4 py-3 font-mono text-foreground outline-none transition-all focus:border-primary focus:shadow-[var(--shadow-neon)]"
              />
              {error && <p className="mt-3 text-sm font-medium text-destructive">{error}</p>}
              <button
                type="submit"
                className="mt-6 w-full rounded-md bg-primary py-3 font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.02]"
              >
                Unlock
              </button>
              <Link
                to="/"
                className="mt-4 block text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
              >
                ← Back to home
              </Link>
            </form>
          </div>
        ) : (
          <AuthedDashboard onLogout={logout} />
        )}
      </main>
    </div>
  );
}

function AuthedDashboard({ onLogout }: { onLogout: () => void }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tab, setTab] = useState<"reports" | "events" | "users" | "team">("reports");

  const refresh = () => {
    setReports(getReports());
    setEvents(getEvents());
    setUsers(getUsers());
  };
  useEffect(() => {
    refresh();
    const onNew = () => refresh();
    window.addEventListener("onecity:new-report", onNew);
    window.addEventListener("onecity:events-change", onNew);
    window.addEventListener("onecity:auth-change", onNew);
    window.addEventListener("storage", onNew);
    return () => {
      window.removeEventListener("onecity:new-report", onNew);
      window.removeEventListener("onecity:events-change", onNew);
      window.removeEventListener("onecity:auth-change", onNew);
      window.removeEventListener("storage", onNew);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#report-")) {
      setTab("reports");
      setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [reports]);

  const handleReply = (id: string, reply: string) => { updateReport(id, { reply }); refresh(); };
  const handleResolve = (id: string) => { updateReport(id, { status: "resolved" }); refresh(); };
  const handleReopen = (id: string) => { updateReport(id, { status: "open" }); refresh(); };
  const handleDelete = (id: string) => {
    if (confirm("Delete this report?")) { deleteReport(id); refresh(); }
  };

  const open = reports.filter((r) => r.status === "open").length;

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "reports", label: `Reports (${open})` },
    { key: "events", label: `Events (${events.length})` },
    { key: "users", label: `Users (${users.length})` },
    { key: "team", label: "Admin Team" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Authorized</span>
          <h1 className="mt-2 font-display text-4xl font-black uppercase md:text-5xl">
            Staff <span className="text-gradient-neon">Dashboard</span>
          </h1>
        </div>
        <button
          onClick={onLogout}
          className="rounded-md border border-destructive/60 px-5 py-2 text-xs font-bold uppercase tracking-wider text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
        >
          Lock Panel
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
              tab === t.key
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "reports" && (
        <div className="mt-6 space-y-4">
          {reports.length === 0 ? (
            <div className="glass rounded-xl p-10 text-center text-sm text-muted-foreground">
              No reports yet. Players can submit one at{" "}
              <Link to="/report" className="text-primary hover:underline">/report</Link>.
            </div>
          ) : (
            reports.map((r) => (
              <ReportCard
                key={r.id}
                report={r}
                onReply={handleReply}
                onResolve={handleResolve}
                onReopen={handleReopen}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}

      {tab === "events" && (
        <EventsManager events={events} onChange={refresh} />
      )}

      {tab === "users" && (
        <div className="mt-6 glass rounded-xl overflow-hidden">
          {users.length === 0 ? (
            <p className="p-10 text-center text-sm text-muted-foreground">No registered users yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted/30 text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Registered</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-t border-border">
                    <td className="px-4 py-3 font-bold">{u.username}</td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(u.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === "team" && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {STAFF_TEAM.map((m) => (
            <div key={m.name} className="glass rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-lg font-black text-primary-foreground shadow-[var(--shadow-neon)]">
                  {m.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase">{m.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-accent">{m.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{m.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventsManager({ events, onChange }: { events: GameEvent[]; onChange: () => void }) {
  const [title, setTitle] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("Staff");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    addEvent({ title: title.trim(), startsAt: startsAt.trim() || "Ongoing", description: description.trim(), author: author.trim() || "Staff" });
    setTitle(""); setStartsAt(""); setDescription("");
    onChange();
  };

  return (
    <div className="mt-6 space-y-6">
      <form onSubmit={submit} className="glass rounded-xl p-6 space-y-3">
        <h3 className="font-display text-lg font-bold uppercase">Post New Event</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" className="w-full rounded-md border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary" required />
        <input value={startsAt} onChange={(e) => setStartsAt(e.target.value)} placeholder="When (e.g. Tonight 8 PM EST)" className="w-full rounded-md border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the event..." rows={3} className="w-full rounded-md border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary" required />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Posted by" className="w-full rounded-md border border-border bg-input/50 px-3 py-2 text-sm outline-none focus:border-primary" />
        <button type="submit" className="rounded-md bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:scale-[1.02]">Publish Event</button>
      </form>

      <div className="space-y-3">
        {events.length === 0 ? (
          <p className="glass rounded-xl p-8 text-center text-sm text-muted-foreground">No events posted yet.</p>
        ) : (
          events.map((e) => (
            <div key={e.id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-display text-base font-bold uppercase">{e.title}</h4>
                  <p className="text-xs uppercase tracking-widest text-accent">{e.startsAt}</p>
                </div>
                <button
                  onClick={() => { if (confirm("Delete event?")) { deleteEvent(e.id); onChange(); } }}
                  className="rounded-md border border-destructive/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >Delete</button>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-foreground/90">{e.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">By {e.author} · {new Date(e.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ReportCard({
  report,
  onReply,
  onResolve,
  onReopen,
  onDelete,
}: {
  report: Report;
  onReply: (id: string, reply: string) => void;
  onResolve: (id: string) => void;
  onReopen: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [reply, setReply] = useState(report.reply || "");

  return (
    <div id={`report-${report.id}`} className="glass scroll-mt-32 rounded-xl p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-base font-bold uppercase">{report.name}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                report.status === "open"
                  ? "bg-destructive/20 text-destructive"
                  : "bg-primary/20 text-primary"
              }`}
            >
              {report.status}
            </span>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              {report.category}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {report.contact && <>Contact: {report.contact} · </>}
            {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm text-foreground/90">{report.message}</p>

      <div className="mt-4">
        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Staff Reply
        </label>
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={2}
          className="mt-2 w-full rounded-md border border-border bg-input/50 px-3 py-2 text-sm outline-none transition-all focus:border-primary"
          placeholder="Write a reply to this report..."
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => onReply(report.id, reply)}
            className="rounded-md bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:scale-[1.02]"
          >
            Save Reply
          </button>
          {report.status === "open" ? (
            <button
              onClick={() => onResolve(report.id)}
              className="rounded-md border border-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Mark Resolved
            </button>
          ) : (
            <button
              onClick={() => onReopen(report.id)}
              className="rounded-md border border-border px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Reopen
            </button>
          )}
          <button
            onClick={() => onDelete(report.id)}
            className="rounded-md border border-destructive/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
