import * as react_jsx_runtime from 'react/jsx-runtime';
import { ChartSeries } from './chart.js';

type LineChartDatum = Record<string, string | number>;
interface LineChartProps {
    data: LineChartDatum[];
    /** Key into each row holding the x-axis label. */
    xKey: string;
    series: ChartSeries[];
    /** Fill a soft area under each line. */
    area?: boolean;
    /** "smooth" (default) draws a monotone curve; "linear" straight segments. */
    curve?: "smooth" | "linear";
    height?: number;
    /** Always render point markers (they always appear on hover). */
    showDots?: boolean;
    valueFormatter?: (value: number) => string;
    className?: string;
    "aria-label"?: string;
}
declare const LineChart: ({ data, xKey, series, area, curve, height, showDots, valueFormatter, className, "aria-label": ariaLabel, }: LineChartProps) => react_jsx_runtime.JSX.Element;

export { LineChart, type LineChartDatum, type LineChartProps };
