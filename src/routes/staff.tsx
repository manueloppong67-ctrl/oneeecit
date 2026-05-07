import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteNav } from "@/components/SiteNav";

const STAFF_PASSWORD = "onecity2025";
const STORAGE_KEY = "onecity_staff_auth";

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
      <div className="absolute inset-0 bg-grid opacity-20" />

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
              {error && (
                <p className="mt-3 text-sm font-medium text-destructive">{error}</p>
              )}
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
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                  Authorized
                </span>
                <h1 className="mt-2 font-display text-4xl font-black uppercase md:text-5xl">
                  Staff <span className="text-gradient-neon">Dashboard</span>
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Welcome back. Manage the city from here.
                </p>
              </div>
              <button
                onClick={logout}
                className="rounded-md border border-destructive/60 px-5 py-2 text-xs font-bold uppercase tracking-wider text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
              >
                Lock Panel
              </button>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { l: "Online Players", v: "612" },
                { l: "Active Reports", v: "3" },
                { l: "Server Uptime", v: "99.9%" },
              ].map((s) => (
                <div key={s.l} className="glass rounded-xl p-6">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {s.l}
                  </div>
                  <div className="mt-2 text-gradient-neon font-display text-3xl font-black">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { t: "Player Management", d: "View, mute, kick or ban players in real time." },
                { t: "Reports & Tickets", d: "Review open reports and resolve player disputes." },
                { t: "Server Logs", d: "Inspect chat, transactions and admin actions." },
                { t: "Announcements", d: "Push global broadcasts to everyone in the city." },
              ].map((c) => (
                <div
                  key={c.t}
                  className="glass rounded-xl p-6 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-neon)]"
                >
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide">
                    {c.t}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
                  <button className="mt-4 text-xs font-bold uppercase tracking-widest text-primary hover:text-glow">
                    Open →
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-xs text-muted-foreground">
              Note: This is a demo panel. Hook real backend logic before going live.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
