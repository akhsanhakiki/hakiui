import * as react_jsx_runtime from 'react/jsx-runtime';
import { ChartSeries } from './chart.js';
import './tokens.js';

type BarChartDatum = Record<string, string | number>;
interface BarChartProps {
    data: BarChartDatum[];
    /** Key into each row holding the category label. */
    xKey: string;
    series: ChartSeries[];
    /** Stack series in one bar per category instead of grouping side by side. */
    stacked?: boolean;
    height?: number;
    /** Draw the value above each bar (single series or stacked totals). */
    showValues?: boolean;
    valueFormatter?: (value: number) => string;
    className?: string;
    "aria-label"?: string;
}
declare const BarChart: ({ data, xKey, series, stacked, height, showValues, valueFormatter, className, "aria-label": ariaLabel, }: BarChartProps) => react_jsx_runtime.JSX.Element;

export { BarChart, type BarChartDatum, type BarChartProps };
