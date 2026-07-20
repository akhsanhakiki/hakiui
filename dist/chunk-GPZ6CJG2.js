// src/components/ui/spinner.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var SIZES = { sm: 16, md: 22, lg: 30 };
var Spinner = ({
  size = "md",
  color = "primary",
  label = "Loading",
  className = ""
}) => {
  const px = SIZES[size];
  const stroke = color === "primary" ? "var(--ui-primary)" : "currentColor";
  return /* @__PURE__ */ jsx(
    "span",
    {
      role: "status",
      "aria-label": label,
      className: `inline-flex ${className}`,
      children: /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "animate-spin",
          width: px,
          height: px,
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": true,
          children: [
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: "12",
                cy: "12",
                r: "10",
                stroke,
                strokeOpacity: "0.25",
                strokeWidth: "3"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M22 12a10 10 0 0 0-10-10",
                stroke,
                strokeWidth: "3",
                strokeLinecap: "round"
              }
            )
          ]
        }
      )
    }
  );
};

export {
  Spinner
};
//# sourceMappingURL=chunk-GPZ6CJG2.js.map