import React, { type ReactNode } from "react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export const Table = ({ children, radius = "lg" }: { children: ReactNode; radius?: Radius }) => (
  <div className="w-full overflow-hidden border border-[#27272a] bg-[#18181b]" style={getRadiusStyle(radius)}>
    <table className="w-full text-left border-collapse">{children}</table>
  </div>
);

export const TableHeader = ({ children }: { children: ReactNode }) => (
  <thead className="bg-[#27272a]/40 text-gray-400 text-sm">
    <tr className="border-b border-[#27272a]">{children}</tr>
  </thead>
);

export const TableColumn = ({ children }: { children: ReactNode }) => <th className="px-4 py-3 font-medium font-sans">{children}</th>;
export const TableBody = ({ children }: { children: ReactNode }) => <tbody className="text-sm text-gray-300">{children}</tbody>;
export const TableRow = ({ children }: { children: ReactNode }) => <tr className="border-b border-[#27272a] last:border-0 hover:bg-[#27272a]/20 transition-colors">{children}</tr>;
export const TableCell = ({ children }: { children: ReactNode }) => <td className="px-4 py-3">{children}</td>;
