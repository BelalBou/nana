import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import EligibilityForm from './components/eligibility/EligibilityForm';
import AidList from './components/admin/AidList';
import LoginForm from './components/admin/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AppContent = () => {
  const { login } = useAuth();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        <Routes>
          {/* Route publique - Formulaire d'éligibilité */}
          <Route path="/" element={<EligibilityForm onEligibilityResult={() => {}} />} />
          
          {/* Routes admin */}
          <Route path="/admin/login" element={<LoginForm onLoginSuccess={login} />} />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AidList />
              </AdminRoute>
            } 
          />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
