import { useParams, Link } from 'react-router-dom';
import { MOCK_POSTS } from '../utils/dummyData';
import '../components/Blog.css';

export default function PostDetailPage() {
  const { id } = useParams();
  const post = MOCK_POSTS.find(p => p.postId === parseInt(id));

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Post no encontrado</h2>
        <Link to="/blog" className="btn btn-primary">
          Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-3 py-md-5">
      {/* Botón Volver */}
      <Link 
        to="/blog" 
        className="blog-back-button btn btn-link text-decoration-none mb-3 mb-md-4 d-inline-flex align-items-center"
      >
        <i className="fas fa-arrow-left me-2"></i>
        Volver al Blog
      </Link>

      {/* Header */}
      <div className="mb-4 mb-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {/* Imagen Principal */}
            <div className="position-relative rounded-4 overflow-hidden mb-4">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="blog-detail-image w-100"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
            </div>

            {/* Meta información */}
            <div className="d-flex flex-wrap align-items-center text-muted mb-3 gap-3">
              <span className="d-inline-flex align-items-center">
                <i className="far fa-calendar me-2"></i>
                {new Date(post.publishedDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="d-none d-sm-inline">•</span>
              <span className="d-inline-flex align-items-center">
                <i className="far fa-user me-2"></i>
                {post.author}
              </span>
              <span className="d-none d-sm-inline">•</span>
              <span className="d-inline-flex align-items-center">
                <i className="far fa-comment me-2"></i>
                {post.comments?.length || 0} comentarios
              </span>
            </div>

            {/* Título */}
            <h1 className="blog-header display-5 fw-bold mb-4 text-break">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-3 p-sm-4 p-md-5">
              {/* Contenido del post */}
              <div className="prose">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-break">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Sección de comentarios */}
              <div className="mt-4 mt-md-5 pt-4 pt-md-5 border-top">
                <h3 className="h4 mb-4">
                  Comentarios ({post.comments?.length || 0})
                </h3>

                {post.comments?.length > 0 ? (
                  <div className="d-flex flex-column gap-3 gap-md-4">
                    {post.comments.map(comment => (
                      <div key={comment.commentId} className="card bg-light border-0">
                        <div className="card-body p-3 p-md-4">
                          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 gap-2">
                            <h6 className="card-subtitle text-primary mb-0">
                              {comment.author}
                            </h6>
                            <small className="text-muted">
                              {new Date(comment.date).toLocaleDateString()}
                            </small>
                          </div>
                          <p className="card-text mb-0 text-break">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">
                    No hay comentarios aún. ¡Sé el primero en comentar!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
