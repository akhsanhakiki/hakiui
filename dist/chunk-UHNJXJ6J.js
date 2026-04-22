// src/components/ui/tabs.tsx
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var Tabs = ({ items }) => {
  const [active, setActive] = useState(items[0]?.id ?? "");
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsx("div", { className: "flex border-b border-[#27272a] w-full", children: items.map((item) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => setActive(item.id),
        className: `px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-[1px] ${active === item.id ? "border-[color:var(--ui-primary)] text-white" : "border-transparent text-gray-400 hover:text-gray-200"}`,
        children: item.label
      },
      item.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "px-2 py-2 text-gray-300", children: items.find((i) => i.id === active)?.content })
  ] });
};

export {
  Tabs
};
//# sourceMappingURL=chunk-UHNJXJ6J.js.map