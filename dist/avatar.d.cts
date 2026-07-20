import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { Radius } from './radius.cjs';

type AvatarSize = "sm" | "md" | "lg" | "xl";
interface AvatarProps {
    src?: string;
    alt?: string;
    /** Used for the initials fallback and, if `alt` is absent, the alt text. */
    name?: string;
    size?: AvatarSize;
    radius?: Radius;
    className?: string;
}
declare const Avatar: ({ src, alt, name, size, radius, className, }: AvatarProps) => react_jsx_runtime.JSX.Element;
interface AvatarGroupProps {
    children: ReactNode;
    /** Show at most this many avatars, folding the rest into a +N counter. */
    max?: number;
    size?: AvatarSize;
    radius?: Radius;
    className?: string;
}
declare const AvatarGroup: ({ children, max, size, radius, className, }: AvatarGroupProps) => react_jsx_runtime.JSX.Element;

export { Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, type AvatarSize };
