import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
  Container,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { 
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  QuestionAnswer as QuestionIcon,
  CardGiftcard as AidIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import AidList from './AidList';
import QuestionList from './QuestionList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setMobileMenuOpen(false);
  };

  const tabs = [
    { label: 'Aides & Conditions', icon: <AidIcon />, index: 0 },
    { label: 'Questions', icon: <QuestionIcon />, index: 1 },
  ];

  const mobileMenu = (
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
          🏠 Administration
        </Typography>
        <IconButton onClick={() => setMobileMenuOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <List sx={{ px: 1, pt: 2 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => navigate('/')}
            sx={{
              borderRadius: 2,
              mx: 1,
              '&:hover': {
                backgroundColor: 'primary.50',
              },
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Retour au site" />
          </ListItemButton>
        </ListItem>
        
        {tabs.map((tab) => (
          <ListItem key={tab.index} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleTabChange({} as React.SyntheticEvent, tab.index)}
              sx={{
                borderRadius: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: 'primary.50',
                },
                ...(currentTab === tab.index && {
                  backgroundColor: 'primary.100',
                  color: 'primary.main',
                  fontWeight: 600,
                }),
              }}
            >
              <ListItemIcon sx={{ color: currentTab === tab.index ? 'primary.main' : 'inherit' }}>
                {tab.icon}
              </ListItemIcon>
              <ListItemText primary={tab.label} />
            </ListItemButton>
          </ListItem>
        ))}
        
        <Box sx={{ mx: 2, my: 2, height: 1, backgroundColor: 'grey.200' }} />
        
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              mx: 1,
              '&:hover': {
                backgroundColor: 'error.50',
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Header */}
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0, sm: 2 } }}>
            {/* Logo/Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  mr: 2,
                }}
              >
                🏠 Administration
              </Typography>
              
              {!isMobile && (
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Panel de Gestion ImmoAide
                </Typography>
              )}
            </Box>

            {/* Desktop Actions */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  onClick={() => navigate('/')}
                  startIcon={<HomeIcon />}
                  sx={{ color: 'text.primary' }}
                >
                  Retour au site
                </Button>
                
                <Button
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  variant="outlined"
                  sx={{
                    borderColor: 'grey.300',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'error.main',
                      backgroundColor: 'error.50',
                      color: 'error.main',
                    },
                  }}
                >
                  Déconnexion
                </Button>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="ouvrir le menu"
                onClick={() => setMobileMenuOpen(true)}
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
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Navigation Tabs - Desktop */}
      {!isMobile && (
        <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Container maxWidth="xl">
            <Tabs 
              value={currentTab} 
              onChange={handleTabChange} 
              aria-label="admin tabs"
              sx={{ px: { xs: 0, sm: 2 } }}
            >
              {tabs.map((tab) => (
                <Tab 
                  key={tab.index}
                  label={tab.label} 
                  icon={tab.icon}
                  iconPosition="start"
                  sx={{
                    minHeight: 60,
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    '&.Mui-selected': {
                      fontWeight: 600,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Container>
        </Paper>
      )}

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
        {/* Mobile Tab Indicator */}
        {isMobile && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              backgroundColor: 'primary.50',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {tabs[currentTab].icon}
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {tabs[currentTab].label}
              </Typography>
            </Box>
          </Paper>
        )}

        {/* Tab Panels */}
        <TabPanel value={currentTab} index={0}>
          <AidList />
        </TabPanel>
        
        <TabPanel value={currentTab} index={1}>
          <QuestionList />
        </TabPanel>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {mobileMenu}
      </Drawer>
    </Box>
  );
};

export default AdminDashboard;
