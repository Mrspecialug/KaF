import { useState, useEffect, createContext, useContext } from 'react';
import { authAPI, databaseAPI } from '../services/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Get initial session
    authAPI.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await databaseAPI.getUserProfile(userId);
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Create profile if it doesn't exist
      const { data } = await databaseAPI.updateUserProfile(userId, {
        id: userId,
        full_name: user?.user_metadata?.full_name || 'User',
        email: user?.email,
        created_at: new Date().toISOString()
      });
      setProfile(data);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await authAPI.signIn(email, password);
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password, userData) => {
    const { data, error } = await authAPI.signUp(email, password, userData);
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await authAPI.signOut();
    if (error) throw error;
  };

  const updateProfile = async (updates) => {
    if (!user) throw new Error('No user logged in');
    
    const { data, error } = await databaseAPI.updateUserProfile(user.id, {
      ...updates,
      updated_at: new Date().toISOString()
    });
    
    if (error) throw error;
    
    setProfile(prev => ({ ...prev, ...updates }));
    return data;
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile: () => user && loadUserProfile(user.id)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};