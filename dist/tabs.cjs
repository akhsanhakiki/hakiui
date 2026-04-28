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

// src/components/ui/tabs.tsx
var tabs_exports = {};
__export(tabs_exports, {
  Tabs: () => Tabs
});
module.exports = __toCommonJS(tabs_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var Tabs = ({
  items
}) => {
  const [active, setActive] = (0, import_react.useState)(items[0]?.id ?? "");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex w-full border-b border-(--border)", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        onClick: () => setActive(item.id),
        className: `-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${active === item.id ? "border-(--ui-primary) text-(--text)" : "border-transparent text-(--text-muted) hover:text-(--text)"}`,
        children: item.label
      },
      item.id
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-2 py-2 text-(--text)", children: items.find((i) => i.id === active)?.content })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tabs
});
//# sourceMappingURL=tabs.cjs.map