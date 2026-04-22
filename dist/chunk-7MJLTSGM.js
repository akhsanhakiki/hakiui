import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/input.tsx
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Input = React.forwardRef(
  ({ className = "", label, labelPlacement = "top", description, startContent, endContent, radius = "md", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? showPassword ? "text" : "password" : type;
    const inputContainer = /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 w-full", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex items-center w-full bg-[#27272a] border-2 border-transparent focus-within:border-[color:var(--ui-primary)] transition-colors overflow-hidden px-3 py-2",
          style: getRadiusStyle(radius),
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-center w-full gap-2", children: [
            startContent && /* @__PURE__ */ jsx("div", { className: "text-gray-400 shrink-0 flex items-center justify-center", children: startContent }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref,
                type: inputType,
                className: `w-full bg-transparent text-white outline-none placeholder:text-gray-500 ${className}`,
                style: { fontFamily: "var(--ui-font)" },
                ...props
              }
            ),
            isPassword ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "text-gray-400 hover:text-white shrink-0 flex items-center justify-center transition-colors",
                children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 16 }) : /* @__PURE__ */ jsx(Eye, { size: 16 })
              }
            ) : endContent ? /* @__PURE__ */ jsx("div", { className: "text-gray-400 shrink-0 flex items-center justify-center", children: endContent }) : null
          ] })
        }
      ),
      description && /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 pl-1", children: description })
    ] });
    if (!label) return inputContainer;
    return /* @__PURE__ */ jsxs("div", { className: `flex ${labelPlacement === "left" ? "flex-row items-start gap-4" : "flex-col gap-1.5"} w-full`, children: [
      /* @__PURE__ */ jsx("label", { className: `text-sm font-medium text-gray-300 whitespace-nowrap ${labelPlacement === "left" ? "mt-2.5" : ""}`, children: label }),
      inputContainer
    ] });
  }
);
Input.displayName = "Input";

export {
  Input
};
//# sourceMappingURL=chunk-7MJLTSGM.js.map