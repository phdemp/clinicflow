import { useClinic } from "../state/store";
import { Avatar } from "../components/Avatar";
import { StatusBadge } from "../components/StatusBadge";

export function Doctors() {
  const { doctors, appointments, today } = useClinic();

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-headline text-[24px] font-bold text-on-surface">
          Doctors & Schedules
        </h1>
        <p className="text-[13px] text-on-surface-variant">{doctors.length} practitioners</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {doctors.map((d) => {
          const todaysAppts = appointments
            .filter((a) => a.doctorId === d.id && a.date === today && a.status !== "cancelled")
            .sort((a, b) => a.startTime.localeCompare(b.startTime));
          return (
            <div
              key={d.id}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/40">
                <Avatar name={d.name} size={44} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-on-surface truncate">{d.name}</p>
                  <p className="text-[12px] text-on-surface-variant truncate">{d.specialty}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
              <div className="px-5 py-3 flex items-center justify-between text-[12px] text-on-surface-variant border-b border-outline-variant/30">
                <span>{d.roomLabel}</span>
                <span>{todaysAppts.length} appts today</span>
              </div>
              <div className="flex flex-col gap-2 p-4">
                {todaysAppts.length === 0 && (
                  <p className="text-[12px] text-outline text-center py-4">
                    No appointments scheduled
                  </p>
                )}
                {todaysAppts.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between text-[12px] px-3 py-2 rounded-lg bg-surface-container-low"
                  >
                    <span className="font-tabular font-semibold text-on-surface">
                      {a.startTime}
                    </span>
                    <span className="text-on-surface-variant truncate flex-1 mx-2">{a.type}</span>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
