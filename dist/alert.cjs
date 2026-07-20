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

// src/components/ui/alert.tsx
var alert_exports = {};
__export(alert_exports, {
  Alert: () => Alert
});
module.exports = __toCommonJS(alert_exports);
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/alert.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var VARIANT_META = {
  info: { icon: import_lucide_react.Info, color: "var(--ui-primary)" },
  success: { icon: import_lucide_react.CheckCircle2, color: "#0CA30C" },
  warning: { icon: import_lucide_react.AlertTriangle, color: "#B87A00" },
  danger: { icon: import_lucide_react.XCircle, color: "#D03B3B" }
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Icon,
          {
            size: 17,
            className: "mt-0.5 shrink-0",
            style: { color: meta.color },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0 flex-1", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm font-medium", children: title }),
          children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `text-sm text-(--text-muted) ${title ? "mt-0.5" : ""}`, children })
        ] }),
        onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)",
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.XCircle, { size: 15 })
          }
        )
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Alert
});
//# sourceMappingURL=alert.cjs.map