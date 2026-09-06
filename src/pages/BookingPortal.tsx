import { useState } from "react";
import { useClinic } from "../state/store";

const TIME_SLOTS = ["09:00 AM", "09:30 AM", "10:30 AM", "11:00 AM", "02:00 PM", "03:30 PM", "04:00 PM"];

export function BookingPortal() {
  const { doctors, today, addAppointment, addPatient } = useClinic();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorId, setDoctorId] = useState(doctors[0]?.id ?? "");
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const doctor = doctors.find((d) => d.id === doctorId);

  const handleConfirm = () => {
    const patient = addPatient({
      name: name || "New Patient",
      phone: phone || "+91 90000 00000",
      age: 30,
      gender: "Other",
      avatarColor: "bg-secondary",
      lastVisit: today,
      allergies: [],
      conditions: [],
      bloodGroup: "—",
      address: "—",
    });
    addAppointment({
      patientId: patient.id,
      doctorId,
      date: today,
      startTime: time,
      durationMins: 30,
      type: "Online booking",
      reason: reason || "General consultation",
      status: "booked",
    });
    setConfirmed(`${time} with ${doctor?.name}`);
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/40 flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold">
            C
          </div>
          <div>
            <h1 className="font-headline text-[16px] font-semibold text-on-surface">
              ClinicFlow · Book an Appointment
            </h1>
            <p className="text-[12px] text-on-surface-variant">Indiranagar Central</p>
          </div>
        </div>

        {confirmed ? (
          <div className="px-6 py-12 flex flex-col items-center gap-3 text-center">
            <span className="material-symbols-outlined text-[48px] text-primary">
              check_circle
            </span>
            <h2 className="font-headline text-[18px] font-semibold text-on-surface">
              Appointment Confirmed!
            </h2>
            <p className="text-[13px] text-on-surface-variant">
              {name}, your appointment is booked for {confirmed} on {today}. A confirmation has
              been sent to {phone}.
            </p>
          </div>
        ) : (
          <div className="px-6 py-6">
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold ${
                      step >= s
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container-low text-on-surface-variant"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-0.5 ${step > s ? "bg-primary" : "bg-surface-container-low"}`}
                    />
                  )}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-[15px] font-semibold text-on-surface">
                  Choose a doctor & time
                </h2>
                <div className="grid grid-cols-1 gap-2">
                  {doctors.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDoctorId(d.id)}
                      className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                        doctorId === d.id
                          ? "border-primary bg-primary-container/20"
                          : "border-outline-variant hover:bg-surface-container-low"
                      }`}
                    >
                      <p className="text-[13px] font-semibold text-on-surface">{d.name}</p>
                      <p className="text-[12px] text-on-surface-variant">{d.specialty}</p>
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Time slot
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTime(t)}
                        className={`py-2 rounded-lg border text-[12px] font-semibold transition-colors ${
                          time === t
                            ? "border-primary bg-primary-container/20 text-primary"
                            : "border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-[14px] font-semibold hover:bg-primary-container transition-colors"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-[15px] font-semibold text-on-surface">Your details</h2>
                <div>
                  <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Full name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant text-[13px] focus:outline-none focus:border-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Mobile number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant text-[13px] focus:outline-none focus:border-primary"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Reason for visit
                  </label>
                  <input
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant text-[13px] focus:outline-none focus:border-primary"
                    placeholder="e.g. General checkup"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl border border-outline-variant text-[14px] font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!name || !phone}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-[14px] font-semibold hover:bg-primary-container transition-colors disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-[15px] font-semibold text-on-surface">Confirm booking</h2>
                <div className="rounded-xl bg-surface-container-low p-4 space-y-2 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Doctor</span>
                    <span className="font-semibold text-on-surface">{doctor?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Date</span>
                    <span className="font-semibold text-on-surface font-tabular">{today}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Time</span>
                    <span className="font-semibold text-on-surface font-tabular">{time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Patient</span>
                    <span className="font-semibold text-on-surface">{name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Phone</span>
                    <span className="font-semibold text-on-surface font-tabular">{phone}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl border border-outline-variant text-[14px] font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-on-primary text-[14px] font-semibold hover:bg-primary-container transition-colors"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
