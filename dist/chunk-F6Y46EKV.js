import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/accordion.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Accordion = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-2 w-full ${className}`, children });
var AccordionItem = ({
  title,
  children,
  radius = "md"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "overflow-hidden border border-(--border) bg-(--surface)",
      style: getRadiusStyle(radius),
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setIsOpen(!isOpen),
            className: "flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-(--hover)",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-(--text)", children: title }),
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  size: 18,
                  className: `text-(--text-muted) transition-transform ${isOpen ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        isOpen && /* @__PURE__ */ jsx("div", { className: "mt-2 border-t border-(--border) p-4 pt-0 text-sm text-(--text-muted)", children })
      ]
    }
  );
};

export {
  Accordion,
  AccordionItem
};
//# sourceMappingURL=chunk-F6Y46EKV.js.map