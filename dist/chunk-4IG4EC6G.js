import {
  hexToRgb
} from "./chunk-TIRNZKPP.js";
import {
  DARK_CHART_COLORS,
  LIGHT_CHART_COLORS,
  darkNeutrals,
  defaultThemeTokens,
  lightNeutrals
} from "./chunk-QM3UML3O.js";

// src/components/theme-provider.tsx
import {
  createContext,
  useContext,
  useState
} from "react";
import { jsx } from "react/jsx-runtime";
var defaultTheme = defaultThemeTokens;
var ThemeContext = createContext(void 0);
var useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a HakiProvider");
  return context;
};
var HakiProvider = ({
  children,
  initialTheme = defaultTheme,
  className = ""
}) => {
  const [theme, setTheme] = useState(initialTheme);
  const mode = theme.mode ?? "light";
  const neutrals = mode === "dark" ? darkNeutrals : lightNeutrals;
  const chartColors = mode === "dark" ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;
  const chartVars = Object.fromEntries(
    chartColors.map((color, i) => [`--chart-${i + 1}`, color])
  );
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme }, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: `${mode} ${className}`,
      style: {
        "--ui-primary": theme.primaryColor,
        "--ui-primary-rgb": hexToRgb(theme.primaryColor),
        "--ui-gradient": `linear-gradient(to right, ${theme.primaryColor}, ${theme.gradientColor})`,
        "--ui-primary-bg": theme.useGradient ? "var(--ui-gradient)" : "var(--ui-primary)",
        "--ui-font": theme.fontFamily,
        "--ui-radius": `${theme.borderRadius}px`,
        "--bg": neutrals.bg,
        "--bg-soft": neutrals.bgSoft,
        "--surface": neutrals.surface,
        "--border": neutrals.border,
        "--input": neutrals.input,
        "--text": neutrals.text,
        "--text-muted": neutrals.textMuted,
        "--hover": neutrals.hover,
        ...chartVars,
        color: "var(--text)"
      },
      children
    }
  ) });
};

export {
  defaultTheme,
  useTheme,
  HakiProvider
};
//# sourceMappingURL=chunk-4IG4EC6G.js.map