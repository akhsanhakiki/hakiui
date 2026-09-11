import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

interface KbdProps {
    /** Keys rendered as separate caps, e.g. ["⌘", "K"]. */
    keys?: string[];
    children?: ReactNode;
    size?: "sm" | "md";
    className?: string;
}
/** A keyboard shortcut: one cap per key, in the UI mono stack. */
declare const Kbd: ({ keys, children, size, className }: KbdProps) => react_jsx_runtime.JSX.Element;

export { Kbd, type KbdProps };
