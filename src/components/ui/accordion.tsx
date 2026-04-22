import React, { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export const Accordion = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col gap-2 w-full ${className}`}>{children}</div>
);

export const AccordionItem = ({ title, children, radius = "md" }: { title: string; children: ReactNode; radius?: Radius }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-[#18181b] border border-[#27272a] overflow-hidden" style={getRadiusStyle(radius)}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 text-left hover:bg-[#27272a]/50 transition-colors">
        <span className="font-medium text-white">{title}</span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="p-4 pt-0 text-gray-400 text-sm border-t border-[#27272a] mt-2">{children}</div>}
    </div>
  );
};
