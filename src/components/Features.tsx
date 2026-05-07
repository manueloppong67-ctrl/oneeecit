const features = [
  { icon: "🌆", title: "Open World", desc: "Explore a massive living city full of opportunities and surprises." },
  { icon: "👥", title: "600+ Players", desc: "A thriving community of dedicated roleplayers from around the world." },
  { icon: "📱", title: "Mobile Ready", desc: "Play anywhere, anytime — fully optimized Android experience." },
  { icon: "🛡️", title: "Active Staff", desc: "Fair rules and a moderation team that keeps the city safe." },
  { icon: "🎙️", title: "Voice & Chat", desc: "Connect with friends through built-in chat and Discord." },
  { icon: "⚡", title: "Constant Updates", desc: "New content, jobs, and events added regularly." },
];

export function Features() {
  return (
    <section id="features" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            Why One City
          </span>
          <h2 className="mt-4 font-display text-4xl font-black uppercase md:text-6xl">
            Built for the <span className="text-gradient-neon">streets</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From the streets to the skyline — build your character, choose your
            path, and become a legend.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group glass relative overflow-hidden rounded-xl p-8 transition-all hover:border-primary/60 hover:shadow-[var(--shadow-neon)]"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
