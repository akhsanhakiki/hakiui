import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Check, Search } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";
import {
  defaultMenuPortalStyle,
  resolveMenuPortalTokens,
  type MenuPortalStyle,
} from "../../lib/resolve-menu-portal-tokens";

export interface AutocompleteOption {
  label: string;
  value: string;
  description?: ReactNode;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  size?: "sm" | "md" | "lg";
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
  size = "lg",
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
  const fieldRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [query, setQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [menuStyle, setMenuStyle] = useState<MenuPortalStyle>(
    defaultMenuPortalStyle,
  );

  const sizeStyles = {
    sm: {
      container: "px-2.5 py-1 min-h-9",
      text: "text-xs",
      icon: 14,
    },
    md: {
      container: "px-3 py-1.5 min-h-10",
      text: "text-sm",
      icon: 15,
    },
    lg: {
      container: "px-3 py-2 min-h-11",
      text: "text-base",
      icon: 16,
    },
  } as const;
  const currentSize = sizeStyles[size];

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
      const target = event.target as Node;
      if (
        !containerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
    setHoveredValue(null);
    setIsOpen(false);
    setQuery("");
  };

  useEffect(() => {
    if (isOpen) return;
    setHoveredValue(null);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const fieldEl = fieldRef.current;
      if (!fieldEl) return;
      const rect = fieldEl.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(fieldEl);

      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
      setMenuStyle(resolveMenuPortalTokens(computedStyle));
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  const displayValue = isOpen ? query : (selectedOption?.label ?? "");

  const autocompleteMenu =
    !disabled &&
    createPortal(
      <div
        ref={menuRef}
        className={`fixed z-9999 max-h-64 origin-top overflow-y-auto rounded-xl p-1.5 shadow-2xl backdrop-blur-sm will-change-transform will-change-opacity transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1.5 scale-[0.98] opacity-0"}`}
        style={{
          top: menuPosition.top,
          left: menuPosition.left,
          width: menuPosition.width,
          backgroundColor: menuStyle.backgroundColor,
          border: `0.5px solid ${menuStyle.borderColor}`,
          outline: `0.5px solid ${menuStyle.borderColor}`,
          outlineOffset: 0,
          borderRadius: menuStyle.borderRadius,
        }}
        aria-hidden={!isOpen}
      >
        {filteredOptions.length === 0 ? (
          <div
            className="px-2.5 py-2 text-sm"
            style={{ color: menuStyle["--dropdown-text-muted"] }}
          >
            {emptyMessage}
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {filteredOptions.map((option) => {
              const isSelected = option.value === selectedValue;
              const isHovered = hoveredValue === option.value;
              return (
                <li key={option.value} className="m-0 p-0">
                  <button
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    onMouseEnter={() => setHoveredValue(option.value)}
                    onMouseLeave={() =>
                      setHoveredValue((current) =>
                        current === option.value ? null : current,
                      )
                    }
                    className="flex w-full items-start justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      transform: isHovered
                        ? "translateY(-0.5px) scale(1.003)"
                        : "translateY(0) scale(1)",
                      boxShadow: isHovered
                        ? "inset 0 0 0 0.5px color-mix(in oklab, var(--border) 50%, transparent)"
                        : "none",
                      backgroundColor: isHovered
                        ? `color-mix(in oklab, ${menuStyle.backgroundColor} 88%, ${menuStyle["--dropdown-hover-bg"]} 35%)`
                        : "transparent",
                      color: menuStyle["--dropdown-text"],
                    }}
                  >
                    <div className="min-w-0">
                      <div
                        className={`truncate text-sm transition-colors duration-200 ${isSelected ? "font-medium" : ""}`}
                        style={{
                          color: menuStyle["--dropdown-text"],
                        }}
                      >
                        {option.label}
                      </div>
                      {option.description && (
                        <div
                          className="mt-0.5 truncate text-xs transition-colors duration-200"
                          style={{
                            color: menuStyle["--dropdown-text-muted"],
                          }}
                        >
                          {option.description}
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-(--ui-primary)"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>,
      document.body,
    );

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-(--text)">
          {label}
        </label>
      )}
      <div ref={containerRef} className="relative w-full">
        <div
          ref={fieldRef}
          className={`flex w-full items-center gap-2 overflow-hidden transition-colors focus-within:border-(--ui-primary) ${currentSize.container}`}
          style={{
            ...getRadiusStyle(radius),
            backgroundColor: "var(--bg-soft)",
            border: "0.5px solid var(--border)",
            outline: "0.5px solid var(--border)",
            outlineOffset: 0,
            boxShadow:
              "inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.09), inset 0 -1px 1px rgba(0, 0, 0, 0.04)",
          }}
        >
          <Search
            size={currentSize.icon}
            className="shrink-0 text-(--text-muted)"
          />
          <input
            ref={inputRef}
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
            className={`w-full bg-transparent text-(--text) outline-none placeholder:text-(--text-muted) disabled:opacity-60 ${currentSize.text}`}
            style={{ fontFamily: "var(--ui-font)" }}
          />
        </div>
      </div>
      {autocompleteMenu}
    </div>
  );
};
