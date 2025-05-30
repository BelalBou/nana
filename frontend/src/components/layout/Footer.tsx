import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  useTheme,
  Snackbar,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const [showCopySnackbar, setShowCopySnackbar] = useState(false);

  // Fonction pour gérer les clics sur email avec fallback
  const handleEmailClick = (email: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    try {
      // Essayer d'ouvrir le client email
      const mailtoUrl = `mailto:${email}`;
      const newWindow = window.open(mailtoUrl, '_blank');
      
      // Si l'ouverture échoue, copier l'email
      setTimeout(() => {
        if (!newWindow || newWindow.closed) {
          copyToClipboard(email);
        }
      }, 100);
    } catch (error) {
      console.log('Erreur avec mailto, copie de l\'email:', error);
      copyToClipboard(email);
    }
  };

  // Fonction pour copier l'email dans le presse-papier
  const copyToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setShowCopySnackbar(true);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowCopySnackbar(true);
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      text: 'nastassia_dmrtds@outlook.com',
      href: 'mailto:nastassia_dmrtds@outlook.com',
      email: 'nastassia_dmrtds@outlook.com',
    },
    {
      icon: <PhoneIcon />,
      text: '+32 4 97 19 90 08',
      href: 'tel:+32497199008',
    },
    {
      icon: <LocationIcon />,
      text: 'Verviers, Belgique',
      href: '#',
    },
  ];

  const links = [
    { text: 'À propos', href: '#' },
    { text: 'Services', href: '#' },
    { text: 'Contact', href: '#' },
    { text: 'Aide', href: '#' },
  ];

  const legalLinks = [
    { text: 'Mentions légales', href: '#' },
    { text: 'Politique de confidentialité', href: '#' },
    { text: 'Conditions d\'utilisation', href: '#' },
    { text: 'Cookies', href: '#' },
  ];

  const socialLinks = [
    { icon: <LinkedInIcon />, href: '#', name: 'LinkedIn' },
    { icon: <FacebookIcon />, href: '#', name: 'Facebook' },
    { icon: <TwitterIcon />, href: '#', name: 'Twitter' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: 'white',
        pt: { xs: 4, md: 6 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 4 },
            flexWrap: 'wrap'
          }}
        >
          {/* Logo et description */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33%' }, mb: { xs: 3, md: 0 } }}>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    boxShadow: '0 4px 12px rgba(15, 118, 110, 0.3)',
                  }}
                >
                  <HomeIcon sx={{ fontSize: 24, color: 'white' }} />
                </Box>
                
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #14B8A6 0%, #10B981 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ImmoAide
                </Typography>
              </Box>
              
              <Typography
                variant="body2"
                sx={{
                  color: 'grey.300',
                  lineHeight: 1.6,
                  maxWidth: 300,
                }}
              >
                Votre plateforme de référence pour trouver toutes les aides et subventions 
                disponibles pour votre projet immobilier. Simplifiez vos démarches.
              </Typography>
            </Box>

            {/* Réseaux sociaux */}
            <Box>
              <Typography variant="body2" sx={{ mb: 2, color: 'grey.300', fontWeight: 500 }}>
                Suivez-nous
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: 'grey.400',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      '&:hover': {
                        backgroundColor: 'rgba(20, 184, 166, 0.2)',
                        color: '#14B8A6',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Liens rapides */}
          <Box sx={{ flex: { xs: '1 1 50%', sm: '1 1 25%', md: '1 1 16%' }, mb: { xs: 3, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              Navigation
            </Typography>
            <Stack spacing={1}>
              {links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  sx={{
                    color: 'grey.300',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: '#14B8A6',
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.2s ease-in-out',
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Liens légaux */}
          <Box sx={{ flex: { xs: '1 1 50%', sm: '1 1 25%', md: '1 1 25%' }, mb: { xs: 3, md: 0 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              Informations légales
            </Typography>
            <Stack spacing={1}>
              {legalLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  sx={{
                    color: 'grey.300',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: '#14B8A6',
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.2s ease-in-out',
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Stack>
          </Box>

          {/* Contact */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 25%' } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'white',
                fontSize: '1.1rem',
              }}
            >
              Contact
            </Typography>
            <Stack spacing={2}>
              {contactInfo.map((contact, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      color: '#14B8A6',
                      mr: 2,
                      minWidth: 20,
                    }}
                  >
                    {contact.icon}
                  </Box>
                  {contact.email ? (
                    <Link
                      component="button"
                      onClick={(e) => handleEmailClick(contact.email!, e)}
                      sx={{
                        color: 'grey.300',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        '&:hover': {
                          color: '#14B8A6',
                        },
                        transition: 'color 0.2s ease-in-out',
                      }}
                    >
                      {contact.text}
                    </Link>
                  ) : (
                    <Link
                      href={contact.href}
                      sx={{
                        color: 'grey.300',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: '#14B8A6',
                        },
                        transition: 'color 0.2s ease-in-out',
                      }}
                    >
                      {contact.text}
                    </Link>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            gap: { xs: 2, sm: 0 },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'grey.400', fontSize: '0.875rem' }}
          >
            © {currentYear} ImmoAide. Tous droits réservés.
          </Typography>
          
          <Typography
            variant="body2"
            sx={{ color: 'grey.400', fontSize: '0.875rem' }}
          >
            Fait avec ❤️ pour simplifier vos démarches immobilières
          </Typography>
        </Box>
      </Container>

      {/* Snackbar pour confirmer la copie */}
      <Snackbar
        open={showCopySnackbar}
        autoHideDuration={3000}
        onClose={() => setShowCopySnackbar(false)}
        message="Email copié dans le presse-papier !"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Footer;