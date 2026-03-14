import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./cart.css";

export default function CartToast() {
  const { state } = useCart();
  const last = state.lastAdded;
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!last || !last.productId) return;
    const item = state.items.find((i) => i.productId === last.productId);
    const name = item ? item.name : "Artículo";
    setText(`Añadido: ${name}`);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(t);
  }, [last, state.items]);

  if (!visible) return null;
  return (
    <div className="cart-toast" role="status" aria-live="polite">
      {text}
    </div>
  );
}
