import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { hexToRgb } from "../lib/hex-to-rgb";
import { DARK_CHART_COLORS, LIGHT_CHART_COLORS } from "../lib/chart";
import {
  darkNeutrals,
  defaultThemeTokens,
  lightNeutrals,
  type NeutralTokens,
  type ThemeMode,
} from "../lib/tokens";

export { lightNeutrals, darkNeutrals };
export type { NeutralTokens, ThemeMode };

export type Theme = {
  primaryColor: string;
  gradientColor: string;
  useGradient: boolean;
  fontFamily: string;
  borderRadius: number;
  /** Neutral palette mode. Defaults to "light" (warm white background). */
  mode?: ThemeMode;
};

export const defaultTheme: Theme = defaultThemeTokens;

type ThemeContextType = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a HakiProvider");
  return context;
};

export type HakiProviderProps = {
  children: ReactNode;
  initialTheme?: Theme;
  className?: string;
};

export const HakiProvider = ({
  children,
  initialTheme = defaultTheme,
  className = "",
}: HakiProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const mode: ThemeMode = theme.mode ?? "light";
  const neutrals = mode === "dark" ? darkNeutrals : lightNeutrals;
  const chartColors = mode === "dark" ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;
  const chartVars = Object.fromEntries(
    chartColors.map((color, i) => [`--chart-${i + 1}`, color]),
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`${mode} ${className}`}
        style={
          {
            "--ui-primary": theme.primaryColor,
            "--ui-primary-rgb": hexToRgb(theme.primaryColor),
            "--ui-gradient": `linear-gradient(to right, ${theme.primaryColor}, ${theme.gradientColor})`,
            "--ui-primary-bg": theme.useGradient
              ? "var(--ui-gradient)"
              : "var(--ui-primary)",
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
            color: "var(--text)",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
