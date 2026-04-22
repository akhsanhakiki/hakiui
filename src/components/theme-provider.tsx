import React, { createContext, useContext, useState, type ReactNode } from "react";
import { hexToRgb } from "../lib/hex-to-rgb";

export type Theme = {
  primaryColor: string;
  gradientColor: string;
  useGradient: boolean;
  fontFamily: string;
  borderRadius: number;
};

export const defaultTheme: Theme = {
  primaryColor: "#006FEE",
  gradientColor: "#5EA2EF",
  useGradient: false,
  fontFamily: "'Inter', sans-serif",
  borderRadius: 12
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

export const HakiProvider = ({ children, initialTheme = defaultTheme, className = "" }: HakiProviderProps) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={className}
        style={
          {
            "--ui-primary": theme.primaryColor,
            "--ui-primary-rgb": hexToRgb(theme.primaryColor),
            "--ui-gradient": `linear-gradient(to right, ${theme.primaryColor}, ${theme.gradientColor})`,
            "--ui-primary-bg": theme.useGradient ? "var(--ui-gradient)" : "var(--ui-primary)",
            "--ui-font": theme.fontFamily,
            "--ui-radius": `${theme.borderRadius}px`
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
