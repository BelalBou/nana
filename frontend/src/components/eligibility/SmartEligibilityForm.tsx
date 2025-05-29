import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Alert,
  Container
} from '@mui/material';
import axios from 'axios';

interface Question {
  id: number;
  text: string;
  field: string;
  type: string;
  options?: string;
}

interface QuestionStep {
  question: Question;
  remainingAids: number;
}

interface Aid {
  id: number;
  title: string;
  description: string;
  link: string;
  region: string;
}

interface NextQuestionResponse {
  question?: Question;
  remainingAids?: number;
}

const SmartEligibilityForm: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState<QuestionStep | null>(null);
  const [loading, setLoading] = useState(false);
  const [finalResults, setFinalResults] = useState<Aid[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const fetchNextQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.post<NextQuestionResponse>('http://localhost:4000/eligibility/next-question', { 
        answers 
      });
      
      if (response.data && response.data.question) {
        setCurrentStep({
          question: response.data.question,
          remainingAids: response.data.remainingAids || 0
        });
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Plus de questions, récupérer les résultats finaux
        const resultsResponse = await axios.post<Aid[]>('http://localhost:4000/eligibility/results', { 
          answers 
        });
        setFinalResults(resultsResponse.data);
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (value: any) => {
    const newAnswers = {
      ...answers,
      [currentStep!.question.field]: value
    };
    
    setAnswers(newAnswers);
    await fetchNextQuestion();
  };

  const startQuestionnaire = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setFinalResults([]);
    fetchNextQuestion();
  };

  useEffect(() => {
    // Fetch total questions count for progress bar
    axios.get<Question[]>('http://localhost:4000/questions')
      .then(response => setTotalQuestions(response.data.length))
      .catch(console.error);
  }, []);

  const renderQuestionInput = () => {
    if (!currentStep) return null;

    const { question } = currentStep;

    switch (question.type) {
      case 'boolean':
        return (
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAnswer(true)}
              sx={{ flex: 1 }}
            >
              Oui
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleAnswer(false)}
              sx={{ flex: 1 }}
            >
              Non
            </Button>
          </Box>
        );

      case 'select':
        const options = question.options ? JSON.parse(question.options) : [];
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
            {options.map((option: string) => (
              <Button
                key={option}
                variant="outlined"
                onClick={() => handleAnswer(option)}
                sx={{ 
                  justifyContent: 'flex-start',
                  py: 1.5,
                  '&:hover': { backgroundColor: 'primary.light', color: 'white' }
                }}
              >
                {option}
              </Button>
            ))}
          </Box>
        );

      case 'number':
        return (
          <Box sx={{ mt: 3 }}>
            <input
              type="number"
              placeholder="Entrez votre réponse"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value;
                  if (value) handleAnswer(Number(value));
                }
              }}
              onBlur={(e) => {
                const value = e.target.value;
                if (value) handleAnswer(Number(value));
              }}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={60} />
          <Typography variant="h6">Analyse en cours...</Typography>
        </Box>
      </Container>
    );
  }

  if (isComplete) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card elevation={3}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom color="primary" sx={{ textAlign: 'center' }}>
              🎉 Vos résultats
            </Typography>
            
            {finalResults.length > 0 ? (
              <>
                <Alert severity="success" sx={{ mb: 3 }}>
                  Félicitations ! Vous êtes éligible à {finalResults.length} aide(s) immobilière(s).
                </Alert>
                
                {finalResults.map((aid) => (
                  <Card key={aid.id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                        <Typography variant="h6" color="primary">
                          {aid.title}
                        </Typography>
                        <Chip label={aid.region} color="secondary" size="small" />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {aid.description}
                      </Typography>
                      {aid.link && (
                        <Button 
                          variant="contained" 
                          href={aid.link} 
                          target="_blank"
                          size="small"
                        >
                          En savoir plus
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <Alert severity="info" sx={{ mb: 3 }}>
                Désolé, aucune aide ne correspond à votre situation actuelle.
              </Alert>
            )}
            
            <Button 
              variant="outlined" 
              onClick={startQuestionnaire}
              fullWidth
              sx={{ mt: 2 }}
            >
              Recommencer le questionnaire
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!currentStep) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card elevation={3}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom color="primary">
              🏠 Bienvenue sur Immo Aide
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Découvrez les aides immobilières qui vous correspondent
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Notre questionnaire intelligent vous pose uniquement les questions nécessaires 
              pour identifier les aides disponibles selon votre situation.
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={startQuestionnaire}
              sx={{ px: 4, py: 1.5 }}
            >
              Commencer le questionnaire
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  const progress = totalQuestions > 0 ? (currentQuestionIndex / totalQuestions) * 100 : 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          {/* Barre de progression */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Question {currentQuestionIndex} sur ~{totalQuestions}
              </Typography>
              <Chip 
                label={`${currentStep.remainingAids} aide(s) possible(s)`} 
                color="primary" 
                size="small" 
              />
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          </Box>

          {/* Question */}
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 'medium' }}>
            {currentStep.question.text}
          </Typography>

          {/* Input de la question */}
          {renderQuestionInput()}

          {/* Instructions */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
            {currentStep.question.type === 'number' ? 
              'Appuyez sur Entrée ou cliquez ailleurs pour valider' :
              'Cliquez sur votre réponse'
            }
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SmartEligibilityForm;