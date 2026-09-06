import { Link, useParams } from "react-router-dom";
import { useClinic } from "../state/store";
import { Avatar } from "../components/Avatar";
import { StatusBadge } from "../components/StatusBadge";

export function PatientProfile() {
  const { id } = useParams<{ id: string }>();
  const { getPatient, appointments, invoices, getDoctor } = useClinic();
  const patient = id ? getPatient(id) : undefined;

  if (!patient) {
    return (
      <div className="text-center py-16">
        <p className="text-[14px] text-on-surface-variant">Patient not found.</p>
        <Link to="/patients" className="text-primary font-semibold text-[13px]">
          ← Back to directory
        </Link>
      </div>
    );
  }

  const history = appointments
    .filter((a) => a.patientId === patient.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const patientInvoices = invoices.filter((i) => i.patientId === patient.id);

  return (
    <div className="flex flex-col gap-5">
      <Link to="/patients" className="text-[13px] font-semibold text-primary w-fit">
        ← Back to directory
      </Link>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-6 flex items-center gap-5 flex-wrap">
        <Avatar name={patient.name} colorClass={patient.avatarColor} size={64} />
        <div className="flex-1 min-w-[200px]">
          <h1 className="font-headline text-[22px] font-bold text-on-surface">{patient.name}</h1>
          <p className="text-[13px] text-on-surface-variant">
            {patient.age} yrs · {patient.gender} · {patient.bloodGroup}
          </p>
          <p className="text-[13px] text-on-surface-variant font-tabular">{patient.phone}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {patient.allergies.length > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-cancelled-bg border border-status-cancelled-border text-status-cancelled-text text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Allergic: {patient.allergies.join(", ")}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 flex flex-col gap-5">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-5">
            <h2 className="font-headline text-[14px] font-semibold text-on-surface mb-3">
              Details
            </h2>
            <dl className="space-y-2 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Address</dt>
                <dd className="text-on-surface text-right max-w-[60%]">{patient.address}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Last visit</dt>
                <dd className="text-on-surface font-tabular">{patient.lastVisit}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-on-surface-variant">Conditions</dt>
                <dd className="text-on-surface text-right">
                  {patient.conditions.length ? patient.conditions.join(", ") : "None"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-5">
            <h2 className="font-headline text-[14px] font-semibold text-on-surface mb-3">
              Billing
            </h2>
            <div className="flex flex-col gap-2">
              {patientInvoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between text-[13px]">
                  <span className="text-on-surface-variant font-tabular">{inv.date}</span>
                  <span className="font-tabular font-semibold text-on-surface">
                    ₹{inv.amount.toLocaleString("en-IN")}
                  </span>
                  <StatusBadge status={inv.status} />
                </div>
              ))}
              {patientInvoices.length === 0 && (
                <p className="text-[12px] text-outline">No billing records</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm">
          <div className="px-5 py-4 border-b border-outline-variant/40">
            <h2 className="font-headline text-[16px] font-semibold text-on-surface">
              Visit History
            </h2>
          </div>
          <div className="divide-y divide-outline-variant/30">
            {history.map((a) => {
              const d = getDoctor(a.doctorId);
              return (
                <div key={a.id} className="flex items-center gap-4 px-5 py-3">
                  <div className="w-24 shrink-0">
                    <p className="font-tabular text-[13px] font-semibold text-on-surface">
                      {a.date}
                    </p>
                    <p className="text-[11px] text-on-surface-variant">{a.startTime}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-on-surface truncate">
                      {a.type} · {d?.name}
                    </p>
                    <p className="text-[12px] text-on-surface-variant truncate">{a.reason}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              );
            })}
            {history.length === 0 && (
              <p className="px-5 py-6 text-[13px] text-on-surface-variant">
                No visit history yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
