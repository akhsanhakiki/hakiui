import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

interface AutocompleteOption {
    label: string;
    value: string;
    description?: ReactNode;
}
interface AutocompleteProps {
    options: AutocompleteOption[];
    size?: "sm" | "md" | "lg";
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onInputChange?: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
    label?: string;
    radius?: Radius;
    disabled?: boolean;
    className?: string;
}
declare const Autocomplete: ({ options, size, value, defaultValue, onChange, onInputChange, placeholder, emptyMessage, label, radius, disabled, className, }: AutocompleteProps) => react_jsx_runtime.JSX.Element;

export { Autocomplete, type AutocompleteOption, type AutocompleteProps };
