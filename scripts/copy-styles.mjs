import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// styles.css @imports ./theme.css and ./components.css, so every piece has to
// land in dist for the Tailwind path to resolve them from node_modules.
// (theme.css is emitted by generate-theme-css.mjs, which runs before this.)
// hakiui.js is hand-authored plain-IIFE (no build step for consumers).
const files = ["styles.css", "components.css", "hakiui.js"];

for (const file of files) {
  const outputPath = resolve(root, "dist", file);
  await mkdir(dirname(outputPath), { recursive: true });
  await copyFile(resolve(root, "src", file), outputPath);
}
