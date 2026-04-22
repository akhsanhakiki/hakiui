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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} role="presentation" />
      <div
        className="relative bg-[#18181b] border border-[#27272a] w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col text-white"
        style={{ borderRadius: "var(--ui-radius)", fontFamily: "var(--ui-font)" }}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#27272a]">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
