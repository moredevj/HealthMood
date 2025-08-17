import React from 'react';

export default function OrdersPage() {
  // Aquí podrías obtener los envíos del usuario desde contexto o props
  return (
    <div className="container py-5">
      <h1 className="fw-bold mb-4">Mis Envíos</h1>
      <div className="card shadow-sm p-4">
        <h4 className="mb-3">Historial de envíos</h4>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Alimento Premium para Perros</td>
              <td>2025-08-10</td>
              <td><span className="badge bg-success">Entregado</span></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Juguete Interactivo para Gatos</td>
              <td>2025-08-12</td>
              <td><span className="badge bg-warning text-dark">En camino</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
