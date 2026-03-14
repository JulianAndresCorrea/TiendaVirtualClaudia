import React, { useState, useEffect } from "react";
import "./carousel.css";
import img1 from "../assets/images/Logo_Claudia.png";
import img2 from "../assets/images/react.svg";
import img3 from "../assets/images/vite.svg";

const IMAGES = [img1, img2, img3, img1];

export default function Carousel({ images = IMAGES, interval = 4000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval,
    );
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className="tv-carousel" role="region" aria-roledescription="carousel">
      <div
        className="tv-carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className="tv-carousel-item" key={i} aria-hidden={i !== index}>
            <img src={src} alt={`Slide ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="tv-carousel-controls">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
