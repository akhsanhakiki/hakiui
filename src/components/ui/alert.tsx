import React, { type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
  radius?: Radius;
  /** Called when the user dismisses the alert; omit to hide the close button. */
  onClose?: () => void;
  className?: string;
}

const VARIANT_META: Record<
  AlertVariant,
  { icon: typeof Info; color: string }
> = {
  info: { icon: Info, color: "var(--ui-primary)" },
  success: { icon: CheckCircle2, color: "#0CA30C" },
  warning: { icon: AlertTriangle, color: "#B87A00" },
  danger: { icon: XCircle, color: "#D03B3B" },
};

export const Alert = ({
  variant = "info",
  title,
  children,
  radius = "md",
  onClose,
  className = "",
}: AlertProps) => {
  const meta = VARIANT_META[variant];
  const Icon = meta.icon;

  return (
    <div
      role="alert"
      className={`flex w-full items-start gap-3 px-4 py-3 ${className}`}
      style={{
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        backgroundColor: `color-mix(in srgb, ${meta.color} 9%, var(--surface))`,
        border: `0.5px solid color-mix(in srgb, ${meta.color} 35%, var(--border))`,
        color: "var(--text)",
      }}
    >
      <Icon
        size={17}
        className="mt-0.5 shrink-0"
        style={{ color: meta.color }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        {title && <div className="text-sm font-medium">{title}</div>}
        {children && (
          <div className={`text-sm text-(--text-muted) ${title ? "mt-0.5" : ""}`}>
            {children}
          </div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)"
          aria-label="Dismiss alert"
        >
          <XCircle size={15} />
        </button>
      )}
    </div>
  );
};
