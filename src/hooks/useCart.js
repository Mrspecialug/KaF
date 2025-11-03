import { useState, useEffect, useContext, createContext } from 'react';
import { databaseAPI } from '../services/supabase';
import { useAuth } from './useAuth';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart from Supabase or localStorage
  useEffect(() => {
    loadCart();
  }, [user]);

  const loadCart = async () => {
    if (user) {
      // Load from Supabase
      setLoading(true);
      try {
        const { data, error } = await databaseAPI.getCart(user.id);
        if (error) throw error;
        setCart(data || []);
      } catch (error) {
        console.error('Error loading cart:', error);
        // Fallback to localStorage
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(localCart);
      } finally {
        setLoading(false);
      }
    } else {
      // Load from localStorage for guests
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(localCart);
    }
  };

  const saveCart = async (newCart) => {
    setCart(newCart);
    
    if (user) {
      // Sync to Supabase
      try {
        // Clear existing cart
        await databaseAPI.clearCart(user.id);
        
        // Add all items
        if (newCart.length > 0) {
          const cartItems = newCart.map(item => ({
            user_id: user.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
          }));
          
          const { error } = await supabase.from('cart').insert(cartItems);
          if (error) throw error;
        }
      } catch (error) {
        console.error('Error syncing cart to Supabase:', error);
      }
    } else {
      // Save to localStorage for guests
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity }];
    }

    await saveCart(newCart);
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    
    await saveCart(newCart);
  };

  const removeFromCart = async (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    await saveCart(newCart);
  };

  const clearCart = async () => {
    await saveCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    refreshCart: loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};