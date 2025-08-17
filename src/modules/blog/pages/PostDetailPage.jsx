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
    <div className="container py-5">
      {/* Botón Volver */}
      <Link 
        to="/blog" 
        className="blog-back-button btn btn-link text-decoration-none mb-4"
      >
        <i className="fas fa-arrow-left me-2"></i>
        Volver al Blog
      </Link>

      {/* Header */}
      <div className="mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Imagen Principal */}
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="blog-detail-image w-100 mb-4"
            />

            {/* Meta información */}
            <div className="d-flex align-items-center text-muted mb-3">
              <span>
                <i className="far fa-calendar me-1"></i>
                {new Date(post.publishedDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="mx-3">•</span>
              <span>
                <i className="far fa-user me-1"></i>
                {post.author}
              </span>
              <span className="mx-3">•</span>
              <span>
                <i className="far fa-comment me-1"></i>
                {post.comments?.length || 0} comentarios
              </span>
            </div>

            {/* Título */}
            <h1 className="blog-header display-5 fw-bold mb-4">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-5">
              {/* Contenido del post */}
              <div className="prose">
                {post.content.split('\\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              {/* Sección de comentarios */}
              <div className="mt-5 pt-5 border-top">
                <h3 className="h4 mb-4">
                  Comentarios ({post.comments?.length || 0})
                </h3>

                {post.comments?.length > 0 ? (
                  <div className="d-flex flex-column gap-4">
                    {post.comments.map(comment => (
                      <div key={comment.commentId} className="card bg-light border-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="card-subtitle text-primary mb-0">
                              {comment.author}
                            </h6>
                            <small className="text-muted">
                              {new Date(comment.date).toLocaleDateString()}
                            </small>
                          </div>
                          <p className="card-text mb-0">
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
