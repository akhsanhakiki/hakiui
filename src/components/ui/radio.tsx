import React, { type ReactNode } from "react";

export const Radio = ({
  checked,
  onChange,
  children
}: {
  checked: boolean;
  onChange: () => void;
  children?: ReactNode;
}) => (
  <label className="flex items-center gap-2 cursor-pointer group w-fit">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${!checked ? "border-2 border-[#27272a] group-hover:border-gray-400" : ""}`} style={checked ? { background: "var(--ui-primary-bg)" } : {}}>
      {checked && <div className="w-2 h-2 rounded-full bg-white" />}
    </div>
    <input type="radio" className="hidden" checked={checked} onChange={onChange} />
    {children && <span className="text-sm text-gray-300 select-none">{children}</span>}
  </label>
);
