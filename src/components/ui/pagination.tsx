import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  total,
  page,
  onChange
}: {
  total: number;
  page: number;
  onChange: (page: number) => void;
}) => {
  const getPages = () => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", total];
    if (page >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", page - 1, page, page + 1, "...", total];
  };

  return (
    <div className="flex items-center gap-2 select-none">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-transparent border-0"
      >
        <ChevronLeft size={16} /> Previous
      </button>
      <div className="flex items-center gap-1">
        {getPages().map((p, i) => {
          if (p === "...") return <span key={`ellipsis-${i}`} className="w-8 flex items-center justify-center text-gray-500">...</span>;
          const isActive = p === page;
          return (
            <button
              type="button"
              key={`page-${p}`}
              onClick={() => onChange(p as number)}
              className={`w-8 h-8 flex items-center justify-center transition-colors text-sm ${isActive ? "text-white rounded-full" : "bg-transparent hover:bg-[#27272a] text-gray-300 rounded-full"}`}
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
        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-transparent border-0"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
};
