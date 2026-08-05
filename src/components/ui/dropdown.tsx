import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";
import {
  defaultMenuPortalStyle,
  resolveMenuPortalTokens,
  resolveThemeVarStyle,
  type MenuPortalStyle,
} from "../../lib/resolve-menu-portal-tokens";

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

type MenuPosition = {
  top: number;
  left: number;
  width: number;
};

export const Dropdown = ({
  options,
  size = "md",
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
  const isClosingRef = useRef(false);
  // isOpen = portal mounted; isEntered = slide/fade-in target
  const [isOpen, setIsOpen] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const [menuStyle, setMenuStyle] = useState<MenuPortalStyle>(
    defaultMenuPortalStyle,
  );
  const [themeVars, setThemeVars] = useState<Record<string, string>>({});
  const selectedValue = value ?? internalValue;
  const sizeStyles = {
    sm: {
      trigger: "px-2 py-1 min-h-8",
      text: "text-xs",
      icon: 14,
      option: "px-2 py-1",
      optionLabel: "text-xs",
      optionDescription: "text-[11px]",
      check: 14,
      menu: "p-1",
    },
    md: {
      trigger: "px-3 py-2 min-h-9",
      text: "text-sm",
      icon: 15,
      option: "px-2.5 py-1.5",
      optionLabel: "text-sm",
      optionDescription: "text-xs",
      check: 15,
      menu: "p-1",
    },
    lg: {
      trigger: "px-3.5 py-2.5 min-h-10",
      text: "text-base",
      icon: 16,
      option: "px-3 py-2",
      optionLabel: "text-base",
      optionDescription: "text-sm",
      check: 16,
      menu: "p-1.5",
    },
  } as const;
  const currentSize = sizeStyles[size];

  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  const measureMenuLayout = (): MenuPosition | null => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return null;
    const rect = triggerEl.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(triggerEl);
    const nextPosition: MenuPosition = {
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    };
    setMenuPosition(nextPosition);
    setMenuStyle(resolveMenuPortalTokens(computedStyle));
    setThemeVars(resolveThemeVarStyle(computedStyle));
    return nextPosition;
  };

  const openMenu = () => {
    if (!measureMenuLayout()) return;
    isClosingRef.current = false;
    setIsEntered(false);
    setIsOpen(true);
  };

  const requestClose = () => {
    if (!isOpen) return;
    isClosingRef.current = true;
    setIsEntered(false);
    setHoveredValue(null);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !containerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        isClosingRef.current = true;
        setIsEntered(false);
        setHoveredValue(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleSelect = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
    requestClose();
  };

  // Mount closed under the trigger, then enter next frame so the transition
  // always starts from the trigger — never from the default (0,0) portal coords.
  useLayoutEffect(() => {
    if (!isOpen) return;

    measureMenuLayout();

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!isClosingRef.current) setIsEntered(true);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      measureMenuLayout();
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  // Unmount after exit transition (keep portal mounted while isEntered animates out)
  useEffect(() => {
    if (!isOpen || isEntered || !isClosingRef.current) return;

    const menuEl = menuRef.current;
    if (!menuEl) {
      setIsOpen(false);
      isClosingRef.current = false;
      return;
    }

    let done = false;
    const finishClose = () => {
      if (done) return;
      done = true;
      setIsOpen(false);
      isClosingRef.current = false;
    };

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target !== menuEl) return;
      if (
        event.propertyName !== "opacity" &&
        event.propertyName !== "transform"
      ) {
        return;
      }
      finishClose();
    };

    menuEl.addEventListener("transitionend", handleTransitionEnd);
    // Fallback if transitionend does not fire (reduced motion / interrupted)
    const timeoutId = window.setTimeout(finishClose, 300);

    return () => {
      menuEl.removeEventListener("transitionend", handleTransitionEnd);
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, isEntered]);

  const dropdownMenu =
    !disabled &&
    isOpen &&
    menuPosition &&
    createPortal(
      <div
        ref={menuRef}
        className={`fixed z-9999 max-h-64 origin-top overflow-y-auto rounded-xl shadow-2xl backdrop-blur-sm will-change-transform will-change-opacity transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${currentSize.menu} ${isEntered ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1.5 opacity-0"}`}
        style={{
          ...(themeVars as React.CSSProperties),
          top: menuPosition.top,
          left: menuPosition.left,
          width: menuPosition.width,
          backgroundColor: menuStyle.backgroundColor,
          border: `0.5px solid ${menuStyle.borderColor}`,
          outline: `0.5px solid ${menuStyle.borderColor}`,
          outlineOffset: 0,
          borderRadius: menuStyle.borderRadius,
        }}
        aria-hidden={!isEntered}
      >
        <ul className="m-0 list-none p-0">
          {options.map((option) => {
            const isSelected = option.value === selectedValue;
            const isHovered = hoveredValue === option.value && !option.disabled;

            return (
              <li key={option.value} className="m-0 p-0">
                <button
                  type="button"
                  disabled={option.disabled}
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setHoveredValue(option.value)}
                  onMouseLeave={() =>
                    setHoveredValue((current) =>
                      current === option.value ? null : current,
                    )
                  }
                  className={`flex w-full items-start justify-between gap-2 rounded-lg text-left transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40 ${currentSize.option}`}
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
                      className={`truncate transition-colors duration-200 ${currentSize.optionLabel} ${isSelected ? "font-medium" : ""}`}
                      style={{
                        color: menuStyle["--dropdown-text"],
                      }}
                    >
                      {option.label}
                    </div>
                    {option.description && (
                      <div
                        className={`mt-0.5 truncate transition-colors duration-200 ${currentSize.optionDescription}`}
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
                      size={currentSize.check}
                      className="mt-0.5 shrink-0 text-(--ui-primary)"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
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
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => {
            if (isOpen && isEntered) requestClose();
            else if (!isOpen) openMenu();
          }}
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
            className={`shrink-0 text-(--text-muted) transition-transform duration-200 ease-out motion-reduce:transition-none ${isEntered ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {dropdownMenu}
    </div>
  );
};
