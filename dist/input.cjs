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

// src/components/ui/input.tsx
var input_exports = {};
__export(input_exports, {
  Input: () => Input
});
module.exports = __toCommonJS(input_exports);
var import_react = __toESM(require("react"), 1);
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/input.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Input = import_react.default.forwardRef(
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
    const [showPassword, setShowPassword] = (0, import_react.useState)(false);
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
    const inputContainer = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-1.5 w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: `flex w-full items-center overflow-hidden text-(--text) transition-[box-shadow,ring-color] ring-2 ring-transparent focus-within:ring-[color:var(--ui-primary)]/35 ${currentSize.container}`,
          style: {
            ...getRadiusStyle(radius),
            backgroundColor: "var(--bg-soft)",
            color: "var(--text)"
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center w-full gap-2", children: [
            startContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex shrink-0 items-center justify-center text-(--text-muted)", children: startContent }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            isPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "flex shrink-0 items-center justify-center text-(--text-muted) transition-colors hover:text-(--text)",
                children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.EyeOff, { size: currentSize.icon }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Eye, { size: currentSize.icon })
              }
            ) : endContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex shrink-0 items-center justify-center text-(--text-muted)", children: endContent }) : null
          ] })
        }
      ),
      description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pl-1 text-xs text-(--text-muted)", children: description })
    ] });
    if (!label) return inputContainer;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: `flex ${labelPlacement === "left" ? "flex-row items-start gap-4" : "flex-col gap-1.5"} w-full`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Input
});
//# sourceMappingURL=input.cjs.map