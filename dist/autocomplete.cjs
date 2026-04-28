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

// src/components/ui/autocomplete.tsx
var autocomplete_exports = {};
__export(autocomplete_exports, {
  Autocomplete: () => Autocomplete
});
module.exports = __toCommonJS(autocomplete_exports);
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
    foreground: isDarkBackground ? "#F5F6F8" : "#111827",
    muted: isDarkBackground ? "rgba(245, 246, 248, 0.78)" : "#4B5563"
  };
};
var resolveMenuPortalTokens = (computedStyle) => {
  const resolvedBg = computedStyle.getPropertyValue("--bg").trim() || computedStyle.backgroundColor || "#fff";
  const resolvedBorder = computedStyle.getPropertyValue("--border").trim() || "rgba(0, 0, 0, 0.08)";
  const resolvedHover = computedStyle.getPropertyValue("--hover").trim() || "rgba(0, 0, 0, 0.06)";
  const resolvedRadius = computedStyle.borderRadius || "12px";
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
    "--dropdown-text": resolvedText || computedStyle.color || "#111827",
    "--dropdown-text-muted": resolvedTextMuted || "#6B7280"
  };
};
var defaultMenuPortalStyle = () => ({
  backgroundColor: "#fff",
  borderColor: "rgba(0, 0, 0, 0.08)",
  borderRadius: "12px",
  "--dropdown-hover-bg": "rgba(0, 0, 0, 0.06)",
  "--dropdown-hover-fg": "#111827",
  "--dropdown-hover-muted": "#4B5563",
  "--dropdown-text": "#111827",
  "--dropdown-text-muted": "#6B7280"
});

// src/components/ui/autocomplete.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Autocomplete = ({
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
  className = ""
}) => {
  const containerRef = (0, import_react.useRef)(null);
  const fieldRef = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const menuRef = (0, import_react.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [hoveredValue, setHoveredValue] = (0, import_react.useState)(null);
  const [internalValue, setInternalValue] = (0, import_react.useState)(defaultValue ?? "");
  const [query, setQuery] = (0, import_react.useState)("");
  const [menuPosition, setMenuPosition] = (0, import_react.useState)({
    top: 0,
    left: 0,
    width: 0
  });
  const [menuStyle, setMenuStyle] = (0, import_react.useState)(defaultMenuPortalStyle);
  const sizeStyles = {
    sm: {
      container: "px-2.5 py-1 min-h-9",
      text: "text-xs",
      icon: 14
    },
    md: {
      container: "px-3 py-1.5 min-h-10",
      text: "text-sm",
      icon: 15
    },
    lg: {
      container: "px-3 py-2 min-h-11",
      text: "text-base",
      icon: 16
    }
  };
  const currentSize = sizeStyles[size];
  const selectedValue = value ?? internalValue;
  const selectedOption = (0, import_react.useMemo)(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  const filteredOptions = (0, import_react.useMemo)(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => {
      const labelText = option.label.toLowerCase();
      const valueText = option.value.toLowerCase();
      const descriptionText = typeof option.description === "string" ? option.description.toLowerCase() : "";
      return labelText.includes(needle) || valueText.includes(needle) || descriptionText.includes(needle);
    });
  }, [options, query]);
  (0, import_react.useEffect)(() => {
    const handleOutsideClick = (event) => {
      const target = event.target;
      if (!containerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const handleSelect = (nextValue) => {
    if (value === void 0) setInternalValue(nextValue);
    onChange?.(nextValue);
    setHoveredValue(null);
    setIsOpen(false);
    setQuery("");
  };
  (0, import_react.useEffect)(() => {
    if (isOpen) return;
    setHoveredValue(null);
  }, [isOpen]);
  (0, import_react.useEffect)(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const fieldEl = fieldRef.current;
      if (!fieldEl) return;
      const rect = fieldEl.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(fieldEl);
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width
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
  const displayValue = isOpen ? query : selectedOption?.label ?? "";
  const autocompleteMenu = !disabled && (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: menuRef,
        className: `fixed z-9999 max-h-64 origin-top overflow-y-auto rounded-xl p-1.5 shadow-2xl backdrop-blur-sm will-change-transform will-change-opacity transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1.5 scale-[0.98] opacity-0"}`,
        style: {
          top: menuPosition.top,
          left: menuPosition.left,
          width: menuPosition.width,
          backgroundColor: menuStyle.backgroundColor,
          border: `0.5px solid ${menuStyle.borderColor}`,
          borderRadius: menuStyle.borderRadius
        },
        "aria-hidden": !isOpen,
        children: filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: "px-2.5 py-2 text-sm",
            style: { color: menuStyle["--dropdown-text-muted"] },
            children: emptyMessage
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "m-0 list-none p-0", children: filteredOptions.map((option) => {
          const isSelected = option.value === selectedValue;
          const isHovered = hoveredValue === option.value;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "m-0 p-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "button",
            {
              type: "button",
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "mb-1.5 block text-sm font-medium text-(--text)", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: containerRef, className: "relative w-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: fieldRef,
        className: `flex w-full items-center gap-2 overflow-hidden transition-colors focus-within:border-(--ui-primary) ${currentSize.container}`,
        style: {
          ...getRadiusStyle(radius),
          backgroundColor: "var(--bg-soft)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0,
          boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.09), inset 0 -1px 1px rgba(0, 0, 0, 0.04)"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { size: currentSize.icon, className: "shrink-0 text-(--text-muted)" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              ref: inputRef,
              type: "text",
              disabled,
              value: displayValue,
              onFocus: () => setIsOpen(true),
              onChange: (event) => {
                setIsOpen(true);
                setQuery(event.target.value);
                onInputChange?.(event.target.value);
              },
              placeholder,
              className: `w-full bg-transparent text-(--text) outline-none placeholder:text-(--text-muted) disabled:opacity-60 ${currentSize.text}`,
              style: { fontFamily: "var(--ui-font)" }
            }
          )
        ]
      }
    ) }),
    autocompleteMenu
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Autocomplete
});
//# sourceMappingURL=autocomplete.cjs.map