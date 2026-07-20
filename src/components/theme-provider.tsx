import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { hexToRgb } from "../lib/hex-to-rgb";

export type ThemeMode = "light" | "dark";

export type Theme = {
  primaryColor: string;
  gradientColor: string;
  useGradient: boolean;
  fontFamily: string;
  borderRadius: number;
  /** Neutral palette mode. Defaults to "light" (warm white background). */
  mode?: ThemeMode;
};

export type NeutralTokens = {
  bg: string;
  bgSoft: string;
  surface: string;
  border: string;
  input: string;
  text: string;
  textMuted: string;
  hover: string;
};

/** Warm paper-white neutrals — the default HakiUI look. */
export const lightNeutrals: NeutralTokens = {
  bg: "#FAF9F5",
  bgSoft: "#F2EFE8",
  surface: "#FFFFFF",
  border: "#E5E1D5",
  input: "#F2EFE8",
  text: "#1C1B17",
  textMuted: "#6E6A5E",
  hover: "#EBE7DC",
};

/** Warm charcoal neutrals for dark mode. */
export const darkNeutrals: NeutralTokens = {
  bg: "#141311",
  bgSoft: "#1C1A17",
  surface: "#22201B",
  border: "#37342C",
  input: "#282521",
  text: "#F5F3EC",
  textMuted: "#A8A294",
  hover: "#322E27",
};

export const defaultTheme: Theme = {
  primaryColor: "#F05423",
  gradientColor: "#FF8C42",
  useGradient: false,
  fontFamily: "'IBM Plex Mono', monospace",
  borderRadius: 4,
  mode: "light",
};

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
            color: "var(--text)",
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
