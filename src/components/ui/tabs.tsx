import React, { useState, type ReactNode } from "react";

export const Tabs = ({ items }: { items: { id: string; label: string; content: ReactNode }[] }) => {
  const [active, setActive] = useState(items[0]?.id ?? "");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex border-b border-[#27272a] w-full">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-[1px] ${active === item.id ? "border-[color:var(--ui-primary)] text-white" : "border-transparent text-gray-400 hover:text-gray-200"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="px-2 py-2 text-gray-300">{items.find((i) => i.id === active)?.content}</div>
    </div>
  );
};
