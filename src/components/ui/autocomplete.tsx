import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
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
  className = "",
}: AutocompleteProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [query, setQuery] = useState("");

  const selectedValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  const filteredOptions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => {
      const labelText = option.label.toLowerCase();
      const valueText = option.value.toLowerCase();
      const descriptionText =
        typeof option.description === "string"
          ? option.description.toLowerCase()
          : "";
      return (
        labelText.includes(needle) ||
        valueText.includes(needle) ||
        descriptionText.includes(needle)
      );
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

  const displayValue = isOpen ? query : (selectedOption?.label ?? "");

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-(--text)">
          {label}
        </label>
      )}
      <div ref={containerRef} className="relative w-full">
        <div
          className="flex w-full items-center gap-2 border border-(--border) bg-(--input) px-3 py-2 text-sm transition-colors focus-within:border-(--ui-primary)"
          style={getRadiusStyle(radius)}
        >
          <Search size={16} className="shrink-0 text-(--text-muted)" />
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
            className="w-full bg-transparent text-(--text) outline-none placeholder:text-(--text-muted) disabled:opacity-60"
            style={{ fontFamily: "var(--ui-font)" }}
          />
        </div>

        {isOpen && !disabled && (
          <div
            className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto border border-(--border) bg-(--surface) p-1.5 shadow-xl"
            style={getRadiusStyle(radius)}
          >
            {filteredOptions.length === 0 ? (
              <div className="px-2.5 py-2 text-sm text-(--text-muted)">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = option.value === selectedValue;
                return (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="flex w-full items-start justify-between gap-2 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-(--hover)"
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
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};
