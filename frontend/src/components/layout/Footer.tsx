import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(3, 1fr)'
          },
          gap: 4
        }}>
          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom>
              À propos
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Notre plateforme vous aide à trouver les aides immobilières disponibles
              dans votre région. Nous simplifions votre recherche d'aides financières
              pour votre projet immobilier.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon color="action" />
                <Link href="mailto:nastassia_dmrtds@outlook.com" color="inherit">
                  nastassia_dmrtds@outlook.com
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon color="action" />
                <Link href="tel:+33123456789" color="inherit">
                +32 4 97 19 90 08
                </Link>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                  100 Rue Jules Cerexhes, 4800 Verviers, Belgique
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Liens utiles
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" underline="hover">
                Mentions légales
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Politique de confidentialité
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Conditions d'utilisation
              </Link>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Immo Aide - Votre assistant pour les aides immobilières
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Trouvez facilement les aides disponibles en France, Flandre, Wallonie et Bruxelles
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;