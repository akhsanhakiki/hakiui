"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/calendar.tsx
var calendar_exports = {};
__export(calendar_exports, {
  Calendar: () => Calendar
});
module.exports = __toCommonJS(calendar_exports);
var import_react = require("react");
var import_lucide_react = require("lucide-react");

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/calendar.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Calendar = ({ radius = "md" }) => {
  const [currentDate, setCurrentDate] = (0, import_react.useState)(/* @__PURE__ */ new Date());
  const [selectedDate, setSelectedDate] = (0, import_react.useState)(/* @__PURE__ */ new Date());
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "w-[280px] select-none border border-(--border) bg-(--surface) p-4",
      style: getRadiusStyle(radius),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              onClick: prevMonth,
              className: "rounded-md p-1 text-(--text) transition-colors hover:bg-(--hover)",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronLeft, { size: 16 })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-sm font-medium text-(--text)", children: [
            monthNames[currentDate.getMonth()],
            " ",
            currentDate.getFullYear()
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              onClick: nextMonth,
              className: "rounded-md p-1 text-(--text) transition-colors hover:bg-(--hover)",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { size: 16 })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-7 gap-1 text-center mb-2", children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-medium text-(--text-muted)", children: d }, d)) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-7 gap-1 text-center", children: [
          [...Array(firstDayOfMonth)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `empty-${i}`)),
          [...Array(daysInMonth)].map((_, i) => {
            const date = i + 1;
            const isSelected = selectedDate?.getDate() === date && selectedDate?.getMonth() === currentDate.getMonth() && selectedDate?.getFullYear() === currentDate.getFullYear();
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Calendar
});
//# sourceMappingURL=calendar.cjs.map