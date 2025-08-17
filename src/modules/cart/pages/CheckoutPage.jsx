import React from 'react';
import { useCart } from '../hooks/useCart';

export default function CheckoutPage() {
  const { items, subtotal, shipping, total } = useCart();

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-primary">Resumen de Compra</h2>
      <div className="card mb-4">
        <div className="card-header bg-primary text-white fw-bold">Productos en el Carrito</div>
        <ul className="list-group list-group-flush">
          {items.length === 0 ? (
            <li className="list-group-item">No hay productos en el carrito.</li>
          ) : (
            items.map((item, idx) => (
              <li key={idx} className="list-group-item d-flex align-items-center justify-content-between">
                <div>
                  <span className="fw-bold">{item.name}</span> <br />
                  <span className="text-muted">Cantidad: {item.quantity}</span>
                </div>
                <span className="fw-bold">${item.price.toLocaleString()} x {item.quantity}</span>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="mb-4">
        <h5 className="fw-bold">Subtotal: <span className="text-primary">${subtotal.toLocaleString()}</span></h5>
        <h5 className="fw-bold">Envío: <span className="text-primary">${shipping.toLocaleString()}</span></h5>
        <h4 className="fw-bold">Total: <span className="text-success">${total.toLocaleString()}</span></h4>
      </div>
      <div className="mb-4">
        <button className="btn btn-outline-primary btn-lg w-100 mb-3">Completar datos de envío</button>
        <button className="btn btn-success btn-lg w-100">Seleccionar medio de pago</button>
      </div>
    </div>
  );
}
