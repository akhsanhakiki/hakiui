import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/chat-message.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ChatMessage = ({
  role,
  children,
  avatar,
  name,
  time,
  actions,
  streaming = false,
  radius = "lg",
  className = ""
}) => {
  const isUser = role === "user";
  return /* @__PURE__ */ jsxs(
    "article",
    {
      "aria-label": name ?? (isUser ? "You" : "Assistant"),
      className: `flex w-full gap-3 ${isUser ? "flex-row-reverse" : ""} ${className}`,
      style: { fontFamily: "var(--ui-font)", color: "var(--text)" },
      children: [
        avatar && /* @__PURE__ */ jsx("div", { className: "mt-0.5 shrink-0", children: avatar }),
        /* @__PURE__ */ jsxs("div", { className: `min-w-0 ${isUser ? "max-w-[80%]" : "flex-1"}`, children: [
          (name || time) && /* @__PURE__ */ jsxs("div", { className: `mb-1.5 flex items-center gap-2 text-[11px] text-(--text-muted) ${isUser ? "justify-end" : ""}`, children: [
            name && /* @__PURE__ */ jsx("span", { className: "font-medium", children: name }),
            time && /* @__PURE__ */ jsx("span", { children: time })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `text-sm leading-6 ${isUser ? "px-4 py-2.5" : ""}`,
              style: isUser ? {
                ...getRadiusStyle(radius),
                backgroundColor: "color-mix(in srgb, var(--ui-primary) 10%, var(--surface))",
                border: "0.5px solid color-mix(in srgb, var(--ui-primary) 25%, var(--border))"
              } : void 0,
              children: [
                children,
                streaming && /* @__PURE__ */ jsx(
                  "span",
                  {
                    "aria-hidden": true,
                    className: "ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse align-baseline",
                    style: { background: "var(--ui-primary)" }
                  }
                )
              ]
            }
          ),
          actions && /* @__PURE__ */ jsx("div", { className: `mt-2 flex items-center gap-1 ${isUser ? "justify-end" : ""}`, children: actions })
        ] })
      ]
    }
  );
};

export {
  ChatMessage
};
//# sourceMappingURL=chunk-MD2T7RPP.js.map