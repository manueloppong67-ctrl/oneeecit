export function Download() {
  return (
    <section id="download" className="relative py-32">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href="https://www.mediafire.com/file/v5fjyonwzuo5231/ONE_CITY_Roleplay.AXIOm.version_1.apk/file"
            target="_blank"
            rel="noreferrer"
            className="group glass relative overflow-hidden rounded-2xl p-10 transition-all hover:border-primary/70 hover:shadow-[var(--shadow-neon)]"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                Step 1
              </div>
              <h3 className="mt-3 font-display text-3xl font-black uppercase">
                Download the Game
              </h3>
              <p className="mt-3 text-muted-foreground">
                ONE_CITY_Roleplay.AXIOm v1.0 · APK
              </p>
              <div className="mt-8 inline-flex items-center gap-2 font-bold uppercase tracking-wider text-primary transition-transform group-hover:translate-x-1">
                Get APK <span aria-hidden>→</span>
              </div>
            </div>
          </a>

          <a
            href="https://discord.gg/YCghxeqjz"
            target="_blank"
            rel="noreferrer"
            className="group glass relative overflow-hidden rounded-2xl p-10 transition-all hover:border-accent/70 hover:shadow-[var(--shadow-magenta)]"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative">
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Step 2
              </div>
              <h3 className="mt-3 font-display text-3xl font-black uppercase">
                Join Our Discord
              </h3>
              <p className="mt-3 text-muted-foreground">
                Chat, events, support and more.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 font-bold uppercase tracking-wider text-accent transition-transform group-hover:translate-x-1">
                Join Server <span aria-hidden>→</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
