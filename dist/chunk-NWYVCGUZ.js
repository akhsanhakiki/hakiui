// src/components/ui/switch.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Switch = ({
  checked,
  onChange,
  size = "md"
}) => {
  const sizes = {
    sm: { w: "w-8", h: "h-4", circle: "w-3 h-3", translate: "translate-x-4" },
    md: { w: "w-10", h: "h-5", circle: "w-4 h-4", translate: "translate-x-5" },
    lg: { w: "w-12", h: "h-6", circle: "w-5 h-5", translate: "translate-x-6" }
  };
  const current = sizes[size];
  return /* @__PURE__ */ jsxs("label", { className: "flex items-center cursor-pointer", children: [
    /* @__PURE__ */ jsx("div", { className: `relative ${current.w} ${current.h} rounded-full transition-colors ${!checked ? "bg-[#3f3f46]" : ""}`, style: checked ? { background: "var(--ui-primary-bg)" } : {}, children: /* @__PURE__ */ jsx("div", { className: `absolute top-0.5 left-0.5 bg-white rounded-full transition-transform ${current.circle} ${checked ? current.translate : "translate-x-0"}` }) }),
    /* @__PURE__ */ jsx("input", { type: "checkbox", className: "hidden", checked, onChange: (e) => onChange(e.target.checked) })
  ] });
};

export {
  Switch
};
//# sourceMappingURL=chunk-NWYVCGUZ.js.map