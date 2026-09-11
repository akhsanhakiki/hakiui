import React, { type ReactNode } from "react";
import { X } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface ChipProps {
  children: ReactNode;
  /** Renders as a button when set. */
  onClick?: () => void;
  /** Shows a remove affordance and renders it as a second button. */
  onRemove?: () => void;
  selected?: boolean;
  disabled?: boolean;
  size?: "sm" | "md";
  color?: "primary" | "neutral";
  icon?: ReactNode;
  radius?: Radius;
  className?: string;
}

/**
 * An interactive tag: a suggestion, a filter, a selected option. Unlike
 * Badge it is meant to be clicked, so it has hover, selected and disabled
 * states and an optional remove button.
 */
export const Chip = ({
  children,
  onClick,
  onRemove,
  selected = false,
  disabled = false,
  size = "md",
  color = "neutral",
  icon,
  radius = "full",
  className = "",
}: ChipProps) => {
  const accent = color === "primary" || selected;
  const base = accent ? "var(--ui-primary)" : "var(--text)";
  const shell: React.CSSProperties = {
    ...getRadiusStyle(radius),
    fontFamily: "var(--ui-font)",
    color: accent ? "var(--ui-primary)" : "var(--text)",
    backgroundColor: selected
      ? `color-mix(in srgb, ${base} 12%, transparent)`
      : "var(--bg-soft)",
    border: `0.5px solid ${selected ? `color-mix(in srgb, ${base} 45%, transparent)` : "var(--border)"}`,
  };
  const sizing = size === "sm" ? "h-6 px-2 text-[11px] gap-1" : "h-7 px-2.5 text-xs gap-1.5";
  const Tag = onClick ? "button" : "span";
  return (
    <span
      className={`inline-flex items-center overflow-hidden ${className}`}
      style={shell}
    >
      <Tag
        type={onClick ? "button" : undefined}
        onClick={onClick}
        disabled={onClick ? disabled : undefined}
        aria-pressed={onClick && selected ? true : undefined}
        className={`inline-flex items-center font-medium transition-colors ${sizing} ${onClick ? "cursor-pointer hover:bg-(--hover) disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35" : ""}`}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </Tag>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          aria-label="Remove"
          className="flex h-full items-center border-l border-(--border) px-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) disabled:opacity-50"
        >
          <X size={size === "sm" ? 11 : 12} />
        </button>
      )}
    </span>
  );
};
