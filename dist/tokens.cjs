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

// src/lib/tokens.ts
var tokens_exports = {};
__export(tokens_exports, {
  DARK_CHART_COLORS: () => DARK_CHART_COLORS,
  LIGHT_CHART_COLORS: () => LIGHT_CHART_COLORS,
  darkNeutrals: () => darkNeutrals,
  defaultThemeTokens: () => defaultThemeTokens,
  lightNeutrals: () => lightNeutrals
});
module.exports = __toCommonJS(tokens_exports);
var lightNeutrals = {
  bg: "#FAF9F5",
  bgSoft: "#F2EFE8",
  surface: "#FFFFFF",
  border: "#E5E1D5",
  input: "#F2EFE8",
  text: "#1C1B17",
  textMuted: "#6E6A5E",
  hover: "#EBE7DC"
};
var darkNeutrals = {
  bg: "#141311",
  bgSoft: "#1C1A17",
  surface: "#22201B",
  border: "#37342C",
  input: "#282521",
  text: "#F5F3EC",
  textMuted: "#A8A294",
  hover: "#322E27"
};
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
var DARK_CHART_COLORS = [
  "#F05423",
  "#9085E9",
  "#E66767",
  "#3987E5",
  "#008300",
  "#D55181",
  "#C98500",
  "#199E70"
];
var defaultThemeTokens = {
  primaryColor: "#F05423",
  gradientColor: "#FF8C42",
  useGradient: false,
  fontFamily: "'IBM Plex Mono', monospace",
  borderRadius: 4,
  mode: "light"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DARK_CHART_COLORS,
  LIGHT_CHART_COLORS,
  darkNeutrals,
  defaultThemeTokens,
  lightNeutrals
});
//# sourceMappingURL=tokens.cjs.map