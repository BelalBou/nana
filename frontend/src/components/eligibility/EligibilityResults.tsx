import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Alert, Paper } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

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
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center' }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom color="text.secondary">
          Aucune aide trouvée pour votre situation
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Nous n'avons pas trouvé d'aides correspondant à votre situation dans votre région.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            Voici quelques suggestions :
          </Typography>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Vérifiez vos réponses</li>
            <li>Revenez plus tard, de nouvelles aides pourraient être ajoutées</li>
            <li>Contactez directement les services sociaux de votre région</li>
            <li>Consultez les sites officiels de votre région pour d'autres aides potentielles</li>
          </ul>
        </Box>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Alert severity="success" sx={{ mb: 3 }}>
        {eligibleAids.length} aide{eligibleAids.length > 1 ? 's' : ''} correspond{eligibleAids.length > 1 ? 'ent' : ''} à votre situation !
      </Alert>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 3,
        mt: 2
      }}>
        {eligibleAids.map((aid) => (
          <Card key={aid.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
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
                fullWidth
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