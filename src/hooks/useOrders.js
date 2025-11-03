import { useState, useEffect, useContext, createContext } from 'react';
import { databaseAPI } from '../services/supabase';
import { useAuth } from './useAuth';

const OrdersContext = createContext();

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await databaseAPI.getOrders(user.id);
      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      const { data, error } = await databaseAPI.createOrder({
        ...orderData,
        user_id: user.id,
        status: 'pending',
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      // Refresh orders list
      await loadOrders();
      return data;
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId);
      
      if (error) throw error;
      
      // Refresh orders list
      await loadOrders();
    } catch (err) {
      console.error('Error updating order:', err);
      throw err;
    }
  };

  const value = {
    orders,
    loading,
    error,
    createOrder,
    updateOrderStatus,
    refreshOrders: loadOrders
  };

  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};