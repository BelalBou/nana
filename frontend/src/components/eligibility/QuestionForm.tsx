import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControlLabel, Switch, RadioGroup, Radio } from '@mui/material';

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
  const [value, setValue] = useState<any>(condition.type === 'boolean' ? false : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(value);
  };

  const renderInput = () => {
    switch (condition.type) {
      case 'number':
        return (
          <TextField
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
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
    if (condition.type === 'radio') return value === '';
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