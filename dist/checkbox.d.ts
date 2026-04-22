import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

declare const Checkbox: ({ checked, onChange, children, radius }: {
    checked: boolean;
    onChange: (val: boolean) => void;
    children?: ReactNode;
    radius?: Radius;
}) => react_jsx_runtime.JSX.Element;

export { Checkbox };
