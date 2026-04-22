import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getRadiusStyle, type Radius } from "../../lib/radius";

export const Calendar = ({ radius = "md" }: { radius?: Radius }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="bg-[#18181b] border border-[#27272a] p-4 w-[280px] select-none" style={getRadiusStyle(radius)}>
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-1 hover:bg-[#27272a] rounded-md transition-colors text-white"><ChevronLeft size={16} /></button>
        <span className="font-medium text-sm text-white">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button type="button" onClick={nextMonth} className="p-1 hover:bg-[#27272a] rounded-md transition-colors text-white"><ChevronRight size={16} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map((d) => <div key={d} className="text-xs text-gray-500 font-medium">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const date = i + 1;
          const isSelected = selectedDate?.getDate() === date && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();
          return (
            <button
              type="button"
              key={date}
              onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), date))}
              className={`w-8 h-8 mx-auto flex items-center justify-center text-sm transition-colors ${isSelected ? "text-white font-medium" : "hover:bg-[#27272a] text-gray-300"}`}
              style={{ ...getRadiusStyle(radius), ...(isSelected ? { background: "var(--ui-primary-bg)" } : {}) }}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
};
