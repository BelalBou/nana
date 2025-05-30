import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export interface Region {
  id: number;
  name: string;
}

export const useRegions = () => {
  const { token } = useAuth();
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
        
        // Créer la configuration de la requête
        const config: any = {};
        
        // Ajouter le token seulement s'il existe (pour l'admin)
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
        
        const response = await axios.get(`${apiBaseUrl}/aids`, config);
        
        // Extraire les régions uniques des aides
        const aids = Array.isArray(response.data) ? response.data : [];
        const uniqueRegions = Array.from(new Set(aids.map((aid: any) => aid.region)))
          .filter(Boolean)
          .map((region: string, index: number) => ({
            id: index + 1,
            name: region
          }));
        
        setRegions(uniqueRegions);
      } catch (error) {
        setError('Erreur lors du chargement des régions');
        setRegions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, [token]);

  return { regions, loading, error };
};
