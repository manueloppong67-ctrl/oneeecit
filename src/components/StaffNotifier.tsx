import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { getReports, getLastSeen, setLastSeen, type Report } from "@/lib/reports";

const AUTH_KEY = "onecity_staff_auth";

function isStaff() {
  return typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1";
}

function notify(r: Report) {
  toast(`New report: ${r.category}`, {
    description: `From ${r.name} — ${r.message.slice(0, 80)}${r.message.length > 80 ? "…" : ""}`,
    action: {
      label: "Open",
      onClick: () => {
        window.location.href = `/staff#report-${r.id}`;
      },
    },
    duration: 10000,
  });
}

export function StaffNotifier() {
  const seenRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isStaff()) return;

    // Backfill: announce reports newer than last seen on mount
    const lastSeen = getLastSeen();
    const reports = getReports();
    const fresh = reports.filter((r) => r.createdAt > lastSeen);
    if (fresh.length > 0) {
      if (fresh.length === 1) notify(fresh[0]);
      else
        toast(`${fresh.length} new reports`, {
          description: "Tap to review pending reports.",
          action: { label: "Open", onClick: () => (window.location.href = "/staff") },
          duration: 10000,
        });
      fresh.forEach((r) => seenRef.current.add(r.id));
    }
    setLastSeen(Date.now());

    const onNew = (e: Event) => {
      if (!isStaff()) return;
      const r = (e as CustomEvent<Report>).detail;
      if (!r || seenRef.current.has(r.id)) return;
      seenRef.current.add(r.id);
      notify(r);
      setLastSeen(Date.now());
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key !== "onecity_reports" || !isStaff()) return;
      const prev: Report[] = e.oldValue ? JSON.parse(e.oldValue) : [];
      const next: Report[] = e.newValue ? JSON.parse(e.newValue) : [];
      const prevIds = new Set(prev.map((r) => r.id));
      next
        .filter((r) => !prevIds.has(r.id) && !seenRef.current.has(r.id))
        .forEach((r) => {
          seenRef.current.add(r.id);
          notify(r);
        });
      setLastSeen(Date.now());
    };

    window.addEventListener("onecity:new-report", onNew);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("onecity:new-report", onNew);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
