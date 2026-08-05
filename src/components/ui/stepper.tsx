import React, { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface StepperProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  labelPlacement?: "top" | "left";
  size?: "sm" | "md" | "lg";
  radius?: Radius;
  disabled?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
  "aria-label"?: string;
}

const SIZE_STYLES = {
  sm: { height: 28, button: 26, font: "text-xs", icon: 12, minW: 32 },
  md: { height: 36, button: 34, font: "text-sm", icon: 14, minW: 40 },
  lg: { height: 44, button: 42, font: "text-base", icon: 16, minW: 48 },
} as const;

export const Stepper = ({
  value,
  defaultValue = 0,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  label,
  labelPlacement = "top",
  size = "md",
  radius = "md",
  disabled = false,
  formatValue = (v) => String(v),
  className = "",
  "aria-label": ariaLabel,
}: StepperProps) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = value ?? internalValue;
  const s = SIZE_STYLES[size];

  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  const commit = (next: number) => {
    const clamped = clamp(next);
    if (value === undefined) setInternalValue(clamped);
    onChange?.(clamped);
  };

  const decrement = () => commit(current - step);
  const increment = () => commit(current + step);

  const atMin = current <= min;
  const atMax = current >= max;

  const control = (
    <div
      className={`inline-flex items-stretch overflow-hidden ring-2 ring-transparent transition-[box-shadow,ring-color] focus-within:ring-(--ui-primary)/35 focus-within:border-(--ui-primary) ${disabled ? "opacity-50" : ""} ${className}`}
      style={{
        ...getRadiusStyle(radius),
        height: s.height,
        backgroundColor: "var(--bg-soft)",
        border: "0.5px solid var(--border)",
        outline: "0.5px solid var(--border)",
        outlineOffset: 0,
        fontFamily: "var(--ui-font)",
      }}
    >
      <button
        type="button"
        aria-label="Decrease value"
        tabIndex={-1}
        disabled={disabled || atMin}
        onClick={decrement}
        className="flex shrink-0 cursor-pointer items-center justify-center text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        style={{ width: s.button }}
      >
        <Minus size={s.icon} />
      </button>
      <div
        role="spinbutton"
        tabIndex={disabled ? -1 : 0}
        aria-valuenow={current}
        aria-valuemin={Number.isFinite(min) ? min : undefined}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        aria-label={ariaLabel ?? label}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "ArrowUp") {
            e.preventDefault();
            increment();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            decrement();
          }
        }}
        className={`flex flex-1 select-none items-center justify-center tabular-nums text-(--text) outline-none ${s.font}`}
        style={{
          minWidth: s.minW,
          borderLeft: "0.5px solid var(--border)",
          borderRight: "0.5px solid var(--border)",
        }}
      >
        {formatValue(current)}
      </div>
      <button
        type="button"
        aria-label="Increase value"
        tabIndex={-1}
        disabled={disabled || atMax}
        onClick={increment}
        className="flex shrink-0 cursor-pointer items-center justify-center text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        style={{ width: s.button }}
      >
        <Plus size={s.icon} />
      </button>
    </div>
  );

  if (!label) return control;

  return (
    <div
      className={`flex ${labelPlacement === "left" ? "w-fit flex-row items-center gap-4" : "w-full flex-col gap-1.5"}`}
    >
      <label htmlFor={id} className="whitespace-nowrap text-sm font-medium text-(--text)">
        {label}
      </label>
      {control}
    </div>
  );
};
