import { useMemo, useState } from "react";
import { useClinic } from "../state/store";
import { StatusBadge } from "../components/StatusBadge";
import { NewAppointmentModal } from "../components/NewAppointmentModal";
import { formatLongDate } from "../lib/date";

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

function timeToMinutes(t: string) {
  const [time, mer] = t.split(" ");
  const [h, m] = time.split(":").map(Number);
  let hour = h % 12;
  if (mer === "PM") hour += 12;
  return hour * 60 + m;
}

export function Calendar() {
  const { doctors, appointments, today, getPatient } = useClinic();
  const [showNew, setShowNew] = useState(false);
  const todays = useMemo(
    () => appointments.filter((a) => a.date === today && a.status !== "cancelled"),
    [appointments, today],
  );

  const dayStart = HOURS[0] * 60;
  const dayEnd = (HOURS[HOURS.length - 1] + 1) * 60;
  const totalMins = dayEnd - dayStart;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-headline text-[24px] font-bold text-on-surface">Calendar</h1>
          <p className="text-[13px] text-on-surface-variant">{formatLongDate(today)}</p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl transition-colors shadow-sm text-[14px] font-semibold"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Appointment
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-x-auto">
        <div
          className="grid min-w-[720px]"
          style={{ gridTemplateColumns: `64px repeat(${doctors.length}, 1fr)` }}
        >
          <div className="border-b border-r border-outline-variant/30" />
          {doctors.map((d) => (
            <div
              key={d.id}
              className="px-3 py-3 border-b border-r border-outline-variant/30 last:border-r-0 text-center"
            >
              <p className="text-[13px] font-semibold text-on-surface">{d.name}</p>
              <p className="text-[11px] text-on-surface-variant">{d.specialty}</p>
            </div>
          ))}

          <div
            className="relative border-r border-outline-variant/30"
            style={{ height: totalMins }}
          >
            {HOURS.map((h) => (
              <div
                key={h}
                className="absolute left-0 right-0 text-[11px] text-outline pr-2 text-right -translate-y-2"
                style={{ top: (h * 60 - dayStart) }}
              >
                {h % 12 === 0 ? 12 : h % 12}:00 {h < 12 ? "AM" : "PM"}
              </div>
            ))}
          </div>

          {doctors.map((d) => {
            const docAppts = todays.filter((a) => a.doctorId === d.id);
            return (
              <div
                key={d.id}
                className="relative border-r border-outline-variant/30 last:border-r-0"
                style={{ height: totalMins }}
              >
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="absolute left-0 right-0 border-t border-outline-variant/20"
                    style={{ top: h * 60 - dayStart }}
                  />
                ))}
                {docAppts.map((a) => {
                  const p = getPatient(a.patientId);
                  const top = timeToMinutes(a.startTime) - dayStart;
                  return (
                    <div
                      key={a.id}
                      className="absolute left-1 right-1 rounded-lg bg-surface-container-lowest border-l-[3px] border-primary shadow-sm px-2 py-1 overflow-hidden"
                      style={{ top, height: Math.max(a.durationMins, 28) }}
                    >
                      <p className="text-[12px] font-semibold text-on-surface truncate">
                        {p?.name}
                      </p>
                      <p className="text-[11px] text-on-surface-variant truncate">
                        {a.startTime} · {a.type}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm">
        <div className="px-5 py-4 border-b border-outline-variant/40">
          <h2 className="font-headline text-[16px] font-semibold text-on-surface">
            All appointments today
          </h2>
        </div>
        <div className="divide-y divide-outline-variant/30">
          {todays
            .slice()
            .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime))
            .map((a) => {
              const p = getPatient(a.patientId);
              const d = doctors.find((dd) => dd.id === a.doctorId);
              return (
                <div key={a.id} className="flex items-center gap-4 px-5 py-3">
                  <span className="font-tabular text-[13px] font-semibold text-on-surface w-20 shrink-0">
                    {a.startTime}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-on-surface truncate">
                      {p?.name}
                    </p>
                    <p className="text-[12px] text-on-surface-variant truncate">
                      {a.type} · {d?.name} · {a.reason}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              );
            })}
        </div>
      </div>

      {showNew && <NewAppointmentModal onClose={() => setShowNew(false)} />}
    </div>
  );
}
