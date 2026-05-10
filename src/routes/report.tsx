import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { SiteNav } from "@/components/SiteNav";
import { addReport } from "@/lib/reports";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Submit a Report — Modern State Rp" },
      { name: "description", content: "Report a player or issue to Modern State Rp staff." },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("Player Report");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Name and message are required.");
      return;
    }
    if (message.length > 2000) {
      setError("Message must be under 2000 characters.");
      return;
    }
    addReport({
      name: name.trim().slice(0, 100),
      contact: contact.trim().slice(0, 200),
      category,
      message: message.trim(),
    });
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SiteNav />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <main className="relative z-10 container mx-auto max-w-2xl px-6 pt-32 pb-20">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Support
          </span>
          <h1 className="mt-3 font-display text-4xl font-black uppercase md:text-5xl">
            Submit a <span className="text-gradient-neon">Report</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Tell our staff what happened. We'll review and respond as soon as we can.
          </p>
        </div>

        {submitted ? (
          <div className="glass mt-10 rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold uppercase">Report Sent ✓</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Your report has been delivered to the staff team. Thank you.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName("");
                  setContact("");
                  setMessage("");
                  setCategory("Player Report");
                  setError("");
                }}
                className="rounded-md border border-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground"
              >
                New Report
              </button>
              <Link
                to="/"
                className="rounded-md border border-border px-5 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="glass mt-10 space-y-5 rounded-2xl p-8 shadow-[var(--shadow-neon)]"
          >
            <Field label="Your Name / In-Game Name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                className="input-style"
                placeholder="John Doe"
              />
            </Field>
            <Field label="Discord / Contact (optional)">
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={200}
                className="input-style"
                placeholder="user#0000"
              />
            </Field>
            <Field label="Category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-style"
              >
                <option>Player Report</option>
                <option>Bug Report</option>
                <option>Staff Complaint</option>
                <option>Suggestion</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Describe the Issue">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2000}
                rows={6}
                className="input-style resize-none"
                placeholder="What happened? Include time, players involved, and evidence links."
              />
            </Field>

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-md bg-primary py-3 font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.02]"
            >
              Send Report
            </button>
          </form>
        )}
      </main>

      <style>{`
        .input-style {
          width: 100%;
          border-radius: 0.375rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--input) / 0.5);
          padding: 0.75rem 1rem;
          color: hsl(var(--foreground));
          outline: none;
          transition: all 0.2s;
        }
        .input-style:focus {
          border-color: hsl(var(--primary));
          box-shadow: var(--shadow-neon);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
