import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Message from '../../UI/Message/Message';
import { FORM_TYPES, MESSAGE_TYPES } from '../../../utils/constants';

const LoginForm = ({ loading, message, showMessage, clearMessages, onSwitchForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { signIn, resetPassword } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages(FORM_TYPES.LOGIN);

    const { data, error } = await signIn(formData.email, formData.password);

    if (error) {
      showMessage(FORM_TYPES.LOGIN, MESSAGE_TYPES.ERROR, error.message);
    } else {
      window.location.href = '/profile';
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email address to reset your password:");
    
    if (!email) return;

    clearMessages(FORM_TYPES.LOGIN);
    const { error } = await resetPassword(email, window.location.origin);

    if (error) {
      showMessage(FORM_TYPES.LOGIN, MESSAGE_TYPES.ERROR, error.message);
    } else {
      showMessage(FORM_TYPES.LOGIN, MESSAGE_TYPES.SUCCESS, "Password reset link sent! Please check your email.");
    }
  };

  return (
    <form className="form-content active" onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        id="login-email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
      />
      
      <Input
        label="Password"
        type="password"
        id="login-password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Enter your password"
      />
      
      <Button
        type="submit"
        loading={loading}
        loadingText="Logging in..."
        className="login-btn"
      >
        Login
      </Button>
      
      <Message
        type={message.type}
        message={message.text}
        visible={!!message.text}
      />
      
      <div className="form-footer">
        <div className="forgot-password">
          <a onClick={handleForgotPassword}>
            Forgot Password?
          </a>
        </div>
        <div className="form-switch">
          Don't have an account?{' '}
          <a onClick={onSwitchForm}>
            Sign up here
          </a>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;