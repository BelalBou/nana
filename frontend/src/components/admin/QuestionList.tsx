import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';

interface Question {
  id: number;
  text: string;
  field: string;
  type: string;
  options?: string;
  order: number;
}

const QuestionList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Question>>({
    text: '',
    field: '',
    type: 'text',
    options: '',
    order: 0
  });

  // Nouvel état pour gérer les options de manière plus conviviale
  const [optionsList, setOptionsList] = useState<string[]>([]);
  const [newOption, setNewOption] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get<Question[]>(`${API_BASE_URL}/questions`);
      setQuestions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des questions');
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleEdit = (question: Question) => {
    setSelectedQuestion(question);
    setFormData(question);
    
    // Charger les options existantes
    if (question.options && question.type === 'select') {
      try {
        const parsedOptions = JSON.parse(question.options);
        setOptionsList(Array.isArray(parsedOptions) ? parsedOptions : []);
      } catch (e) {
        setOptionsList([]);
      }
    } else {
      setOptionsList([]);
    }
    
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setQuestionToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!questionToDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/questions/${questionToDelete}`);
      setQuestions(questions.filter(question => question.id !== questionToDelete));
      setOpenDeleteDialog(false);
      setQuestionToDelete(null);
    } catch (err) {
      setError('Erreur lors de la suppression de la question');
    }
  };

  const handleAddOption = () => {
    if (newOption.trim() && !optionsList.includes(newOption.trim())) {
      setOptionsList([...optionsList, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (optionToRemove: string) => {
    setOptionsList(optionsList.filter(option => option !== optionToRemove));
  };

  const handleFormSubmit = async () => {
    try {
      // Préparer les données avec les options au bon format
      const submissionData = {
        ...formData,
        options: formData.type === 'select' ? JSON.stringify(optionsList) : ''
      };

      if (selectedQuestion) {
        await axios.patch(`${API_BASE_URL}/questions/${selectedQuestion.id}`, submissionData);
        setQuestions(questions.map(q => 
          q.id === selectedQuestion.id ? { ...q, ...submissionData } : q
        ));
      } else {
        const response = await axios.post<Question>(`${API_BASE_URL}/questions`, submissionData);
        setQuestions([...questions, response.data]);
      }
      
      // Réinitialiser le formulaire
      setOpenForm(false);
      setSelectedQuestion(null);
      setFormData({
        text: '',
        field: '',
        type: 'text',
        options: '',
        order: 0
      });
      setOptionsList([]);
      setNewOption('');
    } catch (err) {
      setError('Erreur lors de la sauvegarde de la question');
    }
  };

  const handleTypeChange = (newType: string) => {
    setFormData({ ...formData, type: newType });
    // Réinitialiser les options si le type n'est plus "select"
    if (newType !== 'select') {
      setOptionsList([]);
      setNewOption('');
    }
  };

  // Composant Card pour mobile
  const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
    const options = question.type === 'select' && question.options 
      ? JSON.parse(question.options) 
      : [];

    return (
      <Card
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 2,
          mb: 2,
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <CardContent sx={{ pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {question.text}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
              <Chip
                label={`Champ: ${question.field}`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`Type: ${question.type}`}
                size="small"
                color="secondary"
                variant="outlined"
              />
              <Chip
                label={`Ordre: ${question.order}`}
                size="small"
                color="default"
                variant="outlined"
              />
            </Stack>
          </Box>

          {options.length > 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                Options disponibles:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {options.map((option: string, index: number) => (
                  <Chip
                    key={index}
                    label={option}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                    color="info"
                    variant="filled"
                  />
                ))}
              </Box>
            </Box>
          )}
        </CardContent>
        
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <IconButton
            onClick={() => handleEdit(question)}
            size="small"
            sx={{ color: 'primary.main' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(question.id)}
            size="small"
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  };

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Questions</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedQuestion(null);
            setFormData({
              text: '',
              field: '',
              type: 'text',
              options: '',
              order: questions.length
            });
            setOptionsList([]);
            setNewOption('');
            setOpenForm(true);
          }}
        >
          Nouvelle Question
        </Button>
      </Box>

      {isMobile ? (
        <Box>
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Champ</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Options</TableCell>
                <TableCell>Ordre</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.text}</TableCell>
                  <TableCell>{question.field}</TableCell>
                  <TableCell>{question.type}</TableCell>
                  <TableCell>
                    {question.type === 'select' && question.options ? (
                      <Box>
                        {JSON.parse(question.options).map((option: string, index: number) => (
                          <Chip
                            key={index}
                            label={option}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell>{question.order}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(question)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(question.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedQuestion ? 'Modifier la question' : 'Nouvelle question'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Texte de la question"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Champ (nom technique)"
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
              required
              helperText="Ex: age, region, student (sans espaces, en minuscules)"
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => handleTypeChange(e.target.value)}
              >
                <MenuItem value="text">Texte</MenuItem>
                <MenuItem value="number">Nombre</MenuItem>
                <MenuItem value="boolean">Oui/Non</MenuItem>
                <MenuItem value="select">Sélection (choix multiples)</MenuItem>
              </Select>
            </FormControl>

            {formData.type === 'select' && (
              <Box sx={{ border: 1, borderColor: 'grey.300', borderRadius: 1, p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Options de sélection
                </Typography>
                
                {/* Afficher les options existantes */}
                {optionsList.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {optionsList.map((option, index) => (
                        <Chip
                          key={index}
                          label={option}
                          onDelete={() => handleRemoveOption(option)}
                          deleteIcon={<CloseIcon />}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Ajouter une nouvelle option */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    label="Nouvelle option"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddOption();
                      }
                    }}
                    placeholder="Ex: Ile-de-France, Provence-Alpes-Côte d'Azur..."
                  />
                  <Button 
                    variant="outlined" 
                    onClick={handleAddOption}
                    disabled={!newOption.trim() || optionsList.includes(newOption.trim())}
                  >
                    Ajouter
                  </Button>
                </Box>
                
                {optionsList.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Ajoutez au moins une option pour ce type de question
                  </Typography>
                )}
              </Box>
            )}

            <TextField
              fullWidth
              type="number"
              label="Ordre"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              required
              helperText="L'ordre d'apparition de la question (0 = première)"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Annuler</Button>
          <Button 
            onClick={handleFormSubmit} 
            variant="contained"
            disabled={
              !formData.text || 
              !formData.field || 
              (formData.type === 'select' && optionsList.length === 0)
            }
          >
            {selectedQuestion ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette question ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Annuler</Button>
          <Button onClick={confirmDelete} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuestionList;
