import React from "react";
import "../home.css";
import ProductList from "../components/ProductList";

export default function Ofertas() {
  return (
    <main className="tv-main">
      <h1>Ofertas</h1>
      <ProductList onlyOffers />
    </main>
  );
}
