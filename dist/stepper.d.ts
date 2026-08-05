import * as react_jsx_runtime from 'react/jsx-runtime';
import { Radius } from './radius.js';
import 'react';

interface StepperProps {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    labelPlacement?: "top" | "left";
    size?: "sm" | "md" | "lg";
    radius?: Radius;
    disabled?: boolean;
    formatValue?: (value: number) => string;
    className?: string;
    "aria-label"?: string;
}
declare const Stepper: ({ value, defaultValue, onChange, min, max, step, label, labelPlacement, size, radius, disabled, formatValue, className, "aria-label": ariaLabel, }: StepperProps) => react_jsx_runtime.JSX.Element;

export { Stepper, type StepperProps };
