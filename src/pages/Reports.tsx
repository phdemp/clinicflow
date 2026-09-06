import { useClinic } from "../state/store";

const WEEKLY_VISITS = [
  { day: "Mon", visits: 32 },
  { day: "Tue", visits: 41 },
  { day: "Wed", visits: 28 },
  { day: "Thu", visits: 47 },
  { day: "Fri", visits: 39 },
  { day: "Sat", visits: 22 },
  { day: "Sun", visits: 10 },
];

export function Reports() {
  const { patients, appointments, invoices, doctors } = useClinic();

  const totalRevenue = invoices.reduce((s, i) => s + i.amount, 0);
  const collected = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const completedAppts = appointments.filter((a) => a.status === "completed").length;
  const cancelRate = Math.round(
    (appointments.filter((a) => a.status === "cancelled" || a.status === "no-show").length /
      Math.max(appointments.length, 1)) *
      100,
  );
  const maxVisits = Math.max(...WEEKLY_VISITS.map((w) => w.visits));

  const byDoctor = doctors.map((d) => ({
    doctor: d,
    count: appointments.filter((a) => a.doctorId === d.id).length,
  }));
  const maxByDoctor = Math.max(...byDoctor.map((b) => b.count), 1);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-headline text-[24px] font-bold text-on-surface">
          Reports & Analytics
        </h1>
        <p className="text-[13px] text-on-surface-variant">Last 7 days · Indiranagar Central</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
          <p className="text-[12px] font-semibold text-on-surface-variant uppercase">
            Total Revenue
          </p>
          <p className="font-headline text-[24px] font-bold text-on-surface mt-1">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-[12px] text-outline mt-1">
            ₹{collected.toLocaleString("en-IN")} collected
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
          <p className="text-[12px] font-semibold text-on-surface-variant uppercase">
            Total Patients
          </p>
          <p className="font-headline text-[24px] font-bold text-on-surface mt-1">
            {patients.length}
          </p>
          <p className="text-[12px] text-outline mt-1">+3 this week</p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
          <p className="text-[12px] font-semibold text-on-surface-variant uppercase">
            Completed Visits
          </p>
          <p className="font-headline text-[24px] font-bold text-on-surface mt-1">
            {completedAppts}
          </p>
          <p className="text-[12px] text-outline mt-1">today</p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
          <p className="text-[12px] font-semibold text-on-surface-variant uppercase">
            Cancellation Rate
          </p>
          <p className="font-headline text-[24px] font-bold text-on-surface mt-1">
            {cancelRate}%
          </p>
          <p className="text-[12px] text-outline mt-1">of all appointments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-5">
          <h2 className="font-headline text-[16px] font-semibold text-on-surface mb-4">
            Patient Visits (7 days)
          </h2>
          <div className="flex items-end gap-3 h-40">
            {WEEKLY_VISITS.map((w) => (
              <div key={w.day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-primary/80"
                  style={{ height: `${(w.visits / maxVisits) * 100}%` }}
                />
                <span className="text-[11px] text-on-surface-variant">{w.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-5">
          <h2 className="font-headline text-[16px] font-semibold text-on-surface mb-4">
            Appointments by Doctor
          </h2>
          <div className="flex flex-col gap-3">
            {byDoctor.map(({ doctor, count }) => (
              <div key={doctor.id} className="flex items-center gap-3">
                <span className="text-[12px] text-on-surface-variant w-32 truncate">
                  {doctor.name}
                </span>
                <div className="flex-1 h-3 rounded-full bg-surface-container-low overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `${(count / maxByDoctor) * 100}%` }}
                  />
                </div>
                <span className="text-[12px] font-tabular font-semibold text-on-surface w-6 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
