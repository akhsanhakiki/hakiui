import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/tooltip.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var Tooltip = ({
  content,
  position = "top",
  children
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative group flex items-center justify-center", children: [
    children,
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `pointer-events-none absolute z-50 whitespace-nowrap bg-(--surface) px-2.5 py-1.5 text-xs text-(--text) opacity-0 transition-opacity group-hover:opacity-100 ${positionClasses[position]}`,
        style: getRadiusStyle("sm"),
        children: content
      }
    )
  ] });
};

export {
  Tooltip
};
//# sourceMappingURL=chunk-QCW2N7DQ.js.map