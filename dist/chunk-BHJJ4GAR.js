import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/sidebar.tsx
import React from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var SidebarContext = React.createContext({ collapsed: false });
var Sidebar = ({
  children,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  width = 264,
  className = "",
  "aria-label": ariaLabel = "Sidebar"
}) => /* @__PURE__ */ jsx(SidebarContext.Provider, { value: { collapsed }, children: /* @__PURE__ */ jsxs(
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
      /* @__PURE__ */ jsxs("div", { className: `flex h-14 shrink-0 items-center gap-1 ${collapsed ? "justify-center px-2" : "px-3"}`, children: [
        !collapsed && /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1", children: header }),
        onCollapsedChange && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onCollapsedChange(!collapsed),
            "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
            className: "shrink-0 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35",
            children: collapsed ? /* @__PURE__ */ jsx(PanelLeftOpen, { size: 16 }) : /* @__PURE__ */ jsx(PanelLeftClose, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: `min-h-0 flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-2"}`, children }),
      footer && /* @__PURE__ */ jsx("div", { className: `shrink-0 ${collapsed ? "p-2" : "p-3"}`, style: { borderTop: "0.5px solid var(--border)" }, children: footer })
    ]
  }
) });
var SidebarSection = ({ title, action, children }) => {
  const { collapsed } = React.useContext(SidebarContext);
  return /* @__PURE__ */ jsxs("section", { className: "py-2", children: [
    title && !collapsed && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-2 pb-1", children: [
      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)", children: title }),
      action
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5", children })
  ] });
};
var SidebarItem = ({ children, icon, active = false, meta, actions, onClick, href, radius = "md" }) => {
  const { collapsed } = React.useContext(SidebarContext);
  const Tag = href ? "a" : "button";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group relative flex items-center",
      style: { ...getRadiusStyle(radius), backgroundColor: active ? "var(--hover)" : void 0 },
      children: [
        /* @__PURE__ */ jsxs(
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
              icon && /* @__PURE__ */ jsx("span", { className: `shrink-0 ${active ? "text-(--ui-primary)" : "text-(--text-muted)"}`, children: icon }),
              !collapsed && /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("span", { className: `block truncate leading-tight ${active ? "font-medium" : ""}`, children }),
                meta && /* @__PURE__ */ jsx("span", { className: "mt-0.5 block truncate text-[10px] text-(--text-muted)", children: meta })
              ] })
            ]
          }
        ),
        actions && !collapsed && /* @__PURE__ */ jsx("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 [&:has([aria-expanded=true])]:opacity-100", children: actions })
      ]
    }
  );
};

export {
  Sidebar,
  SidebarSection,
  SidebarItem
};
//# sourceMappingURL=chunk-BHJJ4GAR.js.map