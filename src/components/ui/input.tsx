import React, { useState, type ReactNode } from "react";
import { Eye, EyeOff } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  labelPlacement?: "top" | "left";
  description?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  radius?: Radius;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, labelPlacement = "top", description, startContent, endContent, radius = "md", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    const inputContainer = (
      <div className="flex flex-col gap-1.5 w-full">
        <div
          className="flex items-center w-full bg-[#27272a] border-2 border-transparent focus-within:border-[color:var(--ui-primary)] transition-colors overflow-hidden px-3 py-2"
          style={getRadiusStyle(radius)}
        >
          <div className="flex items-center w-full gap-2">
            {startContent && <div className="text-gray-400 shrink-0 flex items-center justify-center">{startContent}</div>}
            <input
              ref={ref}
              type={inputType}
              className={`w-full bg-transparent text-white outline-none placeholder:text-gray-500 ${className}`}
              style={{ fontFamily: "var(--ui-font)" }}
              {...props}
            />
            {isPassword ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white shrink-0 flex items-center justify-center transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            ) : endContent ? (
              <div className="text-gray-400 shrink-0 flex items-center justify-center">{endContent}</div>
            ) : null}
          </div>
        </div>
        {description && <span className="text-xs text-gray-500 pl-1">{description}</span>}
      </div>
    );

    if (!label) return inputContainer;

    return (
      <div className={`flex ${labelPlacement === "left" ? "flex-row items-start gap-4" : "flex-col gap-1.5"} w-full`}>
        <label className={`text-sm font-medium text-gray-300 whitespace-nowrap ${labelPlacement === "left" ? "mt-2.5" : ""}`}>
          {label}
        </label>
        {inputContainer}
      </div>
    );
  }
);

Input.displayName = "Input";
