import { useState, useEffect } from 'react';
import { useCart } from '../../cart/hooks/useCart';
import { useProducts } from '../../../hooks/useProducts';
import CategoriaGrid from './CategoriaGrid';
import SafeImage from '../../../components/SafeImage';

export default function Main() {
  const [favorites, setFavorites] = useState(new Set());
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Usar el hook personalizado para obtener productos
  const { products, loading: isLoading, error, isUsingFallback, isAuthenticated } = useProducts();

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(p => {
    // Asegurar que p.category sea siempre un string
    return typeof p.category === 'object' && p.category !== null 
      ? p.category.name || 'sin-categoria'
      : p.category || 'sin-categoria';
  }).filter(Boolean))];

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => {
      if (filterCategory === 'all') return true;

      // Extraer el nombre de la categoría independientemente de si es objeto o string
      const productCategory = typeof product.category === 'object' && product.category !== null
        ? product.category.name || 'sin-categoria'
        : product.category || 'sin-categoria';

      return productCategory === filterCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Cargando productos...</span>
          </div>
          <p className="text-muted">Cargando productos increíbles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">
      {/* Products Section */}
      <section className="container mb-5 pt-5">
        <div className="text-center mb-5">
          <h2 className="h3 fw-bold text-dark mb-2">
            Productos Populares
          </h2>
          <p className="text-muted mb-0">
            Selección especial de productos premium para el bienestar de tu mascota.
          </p>
        </div>

        {/* Category Filter */}
        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label fw-medium text-muted small">CATEGORÍA</label>
            <select 
              className="form-select form-select-lg border-0 bg-light rounded-3"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Todas las categorías' : 
                   cat === 'sin-categoria' ? 'Sin categoría' :
                   (typeof cat === 'string' ? cat.charAt(0).toUpperCase() + cat.slice(1) : cat)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row justify-content-center g-5">
          {filteredAndSortedProducts.slice(0, 3).map((product, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id} style={{ marginLeft: index === 0 ? 'auto' : '2rem', marginRight: index === 2 ? 'auto' : '2rem' }}>
              <div 
                className="card h-100 border-0 rounded-4 overflow-hidden bg-white shadow-sm product-card" 
                style={{ 
                  position: 'relative',
                  transition: 'transform 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Product Image */}
                <div className="position-relative">
                  <SafeImage 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.name}
                    productId={product.id} 
                    style={{ 
                      height: '200px', 
                      objectFit: 'cover'
                    }}
                  />
                  {/* Badge de origen */}
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className={`badge ${isUsingFallback ? 'bg-warning' : 'bg-success'}`}>
                      {isUsingFallback ? 'Mock' : 'Backend'}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="card-body p-3 d-flex flex-column" style={{ minHeight: '220px' }}>
                  <div>
                    <h5 className="card-title fw-bold mb-1">{product.name}</h5>
                    <p className="text-muted small mb-2">{product.description}</p>
                    
                    {/* Rating */}
                    <div className="d-flex align-items-center mb-3">
                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} 
                             className="fa-solid fa-star me-1 text-warning"
                             style={{ fontSize: '16px' }}
                          ></i>
                        ))}
                        <small className="ms-2 fw-medium">4.8</small>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <span className="h5 text-primary mb-0">
                        ${typeof product.price === 'number' ? product.price.toLocaleString('es-CL') : (product.price || '0')}
                      </span>
                      {product.stock !== undefined && (
                        <small className="text-muted ms-2">
                          Stock: {product.stock}
                        </small>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button - Positioned at bottom */}
                  <div className="mt-auto text-end">
                    <button 
                      className="btn px-3 py-2 d-inline-flex align-items-center gap-2 fw-medium"
                      onClick={() => addToCart(product, 1)}
                      style={{ 
                        background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease, background 0.3s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(0.98)';
                        e.currentTarget.style.background = '#6B2FD1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)';
                      }}
                    >
                      <i className="fa-solid fa-cart-plus"></i>
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid Section - NUEVA SECCIÓN */}
      <CategoriaGrid />

       {/* Newsletter Section */}
      <section className="container py-5">
        <div className="card text-white border-0 shadow-lg" style={{
          background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)'
        }}>
          <div className="card-body p-5 text-center">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h3 className="display-6 fw-bold mb-3">¡No te pierdas nuestras ofertas!</h3>
                <p className="lead mb-4 opacity-75">
                  Suscríbete a nuestro newsletter y recibe descuentos exclusivos, nuevos productos y mucho más.
                </p>
                <div className="row g-2 justify-content-center">
                  <div className="col-md-6">
                    <input 
                      type="email" 
                      className="form-control form-control-lg rounded-3 border-0"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="col-md-auto">
                    <button className="btn btn-lg rounded-3 fw-bold px-4" style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#047857';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <i className="fas fa-paper-plane me-2"></i>
                      Suscribirse
                    </button>
                  </div>
                </div>
                <small className="opacity-75 mt-3 d-block">
                  <i className="fas fa-lock me-1"></i>
                  100% libre de spam. Cancela cuando quieras.
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .product-card:hover .product-overlay {
            opacity: 1 !important;
            transition: opacity 0.3s ease;
          }
          
          .backdrop-blur {
            backdrop-filter: blur(10px);
          }
        `
      }} />
    </div>
  );
}