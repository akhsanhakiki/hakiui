import React, { useEffect, useState } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  radius?: Radius;
}

/** Springy ease — y control > 1 gives a slight overshoot so release reads as a bounce */
const PRESS_SPRING = "cubic-bezier(0.34, 1.55, 0.48, 1)";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      radius = "md",
      children,
      disabled,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      onPointerUp,
      onPointerLeave,
      onPointerCancel,
      style: styleProp,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const sync = () => setReduceMotion(mq.matches);
      sync();
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }, []);

    const showHover = isHovered && !disabled;

    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    let variantStyle: React.CSSProperties = {
      transition: "box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease",
    };

    if (variant === "primary") {
      variantStyle = {
        ...variantStyle,
        background: "var(--ui-primary-bg)",
        color: "#ffffff",
        border: "none",
      };
    } else if (variant === "secondary") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "rgb(var(--ui-primary-rgb) / 0.12)",
        color: "var(--ui-primary)",
        border: "none",
      };
    } else if (variant === "outline") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "1px solid var(--border)",
        outline: "1px solid var(--border)",
        outlineOffset: 0,
      };
    } else if (variant === "ghost") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "none",
      };
    }

    if (showHover) {
      if (variant === "primary") {
        variantStyle = {
          ...variantStyle,
          boxShadow: "inset 0 0 0 9999px rgba(0, 0, 0, 0.08)",
        };
      } else if (variant === "secondary") {
        variantStyle = {
          ...variantStyle,
          backgroundColor: "rgb(var(--ui-primary-rgb) / 0.2)",
        };
      } else if (variant === "outline" || variant === "ghost") {
        variantStyle = {
          ...variantStyle,
          backgroundColor: "var(--hover)",
        };
      }
    }

    const transformTransition = reduceMotion
      ? "transform 70ms linear"
      : `transform 420ms ${PRESS_SPRING}`;

    const pressStyle: React.CSSProperties =
      disabled || reduceMotion
        ? {}
        : {
            transform: isPressed ? "scale(0.9)" : "scale(1)",
            willChange: "transform",
            transition: `${variantStyle.transition}, ${transformTransition}`,
          };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`font-medium inline-flex touch-manipulation items-center justify-center gap-2 disabled:opacity-50 cursor-pointer ${sizeClasses[size]} ${className}`}
        style={{
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          ...variantStyle,
          ...styleProp,
          ...pressStyle,
        }}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          if (!disabled) setIsHovered(true);
        }}
        onMouseLeave={(e) => {
          onMouseLeave?.(e);
          setIsHovered(false);
        }}
        onPointerDown={(e) => {
          onPointerDown?.(e);
          if (!disabled && e.button === 0) setIsPressed(true);
        }}
        onPointerUp={(e) => {
          onPointerUp?.(e);
          setIsPressed(false);
        }}
        onPointerLeave={(e) => {
          onPointerLeave?.(e);
          setIsPressed(false);
        }}
        onPointerCancel={(e) => {
          onPointerCancel?.(e);
          setIsPressed(false);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
