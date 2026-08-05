import {
  defaultMenuPortalStyle,
  resolveMenuPortalTokens,
  resolveThemeVarStyle
} from "./chunk-SA6EOMZP.js";
import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/autocomplete.tsx
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { Check, Search } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Autocomplete = ({
  options,
  size = "md",
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
  const containerRef = useRef(null);
  const fieldRef = useRef(null);
  const inputRef = useRef(null);
  const menuRef = useRef(null);
  const isClosingRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [query, setQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState(null);
  const [menuStyle, setMenuStyle] = useState(
    defaultMenuPortalStyle
  );
  const [themeVars, setThemeVars] = useState({});
  const sizeStyles = {
    sm: {
      container: "px-2 py-1 min-h-8",
      text: "text-xs",
      icon: 14,
      option: "px-2 py-1",
      optionLabel: "text-xs",
      optionDescription: "text-[11px]",
      check: 14,
      menu: "p-1"
    },
    md: {
      container: "px-3 py-2 min-h-9",
      text: "text-sm",
      icon: 15,
      option: "px-2.5 py-1.5",
      optionLabel: "text-sm",
      optionDescription: "text-xs",
      check: 15,
      menu: "p-1"
    },
    lg: {
      container: "px-3.5 py-2.5 min-h-10",
      text: "text-base",
      icon: 16,
      option: "px-3 py-2",
      optionLabel: "text-base",
      optionDescription: "text-sm",
      check: 16,
      menu: "p-1.5"
    }
  };
  const currentSize = sizeStyles[size];
  const selectedValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  const filteredOptions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => {
      const labelText = option.label.toLowerCase();
      const valueText = option.value.toLowerCase();
      const descriptionText = typeof option.description === "string" ? option.description.toLowerCase() : "";
      return labelText.includes(needle) || valueText.includes(needle) || descriptionText.includes(needle);
    });
  }, [options, query]);
  const measureMenuLayout = () => {
    const fieldEl = fieldRef.current;
    if (!fieldEl) return null;
    const rect = fieldEl.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(fieldEl);
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
    if (isOpen) return;
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
    setQuery("");
    requestClose();
  };
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
  const displayValue = isOpen ? query : selectedOption?.label ?? "";
  const autocompleteMenu = !disabled && isOpen && menuPosition && createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: menuRef,
        className: `fixed z-9999 max-h-64 origin-top overflow-y-auto rounded-xl shadow-2xl backdrop-blur-sm will-change-transform will-change-opacity transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${currentSize.menu} ${isEntered ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1.5 opacity-0"}`,
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
        children: filteredOptions.length === 0 ? /* @__PURE__ */ jsx(
          "div",
          {
            className: `${currentSize.option} ${currentSize.optionLabel}`,
            style: { color: menuStyle["--dropdown-text-muted"] },
            children: emptyMessage
          }
        ) : /* @__PURE__ */ jsx("ul", { className: "m-0 list-none p-0", children: filteredOptions.map((option) => {
          const isSelected = option.value === selectedValue;
          const isHovered = hoveredValue === option.value;
          return /* @__PURE__ */ jsx("li", { className: "m-0 p-0", children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleSelect(option.value),
              onMouseEnter: () => setHoveredValue(option.value),
              onMouseLeave: () => setHoveredValue(
                (current) => current === option.value ? null : current
              ),
              className: `flex w-full items-start justify-between gap-2 rounded-lg text-left transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40 ${currentSize.option}`,
              style: {
                transform: isHovered ? "translateY(-0.5px) scale(1.003)" : "translateY(0) scale(1)",
                boxShadow: isHovered ? "inset 0 0 0 0.5px color-mix(in oklab, var(--border) 50%, transparent)" : "none",
                backgroundColor: isHovered ? `color-mix(in oklab, ${menuStyle.backgroundColor} 88%, ${menuStyle["--dropdown-hover-bg"]} 35%)` : "transparent",
                color: menuStyle["--dropdown-text"]
              },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `truncate transition-colors duration-200 ${currentSize.optionLabel} ${isSelected ? "font-medium" : ""}`,
                      style: {
                        color: menuStyle["--dropdown-text"]
                      },
                      children: option.label
                    }
                  ),
                  option.description && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `mt-0.5 truncate transition-colors duration-200 ${currentSize.optionDescription}`,
                      style: {
                        color: menuStyle["--dropdown-text-muted"]
                      },
                      children: option.description
                    }
                  )
                ] }),
                isSelected && /* @__PURE__ */ jsx(
                  Check,
                  {
                    size: currentSize.check,
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
  return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-1.5 w-full ${className}`, children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-(--text)", children: label }),
    /* @__PURE__ */ jsx("div", { ref: containerRef, className: "relative w-full", children: /* @__PURE__ */ jsxs(
      "div",
      {
        ref: fieldRef,
        className: `flex w-full items-center gap-2 overflow-hidden transition-colors focus-within:border-(--ui-primary) ${currentSize.container}`,
        style: {
          ...getRadiusStyle(radius),
          backgroundColor: "var(--bg-soft)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0
        },
        children: [
          /* @__PURE__ */ jsx(
            Search,
            {
              size: currentSize.icon,
              className: "shrink-0 text-(--text-muted)"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: inputRef,
              type: "text",
              disabled,
              value: displayValue,
              onFocus: openMenu,
              onChange: (event) => {
                openMenu();
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

export {
  Autocomplete
};
//# sourceMappingURL=chunk-JCHGY67A.js.map