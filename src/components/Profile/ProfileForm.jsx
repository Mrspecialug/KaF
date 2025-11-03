import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './ProfileForm.css';

const ProfileForm = ({ profile, onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || ''
  });

  const { updateProfile } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(formData);
      onSave();
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h4 className="section-title">Edit Profile</h4>
      
      <Input
        label="Full Name"
        type="text"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        required
        placeholder="Enter your full name"
      />
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="Enter your email"
      />
      
      <div className="form-actions">
        <Button 
          type="submit" 
          loading={loading}
          className="submit-profile"
        >
          Save Changes
        </Button>
        
        <button 
          type="button" 
          className="cancel-edit" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;