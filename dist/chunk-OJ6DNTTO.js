import {
  hexToRgb
} from "./chunk-TIRNZKPP.js";

// src/components/theme-provider.tsx
import {
  createContext,
  useContext,
  useState
} from "react";
import { jsx } from "react/jsx-runtime";
var defaultTheme = {
  primaryColor: "#006FEE",
  gradientColor: "#5EA2EF",
  useGradient: false,
  fontFamily: "'Inter', sans-serif",
  borderRadius: 12
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
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme }, children: /* @__PURE__ */ jsx(
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

export {
  defaultTheme,
  useTheme,
  HakiProvider
};
//# sourceMappingURL=chunk-OJ6DNTTO.js.map