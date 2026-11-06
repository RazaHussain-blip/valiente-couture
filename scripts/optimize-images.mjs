/**
 * Creates responsive WebP copies of the client photographs.
 * Originals in public/images are never modified.
 *
 *   npm run images
 *
 * Output: public/images/optimized/<slug>-<width>.webp
 * (slug = original filename, lower-case, spaces -> hyphens, no extension)
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("public/images");
const OUT = path.join(SRC, "optimized");
const WIDTHS = [640, 1170];

export const slugOf = (file) =>
  file.replace(/\.[^.]+$/, "").toLowerCase().replace(/\s+/g, "-");

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
  const input = path.join(SRC, file);
  const meta = await sharp(input).metadata();
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width);
    const out = path.join(OUT, `${slugOf(file)}-${w}.webp`);
    const exists = await stat(out).catch(() => null);
    if (exists) continue;
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    console.log("created", path.relative(SRC, out));
  }
}
console.log(`done: ${files.length} photographs`);
