import React, { useMemo, useState } from "react";
import {
  formatChartValue,
  niceScale,
  seriesColor,
  useContainerWidth,
  type ChartSeries,
} from "../../lib/chart";

export type LineChartDatum = Record<string, string | number>;

export interface LineChartProps {
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

const Y_TICKS = 4;

type Point = { x: number; y: number };

/** Catmull-Rom → cubic Bézier path through all points. */
const smoothPath = (points: Point[]): string => {
  if (points.length < 2)
    return points.length === 1 ? `M ${points[0].x} ${points[0].y}` : "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
};

const linearPath = (points: Point[]): string =>
  points.length === 0
    ? ""
    : `M ${points[0].x} ${points[0].y}` +
      points
        .slice(1)
        .map((p) => ` L ${p.x} ${p.y}`)
        .join("");

export const LineChart = ({
  data,
  xKey,
  series,
  area = false,
  curve = "smooth",
  height = 260,
  showDots = false,
  valueFormatter = formatChartValue,
  className = "",
  "aria-label": ariaLabel,
}: LineChartProps) => {
  const [containerRef, width] = useContainerWidth<HTMLDivElement>();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const numeric = (row: LineChartDatum, key: string): number => {
    const v = row[key];
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };

  const scale = useMemo(() => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const row of data) {
      for (const s of series) {
        const v = numeric(row, s.key);
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
    }
    if (!Number.isFinite(min)) {
      min = 0;
      max = 1;
    }
    return niceScale(min, max, Y_TICKS);
  }, [data, series]);

  const margin = {
    top: 12,
    right: 12,
    bottom: 24,
    left:
      10 + Math.max(...scale.ticks.map((t) => valueFormatter(t).length)) * 7.5,
  };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const xFor = (index: number) =>
    margin.left +
    (data.length <= 1 ? innerWidth / 2 : (index / (data.length - 1)) * innerWidth);
  const yFor = (value: number) =>
    margin.top +
    innerHeight -
    ((value - scale.min) / (scale.max - scale.min)) * innerHeight;

  const seriesPoints = useMemo(
    () =>
      series.map((s) =>
        data.map((row, i) => ({ x: xFor(i), y: yFor(numeric(row, s.key)) })),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, series, width, height, scale],
  );

  const labelEvery = Math.max(
    1,
    Math.ceil((data.length * 72) / (innerWidth || 1)),
  );
  const hoveredRow = hoverIndex !== null ? data[hoverIndex] : null;
  const toPath = curve === "smooth" ? smoothPath : linearPath;

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
                className="h-0.5 w-3.5 rounded-full"
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
          aria-label={ariaLabel ?? "Line chart"}
          onMouseLeave={() => setHoverIndex(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const px = e.clientX - rect.left;
            if (px < margin.left - 8 || px > width - margin.right + 8) {
              setHoverIndex(null);
              return;
            }
            const step = data.length <= 1 ? innerWidth : innerWidth / (data.length - 1);
            const index = Math.round((px - margin.left) / (step || 1));
            setHoverIndex(Math.max(0, Math.min(data.length - 1, index)));
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
          {data.map((row, i) =>
            i % labelEvery === 0 ? (
              <text
                key={`x-${i}`}
                x={xFor(i)}
                y={height - 6}
                textAnchor="middle"
                fontSize={11}
                fill="var(--text-muted)"
              >
                {String(row[xKey])}
              </text>
            ) : null,
          )}
          {area &&
            seriesPoints.map((points, i) => {
              if (points.length < 2) return null;
              const areaD = `${toPath(points)} L ${points[points.length - 1].x} ${yFor(Math.max(scale.min, 0))} L ${points[0].x} ${yFor(Math.max(scale.min, 0))} Z`;
              return (
                <path
                  key={`area-${series[i].key}`}
                  d={areaD}
                  fill={seriesColor(series[i], i)}
                  opacity={0.12}
                />
              );
            })}
          {hoverIndex !== null && (
            <line
              x1={xFor(hoverIndex)}
              x2={xFor(hoverIndex)}
              y1={margin.top}
              y2={margin.top + innerHeight}
              stroke="var(--border)"
              strokeWidth={1}
            />
          )}
          {seriesPoints.map((points, i) => (
            <path
              key={`line-${series[i].key}`}
              d={toPath(points)}
              fill="none"
              stroke={seriesColor(series[i], i)}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {seriesPoints.map((points, i) =>
            points.map((p, pi) => {
              const visible = showDots || pi === hoverIndex;
              if (!visible) return null;
              return (
                <circle
                  key={`dot-${series[i].key}-${pi}`}
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill={seriesColor(series[i], i)}
                  stroke="var(--surface)"
                  strokeWidth={2}
                />
              );
            }),
          )}
        </svg>
      )}
      {hoveredRow && hoverIndex !== null && (
        <div
          className="pointer-events-none absolute z-10 min-w-32 rounded-md px-3 py-2 text-xs shadow-lg"
          style={{
            left: Math.min(xFor(hoverIndex) + 12, Math.max(0, width - 150)),
            top: margin.top,
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
                  className="h-2 w-2 rounded-full"
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
