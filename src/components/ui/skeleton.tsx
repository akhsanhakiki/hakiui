import React from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface SkeletonProps {
  /** Shape shortcut: text renders a short rounded line, circle a disc. */
  variant?: "rect" | "text" | "circle";
  width?: number | string;
  height?: number | string;
  radius?: Radius;
  className?: string;
}

export const Skeleton = ({
  variant = "rect",
  width,
  height,
  radius = "md",
  className = "",
}: SkeletonProps) => {
  const defaults =
    variant === "text"
      ? { width: "100%", height: 12 }
      : variant === "circle"
        ? { width: 40, height: 40 }
        : { width: "100%", height: 20 };

  return (
    <span
      aria-hidden
      className={`block animate-pulse ${className}`}
      style={{
        ...(variant === "circle"
          ? { borderRadius: "9999px" }
          : getRadiusStyle(variant === "text" ? "sm" : radius)),
        width: width ?? defaults.width,
        height: height ?? defaults.height,
        backgroundColor: "var(--hover)",
      }}
    />
  );
};
