import { useState } from "react";

type Rule = { code: string; text: string; punishment: string };
type Section = { emoji: string; title: string; rules: Rule[] };

const SECTIONS: Section[] = [
  {
    emoji: "3️⃣",
    title: "Nicknames, Avatars & Profiles",
    rules: [
      { code: "OC.3.1", text: "Admins may require you to change your nickname, avatar, or banner if inappropriate.", punishment: "Forced change / warning" },
      { code: "OC.3.2", text: "No staff-impersonation names (Admin, Mod, Owner, Bot, etc.).", punishment: "Warning / force change" },
      { code: "OC.3.3", text: "No offensive, sexual, religious, political, or promotional names/images.", punishment: "Warning / force change" },
      { code: "OC.3.4", text: "No unreadable or spam-style nicknames (random/repeating characters).", punishment: "Warning / force change" },
    ],
  },
  {
    emoji: "4️⃣",
    title: "Voice Channel Rules",
    rules: [
      { code: "OC.4.1", text: "Respect others in voice chat. No yelling, spam, or interruptions.", punishment: "Voice mute / timeout" },
      { code: "OC.4.2", text: "No music or soundboards except in designated music channels.", punishment: "Kick / mute" },
      { code: "OC.4.3", text: "Use push-to-talk or noise suppression if you have background noise.", punishment: "Reminder / mute" },
    ],
  },
  {
    emoji: "5️⃣",
    title: "Staff & Support Interaction",
    rules: [
      { code: "OC.5.1", text: "Respect all staff and their decisions.", punishment: "Warning / escalation" },
      { code: "OC.5.2", text: "Do not argue staff decisions in public. Use support tickets instead.", punishment: "Warning / mute" },
      { code: "OC.5.3", text: "False reports or ticket abuse is not allowed.", punishment: "Loss of support access / ban" },
      { code: "OC.5.4", text: "Admins may act outside written rules to maintain order and safety.", punishment: "Staff discretion" },
    ],
  },
];

export function Rules() {
  const [open, setOpen] = useState(false);

  return (
    <section id="rules" className="relative py-24">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Community
          </span>
          <h2 className="mt-3 font-display text-4xl font-black uppercase md:text-5xl">
            Game <span className="text-gradient-neon">Rules</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Click below to read the official Modern State Rp rules.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <button
            onClick={() => setOpen((v) => !v)}
            className="glass flex w-full items-center justify-between rounded-2xl p-6 text-left transition-all hover:shadow-[var(--shadow-neon)]"
            aria-expanded={open}
          >
            <span className="font-display text-lg font-bold uppercase tracking-wider">
              📜 Game Rules
            </span>
            <span
              className={`text-2xl text-primary transition-transform ${
                open ? "rotate-180" : ""
              }`}
            >
              ⌄
            </span>
          </button>

          {open && (
            <div className="mt-6 space-y-6">
              {SECTIONS.map((s) => (
                <div key={s.title} className="glass rounded-2xl p-6">
                  <h3 className="font-display text-xl font-bold uppercase">
                    {s.emoji} {s.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {s.rules.map((r) => (
                      <li
                        key={r.code}
                        className="rounded-md border border-border/60 bg-input/30 p-3"
                      >
                        <p className="text-sm">
                          <span className="font-mono font-bold text-primary">
                            {r.code}
                          </span>{" "}
                          <span className="text-foreground/90">{r.text}</span>
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-wider text-destructive">
                          [Punishment: {r.punishment}]
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="glass rounded-2xl border border-accent/40 p-6">
                <h3 className="font-display text-lg font-bold uppercase text-accent">
                  ⚠️ Final Note
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  All actions are logged and reviewed by the moderation team.
                  Appeals must be submitted through the official ticket system.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
