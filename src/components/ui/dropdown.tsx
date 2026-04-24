import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0, width: 0 });
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
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  const dropdownMenu =
    !disabled &&
    createPortal(
      <div
        ref={menuRef}
        className={`fixed z-9999 max-h-64 overflow-y-auto p-1.5 shadow-xl transition-all duration-200 ease-out motion-reduce:transition-none ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"}`}
        style={{
          ...getRadiusStyle(radius),
          top: menuPosition.top,
          left: menuPosition.left,
          width: menuPosition.width,
          backgroundColor: "var(--bg)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0,
        }}
        aria-hidden={!isOpen}
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
      </div>,
      document.body,
    );

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-(--text)">
          {label}
        </label>
      )}
      <div ref={containerRef} className="relative w-full">
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between gap-3 text-left text-(--text) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:border-(--ui-primary) disabled:cursor-not-allowed disabled:opacity-60 ${currentSize.trigger} ${currentSize.text}`}
          style={{
            ...getRadiusStyle(radius),
            backgroundColor: "var(--bg-soft)",
            border: "0.5px solid var(--border)",
            outline: "0.5px solid var(--border)",
            outlineOffset: 0,
          }}
        >
          <span
            className={`truncate ${selectedOption ? "text-(--text)" : "text-(--text-muted)"} ${currentSize.text}`}
          >
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown
            size={currentSize.icon}
            className={`shrink-0 text-(--text-muted) transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {dropdownMenu}
    </div>
  );
};
