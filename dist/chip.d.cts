import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.cjs';

interface ChipProps {
    children: ReactNode;
    /** Renders as a button when set. */
    onClick?: () => void;
    /** Shows a remove affordance and renders it as a second button. */
    onRemove?: () => void;
    selected?: boolean;
    disabled?: boolean;
    size?: "sm" | "md";
    color?: "primary" | "neutral";
    icon?: ReactNode;
    radius?: Radius;
    className?: string;
}
/**
 * An interactive tag: a suggestion, a filter, a selected option. Unlike
 * Badge it is meant to be clicked, so it has hover, selected and disabled
 * states and an optional remove button.
 */
declare const Chip: ({ children, onClick, onRemove, selected, disabled, size, color, icon, radius, className, }: ChipProps) => react_jsx_runtime.JSX.Element;

export { Chip, type ChipProps };
