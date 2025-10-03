import React, { useState, useEffect } from 'react';
import { hasPendingData, syncDataToFiles } from '../services/githubService';
import './SyncStatus.css';

const SyncStatus = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState([]);
  const [hasPending, setHasPending] = useState(false);

  useEffect(() => {
    // Verificar si hay datos pendientes al cargar el componente
    setHasPending(hasPendingData());
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncResults([]);
    
    try {
      const results = await syncDataToFiles();
      setSyncResults(results);
      setHasPending(false);
    } catch (error) {
      console.error('Error en sincronización:', error);
      setSyncResults([{ type: 'Error', success: false, message: error.message }]);
    } finally {
      setIsSyncing(false);
    }
  };

  if (!hasPending && syncResults.length === 0) {
    return (
      <div className="sync-status success">
        <div className="sync-header">
          <h3>✅ Sistema Local Activo</h3>
          <p className="success-message">
            Los datos se guardan localmente cuando agregas contenido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sync-status">
      <div className="sync-header">
        <h3>🔄 Estado de Sincronización</h3>
        {hasPending && (
          <p className="pending-message">
            Tienes datos pendientes de sincronizar con archivos JSON
          </p>
        )}
      </div>

      {syncResults.length > 0 && (
        <div className="sync-results">
          {syncResults.map((result, index) => (
            <div 
              key={index} 
              className={`sync-result ${result.success ? 'success' : 'error'}`}
            >
              <span className="result-type">{result.type}:</span>
              <span className="result-message">{result.message}</span>
            </div>
          ))}
        </div>
      )}

      <div className="sync-actions">
        <button 
          onClick={handleSync} 
          disabled={isSyncing}
          className="sync-button"
        >
          {isSyncing ? '🔄 Sincronizando...' : '🚀 Sincronizar con Archivos JSON'}
        </button>
        
        <p className="sync-info">
          💡 Los datos se guardan en localStorage. Usa este botón para sincronizar con los archivos JSON.
        </p>
      </div>
    </div>
  );
};

export default SyncStatus;
