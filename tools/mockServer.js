import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = path.resolve(
  __dirname,
  "..",
  "src",
  "data",
  "products.json",
);

async function readProducts() {
  const raw = await fs.readFile(PRODUCTS_FILE, "utf8");
  return JSON.parse(raw);
}

app.get("/api/products", async (req, res) => {
  const products = await readProducts();
  res.json(products);
});

// Validate cart prices and return totals (server authoritative)
app.post("/api/validate", async (req, res) => {
  try {
    const { items, shippingCountry } = req.body || {};
    const products = await readProducts();
    const lookup = new Map(products.map((p) => [p.id, p]));

    // Validate and rebuild items
    const validated = items
      .map((it) => {
        const source = lookup.get(it.productId) || {};
        const price =
          typeof source.price === "number" ? source.price : it.price || 0;
        const name = source.name || it.name;
        const image = source.image || it.image;
        const qty = Math.max(0, Number(it.qty) || 0);
        const subtotal = Number((price * qty).toFixed(2));
        return { productId: it.productId, name, price, image, qty, subtotal };
      })
      .filter((i) => i.qty > 0);

    const subtotal = validated.reduce((s, i) => s + i.subtotal, 0);

    // Simple tax rules by country code
    const taxRates = { ES: 0.21, US: 0.07, default: 0.15 };
    const country = (shippingCountry || "default").toUpperCase();
    const taxRate = taxRates[country] ?? taxRates.default;
    const tax = Number((subtotal * taxRate).toFixed(2));

    // Shipping: free over 50, else flat 5
    const shipping = subtotal >= 50 ? 0 : 5;

    const total = Number((subtotal + tax + shipping).toFixed(2));

    res.json({
      items: validated,
      subtotal: Number(subtotal.toFixed(2)),
      tax,
      shipping,
      total,
      taxRate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Mock server running on http://localhost:${port}`),
);
