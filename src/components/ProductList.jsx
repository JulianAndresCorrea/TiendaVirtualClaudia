import React from "react";
import ProductCard from "./ProductCard";
import productsData from "../data/products.json";

export default function ProductList({ products, onlyOffers = false }) {
  const list = products ?? productsData;
  const filtered = onlyOffers ? list.filter((p) => p.onSale) : list;

  return (
    <section className="tv-products">
      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
