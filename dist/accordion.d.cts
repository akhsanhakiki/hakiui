import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

declare const Accordion: ({ children, className, }: {
    children: ReactNode;
    className?: string;
}) => react_jsx_runtime.JSX.Element;
declare const AccordionItem: ({ title, children, }: {
    title: string;
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;

export { Accordion, AccordionItem };
