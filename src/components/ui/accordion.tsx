import React, { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export const Accordion = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col gap-2 w-full ${className}`}>{children}</div>
);

export const AccordionItem = ({
  title,
  children,
  radius = "md",
}: {
  title: string;
  children: ReactNode;
  radius?: Radius;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="overflow-hidden border border-(--border) bg-(--surface)"
      style={getRadiusStyle(radius)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-(--hover)"
      >
        <span className="font-medium text-(--text)">{title}</span>
        <ChevronDown
          size={18}
          className={`text-(--text-muted) transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="mt-2 border-t border-(--border) p-4 pt-0 text-sm text-(--text-muted)">
          {children}
        </div>
      )}
    </div>
  );
};
