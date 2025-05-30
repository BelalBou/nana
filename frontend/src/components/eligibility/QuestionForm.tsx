import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Switch, RadioGroup, Radio, FormControl, InputLabel, Select, MenuItem, LinearProgress, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useRegions, type Region } from '../../hooks/useRegions';

interface Condition {
  id: number;
  question: string;
  field: string;
  type: string;
  operator: string;
  value: string;
  order: number;
}

interface QuestionFormProps {
  condition: Condition;
  currentStep: number;
  totalSteps: number;
  onAnswer: (value: any) => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  currentValue?: any;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ 
  condition, 
  currentStep, 
  totalSteps, 
  onAnswer, 
  onPrevious, 
  canGoPrevious,
  currentValue 
}) => {
  const { regions, loading: regionsLoading } = useRegions();
  
  const getInitialValue = (type: string) => {
    // Si on a déjà une valeur (navigation retour), l'utiliser
    if (currentValue !== undefined) {
      return currentValue;
    }
    
    switch (type) {
      case 'boolean':
        return false;
      case 'select':
        return '';
      case 'number':
        return '';
      case 'radio':
        return '';
      default:
        return '';
    }
  };

  const [value, setValue] = useState<any>(getInitialValue(condition.type));

  // Mettre à jour la valeur quand la condition change ou qu'on a une valeur courante
  useEffect(() => {
    setValue(getInitialValue(condition.type));
  }, [condition.id, condition.type, currentValue]);

  const handleNext = () => {
    if (condition.type === 'boolean') {
      onAnswer(value ? 'true' : 'false');
    } else if (condition.type === 'radio') {
      onAnswer(value === 'yes' ? 'true' : 'false');
    } else {
      onAnswer(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isNextDisabled()) {
      e.preventDefault();
      handleNext();
    }
  };

  const renderInput = () => {
    switch (condition.type) {
      case 'select':
        if (condition.field === 'region') {
          return (
            <FormControl fullWidth>
              <InputLabel>Région</InputLabel>
              <Select
                value={value}
                onChange={(e) => setValue(e.target.value)}
                label="Région"
                required
                disabled={regionsLoading}
              >
                {regions.length === 0 && !regionsLoading ? (
                  <MenuItem disabled>Aucune région disponible</MenuItem>
                ) : (
                  regions.map((region: Region) => (
                    <MenuItem key={region.id} value={region.name}>
                      {region.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          );
        }
        return null;
      case 'number':
        if (condition.field === 'age' && condition.operator === 'between') {
          const [minAge, maxAge] = value.split(',').map((v: string) => v === '' ? '' : Number(v));
          return (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                type="number"
                label="Âge minimum"
                value={minAge}
                onChange={(e) => {
                  const newMin = e.target.value;
                  setValue(`${newMin},${maxAge || ''}`);
                }}
                fullWidth
                required
              />
              <Typography>et</Typography>
              <TextField
                type="number"
                label="Âge maximum"
                value={maxAge}
                onChange={(e) => {
                  const newMax = e.target.value;
                  setValue(`${minAge || ''},${newMax}`);
                }}
                fullWidth
                required
              />
            </Box>
          );
        }
        return (
          <TextField
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            required
          />
        );
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Switch
                checked={value}
                onChange={(e) => setValue(e.target.checked)}
              />
            }
            label={value ? 'Oui' : 'Non'}
          />
        );
      case 'radio':
        return (
          <RadioGroup
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            <FormControlLabel 
              value="yes" 
              control={<Radio />} 
              label="Oui" 
            />
            <FormControlLabel 
              value="no" 
              control={<Radio />} 
              label="Non" 
            />
          </RadioGroup>
        );
      default:
        return (
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
            required
          />
        );
    }
  };

  const isNextDisabled = () => {
    if (condition.type === 'boolean') return false;
    if (condition.type === 'radio') return !value;
    if (condition.type === 'number' && condition.field === 'age' && condition.operator === 'between') {
      const [minAge, maxAge] = value.split(',').map(Number);
      return !minAge || !maxAge || minAge > maxAge;
    }
    return value === '' || value === undefined;
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Barre de progression */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Question {currentStep + 1} sur {totalSteps}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}%
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={((currentStep + 1) / totalSteps) * 100}
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>

      <Typography variant="h6" gutterBottom>
        {condition.question}
      </Typography>
      
      <Box sx={{ mt: 2 }} onKeyPress={handleKeyPress}>
        {renderInput()}
      </Box>

      {/* Boutons de navigation */}
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ mt: 4, justifyContent: 'space-between' }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          sx={{ minWidth: 120 }}
        >
          Précédent
        </Button>
        
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={handleNext}
          disabled={isNextDisabled()}
          sx={{ minWidth: 120 }}
        >
          {currentStep === totalSteps - 1 ? 'Terminer' : 'Suivant'}
        </Button>
      </Stack>
    </Box>
  );
};

export default QuestionForm;