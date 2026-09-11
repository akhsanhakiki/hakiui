import React, { useRef } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface OtpInputProps {
  /** Number of cells. Default 6. */
  length?: number;
  value: string;
  onChange: (value: string) => void;
  /** Called once every cell is filled. */
  onComplete?: (value: string) => void;
  /** Insert a visual gap after these cell indexes (1-based), e.g. [3]. */
  groups?: number[];
  size?: "sm" | "md" | "lg";
  radius?: Radius;
  disabled?: boolean;
  autoFocus?: boolean;
  /** Restrict to digits (default) or allow letters too. */
  mode?: "numeric" | "alphanumeric";
  label?: string;
  className?: string;
}

const SIZES = { sm: "h-9 w-8 text-base", md: "h-11 w-10 text-lg", lg: "h-14 w-12 text-2xl" } as const;

/**
 * One-time-code entry: a cell per character, paste fills every cell,
 * Backspace walks back, arrows move. The value is a plain string so it can
 * be controlled like any input.
 */
export const OtpInput = ({
  length = 6,
  value,
  onChange,
  onComplete,
  groups = [],
  size = "md",
  radius = "md",
  disabled = false,
  autoFocus = false,
  mode = "numeric",
  label = "One-time code",
  className = "",
}: OtpInputProps) => {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const clean = (s: string) => (mode === "numeric" ? s.replace(/\D/g, "") : s.replace(/[^a-zA-Z0-9]/g, "")).slice(0, length);
  const commit = (next: string) => {
    onChange(next);
    if (next.length === length) onComplete?.(next);
  };
  const focusAt = (i: number) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

  return (
    <div role="group" aria-label={label} className={`inline-flex items-center gap-2 ${className}`} style={{ fontFamily: "var(--ui-font)" }}>
      {Array.from({ length }, (_, i) => (
        <React.Fragment key={i}>
          {i > 0 && groups.includes(i) && <span aria-hidden className="h-px w-2" style={{ background: "var(--border)" }} />}
          <input
            ref={(el) => { refs.current[i] = el; }}
            inputMode={mode === "numeric" ? "numeric" : "text"}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            autoFocus={autoFocus && i === 0}
            disabled={disabled}
            aria-label={`${label}, character ${i + 1} of ${length}`}
            value={value[i] ?? ""}
            onFocus={(e) => e.currentTarget.select()}
            onPaste={(e) => {
              e.preventDefault();
              const pasted = clean(e.clipboardData.getData("text"));
              if (!pasted) return;
              const next = clean(value.slice(0, i) + pasted);
              commit(next);
              focusAt(next.length >= length ? length - 1 : next.length);
            }}
            onChange={(e) => {
              const ch = clean(e.target.value).slice(-1);
              if (!ch) return;
              const chars = value.padEnd(length, " ").split("");
              chars[i] = ch;
              const next = chars.join("").trimEnd();
              commit(clean(next));
              focusAt(i + 1);
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                e.preventDefault();
                const chars = value.padEnd(length, " ").split("");
                if (chars[i] !== " ") chars[i] = " ";
                else if (i > 0) { chars[i - 1] = " "; focusAt(i - 1); }
                onChange(clean(chars.join("").trimEnd()));
              } else if (e.key === "ArrowLeft") { e.preventDefault(); focusAt(i - 1); }
              else if (e.key === "ArrowRight") { e.preventDefault(); focusAt(i + 1); }
            }}
            className={`text-center font-semibold tabular-nums outline-none transition-[box-shadow] ring-2 ring-transparent focus-visible:ring-(--ui-primary)/35 disabled:opacity-50 ${SIZES[size]}`}
            style={{
              ...getRadiusStyle(radius),
              color: "var(--text)",
              backgroundColor: "var(--surface)",
              border: "0.5px solid var(--border)",
              outline: "0.5px solid var(--border)",
              outlineOffset: 0,
              caretColor: "var(--ui-primary)",
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};
