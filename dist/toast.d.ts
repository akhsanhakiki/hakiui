import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

type ToastVariant = "default" | "success" | "error" | "warning" | "info";
type ToastOptions = {
    title: string;
    description?: ReactNode;
    variant?: ToastVariant;
    /** Auto-dismiss delay in ms. Pass 0 to keep the toast until closed. */
    duration?: number;
};
type ToastContextType = {
    toast: (options: ToastOptions) => number;
    dismiss: (id: number) => void;
};
declare const useToast: () => ToastContextType;
type ToastProviderProps = {
    children: ReactNode;
    /** Corner where toasts stack. */
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    radius?: Radius;
};
declare const ToastProvider: ({ children, position, radius, }: ToastProviderProps) => react_jsx_runtime.JSX.Element;

export { type ToastOptions, ToastProvider, type ToastProviderProps, type ToastVariant, useToast };
