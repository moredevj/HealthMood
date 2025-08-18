import PropTypes from 'prop-types';
import '../styles/Button.css';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  icon,
  isLoading,
  ...props 
}) {
  const baseClass = `btn-custom btn-${variant} btn-${size} ${className}`;
  
  return (
    <button 
      className={baseClass}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <span className="spinner-border spinner-border-sm me-2" />}
      {icon && <span className="btn-icon me-2">{icon}</span>}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline-primary', 'outline-secondary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
};
