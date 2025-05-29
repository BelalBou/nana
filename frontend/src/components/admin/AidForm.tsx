import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useRegions, type Region } from '../../hooks/useRegions';

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
  const { regions, loading: regionsLoading } = useRegions();
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

  // Log pour debug
  useEffect(() => {
    console.log('Régions dans AidForm:', regions);
    console.log('Loading régions:', regionsLoading);
  }, [regions, regionsLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'active' ? checked : value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { id, ...dataToSubmit } = formData;
    onSubmit(aid ? formData : dataToSubmit);
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
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
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
          <FormControl fullWidth>
            <InputLabel>Région</InputLabel>
            <Select
              name="region"
              value={formData.region || ''}
              onChange={handleSelectChange}
              label="Région"
              required
              disabled={regionsLoading}
            >
              {regions.length === 0 && !regionsLoading ? (
                <MenuItem disabled>Aucune région disponible</MenuItem>
              ) : (
                regions.map((region: Region) => {
                  console.log('Rendu région:', region);
                  return (
                    <MenuItem key={region.id} value={region.name}>
                      {region.name}
                    </MenuItem>
                  );
                })
              )}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Lien"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            required
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Switch
                checked={formData.active}
                onChange={handleInputChange}
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