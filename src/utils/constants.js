export const SUPABASE_CONFIG = {
  url: "https://hjcifrqpiupdcpbiuhnz.supabase.co",
  key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqY2lmcnFwaXVwZGNwYml1aG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTAxMDQsImV4cCI6MjA3NTE4NjEwNH0.8EFPjjD6Rz26JMTNMazj77bU-orKJNiFWix6DJVuYVc"
};

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion', 
  'Home',
  'Beauty',
  'Health',
  'Groceries'
];

export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_METHODS = {
  MOBILE_MONEY: 'mobile-money',
  CARD: 'card',
  CASH: 'cash'
};

export const DELIVERY_FEES = {
  STANDARD: 7000,
  EXPRESS: 15000,
  FREE_THRESHOLD: 50000
};