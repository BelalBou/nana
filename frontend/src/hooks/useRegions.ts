import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export interface Region {
  id: number;
  name: string;
}

export const useRegions = () => {
  const { token } = useAuth(); // On garde token mais on ne vérifie plus isAuthenticated
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegions = async () => {
      console.log('🔍 useRegions - Début fetchRegions');
      console.log('- token exists:', !!token);
      console.log('- User Agent:', navigator.userAgent);

      setLoading(true);
      setError(null);
      
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
        console.log('🔍 useRegions - API URL:', apiBaseUrl);
        
        // Créer la configuration de la requête
        const config: any = {};
        
        // Ajouter le token seulement s'il existe (pour l'admin)
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
        
        const response = await axios.get(`${apiBaseUrl}/aids`, config);
        
        console.log('🔍 useRegions - Réponse API aids:', response.data);
        
        // Extraire les régions uniques des aides
        const aids = Array.isArray(response.data) ? response.data : [];
        console.log('🔍 useRegions - Nombre d\'aides:', aids.length);
        
        const uniqueRegions = Array.from(new Set(aids.map((aid: any) => aid.region)))
          .filter(Boolean)
          .map((region: string, index: number) => ({
            id: index + 1,
            name: region
          }));
        
        console.log('🔍 useRegions - Régions uniques extraites:', uniqueRegions);
        setRegions(uniqueRegions);
      } catch (error) {
        console.error('🔍 useRegions - Erreur lors du chargement des régions:', error);
        setError('Erreur lors du chargement des régions');
        setRegions([]);
      } finally {
        setLoading(false);
        console.log('🔍 useRegions - Fin fetchRegions');
      }
    };

    fetchRegions();
  }, [token]); // Ne plus dépendre de isAuthenticated

  // Log à chaque changement d'état
  useEffect(() => {
    console.log('🔍 useRegions - État mis à jour:');
    console.log('- regions:', regions);
    console.log('- loading:', loading);
    console.log('- error:', error);
  }, [regions, loading, error]);

  return { regions, loading, error };
};
