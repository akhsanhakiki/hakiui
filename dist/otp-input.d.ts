import * as react_jsx_runtime from 'react/jsx-runtime';
import { Radius } from './radius.js';
import 'react';

interface OtpInputProps {
    /** Number of cells. Default 6. */
    length?: number;
    value: string;
    onChange: (value: string) => void;
    /** Called once every cell is filled. */
    onComplete?: (value: string) => void;
    /** Insert a visual gap after these cell indexes (1-based), e.g. [3]. */
    groups?: number[];
    size?: "sm" | "md" | "lg";
    radius?: Radius;
    disabled?: boolean;
    autoFocus?: boolean;
    /** Restrict to digits (default) or allow letters too. */
    mode?: "numeric" | "alphanumeric";
    label?: string;
    className?: string;
}
/**
 * One-time-code entry: a cell per character, paste fills every cell,
 * Backspace walks back, arrows move. The value is a plain string so it can
 * be controlled like any input.
 */
declare const OtpInput: ({ length, value, onChange, onComplete, groups, size, radius, disabled, autoFocus, mode, label, className, }: OtpInputProps) => react_jsx_runtime.JSX.Element;

export { OtpInput, type OtpInputProps };
