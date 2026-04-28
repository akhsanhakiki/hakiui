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

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/accordion.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Accordion = ({
  children,
  className = ""
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `flex flex-col gap-2 w-full ${className}`, children });
var AccordionItem = ({
  title,
  children,
  radius = "md"
}) => {
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "overflow-hidden border border-(--border) bg-(--surface)",
      style: getRadiusStyle(radius),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => setIsOpen(!isOpen),
            className: "flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-(--hover)",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium text-(--text)", children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_lucide_react.ChevronDown,
                {
                  size: 18,
                  className: `text-(--text-muted) transition-transform ${isOpen ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 border-t border-(--border) p-4 pt-0 text-sm text-(--text-muted)", children })
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