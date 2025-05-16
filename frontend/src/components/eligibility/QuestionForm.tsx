import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Switch, RadioGroup, Radio, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

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
  onAnswer: (value: any) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ condition, onAnswer }) => {
  const getInitialValue = (type: string) => {
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

  // Réinitialiser l'état quand la condition change
  useEffect(() => {
    setValue(getInitialValue(condition.type));
  }, [condition.id, condition.type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (condition.type === 'boolean') {
      onAnswer(value ? 'true' : 'false');
    } else if (condition.type === 'radio') {
      onAnswer(value === 'yes' ? 'true' : 'false');
    } else {
      onAnswer(value);
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
              >
                <MenuItem value="france">France</MenuItem>
                <MenuItem value="belgique_flandre">Belgique (Flandre)</MenuItem>
                <MenuItem value="belgique_wallonie">Belgique (Wallonie)</MenuItem>
                <MenuItem value="belgique_bruxelles">Belgique (Bruxelles-Capitale)</MenuItem>
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
            <FormControlLabel value="yes" control={<Radio />} label="Oui" />
            <FormControlLabel value="no" control={<Radio />} label="Non" />
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

  const isButtonDisabled = () => {
    if (condition.type === 'boolean') return false;
    if (condition.type === 'radio') return !value;
    if (condition.type === 'number' && condition.field === 'age' && condition.operator === 'between') {
      const [minAge, maxAge] = value.split(',').map(Number);
      return !minAge || !maxAge || minAge > maxAge;
    }
    return value === '' || value === undefined;
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {condition.question}
      </Typography>
      <Box sx={{ mt: 2 }}>
        {renderInput()}
      </Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        disabled={isButtonDisabled()}
      >
        Suivant
      </Button>
    </Box>
  );
};

export default QuestionForm; 