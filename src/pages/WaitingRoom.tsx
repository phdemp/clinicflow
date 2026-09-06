import { useClinic } from "../state/store";
import { Avatar } from "../components/Avatar";
import { StatusBadge } from "../components/StatusBadge";
import type { QueueStatus } from "../data/types";

const COLUMNS: { status: QueueStatus; label: string; icon: string }[] = [
  { status: "waiting", label: "Waiting", icon: "schedule" },
  { status: "in-consultation", label: "In Consultation", icon: "stethoscope" },
  { status: "completed", label: "Completed", icon: "check_circle" },
];

export function WaitingRoom() {
  const { queue, getPatient, getDoctor, advanceQueueStatus } = useClinic();

  const next: Record<QueueStatus, QueueStatus | null> = {
    waiting: "in-consultation",
    "in-consultation": "completed",
    completed: null,
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-headline text-[24px] font-bold text-on-surface">
          Live Waiting Room
        </h1>
        <p className="text-[13px] text-on-surface-variant">
          {queue.filter((q) => q.status === "waiting").length} patients waiting ·{" "}
          {queue.filter((q) => q.status === "in-consultation").length} in consultation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const entries = queue.filter((q) => q.status === col.status);
          return (
            <div
              key={col.status}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/40">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {col.icon}
                </span>
                <h2 className="font-headline text-[14px] font-semibold text-on-surface">
                  {col.label}
                </h2>
                <span className="ml-auto text-[12px] font-semibold text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded-full">
                  {entries.length}
                </span>
              </div>
              <div className="flex flex-col gap-3 p-4 min-h-[120px]">
                {entries.length === 0 && (
                  <p className="text-[12px] text-outline text-center py-6">No patients</p>
                )}
                {entries.map((q) => {
                  const p = getPatient(q.patientId);
                  const d = getDoctor(q.doctorId);
                  const nextStatus = next[q.status];
                  return (
                    <div
                      key={q.id}
                      className="rounded-xl border border-outline-variant/40 p-3 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar name={p?.name ?? "?"} colorClass={p?.avatarColor} size={32} />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-on-surface truncate">
                            {p?.name}
                          </p>
                          <p className="text-[11px] text-on-surface-variant truncate">
                            {d?.name} · checked in {q.checkInTime}
                          </p>
                        </div>
                        {q.priority === "urgent" && (
                          <StatusBadge status="cancelled" label="Urgent" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-tabular text-on-surface-variant">
                          Waiting {q.waitMins} min
                        </span>
                        {nextStatus && (
                          <button
                            onClick={() => advanceQueueStatus(q.id, nextStatus)}
                            className="text-[12px] font-semibold text-primary hover:underline"
                          >
                            {nextStatus === "in-consultation"
                              ? "Start consultation →"
                              : "Mark completed →"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
