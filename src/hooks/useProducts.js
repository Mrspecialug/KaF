import { useState, useEffect, useContext, createContext } from 'react';
import { databaseAPI } from '../services/supabase';

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // For now, using the static products array from your original code
      // In production, you would fetch from Supabase
      const staticProducts = [
        { id: 1, name: "Wireless Headphones", price: 120000, category: "Electronics", image: "https://picsum.photos/180?7" },
        { id: 2, name: "Smart Watch Series 8", price: 350000, category: "Electronics", image: "https://picsum.photos/180?8" },
        { id: 3, name: "Wireless Earbuds", price: 120000, category: "Electronics", image: "https://picsum.photos/260?1" },
        { id: 4, name: "64-GB Flash Drive", price: 25000, category: "Electronics", image: "https://picsum.photos/260?4" },
        { id: 5, name: "Men's Sneakers", price: 95000, category: "Fashion", image: "https://picsum.photos/180?9" },
        { id: 6, name: "Ceramic Table Lamp", price: 80000, category: "Home", image: "https://picsum.photos/180?10" },
        { id: 7, name: "Memory Foam Pillow", price: 45000, category: "Home", image: "https://picsum.photos/180?11" },
        { id: 8, name: "Moisturizing Cream", price: 30000, category: "Beauty", image: "https://picsum.photos/180?12" },
        { id: 9, name: "Lipstick Set", price: 50000, category: "Beauty", image: "https://picsum.photos/180?13" },
        { id: 10, name: "Multivitamin Tablets", price: 20000, category: "Health", image: "https://picsum.photos/180?14" },
        { id: 11, name: "Fitness Tracker", price: 150000, category: "Health", image: "https://picsum.photos/180?15" },
        { id: 12, name: "Organic Rice", price: 15000, category: "Groceries", image: "https://picsum.photos/180?16" },
        { id: 13, name: "Coffee Beans", price: 25000, category: "Groceries", image: "https://picsum.photos/180?17" },
      ];
      setProducts(staticProducts);
      
      // Uncomment when you have products in Supabase
      // const { data, error } = await databaseAPI.getProducts();
      // if (error) throw error;
      // setProducts(data || []);
      
    } catch (err) {
      setError(err.message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = (category) => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const searchProducts = (query) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  const value = {
    products,
    loading,
    error,
    getProductsByCategory,
    searchProducts,
    getProductById,
    refreshProducts: loadProducts
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};