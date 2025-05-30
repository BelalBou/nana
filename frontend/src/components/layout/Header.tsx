import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  // Fonction pour gérer le clic sur le logo et réinitialiser le questionnaire
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Recharger complètement la page pour réinitialiser le questionnaire
    window.location.replace('/');
  };

  const menuItems = [
    { label: 'Accueil', path: '/', icon: <HomeIcon /> },
  ];

  const adminItems = isAuthenticated ? [
    { label: 'Administration', path: '/admin', icon: <AdminIcon /> },
    { label: 'Déconnexion', onClick: handleLogout, icon: <AdminIcon /> },
  ] : [
    { label: 'Connexion Admin', path: '/login', icon: <AdminIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        px: 2,
        pb: 2,
        borderBottom: '1px solid',
        borderColor: 'grey.200'
      }}>
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
          🏠 ImmoAide
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ px: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'primary.50',
                },
                ...(location.pathname === item.path && {
                  backgroundColor: 'primary.100',
                  color: 'primary.main',
                  fontWeight: 600,
                }),
              }}
            >
              <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </Box>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        
        <Box sx={{ mx: 2, my: 2, height: 1, backgroundColor: 'grey.200' }} />
        
        {adminItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={item.path ? Link : 'button'}
              to={item.path}
              onClick={item.onClick || handleDrawerToggle}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: item.onClick ? 'error.50' : 'primary.50',
                },
                ...(item.path && location.pathname === item.path && {
                  backgroundColor: 'primary.100',
                  color: 'primary.main',
                  fontWeight: 600,
                }),
              }}
            >
              <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {item.icon}
              </Box>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 2 }, minHeight: { xs: 64, sm: 72 } }}>
            {/* Logo et titre */}
            <Box 
              onClick={handleLogoClick}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1,
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
                userSelect: 'none',
                '&:hover': {
                  textDecoration: 'none',
                  transform: 'scale(1.02)',
                },
                transition: 'transform 0.2s ease-in-out',
              }}
            >
              <Box
                sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: { xs: 2, sm: 3 },
                  boxShadow: '0 4px 12px rgba(15, 118, 110, 0.25)',
                }}
              >
                <HomeIcon sx={{ 
                  fontSize: { xs: 24, sm: 28 }, 
                  color: 'white' 
                }} />
              </Box>
              
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  ImmoAide
                </Typography>
                
                {!isMobile && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                  >
                    Trouvez vos aides au logement
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Navigation */}
            {!location.pathname.startsWith('/admin') && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                {isMobile ? (
                  <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                      color: 'primary.main',
                      backgroundColor: 'rgba(15, 118, 110, 0.08)',
                      '&:hover': {
                        backgroundColor: 'rgba(15, 118, 110, 0.16)',
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<AdminIcon />}
                    component={Link}
                    to="/admin"
                    sx={{
                      borderColor: 'grey.300',
                      color: 'text.primary',
                      fontWeight: 500,
                      px: 3,
                      textDecoration: 'none',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.50',
                        color: 'primary.main',
                        textDecoration: 'none',
                      },
                    }}
                  >
                    Administration
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;