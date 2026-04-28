import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

declare const Accordion: ({ children, className, }: {
    children: ReactNode;
    className?: string;
}) => react_jsx_runtime.JSX.Element;
declare const AccordionItem: ({ title, children, radius, }: {
    title: string;
    children: ReactNode;
    radius?: Radius;
}) => react_jsx_runtime.JSX.Element;

export { Accordion, AccordionItem };
