import heroBg from "@/assets/hero-city.jpg";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Neon cyberpunk city street at night"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <span className="inline-block rounded-full border border-primary/60 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-primary text-glow">
          Now Live · v1.0
        </span>
        <h1 className="mt-8 font-display text-6xl font-black uppercase leading-none tracking-tight md:text-8xl">
          <span className="text-gradient-neon text-glow">ONE</span>{" "}
          <span className="text-foreground">CITY</span>
          <br />
          <span className="text-foreground/90">ROLEPLAY</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Welcome to One City RP — the best multiplayer roleplaying game.
          Chill with friends, build your story, and become a legend in the city
          that never sleeps.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://www.mediafire.com/file/v5fjyonwzuo5231/ONE_CITY_Roleplay.AXIOm.version_1.apk/file"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-primary px-8 py-3 font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-105"
          >
            Download APK
          </a>
          <a
            href="https://discord.gg/YCghxeqjz"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-accent/70 px-8 py-3 font-bold uppercase tracking-wider text-accent transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-[var(--shadow-magenta)]"
          >
            Join Discord
          </a>
        </div>

        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-6">
          {[
            { v: "600+", l: "Active Players" },
            { v: "24/7", l: "Server Online" },
            { v: "∞", l: "Stories" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-lg p-4 text-center">
              <div className="text-gradient-neon font-display text-3xl font-black md:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
