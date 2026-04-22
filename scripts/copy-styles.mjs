import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inputPath = resolve(root, "src/styles.css");
const outputPath = resolve(root, "dist/styles.css");

await mkdir(dirname(outputPath), { recursive: true });
await copyFile(inputPath, outputPath);
