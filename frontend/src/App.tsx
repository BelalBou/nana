import React, { useState } from 'react';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import EligibilityForm from './components/eligibility/EligibilityForm';
import AidList from './components/admin/AidList';
import LoginForm from './components/admin/LoginForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function AppContent() {
  const [tabValue, setTabValue] = useState(0);
  const { isAuthenticated, logout, login } = useAuth();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={login} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Vérification d'éligibilité" />
          <Tab label="Administration" />
        </Tabs>
        <Button
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{ mr: 2 }}
        >
          Déconnexion
        </Button>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <EligibilityForm onEligibilityResult={(aids) => console.log(aids)} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <AidList />
      </TabPanel>
    </Box>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
