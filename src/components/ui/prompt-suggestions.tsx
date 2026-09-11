import React, { type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface PromptSuggestion {
  title: string;
  prompt: string;
  category?: string;
  icon?: ReactNode;
}

export interface PromptSuggestionsProps {
  items: PromptSuggestion[];
  onPick: (prompt: string) => void;
  /** Grid columns from the sm breakpoint. */
  columns?: 1 | 2 | 3;
  radius?: Radius;
  className?: string;
}

/**
 * The empty-state starters of an AI chat: a grid of prompt cards, each
 * with a title, the full prompt and an optional category. Picking one hands
 * the prompt to the composer.
 */
export const PromptSuggestions = ({ items, onPick, columns = 2, radius = "md", className = "" }: PromptSuggestionsProps) => (
  <div
    className={`grid gap-2 ${columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : ""} ${className}`}
    style={{ fontFamily: "var(--ui-font)" }}
  >
    {items.map((s) => (
      <button
        key={s.title}
        type="button"
        onClick={() => onPick(s.prompt)}
        className="group flex flex-col p-3 text-left transition-colors hover:border-(--ui-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35"
        style={{ ...getRadiusStyle(radius), backgroundColor: "var(--surface)", border: "0.5px solid var(--border)", color: "var(--text)" }}
      >
        <span className="flex items-start justify-between gap-2">
          <span className="flex items-center gap-1.5 text-xs font-medium">
            {s.icon && <span className="text-(--ui-primary)">{s.icon}</span>}
            {s.title}
          </span>
          <ArrowUpRight size={13} className="mt-0.5 shrink-0 text-(--text-muted) transition-colors group-hover:text-(--ui-primary)" />
        </span>
        <span className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-(--text-muted)">{s.prompt}</span>
        {s.category && (
          <span className="mt-2 inline-flex w-fit rounded-full px-1.5 py-0.5 text-[10px] font-medium" style={{ backgroundColor: "var(--bg-soft)", color: "var(--text-muted)" }}>
            {s.category}
          </span>
        )}
      </button>
    ))}
  </div>
);
