import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testBackendConnection = async () => {
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
    };

    testBackendConnection();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test de Connexion Backend</h1>
        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
    </div>
  );
}

export default App;
