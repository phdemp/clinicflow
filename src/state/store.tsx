import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  appointments as seedAppointments,
  doctors as seedDoctors,
  invoices as seedInvoices,
  messages as seedMessages,
  patients as seedPatients,
  queue as seedQueue,
  TODAY,
} from "../data/seed";
import type {
  Appointment,
  AppointmentStatus,
  Doctor,
  Invoice,
  Message,
  Patient,
  QueueEntry,
  QueueStatus,
} from "../data/types";

interface ClinicState {
  today: string;
  isAuthenticated: boolean;
  currentUser: { name: string; role: string } | null;
  login: (email: string) => void;
  logout: () => void;
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  queue: QueueEntry[];
  invoices: Invoice[];
  messages: Message[];
  addAppointment: (appt: Omit<Appointment, "id" | "status"> & { status?: AppointmentStatus }) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addToQueue: (entry: Omit<QueueEntry, "id">) => void;
  advanceQueueStatus: (id: string, status: QueueStatus) => void;
  markInvoicePaid: (id: string, method: string) => void;
  sendMessage: (msg: Omit<Message, "id" | "sentAt" | "status">) => void;
  addPatient: (patient: Omit<Patient, "id">) => Patient;
  getPatient: (id: string) => Patient | undefined;
  getDoctor: (id: string) => Doctor | undefined;
}

const ClinicContext = createContext<ClinicState | null>(null);

let idCounter = 1000;
const nextId = (prefix: string) => `${prefix}${idCounter++}`;

const AUTH_KEY = "clinicflow_demo_auth";

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(
    () => (sessionStorage.getItem(AUTH_KEY) ? { name: "Pooja Verma", role: "Head Receptionist" } : null),
  );
  const [patients, setPatients] = useState<Patient[]>(seedPatients);
  const [doctorList] = useState<Doctor[]>(seedDoctors);
  const [appointmentList, setAppointmentList] = useState<Appointment[]>(seedAppointments);
  const [queueList, setQueueList] = useState<QueueEntry[]>(seedQueue);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(seedInvoices);
  const [messageList, setMessageList] = useState<Message[]>(seedMessages);

  const value = useMemo<ClinicState>(
    () => ({
      today: TODAY,
      isAuthenticated: currentUser !== null,
      currentUser,
      login: () => {
        sessionStorage.setItem(AUTH_KEY, "1");
        setCurrentUser({ name: "Pooja Verma", role: "Head Receptionist" });
      },
      logout: () => {
        sessionStorage.removeItem(AUTH_KEY);
        setCurrentUser(null);
      },
      doctors: doctorList,
      patients,
      appointments: appointmentList,
      queue: queueList,
      invoices: invoiceList,
      messages: messageList,
      addAppointment: (appt) => {
        const created: Appointment = {
          ...appt,
          id: nextId("a"),
          status: appt.status ?? "booked",
        };
        setAppointmentList((prev) => [...prev, created]);
        return created;
      },
      updateAppointmentStatus: (id, status) => {
        setAppointmentList((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status } : a)),
        );
      },
      addToQueue: (entry) => {
        setQueueList((prev) => [...prev, { ...entry, id: nextId("q") }]);
      },
      advanceQueueStatus: (id, status) => {
        setQueueList((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status } : q)),
        );
      },
      markInvoicePaid: (id, method) => {
        setInvoiceList((prev) =>
          prev.map((inv) =>
            inv.id === id ? { ...inv, status: "paid", method } : inv,
          ),
        );
      },
      sendMessage: (msg) => {
        const created: Message = {
          ...msg,
          id: nextId("m"),
          sentAt: new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "sent",
        };
        setMessageList((prev) => [created, ...prev]);
      },
      addPatient: (patient) => {
        const created: Patient = { ...patient, id: nextId("p") };
        setPatients((prev) => [...prev, created]);
        return created;
      },
      getPatient: (id) => patients.find((p) => p.id === id),
      getDoctor: (id) => doctorList.find((d) => d.id === id),
    }),
    [currentUser, patients, doctorList, appointmentList, queueList, invoiceList, messageList],
  );

  return <ClinicContext.Provider value={value}>{children}</ClinicContext.Provider>;
}

export function useClinic() {
  const ctx = useContext(ClinicContext);
  if (!ctx) throw new Error("useClinic must be used within ClinicProvider");
  return ctx;
}
