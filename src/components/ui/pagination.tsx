import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  total,
  page,
  onChange,
}: {
  total: number;
  page: number;
  onChange: (page: number) => void;
}) => {
  const getPages = () => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", total];
    if (page >= total - 2)
      return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", page - 1, page, page + 1, "...", total];
  };

  return (
    <div className="flex items-center gap-2 select-none">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex items-center gap-1 border-0 bg-transparent px-3 py-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text) disabled:opacity-50"
      >
        <ChevronLeft size={16} /> Previous
      </button>
      <div className="flex items-center gap-1">
        {getPages().map((p, i) => {
          if (p === "...")
            return (
              <span
                key={`ellipsis-${i}`}
                className="flex w-8 items-center justify-center text-(--text-muted)"
              >
                ...
              </span>
            );
          const isActive = p === page;
          return (
            <button
              type="button"
              key={`page-${p}`}
              onClick={() => onChange(p as number)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${isActive ? "text-white" : "bg-transparent text-(--text) hover:bg-(--hover)"}`}
              style={isActive ? { background: "var(--ui-primary-bg)" } : {}}
            >
              {p}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(total, page + 1))}
        disabled={page === total}
        className="flex items-center gap-1 border-0 bg-transparent px-3 py-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text) disabled:opacity-50"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};
