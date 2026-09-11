import React, { type ReactNode } from "react";

export interface KbdProps {
  /** Keys rendered as separate caps, e.g. ["⌘", "K"]. */
  keys?: string[];
  children?: ReactNode;
  size?: "sm" | "md";
  className?: string;
}

/** A keyboard shortcut: one cap per key, in the UI mono stack. */
export const Kbd = ({ keys, children, size = "sm", className = "" }: KbdProps) => {
  const caps = keys ?? (children !== undefined ? [children] : []);
  const cap = size === "sm" ? "min-w-4 px-1 text-[10px] leading-4" : "min-w-5 px-1.5 text-[11px] leading-5";
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={keys?.join(" ")}>
      {caps.map((k, i) => (
        <kbd
          key={i}
          className={`inline-flex items-center justify-center rounded font-medium tabular-nums ${cap}`}
          style={{
            fontFamily: "var(--ui-font)",
            color: "var(--text-muted)",
            backgroundColor: "var(--bg-soft)",
            border: "0.5px solid var(--border)",
            boxShadow: "inset 0 -1px 0 var(--border)",
          }}
        >
          {k}
        </kbd>
      ))}
    </span>
  );
};
