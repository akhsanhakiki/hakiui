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

// src/components/ui/prompt-suggestions.tsx
var prompt_suggestions_exports = {};
__export(prompt_suggestions_exports, {
  PromptSuggestions: () => PromptSuggestions
});
module.exports = __toCommonJS(prompt_suggestions_exports);
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/prompt-suggestions.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PromptSuggestions = ({ items, onPick, columns = 2, radius = "md", className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "div",
  {
    className: `grid gap-2 ${columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : ""} ${className}`,
    style: { fontFamily: "var(--ui-font)" },
    children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => onPick(s.prompt),
        className: "group flex flex-col p-3 text-left transition-colors hover:border-(--ui-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
        style: { ...getRadiusStyle(radius), backgroundColor: "var(--surface)", border: "0.5px solid var(--border)", color: "var(--text)" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1.5 text-xs font-medium", children: [
              s.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-(--ui-primary)", children: s.icon }),
              s.title
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUpRight, { size: 13, className: "mt-0.5 shrink-0 text-(--text-muted) transition-colors group-hover:text-(--ui-primary)" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-(--text-muted)", children: s.prompt }),
          s.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 inline-flex w-fit rounded-full px-1.5 py-0.5 text-[10px] font-medium", style: { backgroundColor: "var(--bg-soft)", color: "var(--text-muted)" }, children: s.category })
        ]
      },
      s.title
    ))
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PromptSuggestions
});
//# sourceMappingURL=prompt-suggestions.cjs.map