// src/components/ui/tabs.tsx
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Tabs = ({
  items
}) => {
  const [active, setActive] = useState(items[0]?.id ?? "");
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex w-full border-b border-(--border)", children: items.map((item) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setActive(item.id),
        className: `-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors ${active === item.id ? "border-(--ui-primary) text-(--text)" : "border-transparent text-(--text-muted) hover:text-(--text)"}`,
        children: item.label
      },
      item.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "px-2 py-2 text-(--text)", children: items.find((i) => i.id === active)?.content })
  ] });
};

export {
  Tabs
};
//# sourceMappingURL=chunk-7QPWBI4D.js.map