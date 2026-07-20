import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

type BadgeColor = "primary" | "neutral" | "success" | "warning" | "danger";
type BadgeVariant = "solid" | "soft" | "outline";
interface BadgeProps {
    children: ReactNode;
    color?: BadgeColor;
    variant?: BadgeVariant;
    size?: "sm" | "md";
    radius?: Radius;
    className?: string;
}
declare const Badge: ({ children, color, variant, size, radius, className, }: BadgeProps) => react_jsx_runtime.JSX.Element;

export { Badge, type BadgeColor, type BadgeProps, type BadgeVariant };
