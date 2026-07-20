import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/skeleton.tsx
import { jsx } from "react/jsx-runtime";
var Skeleton = ({
  variant = "rect",
  width,
  height,
  radius = "md",
  className = ""
}) => {
  const defaults = variant === "text" ? { width: "100%", height: 12 } : variant === "circle" ? { width: 40, height: 40 } : { width: "100%", height: 20 };
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": true,
      className: `block animate-pulse ${className}`,
      style: {
        ...variant === "circle" ? { borderRadius: "9999px" } : getRadiusStyle(variant === "text" ? "sm" : radius),
        width: width ?? defaults.width,
        height: height ?? defaults.height,
        backgroundColor: "var(--hover)"
      }
    }
  );
};

export {
  Skeleton
};
//# sourceMappingURL=chunk-ZBAUYCI4.js.map