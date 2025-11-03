import React from 'react';
import './OrdersList.css';

const OrdersList = ({ orders, loading }) => {
  if (loading) {
    return (
      <div className="orders-list loading">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="order-item skeleton">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-button"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-list empty">
        <div className="empty-orders">
          <p>No orders yet.</p>
          <a href="/shop" className="btn btn-primary">
            <i className="fas fa-shopping-bag"></i> Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-list">
      {orders.map(order => (
        <div key={order.id} className="order-item">
          <h4>Order #{order.id?.slice(-8) || order.id}</h4>
          <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`status status-${order.status}`}>
              {order.status}
            </span>
          </p>
          <p><strong>Total:</strong> UGX {order.total_amount?.toLocaleString() || '0'}</p>
          <p><strong>Items:</strong> {order.items?.length || 0}</p>
          
          <div className="order-actions">
            <a href={`/tracking?order=${order.id}`} className="btn btn-primary">
              <i className="fas fa-shipping-fast"></i> Track Order
            </a>
            
            <button className="btn btn-secondary">
              <i className="fas fa-redo"></i> Reorder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;