import logo from "@/assets/onecity-logo.jpg";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute right-10 top-1/4 h-[300px] w-[300px] rounded-full bg-accent/20 blur-[100px]" />

      <div className="relative z-10 container mx-auto grid items-center gap-12 px-6 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span className="inline-block rounded-full border border-primary/60 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-primary text-glow">
            Now Live · v1.0
          </span>
          <h1 className="mt-8 font-display text-5xl font-black uppercase leading-none tracking-tight md:text-7xl">
            <span className="text-gradient-neon text-glow">ONE</span>{" "}
            <span className="text-foreground">CITY</span>
            <br />
            <span className="text-foreground/90">RP</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground md:mx-0 md:text-xl">
            Welcome to One City RP — the best multiplayer roleplaying game. 🎮
            If you want to chill with friends, join our project now!
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
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

          <div className="mx-auto mt-12 grid max-w-md grid-cols-3 gap-4 md:mx-0">
            {[
              { v: "600+", l: "Active Players" },
              { v: "24/7", l: "Server Online" },
              { v: "∞", l: "Stories" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-lg p-3 text-center">
                <div className="text-gradient-neon font-display text-2xl font-black md:text-3xl">
                  {s.v}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto">
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/40 via-accent/30 to-primary/40 blur-3xl" />
          <div className="relative aspect-square w-72 overflow-hidden rounded-3xl border-2 border-primary/40 shadow-[var(--shadow-neon)] md:w-96">
            <img
              src={logo}
              alt="One City RP logo"
              className="h-full w-full object-cover"
              width={600}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
