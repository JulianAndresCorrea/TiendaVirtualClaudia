import React, { useState } from "react";
import "./product.css";
import imgLogo from "../assets/images/Logo_Claudia.png";
import imgReact from "../assets/images/react.svg";
import imgVite from "../assets/images/vite.svg";
import { useCart } from "../context/CartContext";
import ProductDetails from "./ProductDetails";

const IMAGES = {
  "Logo_Claudia.png": imgLogo,
  "react.svg": imgReact,
  "vite.svg": imgVite,
};

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const { addItem } = useCart();
  const src = product.image ? IMAGES[product.image] : null;
  return (
    <article className="product-card" aria-labelledby={`p-${product.id}`}>
      <div className="product-thumb" aria-hidden>
        {src ? (
          <img src={src} alt={product.name} />
        ) : (
          <div className="product-placeholder">{product.name.charAt(0)}</div>
        )}
      </div>
      <h3 id={`p-${product.id}`}>{product.name}</h3>
      <p className="desc">{product.description}</p>
      <div className="price">
        {product.currency} {product.price.toFixed(2)}
      </div>
      <div className="actions">
        <button className="buy" onClick={() => addItem(product, 1)}>
          Comprar
        </button>
        <button className="details" onClick={() => setOpen(true)}>
          Detalles
        </button>
      </div>
      {open && (
        <ProductDetails product={product} onClose={() => setOpen(false)} />
      )}
    </article>
  );
}
