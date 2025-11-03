import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import MobileMenu from '../components/Layout/MobileMenu';
import Footer from '../components/Layout/Footer';
import ProfileInfo from '../components/Profile/ProfileInfo';
import ProfileForm from '../components/Profile/ProfileForm';
import OrdersList from '../components/Profile/OrdersList';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import './Profile.css';

const Profile = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const { user, profile, loading } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="profile-page">
      <Header 
        onMenuToggle={() => setMobileMenuOpen(true)}
      />
      
      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <section className="profile">
        <h3 className="section-title">My Profile</h3>
        
        {!editing ? (
          <ProfileInfo 
            profile={profile}
            onEdit={() => setEditing(true)}
          />
        ) : (
          <ProfileForm 
            profile={profile}
            onSave={() => setEditing(false)}
            onCancel={() => setEditing(false)}
          />
        )}
      </section>

      <section className="orders" id="orders">
        <h3 className="section-title">My Orders</h3>
        <OrdersList orders={orders} loading={ordersLoading} />
      </section>

      <Footer />
    </div>
  );
};

export default Profile;