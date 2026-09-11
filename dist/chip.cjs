"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/chip.tsx
var chip_exports = {};
__export(chip_exports, {
  Chip: () => Chip
});
module.exports = __toCommonJS(chip_exports);
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/chip.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "span",
    {
      className: `inline-flex items-center overflow-hidden ${className}`,
      style: shell,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          Tag,
          {
            type: onClick ? "button" : void 0,
            onClick,
            disabled: onClick ? disabled : void 0,
            "aria-pressed": onClick && selected ? true : void 0,
            className: `inline-flex items-center font-medium transition-colors ${sizing} ${onClick ? "cursor-pointer hover:bg-(--hover) disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35" : ""}`,
            children: [
              icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0", children: icon }),
              children
            ]
          }
        ),
        onRemove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: onRemove,
            disabled,
            "aria-label": "Remove",
            className: "flex h-full items-center border-l border-(--border) px-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) disabled:opacity-50",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: size === "sm" ? 11 : 12 })
          }
        )
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Chip
});
//# sourceMappingURL=chip.cjs.map