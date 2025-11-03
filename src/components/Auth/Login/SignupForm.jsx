import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import Message from '../../UI/Message/Message';
import { FORM_TYPES, MESSAGE_TYPES } from '../../../utils/constants';

const SignupForm = ({ loading, message, showMessage, clearMessages, onSwitchForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { signUp } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages(FORM_TYPES.SIGNUP);

    if (formData.password !== formData.confirmPassword) {
      showMessage(FORM_TYPES.SIGNUP, MESSAGE_TYPES.ERROR, 'Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      showMessage(FORM_TYPES.SIGNUP, MESSAGE_TYPES.ERROR, 'Password must be at least 6 characters long.');
      return;
    }

    const { error } = await signUp(
      formData.email, 
      formData.password, 
      { full_name: formData.name }
    );

    if (error) {
      showMessage(FORM_TYPES.SIGNUP, MESSAGE_TYPES.ERROR, error.message);
    } else {
      showMessage(FORM_TYPES.SIGNUP, MESSAGE_TYPES.SUCCESS, 
        'Success! Please check your email for a confirmation link to complete your registration.'
      );
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <form className="form-content" onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        type="text"
        id="signup-name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="Enter your full name"
      />
      
      <Input
        label="Email"
        type="email"
        id="signup-email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
      />
      
      <Input
        label="Password"
        type="password"
        id="signup-password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Create a password (min. 6 characters)"
        minLength="6"
      />
      
      <Input
        label="Confirm Password"
        type="password"
        id="signup-confirm-password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        placeholder="Confirm your password"
      />
      
      <Button
        type="submit"
        loading={loading}
        loadingText="Creating Account..."
        className="login-btn"
      >
        Create Account
      </Button>
      
      <Message
        type={message.type}
        message={message.text}
        visible={!!message.text}
      />
      
      <div className="form-footer">
        <div className="form-switch">
          Already have an account?{' '}
          <a onClick={onSwitchForm}>
            Login here
          </a>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;