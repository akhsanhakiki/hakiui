import * as react_jsx_runtime from 'react/jsx-runtime';

interface SliderProps {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    /** Show the current value next to the label. */
    showValue?: boolean;
    formatValue?: (value: number) => string;
    size?: "sm" | "md";
    disabled?: boolean;
    className?: string;
}
declare const Slider: ({ value, defaultValue, onChange, min, max, step, label, showValue, formatValue, size, disabled, className, }: SliderProps) => react_jsx_runtime.JSX.Element;

export { Slider, type SliderProps };
