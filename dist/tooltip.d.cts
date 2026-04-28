import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

declare const Tooltip: ({ content, position, children, }: {
    content: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;

export { Tooltip };
