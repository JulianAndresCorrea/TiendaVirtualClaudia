import React, { useState } from "react";
import "./contact.css";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return "Nombre requerido";
    if (!/^\+?[0-9\s\-]{7,}$/.test(form.phone)) return "Teléfono inválido";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Email inválido";
    if (!form.message.trim()) return "Mensaje requerido";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus({ type: "error", message: err });
      return;
    }
    setStatus({ type: "sending", message: "Enviando..." });
    // Simular envío; reemplazar por fetch/axios a backend cuando exista
    setTimeout(() => {
      setStatus({ type: "success", message: "Mensaje enviado. ¡Gracias!" });
      setForm({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus(null), 3000);
    }, 900);
  };

  return (
    <div className="contact-card">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="fields">
          <label className="field">
            <span className="field-label">Nombre</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Teléfono</span>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+57 300 123 4567"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field field--full">
            <span className="field-label">Mensaje</span>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn--success"
            disabled={status?.type === "sending"}
          >
            {status?.type === "sending" ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>

        {status && (
          <div className={`form-status ${status.type}`}>{status.message}</div>
        )}
      </form>
    </div>
  );
}
