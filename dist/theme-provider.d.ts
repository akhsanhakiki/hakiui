import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';

type Theme = {
    primaryColor: string;
    gradientColor: string;
    useGradient: boolean;
    fontFamily: string;
    borderRadius: number;
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

export { HakiProvider, type HakiProviderProps, type Theme, defaultTheme, useTheme };
