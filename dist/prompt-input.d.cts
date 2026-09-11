import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.cjs';

interface PromptInputProps {
    value: string;
    onChange: (value: string) => void;
    /** Called with the trimmed draft on Enter or the send button. */
    onSubmit: (value: string) => void;
    /** While a response streams the send button becomes a stop button. */
    streaming?: boolean;
    onStop?: () => void;
    placeholder?: string;
    /** Grows with content up to this many rows, then scrolls. */
    maxRows?: number;
    disabled?: boolean;
    /** Toolbar slots on the bottom row: model picker, attach, etc. */
    leading?: ReactNode;
    trailing?: ReactNode;
    /** Hint under the box, e.g. "Enter to send · Shift+Enter for a new line". */
    hint?: ReactNode;
    autoFocus?: boolean;
    radius?: Radius;
    className?: string;
    "aria-label"?: string;
}
/**
 * The chat composer: an auto-growing textarea in a bordered box with a
 * toolbar row. Enter sends, Shift+Enter breaks a line; the send button turns
 * into a stop button while `streaming`. Focus returns to the textarea when a
 * stream ends so the user can keep typing.
 */
declare const PromptInput: ({ value, onChange, onSubmit, streaming, onStop, placeholder, maxRows, disabled, leading, trailing, hint, autoFocus, radius, className, "aria-label": ariaLabel, }: PromptInputProps) => react_jsx_runtime.JSX.Element;

export { PromptInput, type PromptInputProps };
