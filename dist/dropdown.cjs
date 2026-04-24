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

// src/components/ui/dropdown.tsx
var dropdown_exports = {};
__export(dropdown_exports, {
  Dropdown: () => Dropdown
});
module.exports = __toCommonJS(dropdown_exports);
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

// src/components/ui/dropdown.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Dropdown = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  label,
  radius = "md",
  disabled = false,
  className = ""
}) => {
  const containerRef = (0, import_react.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [internalValue, setInternalValue] = (0, import_react.useState)(defaultValue ?? "");
  const selectedValue = value ?? internalValue;
  const selectedOption = (0, import_react.useMemo)(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  (0, import_react.useEffect)(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const handleSelect = (nextValue) => {
    if (value === void 0) setInternalValue(nextValue);
    onChange?.(nextValue);
    setIsOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "mb-1.5 block text-sm font-medium text-gray-300", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: containerRef, className: "relative w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          disabled,
          onClick: () => setIsOpen((prev) => !prev),
          className: "w-full min-h-11 bg-[#27272a] border border-[#3f3f46] hover:border-[#52525b] disabled:opacity-60 disabled:cursor-not-allowed px-3 py-2.5 text-left text-sm text-white transition-colors flex items-center justify-between gap-3",
          style: getRadiusStyle(radius),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `truncate ${selectedOption ? "text-white" : "text-gray-500"}`, children: selectedOption?.label ?? placeholder }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_lucide_react.ChevronDown,
              {
                size: 16,
                className: `shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`
              }
            )
          ]
        }
      ),
      isOpen && !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "absolute z-50 mt-2 w-full bg-[#18181b] border border-[#27272a] p-1.5 shadow-xl max-h-64 overflow-y-auto",
          style: getRadiusStyle(radius),
          children: options.map((option) => {
            const isSelected = option.value === selectedValue;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "button",
              {
                type: "button",
                disabled: option.disabled,
                onClick: () => handleSelect(option.value),
                className: "w-full text-left px-2.5 py-2 rounded-md hover:bg-[#27272a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-start justify-between gap-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `text-sm truncate ${isSelected ? "text-white font-medium" : "text-gray-200"}`, children: option.label }),
                    option.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-gray-500 mt-0.5 truncate", children: option.description })
                  ] }),
                  isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { size: 16, className: "mt-0.5 text-(--ui-primary) shrink-0" })
                ]
              },
              option.value
            );
          })
        }
      )
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Dropdown
});
//# sourceMappingURL=dropdown.cjs.map