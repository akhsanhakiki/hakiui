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

// src/components/ui/tool-calls.tsx
var tool_calls_exports = {};
__export(tool_calls_exports, {
  ToolCalls: () => ToolCalls
});
module.exports = __toCommonJS(tool_calls_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var STATUS = {
  running: { color: "var(--ui-primary)", Icon: import_lucide_react.Loader2, spin: true },
  done: { color: "var(--ui-success, #0CA30C)", Icon: import_lucide_react.Check, spin: false },
  error: { color: "var(--ui-danger, #D03B3B)", Icon: import_lucide_react.AlertCircle, spin: false }
};
var ToolCalls = ({ calls, defaultOpen = false, label = "Tools used", className = "" }) => {
  const [open, setOpen] = (0, import_react.useState)(defaultOpen);
  if (calls.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className, style: { fontFamily: "var(--ui-font)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-1.5", children: [
      calls.map((c, i) => {
        const s = STATUS[c.status];
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "span",
          {
            className: "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
            style: { color: s.color, backgroundColor: `color-mix(in srgb, ${s.color} 12%, transparent)` },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.Icon, { size: 11, className: s.spin ? "animate-spin motion-reduce:animate-none" : void 0 }),
              c.name
            ]
          },
          `${c.name}-${i}`
        );
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          onClick: () => setOpen((o) => !o),
          "aria-expanded": open,
          className: "ml-1 inline-flex items-center gap-1 rounded text-[11px] text-(--text-muted) transition-colors hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Wrench, { size: 11 }),
            " ",
            label,
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { size: 11, className: `transition-transform ${open ? "rotate-180" : ""}` })
          ]
        }
      )
    ] }),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "mt-2 space-y-1.5 pl-3", style: { borderLeft: "2px solid var(--border)" }, children: calls.map((c, i) => {
      const s = STATUS[c.status];
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "text-[11px] leading-relaxed", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-(--text)", children: c.name }),
          c.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-(--text-muted)", children: [
            "\xB7 ",
            c.duration
          ] })
        ] }),
        c.detail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 block font-mono text-[10.5px]", style: { color: c.status === "error" ? s.color : "var(--text-muted)" }, children: c.detail })
      ] }, `${c.name}-${i}`);
    }) })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToolCalls
});
//# sourceMappingURL=tool-calls.cjs.map