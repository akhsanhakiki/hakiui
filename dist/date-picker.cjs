"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/date-picker.tsx
var date_picker_exports = {};
__export(date_picker_exports, {
  DatePicker: () => DatePicker
});
module.exports = __toCommonJS(date_picker_exports);
var import_react = require("react");
var import_react_dom = require("react-dom");
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/lib/resolve-menu-portal-tokens.ts
var hexToRgb = (value) => {
  const clean = value.replace("#", "").trim();
  if (![3, 6].includes(clean.length)) return null;
  const expanded = clean.length === 3 ? `${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}` : clean;
  const r = Number.parseInt(expanded.slice(0, 2), 16);
  const g = Number.parseInt(expanded.slice(2, 4), 16);
  const b = Number.parseInt(expanded.slice(4, 6), 16);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;
  return { r, g, b };
};
var parseRgbColor = (value) => {
  const rgbMatch = value.trim().match(/rgba?\((\d+)\s*[,\s]\s*(\d+)\s*[,\s]\s*(\d+)/i);
  if (!rgbMatch) return null;
  return {
    r: Number.parseInt(rgbMatch[1], 10),
    g: Number.parseInt(rgbMatch[2], 10),
    b: Number.parseInt(rgbMatch[3], 10)
  };
};
var getRelativeLuminance = ({
  r,
  g,
  b
}) => {
  const toLinear = (channel) => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
};
var getReadableTextColors = (backgroundColor) => {
  const rgb = parseRgbColor(backgroundColor) ?? hexToRgb(backgroundColor);
  if (!rgb) {
    return {
      foreground: "var(--text)",
      muted: "var(--text-muted)"
    };
  }
  const luminance = getRelativeLuminance(rgb);
  const isDarkBackground = luminance < 0.38;
  return {
    foreground: isDarkBackground ? "#F5F3EC" : "#1C1B17",
    muted: isDarkBackground ? "rgba(245, 243, 236, 0.78)" : "#6E6A5E"
  };
};
var resolveMenuPortalTokens = (computedStyle) => {
  const resolvedBg = computedStyle.getPropertyValue("--bg-soft").trim() || computedStyle.getPropertyValue("--bg").trim() || computedStyle.backgroundColor || "#FAF9F5";
  const resolvedBorder = computedStyle.getPropertyValue("--border").trim() || "rgba(0, 0, 0, 0.08)";
  const resolvedHover = computedStyle.getPropertyValue("--hover").trim() || "rgba(0, 0, 0, 0.06)";
  const resolvedRadius = computedStyle.borderRadius || "4px";
  const resolvedText = computedStyle.getPropertyValue("--text").trim();
  const resolvedTextMuted = computedStyle.getPropertyValue("--text-muted").trim();
  const normalizedHover = resolvedHover.startsWith("rgb(") ? resolvedHover.replace("rgb(", "rgba(").replace(")", ", 0.14)") : resolvedHover.startsWith("rgba(") ? resolvedHover.replace(
    /rgba\(([^)]+),\s*([0-9.]+)\)/i,
    "rgba($1, 0.14)"
  ) : resolvedHover;
  const hoverTextColors = getReadableTextColors(normalizedHover);
  return {
    backgroundColor: resolvedBg,
    borderColor: resolvedBorder,
    borderRadius: resolvedRadius,
    "--dropdown-hover-bg": normalizedHover,
    "--dropdown-hover-fg": hoverTextColors.foreground,
    "--dropdown-hover-muted": hoverTextColors.muted,
    "--dropdown-text": resolvedText || computedStyle.color || "#1C1B17",
    "--dropdown-text-muted": resolvedTextMuted || "#6E6A5E"
  };
};
var defaultMenuPortalStyle = () => ({
  backgroundColor: "var(--bg-soft)",
  borderColor: "var(--border)",
  borderRadius: "4px",
  "--dropdown-hover-bg": "rgba(0, 0, 0, 0.06)",
  "--dropdown-hover-fg": "#1C1B17",
  "--dropdown-hover-muted": "#6E6A5E",
  "--dropdown-text": "#1C1B17",
  "--dropdown-text-muted": "#6E6A5E"
});

// src/components/ui/date-picker.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var MONTHS = [
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
  "December"
];
var DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var isSameDay = (a, b) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
var stripTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
var defaultFormat = (date) => date.toLocaleDateString(void 0, {
  year: "numeric",
  month: "short",
  day: "numeric"
});
var DatePicker = ({
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
  className = ""
}) => {
  const triggerRef = (0, import_react.useRef)(null);
  const popoverRef = (0, import_react.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [internalValue, setInternalValue] = (0, import_react.useState)(defaultValue);
  const selected = value !== void 0 ? value : internalValue;
  const [viewDate, setViewDate] = (0, import_react.useState)(selected ?? /* @__PURE__ */ new Date());
  const [position, setPosition] = (0, import_react.useState)({ top: 0, left: 0 });
  const [portalStyle, setPortalStyle] = (0, import_react.useState)(
    defaultMenuPortalStyle
  );
  const sizeStyles = {
    sm: { trigger: "px-2.5 py-1 min-h-9 text-xs", icon: 14 },
    md: { trigger: "px-3 py-1.5 min-h-10 text-sm", icon: 15 },
    lg: { trigger: "px-3 py-2 min-h-11 text-base", icon: 16 }
  };
  const currentSize = sizeStyles[size];
  (0, import_react.useEffect)(() => {
    if (isOpen) setViewDate(selected ?? /* @__PURE__ */ new Date());
  }, [isOpen, selected]);
  (0, import_react.useEffect)(() => {
    const handleOutside = (event) => {
      const target = event.target;
      if (!triggerRef.current?.contains(target) && !popoverRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const popoverHeight = 330;
      const openUp = rect.bottom + popoverHeight + 8 > window.innerHeight && rect.top - popoverHeight - 8 > 0;
      setPosition({
        top: openUp ? rect.top - popoverHeight - 8 : rect.bottom + 8,
        left: Math.min(rect.left, Math.max(8, window.innerWidth - 296))
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
  const setDate = (date) => {
    if (value === void 0) setInternalValue(date);
    onChange?.(date);
    setIsOpen(false);
  };
  const isDisabledDay = (date) => {
    if (minDate && stripTime(date) < stripTime(minDate)) return true;
    if (maxDate && stripTime(date) > stripTime(maxDate)) return true;
    return false;
  };
  const daysInMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth(),
    1
  ).getDay();
  const today = /* @__PURE__ */ new Date();
  const popover = !disabled && (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: popoverRef,
        className: `fixed z-9999 w-[280px] select-none p-4 shadow-2xl transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1.5 scale-[0.98] opacity-0"}`,
        style: {
          top: position.top,
          left: position.left,
          backgroundColor: portalStyle.backgroundColor,
          border: `0.5px solid ${portalStyle.borderColor}`,
          outline: `0.5px solid ${portalStyle.borderColor}`,
          outlineOffset: 0,
          borderRadius: portalStyle.borderRadius,
          fontFamily: "var(--ui-font)"
        },
        "aria-hidden": !isOpen,
        role: "dialog",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
                ),
                className: "rounded-md p-1 transition-colors hover:bg-(--dropdown-hover-bg)",
                style: { color: portalStyle["--dropdown-text"] },
                "aria-label": "Previous month",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronLeft, { size: 16 })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              "span",
              {
                className: "text-sm font-medium",
                style: { color: portalStyle["--dropdown-text"] },
                children: [
                  MONTHS[viewDate.getMonth()],
                  " ",
                  viewDate.getFullYear()
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
                ),
                className: "rounded-md p-1 transition-colors hover:bg-(--dropdown-hover-bg)",
                style: { color: portalStyle["--dropdown-text"] },
                "aria-label": "Next month",
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-2 grid grid-cols-7 gap-1 text-center", children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: "text-xs font-medium",
              style: { color: portalStyle["--dropdown-text-muted"] },
              children: d
            },
            d
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-7 gap-1 text-center", children: [
            [...Array(firstDayOfMonth)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `empty-${i}`)),
            [...Array(daysInMonth)].map((_, i) => {
              const date = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth(),
                i + 1
              );
              const isSelected = isSameDay(date, selected);
              const isToday = isSameDay(date, today);
              const dayDisabled = isDisabledDay(date);
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  disabled: dayDisabled,
                  onClick: () => setDate(date),
                  className: `mx-auto flex h-8 w-8 items-center justify-center text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${isSelected ? "font-medium text-white" : "hover:bg-(--dropdown-hover-bg)"}`,
                  style: {
                    ...getRadiusStyle(radius),
                    ...isSelected ? { background: "var(--ui-primary-bg)" } : {
                      color: portalStyle["--dropdown-text"],
                      ...isToday ? {
                        boxShadow: "inset 0 0 0 1px var(--ui-primary)"
                      } : {}
                    }
                  },
                  children: i + 1
                },
                i + 1
              );
            })
          ] })
        ]
      }
    ),
    document.body
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `flex w-full flex-col gap-1.5 ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "block text-sm font-medium text-(--text)", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative w-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref: triggerRef,
        type: "button",
        disabled,
        onClick: () => setIsOpen((prev) => !prev),
        className: `flex w-full items-center justify-between gap-3 text-left transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:border-(--ui-primary) disabled:cursor-not-allowed disabled:opacity-60 ${currentSize.trigger}`,
        style: {
          ...getRadiusStyle(radius),
          backgroundColor: "var(--bg-soft)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0,
          color: selected ? "var(--text)" : "var(--text-muted)"
        },
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex min-w-0 items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_lucide_react.Calendar,
              {
                size: currentSize.icon,
                className: "shrink-0 text-(--text-muted)"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: selected ? formatValue(selected) : placeholder })
          ] }),
          clearable && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              role: "button",
              tabIndex: 0,
              "aria-label": "Clear date",
              onClick: (e) => {
                e.stopPropagation();
                setDate(null);
              },
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  setDate(null);
                }
              },
              className: "shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { size: currentSize.icon })
            }
          )
        ]
      }
    ) }),
    popover
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatePicker
});
//# sourceMappingURL=date-picker.cjs.map