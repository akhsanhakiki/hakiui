import type { CSSProperties } from "react";

export type Radius = "none" | "sm" | "md" | "lg" | "full";

export const getRadiusStyle = (radius: Radius = "md"): CSSProperties => {
  if (radius === "none") return { borderRadius: 0 };
  if (radius === "sm") return { borderRadius: "calc(var(--ui-radius) * 0.5)" };
  if (radius === "lg") return { borderRadius: "calc(var(--ui-radius) * 1.5)" };
  if (radius === "full") return { borderRadius: "9999px" };
  return { borderRadius: "var(--ui-radius)" };
};
