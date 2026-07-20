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

// src/components/ui/progress.tsx
var progress_exports = {};
__export(progress_exports, {
  Progress: () => Progress
});
module.exports = __toCommonJS(progress_exports);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/progress.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var COLOR_HEX = {
  primary: "var(--ui-primary-bg)",
  success: "#0CA30C",
  warning: "#B87A00",
  danger: "#D03B3B"
};
var HEIGHTS = { sm: "h-1", md: "h-2", lg: "h-3" };
var Progress = ({
  value = 0,
  size = "md",
  color = "primary",
  label,
  showValue = false,
  indeterminate = false,
  radius = "full",
  className = ""
}) => {
  const clamped = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: `w-full ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        (label || showValue) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-1.5 flex items-center justify-between gap-3", children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm font-medium text-(--text)", children: label }),
          showValue && !indeterminate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-xs tabular-nums text-(--text-muted)", children: [
            Math.round(clamped),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": indeterminate ? void 0 : Math.round(clamped),
            "aria-label": label,
            className: `w-full overflow-hidden ${HEIGHTS[size]}`,
            style: {
              ...getRadiusStyle(radius),
              backgroundColor: "var(--hover)"
            },
            children: indeterminate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "style",
                {
                  dangerouslySetInnerHTML: {
                    __html: "@keyframes hk-progress-slide{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}"
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  className: "h-full w-2/5",
                  style: {
                    ...getRadiusStyle(radius),
                    background: COLOR_HEX[color],
                    animation: "hk-progress-slide 1.2s ease-in-out infinite"
                  }
                }
              )
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                className: "h-full transition-[width] duration-300 ease-out",
                style: {
                  ...getRadiusStyle(radius),
                  width: `${clamped}%`,
                  background: COLOR_HEX[color]
                }
              }
            )
          }
        )
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Progress
});
//# sourceMappingURL=progress.cjs.map