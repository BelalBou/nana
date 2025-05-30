import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export interface Region {
  id: number;
  name: string;
}

export const useRegions = () => {
  const { token, isAuthenticated } = useAuth();
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      if (!isAuthenticated || !token) {
        console.log('Non authentifié, pas de chargement des régions');
        setRegions([]);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('http://localhost:3001/aids', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('Réponse aids:', response.data);
        
        // Extraire les régions uniques des aides
        const aids = Array.isArray(response.data) ? response.data : [];
        const uniqueRegions = Array.from(new Set(aids.map((aid: any) => aid.region)))
          .filter(Boolean)
          .map((region: string, index: number) => ({
            id: index + 1,
            name: region
          }));
        
        console.log('Régions extraites:', uniqueRegions);
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('Erreur lors du chargement des régions:', error);
        setError('Erreur lors du chargement des régions');
        setRegions([]); // S'assurer que regions est toujours un tableau
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, [token, isAuthenticated]);

  return { regions, loading, error };
};
