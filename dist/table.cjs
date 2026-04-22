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

// src/components/ui/table.tsx
var table_exports = {};
__export(table_exports, {
  Table: () => Table,
  TableBody: () => TableBody,
  TableCell: () => TableCell,
  TableColumn: () => TableColumn,
  TableHeader: () => TableHeader,
  TableRow: () => TableRow
});
module.exports = __toCommonJS(table_exports);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/table.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Table = ({ children, radius = "lg" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full overflow-hidden border border-[#27272a] bg-[#18181b]", style: getRadiusStyle(radius), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", { className: "w-full text-left border-collapse", children }) });
var TableHeader = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { className: "bg-[#27272a]/40 text-gray-400 text-sm", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { className: "border-b border-[#27272a]", children }) });
var TableColumn = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-3 font-medium font-sans", children });
var TableBody = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { className: "text-sm text-gray-300", children });
var TableRow = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { className: "border-b border-[#27272a] last:border-0 hover:bg-[#27272a]/20 transition-colors", children });
var TableCell = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "px-4 py-3", children });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
});
//# sourceMappingURL=table.cjs.map