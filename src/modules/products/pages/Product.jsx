import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../utils/dummyData';
import { useCart } from '../../cart/hooks/useCart';
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Encuentra el producto por ID
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Producto no encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm">
        <div className="row g-0">
          <div className="col-md-6">
            <img 
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
                <div className="input-group">
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    <i className="fas fa-minus"><FaMinus /></i>
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={quantity}
                    onChange={(e) => {
                      const value = Math.floor(parseInt(e.target.value));
                      if (!isNaN(value) && value >= 1) {
                        setQuantity(value);
                      }
                    }}
                    min="1"
                    style={{ maxWidth: '80px' }}
                  />
                  <button 
                    className="btn btn-outline-primary"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <i className="fas fa-plus"><IoMdAdd /></i>
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
                  onClick={() => {
                    Array(quantity).fill(0).forEach(() => addToCart(product));
                  }}
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
