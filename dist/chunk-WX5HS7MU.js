// src/components/ui/pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Pagination = ({
  total,
  page,
  onChange
}) => {
  const getPages = () => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", total];
    if (page >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", page - 1, page, page + 1, "...", total];
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 select-none", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onChange(Math.max(1, page - 1)),
        disabled: page === 1,
        className: "flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-transparent border-0",
        children: [
          /* @__PURE__ */ jsx(ChevronLeft, { size: 16 }),
          " Previous"
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: getPages().map((p, i) => {
      if (p === "...") return /* @__PURE__ */ jsx("span", { className: "w-8 flex items-center justify-center text-gray-500", children: "..." }, `ellipsis-${i}`);
      const isActive = p === page;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(p),
          className: `w-8 h-8 flex items-center justify-center transition-colors text-sm ${isActive ? "text-white rounded-full" : "bg-transparent hover:bg-[#27272a] text-gray-300 rounded-full"}`,
          style: isActive ? { background: "var(--ui-primary-bg)" } : {},
          children: p
        },
        `page-${p}`
      );
    }) }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onChange(Math.min(total, page + 1)),
        disabled: page === total,
        className: "flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-transparent border-0",
        children: [
          "Next ",
          /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
        ]
      }
    )
  ] });
};

export {
  Pagination
};
//# sourceMappingURL=chunk-WX5HS7MU.js.map