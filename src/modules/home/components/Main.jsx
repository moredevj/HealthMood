import { useState, useEffect } from 'react';
import { MOCK } from '../utils/dummyData.js';
import CategoriaGrid from './CategoriaGrid'; // Importa el componente

export default function Main() {
  const [products, setProducts] = useState(MOCK);
  const [favorites, setFavorites] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category || 'general'))];

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product => filterCategory === 'all' || (product.category || 'general') === filterCategory)
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

  const addToCart = (product) => {
    // Simulate add to cart
    console.log('Added to cart:', product);
    // Here you would typically dispatch to cart context/redux
  };

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
                  {cat === 'all' ? 'Todas las categorías' : cat.charAt(0).toUpperCase() + cat.slice(1)}
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
                  <img 
                    src={product.img} 
                    className="card-img-top" 
                    alt={product.name}
                    style={{ 
                      height: '200px', 
                      objectFit: 'cover'
                    }}
                  />
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
                        ${product.price.toLocaleString('es-CL')}
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Button - Positioned at bottom */}
                  <div className="mt-auto text-end">
                    <button 
                      className="btn px-3 py-2 d-inline-flex align-items-center gap-2 fw-medium"
                      onClick={() => addToCart(product)}
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
<<<<<<< HEAD
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
=======

      <div className="container">
        {/* Filters and Search */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  {/* Category Filter */}
                  <div className="col-md-4">
                    <label className="form-label fw-medium text-muted small">CATEGORÍA</label>
                    <select 
                      className="form-select form-select-lg border-0 bg-light rounded-3"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === 'all' ? 'Todas las categorías' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Filter */}
                  <div className="col-md-4">
                    <label className="form-label fw-medium text-muted small">ORDENAR POR</label>
                    <select 
                      className="form-select form-select-lg border-0 bg-light rounded-3"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Nombre A-Z</option>
                      <option value="price-asc">Precio: Menor a Mayor</option>
                      <option value="price-desc">Precio: Mayor a Menor</option>
                    </select>
                  </div>

                  {/* Stats */}
                  <div className="col-md-4">
                    <label className="form-label fw-medium text-muted small">RESULTADOS</label>
                    <div className="bg-light rounded-3 p-3">
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="fw-bold text-primary fs-4">{filteredAndSortedProducts.length}</span>
                        <span className="text-muted">productos encontrados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}

        {/* Newsletter Section */}
        <section className="py-5">
          <div className="card bg-gradient bg-primary text-white border-0 shadow-lg">
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
                      <button className="btn btn-warning btn-lg rounded-3 fw-bold px-4">
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
      </div>

      <style>{`
        .product-card:hover .product-overlay {
          opacity: 1 !important;
          transition: opacity 0.3s ease;
        }
        
        .backdrop-blur {
          backdrop-filter: blur(10px);
        }
      `}</style>
>>>>>>> 10717f8082f3227421fa53b2da6d4e2128d6e7c4
    </div>
  );
}