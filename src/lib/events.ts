export type GameEvent = {
  id: string;
  title: string;
  description: string;
  startsAt: string; // ISO or freeform
  author: string;
  createdAt: number;
};

const KEY = "onecity_events";

export function getEvents(): GameEvent[] {
  if (typeof window === "undefined") return [];
  try {
    return (JSON.parse(localStorage.getItem(KEY) || "[]") as GameEvent[]).sort(
      (a, b) => b.createdAt - a.createdAt,
    );
  } catch {
    return [];
  }
}

function save(events: GameEvent[]) {
  localStorage.setItem(KEY, JSON.stringify(events));
  window.dispatchEvent(new CustomEvent("onecity:events-change"));
}

export function addEvent(input: Omit<GameEvent, "id" | "createdAt">): GameEvent {
  const e: GameEvent = { ...input, id: crypto.randomUUID(), createdAt: Date.now() };
  const all = getEvents();
  all.unshift(e);
  save(all);
  return e;
}

export function deleteEvent(id: string) {
  save(getEvents().filter((e) => e.id !== id));
}
