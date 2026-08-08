import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

type DrawerSide = "left" | "right" | "top" | "bottom";
interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    /** Edge the drawer slides in from. Defaults to "left". */
    side?: DrawerSide;
    /** Panel width (left/right) or height (top/bottom). Defaults to "320px". */
    size?: string;
    title?: ReactNode;
    children: ReactNode;
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
    className?: string;
}
declare const Drawer: ({ isOpen, onClose, side, size, title, children, closeOnOverlayClick, showCloseButton, className, }: DrawerProps) => react_jsx_runtime.JSX.Element;

export { Drawer, type DrawerProps, type DrawerSide };
