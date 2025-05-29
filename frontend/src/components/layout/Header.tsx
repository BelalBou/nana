import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Forcer la navigation vers la page d'accueil et recharger le composant
    navigate('/', { replace: true });
    // Petit délai pour s'assurer que la navigation est complète
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography 
          variant="h5" 
          component="a"
          href="/"
          onClick={handleHomeClick}
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'inherit',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer'
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