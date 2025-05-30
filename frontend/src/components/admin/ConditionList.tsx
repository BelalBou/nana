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
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

interface Condition {
  id: number;
  questionId: number;
  operator: string;
  value: string;
  aidId: number;
  question?: {
    id: number;
    text: string;
    field: string;
    type: string;
    options?: string;
  };
}

interface ConditionListProps {
  aidId: number;
}

const ConditionList: React.FC<ConditionListProps> = ({ aidId }) => {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [conditionToDelete, setConditionToDelete] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    questionId: number | '';
    operator: string;
    value: string;
    aidId: number;
  }>({
    questionId: '',
    operator: 'equals',
    value: '',
    aidId: aidId
  });

  // Ajouter un état pour les questions disponibles
  const [availableQuestions, setAvailableQuestions] = useState<Array<{
    id: number;
    text: string;
    field: string;
    type: string;
  }>>([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  const fetchConditions = useCallback(async () => {
    try {
      // Supprimer le paramètre include car le backend l'inclut déjà automatiquement
      const response = await axios.get<Condition[]>(`${API_BASE_URL}/conditions?aidId=${aidId}`);
      console.log('Conditions récupérées:', response.data);
      setConditions(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement des conditions:', err);
      setError('Erreur lors du chargement des conditions');
      setLoading(false);
    }
  }, [API_BASE_URL, aidId]);

  // Récupérer les questions disponibles
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Array<{
          id: number;
          text: string;
          field: string;
          type: string;
        }>>(`${API_BASE_URL}/questions`);
        setAvailableQuestions(response.data);
      } catch (err) {
        console.error('Erreur lors du chargement des questions:', err);
      }
    };
    fetchQuestions();
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchConditions();
  }, [fetchConditions]);

  const handleEdit = (condition: Condition) => {
    console.log('🔍 Condition à éditer:', condition);
    console.log('🔍 Operator reçu:', condition.operator);
    
    setSelectedCondition(condition);
    
    // Normaliser l'opérateur de snake_case vers camelCase
    const normalizeOperator = (operator: string) => {
      const operatorMap: { [key: string]: string } = {
        'less_than': 'lessThan',
        'greater_than': 'greaterThan',
        'not_equals': 'notEquals',
        'equals': 'equals',
        'between': 'between',
        'contains': 'contains'
      };
      return operatorMap[operator] || 'equals';
    };
    
    const newFormData = {
      questionId: condition.questionId || condition.question?.id || '',
      operator: normalizeOperator(condition.operator),
      value: String(condition.value || ''),
      aidId: condition.aidId
    };
    
    console.log('🔍 FormData après normalisation:', newFormData);
    setFormData({
      ...newFormData,
      questionId: typeof newFormData.questionId === 'number' ? newFormData.questionId : ''
    });
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setConditionToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!conditionToDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/conditions/${conditionToDelete}`);
      setConditions(conditions.filter(condition => condition.id !== conditionToDelete));
      setOpenDeleteDialog(false);
      setConditionToDelete(null);
    } catch (err) {
      setError('Erreur lors de la suppression de la condition');
    }
  };

  const handleFormSubmit = async () => {
    try {
      // Convertir l'opérateur de camelCase vers snake_case pour le backend
      const denormalizeOperator = (operator: string) => {
        const operatorMap: { [key: string]: string } = {
          'lessThan': 'less_than',
          'greaterThan': 'greater_than',
          'notEquals': 'not_equals',
          'equals': 'equals',
          'between': 'between',
          'contains': 'contains'
        };
        return operatorMap[operator] || operator;
      };

      const submissionData = {
        ...formData,
        operator: denormalizeOperator(formData.operator)
      };

      if (selectedCondition) {
        const response = await axios.patch(`${API_BASE_URL}/conditions/${selectedCondition.id}`, submissionData);
        console.log('Condition mise à jour:', response.data);
        // Recharger les conditions pour avoir les dernières données
        fetchConditions();
      } else {
        const response = await axios.post<Condition>(`${API_BASE_URL}/conditions`, submissionData);
        console.log('Condition créée:', response.data);
        // Recharger les conditions pour avoir les dernières données
        fetchConditions();
      }
      setOpenForm(false);
      setSelectedCondition(null);
      setFormData({
        questionId: '',
        operator: 'equals',
        value: '',
        aidId: aidId
      });
    } catch (err) {
      console.error('Erreur lors de la sauvegarde de la condition:', err);
      setError('Erreur lors de la sauvegarde de la condition');
    }
  };

  // Composant Card pour mobile
  const ConditionCard: React.FC<{ condition: Condition }> = ({ condition }) => {
    const getOperatorLabel = (operator: string) => {
      const operators = {
        'equals': 'Égal à',
        'notEquals': 'Différent de',
        'greaterThan': 'Supérieur à',
        'lessThan': 'Inférieur à',
        'between': 'Entre',
        'contains': 'Contient'
      };
      return operators[operator as keyof typeof operators] || operator;
    };

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
            {condition.question?.text || 'Question non trouvée'}
          </Typography>
          
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Champ:
              </Typography>
              <Chip
                label={condition.question?.field || 'Non défini'}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Type:
              </Typography>
              <Chip
                label={condition.question?.type || 'Non défini'}
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Condition:
              </Typography>
              <Chip
                label={`${getOperatorLabel(condition.operator)} "${condition.value}"`}
                size="small"
                color="info"
                variant="filled"
              />
            </Box>
          </Stack>
        </CardContent>
        
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <IconButton
            onClick={() => handleEdit(condition)}
            size="small"
            sx={{ color: 'primary.main' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(condition.id)}
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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Conditions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedCondition(null);
            setFormData({
              questionId: '',
              operator: 'equals',
              value: '',
              aidId: aidId
            });
            setOpenForm(true);
          }}
          sx={{ mb: 2 }}
        >
          Nouvelle Condition
        </Button>
      </Box>

      {/* Affichage en tableau pour les écrans larges */}
      <TableContainer component={Paper} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Champ</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Opérateur</TableCell>
              <TableCell>Valeur</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conditions.map((condition) => (
              <TableRow key={condition.id}>
                <TableCell>
                  {condition.question?.text || 'Question non trouvée'}
                </TableCell>
                <TableCell>{condition.question?.field || 'Non défini'}</TableCell>
                <TableCell>{condition.question?.type || 'Non défini'}</TableCell>
                <TableCell>
                  {condition.operator === 'equals' && 'Égal à'}
                  {condition.operator === 'notEquals' && 'Différent de'}
                  {condition.operator === 'greaterThan' && 'Supérieur à'}
                  {condition.operator === 'lessThan' && 'Inférieur à'}
                  {condition.operator === 'between' && 'Entre'}
                  {condition.operator === 'contains' && 'Contient'}
                  {!['equals', 'notEquals', 'greaterThan', 'lessThan', 'between', 'contains'].includes(condition.operator) && condition.operator}
                </TableCell>
                <TableCell>{String(condition.value)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(condition)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(condition.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Affichage en cartes pour les écrans mobiles */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        {conditions.map((condition) => (
          <ConditionCard key={condition.id} condition={condition} />
        ))}
      </Box>

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCondition ? 'Modifier la condition' : 'Nouvelle condition'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Question</InputLabel>
              <Select
                value={formData.questionId}
                label="Question"
                onChange={(e) => setFormData({ ...formData, questionId: Number(e.target.value) })}
                required
              >
                {availableQuestions.map((question) => (
                  <MenuItem key={question.id} value={question.id}>
                    {question.text} ({question.field})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Opérateur</InputLabel>
              <Select
                value={formData.operator}
                label="Opérateur"
                onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
              >
                <MenuItem value="equals">Égal à</MenuItem>
                <MenuItem value="notEquals">Différent de</MenuItem>
                <MenuItem value="greaterThan">Supérieur à</MenuItem>
                <MenuItem value="lessThan">Inférieur à</MenuItem>
                <MenuItem value="between">Entre</MenuItem>
                <MenuItem value="contains">Contient</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Valeur"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              required
              helperText="Pour 'entre', utilisez le format: valeur1,valeur2"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Annuler</Button>
          <Button onClick={handleFormSubmit} variant="contained">
            {selectedCondition ? 'Modifier' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette condition ?
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

export default ConditionList;