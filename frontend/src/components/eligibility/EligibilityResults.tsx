import React from 'react';
import { Box, Typography, Card, CardContent, CardActions, Button, Alert, Paper } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import InfoIcon from '@mui/icons-material/Info';

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
      <Paper elevation={3} sx={{ p: 4, mt: 4, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
        <SentimentDissatisfiedIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom color="text.secondary" sx={{ mb: 3 }}>
          Aucune aide disponible pour votre situation
        </Typography>
        
        <Box sx={{ 
          bgcolor: 'info.light', 
          color: 'info.contrastText', 
          p: 2, 
          borderRadius: 1,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <InfoIcon />
          <Typography>
            Malheureusement, nous n'avons pas trouvé d'aides correspondant à votre situation dans votre région.
          </Typography>
        </Box>

        <Box sx={{ mt: 4, textAlign: 'left', maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h6" gutterBottom color="text.secondary">
            Que faire maintenant ?
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" sx={{ mb: 2 }}>
              <strong>Vérifiez vos réponses</strong> - Assurez-vous que toutes les informations sont correctes
            </Typography>
            <Typography component="li" sx={{ mb: 2 }}>
              <strong>Revenez plus tard</strong> - De nouvelles aides pourraient être ajoutées prochainement
            </Typography>
            <Typography component="li" sx={{ mb: 2 }}>
              <strong>Contactez les services sociaux</strong> - Ils pourront vous orienter vers d'autres aides non répertoriées
            </Typography>
            <Typography component="li" sx={{ mb: 2 }}>
              <strong>Consultez les sites officiels</strong> - Votre région propose peut-être d'autres types d'aides
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            Besoin d'aide ? N'hésitez pas à contacter notre service client
          </Typography>
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