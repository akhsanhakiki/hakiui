import {
  hexToRgb
} from "./chunk-TIRNZKPP.js";
import {
  DARK_CHART_COLORS,
  LIGHT_CHART_COLORS
} from "./chunk-A6P4IFYE.js";

// src/components/theme-provider.tsx
import {
  createContext,
  useContext,
  useState
} from "react";
import { jsx } from "react/jsx-runtime";
var lightNeutrals = {
  bg: "#FAF9F5",
  bgSoft: "#F2EFE8",
  surface: "#FFFFFF",
  border: "#E5E1D5",
  input: "#F2EFE8",
  text: "#1C1B17",
  textMuted: "#6E6A5E",
  hover: "#EBE7DC"
};
var darkNeutrals = {
  bg: "#141311",
  bgSoft: "#1C1A17",
  surface: "#22201B",
  border: "#37342C",
  input: "#282521",
  text: "#F5F3EC",
  textMuted: "#A8A294",
  hover: "#322E27"
};
var defaultTheme = {
  primaryColor: "#F05423",
  gradientColor: "#FF8C42",
  useGradient: false,
  fontFamily: "'IBM Plex Mono', monospace",
  borderRadius: 4,
  mode: "light"
};
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
  lightNeutrals,
  darkNeutrals,
  defaultTheme,
  useTheme,
  HakiProvider
};
//# sourceMappingURL=chunk-JX7CWEZJ.js.map