import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Message from '../../UI/Message/Message';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { FORM_TYPES, MESSAGE_TYPES } from '../../../utils/constants';
import './Login.css';

const Login = () => {
  const [activeForm, setActiveForm] = useState(FORM_TYPES.LOGIN);
  const [messages, setMessages] = useState({
    login: { type: '', text: '' },
    signup: { type: '', text: '' }
  });

  const { session, loading, checkSession } = useAuth();

  useEffect(() => {
    if (session) {
      window.location.href = '/profile';
    }
  }, [session]);

  const clearMessages = (formType = null) => {
    if (formType) {
      setMessages(prev => ({
        ...prev,
        [formType]: { type: '', text: '' }
      }));
    } else {
      setMessages({
        login: { type: '', text: '' },
        signup: { type: '', text: '' }
      });
    }
  };

  const showMessage = (formType, type, text) => {
    setMessages(prev => ({
      ...prev,
      [formType]: { type, text }
    }));
  };

  const handleTabSwitch = (tab) => {
    setActiveForm(tab);
    clearMessages();
  };

  const handleFormSwitch = () => {
    const newForm = activeForm === FORM_TYPES.LOGIN ? FORM_TYPES.SIGNUP : FORM_TYPES.LOGIN;
    setActiveForm(newForm);
    clearMessages();
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-form-container">
          <div className="login-logo">
            <i className="fas fa-shopping-bag"></i>
            KaFra Shoppers
          </div>
          
          <div className="login-tabs">
            <button 
              className={`login-tab ${activeForm === FORM_TYPES.LOGIN ? 'active' : ''}`}
              onClick={() => handleTabSwitch(FORM_TYPES.LOGIN)}
            >
              Login
            </button>
            <button 
              className={`login-tab ${activeForm === FORM_TYPES.SIGNUP ? 'active' : ''}`}
              onClick={() => handleTabSwitch(FORM_TYPES.SIGNUP)}
            >
              Sign Up
            </button>
          </div>

          {activeForm === FORM_TYPES.LOGIN ? (
            <LoginForm
              loading={loading}
              message={messages.login}
              showMessage={showMessage}
              clearMessages={clearMessages}
              onSwitchForm={handleFormSwitch}
            />
          ) : (
            <SignupForm
              loading={loading}
              message={messages.signup}
              showMessage={showMessage}
              clearMessages={clearMessages}
              onSwitchForm={handleFormSwitch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;