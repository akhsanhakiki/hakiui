import React, { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface ModelOption {
  value: string;
  label: string;
  description?: string;
  /** Short tag shown next to the label, e.g. "Fast", "Pro". */
  badge?: string;
  disabled?: boolean;
}

export interface ModelSelectorProps {
  options: ModelOption[];
  value: string;
  onChange: (value: string) => void;
  /** Menu opens upward — the default inside a bottom-anchored PromptInput. */
  placement?: "top" | "bottom";
  icon?: ReactNode;
  size?: "sm" | "md";
  radius?: Radius;
  disabled?: boolean;
  className?: string;
}

/**
 * A compact model picker for a composer toolbar: a chip-sized trigger and a
 * list with descriptions and a check on the current model. Keyboard: arrows,
 * Enter, Escape. Rendered in place so it sits inside the composer.
 */
export const ModelSelector = ({
  options,
  value,
  onChange,
  placement = "top",
  icon,
  size = "sm",
  radius = "full",
  disabled = false,
  className = "",
}: ModelSelectorProps) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (o: ModelOption) => {
    if (o.disabled) return;
    onChange(o.value);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`} style={{ fontFamily: "var(--ui-font)" }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        className={`inline-flex items-center gap-1.5 font-medium transition-colors hover:bg-(--hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35 disabled:opacity-50 ${size === "sm" ? "h-7 px-2 text-[11px]" : "h-8 px-2.5 text-xs"}`}
        style={{ ...getRadiusStyle(radius), color: "var(--text)", backgroundColor: "var(--bg-soft)", border: "0.5px solid var(--border)" }}
      >
        <span className="text-(--ui-primary)">{icon ?? <Sparkles size={size === "sm" ? 12 : 13} />}</span>
        {current?.label ?? "Model"}
        <ChevronDown size={12} className={`text-(--text-muted) transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          id={id}
          role="listbox"
          tabIndex={-1}
          ref={(el) => el?.focus()}
          aria-activedescendant={`${id}-${index}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => (i + 1) % options.length); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => (i - 1 + options.length) % options.length); }
            else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(options[index]); }
          }}
          className={`absolute left-0 z-50 m-0 w-64 list-none p-1 shadow-lg outline-none ${placement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5"}`}
          style={{ ...getRadiusStyle("md"), backgroundColor: "var(--surface)", border: "0.5px solid var(--border)", outline: "0.5px solid var(--border)", outlineOffset: 0 }}
        >
          {options.map((o, i) => {
            const selected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${id}-${i}`}
                role="option"
                aria-selected={selected}
                aria-disabled={o.disabled}
                onMouseEnter={() => setIndex(i)}
                onClick={() => pick(o)}
                className={`flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-xs ${o.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                style={{ backgroundColor: i === index ? "var(--hover)" : "transparent", color: "var(--text)" }}
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="font-medium">{o.label}</span>
                    {o.badge && (
                      <span className="rounded-full px-1.5 text-[10px] font-medium" style={{ backgroundColor: "color-mix(in srgb, var(--ui-primary) 12%, transparent)", color: "var(--ui-primary)" }}>
                        {o.badge}
                      </span>
                    )}
                  </span>
                  {o.description && <span className="mt-0.5 block text-[11px] leading-4 text-(--text-muted)">{o.description}</span>}
                </span>
                {selected && <Check size={14} className="mt-0.5 shrink-0 text-(--ui-primary)" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
