import { useState } from 'react';
import { MOCK_POSTS } from '../utils/dummyData';
import PostList from '../components/PostList';
import '../components/Blog.css';

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const totalPosts = MOCK_POSTS.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Obtener posts para la página actual
  const getCurrentPosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return MOCK_POSTS.slice(startIndex, endIndex);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="blog-header display-4 fw-bold mb-3">
          Blog de Salud Animal
        </h1>
        <p className="lead text-muted">
          Consejos y noticias sobre el cuidado y bienestar de tus mascotas
        </p>
      </div>

      {/* Lista de Posts */}
      <PostList posts={getCurrentPosts()} />

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-5">
          <nav aria-label="Navegación del blog">
            <ul className="blog-pagination pagination">
              {/* Botón Anterior */}
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left me-1"></i>
                  Anterior
                </button>
              </li>

              {/* Números de página */}
              {[...Array(totalPages)].map((_, index) => (
                <li 
                  key={index + 1} 
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                    style={
                      currentPage === index + 1 
                        ? { backgroundColor: '#5706ad', borderColor: '#5706ad' }
                        : { color: '#5706ad' }
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              {/* Botón Siguiente */}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage === totalPages}
                  style={{ color: '#5706ad' }}
                >
                  Siguiente
                  <i className="fas fa-chevron-right ms-1"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
