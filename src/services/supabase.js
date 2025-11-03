import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://hjcifrqpiupdcpbiuhnz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqY2lmcnFwaXVwZGNwYml1aG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAxMDQsImV4cCI6MjA3NTE4NjEwNH0.8EFPjjD6Rz26JMTNMazj77bU-orKJNiFWix6DJVuYVc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Auth functions
export const authAPI = {
  signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
  signUp: (email, password, userData) => supabase.auth.signUp({ 
    email, password, options: { data: userData } 
  }),
  signOut: () => supabase.auth.signOut(),
  getSession: () => supabase.auth.getSession(),
  updateUser: (data) => supabase.auth.updateUser(data),
  resetPassword: (email) => supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin
  })
};

// Database functions
export const databaseAPI = {
  // Users
  getUserProfile: (userId) => 
    supabase.from('users').select('*').eq('id', userId).single(),
  
  updateUserProfile: (userId, data) => 
    supabase.from('users').update(data).eq('id', userId),
  
  // Products
  getProducts: () => supabase.from('products').select('*'),
  getProductsByCategory: (category) => 
    supabase.from('products').select('*').eq('category', category),
  
  // Cart
  getCart: (userId) => 
    supabase.from('cart').select('*').eq('user_id', userId),
  
  addToCart: (cartItem) => 
    supabase.from('cart').insert([cartItem]),
  
  updateCartItem: (itemId, updates) => 
    supabase.from('cart').update(updates).eq('id', itemId),
  
  removeFromCart: (itemId) => 
    supabase.from('cart').delete().eq('id', itemId),
  
  clearCart: (userId) => 
    supabase.from('cart').delete().eq('user_id', userId),
  
  // Orders
  getOrders: (userId) => 
    supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
  
  createOrder: (orderData) => 
    supabase.from('orders').insert([orderData]).select(),
  
  // Storage
  uploadFile: (bucket, path, file) => 
    supabase.storage.from(bucket).upload(path, file, { upsert: true }),
  
  getPublicUrl: (bucket, path) => 
    supabase.storage.from(bucket).getPublicUrl(path)
};