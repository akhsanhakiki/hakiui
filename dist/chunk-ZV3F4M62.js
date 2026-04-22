// src/components/ui/modal.tsx
import { X } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose, role: "presentation" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "relative bg-[#18181b] border border-[#27272a] w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col text-white",
        style: { borderRadius: "var(--ui-radius)", fontFamily: "var(--ui-font)" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 border-b border-[#27272a]", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: title }),
            /* @__PURE__ */ jsx("button", { type: "button", onClick: onClose, className: "text-gray-400 hover:text-white transition-colors p-1", children: /* @__PURE__ */ jsx(X, { size: 20 }) })
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
//# sourceMappingURL=chunk-ZV3F4M62.js.map