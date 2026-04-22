// src/components/ui/radio.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Radio = ({
  checked,
  onChange,
  children
}) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer group w-fit", children: [
  /* @__PURE__ */ jsx("div", { className: `w-5 h-5 rounded-full flex items-center justify-center transition-colors ${!checked ? "border-2 border-[#27272a] group-hover:border-gray-400" : ""}`, style: checked ? { background: "var(--ui-primary-bg)" } : {}, children: checked && /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-white" }) }),
  /* @__PURE__ */ jsx("input", { type: "radio", className: "hidden", checked, onChange }),
  children && /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-300 select-none", children })
] });

export {
  Radio
};
//# sourceMappingURL=chunk-GFKVLWIE.js.map