// src/components/ui/modal.tsx
import { X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
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
        className: "relative flex w-full max-w-md flex-col border border-(--border) bg-(--surface) text-(--text) shadow-2xl animate-in fade-in zoom-in-95 duration-200",
        style: {
          borderRadius: "var(--ui-radius)",
          fontFamily: "var(--ui-font)"
        },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-(--border) p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: title }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1 text-(--text-muted) transition-colors hover:text-(--text)",
                children: /* @__PURE__ */ jsx(X, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-4 overflow-y-auto", children })
        ]
      }
    )
  ] });
};

export {
  Modal
};
//# sourceMappingURL=chunk-WG4D5KTQ.js.map