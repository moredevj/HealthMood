import React from 'react';

export default function ContactPage() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-primary">Contacto</h2>
      <p className="mb-4">¿Tienes dudas, sugerencias o quieres comunicarte con nosotros? Completa el formulario y te responderemos pronto.</p>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="name" required />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" id="email" required />
        </div>
        <div className="col-12">
          <label htmlFor="message" className="form-label">Mensaje</label>
          <textarea className="form-control" id="message" rows="4" required></textarea>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Enviar</button>
        </div>
      </form>
    </div>
  );
}
