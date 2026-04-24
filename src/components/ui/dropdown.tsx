import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface DropdownOption {
  label: string;
  value: string;
  description?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  radius?: Radius;
  disabled?: boolean;
  className?: string;
}

export const Dropdown = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  label,
  radius = "md",
  disabled = false,
  className = ""
}: DropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = value ?? internalValue;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );

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
  };

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="mb-1.5 block text-sm font-medium text-gray-300">{label}</label>}
      <div ref={containerRef} className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full min-h-11 bg-[#27272a] border border-[#3f3f46] hover:border-[#52525b] disabled:opacity-60 disabled:cursor-not-allowed px-3 py-2.5 text-left text-sm text-white transition-colors flex items-center justify-between gap-3"
          style={getRadiusStyle(radius)}
        >
          <span className={`truncate ${selectedOption ? "text-white" : "text-gray-500"}`}>
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && !disabled && (
          <div
            className="absolute z-50 mt-2 w-full bg-[#18181b] border border-[#27272a] p-1.5 shadow-xl max-h-64 overflow-y-auto"
            style={getRadiusStyle(radius)}
          >
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <button
                  type="button"
                  key={option.value}
                  disabled={option.disabled}
                  onClick={() => handleSelect(option.value)}
                  className="w-full text-left px-2.5 py-2 rounded-md hover:bg-[#27272a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-start justify-between gap-2"
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
            })}
          </div>
        )}
      </div>
    </div>
  );
};
