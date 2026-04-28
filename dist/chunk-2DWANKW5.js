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
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const prevMonth = () => setCurrentDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  );
  const nextMonth = () => setCurrentDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  );
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "w-[280px] select-none border border-(--border) bg-(--surface) p-4",
      style: getRadiusStyle(radius),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: prevMonth,
              className: "rounded-md p-1 text-(--text) transition-colors hover:bg-(--hover)",
              children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-(--text)", children: [
            monthNames[currentDate.getMonth()],
            " ",
            currentDate.getFullYear()
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: nextMonth,
              className: "rounded-md p-1 text-(--text) transition-colors hover:bg-(--hover)",
              children: /* @__PURE__ */ jsx(ChevronRight, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 text-center mb-2", children: days.map((d) => /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-(--text-muted)", children: d }, d)) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-7 gap-1 text-center", children: [
          [...Array(firstDayOfMonth)].map((_, i) => /* @__PURE__ */ jsx("div", {}, `empty-${i}`)),
          [...Array(daysInMonth)].map((_, i) => {
            const date = i + 1;
            const isSelected = selectedDate?.getDate() === date && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setSelectedDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    date
                  )
                ),
                className: `mx-auto flex h-8 w-8 items-center justify-center text-sm transition-colors ${isSelected ? "font-medium text-white" : "text-(--text) hover:bg-(--hover)"}`,
                style: {
                  ...getRadiusStyle(radius),
                  ...isSelected ? { background: "var(--ui-primary-bg)" } : {}
                },
                children: date
              },
              date
            );
          })
        ] })
      ]
    }
  );
};

export {
  Calendar
};
//# sourceMappingURL=chunk-2DWANKW5.js.map