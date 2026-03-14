import React, { useState } from "react";
import "./contact.css";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name.trim()) return "Nombre requerido";
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
    // Simular envío; reemplazar por fetch/axios a backend cuando exista
    setTimeout(() => {
      setStatus({ type: "success", message: "Mensaje enviado. Gracias!" });
      setForm({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label>
        Nombre
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Mensaje
        <textarea
          name="message"
          rows="6"
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>
      <div className="form-actions">
        <button type="submit" className="btn">
          Enviar
        </button>
      </div>
      {status && (
        <div className={`form-status ${status.type}`}>{status.message}</div>
      )}
    </form>
  );
}
