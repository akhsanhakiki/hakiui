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

// src/components/ui/thinking-steps.tsx
var thinking_steps_exports = {};
__export(thinking_steps_exports, {
  ThinkingSteps: () => ThinkingSteps
});
module.exports = __toCommonJS(thinking_steps_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var ThinkingSteps = ({ steps, streaming = false, defaultOpen = true, label, className = "" }) => {
  const [open, setOpen] = (0, import_react.useState)(defaultOpen);
  const title = label ?? (streaming ? "Thinking\u2026" : `Thought for ${steps.length} step${steps.length === 1 ? "" : "s"}`);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className, style: { fontFamily: "var(--ui-font)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes hk-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.hk-shimmer{animation:none!important}}` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        "aria-expanded": open,
        className: "flex items-center gap-1.5 rounded text-[11px] font-medium text-(--text-muted) transition-colors hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Brain, { size: 12, className: streaming ? "text-(--ui-primary)" : void 0 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: streaming ? "hk-shimmer bg-clip-text text-transparent" : void 0,
              style: streaming ? {
                backgroundImage: "linear-gradient(90deg, var(--text-muted) 0%, var(--text) 50%, var(--text-muted) 100%)",
                backgroundSize: "200% 100%",
                animation: "hk-shimmer 1.6s linear infinite"
              } : void 0,
              children: title
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { size: 12, className: `transition-transform ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    open && steps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "mt-1.5 space-y-1 pl-3", style: { borderLeft: "2px solid var(--border)" }, "aria-live": streaming ? "polite" : void 0, children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "text-[11px] leading-relaxed text-(--text-muted)", children: s }, i)) })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThinkingSteps
});
//# sourceMappingURL=thinking-steps.cjs.map