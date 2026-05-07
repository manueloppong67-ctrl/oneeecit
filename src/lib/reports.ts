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
  return report;
}

export function updateReport(id: string, patch: Partial<Report>) {
  const all = getReports().map((r) => (r.id === id ? { ...r, ...patch } : r));
  saveReports(all);
}

export function deleteReport(id: string) {
  saveReports(getReports().filter((r) => r.id !== id));
}
