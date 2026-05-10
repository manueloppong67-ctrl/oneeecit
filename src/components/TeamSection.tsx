const TEAM = [
  {
    name: "Prince",
    role: "Founder",
    initials: "PR",
    bio: "Creator and lead of Modern State Rp. Sets the vision and oversees the entire project.",
  },
  {
    name: "Manuel",
    role: "Co-Founder",
    initials: "MA",
    bio: "Co-founder of Modern State Rp. Drives growth, partnerships, and community direction.",
  },
  {
    name: "Edo",
    role: "Project Curator",
    initials: "ED",
    bio: "Curates the project — operations, content quality, and day-to-day coordination.",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="relative py-24">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Authorized
          </span>
          <h2 className="mt-3 font-display text-4xl font-black uppercase md:text-5xl">
            Admin <span className="text-gradient-neon">Team</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {TEAM.map((m) => (
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
      </div>
    </section>
  );
}
