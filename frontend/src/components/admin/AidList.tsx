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
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
  Chip,
  Stack,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Settings as SettingsIcon } from '@mui/icons-material';
import axios from 'axios';
import AidForm from './AidForm';
import ConditionList from './ConditionList';
import { useAuth } from '../../contexts/AuthContext';

interface Aid {
  id: number;
  title: string;
  description: string;
  region: string;
  link: string;
  active: boolean;
}

const AidList: React.FC = () => {
  const { token } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [aids, setAids] = useState<Aid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedAid, setSelectedAid] = useState<Aid | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [aidToDelete, setAidToDelete] = useState<number | null>(null);
  const [selectedAidForConditions, setSelectedAidForConditions] = useState<number | null>(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  const fetchAids = useCallback(async () => {
    if (!token) {
      setError('Token d\'authentification manquant');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get<Aid[]>(`${API_BASE_URL}/aids`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAids(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement des aides:', err);
      setError('Erreur lors du chargement des aides');
      setLoading(false);
    }
  }, [API_BASE_URL, token]);

  useEffect(() => {
    fetchAids();
  }, [fetchAids]);

  const handleEdit = (aid: Aid) => {
    setSelectedAid(aid);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setAidToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!aidToDelete || !token) return;

    try {
      await axios.delete(`${API_BASE_URL}/aids/${aidToDelete}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAids(aids.filter(aid => aid.id !== aidToDelete));
      setOpenDeleteDialog(false);
      setAidToDelete(null);
    } catch (err) {
      setError('Erreur lors de la suppression de l\'aide');
    }
  };

  const handleToggleActive = async (aid: Aid) => {
    if (!token) return;

    try {
      await axios.patch(`${API_BASE_URL}/aids/${aid.id}`, {
        active: !aid.active
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAids(aids.map(a => 
        a.id === aid.id ? { ...a, active: !a.active } : a
      ));
    } catch (err) {
      setError('Erreur lors de la modification du statut');
    }
  };

  const handleFormSubmit = async (aidData: Partial<Aid>) => {
    if (!token) return;

    try {
      if (selectedAid) {
        await axios.patch(`${API_BASE_URL}/aids/${selectedAid.id}`, aidData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAids(aids.map(a => 
          a.id === selectedAid.id ? { ...a, ...aidData } : a
        ));
      } else {
        const response = await axios.post<Aid>(`${API_BASE_URL}/aids`, aidData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAids([...aids, response.data]);
      }
      setOpenForm(false);
      setSelectedAid(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde de l\'aide');
    }
  };

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Composant Card pour mobile
  const AidCard: React.FC<{ aid: Aid }> = ({ aid }) => (
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
            {aid.title}
          </Typography>
          <Switch
            checked={aid.active}
            onChange={() => handleToggleActive(aid)}
            size="small"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>
          {aid.description}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={aid.region}
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            label={aid.active ? 'Actif' : 'Inactif'}
            size="small"
            color={aid.active ? 'success' : 'default'}
            variant={aid.active ? 'filled' : 'outlined'}
          />
        </Stack>
        
        <Typography variant="body2" color="primary.main" sx={{ textDecoration: 'underline' }}>
          <a href={aid.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
            Voir le lien
          </a>
        </Typography>
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <IconButton
          onClick={() => handleEdit(aid)}
          size="small"
          sx={{ color: 'primary.main' }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => setSelectedAidForConditions(aid.id)}
          size="small"
          sx={{ color: 'info.main' }}
        >
          <SettingsIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(aid.id)}
          size="small"
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ p: 3 }}>
        {selectedAidForConditions ? (
          <>
            <Button
              startIcon={<EditIcon />}
              onClick={() => setSelectedAidForConditions(null)}
              sx={{ mb: 2 }}
            >
              Retour aux aides
            </Button>
            <ConditionList aidId={selectedAidForConditions} />
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h4">Gestion des Aides</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSelectedAid(null);
                  setOpenForm(true);
                }}
              >
                Nouvelle Aide
              </Button>
            </Box>

            {isMobile ? (
              <Box>
                {aids.map((aid) => (
                  <AidCard key={aid.id} aid={aid} />
                ))}
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Titre</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Région</TableCell>
                      <TableCell>Lien</TableCell>
                      <TableCell>Statut</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {aids.map((aid) => (
                      <TableRow key={aid.id}>
                        <TableCell>{aid.title}</TableCell>
                        <TableCell>{aid.description}</TableCell>
                        <TableCell>{aid.region}</TableCell>
                        <TableCell>
                          <a href={aid.link} target="_blank" rel="noopener noreferrer">
                            Voir le lien
                          </a>
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={aid.active}
                            onChange={() => handleToggleActive(aid)}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleEdit(aid)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(aid.id)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton onClick={() => setSelectedAidForConditions(aid.id)}>
                            <SettingsIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}

        <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedAid ? 'Modifier l\'aide' : 'Nouvelle aide'}
          </DialogTitle>
          <DialogContent>
            <AidForm
              aid={selectedAid}
              onSubmit={handleFormSubmit}
              onCancel={() => setOpenForm(false)}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer cette aide ?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Annuler</Button>
            <Button onClick={confirmDelete} color="error">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AidList;