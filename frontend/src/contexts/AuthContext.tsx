import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  email: string;
}

interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('adminToken');
  });
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('🔄 useEffect token changé:', token ? 'TOKEN_PRÉSENT' : 'TOKEN_ABSENT');
    
    if (token) {
      try {
        // Décoder le token JWT pour récupérer les infos utilisateur
        const decoded = jwtDecode<JwtPayload>(token);
        console.log('🔓 Token décodé:', decoded);
        
        localStorage.setItem('adminToken', token);
        // Configuration d'axios pour inclure le token dans toutes les requêtes
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Utiliser les vraies informations du token
        setUser({ 
          id: decoded.sub, 
          email: decoded.email 
        });
        
        console.log('✅ Utilisateur défini:', { id: decoded.sub, email: decoded.email });
      } catch (error) {
        console.error('❌ Erreur lors du décodage du token:', error);
        // Token invalide, on le supprime
        localStorage.removeItem('adminToken');
        setToken(null);
        setUser(null);
      }
    } else {
      console.log('🧹 Nettoyage: token absent');
      localStorage.removeItem('adminToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const login = (newToken: string) => {
    console.log('🔐 AuthContext.login() appelé avec token:', newToken ? 'TOKEN_PRÉSENT' : 'TOKEN_ABSENT');
    console.log('🔐 Longueur du token:', newToken?.length);
    setToken(newToken);
    console.log('🔐 setToken() appelé');
  };

  const logout = () => {
    console.log('🚪 AuthContext.logout() appelé');
    setToken(null);
  };

  console.log('🔍 État actuel:', { 
    hasToken: !!token, 
    hasUser: !!user, 
    isAuthenticated: !!token,
    userEmail: user?.email 
  });

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Exporter aussi AuthContext directement
export { AuthContext };