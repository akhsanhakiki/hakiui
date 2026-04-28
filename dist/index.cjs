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
  Autocomplete: () => Autocomplete,
  Button: () => Button,
  Calendar: () => Calendar,
  Checkbox: () => Checkbox,
  Dropdown: () => Dropdown,
  HakiProvider: () => HakiProvider,
  Input: () => Input,
  Modal: () => Modal,
  Pagination: () => Pagination,
  Radio: () => Radio,
  Switch: () => Switch,
  Table: () => Table,
  TableBody: () => TableBody,
  TableCell: () => TableCell,
  TableColumn: () => TableColumn,
  TableHeader: () => TableHeader,
  TableRow: () => TableRow,
  Tabs: () => Tabs,
  Tooltip: () => Tooltip,
  defaultTheme: () => defaultTheme,
  getRadiusStyle: () => getRadiusStyle,
  hexToRgb: () => hexToRgb,
  useTheme: () => useTheme
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
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var defaultTheme = {
  primaryColor: "#006FEE",
  gradientColor: "#5EA2EF",
  useGradient: false,
  fontFamily: "'Inter', sans-serif",
  borderRadius: 12
};
var ThemeContext = (0, import_react.createContext)(void 0);
var useTheme = () => {
  const context = (0, import_react.useContext)(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a HakiProvider");
  return context;
};
var HakiProvider = ({
  children,
  initialTheme = defaultTheme,
  className = ""
}) => {
  const [theme, setTheme] = (0, import_react.useState)(initialTheme);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: { theme, setTheme }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className,
      style: {
        "--ui-primary": theme.primaryColor,
        "--ui-primary-rgb": hexToRgb(theme.primaryColor),
        "--ui-gradient": `linear-gradient(to right, ${theme.primaryColor}, ${theme.gradientColor})`,
        "--ui-primary-bg": theme.useGradient ? "var(--ui-gradient)" : "var(--ui-primary)",
        "--ui-font": theme.fontFamily,
        "--ui-radius": `${theme.borderRadius}px`
      },
      children
    }
  ) });
};

// src/components/ui/button.tsx
var import_react2 = __toESM(require("react"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
var Button = import_react2.default.forwardRef(
  ({
    className = "",
    variant = "primary",
    size = "md",
    radius = "md",
    children,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    };
    let variantStyle = {};
    if (variant === "primary") {
      variantStyle = {
        background: "var(--ui-primary-bg)",
        color: "#ffffff",
        border: "none"
      };
    } else if (variant === "secondary") {
      variantStyle = {
        backgroundColor: "rgb(var(--ui-primary-rgb) / 0.12)",
        color: "var(--ui-primary)",
        border: "none"
      };
    } else if (variant === "outline") {
      variantStyle = {
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "1px solid var(--border)",
        outline: "1px solid var(--border)",
        outlineOffset: 0
      };
    } else if (variant === "ghost") {
      variantStyle = {
        backgroundColor: "transparent",
        color: "var(--text)",
        border: "none"
      };
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        ref,
        className: `font-medium transition-transform active:scale-95 inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer ${sizeClasses[size]} ${className}`,
        style: {
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          ...variantStyle
        },
        ...props,
        children
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/input.tsx
var import_react3 = __toESM(require("react"), 1);
var import_lucide_react = require("lucide-react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var Input = import_react3.default.forwardRef(
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
    const [showPassword, setShowPassword] = (0, import_react3.useState)(false);
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
          className: `flex w-full items-center overflow-hidden text-(--text) transition-[box-shadow,ring-color] ring-2 ring-transparent focus-within:ring-[color:var(--ui-primary)]/35 ${currentSize.container}`,
          style: {
            ...getRadiusStyle(radius),
            backgroundColor: "var(--bg-soft)",
            color: "var(--text)"
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
        className: "flex items-center gap-1 border-0 bg-transparent px-3 py-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text) disabled:opacity-50",
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
          className: `flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${isActive ? "text-white" : "bg-transparent text-(--text) hover:bg-(--hover)"}`,
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
        className: "flex items-center gap-1 border-0 bg-transparent px-3 py-1.5 text-sm text-(--text-muted) transition-colors hover:text-(--text) disabled:opacity-50",
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
        className: `relative ${current.w} ${current.h} rounded-full transition-colors ${!checked ? "bg-(--input)" : ""}`,
        style: checked ? { background: "var(--ui-primary-bg)" } : {},
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
        className: `pointer-events-none absolute z-50 whitespace-nowrap bg-(--surface) px-2.5 py-1.5 text-xs text-(--text) opacity-0 transition-opacity group-hover:opacity-100 ${positionClasses[position]}`,
        style: getRadiusStyle("sm"),
        children: content
      }
    )
  ] });
};

// src/components/ui/table.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var Table = ({
  children,
  radius = "lg"
}) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
  "div",
  {
    className: "w-full overflow-hidden border border-(--border) bg-(--surface)",
    style: getRadiusStyle(radius),
    children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("table", { className: "w-full text-left border-collapse", children })
  }
);
var TableHeader = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("thead", { className: "bg-(--bg-soft) text-(--text-muted) text-sm", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tr", { className: "border-b border-(--border)", children }) });
var TableColumn = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { className: "px-4 py-3 font-medium font-sans", children });
var TableBody = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tbody", { className: "text-sm text-(--text)", children });
var TableRow = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tr", { className: "border-b border-(--border) transition-colors hover:bg-(--hover) last:border-0", children });
var TableCell = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("td", { className: "px-4 py-3", children });

// src/components/ui/tabs.tsx
var import_react4 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Tabs = ({
  items
}) => {
  const [active, setActive] = (0, import_react4.useState)(items[0]?.id ?? "");
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex w-full border-b border-(--border)", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        type: "button",
        onClick: () => setActive(item.id),
        className: `-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${active === item.id ? "border-(--ui-primary) text-(--text)" : "border-transparent text-(--text-muted) hover:text-(--text)"}`,
        children: item.label
      },
      item.id
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "px-2 py-2 text-(--text)", children: items.find((i) => i.id === active)?.content })
  ] });
};

// src/components/ui/accordion.tsx
var import_react5 = require("react");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Accordion = ({
  children,
  className = ""
}) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: `flex flex-col gap-2 w-full ${className}`, children });
var AccordionItem = ({
  title,
  children,
  radius = "md"
}) => {
  const [isOpen, setIsOpen] = (0, import_react5.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
    "div",
    {
      className: "overflow-hidden border border-(--border) bg-(--surface)",
      style: getRadiusStyle(radius),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
          "button",
          {
            type: "button",
            onClick: () => setIsOpen(!isOpen),
            className: "flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-(--hover)",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "font-medium text-(--text)", children: title }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
                import_lucide_react3.ChevronDown,
                {
                  size: 18,
                  className: `text-(--text-muted) transition-transform ${isOpen ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        isOpen && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "mt-2 border-t border-(--border) p-4 pt-0 text-sm text-(--text-muted)", children })
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
var import_react6 = require("react");
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var Calendar = ({ radius = "md" }) => {
  const [currentDate, setCurrentDate] = (0, import_react6.useState)(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = (0, import_react6.useState)(/* @__PURE__ */ new Date());
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
      className: "w-[280px] select-none border border-(--border) bg-(--surface) p-4",
      style: getRadiusStyle(radius),
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
        className: "relative flex w-full max-w-md flex-col border border-(--border) bg-(--surface) text-(--text) shadow-2xl animate-in fade-in zoom-in-95 duration-200",
        style: {
          borderRadius: "var(--ui-radius)",
          fontFamily: "var(--ui-font)"
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center justify-between border-b border-(--border) p-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h3", { className: "font-semibold text-lg", children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1 text-(--text-muted) transition-colors hover:text-(--text)",
                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react6.X, { size: 20 })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "p-4 overflow-y-auto", children })
        ]
      }
    )
  ] });
};

// src/components/ui/dropdown.tsx
var import_react7 = require("react");
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
  const containerRef = (0, import_react7.useRef)(null);
  const triggerRef = (0, import_react7.useRef)(null);
  const menuRef = (0, import_react7.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react7.useState)(false);
  const [hoveredValue, setHoveredValue] = (0, import_react7.useState)(null);
  const [internalValue, setInternalValue] = (0, import_react7.useState)(defaultValue ?? "");
  const [menuPosition, setMenuPosition] = (0, import_react7.useState)({
    top: 0,
    left: 0,
    width: 0
  });
  const [menuStyle, setMenuStyle] = (0, import_react7.useState)(defaultMenuPortalStyle);
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
  const selectedOption = (0, import_react7.useMemo)(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  (0, import_react7.useEffect)(() => {
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
  };
  (0, import_react7.useEffect)(() => {
    if (isOpen) return;
    setHoveredValue(null);
  }, [isOpen]);
  (0, import_react7.useEffect)(() => {
    if (!isOpen) return;
    const updatePosition = () => {
      const triggerEl = triggerRef.current;
      if (!triggerEl) return;
      const rect = triggerEl?.getBoundingClientRect();
      if (!rect) return;
      const computedStyle = window.getComputedStyle(triggerEl);
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
  const dropdownMenu = !disabled && (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
              className: "flex w-full items-start justify-between gap-2 rounded-lg px-2.5 py-2 text-left transition-all duration-200 ease-out disabled:cursor-not-allowed disabled:opacity-40",
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
                      className: `truncate text-sm transition-colors duration-200 ${isSelected ? "font-medium" : ""}`,
                      style: {
                        color: menuStyle["--dropdown-text"]
                      },
                      children: option.label
                    }
                  ),
                  option.description && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
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
                isSelected && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  import_lucide_react7.Check,
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
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("label", { className: "mb-1.5 block text-sm font-medium text-(--text)", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { ref: containerRef, className: "relative w-full", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "button",
      {
        ref: triggerRef,
        type: "button",
        disabled,
        onClick: () => setIsOpen((prev) => !prev),
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
              className: `shrink-0 text-(--text-muted) transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ) }),
    dropdownMenu
  ] });
};

// src/components/ui/autocomplete.tsx
var import_react8 = require("react");
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
  const containerRef = (0, import_react8.useRef)(null);
  const fieldRef = (0, import_react8.useRef)(null);
  const inputRef = (0, import_react8.useRef)(null);
  const menuRef = (0, import_react8.useRef)(null);
  const [isOpen, setIsOpen] = (0, import_react8.useState)(false);
  const [hoveredValue, setHoveredValue] = (0, import_react8.useState)(null);
  const [internalValue, setInternalValue] = (0, import_react8.useState)(defaultValue ?? "");
  const [query, setQuery] = (0, import_react8.useState)("");
  const [menuPosition, setMenuPosition] = (0, import_react8.useState)({
    top: 0,
    left: 0,
    width: 0
  });
  const [menuStyle, setMenuStyle] = (0, import_react8.useState)(defaultMenuPortalStyle);
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
  const selectedOption = (0, import_react8.useMemo)(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  const filteredOptions = (0, import_react8.useMemo)(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => {
      const labelText = option.label.toLowerCase();
      const valueText = option.value.toLowerCase();
      const descriptionText = typeof option.description === "string" ? option.description.toLowerCase() : "";
      return labelText.includes(needle) || valueText.includes(needle) || descriptionText.includes(needle);
    });
  }, [options, query]);
  (0, import_react8.useEffect)(() => {
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
  (0, import_react8.useEffect)(() => {
    if (isOpen) return;
    setHoveredValue(null);
  }, [isOpen]);
  (0, import_react8.useEffect)(() => {
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
  const autocompleteMenu = !disabled && (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("label", { className: "mb-1.5 block text-sm font-medium text-(--text)", children: label }),
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
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react8.Search, { size: currentSize.icon, className: "shrink-0 text-(--text-muted)" }),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Accordion,
  AccordionItem,
  Autocomplete,
  Button,
  Calendar,
  Checkbox,
  Dropdown,
  HakiProvider,
  Input,
  Modal,
  Pagination,
  Radio,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Tooltip,
  defaultTheme,
  getRadiusStyle,
  hexToRgb,
  useTheme
});
//# sourceMappingURL=index.cjs.map