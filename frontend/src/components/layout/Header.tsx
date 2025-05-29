import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography 
          variant="h5" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          🏠 Immo Aide
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {user ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin"
                variant={location.pathname === '/admin' ? 'outlined' : 'text'}
                sx={{ color: 'white' }}
              >
                Admin
              </Button>
              <Button 
                color="inherit" 
                onClick={logout}
                sx={{ color: 'white' }}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              sx={{ color: 'white' }}
            >
              Connexion Admin
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;