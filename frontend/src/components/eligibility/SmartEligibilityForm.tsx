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
  Container,
  Stack
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
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

interface Region {
  id: number;
  name: string;
}

const SmartEligibilityForm: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState<QuestionStep | null>(null);
  const [loading, setLoading] = useState(false);
  const [finalResults, setFinalResults] = useState<Aid[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Nouvel état pour gérer l'historique des questions
  const [questionHistory, setQuestionHistory] = useState<QuestionStep[]>([]);
  const [answerHistory, setAnswerHistory] = useState<Record<string, any>[]>([]);
  const [pendingAnswer, setPendingAnswer] = useState<any>(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  const fetchNextQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.post<NextQuestionResponse>(`${API_BASE_URL}/eligibility/next-question`, { 
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
        const resultsResponse = await axios.post<Aid[]>(`${API_BASE_URL}/eligibility/results`, { 
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
    setPendingAnswer(value);
  };

  const handleNext = async () => {
    if (pendingAnswer === null) return;

    const newAnswers = {
      ...answers,
      [currentStep!.question.field]: pendingAnswer
    };
    
    // Sauvegarder l'état actuel dans l'historique
    setQuestionHistory(prev => [...prev, currentStep!]);
    setAnswerHistory(prev => [...prev, answers]);
    
    setAnswers(newAnswers);
    
    try {
      setLoading(true);
      const response = await axios.post<NextQuestionResponse>(`${API_BASE_URL}/eligibility/next-question`, { 
        answers: newAnswers 
      });
      
      if (response.data && response.data.question) {
        setCurrentStep({
          question: response.data.question,
          remainingAids: response.data.remainingAids || 0
        });
        setCurrentQuestionIndex(prev => prev + 1);
        setPendingAnswer(null);
      } else {
        const resultsResponse = await axios.post<Aid[]>(`${API_BASE_URL}/eligibility/results`, { 
          answers: newAnswers 
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

  const handlePrevious = () => {
    if (questionHistory.length === 0) return;

    // Récupérer l'état précédent
    const previousQuestion = questionHistory[questionHistory.length - 1];
    const previousAnswers = answerHistory[answerHistory.length - 1];

    setCurrentStep(previousQuestion);
    setAnswers(previousAnswers);
    setCurrentQuestionIndex(prev => prev - 1);
    
    // Mettre la réponse précédente comme pendingAnswer
    setPendingAnswer(answers[currentStep!.question.field] || null);

    // Supprimer le dernier élément de l'historique
    setQuestionHistory(prev => prev.slice(0, -1));
    setAnswerHistory(prev => prev.slice(0, -1));
  };

  const startQuestionnaire = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsComplete(false);
    setFinalResults([]);
    setQuestionHistory([]);
    setAnswerHistory([]);
    setPendingAnswer(null);
    fetchNextQuestion();
  };

  useEffect(() => {
    // Fetch total questions count for progress bar
    axios.get<Question[]>(`${API_BASE_URL}/questions`)
      .then(response => setTotalQuestions(response.data.length))
      .catch(console.error);

    // Plus besoin de récupérer les régions ici car on utilise le hook useRegions
    // qui récupère les régions depuis les aides existantes
  }, [API_BASE_URL]);

  const renderQuestionInput = () => {
    if (!currentStep) return null;

    const { question } = currentStep;

    switch (question.type) {
      case 'boolean':
        return (
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant={pendingAnswer === true ? "contained" : "outlined"}
              color="primary"
              onClick={() => setPendingAnswer(true)}
              sx={{ flex: 1 }}
            >
              Oui
            </Button>
            <Button
              variant={pendingAnswer === false ? "contained" : "outlined"}
              onClick={() => setPendingAnswer(false)}
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
                variant={pendingAnswer === option ? "contained" : "outlined"}
                onClick={() => setPendingAnswer(option)}
                sx={{ 
                  justifyContent: 'flex-start',
                  py: 1.5,
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
              value={pendingAnswer || ''}
              onChange={(e) => setPendingAnswer(Number(e.target.value) || null)}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none'
              }}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    return pendingAnswer === null || pendingAnswer === '';
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
                      
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {aid.link && (
                          <Button 
                            variant="contained" 
                            href={aid.link} 
                            target="_blank"
                            size="small"
                          >
                            Site officiel
                          </Button>
                        )}
                        <Button 
                          variant="outlined" 
                          href={`mailto:nastassia_dmrtds@outlook.com?subject=Demande d'informations - Aide immobilière&body=Bonjour, je souhaiterais avoir plus d'informations concernant l'aide : ${aid.title}`}
                          size="small"
                        >
                          Contacter par email
                        </Button>
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        💡 Pour plus d'informations personnalisées, contactez nastassia_dmrtds@outlook.com
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Section contact globale */}
                <Alert severity="info" sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Besoin d'aide personnalisée ?</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Notre équipe peut vous accompagner dans vos démarches pour maximiser vos chances d'obtenir ces aides.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                      variant="contained" 
                      color="info"
                      href="mailto:nastassia_dmrtds@outlook.com?subject=Demande d'accompagnement - Aides immobilières&body=Bonjour, je souhaiterais être accompagné(e) dans mes démarches pour obtenir les aides immobilières suivantes :"
                      size="small"
                    >
                      📧 Contacter un conseiller
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="info"
                      href="tel:+33123456789"
                      size="small"
                    >
                      📞 +32 4 97 19 90 08
                    </Button>
                  </Box>
                </Alert>
              </>
            ) : (
              <>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Désolé, aucune aide ne correspond à votre situation actuelle selon nos critères.
                </Alert>
                
                <Alert severity="warning" sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Ne perdez pas espoir !</strong>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Il existe peut-être d'autres aides spécifiques ou des conditions particulières que nous n'avons pas couvertes. 
                    Notre équipe peut analyser votre situation en détail.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="warning"
                    href="mailto:nastassia_dmrtds@outlook.com?subject=Analyse personnalisée - Aides immobilières&body=Bonjour, aucune aide ne correspond à ma situation selon le questionnaire. Pourriez-vous analyser mon dossier personnellement ?"
                    size="small"
                  >
                    📧 Demander une analyse personnalisée
                  </Button>
                </Alert>
              </>
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

          {/* Boutons de navigation */}
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ mt: 4, justifyContent: 'space-between' }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handlePrevious}
              disabled={questionHistory.length === 0}
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
              Suivant
            </Button>
          </Stack>

          {/* Instructions */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Sélectionnez votre réponse puis cliquez sur "Suivant"
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SmartEligibilityForm;