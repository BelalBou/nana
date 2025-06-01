import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Stack,
  Typography,
  Card,
  CardMedia,
  IconButton,
  Alert,
  CircularProgress,
  Paper,
  Chip,
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  CloudUpload as UploadIcon,
  DragIndicator as DragIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

interface Aid {
  id: number;
  title: string;
  description: string;
  region: string;
  link: string;
  active: boolean;
  images?: string[];
}

interface UploadResponse {
  success: boolean;
  imageUrl: string;
  fileName: string;
}

interface AidFormProps {
  aid: Aid | null;
  onSubmit: (aidData: Partial<Aid>) => void;
  onCancel: () => void;
}

const AidForm: React.FC<AidFormProps> = ({ aid, onSubmit, onCancel }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    region: '',
    link: '',
    active: true,
    images: [] as string[],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    if (aid) {
      setFormData({
        title: aid.title,
        description: aid.description,
        region: aid.region,
        link: aid.link,
        active: aid.active,
        images: aid.images || [],
      });
    }
  }, [aid]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !token) return;

    // Vérifications
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Le fichier ne doit pas dépasser 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('Seuls les fichiers image sont autorisés');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await axios.post<UploadResponse>(`${API_BASE_URL}/upload/image`, uploadFormData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, response.data.imageUrl],
      }));
    } catch (error: any) {
      console.error('Erreur upload:', error);
      setUploadError(
        error.response?.data?.message || 
        'Erreur lors de l\'upload de l\'image'
      );
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleImageDelete = async (imageUrl: string, index: number) => {
    try {
      // Extraire le nom du fichier de l'URL
      const fileName = imageUrl.split('/').pop();
      
      if (token && fileName) {
        // Encoder le nom du fichier pour gérer les caractères spéciaux
        const encodedFileName = encodeURIComponent(fileName);
        await axios.delete(`${API_BASE_URL}/upload/image/${encodedFileName}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error('Erreur suppression:', error);
      // Même en cas d'erreur de suppression du fichier, on retire l'image de la liste
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...formData.images];
    const [removed] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, removed);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Titre"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          multiline
          rows={4}
          required
        />
        
        <TextField
          fullWidth
          label="Région"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          required
        />
        
        <TextField
          fullWidth
          label="Lien externe"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          required
          helperText="URL vers la page officielle de l'aide"
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            />
          }
          label="Aide active"
        />

        {/* Section Images */}
        <Box>
          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ImageIcon /> Images
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Ajoutez des images pour illustrer cette aide. La première image sera utilisée comme image principale.
          </Typography>
          
          {uploadError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setUploadError(null)}>
              {uploadError}
            </Alert>
          )}

          {/* Upload Button */}
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: 'center',
              borderStyle: 'dashed',
              borderWidth: 2,
              borderColor: 'grey.300',
              backgroundColor: 'grey.50',
              mb: 2,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'primary.50',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <Button
              variant="contained"
              component="label"
              startIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <UploadIcon />}
              disabled={uploading}
              sx={{
                mb: 1,
                px: 4,
                py: 1.5,
              }}
            >
              {uploading ? 'Upload en cours...' : 'Ajouter une image'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            
            <Typography variant="body2" color="text.secondary">
              Formats supportés: JPG, PNG, GIF • Taille max: 5MB
            </Typography>
          </Paper>

          {/* Images Grid */}
          {formData.images.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <DragIcon /> Images ajoutées ({formData.images.length})
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: 2 
              }}>
                {formData.images.map((imageUrl, index) => (
                  <Card 
                    key={index} 
                    sx={{ 
                      position: 'relative',
                      '&:hover .image-actions': {
                        opacity: 1,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={imageUrl}
                      alt={`Image ${index + 1}`}
                      sx={{ 
                        objectFit: 'cover',
                        backgroundColor: 'grey.100',
                      }}
                    />
                    
                    {/* Actions overlay */}
                    <Box
                      className="image-actions"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        opacity: 0,
                        transition: 'opacity 0.2s ease-in-out',
                      }}
                    >
                      {/* Boutons de déplacement */}
                      {index > 0 && (
                        <IconButton
                          size="small"
                          onClick={() => moveImage(index, index - 1)}
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                              backgroundColor: 'white',
                            },
                          }}
                        >
                          ←
                        </IconButton>
                      )}
                      
                      {index < formData.images.length - 1 && (
                        <IconButton
                          size="small"
                          onClick={() => moveImage(index, index + 1)}
                          sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                              backgroundColor: 'white',
                            },
                          }}
                        >
                          →
                        </IconButton>
                      )}
                      
                      <IconButton
                        size="small"
                        onClick={() => handleImageDelete(imageUrl, index)}
                        sx={{
                          backgroundColor: 'error.main',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'error.dark',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    {/* Badge pour image principale */}
                    {index === 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                        }}
                      >
                        <Chip
                          label="Image principale"
                          size="small"
                          color="primary"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      </Box>
                    )}
                    
                    {/* Numéro d'ordre */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {index + 1}
                    </Box>
                  </Card>
                ))}
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                💡 Astuce: Utilisez les flèches pour réorganiser les images. La première image sera affichée en priorité.
              </Typography>
            </Box>
          )}
        </Box>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" variant="contained">
            {aid ? 'Modifier' : 'Créer'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AidForm;