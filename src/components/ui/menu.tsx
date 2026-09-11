import React, { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";
import { Kbd } from "./kbd";

export type MenuItem =
  | {
      label: string;
      description?: string;
      icon?: ReactNode;
      /** Shortcut caps, e.g. ["⌘", "N"]. */
      shortcut?: string[];
      danger?: boolean;
      disabled?: boolean;
      onSelect: () => void;
    }
  | { heading: string }
  | { separator: true };

export interface MenuProps {
  items: MenuItem[];
  /** Renders the trigger; spread `props` onto a button-like element. */
  trigger: (props: {
    ref: React.Ref<HTMLButtonElement>;
    onClick: () => void;
    "aria-haspopup": "menu";
    "aria-expanded": boolean;
    "aria-controls": string;
  }) => ReactNode;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  radius?: Radius;
  className?: string;
}

const isAction = (i: MenuItem): i is Extract<MenuItem, { onSelect: () => void }> => "onSelect" in i;

/**
 * An action menu — the "…" on a list row, the file menu, the account menu.
 * Keyboard: arrows move, Enter/Space selects, Escape closes; outside clicks
 * close. Rendered in place (absolute), so put it where it can overflow.
 */
export const Menu = ({ items, trigger, placement = "bottom-end", radius = "md", className = "" }: MenuProps) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const actions = items.map((it, i) => (isAction(it) && !it.disabled ? i : -1)).filter((i) => i >= 0);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) setIndex(actions[0] ?? -1);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const move = (dir: 1 | -1) => {
    if (actions.length === 0) return;
    const at = actions.indexOf(index);
    const next = actions[(at + dir + actions.length) % actions.length];
    setIndex(next);
  };

  const vertical = placement.startsWith("top") ? "bottom-full mb-1" : "top-full mt-1";
  const horizontal = placement.endsWith("end") ? "right-0" : "left-0";

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      {trigger({
        ref: triggerRef,
        onClick: () => setOpen((o) => !o),
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": id,
      })}
      {open && (
        <div
          id={id}
          role="menu"
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
            else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
            else if ((e.key === "Enter" || e.key === " ") && index >= 0) {
              e.preventDefault();
              const it = items[index];
              if (isAction(it)) { it.onSelect(); setOpen(false); }
            }
          }}
          ref={(el) => el?.focus()}
          className={`absolute z-50 min-w-48 p-1 shadow-lg outline-none ${vertical} ${horizontal}`}
          style={{
            ...getRadiusStyle(radius),
            fontFamily: "var(--ui-font)",
            backgroundColor: "var(--surface)",
            border: "0.5px solid var(--border)",
            outline: "0.5px solid var(--border)",
            outlineOffset: 0,
          }}
        >
          {items.map((it, i) => {
            if ("separator" in it) return <div key={i} role="separator" className="my-1 h-px" style={{ background: "var(--border)" }} />;
            if ("heading" in it) return <div key={i} className="px-2 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)">{it.heading}</div>;
            const focused = i === index;
            return (
              <button
                key={i}
                type="button"
                role="menuitem"
                disabled={it.disabled}
                tabIndex={-1}
                onMouseEnter={() => setIndex(i)}
                onClick={() => { it.onSelect(); setOpen(false); }}
                className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  backgroundColor: focused ? "var(--hover)" : "transparent",
                  color: it.danger ? "var(--ui-danger, #D03B3B)" : "var(--text)",
                }}
              >
                {it.icon && <span className="shrink-0 text-(--text-muted)" style={it.danger ? { color: "inherit" } : undefined}>{it.icon}</span>}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{it.label}</span>
                  {it.description && <span className="block truncate text-[11px] text-(--text-muted)">{it.description}</span>}
                </span>
                {it.shortcut && <Kbd keys={it.shortcut} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
