import {
  LIGHT_CHART_COLORS
} from "./chunk-QM3UML3O.js";

// src/lib/chart.ts
import { useEffect, useRef, useState } from "react";
var chartColor = (index) => {
  const slot = index % LIGHT_CHART_COLORS.length;
  return `var(--chart-${slot + 1}, ${LIGHT_CHART_COLORS[slot]})`;
};
var seriesColor = (series, index) => series.color ?? chartColor(index);
var niceNum = (value, round) => {
  const exp = Math.floor(Math.log10(value));
  const frac = value / 10 ** exp;
  let niceFrac;
  if (round) {
    niceFrac = frac < 1.5 ? 1 : frac < 3 ? 2 : frac < 7 ? 5 : 10;
  } else {
    niceFrac = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
  }
  return niceFrac * 10 ** exp;
};
var niceScale = (dataMin, dataMax, tickCount = 4) => {
  let lo = Math.min(dataMin, 0);
  let hi = Math.max(dataMax, 0);
  if (lo === hi) hi = lo + 1;
  const range = niceNum(hi - lo, false);
  const step = niceNum(range / Math.max(1, tickCount), true);
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  const ticks = [];
  for (let v = min; v <= max + step / 2; v += step) {
    ticks.push(Math.abs(v) < step / 1e6 ? 0 : Number(v.toPrecision(12)));
  }
  return { min, max, ticks };
};
var formatChartValue = (value) => {
  if (!Number.isFinite(value)) return "\u2013";
  const abs = Math.abs(value);
  if (abs >= 1e9) return `${trimZeros(value / 1e9)}B`;
  if (abs >= 1e6) return `${trimZeros(value / 1e6)}M`;
  if (abs >= 1e4) return `${trimZeros(value / 1e3)}K`;
  return value.toLocaleString();
};
var trimZeros = (value) => value.toFixed(1).replace(/\.0$/, "");
var useContainerWidth = () => {
  const ref = useRef(null);
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

export {
  chartColor,
  seriesColor,
  niceScale,
  formatChartValue,
  useContainerWidth
};
//# sourceMappingURL=chunk-EJKFJGJY.js.map