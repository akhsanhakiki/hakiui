// src/components/ui/thinking-steps.tsx
import { useState } from "react";
import { Brain, ChevronDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var ThinkingSteps = ({ steps, streaming = false, defaultOpen = true, label, className = "" }) => {
  const [open, setOpen] = useState(defaultOpen);
  const title = label ?? (streaming ? "Thinking\u2026" : `Thought for ${steps.length} step${steps.length === 1 ? "" : "s"}`);
  return /* @__PURE__ */ jsxs("div", { className, style: { fontFamily: "var(--ui-font)" }, children: [
    /* @__PURE__ */ jsx("style", { children: `@keyframes hk-shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}@media (prefers-reduced-motion:reduce){.hk-shimmer{animation:none!important}}` }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        "aria-expanded": open,
        className: "flex items-center gap-1.5 rounded text-[11px] font-medium text-(--text-muted) transition-colors hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
        children: [
          /* @__PURE__ */ jsx(Brain, { size: 12, className: streaming ? "text-(--ui-primary)" : void 0 }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: streaming ? "hk-shimmer bg-clip-text text-transparent" : void 0,
              style: streaming ? {
                backgroundImage: "linear-gradient(90deg, var(--text-muted) 0%, var(--text) 50%, var(--text-muted) 100%)",
                backgroundSize: "200% 100%",
                animation: "hk-shimmer 1.6s linear infinite"
              } : void 0,
              children: title
            }
          ),
          /* @__PURE__ */ jsx(ChevronDown, { size: 12, className: `transition-transform ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    open && steps.length > 0 && /* @__PURE__ */ jsx("ol", { className: "mt-1.5 space-y-1 pl-3", style: { borderLeft: "2px solid var(--border)" }, "aria-live": streaming ? "polite" : void 0, children: steps.map((s, i) => /* @__PURE__ */ jsx("li", { className: "text-[11px] leading-relaxed text-(--text-muted)", children: s }, i)) })
  ] });
};

export {
  ThinkingSteps
};
//# sourceMappingURL=chunk-JBFVRO44.js.map