"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Accordion: () => Accordion,
  AccordionItem: () => AccordionItem,
  Alert: () => Alert,
  Autocomplete: () => Autocomplete,
  Avatar: () => Avatar,
  AvatarGroup: () => AvatarGroup,
  Badge: () => Badge,
  BarChart: () => BarChart,
  Breadcrumbs: () => Breadcrumbs,
  Button: () => Button,
  Calendar: () => Calendar,
  Checkbox: () => Checkbox,
  DARK_CHART_COLORS: () => DARK_CHART_COLORS,
  DatePicker: () => DatePicker,
  Dropdown: () => Dropdown,
  HakiProvider: () => HakiProvider,
  Input: () => Input,
  LIGHT_CHART_COLORS: () => LIGHT_CHART_COLORS,
  LineChart: () => LineChart,
  Modal: () => Modal,
  Pagination: () => Pagination,
  Progress: () => Progress,
  Radio: () => Radio,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  Spinner: () => Spinner,
  Switch: () => Switch,
  Table: () => Table,
  TableBody: () => TableBody,
  TableCell: () => TableCell,
  TableColumn: () => TableColumn,
  TableHeader: () => TableHeader,
  TableRow: () => TableRow,
  Tabs: () => Tabs,
  ToastProvider: () => ToastProvider,
  Tooltip: () => Tooltip,
  chartColor: () => chartColor,
  darkNeutrals: () => darkNeutrals,
  defaultTheme: () => defaultTheme,
  formatChartValue: () => formatChartValue,
  getRadiusStyle: () => getRadiusStyle,
  hexToRgb: () => hexToRgb,
  lightNeutrals: () => lightNeutrals,
  useTheme: () => useTheme,
  useToast: () => useToast
});
module.exports = __toCommonJS(src_exports);

// src/lib/hex-to-rgb.ts
var hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : "0 111 238";
};

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/theme-provider.tsx
var import_react2 = require("react");

// src/lib/chart.ts
var import_react = require("react");
var LIGHT_CHART_COLORS = [
  "#F05423",
  "#4A3AA7",
  "#E34948",
  "#2A78D6",
  "#008300",
  "#E87BA4",
  "#EDA100",
  "#1BAF7A"
];
var DARK_CHART_COLORS = [
  "#F05423",
  "#9085E9",
  "#E66767",
  "#3987E5",
  "#008300",
  "#D55181",
  "#C98500",
  "#199E70"
];
var chartColor = (index) => {
  const slot = index % LIGHT_CHART_COLORS.length;
  return `var(--chart-${slot + 1}, ${LIGHT_CHART_COLORS[slot]})`;
};
var seriesColor = (series, index) => series.color ?? chartColor(index);
var niceNum = (value, round) => {
  const exp = Math.floor(Math.log10(value));
  const frac = value / 10 ** exp;
  let niceFrac;
  if (round) {
    niceFrac = frac < 1.5 ? 1 : frac < 3 ? 2 : frac < 7 ? 5 : 10;
  } else {
    niceFrac = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10;
  }
  return niceFrac * 10 ** exp;
};
var niceScale = (dataMin, dataMax, tickCount = 4) => {
  let lo = Math.min(dataMin, 0);
  let hi = Math.max(dataMax, 0);
  if (lo === hi) hi = lo + 1;
  const range = niceNum(hi - lo, false);
  const step = niceNum(range / Math.max(1, tickCount), true);
  const min = Math.floor(lo / step) * step;
  const max = Math.ceil(hi / step) * step;
  const ticks = [];
  for (let v = min; v <= max + step / 2; v += step) {
    ticks.push(Math.abs(v) < step / 1e6 ? 0 : Number(v.toPrecision(12)));
  }
  return { min, max, ticks };
};
var formatChartValue = (value) => {
  if (!Number.isFinite(value)) return "\u2013";
  const abs = Math.abs(value);
  if (abs >= 1e9) return `${trimZeros(value / 1e9)}B`;
  if (abs >= 1e6) return `${trimZeros(value / 1e6)}M`;
  if (abs >= 1e4) return `${trimZeros(value / 1e3)}K`;
  return value.toLocaleString();
};
var trimZeros = (value) => value.toFixed(1).replace(/\.0$/, "");
var useContainerWidth = () => {
  const ref = (0, import_react.useRef)(null);
  const [width, setWidth] = (0, import_react.useState)(0);
  (0, import_react.useEffect)(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => setWidth(el.getBoundingClientRect().width);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
};

// src/components/theme-provider.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var lightNeutrals = {
  bg: "#FAF9F5",
  bgSoft: "#F2EFE8",
  surface: "#FFFFFF",
  border: "#E5E1D5",
  input: "#F2EFE8",
  text: "#1C1B17",
  textMuted: "#6E6A5E",
  hover: "#EBE7DC"
};
var darkNeutrals = {
  bg: "#141311",
  bgSoft: "#1C1A17",
  surface: "#22201B",
  border: "#37342C",
  input: "#282521",
  text: "#F5F3EC",
  textMuted: "#A8A294",
  hover: "#322E27"
};
var defaultTheme = {
  primaryColor: "#F05423",
  gradientColor: "#FF8C42",
  useGradient: false,
  fontFamily: "'IBM Plex Mono', monospace",
  borderRadius: 4,
  mode: "light"
};
var ThemeContext = (0, import_react2.createContext)(void 0);
var useTheme = () => {
  const context = (0, import_react2.useContext)(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a HakiProvider");
  return context;
};
var HakiProvider = ({
  children,
  initialTheme = defaultTheme,
  className = ""
}) => {
  const [theme, setTheme] = (0, import_react2.useState)(initialTheme);
  const mode = theme.mode ?? "light";
  const neutrals = mode === "dark" ? darkNeutrals : lightNeutrals;
  const chartColors = mode === "dark" ? DARK_CHART_COLORS : LIGHT_CHART_COLORS;
  const chartVars = Object.fromEntries(
    chartColors.map((color, i) => [`--chart-${i + 1}`, color])
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: { theme, setTheme }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: `${mode} ${className}`,
      style: {
        "--ui-primary": theme.primaryColor,
        "--ui-primary-rgb": hexToRgb(theme.primaryColor),
        "--ui-gradient": `linear-gradient(to right, ${theme.primaryColor}, ${theme.gradientColor})`,
        "--ui-primary-bg": theme.useGradient ? "var(--ui-gradient)" : "var(--ui-primary)",
        "--ui-font": theme.fontFamily,
        "--ui-radius": `${theme.borderRadius}px`,
        "--bg": neutrals.bg,
        "--bg-soft": neutrals.bgSoft,
        "--surface": neutrals.surface,
        "--border": neutrals.border,
        "--input": neutrals.input,
        "--text": neutrals.text,
        "--text-muted": neutrals.textMuted,
        "--hover": neutrals.hover,
        ...chartVars,
        color: "var(--text)"
      },
      children
    }
  ) });
};

// src/components/ui/button.tsx
var import_react3 = __toESM(require("react"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
var PRESS_SPRING = "cubic-bezier(0.34, 1.55, 0.48, 1)";
var Button = import_react3.default.forwardRef(
  ({
    className = "",
    variant = "primary",
    size = "md",
    radius = "md",
    children,
    disabled,
    onMouseEnter,
    onMouseLeave,
    onPointerDown,
    onPointerUp,
    onPointerLeave,
    onPointerCancel,
    style: styleProp,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = (0, import_react3.useState)(false);
    const [isPressed, setIsPressed] = (0, import_react3.useState)(false);
    const [reduceMotion, setReduceMotion] = (0, import_react3.useState)(false);
    (0, import_react3.useEffect)(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const sync = () => setReduceMotion(mq.matches);
      sync();
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }, []);
    const showHover = isHovered && !disabled;
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    };
    let variantStyle = {
      transition: "box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease"
    };
    if (variant === "primary") {
      variantStyle = {
        ...variantStyle,
        background: "var(--ui-primary-bg)",
        color: "#ffffff",
        border: "none"
      };
    } else if (variant === "secondary") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "rgb(var(--ui-primary-rgb) / 0.12)",
        color: "var(--ui-primary)",
        border: "none"
      };
    } else if (variant === "outline") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "1px solid var(--border)",
        outline: "1px solid var(--border)",
        outlineOffset: 0
      };
    } else if (variant === "ghost") {
      variantStyle = {
        ...variantStyle,
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "none"
      };
    }
    if (showHover) {
      if (variant === "primary") {
        variantStyle = {
          ...variantStyle,
          boxShadow: "inset 0 0 0 9999px rgba(0, 0, 0, 0.08)"
        };
      } else if (variant === "secondary") {
        variantStyle = {
          ...variantStyle,
          backgroundColor: "rgb(var(--ui-primary-rgb) / 0.2)"
        };
      } else if (variant === "outline" || variant === "ghost") {
        variantStyle = {
          ...variantStyle,
          backgroundColor: "var(--hover)"
        };
      }
    }
    const transformTransition = reduceMotion ? "transform 70ms linear" : `transform 420ms ${PRESS_SPRING}`;
    const pressStyle = disabled || reduceMotion ? {} : {
      transform: isPressed ? "scale(0.9)" : "scale(1)",
      willChange: "transform",
      transition: `${variantStyle.transition}, ${transformTransition}`
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        ref,
        disabled,
        className: `font-medium inline-flex touch-manipulation items-center justify-center gap-2 disabled:opacity-50 cursor-pointer ${sizeClasses[size]} ${className}`,
        style: {
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          ...variantStyle,
          ...styleProp,
          ...pressStyle
        },
        onMouseEnter: (e) => {
          onMouseEnter?.(e);
          if (!disabled) setIsHovered(true);
        },
        onMouseLeave: (e) => {
          onMouseLeave?.(e);
          setIsHovered(false);
        },
        onPointerDown: (e) => {
          onPointerDown?.(e);
          if (!disabled && e.button === 0) setIsPressed(true);
        },
        onPointerUp: (e) => {
          onPointerUp?.(e);
          setIsPressed(false);
        },
        onPointerLeave: (e) => {
          onPointerLeave?.(e);
          setIsPressed(false);
        },
        onPointerCancel: (e) => {
          onPointerCancel?.(e);
          setIsPressed(false);
        },
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/input.tsx
var import_react4 = __toESM(require("react"), 1);
var import_lucide_react = require("lucide-react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Input = import_react4.default.forwardRef(
  ({
    className = "",
    size = "lg",
    label,
    labelPlacement = "top",
    description,
    startContent,
    endContent,
    radius = "md",
    type,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = (0, import_react4.useState)(false);
    const isPassword = type === "password";
    const inputType = isPassword ? showPassword ? "text" : "password" : type;
    const sizeStyles = {
      sm: {
        container: "px-2.5 py-1",
        input: "text-xs",
        icon: 14,
        labelLeftOffset: "mt-1.5"
      },
      md: {
        container: "px-3 py-1.5",
        input: "text-sm",
        icon: 15,
        labelLeftOffset: "mt-2"
      },
      lg: {
        container: "px-3 py-2",
        input: "text-base",
        icon: 16,
        labelLeftOffset: "mt-2.5"
      }
    };
    const currentSize = sizeStyles[size];
    const inputContainer = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col gap-1.5 w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: `flex w-full items-center overflow-hidden text-(--text) transition-[box-shadow,ring-color] ring-2 ring-transparent focus-within:ring-(--ui-primary)/35 focus-within:border-(--ui-primary) ${currentSize.container}`,
          style: {
            ...getRadiusStyle(radius),
            backgroundColor: "var(--bg-soft)",
            color: "var(--text)",
            border: "0.5px solid var(--border)",
            outline: "0.5px solid var(--border)",
            outlineOffset: 0
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center w-full gap-2", children: [
            startContent && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex shrink-0 items-center justify-center text-(--text-muted)", children: startContent }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                ref,
                type: inputType,
                className: `w-full bg-transparent outline-none placeholder:text-(--text-muted) ${currentSize.input} ${className}`,
                style: {
                  fontFamily: "var(--ui-font)",
                  color: "var(--text)",
                  caretColor: "var(--ui-primary)"
                },
                ...props
              }
            ),
            isPassword ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "flex shrink-0 items-center justify-center text-(--text-muted) transition-colors hover:text-(--text)",
                children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.EyeOff, { size: currentSize.icon }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Eye, { size: currentSize.icon })
              }
            ) : endContent ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex shrink-0 items-center justify-center text-(--text-muted)", children: endContent }) : null
          ] })
        }
      ),
      description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "pl-1 text-xs text-(--text-muted)", children: description })
    ] });
    if (!label) return inputContainer;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: `flex ${labelPlacement === "left" ? "flex-row items-start gap-4" : "flex-col gap-1.5"} w-full`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "label",
            {
              className: `whitespace-nowrap text-sm font-medium text-(--text) ${labelPlacement === "left" ? currentSize.labelLeftOffset : ""}`,
              children: label
            }
          ),
          inputContainer
        ]
      }
    );
  }
);
Input.displayName = "Input";

// src/components/ui/pagination.tsx
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var Pagination = ({
  total,
  page,
  onChange
}) => {
  const getPages = () => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, "...", total];
    if (page >= total - 2)
      return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", page - 1, page, page + 1, "...", total];
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 select-none", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => onChange(Math.max(1, page - 1)),
        disabled: page === 1,
        className: "flex items-center gap-1 border-0 bg-transparent px-3 py-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text) disabled:opacity-50 cursor-pointer",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react2.ChevronLeft, { size: 16 }),
          " Previous"
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex items-center gap-1", children: getPages().map((p, i) => {
      if (p === "...")
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "span",
          {
            className: "flex w-8 items-center justify-center text-(--text-muted)",
            children: "..."
          },
          `ellipsis-${i}`
        );
      const isActive = p === page;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          onClick: () => onChange(p),
          className: `flex h-8 w-8 items-center justify-center rounded-full text-sm cursor-pointer transform-gpu transition-all duration-250 ease-out will-change-transform motion-reduce:transform-none motion-reduce:transition-none ${isActive ? "scale-100 text-white shadow-sm" : "bg-transparent text-(--text) scale-[0.98] hover:scale-100 hover:bg-(--hover)"}`,
          style: isActive ? { background: "var(--ui-primary-bg)" } : {},
          children: p
        },
        `page-${p}`
      );
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => onChange(Math.min(total, page + 1)),
        disabled: page === total,
        className: "flex items-center gap-1 border-0 bg-transparent px-3 py-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text) disabled:opacity-50 cursor-pointer",
        children: [
          "Next ",
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react2.ChevronRight, { size: 16 })
        ]
      }
    )
  ] });
};

// src/components/ui/switch.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var Switch = ({
  checked,
  onChange,
  size = "md"
}) => {
  const sizes = {
    sm: { w: "w-8", h: "h-4", circle: "w-3 h-3", translate: "translate-x-4" },
    md: { w: "w-10", h: "h-5", circle: "w-4 h-4", translate: "translate-x-5" },
    lg: { w: "w-12", h: "h-6", circle: "w-5 h-5", translate: "translate-x-6" }
  };
  const current = sizes[size];
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { className: "flex items-center cursor-pointer", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "div",
      {
        className: `relative ${current.w} ${current.h} rounded-full transition-colors`,
        style: {
          backgroundColor: checked ? "var(--ui-primary-bg)" : "var(--bg-soft)"
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "div",
          {
            className: `absolute top-0.5 left-0.5 bg-white rounded-full transition-transform ${current.circle} ${checked ? current.translate : "translate-x-0"}`
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "input",
      {
        type: "checkbox",
        className: "hidden",
        checked,
        onChange: (e) => onChange(e.target.checked)
      }
    )
  ] });
};

// src/components/ui/tooltip.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var Tooltip = ({
  content,
  position = "top",
  children
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative group flex items-center justify-center", children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "div",
      {
        className: `pointer-events-none absolute z-50 whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs opacity-0 transition-opacity group-hover:opacity-100 ${positionClasses[position]}`,
        style: {
          backgroundColor: "color-mix(in srgb, var(--bg-soft) 80%, white)",
          color: "var(--text)",
          fontFamily: "var(--ui-font)"
        },
        children: content
      }
    )
  ] });
};

// src/components/ui/table.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var Table = ({
  children,
  radius = "lg",
  variant = "default"
}) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "div",
  {
    className: "w-full overflow-hidden",
    style: {
      ...getRadiusStyle(variant === "rounded" ? "full" : radius),
      backgroundColor: "color-mix(in srgb, var(--bg-soft) 30%, transparent)",
      border: "0.5px solid var(--border)",
      outline: "0.5px solid var(--border)",
      outlineOffset: 0
    },
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("table", { className: "w-full text-left border-collapse", children })
  }
);
var TableHeader = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "thead",
  {
    className: "text-(--text-muted) text-xs",
    style: {
      backgroundColor: "color-mix(in srgb, var(--bg-soft) 60%, transparent)"
    },
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tr", { className: "border-b", style: { borderColor: "var(--border)" }, children })
  }
);
var TableColumn = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { className: "px-4 py-2 font-medium font-sans", children });
var TableBody = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tbody", { className: "text-sm text-(--text)", children });
var TableRow = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "tr",
  {
    className: "border-b transition-colors hover:bg-(--hover) last:border-0",
    style: { borderColor: "var(--border)" },
    children
  }
);
var TableCell = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("td", { className: "px-4 py-3", children });

// src/components/ui/tabs.tsx
var import_react5 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Tabs = ({
  items
}) => {
  const [active, setActive] = (0, import_react5.useState)(items[0]?.id ?? "");
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "div",
      {
        className: "flex w-full border-b",
        style: { borderColor: "color-mix(in srgb, var(--border) 50%, transparent)" },
        children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setActive(item.id),
            className: `-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${active === item.id ? "border-(--ui-primary) text-(--text)" : "border-transparent text-(--text-muted) hover:text-(--text)"}`,
            children: item.label
          },
          item.id
        ))
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "px-2 py-2 text-(--text)", children: items.find((i) => i.id === active)?.content })
  ] });
};

// src/components/ui/accordion.tsx
var import_react6 = require("react");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Accordion = ({
  children,
  className = ""
}) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: `flex flex-col gap-2 w-full ${className}`, children });
var AccordionItem = ({
  title,
  children
}) => {
  const [isOpen, setIsOpen] = (0, import_react6.useState)(false);
  const contentRef = (0, import_react6.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "div",
    {
      className: "overflow-hidden",
      style: { borderBottom: "0.5px solid var(--border)" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => setIsOpen(!isOpen),
            className: "flex w-full items-center justify-between py-4 text-left transition-colors",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "font-medium text-(--text)", children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                import_lucide_react3.ChevronDown,
                {
                  size: 18,
                  className: `text-(--text-muted) transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "div",
          {
            className: "overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out motion-reduce:transition-none",
            style: {
              maxHeight: isOpen ? `${contentRef.current?.scrollHeight ?? 0}px` : "0px",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-4px)"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "div",
              {
                ref: contentRef,
                className: "pb-4 text-sm text-(--text-muted) opacity-70",
                children
              }
            )
          }
        )
      ]
    }
  );
};

// src/components/ui/checkbox.tsx
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var Checkbox = ({
  checked,
  onChange,
  children,
  radius = "sm"
}) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer group w-fit", children: [
  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "div",
    {
      className: `flex h-5 w-5 items-center justify-center transition-colors ${!checked ? "border-2 border-(--border) group-hover:border-(--ui-primary)" : ""}`,
      style: {
        ...getRadiusStyle(radius),
        ...checked ? { background: "var(--ui-primary-bg)" } : {}
      },
      children: checked && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react4.Check, { size: 14, className: "text-white" })
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "input",
    {
      type: "checkbox",
      className: "hidden",
      checked,
      onChange: (e) => onChange(e.target.checked)
    }
  ),
  children && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "select-none text-sm text-(--text)", children })
] });

// src/components/ui/radio.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var Radio = ({
  checked,
  onChange,
  children
}) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer group w-fit", children: [
  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "div",
    {
      className: `flex h-5 w-5 items-center justify-center rounded-full transition-colors ${!checked ? "border-2 border-(--border) group-hover:border-(--ui-primary)" : ""}`,
      style: checked ? { background: "var(--ui-primary-bg)" } : {},
      children: checked && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "w-2 h-2 rounded-full bg-white" })
    }
  ),
  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "input",
    {
      type: "radio",
      className: "hidden",
      checked,
      onChange
    }
  ),
  children && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "select-none text-sm text-(--text)", children })
] });

// src/components/ui/calendar.tsx
var import_react7 = require("react");
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var Calendar = ({ radius = "md" }) => {
  const [currentDate, setCurrentDate] = (0, import_react7.useState)(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = (0, import_react7.useState)(/* @__PURE__ */ new Date());
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const prevMonth = () => setCurrentDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  );
  const nextMonth = () => setCurrentDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  );
  const monthNames = [
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
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
    "div",
    {
      className: "w-[280px] select-none p-4",
      style: {
        ...getRadiusStyle(radius),
        backgroundColor: "color-mix(in srgb, var(--bg-soft) 30%, transparent)",
        border: "0.5px solid var(--border)",
        outline: "0.5px solid var(--border)",
        outlineOffset: 0
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "button",
            {
              type: "button",
              onClick: prevMonth,
              className: "rounded-md p-1 text-(--text) transition-colors hover:bg-(--hover)",
              children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react5.ChevronLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "text-sm font-medium text-(--text)", children: [
            monthNames[currentDate.getMonth()],
            " ",
            currentDate.getFullYear()
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "button",
            {
              type: "button",
              onClick: nextMonth,
              className: "rounded-md p-1 text-(--text) transition-colors hover:bg-(--hover)",
              children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react5.ChevronRight, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "grid grid-cols-7 gap-1 text-center mb-2", children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-xs font-medium text-(--text-muted)", children: d }, d)) }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "grid grid-cols-7 gap-1 text-center", children: [
          [...Array(firstDayOfMonth)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", {}, `empty-${i}`)),
          [...Array(daysInMonth)].map((_, i) => {
            const date = i + 1;
            const isSelected = selectedDate?.getDate() === date && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();
            return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setSelectedDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    date
                  )
                ),
                className: `mx-auto flex h-8 w-8 items-center justify-center text-sm transition-colors ${isSelected ? "font-medium text-white" : "text-(--text) hover:bg-(--hover)"}`,
                style: {
                  ...getRadiusStyle(radius),
                  ...isSelected ? { background: "var(--ui-primary-bg)" } : {}
                },
                children: date
              },
              date
            );
          })
        ] })
      ]
    }
  );
};

// src/components/ui/modal.tsx
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime13 = require("react/jsx-runtime");
var Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  const panelShell = {
    ...getRadiusStyle("md"),
    fontFamily: "var(--ui-font)",
    backgroundColor: "var(--bg-soft)",
    color: "var(--text)",
    border: "0.5px solid var(--border)",
    outline: "0.5px solid var(--border)",
    outlineOffset: 0
  };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "div",
      {
        className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
        onClick: onClose,
        role: "presentation"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
      "div",
      {
        className: "relative flex w-full max-w-md min-h-0 flex-col overflow-hidden text-(--text) shadow-2xl animate-in fade-in zoom-in-95 duration-200",
        style: panelShell,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "modal-title",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
            "header",
            {
              className: "flex shrink-0 items-center gap-3 px-4 py-3",
              style: { borderBottom: "0.5px solid var(--border)" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h3", { id: "modal-title", className: "min-w-0 flex-1 truncate text-base font-semibold", children: title }),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "flex shrink-0 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text)",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react6.X, { size: 18, strokeWidth: 2 })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "min-h-0 flex-1 overflow-y-auto px-4 py-4", children })
        ]
      }
    )
  ] });
};

// src/components/ui/dropdown.tsx
var import_react8 = require("react");
var import_react_dom = require("react-dom");
var import_lucide_react7 = require("lucide-react");

// src/lib/resolve-menu-portal-tokens.ts
var hexToRgb2 = (value) => {
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
  const rgb = parseRgbColor(backgroundColor) ?? hexToRgb2(backgroundColor);
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
var import_jsx_runtime14 = require("react/jsx-runtime");
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
  const containerRef = (0, import_react8.useRef)(null);
  const triggerRef = (0, import_react8.useRef)(null);
  const menuRef = (0, import_react8.useRef)(null);
  const isClosingRef = (0, import_react8.useRef)(false);
  const [isOpen, setIsOpen] = (0, import_react8.useState)(false);
  const [isEntered, setIsEntered] = (0, import_react8.useState)(false);
  const [hoveredValue, setHoveredValue] = (0, import_react8.useState)(null);
  const [internalValue, setInternalValue] = (0, import_react8.useState)(defaultValue ?? "");
  const [menuPosition, setMenuPosition] = (0, import_react8.useState)(null);
  const [menuStyle, setMenuStyle] = (0, import_react8.useState)(
    defaultMenuPortalStyle
  );
  const [themeVars, setThemeVars] = (0, import_react8.useState)({});
  const selectedValue = value ?? internalValue;
  const sizeStyles = {
    sm: {
      trigger: "px-1.5 py-0.5 min-h-6",
      text: "text-[10px]",
      icon: 12,
      option: "px-1.5 py-0.5",
      optionLabel: "text-[10px]",
      optionDescription: "text-[9px]",
      check: 12,
      menu: "p-0.5"
    },
    md: {
      trigger: "px-2 py-0.5 min-h-7",
      text: "text-[11px]",
      icon: 13,
      option: "px-1.5 py-1",
      optionLabel: "text-[11px]",
      optionDescription: "text-[10px]",
      check: 13,
      menu: "p-0.5"
    },
    lg: {
      trigger: "px-2.5 py-1 min-h-8",
      text: "text-xs",
      icon: 14,
      option: "px-2 py-1.5",
      optionLabel: "text-xs",
      optionDescription: "text-[11px]",
      check: 14,
      menu: "p-1"
    }
  };
  const currentSize = sizeStyles[size];
  const selectedOption = (0, import_react8.useMemo)(
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
  (0, import_react8.useEffect)(() => {
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
  (0, import_react8.useLayoutEffect)(() => {
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
  (0, import_react8.useEffect)(() => {
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
  (0, import_react8.useEffect)(() => {
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
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("ul", { className: "m-0 list-none p-0", children: options.map((option) => {
          const isSelected = option.value === selectedValue;
          const isHovered = hoveredValue === option.value && !option.disabled;
          return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("li", { className: "m-0 p-0", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "button",
            {
              type: "button",
              disabled: option.disabled,
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
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "div",
                    {
                      className: `truncate transition-colors duration-200 ${currentSize.optionLabel} ${isSelected ? "font-medium" : ""}`,
                      style: {
                        color: menuStyle["--dropdown-text"]
                      },
                      children: option.label
                    }
                  ),
                  option.description && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
                isSelected && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  import_lucide_react7.Check,
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
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: `flex flex-col gap-1.5 w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("label", { className: "block text-sm font-medium text-(--text)", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { ref: containerRef, className: "relative w-full", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "span",
            {
              className: `truncate ${selectedOption ? "text-(--text)" : "text-(--text-muted)"} ${currentSize.text}`,
              children: selectedOption?.label ?? placeholder
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            import_lucide_react7.ChevronDown,
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

// src/components/ui/autocomplete.tsx
var import_react9 = require("react");
var import_react_dom2 = require("react-dom");
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
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
  const containerRef = (0, import_react9.useRef)(null);
  const fieldRef = (0, import_react9.useRef)(null);
  const inputRef = (0, import_react9.useRef)(null);
  const menuRef = (0, import_react9.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react9.useState)(false);
  const [hoveredValue, setHoveredValue] = (0, import_react9.useState)(null);
  const [internalValue, setInternalValue] = (0, import_react9.useState)(defaultValue ?? "");
  const [query, setQuery] = (0, import_react9.useState)("");
  const [menuPosition, setMenuPosition] = (0, import_react9.useState)({
    top: 0,
    left: 0,
    width: 0
  });
  const [menuStyle, setMenuStyle] = (0, import_react9.useState)(
    defaultMenuPortalStyle
  );
  const [themeVars, setThemeVars] = (0, import_react9.useState)({});
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
  const selectedOption = (0, import_react9.useMemo)(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  const filteredOptions = (0, import_react9.useMemo)(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => {
      const labelText = option.label.toLowerCase();
      const valueText = option.value.toLowerCase();
      const descriptionText = typeof option.description === "string" ? option.description.toLowerCase() : "";
      return labelText.includes(needle) || valueText.includes(needle) || descriptionText.includes(needle);
    });
  }, [options, query]);
  (0, import_react9.useEffect)(() => {
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
  (0, import_react9.useEffect)(() => {
    if (isOpen) return;
    setHoveredValue(null);
  }, [isOpen]);
  (0, import_react9.useEffect)(() => {
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
      setThemeVars(resolveThemeVarStyle(computedStyle));
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
  const autocompleteMenu = !disabled && (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "div",
      {
        ref: menuRef,
        className: `fixed z-9999 max-h-64 origin-top overflow-y-auto rounded-xl p-1.5 shadow-2xl backdrop-blur-sm will-change-transform will-change-opacity transition-all duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1.5 scale-[0.98] opacity-0"}`,
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
        "aria-hidden": !isOpen,
        children: filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "div",
          {
            className: "px-2.5 py-2 text-sm",
            style: { color: menuStyle["--dropdown-text-muted"] },
            children: emptyMessage
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("ul", { className: "m-0 list-none p-0", children: filteredOptions.map((option) => {
          const isSelected = option.value === selectedValue;
          const isHovered = hoveredValue === option.value;
          return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("li", { className: "m-0 p-0", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
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
                /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                    "div",
                    {
                      className: `truncate text-sm transition-colors duration-200 ${isSelected ? "font-medium" : ""}`,
                      style: {
                        color: menuStyle["--dropdown-text"]
                      },
                      children: option.label
                    }
                  ),
                  option.description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
                isSelected && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                  import_lucide_react8.Check,
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: `flex flex-col gap-1.5 w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("label", { className: "block text-sm font-medium text-(--text)", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { ref: containerRef, className: "relative w-full", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
            import_lucide_react8.Search,
            {
              size: currentSize.icon,
              className: "shrink-0 text-(--text-muted)"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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

// src/components/ui/bar-chart.tsx
var import_react10 = require("react");
var import_jsx_runtime16 = require("react/jsx-runtime");
var Y_TICKS = 4;
var SEGMENT_GAP = 2;
var roundedTopRect = (x, y, w, h, r) => {
  const radius = Math.max(0, Math.min(r, w / 2, h));
  return [
    `M ${x} ${y + h}`,
    `L ${x} ${y + radius}`,
    `Q ${x} ${y} ${x + radius} ${y}`,
    `L ${x + w - radius} ${y}`,
    `Q ${x + w} ${y} ${x + w} ${y + radius}`,
    `L ${x + w} ${y + h}`,
    "Z"
  ].join(" ");
};
var BarChart = ({
  data,
  xKey,
  series,
  stacked = false,
  height = 260,
  showValues = false,
  valueFormatter = formatChartValue,
  className = "",
  "aria-label": ariaLabel
}) => {
  const [containerRef, width] = useContainerWidth();
  const [hoverIndex, setHoverIndex] = (0, import_react10.useState)(null);
  const [pointer, setPointer] = (0, import_react10.useState)({ x: 0, y: 0 });
  const numeric = (row, key) => {
    const v = row[key];
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };
  const scale = (0, import_react10.useMemo)(() => {
    let max = 0;
    let min = 0;
    for (const row of data) {
      if (stacked) {
        const total = series.reduce((sum, s) => sum + numeric(row, s.key), 0);
        max = Math.max(max, total);
      } else {
        for (const s of series) {
          max = Math.max(max, numeric(row, s.key));
          min = Math.min(min, numeric(row, s.key));
        }
      }
    }
    return niceScale(min, max, Y_TICKS);
  }, [data, series, stacked]);
  const margin = {
    top: showValues ? 24 : 12,
    right: 8,
    bottom: 24,
    left: 10 + Math.max(...scale.ticks.map((t) => valueFormatter(t).length)) * 7.5
  };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const yFor = (value) => margin.top + innerHeight - (value - scale.min) / (scale.max - scale.min) * innerHeight;
  const baselineY = yFor(0);
  const bandWidth = data.length > 0 ? innerWidth / data.length : 0;
  const bandPadding = Math.min(bandWidth * 0.2, 24);
  const groupWidth = Math.max(0, bandWidth - bandPadding * 2);
  const labelEvery = Math.max(1, Math.ceil(data.length * 64 / (innerWidth || 1)));
  const hoveredRow = hoverIndex !== null ? data[hoverIndex] : null;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    "div",
    {
      ref: containerRef,
      className: `relative w-full ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        series.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "mb-2 flex flex-wrap items-center gap-x-4 gap-y-1", children: series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
          "span",
          {
            className: "flex items-center gap-1.5 text-xs text-(--text-muted)",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                "span",
                {
                  "aria-hidden": true,
                  className: "h-2.5 w-2.5 rounded-[3px]",
                  style: { backgroundColor: seriesColor(s, i) }
                }
              ),
              s.label ?? s.key
            ]
          },
          s.key
        )) }),
        width > 0 && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
          "svg",
          {
            width,
            height,
            role: "img",
            "aria-label": ariaLabel ?? "Bar chart",
            onMouseLeave: () => setHoverIndex(null),
            onMouseMove: (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const px = e.clientX - rect.left;
              setPointer({ x: px, y: e.clientY - rect.top });
              const index = Math.floor((px - margin.left) / (bandWidth || 1));
              setHoverIndex(
                index >= 0 && index < data.length && px >= margin.left ? index : null
              );
            },
            children: [
              scale.ticks.map((tick) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("g", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                  "line",
                  {
                    x1: margin.left,
                    x2: width - margin.right,
                    y1: yFor(tick),
                    y2: yFor(tick),
                    stroke: "var(--border)",
                    strokeWidth: tick === 0 ? 1 : 0.5,
                    opacity: tick === 0 ? 1 : 0.7
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                  "text",
                  {
                    x: margin.left - 8,
                    y: yFor(tick),
                    textAnchor: "end",
                    dominantBaseline: "middle",
                    fontSize: 11,
                    fill: "var(--text-muted)",
                    children: valueFormatter(tick)
                  }
                )
              ] }, tick)),
              data.map((row, rowIndex) => {
                const bandX = margin.left + rowIndex * bandWidth;
                const dimmed = hoverIndex !== null && hoverIndex !== rowIndex;
                let stackY = baselineY;
                const total = series.reduce(
                  (sum, s) => sum + numeric(row, s.key),
                  0
                );
                return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
                  "g",
                  {
                    opacity: dimmed ? 0.45 : 1,
                    style: { transition: "opacity 0.15s ease" },
                    children: [
                      series.map((s, seriesIndex) => {
                        const value = numeric(row, s.key);
                        const color = seriesColor(s, seriesIndex);
                        if (stacked) {
                          const h2 = Math.max(
                            0,
                            value / (scale.max - scale.min) * innerHeight
                          );
                          const isTop = seriesIndex === series.length - 1;
                          const gap = isTop ? 0 : SEGMENT_GAP;
                          const segH = Math.max(0, h2 - gap);
                          const y2 = stackY - h2;
                          stackY = y2;
                          const barX2 = bandX + (bandWidth - groupWidth) / 2;
                          if (segH <= 0) return null;
                          return isTop ? /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                            "path",
                            {
                              d: roundedTopRect(barX2, y2, groupWidth, segH, 4),
                              fill: color
                            },
                            s.key
                          ) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                            "rect",
                            {
                              x: barX2,
                              y: y2 + gap,
                              width: groupWidth,
                              height: segH,
                              fill: color
                            },
                            s.key
                          );
                        }
                        const barWidth = Math.max(
                          2,
                          (groupWidth - SEGMENT_GAP * (series.length - 1)) / series.length
                        );
                        const barX = bandX + (bandWidth - groupWidth) / 2 + seriesIndex * (barWidth + SEGMENT_GAP);
                        const y = value >= 0 ? yFor(value) : baselineY;
                        const h = Math.abs(yFor(value) - baselineY);
                        if (h <= 0) return null;
                        return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                          "path",
                          {
                            d: roundedTopRect(barX, y, barWidth, h, 4),
                            fill: color
                          },
                          s.key
                        );
                      }),
                      showValues && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                        "text",
                        {
                          x: bandX + bandWidth / 2,
                          y: (stacked ? yFor(total) : yFor(
                            Math.max(...series.map((s) => numeric(row, s.key)))
                          )) - 6,
                          textAnchor: "middle",
                          fontSize: 11,
                          fill: "var(--text-muted)",
                          children: valueFormatter(
                            stacked ? total : Math.max(...series.map((s) => numeric(row, s.key)))
                          )
                        }
                      ),
                      rowIndex % labelEvery === 0 && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                        "text",
                        {
                          x: bandX + bandWidth / 2,
                          y: height - 6,
                          textAnchor: "middle",
                          fontSize: 11,
                          fill: "var(--text-muted)",
                          children: String(row[xKey])
                        }
                      )
                    ]
                  },
                  `${row[xKey]}-${rowIndex}`
                );
              })
            ]
          }
        ),
        hoveredRow && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
          "div",
          {
            className: "pointer-events-none absolute z-10 min-w-32 rounded-md px-3 py-2 text-xs shadow-lg",
            style: {
              left: Math.min(pointer.x + 12, Math.max(0, width - 150)),
              top: Math.max(0, pointer.y - 8),
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "mb-1 font-medium", children: String(hoveredRow[xKey]) }),
              series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
                "div",
                {
                  className: "flex items-center justify-between gap-3",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("span", { className: "flex items-center gap-1.5 text-(--text-muted)", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
                        "span",
                        {
                          "aria-hidden": true,
                          className: "h-2 w-2 rounded-[2px]",
                          style: { backgroundColor: seriesColor(s, i) }
                        }
                      ),
                      s.label ?? s.key
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("span", { className: "font-medium tabular-nums", children: valueFormatter(numeric(hoveredRow, s.key)) })
                  ]
                },
                s.key
              ))
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("table", { className: "sr-only", children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("th", { children: xKey }),
            series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("th", { children: s.label ?? s.key }, s.key))
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("tbody", { children: data.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { children: String(row[xKey]) }),
            series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { children: numeric(row, s.key) }, s.key))
          ] }, i)) })
        ] })
      ]
    }
  );
};

// src/components/ui/line-chart.tsx
var import_react11 = require("react");
var import_jsx_runtime17 = require("react/jsx-runtime");
var Y_TICKS2 = 4;
var smoothPath = (points) => {
  if (points.length < 2)
    return points.length === 1 ? `M ${points[0].x} ${points[0].y}` : "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
};
var linearPath = (points) => points.length === 0 ? "" : `M ${points[0].x} ${points[0].y}` + points.slice(1).map((p) => ` L ${p.x} ${p.y}`).join("");
var LineChart = ({
  data,
  xKey,
  series,
  area = false,
  curve = "smooth",
  height = 260,
  showDots = false,
  valueFormatter = formatChartValue,
  className = "",
  "aria-label": ariaLabel
}) => {
  const [containerRef, width] = useContainerWidth();
  const [hoverIndex, setHoverIndex] = (0, import_react11.useState)(null);
  const numeric = (row, key) => {
    const v = row[key];
    return typeof v === "number" && Number.isFinite(v) ? v : 0;
  };
  const scale = (0, import_react11.useMemo)(() => {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    for (const row of data) {
      for (const s of series) {
        const v = numeric(row, s.key);
        min = Math.min(min, v);
        max = Math.max(max, v);
      }
    }
    if (!Number.isFinite(min)) {
      min = 0;
      max = 1;
    }
    return niceScale(min, max, Y_TICKS2);
  }, [data, series]);
  const margin = {
    top: 12,
    right: 12,
    bottom: 24,
    left: 10 + Math.max(...scale.ticks.map((t) => valueFormatter(t).length)) * 7.5
  };
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const xFor = (index) => margin.left + (data.length <= 1 ? innerWidth / 2 : index / (data.length - 1) * innerWidth);
  const yFor = (value) => margin.top + innerHeight - (value - scale.min) / (scale.max - scale.min) * innerHeight;
  const seriesPoints = (0, import_react11.useMemo)(
    () => series.map(
      (s) => data.map((row, i) => ({ x: xFor(i), y: yFor(numeric(row, s.key)) }))
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, series, width, height, scale]
  );
  const labelEvery = Math.max(
    1,
    Math.ceil(data.length * 72 / (innerWidth || 1))
  );
  const hoveredRow = hoverIndex !== null ? data[hoverIndex] : null;
  const toPath = curve === "smooth" ? smoothPath : linearPath;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
    "div",
    {
      ref: containerRef,
      className: `relative w-full ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        series.length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "mb-2 flex flex-wrap items-center gap-x-4 gap-y-1", children: series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
          "span",
          {
            className: "flex items-center gap-1.5 text-xs text-(--text-muted)",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                "span",
                {
                  "aria-hidden": true,
                  className: "h-0.5 w-3.5 rounded-full",
                  style: { backgroundColor: seriesColor(s, i) }
                }
              ),
              s.label ?? s.key
            ]
          },
          s.key
        )) }),
        width > 0 && data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
          "svg",
          {
            width,
            height,
            role: "img",
            "aria-label": ariaLabel ?? "Line chart",
            onMouseLeave: () => setHoverIndex(null),
            onMouseMove: (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const px = e.clientX - rect.left;
              if (px < margin.left - 8 || px > width - margin.right + 8) {
                setHoverIndex(null);
                return;
              }
              const step = data.length <= 1 ? innerWidth : innerWidth / (data.length - 1);
              const index = Math.round((px - margin.left) / (step || 1));
              setHoverIndex(Math.max(0, Math.min(data.length - 1, index)));
            },
            children: [
              scale.ticks.map((tick) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("g", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  "line",
                  {
                    x1: margin.left,
                    x2: width - margin.right,
                    y1: yFor(tick),
                    y2: yFor(tick),
                    stroke: "var(--border)",
                    strokeWidth: tick === 0 ? 1 : 0.5,
                    opacity: tick === 0 ? 1 : 0.7
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  "text",
                  {
                    x: margin.left - 8,
                    y: yFor(tick),
                    textAnchor: "end",
                    dominantBaseline: "middle",
                    fontSize: 11,
                    fill: "var(--text-muted)",
                    children: valueFormatter(tick)
                  }
                )
              ] }, tick)),
              data.map(
                (row, i) => i % labelEvery === 0 ? /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  "text",
                  {
                    x: xFor(i),
                    y: height - 6,
                    textAnchor: "middle",
                    fontSize: 11,
                    fill: "var(--text-muted)",
                    children: String(row[xKey])
                  },
                  `x-${i}`
                ) : null
              ),
              area && seriesPoints.map((points, i) => {
                if (points.length < 2) return null;
                const areaD = `${toPath(points)} L ${points[points.length - 1].x} ${yFor(Math.max(scale.min, 0))} L ${points[0].x} ${yFor(Math.max(scale.min, 0))} Z`;
                return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                  "path",
                  {
                    d: areaD,
                    fill: seriesColor(series[i], i),
                    opacity: 0.12
                  },
                  `area-${series[i].key}`
                );
              }),
              hoverIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                "line",
                {
                  x1: xFor(hoverIndex),
                  x2: xFor(hoverIndex),
                  y1: margin.top,
                  y2: margin.top + innerHeight,
                  stroke: "var(--border)",
                  strokeWidth: 1
                }
              ),
              seriesPoints.map((points, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                "path",
                {
                  d: toPath(points),
                  fill: "none",
                  stroke: seriesColor(series[i], i),
                  strokeWidth: 2,
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                `line-${series[i].key}`
              )),
              seriesPoints.map(
                (points, i) => points.map((p, pi) => {
                  const visible = showDots || pi === hoverIndex;
                  if (!visible) return null;
                  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                    "circle",
                    {
                      cx: p.x,
                      cy: p.y,
                      r: 4,
                      fill: seriesColor(series[i], i),
                      stroke: "var(--surface)",
                      strokeWidth: 2
                    },
                    `dot-${series[i].key}-${pi}`
                  );
                })
              )
            ]
          }
        ),
        hoveredRow && hoverIndex !== null && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
          "div",
          {
            className: "pointer-events-none absolute z-10 min-w-32 rounded-md px-3 py-2 text-xs shadow-lg",
            style: {
              left: Math.min(xFor(hoverIndex) + 12, Math.max(0, width - 150)),
              top: margin.top,
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "mb-1 font-medium", children: String(hoveredRow[xKey]) }),
              series.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
                "div",
                {
                  className: "flex items-center justify-between gap-3",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { className: "flex items-center gap-1.5 text-(--text-muted)", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
                        "span",
                        {
                          "aria-hidden": true,
                          className: "h-2 w-2 rounded-full",
                          style: { backgroundColor: seriesColor(s, i) }
                        }
                      ),
                      s.label ?? s.key
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "font-medium tabular-nums", children: valueFormatter(numeric(hoveredRow, s.key)) })
                  ]
                },
                s.key
              ))
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("table", { className: "sr-only", children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("th", { children: xKey }),
            series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("th", { children: s.label ?? s.key }, s.key))
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("tbody", { children: data.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("tr", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("td", { children: String(row[xKey]) }),
            series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("td", { children: numeric(row, s.key) }, s.key))
          ] }, i)) })
        ] })
      ]
    }
  );
};

// src/components/ui/date-picker.tsx
var import_react12 = require("react");
var import_react_dom3 = require("react-dom");
var import_lucide_react9 = require("lucide-react");
var import_jsx_runtime18 = require("react/jsx-runtime");
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
  const triggerRef = (0, import_react12.useRef)(null);
  const popoverRef = (0, import_react12.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react12.useState)(false);
  const [internalValue, setInternalValue] = (0, import_react12.useState)(defaultValue);
  const selected = value !== void 0 ? value : internalValue;
  const [viewDate, setViewDate] = (0, import_react12.useState)(selected ?? /* @__PURE__ */ new Date());
  const [position, setPosition] = (0, import_react12.useState)({ top: 0, left: 0 });
  const [portalStyle, setPortalStyle] = (0, import_react12.useState)(
    defaultMenuPortalStyle
  );
  const [themeVars, setThemeVars] = (0, import_react12.useState)({});
  const sizeStyles = {
    sm: { trigger: "px-2.5 py-1 min-h-9 text-xs", icon: 14 },
    md: { trigger: "px-3 py-1.5 min-h-10 text-sm", icon: 15 },
    lg: { trigger: "px-3 py-2 min-h-11 text-base", icon: 16 }
  };
  const currentSize = sizeStyles[size];
  (0, import_react12.useEffect)(() => {
    if (isOpen) setViewDate(selected ?? /* @__PURE__ */ new Date());
  }, [isOpen, selected]);
  (0, import_react12.useEffect)(() => {
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
  (0, import_react12.useEffect)(() => {
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
      const computedStyle = window.getComputedStyle(el);
      setPortalStyle(resolveMenuPortalTokens(computedStyle));
      setThemeVars(resolveThemeVarStyle(computedStyle));
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
  const popover = !disabled && (0, import_react_dom3.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
      "div",
      {
        ref: popoverRef,
        className: `fixed z-9999 w-[280px] select-none p-4 shadow-2xl transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1.5 scale-[0.98] opacity-0"}`,
        style: {
          ...themeVars,
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
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
                ),
                className: "rounded-md p-1 transition-colors hover:bg-(--dropdown-hover-bg)",
                style: { color: portalStyle["--dropdown-text"] },
                "aria-label": "Previous month",
                children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react9.ChevronLeft, { size: 16 })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
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
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
                ),
                className: "rounded-md p-1 transition-colors hover:bg-(--dropdown-hover-bg)",
                style: { color: portalStyle["--dropdown-text"] },
                "aria-label": "Next month",
                children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react9.ChevronRight, { size: 16 })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "mb-2 grid grid-cols-7 gap-1 text-center", children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
            "div",
            {
              className: "text-xs font-medium",
              style: { color: portalStyle["--dropdown-text-muted"] },
              children: d
            },
            d
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: "grid grid-cols-7 gap-1 text-center", children: [
            [...Array(firstDayOfMonth)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", {}, `empty-${i}`)),
            [...Array(daysInMonth)].map((_, i) => {
              const date = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth(),
                i + 1
              );
              const isSelected = isSameDay(date, selected);
              const isToday = isSameDay(date, today);
              const dayDisabled = isDisabledDay(date);
              return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("div", { className: `flex w-full flex-col gap-1.5 ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("label", { className: "block text-sm font-medium text-(--text)", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "relative w-full", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)("span", { className: "flex min-w-0 items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
              import_lucide_react9.Calendar,
              {
                size: currentSize.icon,
                className: "shrink-0 text-(--text-muted)"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("span", { className: "truncate", children: selected ? formatValue(selected) : placeholder })
          ] }),
          clearable && selected && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
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
              children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_lucide_react9.X, { size: currentSize.icon })
            }
          )
        ]
      }
    ) }),
    popover
  ] });
};

// src/components/ui/toast.tsx
var import_react13 = require("react");
var import_react_dom4 = require("react-dom");
var import_lucide_react10 = require("lucide-react");
var import_jsx_runtime19 = require("react/jsx-runtime");
var ToastContext = (0, import_react13.createContext)(void 0);
var useToast = () => {
  const context = (0, import_react13.useContext)(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};
var VARIANT_META = {
  default: { icon: null, color: "var(--ui-primary)" },
  success: { icon: import_lucide_react10.CheckCircle2, color: "#0CA30C" },
  error: { icon: import_lucide_react10.XCircle, color: "#D03B3B" },
  warning: { icon: import_lucide_react10.AlertTriangle, color: "#B87A00" },
  info: { icon: import_lucide_react10.Info, color: "var(--ui-primary)" }
};
var LEAVE_MS = 200;
var MAX_TOASTS = 5;
var ToastProvider = ({
  children,
  position = "bottom-right",
  radius = "md"
}) => {
  const [toasts, setToasts] = (0, import_react13.useState)([]);
  const [mounted, setMounted] = (0, import_react13.useState)(false);
  const [themeVars, setThemeVars] = (0, import_react13.useState)({});
  const idRef = (0, import_react13.useRef)(0);
  const anchorRef = (0, import_react13.useRef)(null);
  const timersRef = (0, import_react13.useRef)(/* @__PURE__ */ new Map());
  (0, import_react13.useEffect)(() => {
    setMounted(true);
    const timers = timersRef.current;
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);
  (0, import_react13.useEffect)(() => {
    if (toasts.length === 0 || !anchorRef.current) return;
    setThemeVars(resolveThemeVarStyle(getComputedStyle(anchorRef.current)));
  }, [toasts.length]);
  const dismiss = (0, import_react13.useCallback)((id) => {
    const pending = timersRef.current.get(id);
    if (pending) {
      clearTimeout(pending);
      timersRef.current.delete(id);
    }
    setToasts(
      (current) => current.map((t) => t.id === id ? { ...t, leaving: true } : t)
    );
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, LEAVE_MS);
  }, []);
  const toast = (0, import_react13.useCallback)(
    ({
      title,
      description,
      variant = "default",
      duration = 4e3
    }) => {
      const id = ++idRef.current;
      setToasts((current) => {
        const next = [...current, { id, title, description, variant, duration, leaving: false }];
        return next.slice(Math.max(0, next.length - MAX_TOASTS));
      });
      if (duration > 0) {
        timersRef.current.set(
          id,
          setTimeout(() => dismiss(id), duration)
        );
      }
      return id;
    },
    [dismiss]
  );
  const contextValue = (0, import_react13.useMemo)(() => ({ toast, dismiss }), [toast, dismiss]);
  const positionClasses = {
    "top-right": "top-4 right-4 items-end",
    "top-left": "top-4 left-4 items-start",
    "bottom-right": "bottom-4 right-4 items-end",
    "bottom-left": "bottom-4 left-4 items-start"
  }[position];
  const fromTop = position.startsWith("top");
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(ToastContext.Provider, { value: contextValue, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { ref: anchorRef, hidden: true, "aria-hidden": true }),
    mounted && (0, import_react_dom4.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
        "div",
        {
          className: `pointer-events-none fixed z-9999 flex w-full max-w-sm flex-col gap-2 ${positionClasses}`,
          style: themeVars,
          role: "region",
          "aria-label": "Notifications",
          children: toasts.map((t) => {
            const meta = VARIANT_META[t.variant];
            const Icon = meta.icon;
            return /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
              "div",
              {
                role: "status",
                className: `pointer-events-auto flex w-full items-start gap-3 px-4 py-3 shadow-lg transition-all duration-200 ease-out motion-reduce:transition-none ${t.leaving ? `opacity-0 ${fromTop ? "-translate-y-2" : "translate-y-2"} scale-[0.98]` : "translate-y-0 scale-100 opacity-100"}`,
                style: {
                  ...getRadiusStyle(radius),
                  backgroundColor: "var(--surface)",
                  border: "0.5px solid var(--border)",
                  outline: "0.5px solid var(--border)",
                  outlineOffset: 0,
                  color: "var(--text)",
                  fontFamily: "var(--ui-font)",
                  borderLeft: `3px solid ${meta.color}`
                },
                children: [
                  Icon && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                    Icon,
                    {
                      size: 17,
                      className: "mt-0.5 shrink-0",
                      style: { color: meta.color },
                      "aria-hidden": true
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "text-sm font-medium", children: t.title }),
                    t.description && /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "mt-0.5 text-xs text-(--text-muted)", children: t.description })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
                    "button",
                    {
                      type: "button",
                      onClick: () => dismiss(t.id),
                      className: "shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)",
                      "aria-label": "Dismiss notification",
                      children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react10.X, { size: 15 })
                    }
                  )
                ]
              },
              t.id
            );
          })
        }
      ),
      document.body
    )
  ] });
};

// src/components/ui/alert.tsx
var import_lucide_react11 = require("lucide-react");
var import_jsx_runtime20 = require("react/jsx-runtime");
var VARIANT_META2 = {
  info: { icon: import_lucide_react11.Info, color: "var(--ui-primary)" },
  success: { icon: import_lucide_react11.CheckCircle2, color: "#0CA30C" },
  warning: { icon: import_lucide_react11.AlertTriangle, color: "#B87A00" },
  danger: { icon: import_lucide_react11.XCircle, color: "#D03B3B" }
};
var Alert = ({
  variant = "info",
  title,
  children,
  radius = "md",
  onClose,
  className = ""
}) => {
  const meta = VARIANT_META2[variant];
  const Icon = meta.icon;
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "div",
    {
      role: "alert",
      className: `flex w-full items-start gap-3 px-4 py-3 ${className}`,
      style: {
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        backgroundColor: `color-mix(in srgb, ${meta.color} 9%, var(--surface))`,
        border: `0.5px solid color-mix(in srgb, ${meta.color} 35%, var(--border))`,
        color: "var(--text)"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          Icon,
          {
            size: 17,
            className: "mt-0.5 shrink-0",
            style: { color: meta.color },
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "min-w-0 flex-1", children: [
          title && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "text-sm font-medium", children: title }),
          children && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: `text-sm text-(--text-muted) ${title ? "mt-0.5" : ""}`, children })
        ] }),
        onClose && /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "shrink-0 rounded p-0.5 text-(--text-muted) transition-colors hover:text-(--text)",
            "aria-label": "Dismiss alert",
            children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react11.XCircle, { size: 15 })
          }
        )
      ]
    }
  );
};

// src/components/ui/badge.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var COLOR_HEX = {
  primary: "var(--ui-primary)",
  neutral: "var(--text-muted)",
  success: "#0CA30C",
  warning: "#B87A00",
  danger: "#D03B3B"
};
var Badge = ({
  children,
  color = "primary",
  variant = "soft",
  size = "md",
  radius = "full",
  className = ""
}) => {
  const base = COLOR_HEX[color];
  const variantStyle = variant === "solid" ? { backgroundColor: base, color: "#ffffff" } : variant === "outline" ? {
    backgroundColor: "transparent",
    color: base,
    border: `1px solid color-mix(in srgb, ${base} 55%, transparent)`
  } : {
    backgroundColor: `color-mix(in srgb, ${base} 13%, transparent)`,
    color: base
  };
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    "span",
    {
      className: `inline-flex items-center gap-1 font-medium ${size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-0.5 text-xs"} ${className}`,
      style: {
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        ...variantStyle
      },
      children
    }
  );
};

// src/components/ui/avatar.tsx
var import_react14 = __toESM(require("react"), 1);
var import_jsx_runtime22 = require("react/jsx-runtime");
var SIZE_META = {
  sm: { box: "h-7 w-7", text: "text-[10px]", px: 28 },
  md: { box: "h-9 w-9", text: "text-xs", px: 36 },
  lg: { box: "h-11 w-11", text: "text-sm", px: 44 },
  xl: { box: "h-14 w-14", text: "text-base", px: 56 }
};
var initialsOf = (name) => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
var Avatar = ({
  src,
  alt,
  name = "",
  size = "md",
  radius = "full",
  className = ""
}) => {
  const [failed, setFailed] = (0, import_react14.useState)(false);
  const meta = SIZE_META[size];
  const showImage = !!src && !failed;
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    "span",
    {
      className: `inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium ${meta.box} ${meta.text} ${className}`,
      style: {
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        backgroundColor: showImage ? "var(--bg-soft)" : "color-mix(in srgb, var(--ui-primary) 14%, var(--bg-soft))",
        color: "var(--ui-primary)",
        border: "0.5px solid var(--border)"
      },
      children: showImage ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        "img",
        {
          src,
          alt: alt ?? name,
          className: "h-full w-full object-cover",
          onError: () => setFailed(true)
        }
      ) : name ? initialsOf(name) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
        "svg",
        {
          viewBox: "0 0 24 24",
          width: meta.px * 0.55,
          height: meta.px * 0.55,
          fill: "currentColor",
          "aria-hidden": true,
          children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("path", { d: "M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4 0-8 2-8 5.5V21h16v-1.5c0-3.5-4-5.5-8-5.5Z" })
        }
      )
    }
  );
};
var AvatarGroup = ({
  children,
  max = 4,
  size = "md",
  radius = "full",
  className = ""
}) => {
  const items = import_react14.default.Children.toArray(children);
  const visible = items.slice(0, max);
  const hidden = items.length - visible.length;
  const meta = SIZE_META[size];
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: `flex items-center ${className}`, children: [
    visible.map((child, i) => /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      "span",
      {
        className: i > 0 ? "-ml-2.5" : "",
        style: {
          borderRadius: "9999px",
          boxShadow: "0 0 0 2px var(--bg)"
        },
        children: child
      },
      i
    )),
    hidden > 0 && /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
      "span",
      {
        className: `-ml-2.5 inline-flex shrink-0 items-center justify-center font-medium ${meta.box} ${meta.text}`,
        style: {
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          backgroundColor: "var(--hover)",
          color: "var(--text-muted)",
          boxShadow: "0 0 0 2px var(--bg)"
        },
        children: [
          "+",
          hidden
        ]
      }
    )
  ] });
};

// src/components/ui/progress.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var COLOR_HEX2 = {
  primary: "var(--ui-primary-bg)",
  success: "#0CA30C",
  warning: "#B87A00",
  danger: "#D03B3B"
};
var HEIGHTS = { sm: "h-1", md: "h-2", lg: "h-3" };
var Progress = ({
  value = 0,
  size = "md",
  color = "primary",
  label,
  showValue = false,
  indeterminate = false,
  radius = "full",
  className = ""
}) => {
  const clamped = Math.min(100, Math.max(0, value));
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    "div",
    {
      className: `w-full ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        (label || showValue) && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mb-1.5 flex items-center justify-between gap-3", children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-sm font-medium text-(--text)", children: label }),
          showValue && !indeterminate && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: "text-xs tabular-nums text-(--text-muted)", children: [
            Math.round(clamped),
            "%"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "div",
          {
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": indeterminate ? void 0 : Math.round(clamped),
            "aria-label": label,
            className: `w-full overflow-hidden ${HEIGHTS[size]}`,
            style: {
              ...getRadiusStyle(radius),
              backgroundColor: "var(--hover)"
            },
            children: indeterminate ? /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_jsx_runtime23.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                "style",
                {
                  dangerouslySetInnerHTML: {
                    __html: "@keyframes hk-progress-slide{0%{transform:translateX(-100%)}100%{transform:translateX(250%)}}"
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                "div",
                {
                  className: "h-full w-2/5",
                  style: {
                    ...getRadiusStyle(radius),
                    background: COLOR_HEX2[color],
                    animation: "hk-progress-slide 1.2s ease-in-out infinite"
                  }
                }
              )
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              "div",
              {
                className: "h-full transition-[width] duration-300 ease-out",
                style: {
                  ...getRadiusStyle(radius),
                  width: `${clamped}%`,
                  background: COLOR_HEX2[color]
                }
              }
            )
          }
        )
      ]
    }
  );
};

// src/components/ui/skeleton.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
var Skeleton = ({
  variant = "rect",
  width,
  height,
  radius = "md",
  className = ""
}) => {
  const defaults = variant === "text" ? { width: "100%", height: 12 } : variant === "circle" ? { width: 40, height: 40 } : { width: "100%", height: 20 };
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
    "span",
    {
      "aria-hidden": true,
      className: `block animate-pulse ${className}`,
      style: {
        ...variant === "circle" ? { borderRadius: "9999px" } : getRadiusStyle(variant === "text" ? "sm" : radius),
        width: width ?? defaults.width,
        height: height ?? defaults.height,
        backgroundColor: "var(--hover)"
      }
    }
  );
};

// src/components/ui/spinner.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var SIZES = { sm: 16, md: 22, lg: 30 };
var Spinner = ({
  size = "md",
  color = "primary",
  label = "Loading",
  className = ""
}) => {
  const px = SIZES[size];
  const stroke = color === "primary" ? "var(--ui-primary)" : "currentColor";
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
    "span",
    {
      role: "status",
      "aria-label": label,
      className: `inline-flex ${className}`,
      children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
        "svg",
        {
          className: "animate-spin",
          width: px,
          height: px,
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": true,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "circle",
              {
                cx: "12",
                cy: "12",
                r: "10",
                stroke,
                strokeOpacity: "0.25",
                strokeWidth: "3"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "path",
              {
                d: "M22 12a10 10 0 0 0-10-10",
                stroke,
                strokeWidth: "3",
                strokeLinecap: "round"
              }
            )
          ]
        }
      )
    }
  );
};

// src/components/ui/slider.tsx
var import_react15 = require("react");
var import_jsx_runtime26 = require("react/jsx-runtime");
var TRACK_HEIGHT = { sm: 4, md: 6 };
var THUMB = { sm: 14, md: 18 };
var Slider = ({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = false,
  formatValue = (v) => String(v),
  size = "md",
  disabled = false,
  className = ""
}) => {
  const id = (0, import_react15.useId)();
  const rangeClass = `hk-slider-${id.replace(/[^a-zA-Z0-9-]/g, "")}`;
  const [internalValue, setInternalValue] = (0, import_react15.useState)(defaultValue);
  const current = value ?? internalValue;
  const percent = max > min ? (current - min) / (max - min) * 100 : 0;
  const trackH = TRACK_HEIGHT[size];
  const thumbPx = THUMB[size];
  const css = `
.${rangeClass}{-webkit-appearance:none;appearance:none;width:100%;height:${thumbPx + 6}px;background:transparent;margin:0;cursor:pointer;}
.${rangeClass}:disabled{cursor:not-allowed;}
.${rangeClass}:focus{outline:none;}
.${rangeClass}::-webkit-slider-runnable-track{height:${trackH}px;border-radius:9999px;background:linear-gradient(to right,var(--ui-primary) ${percent}%,var(--hover) ${percent}%);}
.${rangeClass}::-webkit-slider-thumb{-webkit-appearance:none;width:${thumbPx}px;height:${thumbPx}px;margin-top:${(trackH - thumbPx) / 2}px;border-radius:9999px;background:var(--surface);border:2px solid var(--ui-primary);box-shadow:0 1px 3px rgba(0,0,0,0.18);transition:transform 0.12s ease;}
.${rangeClass}:not(:disabled)::-webkit-slider-thumb:hover{transform:scale(1.1);}
.${rangeClass}:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 4px color-mix(in srgb,var(--ui-primary) 25%,transparent);}
.${rangeClass}::-moz-range-track{height:${trackH}px;border-radius:9999px;background:var(--hover);}
.${rangeClass}::-moz-range-progress{height:${trackH}px;border-radius:9999px;background:var(--ui-primary);}
.${rangeClass}::-moz-range-thumb{width:${thumbPx - 4}px;height:${thumbPx - 4}px;border-radius:9999px;background:var(--surface);border:2px solid var(--ui-primary);box-shadow:0 1px 3px rgba(0,0,0,0.18);}
`;
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
    "div",
    {
      className: `w-full ${disabled ? "opacity-50" : ""} ${className}`,
      style: { fontFamily: "var(--ui-font)" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("style", { dangerouslySetInnerHTML: { __html: css } }),
        (label || showValue) && /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "mb-1.5 flex items-center justify-between gap-3", children: [
          label && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
            "label",
            {
              htmlFor: id,
              className: "text-sm font-medium text-(--text)",
              children: label
            }
          ),
          showValue && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("span", { className: "text-xs tabular-nums text-(--text-muted)", children: formatValue(current) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
          "input",
          {
            id,
            type: "range",
            className: rangeClass,
            min,
            max,
            step,
            value: current,
            disabled,
            onChange: (e) => {
              const next = Number(e.target.value);
              if (value === void 0) setInternalValue(next);
              onChange?.(next);
            }
          }
        )
      ]
    }
  );
};

// src/components/ui/breadcrumbs.tsx
var import_lucide_react12 = require("lucide-react");
var import_jsx_runtime27 = require("react/jsx-runtime");
var Breadcrumbs = ({
  items,
  separator,
  className = ""
}) => /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
  "nav",
  {
    "aria-label": "Breadcrumb",
    className,
    style: { fontFamily: "var(--ui-font)" },
    children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("ol", { className: "m-0 flex list-none flex-wrap items-center gap-1.5 p-0", children: items.map((item, i) => {
      const isLast = i === items.length - 1;
      const content = isLast ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { "aria-current": "page", className: "font-medium text-(--text)", children: item.label }) : item.href || item.onClick ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
        "a",
        {
          href: item.href ?? "#",
          onClick: (e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          },
          className: "text-(--text-muted) transition-colors hover:text-(--text) hover:underline",
          children: item.label
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "text-(--text-muted)", children: item.label });
      return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("li", { className: "flex items-center gap-1.5 text-sm", children: [
        content,
        !isLast && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { "aria-hidden": true, className: "flex text-(--text-muted) opacity-60", children: separator ?? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react12.ChevronRight, { size: 14 }) })
      ] }, i);
    }) })
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionItem,
  Alert,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  BarChart,
  Breadcrumbs,
  Button,
  Calendar,
  Checkbox,
  DARK_CHART_COLORS,
  DatePicker,
  Dropdown,
  HakiProvider,
  Input,
  LIGHT_CHART_COLORS,
  LineChart,
  Modal,
  Pagination,
  Progress,
  Radio,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  ToastProvider,
  Tooltip,
  chartColor,
  darkNeutrals,
  defaultTheme,
  formatChartValue,
  getRadiusStyle,
  hexToRgb,
  lightNeutrals,
  useTheme,
  useToast
});
//# sourceMappingURL=index.cjs.map