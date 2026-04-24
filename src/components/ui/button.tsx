import React from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  radius?: Radius;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      radius = "md",
      children,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    let variantStyle: React.CSSProperties = {};
    if (variant === "primary") {
      variantStyle = {
        background: "var(--ui-primary-bg)",
        color: "#ffffff",
        border: "none",
      };
    } else if (variant === "secondary") {
      variantStyle = {
        backgroundColor: "rgb(var(--ui-primary-rgb) / 0.12)",
        color: "var(--ui-primary)",
        border: "none",
      };
    } else if (variant === "outline") {
      variantStyle = {
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "1px solid var(--border)",
        outline: "1px solid var(--border)",
        outlineOffset: 0,
      };
    } else if (variant === "ghost") {
      variantStyle = {
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "none",
      };
    }

    return (
      <button
        ref={ref}
        className={`font-medium transition-transform active:scale-95 inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer ${sizeClasses[size]} ${className}`}
        style={{
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          ...variantStyle,
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
