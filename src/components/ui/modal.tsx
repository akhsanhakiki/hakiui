import React, { type ReactNode } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />
      <div
        className="relative flex w-full max-w-md flex-col border border-(--border) bg-(--surface) text-(--text) shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{
          borderRadius: "var(--ui-radius)",
          fontFamily: "var(--ui-font)",
        }}
      >
        <div className="flex items-center justify-between border-b border-(--border) p-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-(--text-muted) transition-colors hover:text-(--text)"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
