// src/components/ui/breadcrumbs.tsx
import { ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Breadcrumbs = ({
  items,
  separator,
  className = ""
}) => /* @__PURE__ */ jsx(
  "nav",
  {
    "aria-label": "Breadcrumb",
    className,
    style: { fontFamily: "var(--ui-font)" },
    children: /* @__PURE__ */ jsx("ol", { className: "m-0 flex list-none flex-wrap items-center gap-1.5 p-0", children: items.map((item, i) => {
      const isLast = i === items.length - 1;
      const content = isLast ? /* @__PURE__ */ jsx("span", { "aria-current": "page", className: "font-medium text-(--text)", children: item.label }) : item.href || item.onClick ? /* @__PURE__ */ jsx(
        "a",
        {
          href: item.href ?? "#",
          onClick: (e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          },
          className: "text-(--text-muted) transition-colors hover:text-(--text) hover:underline",
          children: item.label
        }
      ) : /* @__PURE__ */ jsx("span", { className: "text-(--text-muted)", children: item.label });
      return /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-1.5 text-sm", children: [
        content,
        !isLast && /* @__PURE__ */ jsx("span", { "aria-hidden": true, className: "flex text-(--text-muted) opacity-60", children: separator ?? /* @__PURE__ */ jsx(ChevronRight, { size: 14 }) })
      ] }, i);
    }) })
  }
);

export {
  Breadcrumbs
};
//# sourceMappingURL=chunk-AIBZXCJF.js.map