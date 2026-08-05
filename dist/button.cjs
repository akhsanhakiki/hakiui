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

// src/components/ui/button.tsx
var button_exports = {};
__export(button_exports, {
  Button: () => Button
});
module.exports = __toCommonJS(button_exports);
var import_react = __toESM(require("react"), 1);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PRESS_SPRING = "cubic-bezier(0.34, 1.55, 0.48, 1)";
var Button = import_react.default.forwardRef(
  ({
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
  }, ref) => {
    const [isHovered, setIsHovered] = (0, import_react.useState)(false);
    const [isPressed, setIsPressed] = (0, import_react.useState)(false);
    const [reduceMotion, setReduceMotion] = (0, import_react.useState)(false);
    (0, import_react.useEffect)(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const sync = () => setReduceMotion(mq.matches);
      sync();
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }, []);
    const showHover = isHovered && !disabled;
    const sizeClasses = {
      sm: "h-8 px-3 text-xs",
      md: "h-9 px-4 text-sm",
      lg: "h-10 px-6 text-base"
    };
    let variantStyle = {
      transition: "box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease"
    };
    if (variant === "primary") {
      variantStyle = {
        ...variantStyle,
        background: "var(--ui-primary-bg)",
        color: "#ffffff",
        border: "none"
      };
    } else if (variant === "secondary") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "rgb(var(--ui-primary-rgb) / 0.12)",
        color: "var(--ui-primary)",
        border: "none"
      };
    } else if (variant === "outline") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "0.5px solid var(--border)",
        outline: "0.5px solid var(--border)",
        outlineOffset: 0
      };
    } else if (variant === "ghost") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "none"
      };
    }
    if (showHover) {
      if (variant === "primary") {
        variantStyle = {
          ...variantStyle,
          boxShadow: "inset 0 0 0 9999px rgba(0, 0, 0, 0.08)"
        };
      } else if (variant === "secondary") {
        variantStyle = {
          ...variantStyle,
          backgroundColor: "rgb(var(--ui-primary-rgb) / 0.2)"
        };
      } else if (variant === "outline" || variant === "ghost") {
        variantStyle = {
          ...variantStyle,
          backgroundColor: "var(--hover)"
        };
      }
    }
    const transformTransition = reduceMotion ? "transform 70ms linear" : `transform 420ms ${PRESS_SPRING}`;
    const pressStyle = disabled || reduceMotion ? {} : {
      transform: isPressed ? "scale(0.9)" : "scale(1)",
      willChange: "transform",
      transition: `${variantStyle.transition}, ${transformTransition}`
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref,
        disabled,
        className: `font-medium inline-flex touch-manipulation items-center justify-center gap-2 disabled:opacity-50 cursor-pointer ${sizeClasses[size]} ${className}`,
        style: {
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          ...variantStyle,
          ...styleProp,
          ...pressStyle
        },
        onMouseEnter: (e) => {
          onMouseEnter?.(e);
          if (!disabled) setIsHovered(true);
        },
        onMouseLeave: (e) => {
          onMouseLeave?.(e);
          setIsHovered(false);
        },
        onPointerDown: (e) => {
          onPointerDown?.(e);
          if (!disabled && e.button === 0) setIsPressed(true);
        },
        onPointerUp: (e) => {
          onPointerUp?.(e);
          setIsPressed(false);
        },
        onPointerLeave: (e) => {
          onPointerLeave?.(e);
          setIsPressed(false);
        },
        onPointerCancel: (e) => {
          onPointerCancel?.(e);
          setIsPressed(false);
        },
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button
});
//# sourceMappingURL=button.cjs.map