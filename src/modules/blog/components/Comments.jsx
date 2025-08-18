import './Comments.css';

export default function Comments({ comments = [] }) {
  return (
    <div className="blog-comments">
      <h3 className="blog-comments-title h4">
        Comentarios ({comments.length || 0})
      </h3>

      {comments.length > 0 ? (
        <div className="d-flex flex-column gap-4">
          {comments.map(comment => (
            <div key={comment.commentId} className="blog-comment">
              <div className="d-flex justify-content-between align-items-center">
                <div className="blog-comment-author">{comment.author}</div>
                <div className="blog-comment-date">
                  {new Date(comment.date).toLocaleDateString()}
                </div>
              </div>
              <div className="blog-comment-content">
                {comment.content}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="blog-no-comments">
          No hay comentarios aún. ¡Sé el primero en comentar!
        </div>
      )}
    </div>
  );
}
