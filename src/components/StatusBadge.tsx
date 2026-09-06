const STYLES: Record<string, string> = {
  confirmed: "text-status-confirmed-text bg-status-confirmed-bg border-status-confirmed-border",
  completed: "text-status-confirmed-text bg-status-confirmed-bg border-status-confirmed-border",
  paid: "text-status-confirmed-text bg-status-confirmed-bg border-status-confirmed-border",
  delivered: "text-status-confirmed-text bg-status-confirmed-bg border-status-confirmed-border",
  read: "text-status-confirmed-text bg-status-confirmed-bg border-status-confirmed-border",
  available: "text-status-confirmed-text bg-status-confirmed-bg border-status-confirmed-border",

  waiting: "text-status-waiting-text bg-status-waiting-bg border-status-waiting-border",
  pending: "text-status-waiting-text bg-status-waiting-bg border-status-waiting-border",
  sent: "text-status-waiting-text bg-status-waiting-bg border-status-waiting-border",

  booked: "text-status-booked-text bg-status-booked-bg border-status-booked-border",

  "in-consultation": "text-status-consult-text bg-status-consult-bg border-status-consult-border",
  "in-consult": "text-status-consult-text bg-status-consult-bg border-status-consult-border",

  cancelled: "text-status-cancelled-text bg-status-cancelled-bg border-status-cancelled-border",
  "no-show": "text-status-cancelled-text bg-status-cancelled-bg border-status-cancelled-border",
  overdue: "text-status-cancelled-text bg-status-cancelled-bg border-status-cancelled-border",
  failed: "text-status-cancelled-text bg-status-cancelled-bg border-status-cancelled-border",
  "off-duty": "text-status-cancelled-text bg-status-cancelled-bg border-status-cancelled-border",
};

const DOT: Record<string, string> = {
  confirmed: "bg-emerald-500",
  completed: "bg-emerald-500",
  paid: "bg-emerald-500",
  delivered: "bg-emerald-500",
  read: "bg-emerald-500",
  available: "bg-emerald-500",
  waiting: "bg-amber-500",
  pending: "bg-amber-500",
  sent: "bg-amber-500",
  booked: "bg-sky-500",
  "in-consultation": "bg-violet-500",
  "in-consult": "bg-violet-500",
  cancelled: "bg-rose-500",
  "no-show": "bg-rose-500",
  overdue: "bg-rose-500",
  failed: "bg-rose-500",
  "off-duty": "bg-rose-500",
};

function labelize(status: string) {
  return status
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const style = STYLES[status] ?? "text-on-surface-variant bg-surface-container border-outline-variant";
  const dot = DOT[status] ?? "bg-outline";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-label-sm text-[11px] font-semibold ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label ?? labelize(status)}
    </span>
  );
}
