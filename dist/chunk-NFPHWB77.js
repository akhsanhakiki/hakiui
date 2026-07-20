import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/badge.tsx
import { jsx } from "react/jsx-runtime";
var COLOR_HEX = {
  primary: "var(--ui-primary)",
  neutral: "var(--text-muted)",
  success: "#0CA30C",
  warning: "#B87A00",
  danger: "#D03B3B"
};
var Badge = ({
  children,
  color = "primary",
  variant = "soft",
  size = "md",
  radius = "full",
  className = ""
}) => {
  const base = COLOR_HEX[color];
  const variantStyle = variant === "solid" ? { backgroundColor: base, color: "#ffffff" } : variant === "outline" ? {
    backgroundColor: "transparent",
    color: base,
    border: `1px solid color-mix(in srgb, ${base} 55%, transparent)`
  } : {
    backgroundColor: `color-mix(in srgb, ${base} 13%, transparent)`,
    color: base
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `inline-flex items-center gap-1 font-medium ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-0.5 text-xs"} ${className}`,
      style: {
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        ...variantStyle
      },
      children
    }
  );
};

export {
  Badge
};
//# sourceMappingURL=chunk-NFPHWB77.js.map