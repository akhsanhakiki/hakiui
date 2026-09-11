import React, { useState } from "react";
import { Brain, ChevronDown } from "lucide-react";

export interface ThinkingStepsProps {
  steps: string[];
  /** Still reasoning: shows a shimmering label and keeps the list live. */
  streaming?: boolean;
  defaultOpen?: boolean;
  label?: string;
  className?: string;
}

/**
 * The model's reasoning transcript, folded under a "Thinking" toggle so the
 * answer stays the focus. While streaming the label shimmers and new steps
 * append; once done it reads as a quiet, numbered trail.
 */
export const ThinkingSteps = ({ steps, streaming = false, defaultOpen = true, label, className = "" }: ThinkingStepsProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const title = label ?? (streaming ? "Thinking…" : `Thought for ${steps.length} step${steps.length === 1 ? "" : "s"}`);
  return (
    <div className={className} style={{ fontFamily: "var(--ui-font)" }}>
      <style>{`@keyframes hk-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.hk-shimmer{animation:none!important}}`}</style>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded text-[11px] font-medium text-(--text-muted) transition-colors hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35"
      >
        <Brain size={12} className={streaming ? "text-(--ui-primary)" : undefined} />
        <span
          className={streaming ? "hk-shimmer bg-clip-text text-transparent" : undefined}
          style={
            streaming
              ? {
                  backgroundImage: "linear-gradient(90deg, var(--text-muted) 0%, var(--text) 50%, var(--text-muted) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "hk-shimmer 1.6s linear infinite",
                }
              : undefined
          }
        >
          {title}
        </span>
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && steps.length > 0 && (
        <ol className="mt-1.5 space-y-1 pl-3" style={{ borderLeft: "2px solid var(--border)" }} aria-live={streaming ? "polite" : undefined}>
          {steps.map((s, i) => (
            <li key={i} className="text-[11px] leading-relaxed text-(--text-muted)">
              {s}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
