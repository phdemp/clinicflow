import { useState } from "react";
import { useClinic } from "../state/store";

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
];

const APPT_TYPES = ["Consultation", "Follow-up", "New patient", "Vaccination"];

export function NewAppointmentModal({ onClose }: { onClose: () => void }) {
  const { patients, doctors, today, addAppointment } = useClinic();
  const [patientId, setPatientId] = useState(patients[0]?.id ?? "");
  const [doctorId, setDoctorId] = useState(doctors[0]?.id ?? "");
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [type, setType] = useState(APPT_TYPES[0]);
  const [reason, setReason] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    addAppointment({
      patientId,
      doctorId,
      date: today,
      startTime: time,
      durationMins: 30,
      type,
      reason: reason || type,
      status: "confirmed",
    });
    setDone(true);
    setTimeout(onClose, 900);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(15,23,42,0.35)] backdrop-blur-sm px-4 py-6">
      <div className="w-full max-w-lg max-h-full overflow-y-auto bg-surface-container-lowest rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/40">
          <h2 className="font-headline text-[18px] font-semibold text-on-surface">
            New Appointment
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {done ? (
          <div className="px-6 py-10 flex flex-col items-center gap-3 text-center">
            <span className="material-symbols-outlined text-[40px] text-primary">
              check_circle
            </span>
            <p className="text-[15px] font-semibold text-on-surface">
              Appointment booked successfully
            </p>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                Patient
              </label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface text-[14px] text-on-surface focus:outline-none focus:border-primary"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} · {p.phone}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                Doctor
              </label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface text-[14px] text-on-surface focus:outline-none focus:border-primary"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} · {d.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Time slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface text-[14px] text-on-surface focus:outline-none focus:border-primary"
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface text-[14px] text-on-surface focus:outline-none focus:border-primary"
                >
                  {APPT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                Reason for visit
              </label>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Follow-up on BP medication"
                className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface text-[14px] text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        )}

        {!done && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-outline-variant/40 bg-surface-container-low">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[14px] font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[14px] font-semibold transition-colors"
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
