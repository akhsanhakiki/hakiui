import React, { useEffect, useRef, type ReactNode } from "react";
import { ArrowUp, Square } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Called with the trimmed draft on Enter or the send button. */
  onSubmit: (value: string) => void;
  /** While a response streams the send button becomes a stop button. */
  streaming?: boolean;
  onStop?: () => void;
  placeholder?: string;
  /** Grows with content up to this many rows, then scrolls. */
  maxRows?: number;
  disabled?: boolean;
  /** Toolbar slots on the bottom row: model picker, attach, etc. */
  leading?: ReactNode;
  trailing?: ReactNode;
  /** Hint under the box, e.g. "Enter to send · Shift+Enter for a new line". */
  hint?: ReactNode;
  autoFocus?: boolean;
  radius?: Radius;
  className?: string;
  "aria-label"?: string;
}

/**
 * The chat composer: an auto-growing textarea in a bordered box with a
 * toolbar row. Enter sends, Shift+Enter breaks a line; the send button turns
 * into a stop button while `streaming`. Focus returns to the textarea when a
 * stream ends so the user can keep typing.
 */
export const PromptInput = ({
  value,
  onChange,
  onSubmit,
  streaming = false,
  onStop,
  placeholder = "Ask anything…",
  maxRows = 8,
  disabled = false,
  leading,
  trailing,
  hint,
  autoFocus = false,
  radius = "lg",
  className = "",
  "aria-label": ariaLabel = "Message",
}: PromptInputProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0 && !disabled && !streaming;

  // Auto-size: reset to one row, then grow to content, capped at maxRows.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const line = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const max = line * maxRows;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
    el.style.overflowY = el.scrollHeight > max ? "auto" : "hidden";
  }, [value, maxRows]);

  useEffect(() => {
    if (!streaming) ref.current?.focus({ preventScroll: true });
  }, [streaming]);

  const submit = () => {
    if (!canSend) return;
    onSubmit(value.trim());
  };

  return (
    <div className={`w-full ${className}`} style={{ fontFamily: "var(--ui-font)" }}>
      <div
        className="flex flex-col transition-[box-shadow] ring-2 ring-transparent focus-within:ring-(--ui-primary)/35"
        style={{
          ...getRadiusStyle(radius),
          backgroundColor: "var(--surface)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0,
        }}
      >
        <textarea
          ref={ref}
          rows={1}
          value={value}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-label={ariaLabel}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              submit();
            }
          }}
          className="w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm leading-6 outline-none placeholder:text-(--text-muted) disabled:opacity-50"
          style={{ color: "var(--text)", caretColor: "var(--ui-primary)" }}
        />
        <div className="flex items-center gap-2 px-2 pb-2">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">{leading}</div>
          {trailing}
          {streaming ? (
            <button
              type="button"
              onClick={onStop}
              aria-label="Stop generating"
              className="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35"
              style={{ backgroundColor: "var(--text)", color: "var(--bg)" }}
            >
              <Square size={12} fill="currentColor" />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!canSend}
              aria-label="Send message"
              className="flex size-8 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35 disabled:cursor-not-allowed"
              style={{
                background: canSend ? "var(--ui-primary-bg)" : "var(--bg-soft)",
                color: canSend ? "#ffffff" : "var(--text-muted)",
              }}
            >
              <ArrowUp size={15} />
            </button>
          )}
        </div>
      </div>
      {hint && <p className="mt-1.5 text-center text-[10px] text-(--text-muted)">{hint}</p>}
    </div>
  );
};
