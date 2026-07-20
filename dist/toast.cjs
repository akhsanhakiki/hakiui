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

// src/components/ui/toast.tsx
var toast_exports = {};
__export(toast_exports, {
  ToastProvider: () => ToastProvider,
  useToast: () => useToast
});
module.exports = __toCommonJS(toast_exports);
var import_react = require("react");
var import_react_dom = require("react-dom");
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/toast.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ToastContext = (0, import_react.createContext)(void 0);
var useToast = () => {
  const context = (0, import_react.useContext)(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
var VARIANT_META = {
  default: { icon: null, color: "var(--ui-primary)" },
  success: { icon: import_lucide_react.CheckCircle2, color: "#0CA30C" },
  error: { icon: import_lucide_react.XCircle, color: "#D03B3B" },
  warning: { icon: import_lucide_react.AlertTriangle, color: "#B87A00" },
  info: { icon: import_lucide_react.Info, color: "var(--ui-primary)" }
};
var LEAVE_MS = 200;
var MAX_TOASTS = 5;
var ToastProvider = ({
  children,
  position = "bottom-right",
  radius = "md"
}) => {
  const [toasts, setToasts] = (0, import_react.useState)([]);
  const [mounted, setMounted] = (0, import_react.useState)(false);
  const idRef = (0, import_react.useRef)(0);
  const timersRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
  (0, import_react.useEffect)(() => {
    setMounted(true);
    const timers = timersRef.current;
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);
  const dismiss = (0, import_react.useCallback)((id) => {
    const pending = timersRef.current.get(id);
    if (pending) {
      clearTimeout(pending);
      timersRef.current.delete(id);
    }
    setToasts(
      (current) => current.map((t) => t.id === id ? { ...t, leaving: true } : t)
    );
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, LEAVE_MS);
  }, []);
  const toast = (0, import_react.useCallback)(
    ({
      title,
      description,
      variant = "default",
      duration = 4e3
    }) => {
      const id = ++idRef.current;
      setToasts((current) => {
        const next = [...current, { id, title, description, variant, duration, leaving: false }];
        return next.slice(Math.max(0, next.length - MAX_TOASTS));
      });
      if (duration > 0) {
        timersRef.current.set(
          id,
          setTimeout(() => dismiss(id), duration)
        );
      }
      return id;
    },
    [dismiss]
  );
  const contextValue = (0, import_react.useMemo)(() => ({ toast, dismiss }), [toast, dismiss]);
  const positionClasses = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start"
  }[position];
  const fromTop = position.startsWith("top");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToastContext.Provider, { value: contextValue, children: [
    children,
    mounted && (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: `pointer-events-none fixed z-9999 flex w-full max-w-sm flex-col gap-2 ${positionClasses}`,
          role: "region",
          "aria-label": "Notifications",
          children: toasts.map((t) => {
            const meta = VARIANT_META[t.variant];
            const Icon = meta.icon;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "div",
              {
                role: "status",
                className: `pointer-events-auto flex w-full items-start gap-3 px-4 py-3 shadow-lg transition-all duration-200 ease-out motion-reduce:transition-none ${t.leaving ? `opacity-0 ${fromTop ? "-translate-y-2" : "translate-y-2"} scale-[0.98]` : "translate-y-0 scale-100 opacity-100"}`,
                style: {
                  ...getRadiusStyle(radius),
                  backgroundColor: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  outline: "0.5px solid var(--border)",
                  outlineOffset: 0,
                  color: "var(--text)",
                  fontFamily: "var(--ui-font)",
                  borderLeft: `3px solid ${meta.color}`
                },
                children: [
                  Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    Icon,
                    {
                      size: 17,
                      className: "mt-0.5 shrink-0",
                      style: { color: meta.color },
                      "aria-hidden": true
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm font-medium", children: t.title }),
                    t.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-0.5 text-xs text-(--text-muted)", children: t.description })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: () => dismiss(t.id),
                      className: "shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)",
                      "aria-label": "Dismiss notification",
                      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: 15 })
                    }
                  )
                ]
              },
              t.id
            );
          })
        }
      ),
      document.body
    )
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToastProvider,
  useToast
});
//# sourceMappingURL=toast.cjs.map