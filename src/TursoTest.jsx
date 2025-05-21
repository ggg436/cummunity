import { useState, useEffect } from 'react';

export default function TursoTest() {
  const [status, setStatus] = useState({ loading: true, data: null, error: null });

  useEffect(() => {
    async function testConnection() {
      try {
        setStatus({ loading: true, data: null, error: null });
        const response = await fetch('/api/db');
        const data = await response.json();
        setStatus({ loading: false, data, error: null });
      } catch (error) {
        setStatus({ loading: false, data: null, error: error.message });
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Turso Database Connection Test</h2>
      
      {status.loading && <p>Testing connection to Turso...</p>}
      
      {status.error && (
        <div className="bg-red-100 p-4 rounded-md">
          <h3 className="text-red-800 font-medium">Connection Error</h3>
          <p className="text-red-700">{status.error}</p>
        </div>
      )}
      
      {status.data && (
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="text-green-800 font-medium">Connection Successful!</h3>
          <p className="text-green-700">{status.data.message}</p>
          <p className="text-green-700">SQLite Version: {status.data.version}</p>
        </div>
      )}
    </div>
  );
} 