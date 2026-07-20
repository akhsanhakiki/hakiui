import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type BreadcrumbItem = {
    label: ReactNode;
    href?: string;
    onClick?: () => void;
};
interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    separator?: ReactNode;
    className?: string;
}
declare const Breadcrumbs: ({ items, separator, className, }: BreadcrumbsProps) => react_jsx_runtime.JSX.Element;

export { type BreadcrumbItem, Breadcrumbs, type BreadcrumbsProps };
