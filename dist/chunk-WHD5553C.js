import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/prompt-suggestions.tsx
import { ArrowUpRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var PromptSuggestions = ({ items, onPick, columns = 2, radius = "md", className = "" }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: `grid gap-2 ${columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : ""} ${className}`,
    style: { fontFamily: "var(--ui-font)" },
    children: items.map((s) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onPick(s.prompt),
        className: "group flex flex-col p-3 text-left transition-colors hover:border-(--ui-primary) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
        style: { ...getRadiusStyle(radius), backgroundColor: "var(--surface)", border: "0.5px solid var(--border)", color: "var(--text)" },
        children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-xs font-medium", children: [
              s.icon && /* @__PURE__ */ jsx("span", { className: "text-(--ui-primary)", children: s.icon }),
              s.title
            ] }),
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 13, className: "mt-0.5 shrink-0 text-(--text-muted) transition-colors group-hover:text-(--ui-primary)" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-(--text-muted)", children: s.prompt }),
          s.category && /* @__PURE__ */ jsx("span", { className: "mt-2 inline-flex w-fit rounded-full px-1.5 py-0.5 text-[10px] font-medium", style: { backgroundColor: "var(--bg-soft)", color: "var(--text-muted)" }, children: s.category })
        ]
      },
      s.title
    ))
  }
);

export {
  PromptSuggestions
};
//# sourceMappingURL=chunk-WHD5553C.js.map