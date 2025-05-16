import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import EligibilityForm from './components/eligibility/EligibilityForm';
import AidList from './components/admin/AidList';
import LoginForm from './components/admin/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" />;
};

const AppContent = () => {
  const { login } = useAuth();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
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
      </Box>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
