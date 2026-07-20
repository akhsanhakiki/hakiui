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

// src/components/ui/spinner.tsx
var spinner_exports = {};
__export(spinner_exports, {
  Spinner: () => Spinner
});
module.exports = __toCommonJS(spinner_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var SIZES = { sm: 16, md: 22, lg: 30 };
var Spinner = ({
  size = "md",
  color = "primary",
  label = "Loading",
  className = ""
}) => {
  const px = SIZES[size];
  const stroke = color === "primary" ? "var(--ui-primary)" : "currentColor";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      role: "status",
      "aria-label": label,
      className: `inline-flex ${className}`,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "svg",
        {
          className: "animate-spin",
          width: px,
          height: px,
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": true,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "circle",
              {
                cx: "12",
                cy: "12",
                r: "10",
                stroke,
                strokeOpacity: "0.25",
                strokeWidth: "3"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                d: "M22 12a10 10 0 0 0-10-10",
                stroke,
                strokeWidth: "3",
                strokeLinecap: "round"
              }
            )
          ]
        }
      )
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Spinner
});
//# sourceMappingURL=spinner.cjs.map