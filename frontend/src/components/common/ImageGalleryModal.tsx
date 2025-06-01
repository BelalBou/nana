import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardMedia,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';

interface ImageGalleryModalProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  description: string;
  region: string;
  link?: string;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  open,
  onClose,
  images,
  title,
  description,
  region,
  link,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      fullScreen={isMobile}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: isMobile ? 0 : 3,
          maxHeight: isMobile ? '100vh' : '90vh',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {images.length > 0 ? (
          <Box>
            {/* Image principale */}
            <Box
              sx={{
                position: 'relative',
                height: { xs: 300, sm: 400, md: 500 },
                backgroundColor: 'grey.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  backgroundColor: 'grey.50',
                }}
              />

              {/* Navigation des images */}
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePreviousImage}
                    sx={{
                      position: 'absolute',
                      left: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      },
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>

                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: 'absolute',
                      right: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      },
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>

                  {/* Indicateur de position */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {currentImageIndex + 1} / {images.length}
                  </Box>
                </>
              )}
            </Box>

            {/* Thumbnails */}
            {images.length > 1 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  p: 2,
                  overflowX: 'auto',
                  backgroundColor: 'grey.50',
                }}
              >
                {images.map((image, index) => (
                  <Card
                    key={index}
                    elevation={0}
                    sx={{
                      minWidth: 80,
                      width: 80,
                      height: 60,
                      cursor: 'pointer',
                      border: '2px solid',
                      borderColor: index === currentImageIndex ? 'primary.main' : 'transparent',
                      borderRadius: 1,
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: 'primary.main',
                      },
                      transition: 'border-color 0.2s ease-in-out',
                    }}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`Thumbnail ${index + 1}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'grey.50',
            }}
          >
            <Typography color="text.secondary">
              Aucune image disponible
            </Typography>
          </Box>
        )}

        {/* Informations */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Chip
              label={region}
              size="small"
              color="primary"
              sx={{ mb: 2 }}
            />
            
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                color: 'text.secondary',
              }}
            >
              {description}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Button onClick={onClose} sx={{ minWidth: 100 }}>
            Fermer
          </Button>
          
          {link && (
            <Button
              variant="contained"
              startIcon={<LaunchIcon />}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                minWidth: 150,
                flex: 1,
              }}
            >
              En savoir plus
            </Button>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ImageGalleryModal;
