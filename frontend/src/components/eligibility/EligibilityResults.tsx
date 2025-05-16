import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button } from '@mui/material';

interface Aid {
  id: number;
  title: string;
  description: string;
  region: string;
  link: string;
}

interface EligibilityResultsProps {
  eligibleAids: Aid[];
}

const EligibilityResults: React.FC<EligibilityResultsProps> = ({ eligibleAids }) => {
  if (eligibleAids.length === 0) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Aucune aide éligible trouvée pour votre situation.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Aides éligibles ({eligibleAids.length})
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 3,
        mt: 2
      }}>
        {eligibleAids.map((aid) => (
          <Card key={aid.id} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {aid.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {aid.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Région : {aid.region}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href={aid.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                En savoir plus
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default EligibilityResults; 