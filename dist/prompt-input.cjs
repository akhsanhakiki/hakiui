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

// src/components/ui/prompt-input.tsx
var prompt_input_exports = {};
__export(prompt_input_exports, {
  PromptInput: () => PromptInput
});
module.exports = __toCommonJS(prompt_input_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/prompt-input.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var PromptInput = ({
  value,
  onChange,
  onSubmit,
  streaming = false,
  onStop,
  placeholder = "Ask anything\u2026",
  maxRows = 8,
  disabled = false,
  leading,
  trailing,
  hint,
  autoFocus = false,
  radius = "lg",
  className = "",
  "aria-label": ariaLabel = "Message"
}) => {
  const ref = (0, import_react.useRef)(null);
  const canSend = value.trim().length > 0 && !disabled && !streaming;
  (0, import_react.useEffect)(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const line = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const max = line * maxRows;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
    el.style.overflowY = el.scrollHeight > max ? "auto" : "hidden";
  }, [value, maxRows]);
  (0, import_react.useEffect)(() => {
    if (!streaming) ref.current?.focus({ preventScroll: true });
  }, [streaming]);
  const submit = () => {
    if (!canSend) return;
    onSubmit(value.trim());
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `w-full ${className}`, style: { fontFamily: "var(--ui-font)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "flex flex-col transition-[box-shadow] ring-2 ring-transparent focus-within:ring-(--ui-primary)/35",
        style: {
          ...getRadiusStyle(radius),
          backgroundColor: "var(--surface)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              ref,
              rows: 1,
              value,
              disabled,
              autoFocus,
              placeholder,
              "aria-label": ariaLabel,
              onChange: (e) => onChange(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  submit();
                }
              },
              className: "w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm leading-6 outline-none placeholder:text-(--text-muted) disabled:opacity-50",
              style: { color: "var(--text)", caretColor: "var(--ui-primary)" }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 px-2 pb-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-1.5", children: leading }),
            trailing,
            streaming ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: onStop,
                "aria-label": "Stop generating",
                className: "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
                style: { backgroundColor: "var(--text)", color: "var(--bg)" },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Square, { size: 12, fill: "currentColor" })
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: submit,
                disabled: !canSend,
                "aria-label": "Send message",
                className: "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35 disabled:cursor-not-allowed",
                style: {
                  background: canSend ? "var(--ui-primary-bg)" : "var(--bg-soft)",
                  color: canSend ? "#ffffff" : "var(--text-muted)"
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowUp, { size: 15 })
              }
            )
          ] })
        ]
      }
    ),
    hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-1.5 text-center text-[10px] text-(--text-muted)", children: hint })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PromptInput
});
//# sourceMappingURL=prompt-input.cjs.map