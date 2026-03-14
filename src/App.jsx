import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Ofertas from "./pages/Ofertas";
import Contactos from "./pages/Contactos";
import Nav from "./components/Nav";
import CartProvider from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./pages/Checkout";
import CartToast from "./components/CartToast";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <CartDrawer />
        <CartToast />
      </CartProvider>
    </BrowserRouter>
  );
}
