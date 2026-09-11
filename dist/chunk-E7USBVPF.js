import {
  Kbd
} from "./chunk-ZQ2TYFPF.js";
import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/menu.tsx
import { useEffect, useId, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var isAction = (i) => "onSelect" in i;
var Menu = ({ items, trigger, placement = "bottom-end", radius = "md", className = "" }) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const actions = items.map((it, i) => isAction(it) && !it.disabled ? i : -1).filter((i) => i >= 0);
  useEffect(() => {
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
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { ref: rootRef, className: `relative inline-block ${className}`, children: [
    trigger({
      ref: triggerRef,
      onClick: () => setOpen((o) => !o),
      "aria-haspopup": "menu",
      "aria-expanded": open,
      "aria-controls": id
    }),
    open && /* @__PURE__ */ jsx(
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
          if ("separator" in it) return /* @__PURE__ */ jsx("div", { role: "separator", className: "my-1 h-px", style: { background: "var(--border)" } }, i);
          if ("heading" in it) return /* @__PURE__ */ jsx("div", { className: "px-2 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)", children: it.heading }, i);
          const focused = i === index;
          return /* @__PURE__ */ jsxs(
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
                it.icon && /* @__PURE__ */ jsx("span", { className: "shrink-0 text-(--text-muted)", style: it.danger ? { color: "inherit" } : void 0, children: it.icon }),
                /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "block truncate font-medium", children: it.label }),
                  it.description && /* @__PURE__ */ jsx("span", { className: "block truncate text-[11px] text-(--text-muted)", children: it.description })
                ] }),
                it.shortcut && /* @__PURE__ */ jsx(Kbd, { keys: it.shortcut })
              ]
            },
            i
          );
        })
      }
    )
  ] });
};

export {
  Menu
};
//# sourceMappingURL=chunk-E7USBVPF.js.map