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
var HakiProvider = ({ children, initialTheme = defaultTheme, className = "" }) => {
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
  ({ className = "", variant = "solid", size = "md", radius = "md", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base"
    };
    let variantStyle = {};
    if (variant === "solid") {
      variantStyle = { background: "var(--ui-primary-bg)", color: "#ffffff", border: "none" };
    } else if (variant === "bordered") {
      variantStyle = {
        backgroundColor: "transparent",
        color: "var(--ui-primary)",
        border: "2px solid var(--ui-primary)"
      };
    } else if (variant === "light") {
      variantStyle = { backgroundColor: "transparent", color: "var(--ui-primary)", border: "none" };
    } else if (variant === "flat") {
      variantStyle = { backgroundColor: "rgb(var(--ui-primary-rgb) / 0.2)", color: "var(--ui-primary)", border: "none" };
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        ref,
        className: `font-medium transition-transform active:scale-95 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${className}`,
        style: { ...getRadiusStyle(radius), fontFamily: "var(--ui-font)", ...variantStyle },
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
  ({ className = "", label, labelPlacement = "top", description, startContent, endContent, radius = "md", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = (0, import_react3.useState)(false);
    const isPassword = type === "password";
    const inputType = isPassword ? showPassword ? "text" : "password" : type;
    const inputContainer = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex flex-col gap-1.5 w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: "flex items-center w-full bg-[#27272a] border-2 border-transparent focus-within:border-[color:var(--ui-primary)] transition-colors overflow-hidden px-3 py-2",
          style: getRadiusStyle(radius),
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center w-full gap-2", children: [
            startContent && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-gray-400 shrink-0 flex items-center justify-center", children: startContent }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "input",
              {
                ref,
                type: inputType,
                className: `w-full bg-transparent text-white outline-none placeholder:text-gray-500 ${className}`,
                style: { fontFamily: "var(--ui-font)" },
                ...props
              }
            ),
            isPassword ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setShowPassword(!showPassword),
                className: "text-gray-400 hover:text-white shrink-0 flex items-center justify-center transition-colors",
                children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.EyeOff, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Eye, { size: 16 })
              }
            ) : endContent ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-gray-400 shrink-0 flex items-center justify-center", children: endContent }) : null
          ] })
        }
      ),
      description && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-xs text-gray-500 pl-1", children: description })
    ] });
    if (!label) return inputContainer;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `flex ${labelPlacement === "left" ? "flex-row items-start gap-4" : "flex-col gap-1.5"} w-full`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: `text-sm font-medium text-gray-300 whitespace-nowrap ${labelPlacement === "left" ? "mt-2.5" : ""}`, children: label }),
      inputContainer
    ] });
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
    if (page >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
    return [1, "...", page - 1, page, page + 1, "...", total];
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 select-none", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "button",
      {
        type: "button",
        onClick: () => onChange(Math.max(1, page - 1)),
        disabled: page === 1,
        className: "flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-transparent border-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_lucide_react2.ChevronLeft, { size: 16 }),
          " Previous"
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex items-center gap-1", children: getPages().map((p, i) => {
      if (p === "...") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "w-8 flex items-center justify-center text-gray-500", children: "..." }, `ellipsis-${i}`);
      const isActive = p === page;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          onClick: () => onChange(p),
          className: `w-8 h-8 flex items-center justify-center transition-colors text-sm ${isActive ? "text-white rounded-full" : "bg-transparent hover:bg-[#27272a] text-gray-300 rounded-full"}`,
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
        className: "flex items-center gap-1 px-3 py-1.5 text-sm text-gray-400 hover:text-white disabled:opacity-50 transition-colors bg-transparent border-0",
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `relative ${current.w} ${current.h} rounded-full transition-colors ${!checked ? "bg-[#3f3f46]" : ""}`, style: checked ? { background: "var(--ui-primary-bg)" } : {}, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `absolute top-0.5 left-0.5 bg-white rounded-full transition-transform ${current.circle} ${checked ? current.translate : "translate-x-0"}` }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("input", { type: "checkbox", className: "hidden", checked, onChange: (e) => onChange(e.target.checked) })
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
        className: `absolute z-50 whitespace-nowrap px-2.5 py-1.5 bg-[#27272a] text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${positionClasses[position]}`,
        style: getRadiusStyle("sm"),
        children: content
      }
    )
  ] });
};

// src/components/ui/table.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var Table = ({ children, radius = "lg" }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "w-full overflow-hidden border border-[#27272a] bg-[#18181b]", style: getRadiusStyle(radius), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("table", { className: "w-full text-left border-collapse", children }) });
var TableHeader = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("thead", { className: "bg-[#27272a]/40 text-gray-400 text-sm", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tr", { className: "border-b border-[#27272a]", children }) });
var TableColumn = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("th", { className: "px-4 py-3 font-medium font-sans", children });
var TableBody = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tbody", { className: "text-sm text-gray-300", children });
var TableRow = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("tr", { className: "border-b border-[#27272a] last:border-0 hover:bg-[#27272a]/20 transition-colors", children });
var TableCell = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("td", { className: "px-4 py-3", children });

// src/components/ui/tabs.tsx
var import_react4 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var Tabs = ({ items }) => {
  const [active, setActive] = (0, import_react4.useState)(items[0]?.id ?? "");
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex border-b border-[#27272a] w-full", children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        type: "button",
        onClick: () => setActive(item.id),
        className: `px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-[1px] ${active === item.id ? "border-[color:var(--ui-primary)] text-white" : "border-transparent text-gray-400 hover:text-gray-200"}`,
        children: item.label
      },
      item.id
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "px-2 py-2 text-gray-300", children: items.find((i) => i.id === active)?.content })
  ] });
};

// src/components/ui/accordion.tsx
var import_react5 = require("react");
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Accordion = ({ children, className = "" }) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: `flex flex-col gap-2 w-full ${className}`, children });
var AccordionItem = ({ title, children, radius = "md" }) => {
  const [isOpen, setIsOpen] = (0, import_react5.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "bg-[#18181b] border border-[#27272a] overflow-hidden", style: getRadiusStyle(radius), children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", onClick: () => setIsOpen(!isOpen), className: "w-full flex items-center justify-between p-4 text-left hover:bg-[#27272a]/50 transition-colors", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "font-medium text-white", children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react3.ChevronDown, { size: 18, className: `text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}` })
    ] }),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "p-4 pt-0 text-gray-400 text-sm border-t border-[#27272a] mt-2", children })
  ] });
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
  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: `w-5 h-5 flex items-center justify-center transition-colors ${!checked ? "border-2 border-[#27272a] group-hover:border-gray-400" : ""}`, style: { ...getRadiusStyle(radius), ...checked ? { background: "var(--ui-primary-bg)" } : {} }, children: checked && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react4.Check, { size: 14, className: "text-white" }) }),
  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("input", { type: "checkbox", className: "hidden", checked, onChange: (e) => onChange(e.target.checked) }),
  children && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-sm text-gray-300 select-none", children })
] });

// src/components/ui/radio.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var Radio = ({
  checked,
  onChange,
  children
}) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("label", { className: "flex items-center gap-2 cursor-pointer group w-fit", children: [
  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: `w-5 h-5 rounded-full flex items-center justify-center transition-colors ${!checked ? "border-2 border-[#27272a] group-hover:border-gray-400" : ""}`, style: checked ? { background: "var(--ui-primary-bg)" } : {}, children: checked && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "w-2 h-2 rounded-full bg-white" }) }),
  /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("input", { type: "radio", className: "hidden", checked, onChange }),
  children && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-sm text-gray-300 select-none", children })
] });

// src/components/ui/calendar.tsx
var import_react6 = require("react");
var import_lucide_react5 = require("lucide-react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var Calendar = ({ radius = "md" }) => {
  const [currentDate, setCurrentDate] = (0, import_react6.useState)(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = (0, import_react6.useState)(/* @__PURE__ */ new Date());
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "bg-[#18181b] border border-[#27272a] p-4 w-[280px] select-none", style: getRadiusStyle(radius), children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", onClick: prevMonth, className: "p-1 hover:bg-[#27272a] rounded-md transition-colors text-white", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react5.ChevronLeft, { size: 16 }) }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "font-medium text-sm text-white", children: [
        monthNames[currentDate.getMonth()],
        " ",
        currentDate.getFullYear()
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", onClick: nextMonth, className: "p-1 hover:bg-[#27272a] rounded-md transition-colors text-white", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react5.ChevronRight, { size: 16 }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "grid grid-cols-7 gap-1 text-center mb-2", children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-xs text-gray-500 font-medium", children: d }, d)) }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "grid grid-cols-7 gap-1 text-center", children: [
      [...Array(firstDayOfMonth)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", {}, `empty-${i}`)),
      [...Array(daysInMonth)].map((_, i) => {
        const date = i + 1;
        const isSelected = selectedDate?.getDate() === date && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();
        return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "button",
          {
            type: "button",
            onClick: () => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), date)),
            className: `w-8 h-8 mx-auto flex items-center justify-center text-sm transition-colors ${isSelected ? "text-white font-medium" : "hover:bg-[#27272a] text-gray-300"}`,
            style: { ...getRadiusStyle(radius), ...isSelected ? { background: "var(--ui-primary-bg)" } : {} },
            children: date
          },
          date
        );
      })
    ] })
  ] });
};

// src/components/ui/modal.tsx
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime13 = require("react/jsx-runtime");
var Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "absolute inset-0 bg-black/60 backdrop-blur-sm", onClick: onClose, role: "presentation" }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
      "div",
      {
        className: "relative bg-[#18181b] border border-[#27272a] w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col text-white",
        style: { borderRadius: "var(--ui-radius)", fontFamily: "var(--ui-font)" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center justify-between p-4 border-b border-[#27272a]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h3", { className: "font-semibold text-lg", children: title }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "button", onClick: onClose, className: "text-gray-400 hover:text-white transition-colors p-1", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react6.X, { size: 20 }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "p-4 overflow-y-auto", children })
        ]
      }
    )
  ] });
};

// src/components/ui/dropdown.tsx
var import_react7 = require("react");
var import_lucide_react7 = require("lucide-react");
var import_jsx_runtime14 = require("react/jsx-runtime");
var Dropdown = ({
  options,
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
  const [isOpen, setIsOpen] = (0, import_react7.useState)(false);
  const [internalValue, setInternalValue] = (0, import_react7.useState)(defaultValue ?? "");
  const selectedValue = value ?? internalValue;
  const selectedOption = (0, import_react7.useMemo)(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue]
  );
  (0, import_react7.useEffect)(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const handleSelect = (nextValue) => {
    if (value === void 0) setInternalValue(nextValue);
    onChange?.(nextValue);
    setIsOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("label", { className: "mb-1.5 block text-sm font-medium text-gray-300", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { ref: containerRef, className: "relative w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "button",
        {
          type: "button",
          disabled,
          onClick: () => setIsOpen((prev) => !prev),
          className: "w-full min-h-11 bg-[#27272a] border border-[#3f3f46] hover:border-[#52525b] disabled:opacity-60 disabled:cursor-not-allowed px-3 py-2.5 text-left text-sm text-white transition-colors flex items-center justify-between gap-3",
          style: getRadiusStyle(radius),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: `truncate ${selectedOption ? "text-white" : "text-gray-500"}`, children: selectedOption?.label ?? placeholder }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              import_lucide_react7.ChevronDown,
              {
                size: 16,
                className: `shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`
              }
            )
          ]
        }
      ),
      isOpen && !disabled && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "div",
        {
          className: "absolute z-50 mt-2 w-full bg-[#18181b] border border-[#27272a] p-1.5 shadow-xl max-h-64 overflow-y-auto",
          style: getRadiusStyle(radius),
          children: options.map((option) => {
            const isSelected = option.value === selectedValue;
            return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "button",
              {
                type: "button",
                disabled: option.disabled,
                onClick: () => handleSelect(option.value),
                className: "w-full text-left px-2.5 py-2 rounded-md hover:bg-[#27272a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-start justify-between gap-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: `text-sm truncate ${isSelected ? "text-white font-medium" : "text-gray-200"}`, children: option.label }),
                    option.description && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "text-xs text-gray-500 mt-0.5 truncate", children: option.description })
                  ] }),
                  isSelected && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Check, { size: 16, className: "mt-0.5 text-(--ui-primary) shrink-0" })
                ]
              },
              option.value
            );
          })
        }
      )
    ] })
  ] });
};

// src/components/ui/autocomplete.tsx
var import_react8 = require("react");
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
var Autocomplete = ({
  options,
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
  const [isOpen, setIsOpen] = (0, import_react8.useState)(false);
  const [internalValue, setInternalValue] = (0, import_react8.useState)(defaultValue ?? "");
  const [query, setQuery] = (0, import_react8.useState)("");
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
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  const handleSelect = (nextValue) => {
    if (value === void 0) setInternalValue(nextValue);
    onChange?.(nextValue);
    setIsOpen(false);
    setQuery("");
  };
  const displayValue = isOpen ? query : selectedOption?.label ?? "";
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("label", { className: "mb-1.5 block text-sm font-medium text-gray-300", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { ref: containerRef, className: "relative w-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
        "div",
        {
          className: "w-full bg-[#27272a] border border-[#3f3f46] focus-within:border-(--ui-primary) px-3 py-2 text-sm transition-colors flex items-center gap-2",
          style: getRadiusStyle(radius),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react8.Search, { size: 16, className: "text-gray-500 shrink-0" }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
              "input",
              {
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
                className: "w-full bg-transparent text-white outline-none placeholder:text-gray-500 disabled:opacity-60",
                style: { fontFamily: "var(--ui-font)" }
              }
            )
          ]
        }
      ),
      isOpen && !disabled && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        "div",
        {
          className: "absolute z-50 mt-2 w-full bg-[#18181b] border border-[#27272a] p-1.5 shadow-xl max-h-64 overflow-y-auto",
          style: getRadiusStyle(radius),
          children: filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "px-2.5 py-2 text-sm text-gray-500", children: emptyMessage }) : filteredOptions.map((option) => {
            const isSelected = option.value === selectedValue;
            return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
              "button",
              {
                type: "button",
                onClick: () => handleSelect(option.value),
                className: "w-full text-left px-2.5 py-2 rounded-md hover:bg-[#27272a] transition-colors flex items-start justify-between gap-2",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: `text-sm truncate ${isSelected ? "text-white font-medium" : "text-gray-200"}`, children: option.label }),
                    option.description && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "text-xs text-gray-500 mt-0.5 truncate", children: option.description })
                  ] }),
                  isSelected && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react8.Check, { size: 16, className: "mt-0.5 text-(--ui-primary) shrink-0" })
                ]
              },
              option.value
            );
          })
        }
      )
    ] })
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