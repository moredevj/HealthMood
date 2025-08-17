import React from 'react';

export default function BlogPage() {
  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-primary">Blog</h2>
      <p className="mb-4">Bienvenido a nuestro blog. Aquí encontrarás artículos, consejos y novedades sobre salud y bienestar de tus mascotas.</p>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">¿Cómo elegir el mejor alimento para tu mascota?</h5>
              <p className="card-text">Descubre los factores clave para seleccionar el alimento ideal según la edad, raza y necesidades de tu mascota.</p>
              <a href="#" className="btn btn-outline-primary btn-sm">Leer más</a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Juguetes recomendados para perros y gatos</h5>
              <p className="card-text">Conoce los juguetes más seguros y divertidos para mantener a tus mascotas activas y felices.</p>
              <a href="#" className="btn btn-outline-primary btn-sm">Leer más</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
