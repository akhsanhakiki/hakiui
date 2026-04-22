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

// src/components/ui/pagination.tsx
var pagination_exports = {};
__export(pagination_exports, {
  Pagination: () => Pagination
});
module.exports = __toCommonJS(pagination_exports);
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var Pagination = ({
  total,
  page,
  onChange
}) => {
  const getPages = () => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", total];
    if (page >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", page - 1, page, page + 1, "...", total];
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 select-none", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => onChange(Math.max(1, page - 1)),
        disabled: page === 1,
        className: "flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-transparent border-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronLeft, { size: 16 }),
          " Previous"
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-1", children: getPages().map((p, i) => {
      if (p === "...") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-8 flex items-center justify-center text-gray-500", children: "..." }, `ellipsis-${i}`);
      const isActive = p === page;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          onClick: () => onChange(p),
          className: `w-8 h-8 flex items-center justify-center transition-colors text-sm ${isActive ? "text-white rounded-full" : "bg-transparent hover:bg-[#27272a] text-gray-300 rounded-full"}`,
          style: isActive ? { background: "var(--ui-primary-bg)" } : {},
          children: p
        },
        `page-${p}`
      );
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => onChange(Math.min(total, page + 1)),
        disabled: page === total,
        className: "flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-transparent border-0",
        children: [
          "Next ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { size: 16 })
        ]
      }
    )
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Pagination
});
//# sourceMappingURL=pagination.cjs.map