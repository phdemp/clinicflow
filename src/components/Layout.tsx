import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { useClinic } from "../state/store";
import { NewAppointmentModal } from "./NewAppointmentModal";

const nav = [
  {
    group: "Clinic Ops",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: "dashboard", badge: "Live" },
      { to: "/calendar", label: "Calendar", icon: "calendar_month" },
      { to: "/waiting-room", label: "Waiting Room", icon: "group", live: true },
    ],
  },
  {
    group: "Practice",
    items: [
      { to: "/patients", label: "Patients", icon: "people" },
      { to: "/doctors", label: "Doctors & Schedules", icon: "stethoscope" },
    ],
  },
  {
    group: "Finance & Analytics",
    items: [
      { to: "/billing", label: "Billing & Payments", icon: "credit_card" },
      { to: "/reports", label: "Reports & Analytics", icon: "bar_chart" },
    ],
  },
  {
    group: "Engagement",
    items: [{ to: "/communication", label: "Communication", icon: "chat" }],
  },
];

function NavItem({
  to,
  label,
  icon,
  badge,
}: {
  to: string;
  label: string;
  icon: string;
  badge?: ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center justify-between px-space-md py-space-xs rounded-xl transition-colors ${
          isActive
            ? "bg-primary-container text-on-primary-container font-semibold"
            : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        }`
      }
    >
      <span className="flex items-center gap-space-sm text-[14px] font-semibold">
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        {label}
      </span>
      {badge}
    </NavLink>
  );
}

export function Layout() {
  const { doctors, queue, currentUser, logout } = useClinic();
  const [showNewAppt, setShowNewAppt] = useState(false);
  const navigate = useNavigate();
  const waitingCount = queue.filter((q) => q.status === "waiting").length;
  const availableDoctors = doctors.filter((d) => d.status !== "off-duty").length;

  return (
    <div className="min-h-screen bg-surface">
      <aside className="fixed left-0 top-0 h-screen w-72 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] overflow-y-auto">
        <div className="p-space-lg">
          <div className="flex items-center gap-space-md mb-space-base">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-on-primary font-headline font-bold">
              C
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-[16px] font-semibold text-on-surface leading-tight">
                ClinicFlow
              </span>
              <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px] text-primary">
                  location_on
                </span>
                Indiranagar, BLR
              </span>
            </div>
          </div>
          <div className="mb-space-lg">
            <button
              onClick={() => setShowNewAppt(true)}
              className="w-full flex items-center justify-between px-space-base py-space-sm bg-primary hover:bg-primary-container text-on-primary rounded-xl transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
            >
              <span className="flex items-center gap-space-sm text-[14px] font-semibold">
                <span className="material-symbols-outlined text-[18px]">add</span>
                New Appointment
              </span>
              <kbd className="text-[11px] bg-primary-container text-on-primary px-1 rounded">
                N
              </kbd>
            </button>
          </div>
          <nav className="space-y-space-md">
            {nav.map((section) => (
              <div className="space-y-1" key={section.group}>
                <div className="px-space-md py-1 text-[11px] font-semibold text-outline uppercase tracking-wider">
                  {section.group}
                </div>
                {section.items.map((item) => (
                  <NavItem
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                    badge={
                      item.badge ? (
                        <span className="px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-semibold">
                          {item.badge}
                        </span>
                      ) : item.live && waitingCount > 0 ? (
                        <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                          {waitingCount} waiting
                        </span>
                      ) : null
                    }
                  />
                ))}
              </div>
            ))}
          </nav>
        </div>
        <div className="p-space-base bg-surface-container-low mx-space-md mb-space-md rounded-xl space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-on-surface-variant">Doctor Availability</span>
            <span className="text-[11px] text-primary font-bold">
              {availableDoctors}/{doctors.length} on duty
            </span>
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-outline">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[11px]">Demo data · Just now</span>
          </div>
        </div>
      </aside>

      <div className="pl-72">
        <header className="fixed top-0 left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-gutter-loose flex items-center justify-between">
          <div className="flex items-center gap-space-lg flex-1 max-w-2xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-1.5 bg-surface-container-low rounded-xl text-[13px] text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors"
                placeholder="Search patient by name, mobile number, or appointment ID..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-space-lg">
            <div className="hidden xl:flex items-center gap-space-sm">
              {doctors.map((d) => (
                <span
                  key={d.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-[11px] text-on-surface"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      d.status === "available"
                        ? "bg-primary"
                        : d.status === "in-consult"
                          ? "bg-secondary"
                          : "bg-outline"
                    }`}
                  />
                  {d.name.split(" ").slice(-1)}:{" "}
                  {d.status === "available"
                    ? "Available"
                    : d.status === "in-consult"
                      ? "In consult"
                      : "Off duty"}
                </span>
              ))}
            </div>
            <button
              onClick={() => setShowNewAppt(true)}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {waitingCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-on-error text-[10px] flex items-center justify-center font-bold">
                  {waitingCount}
                </span>
              )}
            </button>
            <div
              className="flex items-center gap-space-md pl-space-sm cursor-pointer"
              onClick={() => navigate("/patients")}
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-[12px] font-semibold">
                {(currentUser?.name ?? "PV")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[13px] font-semibold text-on-surface leading-tight">
                  {currentUser?.name ?? "Pooja Verma"}
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  {currentUser?.role ?? "Head Receptionist"}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              title="Log out"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </header>
        <main className="relative pt-16 w-full bg-surface min-h-screen px-gutter-loose py-gutter-loose">
          <Outlet />
        </main>
      </div>

      {showNewAppt && <NewAppointmentModal onClose={() => setShowNewAppt(false)} />}
    </div>
  );
}
