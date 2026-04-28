import React, { type ReactNode } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export interface TableProps {
  children: ReactNode;
  radius?: Radius;
  variant?: "default" | "rounded";
}

export const Table = ({
  children,
  radius = "lg",
  variant = "default",
}: TableProps) => (
  <div
    className="w-full overflow-hidden"
    style={{
      ...getRadiusStyle(variant === "rounded" ? "full" : radius),
      backgroundColor: "color-mix(in srgb, var(--bg-soft) 30%, transparent)",
      border: "0.5px solid var(--border)",
      outline: "0.5px solid var(--border)",
      outlineOffset: 0,
    }}
  >
    <table className="w-full text-left border-collapse">{children}</table>
  </div>
);

export const TableHeader = ({ children }: { children: ReactNode }) => (
  <thead
    className="text-(--text-muted) text-xs"
    style={{
      backgroundColor: "color-mix(in srgb, var(--bg-soft) 60%, transparent)",
    }}
  >
    <tr className="border-b" style={{ borderColor: "var(--border)" }}>
      {children}
    </tr>
  </thead>
);

export const TableColumn = ({ children }: { children: ReactNode }) => (
  <th className="px-4 py-2 font-medium font-sans">{children}</th>
);
export const TableBody = ({ children }: { children: ReactNode }) => (
  <tbody className="text-sm text-(--text)">{children}</tbody>
);
export const TableRow = ({ children }: { children: ReactNode }) => (
  <tr
    className="border-b transition-colors hover:bg-(--hover) last:border-0"
    style={{ borderColor: "var(--border)" }}
  >
    {children}
  </tr>
);
export const TableCell = ({ children }: { children: ReactNode }) => (
  <td className="px-4 py-3">{children}</td>
);
