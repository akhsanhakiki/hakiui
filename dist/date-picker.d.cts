import * as react_jsx_runtime from 'react/jsx-runtime';
import { Radius } from './radius.cjs';
import 'react';

interface DatePickerProps {
    value?: Date | null;
    defaultValue?: Date | null;
    onChange?: (date: Date | null) => void;
    label?: string;
    placeholder?: string;
    size?: "sm" | "md" | "lg";
    radius?: Radius;
    disabled?: boolean;
    /** Allow clearing the selection with an inline × button. */
    clearable?: boolean;
    minDate?: Date;
    maxDate?: Date;
    /** Format the value shown in the trigger. */
    formatValue?: (date: Date) => string;
    className?: string;
}
declare const DatePicker: ({ value, defaultValue, onChange, label, placeholder, size, radius, disabled, clearable, minDate, maxDate, formatValue, className, }: DatePickerProps) => react_jsx_runtime.JSX.Element;

export { DatePicker, type DatePickerProps };
