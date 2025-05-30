import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

export interface QuestionOption {
  value: string;
  label: string;
}

export const useQuestionOptions = (field: string) => {
  const [options, setOptions] = useState<QuestionOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!field || !token) return;

    const fetchOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/questions/options/${field}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOptions((response.data as QuestionOption[]) || []);
      } catch (err) {
        console.error('Erreur lors de la récupération des options:', err);
        setError('Impossible de charger les options');
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [field, token]);

  return { options, loading, error };
};