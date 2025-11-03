import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './ProfileInfo.css';

const ProfileInfo = ({ profile, onEdit }) => {
  const { user } = useAuth();

  return (
    <div className="profile-details">
      <div className="profile-picture-section">
        <img 
          src={profile?.avatar_url || "https://picsum.photos/100?random=10"} 
          alt="User profile" 
          className="profile-img-large" 
        />
        <div className="profile-picture-actions">
          <button className="btn-change-picture">
            <i className="fas fa-camera"></i> Change Picture
          </button>
        </div>
      </div>
      
      <div className="profile-info">
        <p><strong>Name:</strong> {profile?.full_name || 'Guest'}</p>
        <p><strong>Email:</strong> {profile?.email || user?.email || 'guest@example.com'}</p>
        <p><strong>Member since:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Recently'}</p>
        
        <button className="edit-profile-btn" onClick={onEdit}>
          <i className="fas fa-edit"></i> Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;