import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';

type ThemeMode = "light" | "dark";
type Theme = {
    primaryColor: string;
    gradientColor: string;
    useGradient: boolean;
    fontFamily: string;
    borderRadius: number;
    /** Neutral palette mode. Defaults to "light" (warm white background). */
    mode?: ThemeMode;
};
type NeutralTokens = {
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
declare const lightNeutrals: NeutralTokens;
/** Warm charcoal neutrals for dark mode. */
declare const darkNeutrals: NeutralTokens;
declare const defaultTheme: Theme;
type ThemeContextType = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};
declare const useTheme: () => ThemeContextType;
type HakiProviderProps = {
    children: ReactNode;
    initialTheme?: Theme;
    className?: string;
};
declare const HakiProvider: ({ children, initialTheme, className, }: HakiProviderProps) => react_jsx_runtime.JSX.Element;

export { HakiProvider, type HakiProviderProps, type NeutralTokens, type Theme, type ThemeMode, darkNeutrals, defaultTheme, lightNeutrals, useTheme };
