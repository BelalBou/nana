import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  AppBar,
  Toolbar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Settings as SettingsIcon, Logout as LogoutIcon } from '@mui/icons-material';
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
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [aids, setAids] = useState<Aid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedAid, setSelectedAid] = useState<Aid | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [aidToDelete, setAidToDelete] = useState<number | null>(null);
  const [selectedAidForConditions, setSelectedAidForConditions] = useState<number | null>(null);

  useEffect(() => {
    fetchAids();
  }, []);

  const fetchAids = async () => {
    try {
      const response = await axios.get<Aid[]>('http://localhost:4000/aids');
      setAids(response.data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des aides');
      setLoading(false);
    }
  };

  const handleEdit = (aid: Aid) => {
    setSelectedAid(aid);
    setOpenForm(true);
  };

  const handleDelete = (id: number) => {
    setAidToDelete(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!aidToDelete) return;

    try {
      await axios.delete(`http://localhost:4000/aids/${aidToDelete}`);
      setAids(aids.filter(aid => aid.id !== aidToDelete));
      setOpenDeleteDialog(false);
      setAidToDelete(null);
    } catch (err) {
      setError('Erreur lors de la suppression de l\'aide');
    }
  };

  const handleToggleActive = async (aid: Aid) => {
    try {
      await axios.patch(`http://localhost:4000/aids/${aid.id}`, {
        active: !aid.active
      });
      setAids(aids.map(a => 
        a.id === aid.id ? { ...a, active: !a.active } : a
      ));
    } catch (err) {
      setError('Erreur lors de la modification du statut');
    }
  };

  const handleFormSubmit = async (aidData: Partial<Aid>) => {
    try {
      if (selectedAid) {
        await axios.patch(`http://localhost:4000/aids/${selectedAid.id}`, aidData);
        setAids(aids.map(a => 
          a.id === selectedAid.id ? { ...a, ...aidData } : a
        ));
      } else {
        const response = await axios.post<Aid>('http://localhost:4000/aids', aidData);
        setAids([...aids, response.data]);
      }
      setOpenForm(false);
      setSelectedAid(null);
    } catch (err) {
      setError('Erreur lors de la sauvegarde de l\'aide');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administration
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

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