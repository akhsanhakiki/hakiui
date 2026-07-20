import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/progress.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `w-full ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        (label || showValue) && /* @__PURE__ */ jsxs("div", { className: "mb-1.5 flex items-center justify-between gap-3", children: [
          label && /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-(--text)", children: label }),
          showValue && !indeterminate && /* @__PURE__ */ jsxs("span", { className: "text-xs tabular-nums text-(--text-muted)", children: [
            Math.round(clamped),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx(
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
            children: indeterminate ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "style",
                {
                  dangerouslySetInnerHTML: {
                    __html: "@keyframes hk-progress-slide{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}"
                  }
                }
              ),
              /* @__PURE__ */ jsx(
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
            ] }) : /* @__PURE__ */ jsx(
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

export {
  Progress
};
//# sourceMappingURL=chunk-B6LJ5F4W.js.map