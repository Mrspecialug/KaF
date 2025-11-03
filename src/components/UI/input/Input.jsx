import React from 'react';
import './Input.css';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  id,
  name,
  className = '',
  ...props
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="form-input"
        {...props}
      />
    </div>
  );
};

export default Input;