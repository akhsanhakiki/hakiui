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

// src/components/ui/dropdown.tsx
var dropdown_exports = {};
__export(dropdown_exports, {
  Dropdown: () => Dropdown
});
module.exports = __toCommonJS(dropdown_exports);
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
var PORTAL_THEME_VARS = [
  "--ui-primary",
  "--ui-primary-rgb",
  "--ui-gradient",
  "--ui-primary-bg",
  "--ui-font",
  "--ui-radius",
  "--bg",
  "--bg-soft",
  "--surface",
  "--border",
  "--input",
  "--text",
  "--text-muted",
  "--hover"
];
var resolveThemeVarStyle = (computedStyle) => {
  const style = {};
  for (const name of PORTAL_THEME_VARS) {
    const value = computedStyle.getPropertyValue(name).trim();
    if (value) style[name] = value;
  }
  return style;
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

// src/components/ui/dropdown.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Dropdown = ({
  options,
  size = "lg",
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  label,
  radius = "md",
  disabled = false,
  className = ""
}) => {
  const containerRef = (0, import_react.useRef)(null);
  const triggerRef = (0, import_react.useRef)(null);
  const menuRef = (0, import_react.useRef)(null);
  const isClosingRef = (0, import_react.useRef)(false);
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [isEntered, setIsEntered] = (0, import_react.useState)(false);
  const [hoveredValue, setHoveredValue] = (0, import_react.useState)(null);
  const [internalValue, setInternalValue] = (0, import_react.useState)(defaultValue ?? "");
  const [menuPosition, setMenuPosition] = (0, import_react.useState)(null);
  const [menuStyle, setMenuStyle] = (0, import_react.useState)(
    defaultMenuPortalStyle
  );
  const [themeVars, setThemeVars] = (0, import_react.useState)({});
  const selectedValue = value ?? internalValue;
  const sizeStyles = {
    sm: {
      trigger: "px-2.5 py-1 min-h-9",
      text: "text-xs",
      icon: 14
    },
    md: {
      trigger: "px-3 py-1.5 min-h-10",
      text: "text-sm",
      icon: 15
    },
    lg: {
      trigger: "px-3 py-2 min-h-11",
      text: "text-base",
      icon: 16
    }
  };
  const currentSize = sizeStyles[size];
  const selectedOption = (0, import_react.useMemo)(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  const measureMenuLayout = () => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return null;
    const rect = triggerEl.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(triggerEl);
    const nextPosition = {
      top: rect.bottom + 8,
      left: rect.left,
      width: rect.width
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
  (0, import_react.useEffect)(() => {
    if (!isOpen) return;
    const handleOutsideClick = (event) => {
      const target = event.target;
      if (!containerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        isClosingRef.current = true;
        setIsEntered(false);
        setHoveredValue(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);
  const handleSelect = (nextValue) => {
    if (value === void 0) setInternalValue(nextValue);
    onChange?.(nextValue);
    requestClose();
  };
  (0, import_react.useLayoutEffect)(() => {
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
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
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
    const handleTransitionEnd = (event) => {
      if (event.target !== menuEl) return;
      if (event.propertyName !== "opacity" && event.propertyName !== "transform") {
        return;
      }
      finishClose();
    };
    menuEl.addEventListener("transitionend", handleTransitionEnd);
    const timeoutId = window.setTimeout(finishClose, 300);
    return () => {
      menuEl.removeEventListener("transitionend", handleTransitionEnd);
      window.clearTimeout(timeoutId);
    };
  }, [isOpen, isEntered]);
  const dropdownMenu = !disabled && isOpen && menuPosition && (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: menuRef,
        className: `fixed z-9999 max-h-64 origin-top overflow-y-auto rounded-xl p-1.5 shadow-2xl backdrop-blur-sm will-change-transform will-change-opacity transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isEntered ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1.5 opacity-0"}`,
        style: {
          ...themeVars,
          top: menuPosition.top,
          left: menuPosition.left,
          width: menuPosition.width,
          backgroundColor: menuStyle.backgroundColor,
          border: `0.5px solid ${menuStyle.borderColor}`,
          outline: `0.5px solid ${menuStyle.borderColor}`,
          outlineOffset: 0,
          borderRadius: menuStyle.borderRadius
        },
        "aria-hidden": !isEntered,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "m-0 list-none p-0", children: options.map((option) => {
          const isSelected = option.value === selectedValue;
          const isHovered = hoveredValue === option.value && !option.disabled;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "m-0 p-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
              disabled: option.disabled,
              onClick: () => handleSelect(option.value),
              onMouseEnter: () => setHoveredValue(option.value),
              onMouseLeave: () => setHoveredValue(
                (current) => current === option.value ? null : current
              ),
              className: "flex w-full items-start justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40",
              style: {
                transform: isHovered ? "translateY(-0.5px) scale(1.003)" : "translateY(0) scale(1)",
                boxShadow: isHovered ? "inset 0 0 0 0.5px color-mix(in oklab, var(--border) 50%, transparent)" : "none",
                backgroundColor: isHovered ? `color-mix(in oklab, ${menuStyle.backgroundColor} 88%, ${menuStyle["--dropdown-hover-bg"]} 35%)` : "transparent",
                color: menuStyle["--dropdown-text"]
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "div",
                    {
                      className: `truncate text-sm transition-colors duration-200 ${isSelected ? "font-medium" : ""}`,
                      style: {
                        color: menuStyle["--dropdown-text"]
                      },
                      children: option.label
                    }
                  ),
                  option.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "div",
                    {
                      className: "mt-0.5 truncate text-xs transition-colors duration-200",
                      style: {
                        color: menuStyle["--dropdown-text-muted"]
                      },
                      children: option.description
                    }
                  )
                ] }),
                isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_lucide_react.Check,
                  {
                    size: 16,
                    className: "mt-0.5 shrink-0 text-(--ui-primary)"
                  }
                )
              ]
            }
          ) }, option.value);
        }) })
      }
    ),
    document.body
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `flex flex-col gap-1.5 w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "block text-sm font-medium text-(--text)", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: containerRef, className: "relative w-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref: triggerRef,
        type: "button",
        disabled,
        onClick: () => {
          if (isOpen && isEntered) requestClose();
          else if (!isOpen) openMenu();
        },
        className: `flex w-full items-center justify-between gap-3 text-left text-(--text) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:border-(--ui-primary) disabled:cursor-not-allowed disabled:opacity-60 ${currentSize.trigger} ${currentSize.text}`,
        style: {
          ...getRadiusStyle(radius),
          backgroundColor: "var(--bg-soft)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              className: `truncate ${selectedOption ? "text-(--text)" : "text-(--text-muted)"} ${currentSize.text}`,
              children: selectedOption?.label ?? placeholder
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_lucide_react.ChevronDown,
            {
              size: currentSize.icon,
              className: `shrink-0 text-(--text-muted) transition-transform duration-200 ease-out motion-reduce:transition-none ${isEntered ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ) }),
    dropdownMenu
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Dropdown
});
//# sourceMappingURL=dropdown.cjs.map