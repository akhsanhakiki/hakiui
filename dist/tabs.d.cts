import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type TabsVariant = "underline" | "segmented";
type TabsSize = "sm" | "md" | "lg";
interface TabsProps {
    items: {
        id: string;
        label: ReactNode;
        content: ReactNode;
    }[];
    variant?: TabsVariant;
    size?: TabsSize;
}
declare const Tabs: ({ items, variant, size, }: TabsProps) => react_jsx_runtime.JSX.Element;

export { Tabs, type TabsProps, type TabsSize, type TabsVariant };
