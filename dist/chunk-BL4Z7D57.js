import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/accordion.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Accordion = ({ children, className = "" }) => /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-2 w-full ${className}`, children });
var AccordionItem = ({ title, children, radius = "md" }) => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#18181b] border border-[#27272a] overflow-hidden", style: getRadiusStyle(radius), children: [
    /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setIsOpen(!isOpen), className: "w-full flex items-center justify-between p-4 text-left hover:bg-[#27272a]/50 transition-colors", children: [
      /* @__PURE__ */ jsx("span", { className: "font-medium text-white", children: title }),
      /* @__PURE__ */ jsx(ChevronDown, { size: 18, className: `text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}` })
    ] }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "p-4 pt-0 text-gray-400 text-sm border-t border-[#27272a] mt-2", children })
  ] });
};

export {
  Accordion,
  AccordionItem
};
//# sourceMappingURL=chunk-BL4Z7D57.js.map