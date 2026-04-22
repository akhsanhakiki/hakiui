import React from 'react';
import { Radius } from './radius.js';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "solid" | "bordered" | "light" | "flat";
    size?: "sm" | "md" | "lg";
    radius?: Radius;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

export { Button, type ButtonProps };
