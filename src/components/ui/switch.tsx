import React from "react";

export const Switch = ({
  checked,
  onChange,
  size = "md",
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  size?: "sm" | "md" | "lg";
}) => {
  const sizes = {
    sm: { w: "w-8", h: "h-4", circle: "w-3 h-3", translate: "translate-x-4" },
    md: { w: "w-10", h: "h-5", circle: "w-4 h-4", translate: "translate-x-5" },
    lg: { w: "w-12", h: "h-6", circle: "w-5 h-5", translate: "translate-x-6" },
  };
  const current = sizes[size];

  return (
    <label className="flex items-center cursor-pointer">
      <div
        className={`relative ${current.w} ${current.h} rounded-full transition-colors`}
        style={{
          backgroundColor: checked ? "var(--ui-primary-bg)" : "var(--bg-soft)",
        }}
      >
        <div
          className={`absolute top-0.5 left-0.5 bg-white rounded-full transition-transform ${current.circle} ${checked ? current.translate : "translate-x-0"}`}
        />
      </div>
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
};
