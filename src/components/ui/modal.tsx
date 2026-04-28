import React, { type ReactNode } from "react";
import { X } from "lucide-react";
import { getRadiusStyle } from "../../lib/radius";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  const panelShell: React.CSSProperties = {
    ...getRadiusStyle("md"),
    fontFamily: "var(--ui-font)",
    backgroundColor: "var(--bg-soft)",
    color: "var(--text)",
    border: "0.5px solid var(--border)",
    outline: "0.5px solid var(--border)",
    outlineOffset: 0,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />
      <div
        className="relative flex w-full max-w-md min-h-0 flex-col overflow-hidden text-(--text) shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={panelShell}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header
          className="flex shrink-0 items-center gap-3 px-4 py-3"
          style={{ borderBottom: "0.5px solid var(--border)" }}
        >
          <h3 id="modal-title" className="min-w-0 flex-1 truncate text-base font-semibold">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="flex shrink-0 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-(--hover) hover:text-(--text)"
            aria-label="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">{children}</div>
      </div>
    </div>
  );
};
