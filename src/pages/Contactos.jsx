import React from "react";
import "../home.css";
import ContactForm from "../components/ContactForm";

export default function Contactos() {
  return (
    <main className="tv-main">
      <h1>Contactos</h1>
      <p>
        Contacto: escribe a contacto@tiendavirtual.example o usa el formulario.
      </p>
      <ContactForm />
    </main>
  );
}
