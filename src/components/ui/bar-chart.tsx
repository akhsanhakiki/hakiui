import React, { useMemo, useState } from "react";
import {
  formatChartValue,
  niceScale,
  seriesColor,
  useContainerWidth,
  type ChartSeries,
} from "../../lib/chart";

export type BarChartDatum = Record<string, string | number>;

export interface BarChartProps {
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

const Y_TICKS = 4;
const SEGMENT_GAP = 2;

/** Rect path with only the top corners rounded, anchored to the baseline. */
const roundedTopRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): string => {
  const radius = Math.max(0, Math.min(r, w / 2, h));
  return [
    `M ${x} ${y + h}`,
    `L ${x} ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    `L ${x + w - radius} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + radius}`,
    `L ${x + w} ${y + h}`,
    "Z",
  ].join(" ");
};

export const BarChart = ({
  data,
  xKey,
  series,
  stacked = false,
  height = 260,
  showValues = false,
  valueFormatter = formatChartValue,
  className = "",
  "aria-label": ariaLabel,
}: BarChartProps) => {
  const [containerRef, width] = useContainerWidth<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const numeric = (row: BarChartDatum, key: string): number => {
    const v = row[key];
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };

  const scale = useMemo(() => {
    let max = 0;
    let min = 0;
    for (const row of data) {
      if (stacked) {
        const total = series.reduce((sum, s) => sum + numeric(row, s.key), 0);
        max = Math.max(max, total);
      } else {
        for (const s of series) {
          max = Math.max(max, numeric(row, s.key));
          min = Math.min(min, numeric(row, s.key));
        }
      }
    }
    return niceScale(min, max, Y_TICKS);
  }, [data, series, stacked]);

  const margin = {
    top: showValues ? 24 : 12,
    right: 8,
    bottom: 24,
    left:
      10 + Math.max(...scale.ticks.map((t) => valueFormatter(t).length)) * 7.5,
  };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const yFor = (value: number) =>
    margin.top +
    innerHeight -
    ((value - scale.min) / (scale.max - scale.min)) * innerHeight;
  const baselineY = yFor(0);

  const bandWidth = data.length > 0 ? innerWidth / data.length : 0;
  const bandPadding = Math.min(bandWidth * 0.2, 24);
  const groupWidth = Math.max(0, bandWidth - bandPadding * 2);
  const labelEvery = Math.max(1, Math.ceil((data.length * 64) / (innerWidth || 1)));

  const hoveredRow = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ fontFamily: "var(--ui-font)" }}
    >
      {series.length >= 2 && (
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {series.map((s, i) => (
            <span
              key={s.key}
              className="flex items-center gap-1.5 text-xs text-(--text-muted)"
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-[3px]"
                style={{ backgroundColor: seriesColor(s, i) }}
              />
              {s.label ?? s.key}
            </span>
          ))}
        </div>
      )}
      {width > 0 && data.length > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={ariaLabel ?? "Bar chart"}
          onMouseLeave={() => setHoverIndex(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = e.clientX - rect.left;
            setPointer({ x: px, y: e.clientY - rect.top });
            const index = Math.floor((px - margin.left) / (bandWidth || 1));
            setHoverIndex(
              index >= 0 && index < data.length && px >= margin.left
                ? index
                : null,
            );
          }}
        >
          {scale.ticks.map((tick) => (
            <g key={tick}>
              <line
                x1={margin.left}
                x2={width - margin.right}
                y1={yFor(tick)}
                y2={yFor(tick)}
                stroke="var(--border)"
                strokeWidth={tick === 0 ? 1 : 0.5}
                opacity={tick === 0 ? 1 : 0.7}
              />
              <text
                x={margin.left - 8}
                y={yFor(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                fill="var(--text-muted)"
              >
                {valueFormatter(tick)}
              </text>
            </g>
          ))}
          {data.map((row, rowIndex) => {
            const bandX = margin.left + rowIndex * bandWidth;
            const dimmed = hoverIndex !== null && hoverIndex !== rowIndex;
            let stackY = baselineY;
            const total = series.reduce(
              (sum, s) => sum + numeric(row, s.key),
              0,
            );
            return (
              <g
                key={`${row[xKey]}-${rowIndex}`}
                opacity={dimmed ? 0.45 : 1}
                style={{ transition: "opacity 0.15s ease" }}
              >
                {series.map((s, seriesIndex) => {
                  const value = numeric(row, s.key);
                  const color = seriesColor(s, seriesIndex);
                  if (stacked) {
                    const h = Math.max(
                      0,
                      (value / (scale.max - scale.min)) * innerHeight,
                    );
                    const isTop = seriesIndex === series.length - 1;
                    const gap = isTop ? 0 : SEGMENT_GAP;
                    const segH = Math.max(0, h - gap);
                    const y = stackY - h;
                    stackY = y;
                    const barX = bandX + (bandWidth - groupWidth) / 2;
                    if (segH <= 0) return null;
                    return isTop ? (
                      <path
                        key={s.key}
                        d={roundedTopRect(barX, y, groupWidth, segH, 4)}
                        fill={color}
                      />
                    ) : (
                      <rect
                        key={s.key}
                        x={barX}
                        y={y + gap}
                        width={groupWidth}
                        height={segH}
                        fill={color}
                      />
                    );
                  }
                  const barWidth = Math.max(
                    2,
                    (groupWidth - SEGMENT_GAP * (series.length - 1)) /
                      series.length,
                  );
                  const barX =
                    bandX +
                    (bandWidth - groupWidth) / 2 +
                    seriesIndex * (barWidth + SEGMENT_GAP);
                  const y = value >= 0 ? yFor(value) : baselineY;
                  const h = Math.abs(yFor(value) - baselineY);
                  if (h <= 0) return null;
                  return (
                    <path
                      key={s.key}
                      d={roundedTopRect(barX, y, barWidth, h, 4)}
                      fill={color}
                    />
                  );
                })}
                {showValues && (
                  <text
                    x={bandX + bandWidth / 2}
                    y={
                      (stacked
                        ? yFor(total)
                        : yFor(
                            Math.max(...series.map((s) => numeric(row, s.key))),
                          )) - 6
                    }
                    textAnchor="middle"
                    fontSize={11}
                    fill="var(--text-muted)"
                  >
                    {valueFormatter(
                      stacked
                        ? total
                        : Math.max(...series.map((s) => numeric(row, s.key))),
                    )}
                  </text>
                )}
                {rowIndex % labelEvery === 0 && (
                  <text
                    x={bandX + bandWidth / 2}
                    y={height - 6}
                    textAnchor="middle"
                    fontSize={11}
                    fill="var(--text-muted)"
                  >
                    {String(row[xKey])}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      )}
      {hoveredRow && (
        <div
          className="pointer-events-none absolute z-10 min-w-32 rounded-md px-3 py-2 text-xs shadow-lg"
          style={{
            left: Math.min(pointer.x + 12, Math.max(0, width - 150)),
            top: Math.max(0, pointer.y - 8),
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
          }}
        >
          <div className="mb-1 font-medium">{String(hoveredRow[xKey])}</div>
          {series.map((s, i) => (
            <div
              key={s.key}
              className="flex items-center justify-between gap-3"
            >
              <span className="flex items-center gap-1.5 text-(--text-muted)">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: seriesColor(s, i) }}
                />
                {s.label ?? s.key}
              </span>
              <span className="font-medium tabular-nums">
                {valueFormatter(numeric(hoveredRow, s.key))}
              </span>
            </div>
          ))}
        </div>
      )}
      <table className="sr-only">
        <thead>
          <tr>
            <th>{xKey}</th>
            {series.map((s) => (
              <th key={s.key}>{s.label ?? s.key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{String(row[xKey])}</td>
              {series.map((s) => (
                <td key={s.key}>{numeric(row, s.key)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
