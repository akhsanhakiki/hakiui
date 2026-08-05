import { defineConfig } from "tsup";

const ui = [
  "button",
  "input",
  "pagination",
  "switch",
  "tooltip",
  "table",
  "tabs",
  "accordion",
  "checkbox",
  "radio",
  "calendar",
  "modal",
  "dropdown",
  "autocomplete",
  "bar-chart",
  "line-chart",
  "date-picker",
  "toast",
  "alert",
  "badge",
  "avatar",
  "progress",
  "skeleton",
  "spinner",
  "slider",
  "stepper",
  "breadcrumbs"
] as const;

const entry: Record<string, string> = {
  index: "src/index.ts",
  "theme-provider": "src/components/theme-provider.tsx",
  "hex-to-rgb": "src/lib/hex-to-rgb.ts",
  radius: "src/lib/radius.ts",
  chart: "src/lib/chart.ts"
};

for (const name of ui) {
  entry[name] = `src/components/ui/${name}.tsx`;
}

export default defineConfig({
  entry,
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "lucide-react"]
});
