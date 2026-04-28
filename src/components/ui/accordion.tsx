import React, { useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

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
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="overflow-hidden"
      style={{ borderBottom: "0.5px solid var(--border)" }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors"
      >
        <span className="font-medium text-(--text)">{title}</span>
        <ChevronDown
          size={18}
          className={`text-(--text-muted) transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out motion-reduce:transition-none"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-4px)",
        }}
      >
        <div
          ref={contentRef}
          className="pb-4 text-sm text-(--text-muted)"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
