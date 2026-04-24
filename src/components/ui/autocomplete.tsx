import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, Search } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface AutocompleteOption {
  label: string;
  value: string;
  description?: ReactNode;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  label?: string;
  radius?: Radius;
  disabled?: boolean;
  className?: string;
}

export const Autocomplete = ({
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
}: AutocompleteProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      const descriptionText =
        typeof option.description === "string" ? option.description.toLowerCase() : "";
      return labelText.includes(needle) || valueText.includes(needle) || descriptionText.includes(needle);
    });
  }, [options, query]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
    setIsOpen(false);
    setQuery("");
  };

  const displayValue = isOpen ? query : selectedOption?.label ?? "";

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="mb-1.5 block text-sm font-medium text-gray-300">{label}</label>}
      <div ref={containerRef} className="relative w-full">
        <div
          className="w-full bg-[#27272a] border border-[#3f3f46] focus-within:border-(--ui-primary) px-3 py-2 text-sm transition-colors flex items-center gap-2"
          style={getRadiusStyle(radius)}
        >
          <Search size={16} className="text-gray-500 shrink-0" />
          <input
            type="text"
            disabled={disabled}
            value={displayValue}
            onFocus={() => setIsOpen(true)}
            onChange={(event) => {
              setIsOpen(true);
              setQuery(event.target.value);
              onInputChange?.(event.target.value);
            }}
            placeholder={placeholder}
            className="w-full bg-transparent text-white outline-none placeholder:text-gray-500 disabled:opacity-60"
            style={{ fontFamily: "var(--ui-font)" }}
          />
        </div>

        {isOpen && !disabled && (
          <div
            className="absolute z-50 mt-2 w-full bg-[#18181b] border border-[#27272a] p-1.5 shadow-xl max-h-64 overflow-y-auto"
            style={getRadiusStyle(radius)}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-2.5 py-2 text-sm text-gray-500">{emptyMessage}</div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="w-full text-left px-2.5 py-2 rounded-md hover:bg-[#27272a] transition-colors flex items-start justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className={`text-sm truncate ${isSelected ? "text-white font-medium" : "text-gray-200"}`}>
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-xs text-gray-500 mt-0.5 truncate">{option.description}</div>
                      )}
                    </div>
                    {isSelected && <Check size={16} className="mt-0.5 text-(--ui-primary) shrink-0" />}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
