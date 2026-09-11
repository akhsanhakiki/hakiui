import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

interface ModelOption {
    value: string;
    label: string;
    description?: string;
    /** Short tag shown next to the label, e.g. "Fast", "Pro". */
    badge?: string;
    disabled?: boolean;
}
interface ModelSelectorProps {
    options: ModelOption[];
    value: string;
    onChange: (value: string) => void;
    /** Menu opens upward — the default inside a bottom-anchored PromptInput. */
    placement?: "top" | "bottom";
    icon?: ReactNode;
    size?: "sm" | "md";
    radius?: Radius;
    disabled?: boolean;
    className?: string;
}
/**
 * A compact model picker for a composer toolbar: a chip-sized trigger and a
 * list with descriptions and a check on the current model. Keyboard: arrows,
 * Enter, Escape. Rendered in place so it sits inside the composer.
 */
declare const ModelSelector: ({ options, value, onChange, placement, icon, size, radius, disabled, className, }: ModelSelectorProps) => react_jsx_runtime.JSX.Element;

export { type ModelOption, ModelSelector, type ModelSelectorProps };
