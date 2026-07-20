import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";
import {
  defaultMenuPortalStyle,
  resolveMenuPortalTokens,
  type MenuPortalStyle,
} from "../../lib/resolve-menu-portal-tokens";

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  radius?: Radius;
  disabled?: boolean;
  /** Allow clearing the selection with an inline × button. */
  clearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Format the value shown in the trigger. */
  formatValue?: (date: Date) => string;
  className?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const isSameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const stripTime = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const defaultFormat = (date: Date) =>
  date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const DatePicker = ({
  value,
  defaultValue = null,
  onChange,
  label,
  placeholder = "Pick a date",
  size = "md",
  radius = "md",
  disabled = false,
  clearable = false,
  minDate,
  maxDate,
  formatValue = defaultFormat,
  className = "",
}: DatePickerProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : internalValue;
  const [viewDate, setViewDate] = useState<Date>(selected ?? new Date());
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [portalStyle, setPortalStyle] = useState<MenuPortalStyle>(
    defaultMenuPortalStyle,
  );

  const sizeStyles = {
    sm: { trigger: "px-2.5 py-1 min-h-9 text-xs", icon: 14 },
    md: { trigger: "px-3 py-1.5 min-h-10 text-sm", icon: 15 },
    lg: { trigger: "px-3 py-2 min-h-11 text-base", icon: 16 },
  } as const;
  const currentSize = sizeStyles[size];

  useEffect(() => {
    if (isOpen) setViewDate(selected ?? new Date());
  }, [isOpen, selected]);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !popoverRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const popoverHeight = 330;
      const openUp =
        rect.bottom + popoverHeight + 8 > window.innerHeight &&
        rect.top - popoverHeight - 8 > 0;
      setPosition({
        top: openUp ? rect.top - popoverHeight - 8 : rect.bottom + 8,
        left: Math.min(rect.left, Math.max(8, window.innerWidth - 296)),
      });
      setPortalStyle(resolveMenuPortalTokens(window.getComputedStyle(el)));
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  const setDate = (date: Date | null) => {
    if (value === undefined) setInternalValue(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const isDisabledDay = (date: Date) => {
    if (minDate && stripTime(date) < stripTime(minDate)) return true;
    if (maxDate && stripTime(date) > stripTime(maxDate)) return true;
    return false;
  };

  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1,
  ).getDay();
  const today = new Date();

  const popover =
    !disabled &&
    createPortal(
      <div
        ref={popoverRef}
        className={`fixed z-9999 w-[280px] select-none p-4 shadow-2xl transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1.5 scale-[0.98] opacity-0"}`}
        style={{
          top: position.top,
          left: position.left,
          backgroundColor: portalStyle.backgroundColor,
          border: `0.5px solid ${portalStyle.borderColor}`,
          outline: `0.5px solid ${portalStyle.borderColor}`,
          outlineOffset: 0,
          borderRadius: portalStyle.borderRadius,
          fontFamily: "var(--ui-font)",
        }}
        aria-hidden={!isOpen}
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() =>
              setViewDate(
                new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
              )
            }
            className="rounded-md p-1 transition-colors hover:bg-(--dropdown-hover-bg)"
            style={{ color: portalStyle["--dropdown-text"] }}
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <span
            className="text-sm font-medium"
            style={{ color: portalStyle["--dropdown-text"] }}
          >
            {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
          </span>
          <button
            type="button"
            onClick={() =>
              setViewDate(
                new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
              )
            }
            className="rounded-md p-1 transition-colors hover:bg-(--dropdown-hover-bg)"
            style={{ color: portalStyle["--dropdown-text"] }}
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center">
          {DAYS.map((d) => (
            <div
              key={d}
              className="text-xs font-medium"
              style={{ color: portalStyle["--dropdown-text-muted"] }}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {[...Array(firstDayOfMonth)].map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {[...Array(daysInMonth)].map((_, i) => {
            const date = new Date(
              viewDate.getFullYear(),
              viewDate.getMonth(),
              i + 1,
            );
            const isSelected = isSameDay(date, selected);
            const isToday = isSameDay(date, today);
            const dayDisabled = isDisabledDay(date);
            return (
              <button
                type="button"
                key={i + 1}
                disabled={dayDisabled}
                onClick={() => setDate(date)}
                className={`mx-auto flex h-8 w-8 items-center justify-center text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${isSelected ? "font-medium text-white" : "hover:bg-(--dropdown-hover-bg)"}`}
                style={{
                  ...getRadiusStyle(radius),
                  ...(isSelected
                    ? { background: "var(--ui-primary-bg)" }
                    : {
                        color: portalStyle["--dropdown-text"],
                        ...(isToday
                          ? {
                              boxShadow:
                                "inset 0 0 0 1px var(--ui-primary)",
                            }
                          : {}),
                      }),
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>,
      document.body,
    );

  return (
    <div className={`flex w-full flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-(--text)">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between gap-3 text-left transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:border-(--ui-primary) disabled:cursor-not-allowed disabled:opacity-60 ${currentSize.trigger}`}
          style={{
            ...getRadiusStyle(radius),
            backgroundColor: "var(--bg-soft)",
            border: "0.5px solid var(--border)",
            outline: "0.5px solid var(--border)",
            outlineOffset: 0,
            color: selected ? "var(--text)" : "var(--text-muted)",
          }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <span className="flex min-w-0 items-center gap-2">
            <CalendarIcon
              size={currentSize.icon}
              className="shrink-0 text-(--text-muted)"
            />
            <span className="truncate">
              {selected ? formatValue(selected) : placeholder}
            </span>
          </span>
          {clearable && selected && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear date"
              onClick={(e) => {
                e.stopPropagation();
                setDate(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  setDate(null);
                }
              }}
              className="shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)"
            >
              <X size={currentSize.icon} />
            </span>
          )}
        </button>
      </div>
      {popover}
    </div>
  );
};
