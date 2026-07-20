import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/alert.tsx
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var VARIANT_META = {
  info: { icon: Info, color: "var(--ui-primary)" },
  success: { icon: CheckCircle2, color: "#0CA30C" },
  warning: { icon: AlertTriangle, color: "#B87A00" },
  danger: { icon: XCircle, color: "#D03B3B" }
};
var Alert = ({
  variant = "info",
  title,
  children,
  radius = "md",
  onClose,
  className = ""
}) => {
  const meta = VARIANT_META[variant];
  const Icon = meta.icon;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "alert",
      className: `flex w-full items-start gap-3 px-4 py-3 ${className}`,
      style: {
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        backgroundColor: `color-mix(in srgb, ${meta.color} 9%, var(--surface))`,
        border: `0.5px solid color-mix(in srgb, ${meta.color} 35%, var(--border))`,
        color: "var(--text)"
      },
      children: [
        /* @__PURE__ */ jsx(
          Icon,
          {
            size: 17,
            className: "mt-0.5 shrink-0",
            style: { color: meta.color },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          title && /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: title }),
          children && /* @__PURE__ */ jsx("div", { className: `text-sm text-(--text-muted) ${title ? "mt-0.5" : ""}`, children })
        ] }),
        onClose && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)",
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ jsx(XCircle, { size: 15 })
          }
        )
      ]
    }
  );
};

export {
  Alert
};
//# sourceMappingURL=chunk-27X3H6QQ.js.map