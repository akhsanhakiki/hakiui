import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.cjs';

interface DropdownOption {
    label: string;
    value: string;
    description?: ReactNode;
    disabled?: boolean;
}
interface DropdownProps {
    options: DropdownOption[];
    size?: "sm" | "md" | "lg";
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    label?: string;
    radius?: Radius;
    disabled?: boolean;
    className?: string;
}
declare const Dropdown: ({ options, size, value, defaultValue, onChange, placeholder, label, radius, disabled, className, }: DropdownProps) => react_jsx_runtime.JSX.Element;

export { Dropdown, type DropdownOption, type DropdownProps };
