import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/dropdown.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ jsx("label", { className: "mb-1.5 block text-sm font-medium text-gray-300", children: label }),
    /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative w-full", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          disabled,
          onClick: () => setIsOpen((prev) => !prev),
          className: "w-full min-h-11 bg-[#27272a] border border-[#3f3f46] hover:border-[#52525b] disabled:opacity-60 disabled:cursor-not-allowed px-3 py-2.5 text-left text-sm text-white transition-colors flex items-center justify-between gap-3",
          style: getRadiusStyle(radius),
          children: [
            /* @__PURE__ */ jsx("span", { className: `truncate ${selectedOption ? "text-white" : "text-gray-500"}`, children: selectedOption?.label ?? placeholder }),
            /* @__PURE__ */ jsx(
              ChevronDown,
              {
                size: 16,
                className: `shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`
              }
            )
          ]
        }
      ),
      isOpen && !disabled && /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute z-50 mt-2 w-full bg-[#18181b] border border-[#27272a] p-1.5 shadow-xl max-h-64 overflow-y-auto",
          style: getRadiusStyle(radius),
          children: options.map((option) => {
            const isSelected = option.value === selectedValue;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                disabled: option.disabled,
                onClick: () => handleSelect(option.value),
                className: "w-full text-left px-2.5 py-2 rounded-md hover:bg-[#27272a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-start justify-between gap-2",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("div", { className: `text-sm truncate ${isSelected ? "text-white font-medium" : "text-gray-200"}`, children: option.label }),
                    option.description && /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 mt-0.5 truncate", children: option.description })
                  ] }),
                  isSelected && /* @__PURE__ */ jsx(Check, { size: 16, className: "mt-0.5 text-(--ui-primary) shrink-0" })
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

export {
  Dropdown
};
//# sourceMappingURL=chunk-ZXG4R4BT.js.map