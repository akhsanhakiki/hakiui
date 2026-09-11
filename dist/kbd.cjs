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

// src/components/ui/kbd.tsx
var kbd_exports = {};
__export(kbd_exports, {
  Kbd: () => Kbd
});
module.exports = __toCommonJS(kbd_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var Kbd = ({ keys, children, size = "sm", className = "" }) => {
  const caps = keys ?? (children !== void 0 ? [children] : []);
  const cap = size === "sm" ? "min-w-4 px-1 text-[10px] leading-4" : "min-w-5 px-1.5 text-[11px] leading-5";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-flex items-center gap-0.5 ${className}`, "aria-label": keys?.join(" "), children: caps.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "kbd",
    {
      className: `inline-flex items-center justify-center rounded font-medium tabular-nums ${cap}`,
      style: {
        fontFamily: "var(--ui-font)",
        color: "var(--text-muted)",
        backgroundColor: "var(--bg-soft)",
        border: "0.5px solid var(--border)",
        boxShadow: "inset 0 -1px 0 var(--border)"
      },
      children: k
    },
    i
  )) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Kbd
});
//# sourceMappingURL=kbd.cjs.map