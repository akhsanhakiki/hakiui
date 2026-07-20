import React, { useState, type ReactNode } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Used for the initials fallback and, if `alt` is absent, the alt text. */
  name?: string;
  size?: AvatarSize;
  radius?: Radius;
  className?: string;
}

const SIZE_META: Record<AvatarSize, { box: string; text: string; px: number }> =
  {
    sm: { box: "h-7 w-7", text: "text-[10px]", px: 28 },
    md: { box: "h-9 w-9", text: "text-xs", px: 36 },
    lg: { box: "h-11 w-11", text: "text-sm", px: 44 },
    xl: { box: "h-14 w-14", text: "text-base", px: 56 },
  };

const initialsOf = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export const Avatar = ({
  src,
  alt,
  name = "",
  size = "md",
  radius = "full",
  className = "",
}: AvatarProps) => {
  const [failed, setFailed] = useState(false);
  const meta = SIZE_META[size];
  const showImage = !!src && !failed;

  return (
    <span
      className={`inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium ${meta.box} ${meta.text} ${className}`}
      style={{
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        backgroundColor: showImage
          ? "var(--bg-soft)"
          : "color-mix(in srgb, var(--ui-primary) 14%, var(--bg-soft))",
        color: "var(--ui-primary)",
        border: "0.5px solid var(--border)",
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : name ? (
        initialsOf(name)
      ) : (
        <svg
          viewBox="0 0 24 24"
          width={meta.px * 0.55}
          height={meta.px * 0.55}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4 0-8 2-8 5.5V21h16v-1.5c0-3.5-4-5.5-8-5.5Z" />
        </svg>
      )}
    </span>
  );
};

export interface AvatarGroupProps {
  children: ReactNode;
  /** Show at most this many avatars, folding the rest into a +N counter. */
  max?: number;
  size?: AvatarSize;
  radius?: Radius;
  className?: string;
}

export const AvatarGroup = ({
  children,
  max = 4,
  size = "md",
  radius = "full",
  className = "",
}: AvatarGroupProps) => {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const hidden = items.length - visible.length;
  const meta = SIZE_META[size];

  return (
    <div className={`flex items-center ${className}`}>
      {visible.map((child, i) => (
        <span
          key={i}
          className={i > 0 ? "-ml-2.5" : ""}
          style={{
            borderRadius: "9999px",
            boxShadow: "0 0 0 2px var(--bg)",
          }}
        >
          {child}
        </span>
      ))}
      {hidden > 0 && (
        <span
          className={`-ml-2.5 inline-flex shrink-0 items-center justify-center font-medium ${meta.box} ${meta.text}`}
          style={{
            ...getRadiusStyle(radius),
            fontFamily: "var(--ui-font)",
            backgroundColor: "var(--hover)",
            color: "var(--text-muted)",
            boxShadow: "0 0 0 2px var(--bg)",
          }}
        >
          +{hidden}
        </span>
      )}
    </div>
  );
};
