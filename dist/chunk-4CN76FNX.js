import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/modal.tsx
import { X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: onClose,
        role: "presentation"
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative flex w-full max-w-md min-h-0 flex-col overflow-hidden text-(--text) shadow-2xl animate-in fade-in zoom-in-95 duration-200",
        style: panelShell,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        children: [
          /* @__PURE__ */ jsxs(
            "header",
            {
              className: "flex shrink-0 items-center gap-3 px-4 py-3",
              style: { borderBottom: "0.5px solid var(--border)" },
              children: [
                /* @__PURE__ */ jsx("h3", { id: "modal-title", className: "min-w-0 flex-1 truncate text-base font-semibold", children: title }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex shrink-0 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text)",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsx(X, { size: 18, strokeWidth: 2 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "min-h-0 flex-1 overflow-y-auto px-4 py-4", children })
        ]
      }
    )
  ] });
};

export {
  Modal
};
//# sourceMappingURL=chunk-4CN76FNX.js.map