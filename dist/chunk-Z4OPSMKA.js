import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/stepper.tsx
import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var SIZE_STYLES = {
  sm: { height: 28, button: 26, font: "text-xs", icon: 12, minW: 32 },
  md: { height: 36, button: 34, font: "text-sm", icon: 14, minW: 40 },
  lg: { height: 44, button: 42, font: "text-base", icon: 16, minW: 48 }
};
var Stepper = ({
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
  "aria-label": ariaLabel
}) => {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = value ?? internalValue;
  const s = SIZE_STYLES[size];
  const clamp = (n) => Math.min(max, Math.max(min, n));
  const commit = (next) => {
    const clamped = clamp(next);
    if (value === void 0) setInternalValue(clamped);
    onChange?.(clamped);
  };
  const decrement = () => commit(current - step);
  const increment = () => commit(current + step);
  const atMin = current <= min;
  const atMax = current >= max;
  const control = /* @__PURE__ */ jsxs(
    "div",
    {
      className: `inline-flex items-stretch overflow-hidden ring-2 ring-transparent transition-[box-shadow,ring-color] focus-within:ring-(--ui-primary)/35 focus-within:border-(--ui-primary) ${disabled ? "opacity-50" : ""} ${className}`,
      style: {
        ...getRadiusStyle(radius),
        height: s.height,
        backgroundColor: "var(--bg-soft)",
        border: "0.5px solid var(--border)",
        outline: "0.5px solid var(--border)",
        outlineOffset: 0,
        fontFamily: "var(--ui-font)"
      },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": "Decrease value",
            tabIndex: -1,
            disabled: disabled || atMin,
            onClick: decrement,
            className: "flex shrink-0 cursor-pointer items-center justify-center text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
            style: { width: s.button },
            children: /* @__PURE__ */ jsx(Minus, { size: s.icon })
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            role: "spinbutton",
            tabIndex: disabled ? -1 : 0,
            "aria-valuenow": current,
            "aria-valuemin": Number.isFinite(min) ? min : void 0,
            "aria-valuemax": Number.isFinite(max) ? max : void 0,
            "aria-label": ariaLabel ?? label,
            onKeyDown: (e) => {
              if (disabled) return;
              if (e.key === "ArrowUp") {
                e.preventDefault();
                increment();
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                decrement();
              }
            },
            className: `flex flex-1 select-none items-center justify-center tabular-nums text-(--text) outline-none ${s.font}`,
            style: {
              minWidth: s.minW,
              borderLeft: "0.5px solid var(--border)",
              borderRight: "0.5px solid var(--border)"
            },
            children: formatValue(current)
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": "Increase value",
            tabIndex: -1,
            disabled: disabled || atMax,
            onClick: increment,
            className: "flex shrink-0 cursor-pointer items-center justify-center text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent",
            style: { width: s.button },
            children: /* @__PURE__ */ jsx(Plus, { size: s.icon })
          }
        )
      ]
    }
  );
  if (!label) return control;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex ${labelPlacement === "left" ? "w-fit flex-row items-center gap-4" : "w-full flex-col gap-1.5"}`,
      children: [
        /* @__PURE__ */ jsx("label", { htmlFor: id, className: "whitespace-nowrap text-sm font-medium text-(--text)", children: label }),
        control
      ]
    }
  );
};

export {
  Stepper
};
//# sourceMappingURL=chunk-Z4OPSMKA.js.map