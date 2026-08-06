export { DARK_CHART_COLORS, LIGHT_CHART_COLORS } from './tokens.cjs';

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

export { type ChartSeries, type NiceScale, chartColor, formatChartValue, niceScale, seriesColor, useContainerWidth };
