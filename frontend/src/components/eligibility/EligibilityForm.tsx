import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import QuestionForm from './QuestionForm';

interface Condition {
  id: number;
  question: string;
  field: string;
  type: string;
  operator: string;
  value: string;
  order: number;
}

interface Aid {
  id: number;
  title: string;
  description: string;
  region: string;
  link: string;
  conditions: Condition[];
}

interface EligibilityFormProps {
  onEligibilityResult: (eligibleAids: Aid[]) => void;
}

const EligibilityForm: React.FC<EligibilityFormProps> = ({ onEligibilityResult }) => {
  const [aids, setAids] = useState<Aid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    fetchAids();
  }, []);

  const fetchAids = async () => {
    try {
      const response = await axios.get<Aid[]>('http://localhost:4000/aids');
      console.log('Réponse API:', response.data);
      setAids(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur API:', err);
      setError('Aucune aide disponible pour le moment. Veuillez en créer via l\'interface d\'administration.');
      setLoading(false);
    }
  };

  const handleAnswer = (field: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<Aid[]>('http://localhost:4000/eligibility/check', { answers });
      onEligibilityResult(response.data);
    } catch (err) {
      setError('Erreur lors de la vérification de l\'éligibilité');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // Trier toutes les conditions par ordre
  const allConditions = aids
    .flatMap(aid => aid.conditions)
    .sort((a, b) => a.order - b.order);

  if (allConditions.length === 0) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Vérification d'éligibilité
        </Typography>
        <Alert severity="info">
          Aucune question disponible pour le moment. Veuillez créer des aides avec des conditions via l'interface d'administration.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Vérification d'éligibilité
      </Typography>
      
      {currentStep < allConditions.length ? (
        <QuestionForm
          condition={allConditions[currentStep]}
          onAnswer={(value) => {
            handleAnswer(allConditions[currentStep].field, value);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ) : (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Vérification de votre éligibilité...
          </Typography>
          <button onClick={handleSubmit}>
            Vérifier mon éligibilité
          </button>
        </Box>
      )}
    </Box>
  );
};

export default EligibilityForm; 