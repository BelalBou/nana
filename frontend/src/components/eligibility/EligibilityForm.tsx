import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert, 
  Container,
  Paper,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [aids, setAids] = useState<Aid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [eligibleAids, setEligibleAids] = useState<Aid[]>([]);
  const [questions, setQuestions] = useState<Condition[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  const fetchAids = async () => {
    try {
      const response = await axios.get<Aid[]>(`${API_BASE_URL}/aids`);
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

  const handleNextStep = (value: any) => {
    handleAnswer(questions[currentStep].field, value);
    setCurrentStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const checkEligibility = async () => {
    if (isChecking || hasChecked) {
      console.log('Une vérification est déjà en cours ou a déjà été effectuée');
      return;
    }
    
    try {
      console.log('Début de la vérification avec les réponses:', answers);
      setIsChecking(true);
      const response = await axios.post<Aid[]>(`${API_BASE_URL}/eligibility/check`, { answers });
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

    // Si on a déjà répondu à la question de région, on filtre les aides par région
    const selectedRegion = answers.region;
    const filteredAids = selectedRegion 
      ? aids.filter(aid => aid.region === selectedRegion)
      : aids;

    const allConditions = filteredAids
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

    // Si on a déjà répondu à la question de région, on ne la montre plus
    setQuestions(selectedRegion ? allConditions : [regionQuestion, ...allConditions]);
  }, [aids, loading, error, answers.region]);

  // Réinitialiser les réponses et le step quand la région change
  useEffect(() => {
    if (answers.region) {
      // Garder uniquement la réponse de la région
      const regionAnswer = answers.region;
      setAnswers({ region: regionAnswer });
      setCurrentStep(0);
      setEligibleAids([]);
      setHasChecked(false);
    }
  }, [answers.region]);

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
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 3,
          }}
        >
          <Box sx={{ mb: 3 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
          <Typography variant="h6" color="text.secondary">
            Chargement des questions...
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            border: '1px solid',
            borderColor: 'error.light',
            borderRadius: 3,
            backgroundColor: 'error.50',
          }}
        >
          {/* Hero Section avec erreur */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'error.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <ErrorIcon sx={{ fontSize: 40, color: 'error.main' }} />
            </Box>
            
            <Typography 
              variant="h3" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
              }}
            >
              Service temporairement indisponible
            </Typography>
          </Box>

          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="body1" color="text.secondary" paragraph>
              Pour commencer à utiliser l'application, veuillez :
            </Typography>
            <Box component="ul" sx={{ pl: 2, color: 'text.secondary' }}>
              <Typography component="li" sx={{ mb: 1 }}>
                Vous connecter à l'interface d'administration
              </Typography>
              <Typography component="li" sx={{ mb: 1 }}>
                Créer au moins une aide avec ses conditions
              </Typography>
              <Typography component="li">
                Revenir sur cette page pour vérifier l'éligibilité
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 6 },
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'info.light',
            borderRadius: 3,
            backgroundColor: 'info.50',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Vérification d'éligibilité
          </Typography>
          <Alert severity="info" sx={{ borderRadius: 2 }}>
            Aucune question disponible pour le moment. Veuillez créer des aides avec des conditions via l'interface d'administration.
          </Alert>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      {/* Hero Section */}
      {currentStep === 0 && (
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Box
              sx={{
                width: { xs: 80, md: 100 },
                height: { xs: 80, md: 100 },
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
                boxShadow: '0 8px 32px rgba(15, 118, 110, 0.3)',
              }}
            >
              <QuizIcon sx={{ fontSize: { xs: 40, md: 50 }, color: 'white' }} />
            </Box>
            
            <Typography 
              variant="h2" 
              gutterBottom 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Découvrez vos aides au logement
            </Typography>
            
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.25rem' },
                lineHeight: 1.6,
              }}
            >
              Répondez à quelques questions simples pour connaître toutes les aides 
              auxquelles vous avez droit dans votre région.
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Formulaire de questions */}
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {currentStep < questions.length ? (
          <Fade in timeout={600}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 6 },
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 3,
                background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)',
              }}
            >
              <QuestionForm
                condition={questions[currentStep]}
                currentStep={currentStep}
                totalSteps={questions.length}
                onAnswer={handleNextStep}
                onPrevious={handlePreviousStep}
                canGoPrevious={currentStep > 0}
                currentValue={answers[questions[currentStep]?.field]}
              />
            </Paper>
          </Fade>
        ) : isChecking ? (
          <Fade in timeout={600}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 3,
              }}
            >
              <Box sx={{ mb: 3 }}>
                <CircularProgress 
                  size={80} 
                  thickness={4}
                  sx={{
                    color: 'primary.main',
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    },
                  }}
                />
              </Box>
              
              <Typography 
                variant="h5" 
                gutterBottom
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                }}
              >
                Analyse de votre profil en cours...
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Nous vérifions votre éligibilité aux différentes aides disponibles.
              </Typography>
            </Paper>
          </Fade>
        ) : (
          <Fade in timeout={800}>
            <Box>
              {/* Success Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box
                  sx={{
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    borderRadius: '50%',
                    backgroundColor: 'success.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 3,
                  }}
                >
                  <CheckIcon sx={{ fontSize: { xs: 40, md: 50 }, color: 'success.main' }} />
                </Box>
                
                <Typography 
                  variant="h3" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.75rem', md: '2.25rem' },
                  }}
                >
                  Résultats de votre éligibilité
                </Typography>
              </Box>
              
              <EligibilityResults eligibleAids={eligibleAids} />
            </Box>
          </Fade>
        )}
      </Box>
    </Container>
  );
};

export default EligibilityForm;