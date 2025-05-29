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
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
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

  const handleFormSubmit = async () => {
    try {
      if (selectedQuestion) {
        await axios.patch(`${API_BASE_URL}/questions/${selectedQuestion.id}`, formData);
        setQuestions(questions.map(q => 
          q.id === selectedQuestion.id ? { ...q, ...formData } : q
        ));
      } else {
        const response = await axios.post<Question>(`${API_BASE_URL}/questions`, formData);
        setQuestions([...questions, response.data]);
      }
      setOpenForm(false);
      setSelectedQuestion(null);
      setFormData({
        text: '',
        field: '',
        type: 'text',
        options: '',
        order: 0
      });
    } catch (err) {
      setError('Erreur lors de la sauvegarde de la question');
    }
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
            setOpenForm(true);
          }}
        >
          Nouvelle Question
        </Button>
      </Box>

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
                <TableCell>{question.options || '-'}</TableCell>
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
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="text">Texte</MenuItem>
                <MenuItem value="number">Nombre</MenuItem>
                <MenuItem value="boolean">Oui/Non</MenuItem>
                <MenuItem value="select">Sélection</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Options (JSON pour les sélections)"
              value={formData.options}
              onChange={(e) => setFormData({ ...formData, options: e.target.value })}
              multiline
              rows={3}
              helperText='Exemple pour select: ["Option 1", "Option 2"]'
            />
            <TextField
              fullWidth
              type="number"
              label="Ordre"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Annuler</Button>
          <Button onClick={handleFormSubmit} variant="contained">
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
