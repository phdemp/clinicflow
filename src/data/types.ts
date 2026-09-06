export type DoctorStatus = "available" | "in-consult" | "off-duty";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  colorToken: "primary" | "secondary" | "tertiary";
  status: DoctorStatus;
  roomLabel: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  avatarColor: string;
  lastVisit: string;
  allergies: string[];
  conditions: string[];
  bloodGroup: string;
  address: string;
}

export type AppointmentStatus =
  | "booked"
  | "confirmed"
  | "in-consultation"
  | "completed"
  | "cancelled"
  | "no-show";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "09:30 AM"
  durationMins: number;
  type: string;
  status: AppointmentStatus;
  reason: string;
}

export type QueueStatus = "waiting" | "in-consultation" | "completed";

export interface QueueEntry {
  id: string;
  patientId: string;
  doctorId: string;
  checkInTime: string;
  status: QueueStatus;
  priority: "normal" | "urgent";
  waitMins: number;
}

export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface InvoiceItem {
  label: string;
  amount: number;
}

export interface Invoice {
  id: string;
  patientId: string;
  date: string;
  items: InvoiceItem[];
  amount: number;
  status: InvoiceStatus;
  method?: string;
}

export type MessageChannel = "whatsapp" | "sms" | "email";

export interface Message {
  id: string;
  patientId: string;
  channel: MessageChannel;
  type: "reminder" | "confirmation" | "follow-up" | "promo";
  content: string;
  sentAt: string;
  status: "sent" | "delivered" | "read" | "failed";
}
