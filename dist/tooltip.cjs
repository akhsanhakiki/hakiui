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

// src/components/ui/tooltip.tsx
var tooltip_exports = {};
__export(tooltip_exports, {
  Tooltip: () => Tooltip
});
module.exports = __toCommonJS(tooltip_exports);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/tooltip.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Tooltip = ({
  content,
  position = "top",
  children
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative group flex items-center justify-center", children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: `pointer-events-none absolute z-50 whitespace-nowrap bg-(--surface) px-2.5 py-1.5 text-xs text-(--text) opacity-0 transition-opacity group-hover:opacity-100 ${positionClasses[position]}`,
        style: getRadiusStyle("sm"),
        children: content
      }
    )
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tooltip
});
//# sourceMappingURL=tooltip.cjs.map