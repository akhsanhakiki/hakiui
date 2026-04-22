import React, { type ReactNode } from "react";
import { Check } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export const Checkbox = ({
  checked,
  onChange,
  children,
  radius = "sm"
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  children?: ReactNode;
  radius?: Radius;
}) => (
  <label className="flex items-center gap-2 cursor-pointer group w-fit">
    <div className={`w-5 h-5 flex items-center justify-center transition-colors ${!checked ? "border-2 border-[#27272a] group-hover:border-gray-400" : ""}`} style={{ ...getRadiusStyle(radius), ...(checked ? { background: "var(--ui-primary-bg)" } : {}) }}>
      {checked && <Check size={14} className="text-white" />}
    </div>
    <input type="checkbox" className="hidden" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    {children && <span className="text-sm text-gray-300 select-none">{children}</span>}
  </label>
);
