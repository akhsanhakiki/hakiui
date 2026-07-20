"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/accordion.tsx
var accordion_exports = {};
__export(accordion_exports, {
  Accordion: () => Accordion,
  AccordionItem: () => AccordionItem
});
module.exports = __toCommonJS(accordion_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var Accordion = ({
  children,
  className = ""
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex flex-col gap-2 w-full ${className}`, children });
var AccordionItem = ({
  title,
  children
}) => {
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const contentRef = (0, import_react.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "overflow-hidden",
      style: { borderBottom: "0.5px solid var(--border)" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => setIsOpen(!isOpen),
            className: "flex w-full items-center justify-between py-4 text-left transition-colors",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-(--text)", children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_lucide_react.ChevronDown,
                {
                  size: 18,
                  className: `text-(--text-muted) transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out motion-reduce:transition-none",
            style: {
              maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-4px)"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionItem
});
//# sourceMappingURL=accordion.cjs.map