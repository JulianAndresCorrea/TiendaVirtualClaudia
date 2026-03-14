import React from "react";
import Banner from "../components/Banner";
import "../home.css";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div>
      <main className="tv-main">
        <Banner
          title="Bienvenido a TiendaVirtual"
          subtitle="Los mejores productos al mejor precio. Envío rápido y seguro."
          cta="Ver productos"
        />

        <section id="productos" className="tv-products">
          <h2>Productos destacados</h2>
          <ProductList />
        </section>
      </main>
    </div>
  );
}
