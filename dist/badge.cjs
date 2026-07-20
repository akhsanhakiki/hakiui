"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/badge.tsx
var badge_exports = {};
__export(badge_exports, {
  Badge: () => Badge
});
module.exports = __toCommonJS(badge_exports);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/badge.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Badge
});
//# sourceMappingURL=badge.cjs.map