import { useEffect, useRef, useState } from "react";

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

/**
 * Series color for slot `index`: reads `--chart-N` (set per mode by
 * HakiProvider) and falls back to the light palette.
 */
export const chartColor = (index: number): string => {
  const slot = index % LIGHT_CHART_COLORS.length;
  return `var(--chart-${slot + 1}, ${LIGHT_CHART_COLORS[slot]})`;
};

export type ChartSeries = {
  /** Key into each data row holding this series' numeric value. */
  key: string;
  /** Legend / tooltip label. Defaults to the key. */
  label?: string;
  /** Override the palette slot color. */
  color?: string;
};

export const seriesColor = (series: ChartSeries, index: number): string =>
  series.color ?? chartColor(index);

/** Round a raw step to 1/2/5 × 10^n so axis ticks land on friendly numbers. */
const niceNum = (value: number, round: boolean): number => {
  const exp = Math.floor(Math.log10(value));
  const frac = value / 10 ** exp;
  let niceFrac: number;
  if (round) {
    niceFrac = frac < 1.5 ? 1 : frac < 3 ? 2 : frac < 7 ? 5 : 10;
  } else {
    niceFrac = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
  }
  return niceFrac * 10 ** exp;
};

export type NiceScale = { min: number; max: number; ticks: number[] };

export const niceScale = (
  dataMin: number,
  dataMax: number,
  tickCount = 4,
): NiceScale => {
  let lo = Math.min(dataMin, 0);
  let hi = Math.max(dataMax, 0);
  if (lo === hi) hi = lo + 1;
  const range = niceNum(hi - lo, false);
  const step = niceNum(range / Math.max(1, tickCount), true);
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  const ticks: number[] = [];
  for (let v = min; v <= max + step / 2; v += step) {
    ticks.push(Math.abs(v) < step / 1e6 ? 0 : Number(v.toPrecision(12)));
  }
  return { min, max, ticks };
};

export const formatChartValue = (value: number): string => {
  if (!Number.isFinite(value)) return "–";
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${trimZeros(value / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${trimZeros(value / 1_000_000)}M`;
  if (abs >= 10_000) return `${trimZeros(value / 1_000)}K`;
  return value.toLocaleString();
};

const trimZeros = (value: number): string =>
  value.toFixed(1).replace(/\.0$/, "");

/** Observe the rendered width of a container so charts stay responsive. */
export const useContainerWidth = <T extends HTMLElement>(): [
  React.RefObject<T | null>,
  number,
] => {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => setWidth(el.getBoundingClientRect().width);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width];
};
