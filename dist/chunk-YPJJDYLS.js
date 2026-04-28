import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/input.tsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Input = React.forwardRef(
  ({
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
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? showPassword ? "text" : "password" : type;
    const sizeStyles = {
      sm: {
        container: "px-2.5 py-1",
        input: "text-xs",
        icon: 14,
        labelLeftOffset: "mt-1.5"
      },
      md: {
        container: "px-3 py-1.5",
        input: "text-sm",
        icon: 15,
        labelLeftOffset: "mt-2"
      },
      lg: {
        container: "px-3 py-2",
        input: "text-base",
        icon: 16,
        labelLeftOffset: "mt-2.5"
      }
    };
    const currentSize = sizeStyles[size];
    const inputContainer = /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 w-full", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `flex w-full items-center overflow-hidden text-(--text) transition-[box-shadow,ring-color] ring-2 ring-transparent focus-within:ring-[color:var(--ui-primary)]/35 ${currentSize.container}`,
          style: {
            ...getRadiusStyle(radius),
            backgroundColor: "var(--bg-soft)",
            color: "var(--text)"
          },
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center w-full gap-2", children: [
            startContent && /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center justify-center text-(--text-muted)", children: startContent }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref,
                type: inputType,
                className: `w-full bg-transparent outline-none placeholder:text-(--text-muted) ${currentSize.input} ${className}`,
                style: {
                  fontFamily: "var(--ui-font)",
                  color: "var(--text)",
                  caretColor: "var(--ui-primary)"
                },
                ...props
              }
            ),
            isPassword ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "flex shrink-0 items-center justify-center text-(--text-muted) transition-colors hover:text-(--text)",
                children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: currentSize.icon }) : /* @__PURE__ */ jsx(Eye, { size: currentSize.icon })
              }
            ) : endContent ? /* @__PURE__ */ jsx("div", { className: "flex shrink-0 items-center justify-center text-(--text-muted)", children: endContent }) : null
          ] })
        }
      ),
      description && /* @__PURE__ */ jsx("span", { className: "pl-1 text-xs text-(--text-muted)", children: description })
    ] });
    if (!label) return inputContainer;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: `flex ${labelPlacement === "left" ? "flex-row items-start gap-4" : "flex-col gap-1.5"} w-full`,
        children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              className: `whitespace-nowrap text-sm font-medium text-(--text) ${labelPlacement === "left" ? currentSize.labelLeftOffset : ""}`,
              children: label
            }
          ),
          inputContainer
        ]
      }
    );
  }
);
Input.displayName = "Input";

export {
  Input
};
//# sourceMappingURL=chunk-YPJJDYLS.js.map