import React, { type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
};

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

export const Breadcrumbs = ({
  items,
  separator,
  className = "",
}: BreadcrumbsProps) => (
  <nav
    aria-label="Breadcrumb"
    className={className}
    style={{ fontFamily: "var(--ui-font)" }}
  >
    <ol className="m-0 flex list-none flex-wrap items-center gap-1.5 p-0">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const content = isLast ? (
          <span aria-current="page" className="font-medium text-(--text)">
            {item.label}
          </span>
        ) : item.href || item.onClick ? (
          <a
            href={item.href ?? "#"}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
            className="text-(--text-muted) transition-colors hover:text-(--text) hover:underline"
          >
            {item.label}
          </a>
        ) : (
          <span className="text-(--text-muted)">{item.label}</span>
        );

        return (
          <li key={i} className="flex items-center gap-1.5 text-sm">
            {content}
            {!isLast && (
              <span aria-hidden className="flex text-(--text-muted) opacity-60">
                {separator ?? <ChevronRight size={14} />}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
