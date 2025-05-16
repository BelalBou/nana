import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Tabs, Tab } from '@mui/material';
import EligibilityForm from './components/eligibility/EligibilityForm';
import EligibilityResults from './components/eligibility/EligibilityResults';
import AidList from './components/admin/AidList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

interface Aid {
  id: number;
  title: string;
  description: string;
  region: string;
  link: string;
}

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [eligibleAids, setEligibleAids] = useState<Aid[]>([]);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Vérification d'éligibilité" />
            <Tab label="Administration" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <EligibilityForm onEligibilityResult={setEligibleAids} />
          {eligibleAids.length > 0 && <EligibilityResults eligibleAids={eligibleAids} />}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <AidList />
        </TabPanel>
      </Container>
    </ThemeProvider>
  );
}

export default App;
