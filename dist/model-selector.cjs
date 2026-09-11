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

// src/components/ui/model-selector.tsx
var model_selector_exports = {};
__export(model_selector_exports, {
  ModelSelector: () => ModelSelector
});
module.exports = __toCommonJS(model_selector_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/model-selector.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var ModelSelector = ({
  options,
  value,
  onChange,
  placement = "top",
  icon,
  size = "sm",
  radius = "full",
  disabled = false,
  className = ""
}) => {
  const id = (0, import_react.useId)();
  const [open, setOpen] = (0, import_react.useState)(false);
  const [index, setIndex] = (0, import_react.useState)(() => Math.max(0, options.findIndex((o) => o.value === value)));
  const rootRef = (0, import_react.useRef)(null);
  const current = options.find((o) => o.value === value);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const pick = (o) => {
    if (o.disabled) return;
    onChange(o.value);
    setOpen(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rootRef, className: `relative inline-block ${className}`, style: { fontFamily: "var(--ui-font)" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        type: "button",
        disabled,
        onClick: () => setOpen((o) => !o),
        "aria-haspopup": "listbox",
        "aria-expanded": open,
        "aria-controls": id,
        className: `inline-flex items-center gap-1.5 font-medium transition-colors hover:bg-(--hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35 disabled:opacity-50 ${size === "sm" ? "h-7 px-2 text-[11px]" : "h-8 px-2.5 text-xs"}`,
        style: { ...getRadiusStyle(radius), color: "var(--text)", backgroundColor: "var(--bg-soft)", border: "0.5px solid var(--border)" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-(--ui-primary)", children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Sparkles, { size: size === "sm" ? 12 : 13 }) }),
          current?.label ?? "Model",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronDown, { size: 12, className: `text-(--text-muted) transition-transform ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "ul",
      {
        id,
        role: "listbox",
        tabIndex: -1,
        ref: (el) => el?.focus(),
        "aria-activedescendant": `${id}-${index}`,
        onKeyDown: (e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setIndex((i) => (i + 1) % options.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setIndex((i) => (i - 1 + options.length) % options.length);
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            pick(options[index]);
          }
        },
        className: `absolute left-0 z-50 m-0 w-64 list-none p-1 shadow-lg outline-none ${placement === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5"}`,
        style: { ...getRadiusStyle("md"), backgroundColor: "var(--surface)", border: "0.5px solid var(--border)", outline: "0.5px solid var(--border)", outlineOffset: 0 },
        children: options.map((o, i) => {
          const selected = o.value === value;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "li",
            {
              id: `${id}-${i}`,
              role: "option",
              "aria-selected": selected,
              "aria-disabled": o.disabled,
              onMouseEnter: () => setIndex(i),
              onClick: () => pick(o),
              className: `flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-xs ${o.disabled ? "cursor-not-allowed opacity-50" : ""}`,
              style: { backgroundColor: i === index ? "var(--hover)" : "transparent", color: "var(--text)" },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium", children: o.label }),
                    o.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rounded-full px-1.5 text-[10px] font-medium", style: { backgroundColor: "color-mix(in srgb, var(--ui-primary) 12%, transparent)", color: "var(--ui-primary)" }, children: o.badge })
                  ] }),
                  o.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 block text-[11px] leading-4 text-(--text-muted)", children: o.description })
                ] }),
                selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { size: 14, className: "mt-0.5 shrink-0 text-(--ui-primary)" })
              ]
            },
            o.value
          );
        })
      }
    )
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ModelSelector
});
//# sourceMappingURL=model-selector.cjs.map