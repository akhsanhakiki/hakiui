import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

interface SidebarProps {
    children: ReactNode;
    /** Brand / new-chat area at the top. */
    header?: ReactNode;
    /** Account / settings area pinned to the bottom. */
    footer?: ReactNode;
    /** Rail mode: 56px wide, items show icons only. */
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    width?: number;
    className?: string;
    "aria-label"?: string;
}
/**
 * The app-shell navigation column of an AI product: brand + new chat on top,
 * grouped history in the middle, account at the bottom. Collapses to an
 * icon rail. Children are `SidebarSection`s of `SidebarItem`s.
 */
declare const Sidebar: ({ children, header, footer, collapsed, onCollapsedChange, width, className, "aria-label": ariaLabel, }: SidebarProps) => react_jsx_runtime.JSX.Element;
interface SidebarSectionProps {
    /** Group title, e.g. "Pinned", "Today". Hidden in rail mode. */
    title?: string;
    action?: ReactNode;
    children: ReactNode;
}
declare const SidebarSection: ({ title, action, children }: SidebarSectionProps) => react_jsx_runtime.JSX.Element;
interface SidebarItemProps {
    children: ReactNode;
    icon?: ReactNode;
    active?: boolean;
    /** Secondary line, e.g. a relative date. Hidden in rail mode. */
    meta?: ReactNode;
    /** Hover-revealed controls, e.g. a Menu. */
    actions?: ReactNode;
    onClick?: () => void;
    href?: string;
    radius?: Radius;
}
declare const SidebarItem: ({ children, icon, active, meta, actions, onClick, href, radius }: SidebarItemProps) => react_jsx_runtime.JSX.Element;

export { Sidebar, SidebarItem, type SidebarItemProps, type SidebarProps, SidebarSection, type SidebarSectionProps };
