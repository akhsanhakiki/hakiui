import React from "react";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  /** "primary" uses the brand color; "current" inherits text color. */
  color?: "primary" | "current";
  label?: string;
  className?: string;
}

const SIZES = { sm: 16, md: 22, lg: 30 } as const;

export const Spinner = ({
  size = "md",
  color = "primary",
  label = "Loading",
  className = "",
}: SpinnerProps) => {
  const px = SIZES[size];
  const stroke = color === "primary" ? "var(--ui-primary)" : "currentColor";

  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex ${className}`}
    >
      <svg
        className="animate-spin"
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={stroke}
          strokeOpacity="0.25"
          strokeWidth="3"
        />
        <path
          d="M22 12a10 10 0 0 0-10-10"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};
