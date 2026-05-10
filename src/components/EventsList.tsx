import { useEffect, useState } from "react";
import { getEvents, type GameEvent } from "@/lib/events";

export function EventsList() {
  const [events, setEvents] = useState<GameEvent[]>([]);

  useEffect(() => {
    const refresh = () => setEvents(getEvents());
    refresh();
    window.addEventListener("onecity:events-change", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("onecity:events-change", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <section id="events" className="relative z-10 container mx-auto px-6 py-20">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Community
        </span>
        <h2 className="mt-2 font-display text-4xl font-black uppercase md:text-5xl">
          Ongoing <span className="text-gradient-neon">Events</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Live events posted by the Modern State Rp staff team.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-4">
        {events.length === 0 ? (
          <div className="glass rounded-xl p-10 text-center text-sm text-muted-foreground">
            No events posted yet. Check back soon.
          </div>
        ) : (
          events.map((e) => (
            <article key={e.id} className="glass rounded-xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display text-xl font-bold uppercase">{e.title}</h3>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                  Live
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-widest text-accent">
                {e.startsAt}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">
                {e.description}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Posted by {e.author} · {new Date(e.createdAt).toLocaleString()}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
