import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/chip.tsx
import { X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Chip = ({
  children,
  onClick,
  onRemove,
  selected = false,
  disabled = false,
  size = "md",
  color = "neutral",
  icon,
  radius = "full",
  className = ""
}) => {
  const accent = color === "primary" || selected;
  const base = accent ? "var(--ui-primary)" : "var(--text)";
  const shell = {
    ...getRadiusStyle(radius),
    fontFamily: "var(--ui-font)",
    color: accent ? "var(--ui-primary)" : "var(--text)",
    backgroundColor: selected ? `color-mix(in srgb, ${base} 12%, transparent)` : "var(--bg-soft)",
    border: `0.5px solid ${selected ? `color-mix(in srgb, ${base} 45%, transparent)` : "var(--border)"}`
  };
  const sizing = size === "sm" ? "h-6 px-2 text-[11px] gap-1" : "h-7 px-2.5 text-xs gap-1.5";
  const Tag = onClick ? "button" : "span";
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: `inline-flex items-center overflow-hidden ${className}`,
      style: shell,
      children: [
        /* @__PURE__ */ jsxs(
          Tag,
          {
            type: onClick ? "button" : void 0,
            onClick,
            disabled: onClick ? disabled : void 0,
            "aria-pressed": onClick && selected ? true : void 0,
            className: `inline-flex items-center font-medium transition-colors ${sizing} ${onClick ? "cursor-pointer hover:bg-(--hover) disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35" : ""}`,
            children: [
              icon && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: icon }),
              children
            ]
          }
        ),
        onRemove && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            disabled,
            "aria-label": "Remove",
            className: "flex h-full items-center border-l border-(--border) px-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) disabled:opacity-50",
            children: /* @__PURE__ */ jsx(X, { size: size === "sm" ? 11 : 12 })
          }
        )
      ]
    }
  );
};

export {
  Chip
};
//# sourceMappingURL=chunk-KRCTLKIR.js.map