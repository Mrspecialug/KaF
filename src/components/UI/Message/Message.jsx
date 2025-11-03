import React from 'react';
import './Message.css';

const Message = ({ 
  type = 'info', 
  message, 
  visible = false,
  className = '' 
}) => {
  if (!visible || !message) return null;

  return (
    <div className={`message message-${type} ${className}`}>
      {message}
    </div>
  );
};

export default Message;