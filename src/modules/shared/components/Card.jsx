import PropTypes from 'prop-types';
import '../styles/Card.css';

export function Card({ 
  children,
  variant = 'default',
  className = '',
  hoverable = false,
  ...props 
}) {
  return (
    <div 
      className={`card-custom card-${variant} ${hoverable ? 'card-hoverable' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardImage({ src, alt, className = '' }) {
  return (
    <div className="card-image">
      <img src={src} alt={alt} className={`card-img ${className}`} />
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h5 className={`card-title ${className}`}>
      {children}
    </h5>
  );
}

export function CardText({ children, className = '' }) {
  return (
    <p className={`card-text ${className}`}>
      {children}
    </p>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'elevated', 'outlined']),
  className: PropTypes.string,
  hoverable: PropTypes.bool,
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
