import * as react_jsx_runtime from 'react/jsx-runtime';
import { Radius } from './radius.js';
import 'react';

interface SkeletonProps {
    /** Shape shortcut: text renders a short rounded line, circle a disc. */
    variant?: "rect" | "text" | "circle";
    width?: number | string;
    height?: number | string;
    radius?: Radius;
    className?: string;
}
declare const Skeleton: ({ variant, width, height, radius, className, }: SkeletonProps) => react_jsx_runtime.JSX.Element;

export { Skeleton, type SkeletonProps };
