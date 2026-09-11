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

// src/components/ui/sidebar.tsx
var sidebar_exports = {};
__export(sidebar_exports, {
  Sidebar: () => Sidebar,
  SidebarItem: () => SidebarItem,
  SidebarSection: () => SidebarSection
});
module.exports = __toCommonJS(sidebar_exports);
var import_react = __toESM(require("react"), 1);
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/sidebar.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var SidebarContext = import_react.default.createContext({ collapsed: false });
var Sidebar = ({
  children,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  width = 264,
  className = "",
  "aria-label": ariaLabel = "Sidebar"
}) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, { value: { collapsed }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
  "aside",
  {
    "aria-label": ariaLabel,
    className: `flex h-full min-h-0 shrink-0 flex-col transition-[width] duration-200 ease-out motion-reduce:transition-none ${className}`,
    style: {
      width: collapsed ? 56 : width,
      fontFamily: "var(--ui-font)",
      backgroundColor: "var(--bg-soft)",
      color: "var(--text)",
      borderRight: "0.5px solid var(--border)"
    },
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `flex h-14 shrink-0 items-center gap-1 ${collapsed ? "justify-center px-2" : "px-3"}`, children: [
        !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-0 flex-1", children: header }),
        onCollapsedChange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            onClick: () => onCollapsedChange(!collapsed),
            "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
            className: "shrink-0 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
            children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.PanelLeftOpen, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.PanelLeftClose, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `min-h-0 flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-2"}`, children }),
      footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `shrink-0 ${collapsed ? "p-2" : "p-3"}`, style: { borderTop: "0.5px solid var(--border)" }, children: footer })
    ]
  }
) });
var SidebarSection = ({ title, action, children }) => {
  const { collapsed } = import_react.default.useContext(SidebarContext);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "py-2", children: [
    title && !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between px-2 pb-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)", children: title }),
      action
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-0.5", children })
  ] });
};
var SidebarItem = ({ children, icon, active = false, meta, actions, onClick, href, radius = "md" }) => {
  const { collapsed } = import_react.default.useContext(SidebarContext);
  const Tag = href ? "a" : "button";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "group relative flex items-center",
      style: { ...getRadiusStyle(radius), backgroundColor: active ? "var(--hover)" : void 0 },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          Tag,
          {
            href,
            type: href ? void 0 : "button",
            onClick,
            "aria-current": active ? "page" : void 0,
            title: collapsed && typeof children === "string" ? children : void 0,
            className: `flex min-w-0 flex-1 items-center gap-2.5 text-left text-xs transition-colors hover:bg-(--hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35 ${collapsed ? "justify-center px-0 py-2" : "px-2 py-2"}`,
            style: { ...getRadiusStyle(radius), color: "var(--text)" },
            children: [
              icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `shrink-0 ${active ? "text-(--ui-primary)" : "text-(--text-muted)"}`, children: icon }),
              !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block truncate leading-tight ${active ? "font-medium" : ""}`, children }),
                meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-0.5 block truncate text-[10px] text-(--text-muted)", children: meta })
              ] })
            ]
          }
        ),
        actions && !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 [&:has([aria-expanded=true])]:opacity-100", children: actions })
      ]
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Sidebar,
  SidebarItem,
  SidebarSection
});
//# sourceMappingURL=sidebar.cjs.map