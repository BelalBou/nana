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

interface Condition {
  id: number;
  question: string;
  field: string;
  type: string;
  operator: string;
  value: string;
  order: number;
  aidId: number;
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
  const [formData, setFormData] = useState<Partial<Condition>>({
    question: '',
    field: '',
    type: 'text',
    operator: 'equals',
    value: '',
    order: 0,
    aidId: aidId
  });

  const fetchConditions = useCallback(async () => {
    try {
      const response = await axios.get<Condition[]>(`http://localhost:4000/aids/${aidId}/conditions`);
      setConditions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des conditions');
      setLoading(false);
    }
  }, [aidId]);

  useEffect(() => {
    fetchConditions();
  }, [fetchConditions]);

  const handleEdit = (condition: Condition) => {
    setSelectedCondition(condition);
    setFormData(condition);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setConditionToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!conditionToDelete) return;

    try {
      await axios.delete(`http://localhost:4000/conditions/${conditionToDelete}`);
      setConditions(conditions.filter(condition => condition.id !== conditionToDelete));
      setOpenDeleteDialog(false);
      setConditionToDelete(null);
    } catch (err) {
      setError('Erreur lors de la suppression de la condition');
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (selectedCondition) {
        await axios.patch(`http://localhost:4000/conditions/${selectedCondition.id}`, formData);
        setConditions(conditions.map(c => 
          c.id === selectedCondition.id ? { ...c, ...formData } : c
        ));
      } else {
        const response = await axios.post<Condition>('http://localhost:4000/conditions', formData);
        setConditions([...conditions, response.data]);
      }
      setOpenForm(false);
      setSelectedCondition(null);
      setFormData({
        question: '',
        field: '',
        type: 'text',
        operator: 'equals',
        value: '',
        order: 0,
        aidId: aidId
      });
    } catch (err) {
      setError('Erreur lors de la sauvegarde de la condition');
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
        <Typography variant="h5">Conditions</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedCondition(null);
            setFormData({
              question: '',
              field: '',
              type: 'text',
              operator: 'equals',
              value: '',
              order: conditions.length,
              aidId: aidId
            });
            setOpenForm(true);
          }}
        >
          Nouvelle Condition
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Champ</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Opérateur</TableCell>
              <TableCell>Valeur</TableCell>
              <TableCell>Ordre</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conditions.map((condition) => (
              <TableRow key={condition.id}>
                <TableCell>{condition.question}</TableCell>
                <TableCell>{condition.field}</TableCell>
                <TableCell>{condition.type}</TableCell>
                <TableCell>{condition.operator}</TableCell>
                <TableCell>{condition.value}</TableCell>
                <TableCell>{condition.order}</TableCell>
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

      <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedCondition ? 'Modifier la condition' : 'Nouvelle condition'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <TextField
              fullWidth
              label="Question"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
            <TextField
              fullWidth
              label="Champ"
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
                <MenuItem value="contains">Contient</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Valeur"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              required
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