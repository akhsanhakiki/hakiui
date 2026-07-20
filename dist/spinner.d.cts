import * as react_jsx_runtime from 'react/jsx-runtime';

interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    /** "primary" uses the brand color; "current" inherits text color. */
    color?: "primary" | "current";
    label?: string;
    className?: string;
}
declare const Spinner: ({ size, color, label, className, }: SpinnerProps) => react_jsx_runtime.JSX.Element;

export { Spinner, type SpinnerProps };
