import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";

export default function Checkout() {
  const { state, setDrawer } = useCart();
  const [country, setCountry] = useState("ES");
  const [loading, setLoading] = useState(false);
  const [serverResp, setServerResp] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: state.items, shippingCountry: country }),
      });
      const data = await res.json();
      setServerResp(data);
    } catch (err) {
      setServerResp({ error: "No se pudo validar en el servidor" });
    }
    setLoading(false);
  };

  return (
    <main className="tv-main">
      <h1>Checkout</h1>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "left" }}>
        <h2>Items</h2>
        {state.items.length === 0 && <p>Tu carrito está vacío.</p>}
        {state.items.map((it) => (
          <div
            key={it.productId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
            }}
          >
            <div>
              {it.name} × {it.qty}
            </div>
            <div>{formatCurrency(it.price * it.qty, "COP", "es-CO")}</div>
          </div>
        ))}

        <h2>Envío</h2>
        <label>
          País
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="ES">España</option>
            <option value="US">Estados Unidos</option>
            <option value="default">Otro</option>
          </select>
        </label>

        <div style={{ marginTop: 12 }}>
          <button className="btn" onClick={handleCheckout} disabled={loading}>
            {loading ? "Validando..." : "Validar y pagar"}
          </button>
          <button style={{ marginLeft: 8 }} onClick={() => setDrawer(true)}>
            Volver al carrito
          </button>
        </div>

        {serverResp && (
          <div style={{ marginTop: 16 }}>
            {serverResp.error ? (
              <div style={{ color: "red" }}>{serverResp.error}</div>
            ) : (
              <div>
                <div>
                  Subtotal:{" "}
                  {formatCurrency(serverResp.subtotal, "COP", "es-CO")}
                </div>
                <div>
                  Impuestos ({Math.round(serverResp.taxRate * 100)}%):{" "}
                  {formatCurrency(serverResp.tax, "COP", "es-CO")}
                </div>
                <div>
                  Envío: {formatCurrency(serverResp.shipping, "COP", "es-CO")}
                </div>
                <h3>
                  Total: {formatCurrency(serverResp.total, "COP", "es-CO")}
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
