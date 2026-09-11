import React, { useState } from "react";
import { AlertCircle, Check, ChevronDown, Loader2, Wrench } from "lucide-react";

export type ToolCallStatus = "running" | "done" | "error";

export interface ToolCall {
  name: string;
  status: ToolCallStatus;
  /** Args summary, result summary, or the error text. */
  detail?: string;
  /** e.g. "1.2s" */
  duration?: string;
}

export interface ToolCallsProps {
  calls: ToolCall[];
  defaultOpen?: boolean;
  label?: string;
  className?: string;
}

const STATUS = {
  running: { color: "var(--ui-primary)", Icon: Loader2, spin: true },
  done: { color: "var(--ui-success, #0CA30C)", Icon: Check, spin: false },
  error: { color: "var(--ui-danger, #D03B3B)", Icon: AlertCircle, spin: false },
} as const;

/**
 * What the assistant did to answer: a row of tool badges with live status,
 * and a fold-out trail with each call's detail. Running calls spin, errors
 * read in the danger colour.
 */
export const ToolCalls = ({ calls, defaultOpen = false, label = "Tools used", className = "" }: ToolCallsProps) => {
  const [open, setOpen] = useState(defaultOpen);
  if (calls.length === 0) return null;
  return (
    <div className={className} style={{ fontFamily: "var(--ui-font)" }}>
      <div className="flex flex-wrap items-center gap-1.5">
        {calls.map((c, i) => {
          const s = STATUS[c.status];
          return (
            <span
              key={`${c.name}-${i}`}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
              style={{ color: s.color, backgroundColor: `color-mix(in srgb, ${s.color} 12%, transparent)` }}
            >
              <s.Icon size={11} className={s.spin ? "animate-spin motion-reduce:animate-none" : undefined} />
              {c.name}
            </span>
          );
        })}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="ml-1 inline-flex items-center gap-1 rounded text-[11px] text-(--text-muted) transition-colors hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35"
        >
          <Wrench size={11} /> {label}
          <ChevronDown size={11} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && (
        <ul className="mt-2 space-y-1.5 pl-3" style={{ borderLeft: "2px solid var(--border)" }}>
          {calls.map((c, i) => {
            const s = STATUS[c.status];
            return (
              <li key={`${c.name}-${i}`} className="text-[11px] leading-relaxed">
                <span className="flex items-center gap-1.5">
                  <span className="font-medium text-(--text)">{c.name}</span>
                  {c.duration && <span className="text-(--text-muted)">· {c.duration}</span>}
                </span>
                {c.detail && (
                  <span className="mt-0.5 block font-mono text-[10.5px]" style={{ color: c.status === "error" ? s.color : "var(--text-muted)" }}>
                    {c.detail}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
