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
  const [uploadProgress, setUploadProgress] = useState(0);

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

  // Fonction pour nettoyer le nom de fichier
  const sanitizeFileName = (fileName: string): string => {
    return fileName
      .normalize('NFD') // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, '') // Supprime les diacritiques
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Remplace les caractères spéciaux par _
      .replace(/_+/g, '_') // Remplace les _ multiples par un seul
      .toLowerCase();
  };

  // Fonction pour compresser l'image
  const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<File> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        try {
          // Calculer les nouvelles dimensions
          let { width, height } = img;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Dessiner l'image redimensionnée
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convertir en blob puis en fichier avec nom nettoyé
          canvas.toBlob((blob) => {
            if (blob) {
              const cleanFileName = sanitizeFileName(file.name);
              const compressedFile = new File([blob], cleanFileName, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              // Si la compression échoue, retourner le fichier original avec nom nettoyé
              const cleanFileName = sanitizeFileName(file.name);
              const fallbackFile = new File([file], cleanFileName, {
                type: file.type,
                lastModified: file.lastModified,
              });
              resolve(fallbackFile);
            }
          }, file.type, quality);
        } catch (error) {
          console.error('Erreur lors de la compression:', error);
          reject(error);
        }
      };
      
      img.onerror = () => {
        reject(new Error('Impossible de charger l\'image pour la compression'));
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !token) return;

    // Vérifications initiales
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Le fichier ne doit pas dépasser 10MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadError('Seuls les fichiers image sont autorisés');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      // Nettoyer le nom de fichier dès le début
      const cleanFileName = sanitizeFileName(file.name);
      let fileToUpload = new File([file], cleanFileName, {
        type: file.type,
        lastModified: file.lastModified,
      });

      // Compresser TOUJOURS les images > 1MB pour éviter les problèmes MinIO
      const shouldCompress = file.size > 1024 * 1024; // 1MB
      
      if (shouldCompress) {
        setUploadProgress(10);
        
        try {
          // Compression plus agressive pour les gros fichiers
          const maxWidth = file.size > 3 * 1024 * 1024 ? 800 : 1200;
          const quality = file.size > 3 * 1024 * 1024 ? 0.6 : 0.8;
          
          fileToUpload = await compressImage(fileToUpload, maxWidth, quality);
          console.log(`Image compressée: ${file.size} -> ${fileToUpload.size} bytes`);
          console.log(`Compression: ${maxWidth}px, qualité: ${quality}`);
          
          // Si la compression n'a pas réduit la taille, essayer une compression plus agressive
          if (fileToUpload.size >= file.size * 0.9) {
            console.log('Compression peu efficace, tentative plus agressive...');
            fileToUpload = await compressImage(fileToUpload, 600, 0.5);
            console.log(`Recompression: ${file.size} -> ${fileToUpload.size} bytes`);
          }
        } catch (compressionError) {
          console.error('Erreur compression:', compressionError);
          // En cas d'erreur de compression, continuer avec le fichier original nettoyé
        }
      } else {
        console.log(`Image conservée sans compression: ${fileToUpload.size} bytes`);
      }

      // Vérification finale de la taille après compression
      if (fileToUpload.size > 5 * 1024 * 1024) {
        setUploadError('L\'image est encore trop lourde après compression. Essayez avec une image plus petite.');
        return;
      }

      setUploadProgress(20);

      const uploadFormData = new FormData();
      uploadFormData.append('image', fileToUpload);

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        timeout: 60000,
        onUploadProgress: (progressEvent: { loaded: number; total?: number }) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 80) / progressEvent.total) + 20;
            setUploadProgress(progress);
          }
        },
      };

      console.log('Tentative d\'upload vers:', `${API_BASE_URL}/upload/image`);
      const response = await axios.post<UploadResponse>(`${API_BASE_URL}/upload/image`, uploadFormData, config);

      setUploadProgress(100);

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, response.data.imageUrl],
      }));
    } catch (error: any) {
      console.error('Erreur upload complète:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      
      let errorMessage = 'Erreur lors de l\'upload de l\'image';
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Erreur réseau: Impossible de joindre le serveur. Vérifiez votre connexion internet.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Timeout: L\'upload a pris trop de temps. Essayez avec une image plus petite.';
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || 
                      error.response?.data?.error || 
                      'Requête invalide. Vérifiez le format du fichier.';
      } else if (error.response?.status === 413) {
        errorMessage = 'Fichier trop volumineux pour le serveur.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      setUploadError(`${errorMessage} ${error.response?.status ? `(Status: ${error.response.status})` : ''}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
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
              {uploading ? `Upload en cours... ${uploadProgress}%` : 'Ajouter une image'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            
            {uploading && uploadProgress > 0 && (
              <Box sx={{ width: '100%', mt: 1 }}>
                <Box sx={{ 
                  width: '100%', 
                  backgroundColor: 'grey.200', 
                  borderRadius: 1,
                  height: 4,
                  overflow: 'hidden'
                }}>
                  <Box sx={{
                    width: `${uploadProgress}%`,
                    height: '100%',
                    backgroundColor: 'primary.main',
                    transition: 'width 0.3s ease-in-out'
                  }} />
                </Box>
              </Box>
            )}
            
            <Typography variant="body2" color="text.secondary">
              Formats supportés: JPG, PNG, GIF • Taille max: 10MB<br/>
              <em>Les images lourdes seront automatiquement compressées</em>
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