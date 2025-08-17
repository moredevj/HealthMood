import { Link } from 'react-router-dom';
import './Blog.css';

export default function PostList({ posts }) {
  return (
    <div className="row g-4">
      {posts.map(post => (
        <div key={post.postId} className="col-md-6">
          <div className="blog-post-card card shadow-sm">
            {/* Imagen */}
            <img 
              src={post.imageUrl} 
              className="blog-post-image card-img-top"
              alt={post.title}
            />
            
            <div className="card-body p-4">
              {/* Meta información */}
              <div className="d-flex align-items-center text-muted mb-2">
                <small>
                  <i className="far fa-calendar me-1"></i>
                  {new Date(post.publishedDate).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </small>
                <span className="mx-2">•</span>
                <small>
                  <i className="far fa-user me-1"></i>
                  {post.author}
                </small>
              </div>
              
              {/* Título */}
              <h3 className="h4 card-title mb-3">
                <Link 
                  to={`/blog/${post.postId}`}
                  className="blog-post-title text-decoration-none stretched-link"
                >
                  {post.title}
                </Link>
              </h3>
              
              {/* Resumen */}
              <p className="card-text text-muted">
                {post.summary}
              </p>
            </div>
            
            {/* Footer */}
            <div className="card-footer bg-white border-0 pt-0 pb-4 px-4">
              <div className="d-flex align-items-center">
                <span className="text-muted small">
                  <i className="far fa-comment me-1"></i>
                  {post.comments?.length || 0} comentarios
                </span>
                <Link 
                  to={`/blog/${post.postId}`}
                  className="blog-read-more btn btn-outline-primary rounded-pill ms-auto"
                >
                  Leer más
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
