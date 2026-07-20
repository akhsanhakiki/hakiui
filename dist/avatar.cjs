"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/ui/avatar.tsx
var avatar_exports = {};
__export(avatar_exports, {
  Avatar: () => Avatar,
  AvatarGroup: () => AvatarGroup
});
module.exports = __toCommonJS(avatar_exports);
var import_react = __toESM(require("react"), 1);

// src/lib/radius.ts
var getRadiusStyle = (radius = "md") => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};

// src/components/ui/avatar.tsx
var import_jsx_runtime = require("react/jsx-runtime");
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
  const [failed, setFailed] = (0, import_react.useState)(false);
  const meta = SIZE_META[size];
  const showImage = !!src && !failed;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
      children: showImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "img",
        {
          src,
          alt: alt ?? name,
          className: "h-full w-full object-cover",
          onError: () => setFailed(true)
        }
      ) : name ? initialsOf(name) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "svg",
        {
          viewBox: "0 0 24 24",
          width: meta.px * 0.55,
          height: meta.px * 0.55,
          fill: "currentColor",
          "aria-hidden": true,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4 0-8 2-8 5.5V21h16v-1.5c0-3.5-4-5.5-8-5.5Z" })
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
  const items = import_react.default.Children.toArray(children);
  const visible = items.slice(0, max);
  const hidden = items.length - visible.length;
  const meta = SIZE_META[size];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `flex items-center ${className}`, children: [
    visible.map((child, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
    hidden > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Avatar,
  AvatarGroup
});
//# sourceMappingURL=avatar.cjs.map