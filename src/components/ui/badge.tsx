import React, { type ReactNode } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export type BadgeColor =
  | "primary"
  | "neutral"
  | "success"
  | "warning"
  | "danger";
export type BadgeVariant = "solid" | "soft" | "outline";

export interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  radius?: Radius;
  className?: string;
}

const COLOR_HEX: Record<BadgeColor, string> = {
  primary: "var(--ui-primary)",
  neutral: "var(--text-muted)",
  success: "#0CA30C",
  warning: "#B87A00",
  danger: "#D03B3B",
};

export const Badge = ({
  children,
  color = "primary",
  variant = "soft",
  size = "md",
  radius = "full",
  className = "",
}: BadgeProps) => {
  const base = COLOR_HEX[color];

  const variantStyle: React.CSSProperties =
    variant === "solid"
      ? { backgroundColor: base, color: "#ffffff" }
      : variant === "outline"
        ? {
            backgroundColor: "transparent",
            color: base,
            border: `1px solid color-mix(in srgb, ${base} 55%, transparent)`,
          }
        : {
            backgroundColor: `color-mix(in srgb, ${base} 13%, transparent)`,
            color: base,
          };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-0.5 text-xs"} ${className}`}
      style={{
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        ...variantStyle,
      }}
    >
      {children}
    </span>
  );
};
