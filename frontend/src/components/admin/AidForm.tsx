import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';

interface Aid {
  id: number;
  title: string;
  description: string;
  region: string;
  link: string;
  active: boolean;
}

interface AidFormProps {
  aid?: Aid | null;
  onSubmit: (data: Partial<Aid>) => void;
  onCancel: () => void;
}

const AidForm: React.FC<AidFormProps> = ({ aid, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Aid>>({
    title: '',
    description: '',
    region: '',
    link: '',
    active: true,
  });

  useEffect(() => {
    if (aid) {
      setFormData(aid);
    }
  }, [aid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'active' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr',
        gap: 3,
      }}>
        <Box>
          <TextField
            fullWidth
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
        </Box>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 3,
        }}>
          <TextField
            fullWidth
            label="Région"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Lien"
            name="link"
            value={formData.link}
            onChange={handleChange}
            required
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={formData.active}
                onChange={handleChange}
                name="active"
              />
            }
            label="Actif"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {aid ? 'Modifier' : 'Créer'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AidForm; 