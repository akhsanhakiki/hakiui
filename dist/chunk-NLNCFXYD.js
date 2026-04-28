import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/table.tsx
import { jsx } from "react/jsx-runtime";
var Table = ({
  children,
  radius = "lg"
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: "w-full overflow-hidden border border-(--border) bg-(--surface)",
    style: getRadiusStyle(radius),
    children: /* @__PURE__ */ jsx("table", { className: "w-full text-left border-collapse", children })
  }
);
var TableHeader = ({ children }) => /* @__PURE__ */ jsx("thead", { className: "bg-(--bg-soft) text-(--text-muted) text-sm", children: /* @__PURE__ */ jsx("tr", { className: "border-b border-(--border)", children }) });
var TableColumn = ({ children }) => /* @__PURE__ */ jsx("th", { className: "px-4 py-3 font-medium font-sans", children });
var TableBody = ({ children }) => /* @__PURE__ */ jsx("tbody", { className: "text-sm text-(--text)", children });
var TableRow = ({ children }) => /* @__PURE__ */ jsx("tr", { className: "border-b border-(--border) transition-colors hover:bg-(--hover) last:border-0", children });
var TableCell = ({ children }) => /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children });

export {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
};
//# sourceMappingURL=chunk-NLNCFXYD.js.map