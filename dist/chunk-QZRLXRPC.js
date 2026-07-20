import {
  resolveThemeVarStyle
} from "./chunk-SA6EOMZP.js";
import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/toast.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle
} from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var ToastContext = createContext(void 0);
var useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
var VARIANT_META = {
  default: { icon: null, color: "var(--ui-primary)" },
  success: { icon: CheckCircle2, color: "#0CA30C" },
  error: { icon: XCircle, color: "#D03B3B" },
  warning: { icon: AlertTriangle, color: "#B87A00" },
  info: { icon: Info, color: "var(--ui-primary)" }
};
var LEAVE_MS = 200;
var MAX_TOASTS = 5;
var ToastProvider = ({
  children,
  position = "bottom-right",
  radius = "md"
}) => {
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [themeVars, setThemeVars] = useState({});
  const idRef = useRef(0);
  const anchorRef = useRef(null);
  const timersRef = useRef(/* @__PURE__ */ new Map());
  useEffect(() => {
    setMounted(true);
    const timers = timersRef.current;
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);
  useEffect(() => {
    if (toasts.length === 0 || !anchorRef.current) return;
    setThemeVars(resolveThemeVarStyle(getComputedStyle(anchorRef.current)));
  }, [toasts.length]);
  const dismiss = useCallback((id) => {
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
  const toast = useCallback(
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
  const contextValue = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  const positionClasses = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start"
  }[position];
  const fromTop = position.startsWith("top");
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: contextValue, children: [
    children,
    /* @__PURE__ */ jsx("span", { ref: anchorRef, hidden: true, "aria-hidden": true }),
    mounted && createPortal(
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `pointer-events-none fixed z-9999 flex w-full max-w-sm flex-col gap-2 ${positionClasses}`,
          style: themeVars,
          role: "region",
          "aria-label": "Notifications",
          children: toasts.map((t) => {
            const meta = VARIANT_META[t.variant];
            const Icon = meta.icon;
            return /* @__PURE__ */ jsxs(
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
                  Icon && /* @__PURE__ */ jsx(
                    Icon,
                    {
                      size: 17,
                      className: "mt-0.5 shrink-0",
                      style: { color: meta.color },
                      "aria-hidden": true
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: t.title }),
                    t.description && /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-xs text-(--text-muted)", children: t.description })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => dismiss(t.id),
                      className: "shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)",
                      "aria-label": "Dismiss notification",
                      children: /* @__PURE__ */ jsx(X, { size: 15 })
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

export {
  useToast,
  ToastProvider
};
//# sourceMappingURL=chunk-QZRLXRPC.js.map