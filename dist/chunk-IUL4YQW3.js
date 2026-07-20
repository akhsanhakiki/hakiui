import {
  getRadiusStyle
} from "./chunk-H5DXVADS.js";

// src/components/ui/avatar.tsx
import React, { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var SIZE_META = {
  sm: { box: "h-7 w-7", text: "text-[10px]", px: 28 },
  md: { box: "h-9 w-9", text: "text-xs", px: 36 },
  lg: { box: "h-11 w-11", text: "text-sm", px: 44 },
  xl: { box: "h-14 w-14", text: "text-base", px: 56 }
};
var initialsOf = (name) => name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
var Avatar = ({
  src,
  alt,
  name = "",
  size = "md",
  radius = "full",
  className = ""
}) => {
  const [failed, setFailed] = useState(false);
  const meta = SIZE_META[size];
  const showImage = !!src && !failed;
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `inline-flex shrink-0 select-none items-center justify-center overflow-hidden font-medium ${meta.box} ${meta.text} ${className}`,
      style: {
        ...getRadiusStyle(radius),
        fontFamily: "var(--ui-font)",
        backgroundColor: showImage ? "var(--bg-soft)" : "color-mix(in srgb, var(--ui-primary) 14%, var(--bg-soft))",
        color: "var(--ui-primary)",
        border: "0.5px solid var(--border)"
      },
      children: showImage ? /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: alt ?? name,
          className: "h-full w-full object-cover",
          onError: () => setFailed(true)
        }
      ) : name ? initialsOf(name) : /* @__PURE__ */ jsx(
        "svg",
        {
          viewBox: "0 0 24 24",
          width: meta.px * 0.55,
          height: meta.px * 0.55,
          fill: "currentColor",
          "aria-hidden": true,
          children: /* @__PURE__ */ jsx("path", { d: "M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4 0-8 2-8 5.5V21h16v-1.5c0-3.5-4-5.5-8-5.5Z" })
        }
      )
    }
  );
};
var AvatarGroup = ({
  children,
  max = 4,
  size = "md",
  radius = "full",
  className = ""
}) => {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const hidden = items.length - visible.length;
  const meta = SIZE_META[size];
  return /* @__PURE__ */ jsxs("div", { className: `flex items-center ${className}`, children: [
    visible.map((child, i) => /* @__PURE__ */ jsx(
      "span",
      {
        className: i > 0 ? "-ml-2.5" : "",
        style: {
          borderRadius: "9999px",
          boxShadow: "0 0 0 2px var(--bg)"
        },
        children: child
      },
      i
    )),
    hidden > 0 && /* @__PURE__ */ jsxs(
      "span",
      {
        className: `-ml-2.5 inline-flex shrink-0 items-center justify-center font-medium ${meta.box} ${meta.text}`,
        style: {
          ...getRadiusStyle(radius),
          fontFamily: "var(--ui-font)",
          backgroundColor: "var(--hover)",
          color: "var(--text-muted)",
          boxShadow: "0 0 0 2px var(--bg)"
        },
        children: [
          "+",
          hidden
        ]
      }
    )
  ] });
};

export {
  Avatar,
  AvatarGroup
};
//# sourceMappingURL=chunk-IUL4YQW3.js.map