import React from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export type ProgressColor = "primary" | "success" | "warning" | "danger";

export interface ProgressProps {
  /** 0–100. Ignored when `indeterminate` is set. */
  value?: number;
  size?: "sm" | "md" | "lg";
  color?: ProgressColor;
  label?: string;
  /** Show the percentage next to the label. */
  showValue?: boolean;
  indeterminate?: boolean;
  radius?: Radius;
  className?: string;
}

const COLOR_HEX: Record<ProgressColor, string> = {
  primary: "var(--ui-primary-bg)",
  success: "#0CA30C",
  warning: "#B87A00",
  danger: "#D03B3B",
};

const HEIGHTS = { sm: "h-1", md: "h-2", lg: "h-3" } as const;

export const Progress = ({
  value = 0,
  size = "md",
  color = "primary",
  label,
  showValue = false,
  indeterminate = false,
  radius = "full",
  className = "",
}: ProgressProps) => {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`w-full ${className}`}
      style={{ fontFamily: "var(--ui-font)" }}
    >
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between gap-3">
          {label && (
            <span className="text-sm font-medium text-(--text)">{label}</span>
          )}
          {showValue && !indeterminate && (
            <span className="text-xs tabular-nums text-(--text-muted)">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
        aria-label={label}
        className={`w-full overflow-hidden ${HEIGHTS[size]}`}
        style={{
          ...getRadiusStyle(radius),
          backgroundColor: "var(--hover)",
        }}
      >
        {indeterminate ? (
          <>
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "@keyframes hk-progress-slide{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}",
              }}
            />
            <div
              className="h-full w-2/5"
              style={{
                ...getRadiusStyle(radius),
                background: COLOR_HEX[color],
                animation: "hk-progress-slide 1.2s ease-in-out infinite",
              }}
            />
          </>
        ) : (
          <div
            className="h-full transition-[width] duration-300 ease-out"
            style={{
              ...getRadiusStyle(radius),
              width: `${clamped}%`,
              background: COLOR_HEX[color],
            }}
          />
        )}
      </div>
    </div>
  );
};
