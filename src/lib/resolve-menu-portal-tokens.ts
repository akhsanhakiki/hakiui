import type { CSSProperties } from "react";

export type MenuPortalStyle = CSSProperties & {
  "--dropdown-hover-bg": string;
  "--dropdown-hover-fg": string;
  "--dropdown-hover-muted": string;
  "--dropdown-text": string;
  "--dropdown-text-muted": string;
};

const hexToRgb = (value: string) => {
  const clean = value.replace("#", "").trim();
  if (![3, 6].includes(clean.length)) return null;
  const expanded =
    clean.length === 3
      ? `${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`
      : clean;
  const r = Number.parseInt(expanded.slice(0, 2), 16);
  const g = Number.parseInt(expanded.slice(2, 4), 16);
  const b = Number.parseInt(expanded.slice(4, 6), 16);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
  return { r, g, b };
};

const parseRgbColor = (value: string) => {
  const rgbMatch = value
    .trim()
    .match(/rgba?\((\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)/i);
  if (!rgbMatch) return null;
  return {
    r: Number.parseInt(rgbMatch[1], 10),
    g: Number.parseInt(rgbMatch[2], 10),
    b: Number.parseInt(rgbMatch[3], 10),
  };
};

const getRelativeLuminance = ({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}) => {
  const toLinear = (channel: number) => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};

const getReadableTextColors = (backgroundColor: string) => {
  const rgb = parseRgbColor(backgroundColor) ?? hexToRgb(backgroundColor);
  if (!rgb) {
    return {
      foreground: "var(--text)",
      muted: "var(--text-muted)",
    };
  }

  const luminance = getRelativeLuminance(rgb);
  const isDarkBackground = luminance < 0.38;

  return {
    foreground: isDarkBackground ? "#F5F6F8" : "#111827",
    muted: isDarkBackground ? "rgba(245, 246, 248, 0.78)" : "#4B5563",
  };
};

/** Theme tokens for portal menus (Dropdown, Autocomplete), read from trigger/shell element. */
export const resolveMenuPortalTokens = (
  computedStyle: CSSStyleDeclaration,
): Omit<MenuPortalStyle, keyof CSSProperties> & {
  backgroundColor: string;
  borderColor: string;
  borderRadius: string;
} => {
  const resolvedBg =
    computedStyle.getPropertyValue("--bg-soft").trim() ||
    computedStyle.getPropertyValue("--bg").trim() ||
    computedStyle.backgroundColor ||
    "#fff";
  const resolvedBorder =
    computedStyle.getPropertyValue("--border").trim() ||
    "rgba(0, 0, 0, 0.08)";
  const resolvedHover =
    computedStyle.getPropertyValue("--hover").trim() ||
    "rgba(0, 0, 0, 0.06)";
  const resolvedRadius = computedStyle.borderRadius || "12px";
  const resolvedText = computedStyle.getPropertyValue("--text").trim();
  const resolvedTextMuted = computedStyle
    .getPropertyValue("--text-muted")
    .trim();

  const normalizedHover = resolvedHover.startsWith("rgb(")
    ? resolvedHover.replace("rgb(", "rgba(").replace(")", ", 0.14)")
    : resolvedHover.startsWith("rgba(")
      ? resolvedHover.replace(
          /rgba\(([^)]+),\s*([0-9.]+)\)/i,
          "rgba($1, 0.14)",
        )
      : resolvedHover;
  const hoverTextColors = getReadableTextColors(normalizedHover);

  return {
    backgroundColor: resolvedBg,
    borderColor: resolvedBorder,
    borderRadius: resolvedRadius,
    "--dropdown-hover-bg": normalizedHover,
    "--dropdown-hover-fg": hoverTextColors.foreground,
    "--dropdown-hover-muted": hoverTextColors.muted,
    "--dropdown-text": resolvedText || computedStyle.color || "#111827",
    "--dropdown-text-muted": resolvedTextMuted || "#6B7280",
  };
};

export const defaultMenuPortalStyle = (): MenuPortalStyle => ({
  backgroundColor: "var(--bg-soft)",
  borderColor: "var(--border)",
  borderRadius: "12px",
  "--dropdown-hover-bg": "rgba(0, 0, 0, 0.06)",
  "--dropdown-hover-fg": "#111827",
  "--dropdown-hover-muted": "#4B5563",
  "--dropdown-text": "#111827",
  "--dropdown-text-muted": "#6B7280",
});
