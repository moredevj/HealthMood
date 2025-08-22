import { useCart } from '../hooks/useCart';
import SafeImage from '../../../components/SafeImage';
import { useState } from 'react';
import { useAuth } from '../../auth/hook/useAuth';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { items, removeFromCart, subtotal, shipping, total, increaseQuantity, decreaseQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [showCheckoutImage, setShowCheckoutImage] = useState(false);

  // Imagen base64 - REEMPLAZA ESTA CON TU IMAGEN REAL DE GOOGLE DRIVE
  // Para convertir tu imagen:
  // 1. Haz tu imagen pública en Google Drive
  // 2. Usa este enlace: https://drive.google.com/uc?export=view&id=1vkBiSUujkjIZeLI4MRBGBkRdXTA_Izot
  // 3. Descarga la imagen y conviértela a base64 en: https://www.base64-image.de/
  const checkoutImageBase64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzgwNjFjNSIgLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNTcwNmFkIiAvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSJ1cmwoI2JnKSIgcng9IjIwIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMTIwIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+OiSBQcm9jZXNhbmRvIFBhZ28uLi4g8J+OiTwvdGV4dD4KPGNpcmNsZSBjeD0iMzAwIiBjeT0iMjAwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0IiBvcGFjaXR5PSIwLjgiPgo8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIGF0dHJpYnV0ZVR5cGU9IlhNTCIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDMwMCAyMDAiIHRvPSIzNjAgMzAwIDIwMCIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KPC9jaXJjbGU+Cjx0ZXh0IHg9IjMwMCIgeT0iMjgwIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBvcGFjaXR5PSIwLjkiPkVzdGFtb3MgcHJvY2VzYW5kbyB0dSBwYWdvIGRlIGZvcm1hIHNlZ3VyYTwvdGV4dD4KPHRleHQgeD0iMzAwIiB5PSIzMTAiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjE0IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIG9wYWNpdHk9IjAuNyI+8J+UkiBDb21wcmEgMTAwJSBzZWd1cmE8L3RleHQ+Cjwvc3ZnPg==";

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir a login
      navigate('/login');
    } else {
      // Si está autenticado, mostrar la imagen
      setShowCheckoutImage(true);
    }
  };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'descuento10') {
      setIsPromoApplied(true);
    }
  };

  const discount = isPromoApplied ? subtotal * 0.1 : 0;
  const finalTotal = total - discount;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="row align-items-center mb-5">
        <div className="col">
          <div className="d-flex align-items-center">
            <div className="bg-gradient rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
              <i className="fas fa-shopping-cart fs-4" style={{ color: '#8061c5' }}></i>
            </div>
            <div>
              <h1 className="display-5 fw-bold mb-1" style={{ color: '#8061c5' }}>Carrito de Compras</h1>
              <p className="text-muted mb-0">{
                items.reduce((acc, item) => acc + (item.quantity || 1), 0)
              } {
                items.reduce((acc, item) => acc + (item.quantity || 1), 0) === 1 ? 'producto' : 'productos'
              } en tu carrito</p>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <button 
            className="btn btn-outline-primary rounded-pill"
            onClick={() => window.history.back()}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Seguir comprando
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        // Empty Cart State
        <div className="text-center py-5">
          <div className="mb-4">
            <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4" style={{ width: '120px', height: '120px' }}>
              <i className="fas fa-shopping-cart text-muted fs-1"></i>
            </div>
            <h3 className="text-dark mb-3">Tu carrito está vacío</h3>
            <p className="text-muted mb-4">¡Agrega algunos productos increíbles a tu carrito!</p>
            <a href="/products" className="btn btn-outline-primary btn-lg rounded-pill px-5">
              <i className="fas fa-shopping-bag me-2"></i>
              Explorar productos
            </a>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-transparent border-0 py-4">
                <h4 className="mb-0 fw-bold">
                  <i className="fas fa-list-ul text-primary me-2"></i>
                  Productos seleccionados
                </h4>
              </div>
            </div>

            {items.map((item, index) => (
              <div className="card border-0 shadow-sm mb-3" key={index}>
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <div className="position-relative">
                        <SafeImage 
                          src={item.image} 
                          className="img-fluid rounded-3 object-fit-cover w-100" 
                          alt={item.name}
                          style={{ height: '120px' }}
                        />
                        <div className="position-absolute top-0 start-0 m-2">
                          <span className="badge bg-success bg-gradient rounded-pill px-2 py-1">
                            <i className="fas fa-check me-1"></i>
                            En stock
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="ps-md-3">
                        <h5 className="fw-bold text-dark mb-2">{item.name}</h5>
                        <p className="text-muted mb-2 small">{item.description || 'Producto de alta calidad'}</p>
                        
                        {/* Product features */}
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          <span className="badge bg-light text-primary rounded-pill px-2 py-1">
                            <i className="fas fa-truck me-1"></i>
                            Envío gratis
                          </span>
                          <span className="badge bg-light text-success rounded-pill px-2 py-1">
                            <i className="fas fa-shield-alt me-1"></i>
                            Garantía
                          </span>
                          <span className="badge bg-light text-info rounded-pill px-2 py-1">
                            <i className="fas fa-star me-1"></i>
                            4.8
                          </span>
                        </div>

                        {/* Quantity selector */}
                        <div className="d-flex align-items-center">
                          <label className="form-label me-2 mb-0 fw-medium">Cantidad:</label>
                          <div className="btn-group" role="group">
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                              <i className="fas fa-minus"></i>
                            </button>
                            <button className="btn btn-outline-secondary btn-sm px-3" disabled>{item.quantity}</button>
                            <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(item.id)}>
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3 text-md-end">
                      <div className="d-flex flex-column align-items-md-end">
                        <h4 className="text-primary fw-bold mb-2">
                          ${item.price.toLocaleString('es-CL')}
                        </h4>
                        <small className="text-muted mb-3">
                          <s>${(item.price * 1.2).toLocaleString('es-CL')}</s>
                          <span className="badge bg-danger ms-1">-20%</span>
                        </small>

                        <div className="d-flex gap-2">
                          <button className="btn btn-outline-secondary btn-sm rounded-pill">
                            <i className="far fa-heart"></i>
                          </button>
                          <button 
                            className="btn btn-outline-danger btn-sm rounded-pill" 
                            onClick={() => removeFromCart(index)}
                          >
                            <i className="fas fa-trash-alt me-1"></i>
                            Quitar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code Section */}
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h6 className="fw-bold mb-3">
                  <i className="fas fa-tag me-2"></i>
                  ¿Tienes un código promocional?
                </h6>
                <div className="row g-3">
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-pill"
                      placeholder="Ingresa tu código promocional"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <button 
                      className="btn btn-outline-primary btn-lg w-100 rounded-pill"
                      onClick={handlePromoCode}
                      disabled={isPromoApplied}
                    >
                      {isPromoApplied ? (
                        <>
                          <i className="fas fa-check me-2"></i>
                          Aplicado
                        </>
                      ) : (
                        <>
                          <i className="fas fa-percentage me-2"></i>
                          Aplicar
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {isPromoApplied && (
                  <div className="alert mt-3 mb-0" role="alert" style={{ background: '#e9d6fb', color: '#4A00E0' }}>
                    <i className="fas fa-check-circle me-2" ></i>
                    ¡Código aplicado! Descuento del 10% agregado.
                  </div>
                )}
                <div className="mt-2">
                  <small className="text-muted">
                    💡 <strong>Tip:</strong> Prueba con "descuento10" para obtener un 10% de descuento
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="position-sticky" style={{ top: '20px' }}>
              <div className="card border-0 shadow-sm">
                <div className="card-header text-white py-4 text-center" style={{ background: '#8061c5' }}>
                  <h5 className="mb-0 fw-bold d-inline-block">
                    <i className="fas fa-calculator me-2"></i>
                    Resumen del pedido
                  </h5>
                </div>
                
                <div className="card-body p-4">
                  {/* Subtotal */}
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted">Subtotal ({items.reduce((acc, item) => acc + (item.quantity || 1), 0)} productos)</span>
                    <span className="fw-medium">${subtotal.toLocaleString('es-CL')}</span>
                  </div>

                  {/* Shipping */}
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted">
                      Envío
                      <i className="fas fa-info-circle ms-1 text-info" title="Envío express en 24 horas"></i>
                    </span>
                    <span className="fw-medium">${shipping.toLocaleString('es-CL')}</span>
                  </div>

                  {/* Discount */}
                  {isPromoApplied && (
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <span style={{ color: '#4A00E0' }}>
                        <i className="fas fa-tag me-1"></i>
                        Descuento (10%)
                      </span>
                      <span className="fw-medium" style={{ color: '#4A00E0' }}>-${discount.toLocaleString('es-CL')}</span>
                    </div>
                  )}

                  <hr className="my-3" />

                  {/* Total */}
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="h5 fw-bold text-dark">Total</span>
                    <span className="h4 fw-bold text-primary">${finalTotal.toLocaleString('es-CL')}</span>
                  </div>

                  {/* Savings badge */}
                  {isPromoApplied && (
                    <div className="text-center mb-3">
                      <span className="badge fs-6 px-3 py-2 rounded-pill" style={{ background: '#e9d6fb', color: '#4A00E0' }}>
                        <i className="fas fa-piggy-bank me-1"></i>
                        ¡Ahorras ${discount.toLocaleString('es-CL')}!
                      </span>
                    </div>
                  )}

                  {/* Checkout button */}
                  <div className="d-grid mb-3" style={{ background: '#8061c5' }}>
                    <button 
                      className="btn btn-lg rounded-pill fw-bold py-3 text-white"
                      onClick={handleCheckout}
                    >
                      <i className="fas fa-credit-card me-2" ></i>
                      Proceder al pago
                    </button>
                  </div>

                  {/* Security badges */}
                  <div className="text-center">
                    <div className="d-flex justify-content-center gap-3 mb-2">
                      <span className="badge bg-light text-dark px-2 py-1">
                        <i className="fab fa-cc-visa fs-6"></i>
                      </span>
                      <span className="badge bg-light text-dark px-2 py-1">
                        <i className="fab fa-cc-mastercard fs-6"></i>
                      </span>
                      <span className="badge bg-light text-dark px-2 py-1">
                        <i className="fab fa-paypal fs-6"></i>
                      </span>
                    </div>
                    <small className="text-muted">
                      <i className="fas fa-lock me-1"></i>
                      Compra 100% segura
                    </small>
                  </div>
                </div>
              </div>

              {/* Additional info */}
              <div className="card border-0 bg-light mt-3">
                <div className="card-body p-4 text-center">
                  <h6 className="fw-bold text-dark mb-3">¿Necesitas ayuda?</h6>
                  <div className="row g-2 text-center">
                    <div className="col-4">
                      <div className="text-primary">
                        <i className="fas fa-headset fs-4 mb-2"></i>
                        <div>
                          <small className="fw-medium">Soporte 24/7</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="text-success">
                        <i className="fas fa-undo fs-4 mb-2"></i>
                        <div>
                          <small className="fw-medium">Devoluciones</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="text-info">
                        <i className="fas fa-shipping-fast fs-4 mb-2"></i>
                        <div>
                          <small className="fw-medium">Envío rápido</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar imagen de checkout */}
      {showCheckoutImage && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          onClick={() => setShowCheckoutImage(false)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold" style={{ color: '#8061c5' }}>
                  <i className="fas fa-credit-card me-2"></i>
                  Procesando Pago
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowCheckoutImage(false)}
                ></button>
              </div>
              <div className="modal-body text-center p-4">
                <img 
                  src={checkoutImageBase64} 
                  alt="Procesando pago" 
                  className="img-fluid rounded-3 shadow-sm"
                  style={{ maxHeight: '400px', width: '100%', objectFit: 'contain' }}
                />
                <div className="mt-4">
                  <p className="text-muted mb-3">
                    Tu pago está siendo procesado de forma segura
                  </p>
                  <div className="d-flex justify-content-center gap-2">
                    <button 
                      className="btn btn-outline-secondary rounded-pill"
                      onClick={() => setShowCheckoutImage(false)}
                    >
                      Cerrar
                    </button>
                    <button 
                      className="btn rounded-pill text-white"
                      style={{ background: 'linear-gradient(135deg, #8061c5 0%, #5706ad 100%)' }}
                      onClick={() => {
                        setShowCheckoutImage(false);
                        // Aquí puedes agregar lógica adicional como limpiar el carrito
                      }}
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}