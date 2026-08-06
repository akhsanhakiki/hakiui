/**
 * Raw design tokens — the single source of truth for both delivery paths.
 *
 * This module must stay free of React (and any other runtime import) so the
 * CSS build script can import the compiled output directly from Node to
 * generate `dist/theme.css`. `theme-provider.tsx` and `lib/chart.ts` re-export
 * from here, so the React path and the plain-CSS path can never drift.
 */

export type ThemeMode = "light" | "dark";

export type NeutralTokens = {
  bg: string;
  bgSoft: string;
  surface: string;
  border: string;
  input: string;
  text: string;
  textMuted: string;
  hover: string;
};

/** Warm paper-white neutrals — the default HakiUI look. */
export const lightNeutrals: NeutralTokens = {
  bg: "#FAF9F5",
  bgSoft: "#F2EFE8",
  surface: "#FFFFFF",
  border: "#E5E1D5",
  input: "#F2EFE8",
  text: "#1C1B17",
  textMuted: "#6E6A5E",
  hover: "#EBE7DC",
};

/** Warm charcoal neutrals for dark mode. */
export const darkNeutrals: NeutralTokens = {
  bg: "#141311",
  bgSoft: "#1C1A17",
  surface: "#22201B",
  border: "#37342C",
  input: "#282521",
  text: "#F5F3EC",
  textMuted: "#A8A294",
  hover: "#322E27",
};

/**
 * Categorical chart palettes, validated for CVD separation, normal-vision
 * separation, lightness band, and surface contrast (light: #FFFFFF/#FAF9F5,
 * dark: #22201B). Slot order is the safety mechanism — assign in order, never
 * cycle or reorder. Past 8 series, fold into "Other" or facet.
 */
export const LIGHT_CHART_COLORS = [
  "#F05423",
  "#4A3AA7",
  "#E34948",
  "#2A78D6",
  "#008300",
  "#E87BA4",
  "#EDA100",
  "#1BAF7A",
] as const;

export const DARK_CHART_COLORS = [
  "#F05423",
  "#9085E9",
  "#E66767",
  "#3987E5",
  "#008300",
  "#D55181",
  "#C98500",
  "#199E70",
] as const;

/** Default brand/shape tokens. Shape of `Theme` in `theme-provider`. */
export const defaultThemeTokens = {
  primaryColor: "#F05423",
  gradientColor: "#FF8C42",
  useGradient: false,
  fontFamily: "'IBM Plex Mono', monospace",
  borderRadius: 4,
  mode: "light" as ThemeMode,
};
