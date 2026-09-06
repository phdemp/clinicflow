import { useMemo } from "react";
import { useClinic } from "../state/store";
import { StatusBadge } from "../components/StatusBadge";
import { Avatar } from "../components/Avatar";

export function Billing() {
  const { invoices, getPatient, markInvoicePaid } = useClinic();

  const totals = useMemo(() => {
    const paid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
    const pending = invoices
      .filter((i) => i.status === "pending")
      .reduce((s, i) => s + i.amount, 0);
    const overdue = invoices
      .filter((i) => i.status === "overdue")
      .reduce((s, i) => s + i.amount, 0);
    return { paid, pending, overdue };
  }, [invoices]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-headline text-[24px] font-bold text-on-surface">
          Billing & Payments
        </h1>
        <p className="text-[13px] text-on-surface-variant">{invoices.length} invoices</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
          <p className="text-[12px] font-semibold text-status-confirmed-text uppercase">Paid</p>
          <p className="font-headline text-[24px] font-bold text-on-surface mt-1">
            ₹{totals.paid.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
          <p className="text-[12px] font-semibold text-status-waiting-text uppercase">Pending</p>
          <p className="font-headline text-[24px] font-bold text-on-surface mt-1">
            ₹{totals.pending.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 p-5 shadow-sm">
          <p className="text-[12px] font-semibold text-status-cancelled-text uppercase">Overdue</p>
          <p className="font-headline text-[24px] font-bold text-on-surface mt-1">
            ₹{totals.overdue.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-[11px] uppercase text-outline">
              <th className="px-5 py-2.5 font-semibold">Invoice</th>
              <th className="px-5 py-2.5 font-semibold">Patient</th>
              <th className="px-5 py-2.5 font-semibold">Date</th>
              <th className="px-5 py-2.5 font-semibold">Items</th>
              <th className="px-5 py-2.5 font-semibold">Amount</th>
              <th className="px-5 py-2.5 font-semibold">Status</th>
              <th className="px-5 py-2.5 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {invoices.map((inv) => {
              const p = getPatient(inv.patientId);
              return (
                <tr key={inv.id} className="hover:bg-surface-container-low/60 transition-colors">
                  <td className="px-5 py-3 font-tabular text-[12px] text-on-surface-variant uppercase">
                    {inv.id}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={p?.name ?? "?"} colorClass={p?.avatarColor} size={28} />
                      <span className="text-[13px] font-semibold text-on-surface">
                        {p?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-tabular text-[13px] text-on-surface-variant">
                    {inv.date}
                  </td>
                  <td className="px-5 py-3 text-[12px] text-on-surface-variant">
                    {inv.items.map((it) => it.label).join(", ")}
                  </td>
                  <td className="px-5 py-3 font-tabular text-[13px] font-semibold text-on-surface">
                    ₹{inv.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    {inv.status !== "paid" && (
                      <button
                        onClick={() => markInvoicePaid(inv.id, "Cash")}
                        className="text-[12px] font-semibold text-primary hover:underline"
                      >
                        Mark as paid
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
