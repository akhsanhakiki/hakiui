import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/autocomplete.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Search } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Autocomplete = ({
  options,
  value,
  defaultValue,
  onChange,
  onInputChange,
  placeholder = "Search...",
  emptyMessage = "No options found",
  label,
  radius = "md",
  disabled = false,
  className = ""
}) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [query, setQuery] = useState("");
  const selectedValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  const filteredOptions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => {
      const labelText = option.label.toLowerCase();
      const valueText = option.value.toLowerCase();
      const descriptionText = typeof option.description === "string" ? option.description.toLowerCase() : "";
      return labelText.includes(needle) || valueText.includes(needle) || descriptionText.includes(needle);
    });
  }, [options, query]);
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
    setQuery("");
  };
  const displayValue = isOpen ? query : selectedOption?.label ?? "";
  return /* @__PURE__ */ jsxs("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ jsx("label", { className: "mb-1.5 block text-sm font-medium text-gray-300", children: label }),
    /* @__PURE__ */ jsxs("div", { ref: containerRef, className: "relative w-full", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "w-full bg-[#27272a] border border-[#3f3f46] focus-within:border-(--ui-primary) px-3 py-2 text-sm transition-colors flex items-center gap-2",
          style: getRadiusStyle(radius),
          children: [
            /* @__PURE__ */ jsx(Search, { size: 16, className: "text-gray-500 shrink-0" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                disabled,
                value: displayValue,
                onFocus: () => setIsOpen(true),
                onChange: (event) => {
                  setIsOpen(true);
                  setQuery(event.target.value);
                  onInputChange?.(event.target.value);
                },
                placeholder,
                className: "w-full bg-transparent text-white outline-none placeholder:text-gray-500 disabled:opacity-60",
                style: { fontFamily: "var(--ui-font)" }
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
          children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-2.5 py-2 text-sm text-gray-500", children: emptyMessage }) : filteredOptions.map((option) => {
            const isSelected = option.value === selectedValue;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSelect(option.value),
                className: "w-full text-left px-2.5 py-2 rounded-md hover:bg-[#27272a] transition-colors flex items-start justify-between gap-2",
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
  Autocomplete
};
//# sourceMappingURL=chunk-V77SKEDD.js.map