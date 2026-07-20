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

// src/components/ui/slider.tsx
var slider_exports = {};
__export(slider_exports, {
  Slider: () => Slider
});
module.exports = __toCommonJS(slider_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var TRACK_HEIGHT = { sm: 4, md: 6 };
var THUMB = { sm: 14, md: 18 };
var Slider = ({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  formatValue = (v) => String(v),
  size = "md",
  disabled = false,
  className = ""
}) => {
  const id = (0, import_react.useId)();
  const rangeClass = `hk-slider-${id.replace(/[^a-zA-Z0-9-]/g, "")}`;
  const [internalValue, setInternalValue] = (0, import_react.useState)(defaultValue);
  const current = value ?? internalValue;
  const percent = max > min ? (current - min) / (max - min) * 100 : 0;
  const trackH = TRACK_HEIGHT[size];
  const thumbPx = THUMB[size];
  const css = `
.${rangeClass}{-webkit-appearance:none;appearance:none;width:100%;height:${thumbPx + 6}px;background:transparent;margin:0;cursor:pointer;}
.${rangeClass}:disabled{cursor:not-allowed;}
.${rangeClass}:focus{outline:none;}
.${rangeClass}::-webkit-slider-runnable-track{height:${trackH}px;border-radius:9999px;background:linear-gradient(to right,var(--ui-primary) ${percent}%,var(--hover) ${percent}%);}
.${rangeClass}::-webkit-slider-thumb{-webkit-appearance:none;width:${thumbPx}px;height:${thumbPx}px;margin-top:${(trackH - thumbPx) / 2}px;border-radius:9999px;background:var(--surface);border:2px solid var(--ui-primary);box-shadow:0 1px 3px rgba(0,0,0,0.18);transition:transform 0.12s ease;}
.${rangeClass}:not(:disabled)::-webkit-slider-thumb:hover{transform:scale(1.1);}
.${rangeClass}:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 4px color-mix(in srgb,var(--ui-primary) 25%,transparent);}
.${rangeClass}::-moz-range-track{height:${trackH}px;border-radius:9999px;background:var(--hover);}
.${rangeClass}::-moz-range-progress{height:${trackH}px;border-radius:9999px;background:var(--ui-primary);}
.${rangeClass}::-moz-range-thumb{width:${thumbPx - 4}px;height:${thumbPx - 4}px;border-radius:9999px;background:var(--surface);border:2px solid var(--ui-primary);box-shadow:0 1px 3px rgba(0,0,0,0.18);}
`;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: `w-full ${disabled ? "opacity-50" : ""} ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: css } }),
        (label || showValue) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-1.5 flex items-center justify-between gap-3", children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "label",
            {
              htmlFor: id,
              className: "text-sm font-medium text-(--text)",
              children: label
            }
          ),
          showValue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xs tabular-nums text-(--text-muted)", children: formatValue(current) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            id,
            type: "range",
            className: rangeClass,
            min,
            max,
            step,
            value: current,
            disabled,
            onChange: (e) => {
              const next = Number(e.target.value);
              if (value === void 0) setInternalValue(next);
              onChange?.(next);
            }
          }
        )
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Slider
});
//# sourceMappingURL=slider.cjs.map