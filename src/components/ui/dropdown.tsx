import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
  size?: "sm" | "md" | "lg";
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
  size = "lg",
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  label,
  radius = "md",
  disabled = false,
  className = "",
}: DropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const selectedValue = value ?? internalValue;
  const sizeStyles = {
    sm: {
      trigger: "px-2.5 py-1 min-h-9",
      text: "text-xs",
      icon: 14,
    },
    md: {
      trigger: "px-3 py-1.5 min-h-10",
      text: "text-sm",
      icon: 15,
    },
    lg: {
      trigger: "px-3 py-2 min-h-11",
      text: "text-base",
      icon: 16,
    },
  } as const;
  const currentSize = sizeStyles[size];

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
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
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-(--text)">
          {label}
        </label>
      )}
      <div ref={containerRef} className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between gap-3 border border-(--border) bg-(--input) text-left text-(--text) transition-colors hover:border-(--ui-primary) disabled:cursor-not-allowed disabled:opacity-60 ${currentSize.trigger} ${currentSize.text}`}
          style={getRadiusStyle(radius)}
        >
          <span
            className={`truncate ${selectedOption ? "text-(--text)" : "text-(--text-muted)"} ${currentSize.text}`}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            size={currentSize.icon}
            className={`shrink-0 text-(--text-muted) transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && !disabled && (
          <div
            className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto border border-(--border) bg-(--surface) p-1.5 shadow-xl"
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
                  className="flex w-full items-start justify-between gap-2 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-(--hover) disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <div className="min-w-0">
                    <div
                      className={`truncate text-sm ${isSelected ? "font-medium text-(--text)" : "text-(--text)"}`}
                    >
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="mt-0.5 truncate text-xs text-(--text-muted)">
                        {option.description}
                      </div>
                    )}
                  </div>
                  {isSelected && (
                    <Check
                      size={16}
                      className="mt-0.5 text-(--ui-primary) shrink-0"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
