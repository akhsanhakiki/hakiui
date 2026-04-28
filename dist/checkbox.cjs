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

// src/components/ui/checkbox.tsx
var checkbox_exports = {};
__export(checkbox_exports, {
  Checkbox: () => Checkbox
});
module.exports = __toCommonJS(checkbox_exports);
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/checkbox.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Checkbox = ({
  checked,
  onChange,
  children,
  radius = "sm"
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer group w-fit", children: [
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: `flex h-5 w-5 items-center justify-center transition-colors ${!checked ? "border-2 border-(--border) group-hover:border-(--ui-primary)" : ""}`,
      style: {
        ...getRadiusStyle(radius),
        ...checked ? { background: "var(--ui-primary-bg)" } : {}
      },
      children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { size: 14, className: "text-white" })
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "input",
    {
      type: "checkbox",
      className: "hidden",
      checked,
      onChange: (e) => onChange(e.target.checked)
    }
  ),
  children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "select-none text-sm text-(--text)", children })
] });
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Checkbox
});
//# sourceMappingURL=checkbox.cjs.map