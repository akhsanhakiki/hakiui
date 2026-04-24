import React, { type ReactNode } from "react";
import { Check } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export const Checkbox = ({
  checked,
  onChange,
  children,
  radius = "sm",
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  children?: ReactNode;
  radius?: Radius;
}) => (
  <label className="flex items-center gap-2 cursor-pointer group w-fit">
    <div
      className={`flex h-5 w-5 items-center justify-center transition-colors ${!checked ? "border-2 border-(--border) group-hover:border-(--ui-primary)" : ""}`}
      style={{
        ...getRadiusStyle(radius),
        ...(checked ? { background: "var(--ui-primary-bg)" } : {}),
      }}
    >
      {checked && <Check size={14} className="text-white" />}
    </div>
    <input
      type="checkbox"
      className="hidden"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    {children && (
      <span className="select-none text-sm text-(--text)">{children}</span>
    )}
  </label>
);
