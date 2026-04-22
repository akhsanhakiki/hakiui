import { CSSProperties } from 'react';

type Radius = "none" | "sm" | "md" | "lg" | "full";
declare const getRadiusStyle: (radius?: Radius) => CSSProperties;

export { type Radius, getRadiusStyle };
