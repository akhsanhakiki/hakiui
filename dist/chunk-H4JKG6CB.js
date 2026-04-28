import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/button.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var Button = React.forwardRef(
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
    return /* @__PURE__ */ jsx(
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

export {
  Button
};
//# sourceMappingURL=chunk-H4JKG6CB.js.map