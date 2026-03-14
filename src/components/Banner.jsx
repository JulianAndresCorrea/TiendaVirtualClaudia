import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

export default function Banner() {
  return (
    <section className="tv-banner">
      <div className="tv-banner-inner">
        <Carousel />
      </div>
    </section>
  );
}
