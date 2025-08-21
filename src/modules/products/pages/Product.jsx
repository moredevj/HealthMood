import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useProduct } from '../../../hooks/useProduct';
import { useCart } from '../../cart/hooks/useCart';
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import SafeImage from '../../../components/SafeImage';

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Usar el hook para obtener el producto del backend
  const { product, loading, error, usingMockData } = useProduct(id);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Cargando producto...</span>
            </div>
            <p className="text-muted">Cargando información del producto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          <h4>Producto no encontrado</h4>
          <p>El producto con ID {id} no existe o no se pudo cargar.</p>
          {error && <p><strong>Error:</strong> {error}</p>}
          
          <button 
            className="btn btn-secondary mt-2"
            onClick={() => window.history.back()}
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm">
        <div className="row g-0">
          <div className="col-md-6">
            <SafeImage 
              src={product.image} 
              alt={product.name}
              className="img-fluid rounded-start" 
              style={{ objectFit: 'cover', height: '100%', width: '100%' }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body p-4">
              <h2 className="card-title mb-3">{product.name}</h2>
              <p className="card-text text-muted mb-4">
                {product.description}
              </p>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-primary mb-0">${Math.round(product.price).toLocaleString('es-CL')}</h3>
                <span className="badge bg-success">{product.category}</span>
              </div>

              {/* Control de cantidad */}
              <div className="mb-4">
                <label className="form-label">Cantidad:</label>
                <div className="btn-group" role="group">
                  <button className="btn btn-outline-primary" onClick={() => setQuantity(prev => Math.max(1, prev - 1))} disabled={quantity <= 1}>
                    <FaMinus />
                  </button>
                  <button className="btn btn-outline-primary px-3" disabled>{quantity}</button>
                  <button className="btn btn-outline-primary" onClick={() => setQuantity(prev => prev + 1)}>
                    <IoMdAdd />
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="text-muted">Subtotal:</span>
                <h4 className="text-primary mb-0">
                  ${Math.round(product.price * quantity).toLocaleString('es-CL')}
                </h4>
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => addToCart(product, quantity)}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  Agregar {quantity} al carrito
                </button>
              </div>
            </div>
            
          </div>
          
          <div className="col-md-12 mt-4">
            <h5 className="card-title">Descripción</h5>
            <p className="card-text text-muted mb-12">
                {product.description}
            </p>
            </div>
        </div>
      </div>
    </div>
  );
}
