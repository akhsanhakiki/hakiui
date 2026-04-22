import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.js';

declare const Table: ({ children, radius }: {
    children: ReactNode;
    radius?: Radius;
}) => react_jsx_runtime.JSX.Element;
declare const TableHeader: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const TableColumn: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const TableBody: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const TableRow: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;
declare const TableCell: ({ children }: {
    children: ReactNode;
}) => react_jsx_runtime.JSX.Element;

export { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow };
