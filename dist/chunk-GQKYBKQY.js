import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/button.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var Button = React.forwardRef(
  ({ className = "", variant = "solid", size = "md", radius = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    };
    let variantStyle = {};
    if (variant === "solid") {
      variantStyle = { background: "var(--ui-primary-bg)", color: "#ffffff", border: "none" };
    } else if (variant === "bordered") {
      variantStyle = {
        backgroundColor: "transparent",
        color: "var(--ui-primary)",
        border: "2px solid var(--ui-primary)"
      };
    } else if (variant === "light") {
      variantStyle = { backgroundColor: "transparent", color: "var(--ui-primary)", border: "none" };
    } else if (variant === "flat") {
      variantStyle = { backgroundColor: "rgb(var(--ui-primary-rgb) / 0.2)", color: "var(--ui-primary)", border: "none" };
    }
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className: `font-medium transition-transform active:scale-95 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${className}`,
        style: { ...getRadiusStyle(radius), fontFamily: "var(--ui-font)", ...variantStyle },
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";

export {
  Button
};
//# sourceMappingURL=chunk-GQKYBKQY.js.map