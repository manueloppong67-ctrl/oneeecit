export type Report = {
  id: string;
  name: string;
  contact: string;
  category: string;
  message: string;
  status: "open" | "resolved";
  reply?: string;
  createdAt: number;
};

const KEY = "onecity_reports";
const SEEN_KEY = "onecity_reports_last_seen";

export function getLastSeen(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(SEEN_KEY) || 0);
}

export function setLastSeen(ts: number) {
  localStorage.setItem(SEEN_KEY, String(ts));
}

export function getReports(): Report[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveReports(reports: Report[]) {
  localStorage.setItem(KEY, JSON.stringify(reports));
}

export function addReport(r: Omit<Report, "id" | "createdAt" | "status">): Report {
  const report: Report = {
    ...r,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    status: "open",
  };
  const all = getReports();
  all.unshift(report);
  saveReports(all);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("onecity:new-report", { detail: report }));
  }
  return report;
}

export function updateReport(id: string, patch: Partial<Report>) {
  const all = getReports().map((r) => (r.id === id ? { ...r, ...patch } : r));
  saveReports(all);
}

export function deleteReport(id: string) {
  saveReports(getReports().filter((r) => r.id !== id));
}
