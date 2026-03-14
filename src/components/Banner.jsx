import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

export default function Banner() {
  return (
    <section className="tv-banner">
      <div className="tv-banner-inner">
        <Carousel />
        <div className="tv-banner-overlay">
          <h1>Bienvenido a TiendaVirtual</h1>
          <p>Los mejores productos al mejor precio. Envío rápido y seguro.</p>
          <Link className="btn" to="/productos">
            Ver productos
          </Link>
        </div>
      </div>
    </section>
  );
}
