"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/bar-chart.tsx
var bar_chart_exports = {};
__export(bar_chart_exports, {
  BarChart: () => BarChart
});
module.exports = __toCommonJS(bar_chart_exports);
var import_react2 = require("react");

// src/lib/chart.ts
var import_react = require("react");
var LIGHT_CHART_COLORS = [
  "#F05423",
  "#4A3AA7",
  "#E34948",
  "#2A78D6",
  "#008300",
  "#E87BA4",
  "#EDA100",
  "#1BAF7A"
];
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
  const ref = (0, import_react.useRef)(null);
  const [width, setWidth] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
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

// src/components/ui/bar-chart.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  const [hoverIndex, setHoverIndex] = (0, import_react2.useState)(null);
  const [pointer, setPointer] = (0, import_react2.useState)({ x: 0, y: 0 });
  const numeric = (row, key) => {
    const v = row[key];
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };
  const scale = (0, import_react2.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: containerRef,
      className: `relative w-full ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        series.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-2 flex flex-wrap items-center gap-x-4 gap-y-1", children: series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "span",
          {
            className: "flex items-center gap-1.5 text-xs text-(--text-muted)",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        width > 0 && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
              scale.ticks.map((tick) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
                          return isTop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            "path",
                            {
                              d: roundedTopRect(barX2, y2, groupWidth, segH, 4),
                              fill: color
                            },
                            s.key
                          ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "path",
                          {
                            d: roundedTopRect(barX, y, barWidth, h, 4),
                            fill: color
                          },
                          s.key
                        );
                      }),
                      showValues && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
                      rowIndex % labelEvery === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        hoveredRow && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: "pointer-events-none absolute z-10 min-w-32 rounded-md px-3 py-2 text-xs shadow-lg",
            style: {
              left: Math.min(pointer.x + 12, Math.max(0, width - 150)),
              top: Math.max(0, pointer.y - 8),
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-1 font-medium", children: String(hoveredRow[xKey]) }),
              series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  className: "flex items-center justify-between gap-3",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1.5 text-(--text-muted)", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "span",
                        {
                          "aria-hidden": true,
                          className: "h-2 w-2 rounded-[2px]",
                          style: { backgroundColor: seriesColor(s, i) }
                        }
                      ),
                      s.label ?? s.key
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium tabular-nums", children: valueFormatter(numeric(hoveredRow, s.key)) })
                  ]
                },
                s.key
              ))
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "sr-only", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: xKey }),
            series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: s.label ?? s.key }, s.key))
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: String(row[xKey]) }),
            series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: numeric(row, s.key) }, s.key))
          ] }, i)) })
        ] })
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BarChart
});
//# sourceMappingURL=bar-chart.cjs.map