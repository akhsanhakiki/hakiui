import React, { type ReactNode } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface SidebarProps {
  children: ReactNode;
  /** Brand / new-chat area at the top. */
  header?: ReactNode;
  /** Account / settings area pinned to the bottom. */
  footer?: ReactNode;
  /** Rail mode: 56px wide, items show icons only. */
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  width?: number;
  className?: string;
  "aria-label"?: string;
}

interface SidebarContextValue {
  collapsed: boolean;
}
const SidebarContext = React.createContext<SidebarContextValue>({ collapsed: false });

/**
 * The app-shell navigation column of an AI product: brand + new chat on top,
 * grouped history in the middle, account at the bottom. Collapses to an
 * icon rail. Children are `SidebarSection`s of `SidebarItem`s.
 */
export const Sidebar = ({
  children,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  width = 264,
  className = "",
  "aria-label": ariaLabel = "Sidebar",
}: SidebarProps) => (
  <SidebarContext.Provider value={{ collapsed }}>
    <aside
      aria-label={ariaLabel}
      className={`flex h-full min-h-0 shrink-0 flex-col transition-[width] duration-200 ease-out motion-reduce:transition-none ${className}`}
      style={{
        width: collapsed ? 56 : width,
        fontFamily: "var(--ui-font)",
        backgroundColor: "var(--bg-soft)",
        color: "var(--text)",
        borderRight: "0.5px solid var(--border)",
      }}
    >
      <div className={`flex h-14 shrink-0 items-center gap-1 ${collapsed ? "justify-center px-2" : "px-3"}`}>
        {!collapsed && <div className="min-w-0 flex-1">{header}</div>}
        {onCollapsedChange && (
          <button
            type="button"
            onClick={() => onCollapsedChange(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="shrink-0 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35"
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
        )}
      </div>
      <div className={`min-h-0 flex-1 overflow-y-auto ${collapsed ? "px-2" : "px-2"}`}>{children}</div>
      {footer && (
        <div className={`shrink-0 ${collapsed ? "p-2" : "p-3"}`} style={{ borderTop: "0.5px solid var(--border)" }}>
          {footer}
        </div>
      )}
    </aside>
  </SidebarContext.Provider>
);

export interface SidebarSectionProps {
  /** Group title, e.g. "Pinned", "Today". Hidden in rail mode. */
  title?: string;
  action?: ReactNode;
  children: ReactNode;
}

export const SidebarSection = ({ title, action, children }: SidebarSectionProps) => {
  const { collapsed } = React.useContext(SidebarContext);
  return (
    <section className="py-2">
      {title && !collapsed && (
        <div className="flex items-center justify-between px-2 pb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-(--text-muted)">{title}</span>
          {action}
        </div>
      )}
      <div className="flex flex-col gap-0.5">{children}</div>
    </section>
  );
};

export interface SidebarItemProps {
  children: ReactNode;
  icon?: ReactNode;
  active?: boolean;
  /** Secondary line, e.g. a relative date. Hidden in rail mode. */
  meta?: ReactNode;
  /** Hover-revealed controls, e.g. a Menu. */
  actions?: ReactNode;
  onClick?: () => void;
  href?: string;
  radius?: Radius;
}

export const SidebarItem = ({ children, icon, active = false, meta, actions, onClick, href, radius = "md" }: SidebarItemProps) => {
  const { collapsed } = React.useContext(SidebarContext);
  const Tag = href ? "a" : "button";
  return (
    <div
      className="group relative flex items-center"
      style={{ ...getRadiusStyle(radius), backgroundColor: active ? "var(--hover)" : undefined }}
    >
      <Tag
        href={href}
        type={href ? undefined : "button"}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        title={collapsed && typeof children === "string" ? children : undefined}
        className={`flex min-w-0 flex-1 items-center gap-2.5 text-left text-xs transition-colors hover:bg-(--hover) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ui-primary)/35 ${collapsed ? "justify-center px-0 py-2" : "px-2 py-2"}`}
        style={{ ...getRadiusStyle(radius), color: "var(--text)" }}
      >
        {icon && <span className={`shrink-0 ${active ? "text-(--ui-primary)" : "text-(--text-muted)"}`}>{icon}</span>}
        {!collapsed && (
          <span className="min-w-0 flex-1">
            <span className={`block truncate leading-tight ${active ? "font-medium" : ""}`}>{children}</span>
            {meta && <span className="mt-0.5 block truncate text-[10px] text-(--text-muted)">{meta}</span>}
          </span>
        )}
      </Tag>
      {actions && !collapsed && (
        <span className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100 [&:has([aria-expanded=true])]:opacity-100">
          {actions}
        </span>
      )}
    </div>
  );
};
