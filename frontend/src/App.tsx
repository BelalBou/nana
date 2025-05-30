import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import SmartEligibilityForm from './components/eligibility/SmartEligibilityForm';
import AdminDashboard from './components/admin/AdminDashboard';
import LoginForm from './components/admin/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Thème personnalisé pour Immo Aide
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <Routes>
          {/* Route publique - Questionnaire intelligent */}
          <Route path="/" element={<SmartEligibilityForm />} />
          
          {/* Routes admin */}
          <Route path="/login" element={<LoginForm onLoginSuccess={() => {}} />} />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
