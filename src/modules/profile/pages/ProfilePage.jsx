import React from 'react';

export default function ProfilePage() {
  // Aquí podrías obtener datos del usuario desde contexto o props
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Mi Perfil</h1>
      <div className="card shadow-sm p-4">
        <h4 className="mb-3">Datos del usuario</h4>
        <ul className="list-unstyled">
          <li><strong>Nombre:</strong> Juan Pérez</li>
          <li><strong>Email:</strong> juan.perez@email.com</li>
          <li><strong>Teléfono:</strong> +56 9 1234 5678</li>
        </ul>
        <button className="btn btn-outline-primary mt-3">Editar perfil</button>
      </div>
    </div>
  );
}
