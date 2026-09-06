import { useState } from "react";
import { useClinic } from "../state/store";
import { Avatar } from "../components/Avatar";
import { StatusBadge } from "../components/StatusBadge";
import type { MessageChannel } from "../data/types";

const CHANNEL_ICON: Record<MessageChannel, string> = {
  whatsapp: "chat",
  sms: "sms",
  email: "mail",
};

export function Communication() {
  const { messages, patients, getPatient, sendMessage } = useClinic();
  const [patientId, setPatientId] = useState(patients[0]?.id ?? "");
  const [channel, setChannel] = useState<MessageChannel>("whatsapp");
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (!content.trim()) return;
    sendMessage({ patientId, channel, type: "reminder", content });
    setContent("");
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-headline text-[24px] font-bold text-on-surface">
          Communication & Reminders
        </h1>
        <p className="text-[13px] text-on-surface-variant">{messages.length} messages sent</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-5 flex flex-col gap-3 h-fit">
          <h2 className="font-headline text-[14px] font-semibold text-on-surface">
            Send a reminder
          </h2>
          <div>
            <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Patient
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="mt-1 w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface text-[13px] focus:outline-none focus:border-primary"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Channel
            </label>
            <div className="mt-1 flex gap-2">
              {(["whatsapp", "sms", "email"] as MessageChannel[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setChannel(c)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-[12px] font-semibold capitalize transition-colors ${
                    channel === c
                      ? "bg-primary-container text-on-primary-container border-primary"
                      : "border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {CHANNEL_ICON[c]}
                  </span>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Message
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              placeholder="Type your reminder message..."
              className="mt-1 w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-[13px] focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <button
            onClick={handleSend}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[13px] font-semibold transition-colors"
          >
            Send message
          </button>
        </div>

        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm">
          <div className="px-5 py-4 border-b border-outline-variant/40">
            <h2 className="font-headline text-[16px] font-semibold text-on-surface">
              Message log
            </h2>
          </div>
          <div className="divide-y divide-outline-variant/30">
            {messages.map((m) => {
              const p = getPatient(m.patientId);
              return (
                <div key={m.id} className="flex items-start gap-3 px-5 py-3">
                  <Avatar name={p?.name ?? "?"} colorClass={p?.avatarColor} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-[13px] font-semibold text-on-surface">{p?.name}</p>
                      <span className="material-symbols-outlined text-[14px] text-outline">
                        {CHANNEL_ICON[m.channel]}
                      </span>
                      <span className="text-[11px] text-outline capitalize">{m.channel}</span>
                      <span className="text-[11px] text-outline">· {m.sentAt}</span>
                    </div>
                    <p className="text-[13px] text-on-surface-variant mt-0.5">{m.content}</p>
                  </div>
                  <StatusBadge status={m.status} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
