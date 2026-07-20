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

// src/components/ui/breadcrumbs.tsx
var breadcrumbs_exports = {};
__export(breadcrumbs_exports, {
  Breadcrumbs: () => Breadcrumbs
});
module.exports = __toCommonJS(breadcrumbs_exports);
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var Breadcrumbs = ({
  items,
  separator,
  className = ""
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
  "nav",
  {
    "aria-label": "Breadcrumb",
    className,
    style: { fontFamily: "var(--ui-font)" },
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "m-0 flex list-none flex-wrap items-center gap-1.5 p-0", children: items.map((item, i) => {
      const isLast = i === items.length - 1;
      const content = isLast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-current": "page", className: "font-medium text-(--text)", children: item.label }) : item.href || item.onClick ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "a",
        {
          href: item.href ?? "#",
          onClick: (e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          },
          className: "text-(--text-muted) transition-colors hover:text-(--text) hover:underline",
          children: item.label
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-(--text-muted)", children: item.label });
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "flex items-center gap-1.5 text-sm", children: [
        content,
        !isLast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": true, className: "flex text-(--text-muted) opacity-60", children: separator ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { size: 14 }) })
      ] }, i);
    }) })
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Breadcrumbs
});
//# sourceMappingURL=breadcrumbs.cjs.map