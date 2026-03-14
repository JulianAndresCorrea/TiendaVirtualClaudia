import React from "react";
import { useCart } from "../context/CartContext";
import "./cart.css";

export default function CartButton() {
  const { state, toggleDrawer } = useCart();
  const bump = state.lastAdded;
  const [anim, setAnim] = React.useState(false);

  React.useEffect(() => {
    if (!bump) return;
    setAnim(true);
    const t = setTimeout(() => setAnim(false), 350);
    return () => clearTimeout(t);
  }, [bump]);

  return (
    <button
      className={`cart-button ${anim ? "bump" : ""}`}
      onClick={toggleDrawer}
      aria-label="Abrir carrito"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 6h15l-1.5 9h-11L6 6z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1" fill="currentColor" />
        <circle cx="18" cy="20" r="1" fill="currentColor" />
      </svg>
      {state.count > 0 && <span className="cart-count">{state.count}</span>}
    </button>
  );
}
