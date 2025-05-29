import { useState, useEffect } from 'react';
import axios from 'axios';

interface Region {
  id: number;
  name: string;
}

interface Aid {
  id: number;
  title: string;
  description: string;
  region: string;
  link: string;
  active: boolean;
}

interface UseRegionsReturn {
  regions: Region[];
  loading: boolean;
  error: string | null;
}

export const useRegions = (): UseRegionsReturn => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        console.log('Fetching aids to extract regions from:', `${API_BASE_URL}/aids`);
        const response = await axios.get<Aid[]>(`${API_BASE_URL}/aids`);
        console.log('Aides récupérées:', response.data);
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // Extraire les régions uniques des aides
          const regionNames = response.data
            .map((aid: Aid) => aid.region)
            .filter((region): region is string => region != null && region !== '');
          
          const uniqueRegionNames = Array.from(new Set(regionNames));
          
          const uniqueRegions: Region[] = uniqueRegionNames.map((regionName, index) => ({
            id: index + 1,
            name: regionName
          }));
          
          console.log('Régions uniques extraites:', uniqueRegions);
          setRegions(uniqueRegions);
        } else {
          console.log('Aucune aide trouvée, pas de régions disponibles');
          setRegions([]);
        }
      } catch (err) {
        console.error('Erreur lors du chargement des aides pour extraire les régions:', err);
        setError('Erreur lors du chargement des régions');
        setRegions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, [API_BASE_URL]);

  // Log pour debug
  useEffect(() => {
    console.log('État actuel des régions extraites:', regions);
  }, [regions]);

  return { regions, loading, error };
};

export type { Region };
