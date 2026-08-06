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

// src/components/ui/line-chart.tsx
var line_chart_exports = {};
__export(line_chart_exports, {
  LineChart: () => LineChart
});
module.exports = __toCommonJS(line_chart_exports);
var import_react2 = require("react");

// src/lib/chart.ts
var import_react = require("react");

// src/lib/tokens.ts
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

// src/lib/chart.ts
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

// src/components/ui/line-chart.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Y_TICKS = 4;
var smoothPath = (points) => {
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
var linearPath = (points) => points.length === 0 ? "" : `M ${points[0].x} ${points[0].y}` + points.slice(1).map((p) => ` L ${p.x} ${p.y}`).join("");
var LineChart = ({
  data,
  xKey,
  series,
  area = false,
  curve = "smooth",
  height = 260,
  showDots = false,
  valueFormatter = formatChartValue,
  className = "",
  "aria-label": ariaLabel
}) => {
  const [containerRef, width] = useContainerWidth();
  const [hoverIndex, setHoverIndex] = (0, import_react2.useState)(null);
  const numeric = (row, key) => {
    const v = row[key];
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };
  const scale = (0, import_react2.useMemo)(() => {
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
    left: 10 + Math.max(...scale.ticks.map((t) => valueFormatter(t).length)) * 7.5
  };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const xFor = (index) => margin.left + (data.length <= 1 ? innerWidth / 2 : index / (data.length - 1) * innerWidth);
  const yFor = (value) => margin.top + innerHeight - (value - scale.min) / (scale.max - scale.min) * innerHeight;
  const seriesPoints = (0, import_react2.useMemo)(
    () => series.map(
      (s) => data.map((row, i) => ({ x: xFor(i), y: yFor(numeric(row, s.key)) }))
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, series, width, height, scale]
  );
  const labelEvery = Math.max(
    1,
    Math.ceil(data.length * 72 / (innerWidth || 1))
  );
  const hoveredRow = hoverIndex !== null ? data[hoverIndex] : null;
  const toPath = curve === "smooth" ? smoothPath : linearPath;
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
                  className: "h-0.5 w-3.5 rounded-full",
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
            "aria-label": ariaLabel ?? "Line chart",
            onMouseLeave: () => setHoverIndex(null),
            onMouseMove: (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const px = e.clientX - rect.left;
              if (px < margin.left - 8 || px > width - margin.right + 8) {
                setHoverIndex(null);
                return;
              }
              const step = data.length <= 1 ? innerWidth : innerWidth / (data.length - 1);
              const index = Math.round((px - margin.left) / (step || 1));
              setHoverIndex(Math.max(0, Math.min(data.length - 1, index)));
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
              data.map(
                (row, i) => i % labelEvery === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "text",
                  {
                    x: xFor(i),
                    y: height - 6,
                    textAnchor: "middle",
                    fontSize: 11,
                    fill: "var(--text-muted)",
                    children: String(row[xKey])
                  },
                  `x-${i}`
                ) : null
              ),
              area && seriesPoints.map((points, i) => {
                if (points.length < 2) return null;
                const areaD = `${toPath(points)} L ${points[points.length - 1].x} ${yFor(Math.max(scale.min, 0))} L ${points[0].x} ${yFor(Math.max(scale.min, 0))} Z`;
                return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "path",
                  {
                    d: areaD,
                    fill: seriesColor(series[i], i),
                    opacity: 0.12
                  },
                  `area-${series[i].key}`
                );
              }),
              hoverIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "line",
                {
                  x1: xFor(hoverIndex),
                  x2: xFor(hoverIndex),
                  y1: margin.top,
                  y2: margin.top + innerHeight,
                  stroke: "var(--border)",
                  strokeWidth: 1
                }
              ),
              seriesPoints.map((points, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "path",
                {
                  d: toPath(points),
                  fill: "none",
                  stroke: seriesColor(series[i], i),
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                `line-${series[i].key}`
              )),
              seriesPoints.map(
                (points, i) => points.map((p, pi) => {
                  const visible = showDots || pi === hoverIndex;
                  if (!visible) return null;
                  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "circle",
                    {
                      cx: p.x,
                      cy: p.y,
                      r: 4,
                      fill: seriesColor(series[i], i),
                      stroke: "var(--surface)",
                      strokeWidth: 2
                    },
                    `dot-${series[i].key}-${pi}`
                  );
                })
              )
            ]
          }
        ),
        hoveredRow && hoverIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: "pointer-events-none absolute z-10 min-w-32 rounded-md px-3 py-2 text-xs shadow-lg",
            style: {
              left: Math.min(xFor(hoverIndex) + 12, Math.max(0, width - 150)),
              top: margin.top,
              backgroundColor: "var(--surface)",
              border: "0.5px solid var(--border)",
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
                          className: "h-2 w-2 rounded-full",
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
  LineChart
});
//# sourceMappingURL=line-chart.cjs.map