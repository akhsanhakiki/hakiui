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

// src/components/ui/radio.tsx
var radio_exports = {};
__export(radio_exports, {
  Radio: () => Radio
});
module.exports = __toCommonJS(radio_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var Radio = ({
  checked,
  onChange,
  children
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer group w-fit", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-5 h-5 rounded-full flex items-center justify-center transition-colors ${!checked ? "border-2 border-[#27272a] group-hover:border-gray-400" : ""}`, style: checked ? { background: "var(--ui-primary-bg)" } : {}, children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-white" }) }),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "radio", className: "hidden", checked, onChange }),
  children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-sm text-gray-300 select-none", children })
] });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Radio
});
//# sourceMappingURL=radio.cjs.map