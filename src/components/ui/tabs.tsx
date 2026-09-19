import React, {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type TabsVariant = "underline" | "segmented";
export type TabsSize = "sm" | "md" | "lg";

export interface TabsProps {
  items: { id: string; label: ReactNode; content: ReactNode }[];
  variant?: TabsVariant;
  size?: TabsSize;
}

export const Tabs = ({
  items,
  variant = "underline",
  size = "md",
}: TabsProps) => {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const instanceId = useId();
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem = items.find((item) => item.id === active);

  const selectByIndex = (index: number) => {
    const nextIndex = (index + items.length) % items.length;
    const next = items[nextIndex];
    if (!next) return;
    setActive(next.id);
    tabsRef.current[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectByIndex(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectByIndex(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectByIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectByIndex(items.length - 1);
    }
  };

  const listClass =
    variant === "underline"
      ? "flex w-full border-b"
      : "flex w-fit max-w-full overflow-x-auto rounded-[var(--ui-radius)] border border-(--border) bg-(--bg-soft) p-0.5";

  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-xs"
      : size === "lg"
        ? "px-3 py-1.5 text-sm"
        : "px-2.5 py-1 text-xs";

  const tabClass = (selected: boolean) => {
    if (variant === "underline") {
      return `-mb-px border-b-2 font-medium transition-colors ${sizeClass} ${selected ? "border-(--ui-primary) text-(--text)" : "border-transparent text-(--text-muted) hover:text-(--text)"}`;
    }
    return `shrink-0 rounded-[var(--ui-radius)] border-0 font-medium transition-colors ${sizeClass} ${selected ? "bg-(--surface) text-(--text) shadow-sm" : "text-(--text-muted) hover:text-(--text)"}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        className={listClass}
        style={variant === "underline" ? { borderColor: "color-mix(in srgb, var(--border) 50%, transparent)" } : undefined}
        role="tablist"
      >
        {items.map((item, index) => {
          const selected = active === item.id;
          const tabId = `${instanceId}-${item.id}-tab`;
          const panelId = `${instanceId}-${item.id}-panel`;
          return (
          <button
            type="button"
            key={item.id}
            onClick={() => setActive(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(node) => { tabsRef.current[index] = node; }}
            id={tabId}
            role="tab"
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            className={tabClass(selected)}
          >
            {item.label}
          </button>
          );
        })}
      </div>
      <div
        id={`${instanceId}-${activeItem?.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${instanceId}-${activeItem?.id}-tab`}
        className="px-2 py-2 text-(--text)"
      >
        {activeItem?.content}
      </div>
    </div>
  );
};
