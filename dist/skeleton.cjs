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

// src/components/ui/skeleton.tsx
var skeleton_exports = {};
__export(skeleton_exports, {
  Skeleton: () => Skeleton
});
module.exports = __toCommonJS(skeleton_exports);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/skeleton.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Skeleton = ({
  variant = "rect",
  width,
  height,
  radius = "md",
  className = ""
}) => {
  const defaults = variant === "text" ? { width: "100%", height: 12 } : variant === "circle" ? { width: 40, height: 40 } : { width: "100%", height: 20 };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      "aria-hidden": true,
      className: `block animate-pulse ${className}`,
      style: {
        ...variant === "circle" ? { borderRadius: "9999px" } : getRadiusStyle(variant === "text" ? "sm" : radius),
        width: width ?? defaults.width,
        height: height ?? defaults.height,
        backgroundColor: "var(--hover)"
      }
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Skeleton
});
//# sourceMappingURL=skeleton.cjs.map