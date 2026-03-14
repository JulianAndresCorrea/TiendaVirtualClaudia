import Jimp from "jimp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const imgPath = path.resolve(
    __dirname,
    "..",
    "src",
    "assets",
    "images",
    "Logo_Claudia.png",
  );
  const img = await Jimp.read(imgPath);
  const { width, height } = img.bitmap;
  let r = 0,
    g = 0,
    b = 0,
    count = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const hex = img.getPixelColor(x, y);
      const rgba = Jimp.intToRGBA(hex);
      if (rgba.a === 0) continue;
      r += rgba.r;
      g += rgba.g;
      b += rgba.b;
      count++;
    }
  }
  if (count === 0) {
    console.error("No non-transparent pixels");
    process.exit(1);
  }
  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);
  const toHex = (n) => n.toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  const accentBg = `rgba(${r}, ${g}, ${b}, 0.08)`;
  const accentBorder = `rgba(${r}, ${g}, ${b}, 0.35)`;
  console.log(JSON.stringify({ r, g, b, hex, accentBg, accentBorder }));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
