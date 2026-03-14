import React, { useEffect } from "react";
import "./nav.css";
import logo from "../assets/images/Logo_Claudia.png";
import { NavLink } from "react-router-dom";
import CartButton from "./CartButton";

function rgbToHex(r, g, b) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixWithWhite([r, g, b], amount = 0.9) {
  // amount: 0..1, closer to 1 => lighter
  const rr = Math.round(r + (255 - r) * amount);
  const gg = Math.round(g + (255 - g) * amount);
  const bb = Math.round(b + (255 - b) * amount);
  return `rgba(${rr}, ${gg}, ${bb}, ${amount})`;
}

function darken([r, g, b], factor = 0.6) {
  const rr = Math.round(r * factor);
  const gg = Math.round(g * factor);
  const bb = Math.round(b * factor);
  return `rgb(${rr}, ${gg}, ${bb})`;
}

function mixWithColor([r, g, b], color = [0, 120, 255], amount = 0.3) {
  const rr = Math.round(r * (1 - amount) + color[0] * amount);
  const gg = Math.round(g * (1 - amount) + color[1] * amount);
  const bb = Math.round(b * (1 - amount) + color[2] * amount);
  return `rgb(${rr}, ${gg}, ${bb})`;
}

export default function Nav() {
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logo;
    img.onload = () => {
      const w = 64;
      const h = 64;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha === 0) continue;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      if (count === 0) return;
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      const accent = rgbToHex(r, g, b);
      const accentBg = mixWithWhite([r, g, b], 0.88);
      const accentBorder = `rgba(${r}, ${g}, ${b}, 0.35)`;
      const buy = darken([r, g, b], 0.55); // darker variant for Comprar
      const details = mixWithColor([r, g, b], [30, 120, 220], 0.28); // bluish mix for Detalles
      const buyBorder = `rgba(${Math.round(r * 0.55)}, ${Math.round(g * 0.55)}, ${Math.round(b * 0.55)}, 0.35)`;
      const detailsBorder = `rgba(${Math.round(r * 0.72 + 30 * 0.28)}, ${Math.round(g * 0.72 + 120 * 0.28)}, ${Math.round(b * 0.72 + 220 * 0.28)}, 0.35)`;

      document.documentElement.style.setProperty("--accent", accent);
      document.documentElement.style.setProperty("--accent-bg", accentBg);
      document.documentElement.style.setProperty(
        "--accent-border",
        accentBorder,
      );
      document.documentElement.style.setProperty("--btn-buy", buy);
      document.documentElement.style.setProperty("--btn-buy-border", buyBorder);
      document.documentElement.style.setProperty("--btn-details", details);
      document.documentElement.style.setProperty(
        "--btn-details-border",
        detailsBorder,
      );
    };
  }, []);

  return (
    <header className="tv-nav">
      <div className="tv-container">
        <div className="brand">
          <img src={logo} alt="Logo Tienda" className="tv-logo" />
        </div>
        <nav className="menu">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/productos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Productos
          </NavLink>
          <NavLink
            to="/ofertas"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Ofertas
          </NavLink>
          <NavLink
            to="/contactos"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contacto
          </NavLink>
        </nav>
        <div className="nav-actions">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
