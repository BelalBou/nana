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
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Condition {
  id: number;
  question?: {
    text?: string;
    field?: string;
    type?: string;
  };
  operator: string;
  value: string | number;
}

interface ConditionListProps {
  aidId: number;
}

const ConditionList: React.FC<ConditionListProps> = ({ aidId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const [formData, setFormData] = useState({
    questionId: '',
    operator: 'equals',
    value: '',
    aidId: aidId
  });

  useEffect(() => {
    // Fetch conditions from API or props
  }, [aidId]);

  const handleEdit = (condition: Condition) => {
    setSelectedCondition(condition);
    setFormData({
      questionId: condition.question?.field || '',
      operator: condition.operator,
      value: condition.value.toString(),
      aidId: aidId
    });
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    // Delete condition logic
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic
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
              questionId: '',
              operator: 'equals',
              value: '',
              aidId: aidId
            });
            setOpenForm(true);
          }}
        >
          Nouvelle Condition
        </Button>
      </Box>

      {isMobile ? (
        <Box>
          {conditions.map((condition) => (
            <ConditionCard key={condition.id} condition={condition} />
          ))}
          {conditions.length === 0 && (
            <Paper
              elevation={0}
              sx={{
                p: 4,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2,
              }}
            >
              <Typography color="text.secondary">
                Aucune condition définie pour cette aide
              </Typography>
            </Paper>
          )}
        </Box>
      ) : (
        <TableContainer component={Paper}>
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
      )}

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{selectedCondition ? 'Modifier la condition' : 'Nouvelle condition'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="questionId-label">Question</InputLabel>
              <Select
                labelId="questionId-label"
                id="questionId"
                value={formData.questionId}
                onChange={(e) => setFormData({ ...formData, questionId: e.target.value })}
                required
              >
                {/* Map questions here */}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="operator-label">Opérateur</InputLabel>
              <Select
                labelId="operator-label"
                id="operator"
                value={formData.operator}
                onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                required
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
              margin="normal"
              label="Valeur"
              variant="outlined"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              required
            />

            <DialogActions>
              <Button onClick={() => setOpenForm(false)} color="primary">
                Annuler
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {selectedCondition ? 'Sauvegarder' : 'Créer'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ConditionList;