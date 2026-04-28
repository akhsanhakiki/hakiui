import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/checkbox.tsx
import { Check } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Checkbox = ({
  checked,
  onChange,
  children,
  radius = "sm"
}) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer group w-fit", children: [
  /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex h-5 w-5 items-center justify-center transition-colors ${!checked ? "border-2 border-(--border) group-hover:border-(--ui-primary)" : ""}`,
      style: {
        ...getRadiusStyle(radius),
        ...checked ? { background: "var(--ui-primary-bg)" } : {}
      },
      children: checked && /* @__PURE__ */ jsx(Check, { size: 14, className: "text-white" })
    }
  ),
  /* @__PURE__ */ jsx(
    "input",
    {
      type: "checkbox",
      className: "hidden",
      checked,
      onChange: (e) => onChange(e.target.checked)
    }
  ),
  children && /* @__PURE__ */ jsx("span", { className: "select-none text-sm text-(--text)", children })
] });

export {
  Checkbox
};
//# sourceMappingURL=chunk-VCAJ33UJ.js.map