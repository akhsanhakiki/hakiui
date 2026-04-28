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

// src/components/ui/switch.tsx
var switch_exports = {};
__export(switch_exports, {
  Switch: () => Switch
});
module.exports = __toCommonJS(switch_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var Switch = ({
  checked,
  onChange,
  size = "md"
}) => {
  const sizes = {
    sm: { w: "w-8", h: "h-4", circle: "w-3 h-3", translate: "translate-x-4" },
    md: { w: "w-10", h: "h-5", circle: "w-4 h-4", translate: "translate-x-5" },
    lg: { w: "w-12", h: "h-6", circle: "w-5 h-5", translate: "translate-x-6" }
  };
  const current = sizes[size];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center cursor-pointer", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: `relative ${current.w} ${current.h} rounded-full transition-colors ${!checked ? "bg-(--input)" : ""}`,
        style: checked ? { background: "var(--ui-primary-bg)" } : {},
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: `absolute top-0.5 left-0.5 bg-white rounded-full transition-transform ${current.circle} ${checked ? current.translate : "translate-x-0"}`
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        type: "checkbox",
        className: "hidden",
        checked,
        onChange: (e) => onChange(e.target.checked)
      }
    )
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Switch
});
//# sourceMappingURL=switch.cjs.map