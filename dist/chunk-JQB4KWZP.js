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
    if (page >= total - 2)
      return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", page - 1, page, page + 1, "...", total];
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 select-none", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onChange(Math.max(1, page - 1)),
        disabled: page === 1,
        className: "flex items-center gap-1 border-0 bg-transparent px-3 py-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text) disabled:opacity-50 cursor-pointer",
        children: [
          /* @__PURE__ */ jsx(ChevronLeft, { size: 16 }),
          " Previous"
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: getPages().map((p, i) => {
      if (p === "...")
        return /* @__PURE__ */ jsx(
          "span",
          {
            className: "flex w-8 items-center justify-center text-(--text-muted)",
            children: "..."
          },
          `ellipsis-${i}`
        );
      const isActive = p === page;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(p),
          className: `flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors cursor-pointer ${isActive ? "text-white" : "bg-transparent text-(--text) hover:bg-(--hover)"}`,
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
        className: "flex items-center gap-1 border-0 bg-transparent px-3 py-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text) disabled:opacity-50 cursor-pointer",
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
//# sourceMappingURL=chunk-JQB4KWZP.js.map