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
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
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
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administration - Panel de Gestion
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange} aria-label="admin tabs">
          <Tab label="Aides & Conditions" />
          <Tab label="Questions" />
        </Tabs>
      </Paper>

      <TabPanel value={currentTab} index={0}>
        <AidList />
      </TabPanel>
      
      <TabPanel value={currentTab} index={1}>
        <QuestionList />
      </TabPanel>
    </Box>
  );
};

export default AdminDashboard;
