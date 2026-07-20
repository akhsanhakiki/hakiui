import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/table.tsx
import { jsx } from "react/jsx-runtime";
var Table = ({
  children,
  radius = "lg",
  variant = "default"
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: "w-full overflow-hidden",
    style: {
      ...getRadiusStyle(variant === "rounded" ? "full" : radius),
      backgroundColor: "color-mix(in srgb, var(--bg-soft) 30%, transparent)",
      border: "0.5px solid var(--border)",
      outline: "0.5px solid var(--border)",
      outlineOffset: 0
    },
    children: /* @__PURE__ */ jsx("table", { className: "w-full text-left border-collapse", children })
  }
);
var TableHeader = ({ children }) => /* @__PURE__ */ jsx(
  "thead",
  {
    className: "text-(--text-muted) text-xs",
    style: {
      backgroundColor: "color-mix(in srgb, var(--bg-soft) 60%, transparent)"
    },
    children: /* @__PURE__ */ jsx("tr", { className: "border-b", style: { borderColor: "var(--border)" }, children })
  }
);
var TableColumn = ({ children }) => /* @__PURE__ */ jsx("th", { className: "px-4 py-2 font-medium font-sans", children });
var TableBody = ({ children }) => /* @__PURE__ */ jsx("tbody", { className: "text-sm text-(--text)", children });
var TableRow = ({ children }) => /* @__PURE__ */ jsx(
  "tr",
  {
    className: "border-b transition-colors hover:bg-(--hover) last:border-0",
    style: { borderColor: "var(--border)" },
    children
  }
);
var TableCell = ({ children }) => /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children });

export {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
};
//# sourceMappingURL=chunk-B2ZI32H3.js.map