import React, { ReactNode } from 'react';
import { Radius } from './radius.js';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    labelPlacement?: "top" | "left";
    description?: ReactNode;
    startContent?: ReactNode;
    endContent?: ReactNode;
    radius?: Radius;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

export { Input, type InputProps };
