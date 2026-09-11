// src/components/ui/kbd.tsx
import { jsx } from "react/jsx-runtime";
var Kbd = ({ keys, children, size = "sm", className = "" }) => {
  const caps = keys ?? (children !== void 0 ? [children] : []);
  const cap = size === "sm" ? "min-w-4 px-1 text-[10px] leading-4" : "min-w-5 px-1.5 text-[11px] leading-5";
  return /* @__PURE__ */ jsx("span", { className: `inline-flex items-center gap-0.5 ${className}`, "aria-label": keys?.join(" "), children: caps.map((k, i) => /* @__PURE__ */ jsx(
    "kbd",
    {
      className: `inline-flex items-center justify-center rounded font-medium tabular-nums ${cap}`,
      style: {
        fontFamily: "var(--ui-font)",
        color: "var(--text-muted)",
        backgroundColor: "var(--bg-soft)",
        border: "0.5px solid var(--border)",
        boxShadow: "inset 0 -1px 0 var(--border)"
      },
      children: k
    },
    i
  )) });
};

export {
  Kbd
};
//# sourceMappingURL=chunk-ZQ2TYFPF.js.map