import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import QuestionForm from './QuestionForm';
import EligibilityResults from './EligibilityResults';

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
  const [eligibleAids, setEligibleAids] = useState<Aid[]>([]);
  const [questions, setQuestions] = useState<Condition[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

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

  const checkEligibility = async () => {
    if (isChecking || hasChecked) {
      console.log('Une vérification est déjà en cours ou a déjà été effectuée');
      return;
    }
    
    try {
      console.log('Début de la vérification avec les réponses:', answers);
      setIsChecking(true);
      const response = await axios.post<Aid[]>('http://localhost:4000/eligibility/check', { answers });
      console.log('Résultats éligibilité:', response.data);
      setEligibleAids(response.data);
      onEligibilityResult(response.data);
      setHasChecked(true);
    } catch (err) {
      console.error('Erreur vérification éligibilité:', err);
      setError('Erreur lors de la vérification de l\'éligibilité');
    } finally {
      console.log('Fin de la vérification');
      setIsChecking(false);
    }
  };

  // Charger les aides au montage du composant
  useEffect(() => {
    fetchAids();
  }, []);

  // Calculer les questions quand les aides changent
  useEffect(() => {
    if (loading || error) {
      setQuestions([]);
      return;
    }

    if (aids.length === 0) {
      setQuestions([]);
      setError('Aucune aide disponible pour le moment. Veuillez en créer via l\'interface d\'administration.');
      return;
    }

    const allConditions = aids
      .flatMap(aid => aid.conditions)
      .reduce((acc, condition) => {
        if (!acc.find(c => c.field === condition.field)) {
          acc.push(condition);
        }
        return acc;
      }, [] as Condition[])
      .sort((a, b) => a.order - b.order);

    const regionQuestion: Condition = {
      id: 0,
      question: "Dans quelle région habitez-vous ?",
      field: "region",
      type: "select",
      operator: "==",
      value: "region",
      order: 0
    };

    setQuestions([regionQuestion, ...allConditions]);
  }, [aids, loading, error]);

  // Vérifier automatiquement l'éligibilité quand toutes les questions sont répondues
  useEffect(() => {
    if (aids.length === 0) return;

    const shouldCheckEligibility = 
      currentStep === questions.length && 
      questions.length > 0 && 
      !isChecking && 
      !hasChecked;

    console.log('État de vérification:', {
      currentStep,
      questionsLength: questions.length,
      isChecking,
      hasChecked,
      shouldCheckEligibility
    });

    if (shouldCheckEligibility) {
      console.log('Démarrage de la vérification d\'éligibilité');
      checkEligibility();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, questions.length, isChecking, hasChecked, aids.length]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Vérification d'éligibilité
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Typography variant="body1" color="text.secondary">
          Pour commencer à utiliser l'application, veuillez :
        </Typography>
        <ul>
          <li>Vous connecter à l'interface d'administration</li>
          <li>Créer au moins une aide avec ses conditions</li>
          <li>Revenir sur cette page pour vérifier l'éligibilité</li>
        </ul>
      </Box>
    );
  }

  if (questions.length === 0) {
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
      
      {eligibleAids.length > 0 ? (
        <EligibilityResults eligibleAids={eligibleAids} />
      ) : currentStep < questions.length ? (
        <QuestionForm
          condition={questions[currentStep]}
          onAnswer={(value) => {
            handleAnswer(questions[currentStep].field, value);
            setCurrentStep(prev => prev + 1);
          }}
        />
      ) : (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Vérification de votre éligibilité...
          </Typography>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default EligibilityForm; 