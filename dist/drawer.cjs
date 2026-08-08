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

// src/components/ui/drawer.tsx
var drawer_exports = {};
__export(drawer_exports, {
  Drawer: () => Drawer
});
module.exports = __toCommonJS(drawer_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var edgePosition = {
  left: "inset-y-0 left-0",
  right: "inset-y-0 right-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0"
};
var edgeBorder = {
  left: { borderRight: "0.5px solid var(--border)" },
  right: { borderLeft: "0.5px solid var(--border)" },
  top: { borderBottom: "0.5px solid var(--border)" },
  bottom: { borderTop: "0.5px solid var(--border)" }
};
var closedTransform = {
  left: "-translate-x-full",
  right: "translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full"
};
var isHorizontal = (side) => side === "left" || side === "right";
var Drawer = ({
  isOpen,
  onClose,
  side = "left",
  size = "320px",
  title,
  children,
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = ""
}) => {
  (0, import_react.useEffect)(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);
  const horizontal = isHorizontal(side);
  const panelShell = {
    fontFamily: "var(--ui-font)",
    backgroundColor: "var(--bg-soft)",
    color: "var(--text)",
    ...horizontal ? { width: size, maxWidth: "85vw" } : { height: size, maxHeight: "85vh" },
    ...edgeBorder[side]
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: `fixed inset-0 z-50 transition-opacity duration-300 ease-out motion-reduce:transition-none ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`,
      "aria-hidden": !isOpen,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
            onClick: closeOnOverlayClick ? onClose : void 0,
            role: "presentation"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: `absolute flex flex-col shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${edgePosition[side]} ${isOpen ? "translate-x-0 translate-y-0" : closedTransform[side]} ${className}`,
            style: panelShell,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? "drawer-title" : void 0,
            children: [
              (title || showCloseButton) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "header",
                {
                  className: "flex shrink-0 items-center gap-3 px-4 py-3",
                  style: { borderBottom: "0.5px solid var(--border)" },
                  children: [
                    title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "h3",
                      {
                        id: "drawer-title",
                        className: "min-w-0 flex-1 truncate text-base font-semibold",
                        children: title
                      }
                    ),
                    showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Drawer
});
//# sourceMappingURL=drawer.cjs.map