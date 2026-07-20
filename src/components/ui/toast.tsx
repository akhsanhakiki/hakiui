import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
  XCircle,
} from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export type ToastOptions = {
  title: string;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. Pass 0 to keep the toast until closed. */
  duration?: number;
};

type ToastItem = Required<Pick<ToastOptions, "title" | "variant" | "duration">> &
  Pick<ToastOptions, "description"> & { id: number; leaving: boolean };

type ToastContextType = {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

const VARIANT_META: Record<
  ToastVariant,
  { icon: typeof Info | null; color: string }
> = {
  default: { icon: null, color: "var(--ui-primary)" },
  success: { icon: CheckCircle2, color: "#0CA30C" },
  error: { icon: XCircle, color: "#D03B3B" },
  warning: { icon: AlertTriangle, color: "#B87A00" },
  info: { icon: Info, color: "var(--ui-primary)" },
};

const LEAVE_MS = 200;
const MAX_TOASTS = 5;

export type ToastProviderProps = {
  children: ReactNode;
  /** Corner where toasts stack. */
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  radius?: Radius;
};

export const ToastProvider = ({
  children,
  position = "bottom-right",
  radius = "md",
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const idRef = useRef(0);
  const timersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    setMounted(true);
    const timers = timersRef.current;
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  const dismiss = useCallback((id: number) => {
    const pending = timersRef.current.get(id);
    if (pending) {
      clearTimeout(pending);
      timersRef.current.delete(id);
    }
    setToasts((current) =>
      current.map((t) => (t.id === id ? { ...t, leaving: true } : t)),
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
      duration = 4000,
    }: ToastOptions) => {
      const id = ++idRef.current;
      setToasts((current) => {
        const next = [...current, { id, title, description, variant, duration, leaving: false }];
        return next.slice(Math.max(0, next.length - MAX_TOASTS));
      });
      if (duration > 0) {
        timersRef.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [dismiss],
  );

  const contextValue = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  const positionClasses = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start",
  }[position];
  const fromTop = position.startsWith("top");

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {mounted &&
        createPortal(
          <div
            className={`pointer-events-none fixed z-9999 flex w-full max-w-sm flex-col gap-2 ${positionClasses}`}
            role="region"
            aria-label="Notifications"
          >
            {toasts.map((t) => {
              const meta = VARIANT_META[t.variant];
              const Icon = meta.icon;
              return (
                <div
                  key={t.id}
                  role="status"
                  className={`pointer-events-auto flex w-full items-start gap-3 px-4 py-3 shadow-lg transition-all duration-200 ease-out motion-reduce:transition-none ${t.leaving ? `opacity-0 ${fromTop ? "-translate-y-2" : "translate-y-2"} scale-[0.98]` : "translate-y-0 scale-100 opacity-100"}`}
                  style={{
                    ...getRadiusStyle(radius),
                    backgroundColor: "var(--surface)",
                    border: "0.5px solid var(--border)",
                    outline: "0.5px solid var(--border)",
                    outlineOffset: 0,
                    color: "var(--text)",
                    fontFamily: "var(--ui-font)",
                    borderLeft: `3px solid ${meta.color}`,
                  }}
                >
                  {Icon && (
                    <Icon
                      size={17}
                      className="mt-0.5 shrink-0"
                      style={{ color: meta.color }}
                      aria-hidden
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{t.title}</div>
                    {t.description && (
                      <div className="mt-0.5 text-xs text-(--text-muted)">
                        {t.description}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(t.id)}
                    className="shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)"
                    aria-label="Dismiss notification"
                  >
                    <X size={15} />
                  </button>
                </div>
              );
            })}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};
