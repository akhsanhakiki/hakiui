// src/lib/resolve-menu-portal-tokens.ts
var hexToRgb = (value) => {
  const clean = value.replace("#", "").trim();
  if (![3, 6].includes(clean.length)) return null;
  const expanded = clean.length === 3 ? `${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}` : clean;
  const r = Number.parseInt(expanded.slice(0, 2), 16);
  const g = Number.parseInt(expanded.slice(2, 4), 16);
  const b = Number.parseInt(expanded.slice(4, 6), 16);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
  return { r, g, b };
};
var parseRgbColor = (value) => {
  const rgbMatch = value.trim().match(/rgba?\((\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)/i);
  if (!rgbMatch) return null;
  return {
    r: Number.parseInt(rgbMatch[1], 10),
    g: Number.parseInt(rgbMatch[2], 10),
    b: Number.parseInt(rgbMatch[3], 10)
  };
};
var getRelativeLuminance = ({
  r,
  g,
  b
}) => {
  const toLinear = (channel) => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};
var getReadableTextColors = (backgroundColor) => {
  const rgb = parseRgbColor(backgroundColor) ?? hexToRgb(backgroundColor);
  if (!rgb) {
    return {
      foreground: "var(--text)",
      muted: "var(--text-muted)"
    };
  }
  const luminance = getRelativeLuminance(rgb);
  const isDarkBackground = luminance < 0.38;
  return {
    foreground: isDarkBackground ? "#F5F3EC" : "#1C1B17",
    muted: isDarkBackground ? "rgba(245, 243, 236, 0.78)" : "#6E6A5E"
  };
};
var resolveMenuPortalTokens = (computedStyle) => {
  const resolvedBg = computedStyle.getPropertyValue("--bg-soft").trim() || computedStyle.getPropertyValue("--bg").trim() || computedStyle.backgroundColor || "#FAF9F5";
  const resolvedBorder = computedStyle.getPropertyValue("--border").trim() || "rgba(0, 0, 0, 0.08)";
  const resolvedHover = computedStyle.getPropertyValue("--hover").trim() || "rgba(0, 0, 0, 0.06)";
  const resolvedRadius = computedStyle.borderRadius || "4px";
  const resolvedText = computedStyle.getPropertyValue("--text").trim();
  const resolvedTextMuted = computedStyle.getPropertyValue("--text-muted").trim();
  const normalizedHover = resolvedHover.startsWith("rgb(") ? resolvedHover.replace("rgb(", "rgba(").replace(")", ", 0.14)") : resolvedHover.startsWith("rgba(") ? resolvedHover.replace(
    /rgba\(([^)]+),\s*([0-9.]+)\)/i,
    "rgba($1, 0.14)"
  ) : resolvedHover;
  const hoverTextColors = getReadableTextColors(normalizedHover);
  return {
    backgroundColor: resolvedBg,
    borderColor: resolvedBorder,
    borderRadius: resolvedRadius,
    "--dropdown-hover-bg": normalizedHover,
    "--dropdown-hover-fg": hoverTextColors.foreground,
    "--dropdown-hover-muted": hoverTextColors.muted,
    "--dropdown-text": resolvedText || computedStyle.color || "#1C1B17",
    "--dropdown-text-muted": resolvedTextMuted || "#6E6A5E"
  };
};
var PORTAL_THEME_VARS = [
  "--ui-primary",
  "--ui-primary-rgb",
  "--ui-gradient",
  "--ui-primary-bg",
  "--ui-font",
  "--ui-radius",
  "--bg",
  "--bg-soft",
  "--surface",
  "--border",
  "--input",
  "--text",
  "--text-muted",
  "--hover"
];
var resolveThemeVarStyle = (computedStyle) => {
  const style = {};
  for (const name of PORTAL_THEME_VARS) {
    const value = computedStyle.getPropertyValue(name).trim();
    if (value) style[name] = value;
  }
  return style;
};
var defaultMenuPortalStyle = () => ({
  backgroundColor: "var(--bg-soft)",
  borderColor: "var(--border)",
  borderRadius: "4px",
  "--dropdown-hover-bg": "rgba(0, 0, 0, 0.06)",
  "--dropdown-hover-fg": "#1C1B17",
  "--dropdown-hover-muted": "#6E6A5E",
  "--dropdown-text": "#1C1B17",
  "--dropdown-text-muted": "#6E6A5E"
});

export {
  resolveMenuPortalTokens,
  resolveThemeVarStyle,
  defaultMenuPortalStyle
};
//# sourceMappingURL=chunk-SA6EOMZP.js.map