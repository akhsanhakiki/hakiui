import React, { useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  size?: "sm" | "md" | "lg";
  label?: string;
  labelPlacement?: "top" | "left";
  description?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  radius?: Radius;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      size = "lg",
      label,
      labelPlacement = "top",
      description,
      startContent,
      endContent,
      radius = "md",
      type,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const sizeStyles = {
      sm: {
        container: "px-2.5 py-1",
        input: "text-xs",
        icon: 14,
        labelLeftOffset: "mt-1.5",
      },
      md: {
        container: "px-3 py-1.5",
        input: "text-sm",
        icon: 15,
        labelLeftOffset: "mt-2",
      },
      lg: {
        container: "px-3 py-2",
        input: "text-base",
        icon: 16,
        labelLeftOffset: "mt-2.5",
      },
    } as const;
    const currentSize = sizeStyles[size];

    const inputContainer = (
      <div className="flex flex-col gap-1.5 w-full">
        <div
          className={`flex w-full items-center overflow-hidden text-(--text) transition-[box-shadow,ring-color] ring-2 ring-transparent focus-within:ring-(--ui-primary)/35 focus-within:border-(--ui-primary) ${currentSize.container}`}
          style={{
            ...getRadiusStyle(radius),
            backgroundColor: "var(--bg-soft)",
            color: "var(--text)",
            border: "0.5px solid var(--border)",
            outline: "0.5px solid var(--border)",
            outlineOffset: 0,
          }}
        >
          <div className="flex items-center w-full gap-2">
            {startContent && (
              <div className="flex shrink-0 items-center justify-center text-(--text-muted)">
                {startContent}
              </div>
            )}
            <input
              ref={ref}
              type={inputType}
              className={`w-full bg-transparent outline-none placeholder:text-(--text-muted) ${currentSize.input} ${className}`}
              style={{
                fontFamily: "var(--ui-font)",
                color: "var(--text)",
                caretColor: "var(--ui-primary)",
              }}
              {...props}
            />
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex shrink-0 items-center justify-center text-(--text-muted) transition-colors hover:text-(--text)"
              >
                {showPassword ? (
                  <EyeOff size={currentSize.icon} />
                ) : (
                  <Eye size={currentSize.icon} />
                )}
              </button>
            ) : endContent ? (
              <div className="flex shrink-0 items-center justify-center text-(--text-muted)">
                {endContent}
              </div>
            ) : null}
          </div>
        </div>
        {description && (
          <span className="pl-1 text-xs text-(--text-muted)">
            {description}
          </span>
        )}
      </div>
    );

    if (!label) return inputContainer;

    return (
      <div
        className={`flex ${labelPlacement === "left" ? "flex-row items-start gap-4" : "flex-col gap-1.5"} w-full`}
      >
        <label
          className={`whitespace-nowrap text-sm font-medium text-(--text) ${labelPlacement === "left" ? currentSize.labelLeftOffset : ""}`}
        >
          {label}
        </label>
        {inputContainer}
      </div>
    );
  },
);

Input.displayName = "Input";
