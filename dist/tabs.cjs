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

// src/components/ui/tabs.tsx
var tabs_exports = {};
__export(tabs_exports, {
  Tabs: () => Tabs
});
module.exports = __toCommonJS(tabs_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var Tabs = ({
  items,
  variant = "underline",
  size = "md"
}) => {
  const [active, setActive] = (0, import_react.useState)(items[0]?.id ?? "");
  const instanceId = (0, import_react.useId)();
  const tabsRef = (0, import_react.useRef)([]);
  const activeItem = items.find((item) => item.id === active);
  const selectByIndex = (index) => {
    const nextIndex = (index + items.length) % items.length;
    const next = items[nextIndex];
    if (!next) return;
    setActive(next.id);
    tabsRef.current[nextIndex]?.focus();
  };
  const handleKeyDown = (event, index) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectByIndex(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectByIndex(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectByIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectByIndex(items.length - 1);
    }
  };
  const listClass = variant === "underline" ? "flex w-full border-b" : "flex w-fit max-w-full overflow-x-auto rounded-[var(--ui-radius)] border border-(--border) bg-(--bg-soft) p-0.5";
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-xs" : size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  const tabClass = (selected) => {
    if (variant === "underline") {
      return `-mb-px border-b-2 font-medium transition-colors ${sizeClass} ${selected ? "border-(--ui-primary) text-(--text)" : "border-transparent text-(--text-muted) hover:text-(--text)"}`;
    }
    return `shrink-0 rounded-[var(--ui-radius)] border-0 font-medium transition-colors ${sizeClass} ${selected ? "bg-(--surface) text-(--text) shadow-sm" : "text-(--text-muted) hover:text-(--text)"}`;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: listClass,
        style: variant === "underline" ? { borderColor: "color-mix(in srgb, var(--border) 50%, transparent)" } : void 0,
        role: "tablist",
        children: items.map((item, index) => {
          const selected = active === item.id;
          const tabId = `${instanceId}-${item.id}-tab`;
          const panelId = `${instanceId}-${item.id}-panel`;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              onClick: () => setActive(item.id),
              onKeyDown: (event) => handleKeyDown(event, index),
              ref: (node) => {
                tabsRef.current[index] = node;
              },
              id: tabId,
              role: "tab",
              "aria-selected": selected,
              "aria-controls": panelId,
              tabIndex: selected ? 0 : -1,
              className: tabClass(selected),
              children: item.label
            },
            item.id
          );
        })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        id: `${instanceId}-${activeItem?.id}-panel`,
        role: "tabpanel",
        "aria-labelledby": `${instanceId}-${activeItem?.id}-tab`,
        className: "px-2 py-2 text-(--text)",
        children: activeItem?.content
      }
    )
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tabs
});
//# sourceMappingURL=tabs.cjs.map