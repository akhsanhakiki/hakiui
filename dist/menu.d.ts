import * as react_jsx_runtime from 'react/jsx-runtime';
import React, { ReactNode } from 'react';
import { Radius } from './radius.js';

type MenuItem = {
    label: string;
    description?: string;
    icon?: ReactNode;
    /** Shortcut caps, e.g. ["⌘", "N"]. */
    shortcut?: string[];
    danger?: boolean;
    disabled?: boolean;
    onSelect: () => void;
} | {
    heading: string;
} | {
    separator: true;
};
interface MenuProps {
    items: MenuItem[];
    /** Renders the trigger; spread `props` onto a button-like element. */
    trigger: (props: {
        ref: React.Ref<HTMLButtonElement>;
        onClick: () => void;
        "aria-haspopup": "menu";
        "aria-expanded": boolean;
        "aria-controls": string;
    }) => ReactNode;
    placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
    radius?: Radius;
    className?: string;
}
/**
 * An action menu — the "…" on a list row, the file menu, the account menu.
 * Keyboard: arrows move, Enter/Space selects, Escape closes; outside clicks
 * close. Rendered in place (absolute), so put it where it can overflow.
 */
declare const Menu: ({ items, trigger, placement, radius, className }: MenuProps) => react_jsx_runtime.JSX.Element;

export { Menu, type MenuItem, type MenuProps };
