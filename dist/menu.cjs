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

// src/components/ui/menu.tsx
var menu_exports = {};
__export(menu_exports, {
  Menu: () => Menu
});
module.exports = __toCommonJS(menu_exports);
var import_react = require("react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/kbd.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Kbd = ({ keys, children, size = "sm", className = "" }) => {
  const caps = keys ?? (children !== void 0 ? [children] : []);
  const cap = size === "sm" ? "min-w-4 px-1 text-[10px] leading-4" : "min-w-5 px-1.5 text-[11px] leading-5";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-flex items-center gap-0.5 ${className}`, "aria-label": keys?.join(" "), children: caps.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "kbd",
    {
      className: `inline-flex items-center justify-center rounded font-medium tabular-nums ${cap}`,
      style: {
        fontFamily: "var(--ui-font)",
        color: "var(--text-muted)",
        backgroundColor: "var(--bg-soft)",
        border: "0.5px solid var(--border)",
        boxShadow: "inset 0 -1px 0 var(--border)"
      },
      children: k
    },
    i
  )) });
};

// src/components/ui/menu.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var isAction = (i) => "onSelect" in i;
var Menu = ({ items, trigger, placement = "bottom-end", radius = "md", className = "" }) => {
  const id = (0, import_react.useId)();
  const [open, setOpen] = (0, import_react.useState)(false);
  const [index, setIndex] = (0, import_react.useState)(-1);
  const rootRef = (0, import_react.useRef)(null);
  const triggerRef = (0, import_react.useRef)(null);
  const actions = items.map((it, i) => isAction(it) && !it.disabled ? i : -1).filter((i) => i >= 0);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (open) setIndex(actions[0] ?? -1);
  }, [open]);
  const move = (dir) => {
    if (actions.length === 0) return;
    const at = actions.indexOf(index);
    const next = actions[(at + dir + actions.length) % actions.length];
    setIndex(next);
  };
  const vertical = placement.startsWith("top") ? "bottom-full mb-1" : "top-full mt-1";
  const horizontal = placement.endsWith("end") ? "right-0" : "left-0";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: rootRef, className: `relative inline-block ${className}`, children: [
    trigger({
      ref: triggerRef,
      onClick: () => setOpen((o) => !o),
      "aria-haspopup": "menu",
      "aria-expanded": open,
      "aria-controls": id
    }),
    open && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        id,
        role: "menu",
        tabIndex: -1,
        onKeyDown: (e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            move(1);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            move(-1);
          } else if ((e.key === "Enter" || e.key === " ") && index >= 0) {
            e.preventDefault();
            const it = items[index];
            if (isAction(it)) {
              it.onSelect();
              setOpen(false);
            }
          }
        },
        ref: (el) => el?.focus(),
        className: `absolute z-50 min-w-48 p-1 shadow-lg outline-none ${vertical} ${horizontal}`,
        style: {
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          backgroundColor: "var(--surface)",
          border: "0.5px solid var(--border)",
          outline: "0.5px solid var(--border)",
          outlineOffset: 0
        },
        children: items.map((it, i) => {
          if ("separator" in it) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { role: "separator", className: "my-1 h-px", style: { background: "var(--border)" } }, i);
          if ("heading" in it) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "px-2 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)", children: it.heading }, i);
          const focused = i === index;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "button",
            {
              type: "button",
              role: "menuitem",
              disabled: it.disabled,
              tabIndex: -1,
              onMouseEnter: () => setIndex(i),
              onClick: () => {
                it.onSelect();
                setOpen(false);
              },
              className: "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              style: {
                backgroundColor: focused ? "var(--hover)" : "transparent",
                color: it.danger ? "var(--ui-danger, #D03B3B)" : "var(--text)"
              },
              children: [
                it.icon && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "shrink-0 text-(--text-muted)", style: it.danger ? { color: "inherit" } : void 0, children: it.icon }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block truncate font-medium", children: it.label }),
                  it.description && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "block truncate text-[11px] text-(--text-muted)", children: it.description })
                ] }),
                it.shortcut && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Kbd, { keys: it.shortcut })
              ]
            },
            i
          );
        })
      }
    )
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Menu
});
//# sourceMappingURL=menu.cjs.map