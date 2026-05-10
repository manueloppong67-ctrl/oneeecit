export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto grid items-center gap-16 px-6 md:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            The Story
          </span>
          <h2 className="mt-4 font-display text-4xl font-black uppercase leading-tight md:text-5xl">
            A Multiplayer
            <br />
            <span className="text-gradient-neon">Open-World RP</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Modern State Rp is a living, breathing multiplayer open-world roleplay
            game where every player writes their own destiny. From the streets
            to the skyline — build your character, choose your path, and become
            a legend in the city that never sleeps.
          </p>
          <p className="mt-4 text-sm uppercase tracking-widest text-primary">
            Founded by ingod
          </p>
        </div>

        <div className="relative">
          <div className="glass relative aspect-square rounded-2xl p-10">
            <div className="absolute inset-0 rounded-2xl bg-grid opacity-30" />
            <div className="relative flex h-full flex-col items-center justify-center text-center">
              <div className="font-display text-[8rem] font-black leading-none text-gradient-neon text-glow">
                1
              </div>
              <div className="mt-4 font-display text-2xl font-bold uppercase tracking-[0.4em] text-foreground">
                Modern State
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
                Endless Possibilities
              </div>
            </div>
            <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
