import * as react_jsx_runtime from 'react/jsx-runtime';
import { Radius } from './radius.cjs';
import 'react';

type ProgressColor = "primary" | "success" | "warning" | "danger";
interface ProgressProps {
    /** 0–100. Ignored when `indeterminate` is set. */
    value?: number;
    size?: "sm" | "md" | "lg";
    color?: ProgressColor;
    label?: string;
    /** Show the percentage next to the label. */
    showValue?: boolean;
    indeterminate?: boolean;
    radius?: Radius;
    className?: string;
}
declare const Progress: ({ value, size, color, label, showValue, indeterminate, radius, className, }: ProgressProps) => react_jsx_runtime.JSX.Element;

export { Progress, type ProgressColor, type ProgressProps };
