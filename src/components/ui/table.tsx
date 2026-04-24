import React, { type ReactNode } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export const Table = ({
  children,
  radius = "lg",
}: {
  children: ReactNode;
  radius?: Radius;
}) => (
  <div
    className="w-full overflow-hidden border border-(--border) bg-(--surface)"
    style={getRadiusStyle(radius)}
  >
    <table className="w-full text-left border-collapse">{children}</table>
  </div>
);

export const TableHeader = ({ children }: { children: ReactNode }) => (
  <thead className="bg-(--bg-soft) text-(--text-muted) text-sm">
    <tr className="border-b border-(--border)">{children}</tr>
  </thead>
);

export const TableColumn = ({ children }: { children: ReactNode }) => (
  <th className="px-4 py-3 font-medium font-sans">{children}</th>
);
export const TableBody = ({ children }: { children: ReactNode }) => (
  <tbody className="text-sm text-(--text)">{children}</tbody>
);
export const TableRow = ({ children }: { children: ReactNode }) => (
  <tr className="border-b border-(--border) transition-colors hover:bg-(--hover) last:border-0">
    {children}
  </tr>
);
export const TableCell = ({ children }: { children: ReactNode }) => (
  <td className="px-4 py-3">{children}</td>
);
