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
  ({ className = "", label, labelPlacement = "top", description, startContent, endContent, radius = "md", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = (0, import_react.useState)(false);
    const isPassword = type === "password";
    const inputType = isPassword ? showPassword ? "text" : "password" : type;
    const inputContainer = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-1.5 w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "flex items-center w-full bg-[#27272a] border-2 border-transparent focus-within:border-[color:var(--ui-primary)] transition-colors overflow-hidden px-3 py-2",
          style: getRadiusStyle(radius),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center w-full gap-2", children: [
            startContent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-gray-400 shrink-0 flex items-center justify-center", children: startContent }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                ref,
                type: inputType,
                className: `w-full bg-transparent text-white outline-none placeholder:text-gray-500 ${className}`,
                style: { fontFamily: "var(--ui-font)" },
                ...props
              }
            ),
            isPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "text-gray-400 hover:text-white shrink-0 flex items-center justify-center transition-colors",
                children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Eye, { size: 16 })
              }
            ) : endContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-gray-400 shrink-0 flex items-center justify-center", children: endContent }) : null
          ] })
        }
      ),
      description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs text-gray-500 pl-1", children: description })
    ] });
    if (!label) return inputContainer;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `flex ${labelPlacement === "left" ? "flex-row items-start gap-4" : "flex-col gap-1.5"} w-full`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: `text-sm font-medium text-gray-300 whitespace-nowrap ${labelPlacement === "left" ? "mt-2.5" : ""}`, children: label }),
      inputContainer
    ] });
  }
);
Input.displayName = "Input";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Input
});
//# sourceMappingURL=input.cjs.map