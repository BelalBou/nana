import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Fade,
  Chip,
  Button,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowBackIos as ArrowBackIcon,
  ArrowForwardIos as ArrowForwardIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';

interface ImageGalleryModalProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  description?: string;
  region?: string;
  link?: string;
  initialIndex?: number;
}

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  open,
  onClose,
  images,
  title,
  description,
  region,
  link,
  initialIndex = 0,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      goToNext();
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, open]);

  if (images.length === 0) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      fullScreen={isMobile}
      onKeyDown={handleKeyDown}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          margin: isMobile ? 0 : 2,
          borderRadius: isMobile ? 0 : 2,
          maxHeight: '95vh',
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: isMobile ? '100vh' : '80vh',
          backgroundColor: 'black',
        }}
      >
        {/* Header avec infos */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 10,
            p: 3,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1, mr: 2 }}>
              <Typography variant="h5" color="white" sx={{ fontWeight: 600, mb: 1 }}>
                {title}
              </Typography>
              
              {description && (
                <Typography variant="body2" color="grey.300" sx={{ mb: 2, maxWidth: '70%' }}>
                  {description}
                </Typography>
              )}
              
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                {region && (
                  <Chip
                    label={region}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(20, 184, 166, 0.2)',
                      color: '#14B8A6',
                      border: '1px solid rgba(20, 184, 166, 0.3)',
                    }}
                  />
                )}
                
                {images.length > 1 && (
                  <Chip
                    label={`${images.length} images`}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  />
                )}
              </Box>
            </Box>
            
            <IconButton 
              onClick={onClose} 
              sx={{ 
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <IconButton
              onClick={goToPrevious}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
                zIndex: 10,
                width: 48,
                height: 48,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            
            <IconButton
              onClick={goToNext}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
                zIndex: 10,
                width: 48,
                height: 48,
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </>
        )}

        {/* Main Image */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 4 },
            pt: { xs: 12, md: 16 },
            pb: { xs: 12, md: 8 },
          }}
        >
          <Fade in key={currentIndex} timeout={300}>
            <Box
              component="img"
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                userSelect: 'none',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            />
          </Fade>
        </Box>

        {/* Footer avec actions */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
            p: 3,
            zIndex: 10,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Image Counter et Thumbnails */}
            <Box>
              {images.length > 1 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="white" sx={{ mb: 1 }}>
                    {currentIndex + 1} / {images.length}
                  </Typography>
                  
                  {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 1, maxWidth: 400, overflowX: 'auto' }}>
                      {images.map((image, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          onClick={() => setCurrentIndex(index)}
                          sx={{
                            width: 60,
                            height: 40,
                            objectFit: 'cover',
                            cursor: 'pointer',
                            borderRadius: 1,
                            border: currentIndex === index ? '2px solid #14B8A6' : '2px solid transparent',
                            opacity: currentIndex === index ? 1 : 0.7,
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                              opacity: 1,
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            
            {/* Action Button */}
            {link && (
              <Button
                variant="contained"
                startIcon={<OpenInNewIcon />}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  backgroundColor: '#14B8A6',
                  '&:hover': {
                    backgroundColor: '#0F766E',
                  },
                  fontWeight: 600,
                  px: 3,
                }}
              >
                En savoir plus
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryModal;
