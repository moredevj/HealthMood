import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CategoriaGrid() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const navigate = useNavigate();

  const categorias = [
    {
      id: 1,
      titulo: 'Para Perros',
      slug: 'perros',
      imagen: 'https://img.milanuncios.com/fg/3366/59/336659760_3.jpg?VersionId=mWZSDP5xWKt3qY.jZcQmzs9vYFcdqyvK',
      descripcion: 'Todo para tu mejor amigo canino'
    },
    {
      id: 2,
      titulo: 'Para Gatos',
      slug: 'gatos',
      imagen: 'https://cobasiblog.blob.core.windows.net/production-ofc/2022/07/Gato-pupila-dilatada-768x512.jpg',
      descripcion: 'Productos especiales para felinos'
    },
    {
      id: 3,
      titulo: 'Alimento',
      slug: 'alimento',
      imagen: 'https://animalcarecentersmyrna.com/wp-content/uploads/2021/04/cat-and-dog-ready-to-eat-1024x784.jpeg',
      descripcion: 'Nutrición de calidad premium'
    },
    {
      id: 4,
      titulo: 'Accesorios',
      slug: 'accesorios',
      imagen: 'https://tse2.mm.bing.net/th/id/OIP.xPr05u9kYmpe4XV01aHJ0AHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      descripcion: 'Juguetes y accesorios divertidos'
    },
    {
      id: 5,
      titulo: 'Salud e Higiene',
      slug: 'salud e higiene',
      imagen: 'https://img.freepik.com/foto-gratis/perro-pato-goma-cabeza-banera-generada-ia_268835-10308.jpg',
      descripcion: 'Cuidado y bienestar integral'
    }
  ];

  const handleCategoryClick = (categoria) => {
  // Convertir a formato URL-amigable
  const slug = categoria.slug.toLowerCase().replace(/\s+/g, '-');
  navigate(`/products?categoria=${slug}`);
};

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="h2 fw-bold text-dark mb-3">
            Explora por categorías
          </h2>
          <p className="text-muted fs-5 mb-0 mx-auto" style={{ maxWidth: '600px' }}>
            Encuentra exactamente lo que necesitas para tu amiguito de cuatro patas.
          </p>
        </div>

        <div className="row justify-content-center g-4">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="col-6 col-md-4 col-lg-2">
              <div 
                className="text-center category-card"
                onClick={() => handleCategoryClick(categoria)}
                onMouseEnter={() => setHoveredCategory(categoria.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{ cursor: 'pointer' }}
              >
                <div 
                  className="mx-auto mb-3 position-relative overflow-hidden"
                  style={{
                    width: '140px',
                    height: '140px',
                    borderRadius: '20%',
                    transition: 'all 0.3s ease',
                    transform: hoveredCategory === categoria.id ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: hoveredCategory === categoria.id 
                      ? '0 20px 40px rgba(0,0,0,0.15)' 
                      : '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                >
                  <img
                    src={categoria.imagen}
                    alt={categoria.titulo}
                    className="w-100 h-100"
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      transform: hoveredCategory === categoria.id ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                  
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      background: hoveredCategory === categoria.id 
                        ? 'rgba(0,0,0,0.3)' 
                        : 'rgba(0,0,0,0.1)',
                      transition: 'background 0.3s ease'
                    }}
                  >
                    <div 
                      className="text-white text-center"
                      style={{
                        opacity: hoveredCategory === categoria.id ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      <i className="fas fa-arrow-right fs-4"></i>
                    </div>
                  </div>
                </div>

                <h4 
                  className="fw-bold mb-2"
                  style={{
                    fontSize: '1.1rem',
                    color: hoveredCategory === categoria.id ? '#8E2DE2' : '#2c3e50',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {categoria.titulo}
                </h4>

                <p 
                  className="text-muted small mb-0"
                  style={{
                    fontSize: '0.85rem',
                    opacity: hoveredCategory === categoria.id ? 0.8 : 0.6,
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  {categoria.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button 
            className="btn btn-outline-primary px-4 py-3 rounded-3 fw-medium"
            style={{
              borderWidth: '2px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)';
              e.currentTarget.style.borderColor = '#8E2DE2';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#0d6efd';
              e.currentTarget.style.color = '#0d6efd';
            }}
          >
            <i className="fas fa-th-large me-2"></i>
            Ver todas las categorías
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .category-card {
            transition: transform 0.3s ease;
          }
          
          .category-card:hover {
            transform: translateY(-5px);
          }
        `
      }} />
    </section>
  );
}
