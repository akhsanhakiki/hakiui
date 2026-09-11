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

// src/components/ui/chat-message.tsx
var chat_message_exports = {};
__export(chat_message_exports, {
  ChatMessage: () => ChatMessage
});
module.exports = __toCommonJS(chat_message_exports);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/chat-message.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "article",
    {
      "aria-label": name ?? (isUser ? "You" : "Assistant"),
      className: `flex w-full gap-3 ${isUser ? "flex-row-reverse" : ""} ${className}`,
      style: { fontFamily: "var(--ui-font)", color: "var(--text)" },
      children: [
        avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 shrink-0", children: avatar }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `min-w-0 ${isUser ? "max-w-[80%]" : "flex-1"}`, children: [
          (name || time) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `mb-1.5 flex items-center gap-2 text-[11px] text-(--text-muted) ${isUser ? "justify-end" : ""}`, children: [
            name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium", children: name }),
            time && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: time })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
                streaming && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `mt-2 flex items-center gap-1 ${isUser ? "justify-end" : ""}`, children: actions })
        ] })
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatMessage
});
//# sourceMappingURL=chat-message.cjs.map