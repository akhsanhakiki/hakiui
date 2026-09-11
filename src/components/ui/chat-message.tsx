import React, { type ReactNode } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface ChatMessageProps {
  role: "user" | "assistant";
  children: ReactNode;
  /** Sender mark: an Avatar, a brand icon, or nothing. */
  avatar?: ReactNode;
  name?: string;
  time?: string;
  /** Row of small buttons under the message (copy, retry, feedback…). */
  actions?: ReactNode;
  /** Shows a blinking caret at the end while the answer streams. */
  streaming?: boolean;
  radius?: Radius;
  className?: string;
}

/**
 * One turn in a conversation. User turns sit right-aligned in a tinted
 * bubble; assistant turns run full width under a sender line, the way
 * answers read best. Rich content (Markdown, tables, charts) goes in
 * `children`; the component only owns the frame.
 */
export const ChatMessage = ({
  role,
  children,
  avatar,
  name,
  time,
  actions,
  streaming = false,
  radius = "lg",
  className = "",
}: ChatMessageProps) => {
  const isUser = role === "user";
  return (
    <article
      aria-label={name ?? (isUser ? "You" : "Assistant")}
      className={`flex w-full gap-3 ${isUser ? "flex-row-reverse" : ""} ${className}`}
      style={{ fontFamily: "var(--ui-font)", color: "var(--text)" }}
    >
      {avatar && <div className="mt-0.5 shrink-0">{avatar}</div>}
      <div className={`min-w-0 ${isUser ? "max-w-[80%]" : "flex-1"}`}>
        {(name || time) && (
          <div className={`mb-1.5 flex items-center gap-2 text-[11px] text-(--text-muted) ${isUser ? "justify-end" : ""}`}>
            {name && <span className="font-medium">{name}</span>}
            {time && <span>{time}</span>}
          </div>
        )}
        <div
          className={`text-sm leading-6 ${isUser ? "px-4 py-2.5" : ""}`}
          style={
            isUser
              ? {
                  ...getRadiusStyle(radius),
                  backgroundColor: "color-mix(in srgb, var(--ui-primary) 10%, var(--surface))",
                  border: "0.5px solid color-mix(in srgb, var(--ui-primary) 25%, var(--border))",
                }
              : undefined
          }
        >
          {children}
          {streaming && (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse align-baseline"
              style={{ background: "var(--ui-primary)" }}
            />
          )}
        </div>
        {actions && <div className={`mt-2 flex items-center gap-1 ${isUser ? "justify-end" : ""}`}>{actions}</div>}
      </div>
    </article>
  );
};
