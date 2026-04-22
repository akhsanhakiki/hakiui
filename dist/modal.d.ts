import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}
declare const Modal: ({ isOpen, onClose, title, children }: ModalProps) => react_jsx_runtime.JSX.Element | null;

export { Modal, type ModalProps };
