import React from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "bordered" | "light" | "flat";
  size?: "sm" | "md" | "lg";
  radius?: Radius;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "solid", size = "md", radius = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    };

    let variantStyle: React.CSSProperties = {};
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

    return (
      <button
        ref={ref}
        className={`font-medium transition-transform active:scale-95 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${className}`}
        style={{ ...getRadiusStyle(radius), fontFamily: "var(--ui-font)", ...variantStyle }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
