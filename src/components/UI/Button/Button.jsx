import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  loading = false, 
  loadingText = 'Loading...',
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${loading ? 'loading' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      <span className="btn-text">{children}</span>
      {loading && (
        <span className="btn-loading">
          <i className="fas fa-spinner fa-spin"></i> {loadingText}
        </span>
      )}
    </button>
  );
};

export default Button;