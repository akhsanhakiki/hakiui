// src/components/ui/radio.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Radio = ({
  checked,
  onChange,
  children
}) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer group w-fit", children: [
  /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex h-5 w-5 items-center justify-center rounded-full transition-colors ${!checked ? "border-2 border-(--border) group-hover:border-(--ui-primary)" : ""}`,
      style: checked ? { background: "var(--ui-primary-bg)" } : {},
      children: checked && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white" })
    }
  ),
  /* @__PURE__ */ jsx(
    "input",
    {
      type: "radio",
      className: "hidden",
      checked,
      onChange
    }
  ),
  children && /* @__PURE__ */ jsx("span", { className: "select-none text-sm text-(--text)", children })
] });

export {
  Radio
};
//# sourceMappingURL=chunk-E2XFGGJH.js.map