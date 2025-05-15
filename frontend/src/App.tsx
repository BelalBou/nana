import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [dbMessage, setDbMessage] = useState<string>('');
  const [dbError, setDbError] = useState<string>('');

  useEffect(() => {
    const testConnections = async () => {
      // Test CORS
      try {
        const response = await fetch('http://localhost:4000', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.text();
        setMessage('✅ Connexion au backend réussie ! CORS est correctement configuré.');
      } catch (err) {
        setError('❌ Erreur de connexion au backend. Vérifiez que le serveur est en cours d\'exécution et que CORS est configuré.');
      }

      // Test Base de données
      try {
        const dbResponse = await fetch('http://localhost:4000/test-db', {
          method: 'GET',
          credentials: 'include',
        });
        const dbData = await dbResponse.json();
        if (dbData.status === 'success') {
          setDbMessage(dbData.message);
        } else {
          setDbError(dbData.message);
        }
      } catch (err) {
        setDbError('❌ Erreur lors du test de la base de données');
      }
    };

    testConnections();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test de Connexion</h1>
        <div className="test-section">
          <h2>Test Backend</h2>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <div className="test-section">
          <h2>Test Base de données</h2>
          {dbMessage && <p style={{ color: 'green' }}>{dbMessage}</p>}
          {dbError && <p style={{ color: 'red' }}>{dbError}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
