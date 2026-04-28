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

// src/components/ui/modal.tsx
var modal_exports = {};
__export(modal_exports, {
  Modal: () => Modal
});
module.exports = __toCommonJS(modal_exports);
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/modal.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  const panelShell = {
    ...getRadiusStyle("md"),
    fontFamily: "var(--ui-font)",
    backgroundColor: "var(--bg-soft)",
    color: "var(--text)",
    border: "0.5px solid var(--border)",
    outline: "0.5px solid var(--border)",
    outlineOffset: 0
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: onClose,
        role: "presentation"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "relative flex w-full max-w-md min-h-0 flex-col overflow-hidden text-(--text) shadow-2xl animate-in fade-in zoom-in-95 duration-200",
        style: panelShell,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "header",
            {
              className: "flex shrink-0 items-center gap-3 px-4 py-3",
              style: { borderBottom: "0.5px solid var(--border)" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { id: "modal-title", className: "min-w-0 flex-1 truncate text-base font-semibold", children: title }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex shrink-0 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text)",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: 18, strokeWidth: 2 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-0 flex-1 overflow-y-auto px-4 py-4", children })
        ]
      }
    )
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Modal
});
//# sourceMappingURL=modal.cjs.map