import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export const Calendar = ({ radius = "md" }: { radius?: Radius }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
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
    "December",
  ];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div
      className="w-[280px] select-none border border-(--border) bg-(--surface) p-4"
      style={getRadiusStyle(radius)}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded-md p-1 text-(--text) transition-colors hover:bg-(--hover)"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium text-(--text)">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="rounded-md p-1 text-(--text) transition-colors hover:bg-(--hover)"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map((d) => (
          <div key={d} className="text-xs font-medium text-(--text-muted)">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {[...Array(daysInMonth)].map((_, i) => {
          const date = i + 1;
          const isSelected =
            selectedDate?.getDate() === date &&
            selectedDate?.getMonth() === currentDate.getMonth() &&
            selectedDate?.getFullYear() === currentDate.getFullYear();
          return (
            <button
              type="button"
              key={date}
              onClick={() =>
                setSelectedDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    date,
                  ),
                )
              }
              className={`mx-auto flex h-8 w-8 items-center justify-center text-sm transition-colors ${isSelected ? "font-medium text-white" : "text-(--text) hover:bg-(--hover)"}`}
              style={{
                ...getRadiusStyle(radius),
                ...(isSelected ? { background: "var(--ui-primary-bg)" } : {}),
              }}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
};
