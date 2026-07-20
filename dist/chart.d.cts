/**
 * Categorical chart palettes, validated for CVD separation, normal-vision
 * separation, lightness band, and surface contrast (light: #FFFFFF/#FAF9F5,
 * dark: #22201B). Slot order is the safety mechanism — assign in order, never
 * cycle or reorder. Past 8 series, fold into "Other" or facet.
 */
declare const LIGHT_CHART_COLORS: readonly ["#F05423", "#4A3AA7", "#E34948", "#2A78D6", "#008300", "#E87BA4", "#EDA100", "#1BAF7A"];
declare const DARK_CHART_COLORS: readonly ["#F05423", "#9085E9", "#E66767", "#3987E5", "#008300", "#D55181", "#C98500", "#199E70"];
/**
 * Series color for slot `index`: reads `--chart-N` (set per mode by
 * HakiProvider) and falls back to the light palette.
 */
declare const chartColor: (index: number) => string;
type ChartSeries = {
    /** Key into each data row holding this series' numeric value. */
    key: string;
    /** Legend / tooltip label. Defaults to the key. */
    label?: string;
    /** Override the palette slot color. */
    color?: string;
};
declare const seriesColor: (series: ChartSeries, index: number) => string;
type NiceScale = {
    min: number;
    max: number;
    ticks: number[];
};
declare const niceScale: (dataMin: number, dataMax: number, tickCount?: number) => NiceScale;
declare const formatChartValue: (value: number) => string;
/** Observe the rendered width of a container so charts stay responsive. */
declare const useContainerWidth: <T extends HTMLElement>() => [React.RefObject<T | null>, number];

export { type ChartSeries, DARK_CHART_COLORS, LIGHT_CHART_COLORS, type NiceScale, chartColor, formatChartValue, niceScale, seriesColor, useContainerWidth };
