import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/calendar.tsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var Calendar = ({ radius = "md" }) => {
  const [currentDate, setCurrentDate] = useState(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = useState(/* @__PURE__ */ new Date());
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#18181b] border border-[#27272a] p-4 w-[280px] select-none", style: getRadiusStyle(radius), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("button", { type: "button", onClick: prevMonth, className: "p-1 hover:bg-[#27272a] rounded-md transition-colors text-white", children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16 }) }),
      /* @__PURE__ */ jsxs("span", { className: "font-medium text-sm text-white", children: [
        monthNames[currentDate.getMonth()],
        " ",
        currentDate.getFullYear()
      ] }),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: nextMonth, className: "p-1 hover:bg-[#27272a] rounded-md transition-colors text-white", children: /* @__PURE__ */ jsx(ChevronRight, { size: 16 }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 text-center mb-2", children: days.map((d) => /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-500 font-medium", children: d }, d)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-1 text-center", children: [
      [...Array(firstDayOfMonth)].map((_, i) => /* @__PURE__ */ jsx("div", {}, `empty-${i}`)),
      [...Array(daysInMonth)].map((_, i) => {
        const date = i + 1;
        const isSelected = selectedDate?.getDate() === date && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), date)),
            className: `w-8 h-8 mx-auto flex items-center justify-center text-sm transition-colors ${isSelected ? "text-white font-medium" : "hover:bg-[#27272a] text-gray-300"}`,
            style: { ...getRadiusStyle(radius), ...isSelected ? { background: "var(--ui-primary-bg)" } : {} },
            children: date
          },
          date
        );
      })
    ] })
  ] });
};

export {
  Calendar
};
//# sourceMappingURL=chunk-Z5F73NYC.js.map