import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/table.tsx
import { jsx } from "react/jsx-runtime";
var Table = ({ children, radius = "lg" }) => /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden border border-[#27272a] bg-[#18181b]", style: getRadiusStyle(radius), children: /* @__PURE__ */ jsx("table", { className: "w-full text-left border-collapse", children }) });
var TableHeader = ({ children }) => /* @__PURE__ */ jsx("thead", { className: "bg-[#27272a]/40 text-gray-400 text-sm", children: /* @__PURE__ */ jsx("tr", { className: "border-b border-[#27272a]", children }) });
var TableColumn = ({ children }) => /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium font-sans", children });
var TableBody = ({ children }) => /* @__PURE__ */ jsx("tbody", { className: "text-sm text-gray-300", children });
var TableRow = ({ children }) => /* @__PURE__ */ jsx("tr", { className: "border-b border-[#27272a] last:border-0 hover:bg-[#27272a]/20 transition-colors", children });
var TableCell = ({ children }) => /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children });

export {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
};
//# sourceMappingURL=chunk-K3HWB2JW.js.map