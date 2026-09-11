import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/prompt-input.tsx
import { useEffect, useRef } from "react";
import { ArrowUp, Square } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const ref = useRef(null);
  const canSend = value.trim().length > 0 && !disabled && !streaming;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const line = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const max = line * maxRows;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
    el.style.overflowY = el.scrollHeight > max ? "auto" : "hidden";
  }, [value, maxRows]);
  useEffect(() => {
    if (!streaming) ref.current?.focus({ preventScroll: true });
  }, [streaming]);
  const submit = () => {
    if (!canSend) return;
    onSubmit(value.trim());
  };
  return /* @__PURE__ */ jsxs("div", { className: `w-full ${className}`, style: { fontFamily: "var(--ui-font)" }, children: [
    /* @__PURE__ */ jsxs(
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
          /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-2 pb-2", children: [
            /* @__PURE__ */ jsx("div", { className: "flex min-w-0 flex-1 items-center gap-1.5", children: leading }),
            trailing,
            streaming ? /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onStop,
                "aria-label": "Stop generating",
                className: "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
                style: { backgroundColor: "var(--text)", color: "var(--bg)" },
                children: /* @__PURE__ */ jsx(Square, { size: 12, fill: "currentColor" })
              }
            ) : /* @__PURE__ */ jsx(
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
                children: /* @__PURE__ */ jsx(ArrowUp, { size: 15 })
              }
            )
          ] })
        ]
      }
    ),
    hint && /* @__PURE__ */ jsx("p", { className: "mt-1.5 text-center text-[10px] text-(--text-muted)", children: hint })
  ] });
};

export {
  PromptInput
};
//# sourceMappingURL=chunk-UT6QTXC3.js.map