import React, { useState, type ReactNode } from "react";

export const Tabs = ({
  items,
}: {
  items: { id: string; label: string; content: ReactNode }[];
}) => {
  const [active, setActive] = useState(items[0]?.id ?? "");
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex w-full border-b"
        style={{ borderColor: "color-mix(in srgb, var(--border) 50%, transparent)" }}
      >
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${active === item.id ? "border-(--ui-primary) text-(--text)" : "border-transparent text-(--text-muted) hover:text-(--text)"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="px-2 py-2 text-(--text)">
        {items.find((i) => i.id === active)?.content}
      </div>
    </div>
  );
};
