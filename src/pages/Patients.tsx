import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useClinic } from "../state/store";
import { Avatar } from "../components/Avatar";

export function Patients() {
  const { patients } = useClinic();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) => p.name.toLowerCase().includes(q) || p.phone.includes(q),
    );
  }, [patients, query]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-headline text-[24px] font-bold text-on-surface">
            Patient Directory
          </h1>
          <p className="text-[13px] text-on-surface-variant">{patients.length} patients</p>
        </div>
        <div className="relative w-full max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full pl-9 pr-3 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-[13px] focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[640px] text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-[11px] uppercase text-outline">
              <th className="px-5 py-2.5 font-semibold">Patient</th>
              <th className="px-5 py-2.5 font-semibold">Phone</th>
              <th className="px-5 py-2.5 font-semibold">Age / Gender</th>
              <th className="px-5 py-2.5 font-semibold">Last Visit</th>
              <th className="px-5 py-2.5 font-semibold">Conditions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-surface-container-low/60 transition-colors">
                <td className="px-5 py-3">
                  <Link to={`/patients/${p.id}`} className="flex items-center gap-3">
                    <Avatar name={p.name} colorClass={p.avatarColor} size={32} />
                    <span className="text-[13px] font-semibold text-on-surface">{p.name}</span>
                  </Link>
                </td>
                <td className="px-5 py-3 font-tabular text-[13px] text-on-surface-variant">
                  {p.phone}
                </td>
                <td className="px-5 py-3 text-[13px] text-on-surface-variant">
                  {p.age} · {p.gender}
                </td>
                <td className="px-5 py-3 font-tabular text-[13px] text-on-surface-variant">
                  {p.lastVisit}
                </td>
                <td className="px-5 py-3 text-[12px] text-on-surface-variant">
                  {p.conditions.length ? p.conditions.join(", ") : "—"}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-[13px] text-outline">
                  No patients match "{query}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
