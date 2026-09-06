import { Link } from "react-router-dom";
import { useClinic } from "../state/store";
import { StatusBadge } from "../components/StatusBadge";
import { Avatar } from "../components/Avatar";

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: string;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 flex flex-col gap-2 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wide">
          {label}
        </span>
        <span className="material-symbols-outlined text-[18px] text-primary">{icon}</span>
      </div>
      <span className="font-headline text-[28px] font-bold text-on-surface">{value}</span>
      {sub && <span className="text-[12px] text-outline">{sub}</span>}
    </div>
  );
}

export function Dashboard() {
  const { appointments, patients, queue, invoices, doctors, today, getPatient, getDoctor } =
    useClinic();

  const todays = appointments.filter((a) => a.date === today);
  const completed = todays.filter((a) => a.status === "completed").length;
  const waitingCount = queue.filter((q) => q.status === "waiting").length;
  const revenueToday = invoices
    .filter((i) => i.date === today)
    .reduce((sum, i) => sum + i.amount, 0);
  const pendingRevenue = invoices
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const upcoming = todays
    .filter((a) => a.status === "booked" || a.status === "confirmed")
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-[24px] font-bold text-on-surface">
            Good morning, Pooja
          </h1>
          <p className="text-[13px] text-on-surface-variant">
            Today, Wed 6 Sep 2026 · Indiranagar Central
          </p>
        </div>
        <Link
          to="/calendar"
          className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-[14px] font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
        >
          View full calendar
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="event_available"
          label="Today's Appointments"
          value={String(todays.length)}
          sub={`${completed} completed`}
        />
        <StatCard
          icon="group"
          label="Waiting Now"
          value={String(waitingCount)}
          sub="in queue"
        />
        <StatCard
          icon="payments"
          label="Revenue Today"
          value={`₹${revenueToday.toLocaleString("en-IN")}`}
          sub={`₹${pendingRevenue.toLocaleString("en-IN")} pending`}
        />
        <StatCard
          icon="people"
          label="Total Patients"
          value={String(patients.length)}
          sub="in directory"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/40">
            <h2 className="font-headline text-[16px] font-semibold text-on-surface">
              Upcoming Appointments
            </h2>
            <Link to="/calendar" className="text-[13px] font-semibold text-primary">
              See all
            </Link>
          </div>
          <div className="divide-y divide-outline-variant/30">
            {upcoming.length === 0 && (
              <p className="px-5 py-6 text-[13px] text-on-surface-variant">
                No more appointments scheduled for today.
              </p>
            )}
            {upcoming.map((a) => {
              const p = getPatient(a.patientId);
              const d = getDoctor(a.doctorId);
              return (
                <div key={a.id} className="flex items-center gap-4 px-5 py-3">
                  <span className="font-tabular text-[13px] font-semibold text-on-surface w-20 shrink-0">
                    {a.startTime}
                  </span>
                  <Avatar name={p?.name ?? "?"} colorClass={p?.avatarColor} size={32} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-on-surface truncate">
                      {p?.name}
                    </p>
                    <p className="text-[12px] text-on-surface-variant truncate">
                      {a.type} · {d?.name}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm">
          <div className="px-5 py-4 border-b border-outline-variant/40">
            <h2 className="font-headline text-[16px] font-semibold text-on-surface">
              Doctor Status
            </h2>
          </div>
          <div className="divide-y divide-outline-variant/30">
            {doctors.map((d) => (
              <div key={d.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar name={d.name} size={32} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-on-surface truncate">{d.name}</p>
                  <p className="text-[12px] text-on-surface-variant truncate">{d.specialty}</p>
                </div>
                <StatusBadge status={d.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
