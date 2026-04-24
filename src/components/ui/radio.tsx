import React, { type ReactNode } from "react";

export const Radio = ({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children?: ReactNode;
}) => (
  <label className="flex items-center gap-2 cursor-pointer group w-fit">
    <div
      className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${!checked ? "border-2 border-(--border) group-hover:border-(--ui-primary)" : ""}`}
      style={checked ? { background: "var(--ui-primary-bg)" } : {}}
    >
      {checked && <div className="w-2 h-2 rounded-full bg-white" />}
    </div>
    <input
      type="radio"
      className="hidden"
      checked={checked}
      onChange={onChange}
    />
    {children && (
      <span className="select-none text-sm text-(--text)">{children}</span>
    )}
  </label>
);
