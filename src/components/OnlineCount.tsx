import { useEffect, useState } from "react";

const DISCORD_GUILD_ID = "1411833055563350038";

type WidgetData = {
  presence_count?: number;
  instant_invite?: string | null;
  name?: string;
};

export function OnlineCount() {
  const [data, setData] = useState<WidgetData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    const fetchIt = async () => {
      try {
        const res = await fetch(
          `https://discord.com/api/guilds/${DISCORD_GUILD_ID}/widget.json`,
        );
        if (!res.ok) throw new Error("not ok");
        const json = (await res.json()) as WidgetData;
        if (alive) {
          setData(json);
          setError(false);
        }
      } catch {
        if (alive) setError(true);
      }
    };
    fetchIt();
    const t = setInterval(fetchIt, 30000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  return (
    <section id="online" className="relative z-10 container mx-auto px-6 py-16">
      <div className="glass mx-auto max-w-2xl rounded-2xl p-8 text-center shadow-[var(--shadow-neon)]">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Live Server
        </span>
        <h2 className="mt-2 font-display text-3xl font-black uppercase md:text-4xl">
          Players <span className="text-gradient-neon">Online Now</span>
        </h2>

        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
          </span>
          <p className="font-display text-6xl font-black text-gradient-neon">
            {error ? "—" : data ? data.presence_count ?? 0 : "…"}
          </p>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">
          {error
            ? "Live count unavailable. Make sure the Discord widget is enabled."
            : `Connected via ${data?.name ?? "Discord"} — updates every 30s.`}
        </p>

        {data?.instant_invite && (
          <a
            href={data.instant_invite}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.03]"
          >
            Join Discord
          </a>
        )}
      </div>
    </section>
  );
}
