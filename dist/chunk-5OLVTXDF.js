import {
  formatChartValue,
  niceScale,
  seriesColor,
  useContainerWidth
} from "./chunk-EJKFJGJY.js";

// src/components/ui/bar-chart.tsx
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Y_TICKS = 4;
var SEGMENT_GAP = 2;
var roundedTopRect = (x, y, w, h, r) => {
  const radius = Math.max(0, Math.min(r, w / 2, h));
  return [
    `M ${x} ${y + h}`,
    `L ${x} ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    `L ${x + w - radius} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + radius}`,
    `L ${x + w} ${y + h}`,
    "Z"
  ].join(" ");
};
var BarChart = ({
  data,
  xKey,
  series,
  stacked = false,
  height = 260,
  showValues = false,
  valueFormatter = formatChartValue,
  className = "",
  "aria-label": ariaLabel
}) => {
  const [containerRef, width] = useContainerWidth();
  const [hoverIndex, setHoverIndex] = useState(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const numeric = (row, key) => {
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
    left: 10 + Math.max(...scale.ticks.map((t) => valueFormatter(t).length)) * 7.5
  };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const yFor = (value) => margin.top + innerHeight - (value - scale.min) / (scale.max - scale.min) * innerHeight;
  const baselineY = yFor(0);
  const bandWidth = data.length > 0 ? innerWidth / data.length : 0;
  const bandPadding = Math.min(bandWidth * 0.2, 24);
  const groupWidth = Math.max(0, bandWidth - bandPadding * 2);
  const labelEvery = Math.max(1, Math.ceil(data.length * 64 / (innerWidth || 1)));
  const hoveredRow = hoverIndex !== null ? data[hoverIndex] : null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: `relative w-full ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        series.length >= 2 && /* @__PURE__ */ jsx("div", { className: "mb-2 flex flex-wrap items-center gap-x-4 gap-y-1", children: series.map((s, i) => /* @__PURE__ */ jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 text-xs text-(--text-muted)",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  "aria-hidden": true,
                  className: "h-2.5 w-2.5 rounded-[3px]",
                  style: { backgroundColor: seriesColor(s, i) }
                }
              ),
              s.label ?? s.key
            ]
          },
          s.key
        )) }),
        width > 0 && data.length > 0 && /* @__PURE__ */ jsxs(
          "svg",
          {
            width,
            height,
            role: "img",
            "aria-label": ariaLabel ?? "Bar chart",
            onMouseLeave: () => setHoverIndex(null),
            onMouseMove: (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const px = e.clientX - rect.left;
              setPointer({ x: px, y: e.clientY - rect.top });
              const index = Math.floor((px - margin.left) / (bandWidth || 1));
              setHoverIndex(
                index >= 0 && index < data.length && px >= margin.left ? index : null
              );
            },
            children: [
              scale.ticks.map((tick) => /* @__PURE__ */ jsxs("g", { children: [
                /* @__PURE__ */ jsx(
                  "line",
                  {
                    x1: margin.left,
                    x2: width - margin.right,
                    y1: yFor(tick),
                    y2: yFor(tick),
                    stroke: "var(--border)",
                    strokeWidth: tick === 0 ? 1 : 0.5,
                    opacity: tick === 0 ? 1 : 0.7
                  }
                ),
                /* @__PURE__ */ jsx(
                  "text",
                  {
                    x: margin.left - 8,
                    y: yFor(tick),
                    textAnchor: "end",
                    dominantBaseline: "middle",
                    fontSize: 11,
                    fill: "var(--text-muted)",
                    children: valueFormatter(tick)
                  }
                )
              ] }, tick)),
              data.map((row, rowIndex) => {
                const bandX = margin.left + rowIndex * bandWidth;
                const dimmed = hoverIndex !== null && hoverIndex !== rowIndex;
                let stackY = baselineY;
                const total = series.reduce(
                  (sum, s) => sum + numeric(row, s.key),
                  0
                );
                return /* @__PURE__ */ jsxs(
                  "g",
                  {
                    opacity: dimmed ? 0.45 : 1,
                    style: { transition: "opacity 0.15s ease" },
                    children: [
                      series.map((s, seriesIndex) => {
                        const value = numeric(row, s.key);
                        const color = seriesColor(s, seriesIndex);
                        if (stacked) {
                          const h2 = Math.max(
                            0,
                            value / (scale.max - scale.min) * innerHeight
                          );
                          const isTop = seriesIndex === series.length - 1;
                          const gap = isTop ? 0 : SEGMENT_GAP;
                          const segH = Math.max(0, h2 - gap);
                          const y2 = stackY - h2;
                          stackY = y2;
                          const barX2 = bandX + (bandWidth - groupWidth) / 2;
                          if (segH <= 0) return null;
                          return isTop ? /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: roundedTopRect(barX2, y2, groupWidth, segH, 4),
                              fill: color
                            },
                            s.key
                          ) : /* @__PURE__ */ jsx(
                            "rect",
                            {
                              x: barX2,
                              y: y2 + gap,
                              width: groupWidth,
                              height: segH,
                              fill: color
                            },
                            s.key
                          );
                        }
                        const barWidth = Math.max(
                          2,
                          (groupWidth - SEGMENT_GAP * (series.length - 1)) / series.length
                        );
                        const barX = bandX + (bandWidth - groupWidth) / 2 + seriesIndex * (barWidth + SEGMENT_GAP);
                        const y = value >= 0 ? yFor(value) : baselineY;
                        const h = Math.abs(yFor(value) - baselineY);
                        if (h <= 0) return null;
                        return /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: roundedTopRect(barX, y, barWidth, h, 4),
                            fill: color
                          },
                          s.key
                        );
                      }),
                      showValues && /* @__PURE__ */ jsx(
                        "text",
                        {
                          x: bandX + bandWidth / 2,
                          y: (stacked ? yFor(total) : yFor(
                            Math.max(...series.map((s) => numeric(row, s.key)))
                          )) - 6,
                          textAnchor: "middle",
                          fontSize: 11,
                          fill: "var(--text-muted)",
                          children: valueFormatter(
                            stacked ? total : Math.max(...series.map((s) => numeric(row, s.key)))
                          )
                        }
                      ),
                      rowIndex % labelEvery === 0 && /* @__PURE__ */ jsx(
                        "text",
                        {
                          x: bandX + bandWidth / 2,
                          y: height - 6,
                          textAnchor: "middle",
                          fontSize: 11,
                          fill: "var(--text-muted)",
                          children: String(row[xKey])
                        }
                      )
                    ]
                  },
                  `${row[xKey]}-${rowIndex}`
                );
              })
            ]
          }
        ),
        hoveredRow && /* @__PURE__ */ jsxs(
          "div",
          {
            className: "pointer-events-none absolute z-10 min-w-32 rounded-md px-3 py-2 text-xs shadow-lg",
            style: {
              left: Math.min(pointer.x + 12, Math.max(0, width - 150)),
              top: Math.max(0, pointer.y - 8),
              backgroundColor: "var(--surface)",
              border: "0.5px solid var(--border)",
              color: "var(--text)"
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "mb-1 font-medium", children: String(hoveredRow[xKey]) }),
              series.map((s, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center justify-between gap-3",
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-(--text-muted)", children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          "aria-hidden": true,
                          className: "h-2 w-2 rounded-[2px]",
                          style: { backgroundColor: seriesColor(s, i) }
                        }
                      ),
                      s.label ?? s.key
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium tabular-nums", children: valueFormatter(numeric(hoveredRow, s.key)) })
                  ]
                },
                s.key
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsxs("table", { className: "sr-only", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: xKey }),
            series.map((s) => /* @__PURE__ */ jsx("th", { children: s.label ?? s.key }, s.key))
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: data.map((row, i) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { children: String(row[xKey]) }),
            series.map((s) => /* @__PURE__ */ jsx("td", { children: numeric(row, s.key) }, s.key))
          ] }, i)) })
        ] })
      ]
    }
  );
};

export {
  BarChart
};
//# sourceMappingURL=chunk-5OLVTXDF.js.map