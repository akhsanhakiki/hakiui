import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';
import { ThemeMode } from './tokens.js';
export { NeutralTokens, darkNeutrals, lightNeutrals } from './tokens.js';

type Theme = {
    primaryColor: string;
    gradientColor: string;
    useGradient: boolean;
    fontFamily: string;
    borderRadius: number;
    /** Neutral palette mode. Defaults to "light" (warm white background). */
    mode?: ThemeMode;
};
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

export { HakiProvider, type HakiProviderProps, type Theme, ThemeMode, defaultTheme, useTheme };
