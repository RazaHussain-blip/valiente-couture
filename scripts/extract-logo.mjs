/**
 * The supplied logo ("logo 2.png") has a checkerboard baked into its pixels
 * instead of real transparency. This extracts the burgundy lettering into
 * clean transparent PNG/WebP files. The original file is not modified.
 *
 *   node scripts/extract-logo.mjs
 */
import sharp from "sharp";

const SRC = "public/images/optimized/logo 2.png";
const OUT = "public/images/logo";

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const variants = {
  burgundy: [107, 36, 50],
  ivory: [251, 244, 236],
};

for (const [name, [R, G, B]] of Object.entries(variants)) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Burgundy ink has a strong red bias; the grey/white checker has none.
    const redness = r - Math.max(g, b);
    const a = Math.max(0, Math.min(1, (redness - 12) / 38));
    out[j] = R;
    out[j + 1] = G;
    out[j + 2] = B;
    out[j + 3] = Math.round(a * 255);
  }
  const img = sharp(out, { raw: { width, height, channels: 4 } }).trim({ threshold: 1 });
  const trimmed = await img.png().toBuffer();
  await sharp(trimmed).resize({ width: 1200 }).png({ compressionLevel: 9 }).toFile(`${OUT}-${name}.png`);
  await sharp(trimmed).resize({ width: 1200 }).webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}-${name}.webp`);
  const meta = await sharp(`${OUT}-${name}.png`).metadata();
  console.log(`${OUT}-${name}.png ${meta.width}x${meta.height}`);
}
