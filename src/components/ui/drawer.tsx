import React, { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  /** Edge the drawer slides in from. Defaults to "left". */
  side?: DrawerSide;
  /** Panel width (left/right) or height (top/bottom). Defaults to "320px". */
  size?: string;
  title?: ReactNode;
  children: ReactNode;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  className?: string;
}

const edgePosition: Record<DrawerSide, string> = {
  left: "inset-y-0 left-0",
  right: "inset-y-0 right-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

const edgeBorder: Record<DrawerSide, React.CSSProperties> = {
  left: { borderRight: "0.5px solid var(--border)" },
  right: { borderLeft: "0.5px solid var(--border)" },
  top: { borderBottom: "0.5px solid var(--border)" },
  bottom: { borderTop: "0.5px solid var(--border)" },
};

const closedTransform: Record<DrawerSide, string> = {
  left: "-translate-x-full",
  right: "translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

const isHorizontal = (side: DrawerSide) => side === "left" || side === "right";

export const Drawer = ({
  isOpen,
  onClose,
  side = "left",
  size = "320px",
  title,
  children,
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = "",
}: DrawerProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const horizontal = isHorizontal(side);
  const panelShell: React.CSSProperties = {
    fontFamily: "var(--ui-font)",
    backgroundColor: "var(--bg-soft)",
    color: "var(--text)",
    ...(horizontal
      ? { width: size, maxWidth: "85vw" }
      : { height: size, maxHeight: "85vh" }),
    ...edgeBorder[side],
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeOnOverlayClick ? onClose : undefined}
        role="presentation"
      />
      <div
        className={`absolute flex flex-col shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none ${edgePosition[side]} ${
          isOpen ? "translate-x-0 translate-y-0" : closedTransform[side]
        } ${className}`}
        style={panelShell}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "drawer-title" : undefined}
      >
        {(title || showCloseButton) && (
          <header
            className="flex shrink-0 items-center gap-3 px-4 py-3"
            style={{ borderBottom: "0.5px solid var(--border)" }}
          >
            {title && (
              <h3
                id="drawer-title"
                className="min-w-0 flex-1 truncate text-base font-semibold"
              >
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="flex shrink-0 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text)"
                aria-label="Close"
              >
                <X size={18} strokeWidth={2} />
              </button>
            )}
          </header>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};
