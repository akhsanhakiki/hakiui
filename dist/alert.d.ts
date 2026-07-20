import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

type AlertVariant = "info" | "success" | "warning" | "danger";
interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children?: ReactNode;
    radius?: Radius;
    /** Called when the user dismisses the alert; omit to hide the close button. */
    onClose?: () => void;
    className?: string;
}
declare const Alert: ({ variant, title, children, radius, onClose, className, }: AlertProps) => react_jsx_runtime.JSX.Element;

export { Alert, type AlertProps, type AlertVariant };
