"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/otp-input.tsx
var otp_input_exports = {};
__export(otp_input_exports, {
  OtpInput: () => OtpInput
});
module.exports = __toCommonJS(otp_input_exports);
var import_react = __toESM(require("react"), 1);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/otp-input.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SIZES = { sm: "h-9 w-8 text-base", md: "h-11 w-10 text-lg", lg: "h-14 w-12 text-2xl" };
var OtpInput = ({
  length = 6,
  value,
  onChange,
  onComplete,
  groups = [],
  size = "md",
  radius = "md",
  disabled = false,
  autoFocus = false,
  mode = "numeric",
  label = "One-time code",
  className = ""
}) => {
  const refs = (0, import_react.useRef)([]);
  const clean = (s) => (mode === "numeric" ? s.replace(/\D/g, "") : s.replace(/[^a-zA-Z0-9]/g, "")).slice(0, length);
  const commit = (next) => {
    onChange(next);
    if (next.length === length) onComplete?.(next);
  };
  const focusAt = (i) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { role: "group", "aria-label": label, className: `inline-flex items-center gap-2 ${className}`, style: { fontFamily: "var(--ui-font)" }, children: Array.from({ length }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.default.Fragment, { children: [
    i > 0 && groups.includes(i) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": true, className: "h-px w-2", style: { background: "var(--border)" } }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "input",
      {
        ref: (el) => {
          refs.current[i] = el;
        },
        inputMode: mode === "numeric" ? "numeric" : "text",
        autoComplete: i === 0 ? "one-time-code" : "off",
        autoFocus: autoFocus && i === 0,
        disabled,
        "aria-label": `${label}, character ${i + 1} of ${length}`,
        value: value[i] ?? "",
        onFocus: (e) => e.currentTarget.select(),
        onPaste: (e) => {
          e.preventDefault();
          const pasted = clean(e.clipboardData.getData("text"));
          if (!pasted) return;
          const next = clean(value.slice(0, i) + pasted);
          commit(next);
          focusAt(next.length >= length ? length - 1 : next.length);
        },
        onChange: (e) => {
          const ch = clean(e.target.value).slice(-1);
          if (!ch) return;
          const chars = value.padEnd(length, " ").split("");
          chars[i] = ch;
          const next = chars.join("").trimEnd();
          commit(clean(next));
          focusAt(i + 1);
        },
        onKeyDown: (e) => {
          if (e.key === "Backspace") {
            e.preventDefault();
            const chars = value.padEnd(length, " ").split("");
            if (chars[i] !== " ") chars[i] = " ";
            else if (i > 0) {
              chars[i - 1] = " ";
              focusAt(i - 1);
            }
            onChange(clean(chars.join("").trimEnd()));
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            focusAt(i - 1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            focusAt(i + 1);
          }
        },
        className: `text-center font-semibold tabular-nums outline-none transition-[box-shadow] ring-2 ring-transparent focus-visible:ring-(--ui-primary)/35 disabled:opacity-50 ${SIZES[size]}`,
        style: {
          ...getRadiusStyle(radius),
          color: "var(--text)",
          backgroundColor: "var(--surface)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0,
          caretColor: "var(--ui-primary)"
        }
      }
    )
  ] }, i)) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OtpInput
});
//# sourceMappingURL=otp-input.cjs.map