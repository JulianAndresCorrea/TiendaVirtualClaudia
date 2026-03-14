import React, { useState } from "react";
import imgLogo from "../assets/images/Logo_Claudia.png";
import imgReact from "../assets/images/react.svg";
import imgVite from "../assets/images/vite.svg";
import "./product-details.css";

const IMAGES = {
  "Logo_Claudia.png": imgLogo,
  "react.svg": imgReact,
  "vite.svg": imgVite,
};

export default function ProductDetails({ product, onClose }) {
  const imgs = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];
  const mapped = imgs.map((name) => IMAGES[name]).filter(Boolean);
  const [index, setIndex] = useState(0);

  return (
    <div
      className="pd-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="pd-dialog" onClick={(e) => e.stopPropagation()}>
        <header className="pd-header">
          <h2>{product.name}</h2>
          <button className="pd-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </header>
        <div className="pd-body">
          <div className="pd-gallery">
            <div className="pd-main">
              {mapped[index] ? (
                <img
                  src={mapped[index]}
                  alt={`${product.name} foto ${index + 1}`}
                />
              ) : (
                <div className="pd-placeholder">No image</div>
              )}
            </div>
            <div className="pd-thumbs">
              {mapped.map((src, i) => (
                <button
                  key={i}
                  className={`pd-thumb ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Ver foto ${i + 1}`}
                >
                  <img src={src} alt={`thumb ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <div className="pd-info">
            <p className="pd-price">
              {product.currency} {product.price.toFixed(2)}
            </p>
            <p className="pd-desc">{product.description}</p>
            {/* extra metadata could go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
