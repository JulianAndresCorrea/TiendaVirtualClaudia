import React from "react";
import "../home.css";
import ProductList from "../components/ProductList";

export default function Productos() {
  return (
    <main className="tv-main">
      <h1>Productos</h1>
      <ProductList />
    </main>
  );
}
