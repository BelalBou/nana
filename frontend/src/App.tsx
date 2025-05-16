import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import EligibilityForm from './components/eligibility/EligibilityForm';
import EligibilityResults from './components/eligibility/EligibilityResults';

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

function App() {
  const [eligibleAids, setEligibleAids] = useState<Aid[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <EligibilityForm onEligibilityResult={setEligibleAids} />
        {eligibleAids.length > 0 && <EligibilityResults eligibleAids={eligibleAids} />}
      </Container>
    </ThemeProvider>
  );
}

export default App;
