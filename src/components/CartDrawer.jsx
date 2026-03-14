import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import imgLogo from "../assets/images/Logo_Claudia.png";
import imgReact from "../assets/images/react.svg";
import imgVite from "../assets/images/vite.svg";
import "./cart.css";

const IMAGES = {
  "Logo_Claudia.png": imgLogo,
  "react.svg": imgReact,
  "vite.svg": imgVite,
};

function CartItemRow({ item, onRemove, onUpdate }) {
  const src = item.image ? IMAGES[item.image] : null;
  const subtotal = item.price * item.qty || 0;
  const fmt = (v) =>
    new Intl.NumberFormat(navigator.language, {
      style: "currency",
      currency: "USD",
    }).format(v);
  return (
    <div className="cart-item">
      <div className="cart-thumb">
        {src ? (
          <img src={src} alt={item.name} />
        ) : (
          <div className="product-placeholder">{item.name.charAt(0)}</div>
        )}
      </div>
      <div className="cart-info">
        <div className="cart-name">{item.name}</div>
        <div className="cart-price">
          {fmt(item.price)} × {item.qty}
        </div>
        <div className="cart-subtotal">Subtotal: {fmt(subtotal)}</div>
      </div>
      <div className="cart-actions">
        <button
          className="btn qty-btn"
          onClick={() => onUpdate(item.productId, Math.max(1, item.qty - 1))}
          aria-label="Disminuir"
        >
          −
        </button>
        <span>{item.qty}</span>
        <button
          className="btn qty-btn"
          onClick={() => onUpdate(item.productId, item.qty + 1)}
          aria-label="Aumentar"
        >
          +
        </button>
        <button
          className="btn remove"
          onClick={() => onRemove(item.productId)}
          aria-label="Eliminar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { state, removeItem, updateQty, clear, setDrawer } = useCart();
  const items = state.items || [];

  const navigate = useNavigate();

  useCloseOnEscape(state.drawerOpen, () => setDrawer(false));

  if (!state.drawerOpen) return null;

  const total = state.total ?? 0;

  // debug: log cart state when modal opens
  // (temporal: puedes eliminar después de depurar)
  // eslint-disable-next-line no-console
  console.debug("CartDrawer state:", state);

  return (
    <div className="cart-modal-overlay" onClick={() => setDrawer(false)}>
      <div
        className="cart-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Carrito de compras"
      >
        <header className="cart-header">
          <h3>Carrito</h3>
          <button
            className="btn btn--danger"
            onClick={() => setDrawer(false)}
            aria-label="Cerrar"
          >
            Cerrar
          </button>
        </header>
        <div className="cart-list">
          {items.length === 0 ? (
            <div className="empty">Tu carrito está vacío</div>
          ) : (
            items.map((it) => (
              <CartItemRow
                key={it.productId}
                item={it}
                onRemove={removeItem}
                onUpdate={updateQty}
              />
            ))
          )}
        </div>
        <footer className="cart-footer">
          <div>
            Total:{" "}
            <strong>
              {new Intl.NumberFormat(navigator.language, {
                style: "currency",
                currency: "USD",
              }).format(total)}
            </strong>
          </div>
          <div className="cart-footer-actions">
            <button
              className="btn btn--success"
              onClick={() => {
                setDrawer(false);
                navigate("/checkout");
              }}
            >
              Pagar
            </button>
            <button className="btn btn--warn" onClick={clear}>
              Vaciar
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

// close with Escape when open
// (Note: keeps simple behavior, not a full focus trap)
function useCloseOnEscape(active, onClose) {
  useEffect(() => {
    if (!active) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [active, onClose]);
}
