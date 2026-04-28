"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/button.tsx
var button_exports = {};
__export(button_exports, {
  Button: () => Button
});
module.exports = __toCommonJS(button_exports);
var import_react = __toESM(require("react"), 1);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = import_react.default.forwardRef(
  ({
    className = "",
    variant = "primary",
    size = "md",
    radius = "md",
    children,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    };
    let variantStyle = {};
    if (variant === "primary") {
      variantStyle = {
        background: "var(--ui-primary-bg)",
        color: "#ffffff",
        border: "none"
      };
    } else if (variant === "secondary") {
      variantStyle = {
        backgroundColor: "rgb(var(--ui-primary-rgb) / 0.12)",
        color: "var(--ui-primary)",
        border: "none"
      };
    } else if (variant === "outline") {
      variantStyle = {
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "1px solid var(--border)",
        outline: "1px solid var(--border)",
        outlineOffset: 0
      };
    } else if (variant === "ghost") {
      variantStyle = {
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "none"
      };
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref,
        className: `font-medium transition-transform active:scale-95 inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer ${sizeClasses[size]} ${className}`,
        style: {
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          ...variantStyle
        },
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button
});
//# sourceMappingURL=button.cjs.map