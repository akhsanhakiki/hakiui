// src/components/ui/accordion.tsx
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Accordion = ({
  children,
  className = ""
}) => /* @__PURE__ */ jsx("div", { className: `flex flex-col gap-2 w-full ${className}`, children });
var AccordionItem = ({
  title,
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "overflow-hidden",
      style: { borderBottom: "0.5px solid var(--border)" },
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setIsOpen(!isOpen),
            className: "flex w-full items-center justify-between py-4 text-left transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium text-(--text)", children: title }),
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  size: 18,
                  className: `text-(--text-muted) transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out motion-reduce:transition-none",
            style: {
              maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-4px)"
            },
            children: /* @__PURE__ */ jsx(
              "div",
              {
                ref: contentRef,
                className: "pb-4 text-sm text-(--text-muted) opacity-70",
                children
              }
            )
          }
        )
      ]
    }
  );
};

export {
  Accordion,
  AccordionItem
};
//# sourceMappingURL=chunk-Z2UQJJN6.js.map