"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/theme-provider.tsx
var theme_provider_exports = {};
__export(theme_provider_exports, {
  HakiProvider: () => HakiProvider,
  defaultTheme: () => defaultTheme,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(theme_provider_exports);
var import_react = require("react");

// src/lib/hex-to-rgb.ts
var hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : "0 111 238";
};

// src/components/theme-provider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var defaultTheme = {
  primaryColor: "#006FEE",
  gradientColor: "#5EA2EF",
  useGradient: false,
  fontFamily: "'Inter', sans-serif",
  borderRadius: 12
};
var ThemeContext = (0, import_react.createContext)(void 0);
var useTheme = () => {
  const context = (0, import_react.useContext)(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a HakiProvider");
  return context;
};
var HakiProvider = ({ children, initialTheme = defaultTheme, className = "" }) => {
  const [theme, setTheme] = (0, import_react.useState)(initialTheme);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: { theme, setTheme }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className,
      style: {
        "--ui-primary": theme.primaryColor,
        "--ui-primary-rgb": hexToRgb(theme.primaryColor),
        "--ui-gradient": `linear-gradient(to right, ${theme.primaryColor}, ${theme.gradientColor})`,
        "--ui-primary-bg": theme.useGradient ? "var(--ui-gradient)" : "var(--ui-primary)",
        "--ui-font": theme.fontFamily,
        "--ui-radius": `${theme.borderRadius}px`
      },
      children
    }
  ) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HakiProvider,
  defaultTheme,
  useTheme
});
//# sourceMappingURL=theme-provider.cjs.map