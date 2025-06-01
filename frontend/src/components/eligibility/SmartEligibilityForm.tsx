import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Button, 
  RadioGroup, 
  Radio, 
  FormControlLabel, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress, 
  Alert, 
  Container,
  Paper,
  Fade,
  LinearProgress,
  Snackbar,
  useTheme,
  Stack,
  Chip,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  CheckCircle as CheckIcon,
  ArrowBack,
  ArrowForward,
  Refresh as RefreshIcon,
  Email as EmailIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { useRegions } from '../../hooks/useRegions';
import ImageGalleryModal from '../common/ImageGalleryModal';

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
  images?: string[];
}

interface NextQuestionResponse {
  question?: Question;
  remainingAids?: number;
}

const SmartEligibilityForm: React.FC = () => {
  const theme = useTheme();
  const { regions } = useRegions();
  
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
  const [showCopySnackbar, setShowCopySnackbar] = useState(false);
  const [selectedAid, setSelectedAid] = useState<Aid | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  // Fonction pour copier l'email dans le presse-papier
  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('nastassia_dmrtds@outlook.com');
      setShowCopySnackbar(true);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  // Fonction pour ouvrir le client email avec un mailto simple
  const openEmailClient = (subject?: string) => {
    const email = 'nastassia_dmrtds@outlook.com';
    
    try {
      const mailtoUrl = subject 
        ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
        : `mailto:${email}`;
      
      // Essayer d'ouvrir le client email
      const newWindow = window.open(mailtoUrl, '_self');
      
      // Si l'ouverture échoue après 100ms, copier l'email
      setTimeout(() => {
        if (!newWindow || newWindow.closed) {
          copyEmailToClipboard();
        }
      }, 100);
    } catch (error) {
      console.log('Erreur avec mailto, copie de l\'email:', error);
      copyEmailToClipboard();
    }
  };

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

  // Nouvelle fonction pour recommencer avec rechargement complet
  const restartQuestionnaire = () => {
    // Forcer un rechargement complet de la page
    window.location.href = '/';
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
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant={pendingAnswer === true ? 'contained' : 'outlined'}
                color={pendingAnswer === true ? 'success' : 'inherit'}
                onClick={() => handleAnswer(true)}
                sx={{
                  minHeight: 64,
                  flex: 1,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                  ...(pendingAnswer === true && {
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                  }),
                }}
              >
                ✅ Oui
              </Button>
              <Button
                variant={pendingAnswer === false ? 'contained' : 'outlined'}
                color={pendingAnswer === false ? 'error' : 'inherit'}
                onClick={() => handleAnswer(false)}
                sx={{
                  minHeight: 64,
                  flex: 1,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                  ...(pendingAnswer === false && {
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
                  }),
                }}
              >
                ❌ Non
              </Button>
            </Box>
          </Box>
        );

      case 'select':
        if (question.field === 'region') {
          return (
            <Box sx={{ mt: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Sélectionnez votre région</InputLabel>
                <Select
                  value={pendingAnswer || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  label="Sélectionnez votre région"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                >
                  {regions.map((region) => (
                    <MenuItem key={region.id} value={region.name}>
                      {region.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          );
        }
        
        if (question.options) {
          try {
            const options = JSON.parse(question.options);
            return (
              <Box sx={{ mt: 3 }}>
                <Stack spacing={2}>
                  {options.map((option: string, index: number) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '2px solid',
                        borderColor: pendingAnswer === option ? 'primary.main' : 'grey.200',
                        borderRadius: 2,
                        cursor: 'pointer',
                        backgroundColor: pendingAnswer === option ? 'primary.50' : 'transparent',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'primary.25',
                        },
                      }}
                      onClick={() => handleAnswer(option)}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.1rem',
                          fontWeight: pendingAnswer === option ? 600 : 500,
                          color: pendingAnswer === option ? 'primary.main' : 'text.primary',
                        }}
                      >
                        {option}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            );
          } catch (e) {
            return null;
          }
        }
        break;

      case 'number':
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              type="number"
              label="Votre réponse"
              value={pendingAnswer || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1.1rem',
                },
              }}
              placeholder="Entrez un nombre"
            />
          </Box>
        );

      default:
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              label="Votre réponse"
              value={pendingAnswer || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1.1rem',
                },
              }}
              placeholder="Tapez votre réponse"
            />
          </Box>
        );
    }
  };

  const isNextDisabled = () => {
    if (currentStep?.question.type === 'boolean') {
      return pendingAnswer === null;
    }
    return pendingAnswer === null || pendingAnswer === '';
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
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
              size={60} 
              thickness={4}
              sx={{
                color: 'primary.main',
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                },
              }}
            />
          </Box>
          <Typography variant="h6" color="text.secondary">
            Préparation du questionnaire...
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (isComplete) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Fade in timeout={800}>
          <Box>
            {/* Success Header */}
            <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
              <Box
                sx={{
                  width: { xs: 80, md: 100 },
                  height: { xs: 80, md: 100 },
                  borderRadius: '50%',
                  backgroundColor: finalResults.length > 0 ? 'success.100' : 'warning.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <CheckIcon 
                  sx={{ 
                    fontSize: { xs: 40, md: 50 }, 
                    color: finalResults.length > 0 ? 'success.main' : 'warning.main'
                  }} 
                />
              </Box>
              
              <Typography 
                variant="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                }}
              >
                {finalResults.length > 0 
                  ? `${finalResults.length} aide${finalResults.length > 1 ? 's trouvée' : ' trouvée'}${finalResults.length > 1 ? 's' : ''} !`
                  : 'Aucune aide correspondante'
                }
              </Typography>
            </Box>

            {/* Résultats */}
            {finalResults.length > 0 ? (
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { 
                  xs: '1fr', 
                  md: 'repeat(auto-fit, minmax(350px, 1fr))' 
                },
                gap: 3,
                mb: 4
              }}>
                {finalResults.map((aid) => (
                  <Paper
                    key={aid.id}
                    elevation={0}
                    sx={{
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'success.200',
                      borderRadius: 3,
                      background: 'linear-gradient(145deg, #FFFFFF 0%, #F0FDF4 100%)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
                      },
                    }}
                  >
                    {/* Image principale */}
                    {aid.images && aid.images.length > 0 && (
                      <Box
                        sx={{
                          position: 'relative',
                          height: 200,
                          cursor: 'pointer',
                          overflow: 'hidden',
                        }}
                        onClick={() => {
                          setSelectedAid(aid);
                          setGalleryOpen(true);
                        }}
                      >
                        <Box
                          component="img"
                          src={aid.images[0]}
                          alt={aid.title}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            },
                          }}
                        />
                        
                        {/* Overlay avec nombre d'images */}
                        {aid.images.length > 1 && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              color: 'white',
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 2,
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            📸 {aid.images.length}
                          </Box>
                        )}
                        
                        {/* Overlay de survol */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'backgroundColor 0.2s ease-in-out',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            },
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'white',
                              backgroundColor: 'rgba(0, 0, 0, 0.8)',
                              px: 2,
                              py: 1,
                              borderRadius: 2,
                              opacity: 0,
                              transition: 'opacity 0.2s ease-in-out',
                              '.MuiPaper-root:hover &': {
                                opacity: 1,
                              },
                            }}
                          >
                            Cliquer pour voir toutes les images
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    <Box sx={{ p: 4 }}>
                      <Typography 
                        variant="h5" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 600,
                          color: 'success.dark',
                          mb: 2,
                        }}
                      >
                        {aid.title}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        paragraph
                        sx={{ lineHeight: 1.6 }}
                      >
                        {aid.description}
                      </Typography>
                      
                      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip
                          label={aid.region}
                          size="small"
                          sx={{
                            backgroundColor: 'primary.100',
                            color: 'primary.dark',
                            fontWeight: 500,
                          }}
                        />
                        {aid.images && aid.images.length > 1 && (
                          <Chip
                            label={`${aid.images.length} images`}
                            size="small"
                            sx={{
                              backgroundColor: 'info.100',
                              color: 'info.dark',
                              fontWeight: 500,
                            }}
                          />
                        )}
                      </Box>
                      
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          onClick={() => {
                            setSelectedAid(aid);
                            setGalleryOpen(true);
                          }}
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            py: 1.5,
                            fontWeight: 600,
                          }}
                        >
                          {aid.images && aid.images.length > 0 ? 'Voir les détails' : 'En savoir plus'}
                        </Button>
                        
                        {aid.link && (
                          <Button
                            variant="outlined"
                            href={aid.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              borderRadius: 2,
                              py: 1.5,
                              fontWeight: 600,
                              minWidth: 'auto',
                              px: 2,
                            }}
                          >
                            🔗
                          </Button>
                        )}
                      </Stack>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 6 },
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'warning.200',
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 100%)',
                  mb: 4,
                }}
              >
                <Typography variant="h5" gutterBottom color="warning.dark">
                  Aucune aide trouvée pour votre profil
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Malheureusement, nous n'avons pas trouvé d'aides correspondant exactement à votre situation.
                </Typography>
              </Paper>
            )}

            {/* Contact et actions */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Besoin d'aide supplémentaire ?
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
                sx={{ mb: 4 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  onClick={() => openEmailClient('Demande d\'information - ImmoAide')}
                  sx={{ minWidth: 200 }}
                >
                  Nous contacter
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<CopyIcon />}
                  onClick={copyEmailToClipboard}
                  sx={{ minWidth: 200 }}
                >
                  Copier l'email
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={restartQuestionnaire}
                  sx={{ minWidth: 200 }}
                >
                  Recommencer
                </Button>
              </Stack>
            </Box>
          </Box>
        </Fade>

        <Snackbar
          open={showCopySnackbar}
          autoHideDuration={3000}
          onClose={() => setShowCopySnackbar(false)}
          message="Email copié dans le presse-papier !"
        />
      </Container>
    );
  }

  if (!currentStep) {
    return (
      <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Fade in timeout={800}>
          <Box sx={{ textAlign: 'center' }}>
            {/* Hero Section */}
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Box
                sx={{
                  width: { xs: 100, md: 120 },
                  height: { xs: 100, md: 120 },
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  boxShadow: '0 12px 40px rgba(15, 118, 110, 0.3)',
                }}
              >
                <QuizIcon sx={{ fontSize: { xs: 50, md: 60 }, color: 'white' }} />
              </Box>
              
              <Typography 
                variant="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Trouvez vos aides au logement
              </Typography>
              
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ 
                  maxWidth: 600, 
                  mx: 'auto',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                Répondez à quelques questions pour découvrir toutes les aides et subventions 
                auxquelles vous avez droit dans votre région.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={startQuestionnaire}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: '0 8px 25px rgba(15, 118, 110, 0.3)',
                  '&:hover': {
                    boxShadow: '0 12px 35px rgba(15, 118, 110, 0.4)',
                  },
                }}
              >
                Commencer le questionnaire
              </Button>
            </Box>
          </Box>
        </Fade>
      </Container>
    );
  }

  const progress = totalQuestions > 0 ? (currentQuestionIndex / totalQuestions) * 100 : 0;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
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
          {/* Progress Bar */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 2 
            }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Question {currentQuestionIndex + 1} sur {totalQuestions}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                backgroundColor: 'grey.200',
              }}
            />
          </Box>

          {/* Question */}
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              lineHeight: 1.3,
            }}
          >
            {currentStep.question.text}
          </Typography>

          {/* Aide restante */}
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-message': {
                fontWeight: 500,
              },
            }}
          >
            {currentStep.remainingAids} aide{currentStep.remainingAids > 1 ? 's' : ''} potentielle{currentStep.remainingAids > 1 ? 's' : ''} pour votre profil
          </Alert>

          {/* Input */}
          {renderQuestionInput()}

          {/* Navigation */}
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              mt: 4, 
              justifyContent: 'space-between',
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              gap: { xs: 2, sm: 2 }
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handlePrevious}
              disabled={questionHistory.length === 0}
              sx={{ 
                minWidth: { xs: '100%', sm: 140 },
                py: 1.5,
              }}
            >
              Précédent
            </Button>
            
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={handleNext}
              disabled={isNextDisabled()}
              sx={{ 
                minWidth: { xs: '100%', sm: 140 },
                py: 1.5,
                fontWeight: 600,
              }}
            >
              Suivant
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Container>
  );
};

export default SmartEligibilityForm;