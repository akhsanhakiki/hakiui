/**
 * Raw design tokens — the single source of truth for both delivery paths.
 *
 * This module must stay free of React (and any other runtime import) so the
 * CSS build script can import the compiled output directly from Node to
 * generate `dist/theme.css`. `theme-provider.tsx` and `lib/chart.ts` re-export
 * from here, so the React path and the plain-CSS path can never drift.
 */
type ThemeMode = "light" | "dark";
type NeutralTokens = {
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
declare const lightNeutrals: NeutralTokens;
/** Warm charcoal neutrals for dark mode. */
declare const darkNeutrals: NeutralTokens;
/**
 * Categorical chart palettes, validated for CVD separation, normal-vision
 * separation, lightness band, and surface contrast (light: #FFFFFF/#FAF9F5,
 * dark: #22201B). Slot order is the safety mechanism — assign in order, never
 * cycle or reorder. Past 8 series, fold into "Other" or facet.
 */
declare const LIGHT_CHART_COLORS: readonly ["#F05423", "#4A3AA7", "#E34948", "#2A78D6", "#008300", "#E87BA4", "#EDA100", "#1BAF7A"];
declare const DARK_CHART_COLORS: readonly ["#F05423", "#9085E9", "#E66767", "#3987E5", "#008300", "#D55181", "#C98500", "#199E70"];
/** Default brand/shape tokens. Shape of `Theme` in `theme-provider`. */
declare const defaultThemeTokens: {
    primaryColor: string;
    gradientColor: string;
    useGradient: boolean;
    fontFamily: string;
    borderRadius: number;
    mode: ThemeMode;
};

export { DARK_CHART_COLORS, LIGHT_CHART_COLORS, type NeutralTokens, type ThemeMode, darkNeutrals, defaultThemeTokens, lightNeutrals };
