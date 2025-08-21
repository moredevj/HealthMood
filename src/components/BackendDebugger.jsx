// src/components/BackendDebugger.jsx
import React, { useState } from 'react';
import { apiService } from '../services/api';

export const BackendDebugger = () => {
  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState({});

  const runTest = async (testName, testFunction) => {
    setTesting(prev => ({ ...prev, [testName]: true }));
    try {
      const result = await testFunction();
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { success: true, data: result, error: null } 
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { success: false, data: null, error: error.message } 
      }));
    } finally {
      setTesting(prev => ({ ...prev, [testName]: false }));
    }
  };

  const tests = [
    {
      name: 'health',
      label: '🏥 Health Check',
      test: () => apiService.healthCheck()
    },
    {
      name: 'products',
      label: '🛍️ Products',
      test: () => apiService.getProducts()
    },
    {
      name: 'raw-health',
      label: '🔍 Raw Health (sin token)',
      test: async () => {
        // Hacer petición sin token temporalmente
        const token = localStorage.getItem('authToken');
        localStorage.removeItem('authToken');
        try {
          const result = await fetch('http://localhost:8080/api/health');
          const text = await result.text();
          return { status: result.status, body: text };
        } finally {
          if (token) localStorage.setItem('authToken', token);
        }
      }
    },
    {
      name: 'raw-products',
      label: '🔍 Raw Products (con token manual)',
      test: async () => {
        const token = localStorage.getItem('authToken');
        const result = await fetch('http://localhost:8080/api/products', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const text = await result.text();
        let parsedBody;
        try {
          parsedBody = JSON.parse(text);
        } catch {
          parsedBody = text;
        }
        return { 
          status: result.status, 
          body: parsedBody, 
          headers: Object.fromEntries(result.headers.entries()) 
        };
      }
    }
  ];

  const getResultStyle = (result) => {
    if (!result) return { backgroundColor: '#f3f4f6', color: '#6b7280' };
    return result.success 
      ? { backgroundColor: '#d1fae5', color: '#065f46' }
      : { backgroundColor: '#fee2e2', color: '#991b1b' };
  };

  return (
    <div style={{ 
      padding: '16px', 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      marginBottom: '16px',
      backgroundColor: '#fafafa'
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>🔬 Debugger Avanzado del Backend</h3>
      
      <div style={{ marginBottom: '16px' }}>
        <button 
          onClick={() => tests.forEach(test => runTest(test.name, test.test))}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
          }}
        >
          🚀 Ejecutar Todos los Tests
        </button>
      </div>

      {tests.map(test => (
        <div key={test.name} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <button 
              onClick={() => runTest(test.name, test.test)}
              disabled={testing[test.name]}
              style={{
                padding: '4px 8px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: testing[test.name] ? 'not-allowed' : 'pointer',
                opacity: testing[test.name] ? 0.6 : 1,
                marginRight: '8px',
                fontSize: '12px'
              }}
            >
              {testing[test.name] ? '⏳' : '▶️'}
            </button>
            <span style={{ fontWeight: '500' }}>{test.label}</span>
          </div>
          
          {testResults[test.name] && (
            <div style={{
              ...getResultStyle(testResults[test.name]),
              padding: '8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontFamily: 'monospace',
              marginLeft: '40px'
            }}>
              {testResults[test.name].success ? (
                <div>
                  <strong>✅ Éxito:</strong>
                  <pre style={{ margin: '4px 0', whiteSpace: 'pre-wrap' }}>
                    {JSON.stringify(testResults[test.name].data, null, 2)}
                  </pre>
                </div>
              ) : (
                <div>
                  <strong>❌ Error:</strong>
                  <div style={{ marginTop: '4px' }}>{testResults[test.name].error}</div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <div style={{ 
        marginTop: '16px', 
        padding: '12px', 
        backgroundColor: '#fef3c7', 
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <strong>💡 Interpretación de resultados:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '16px' }}>
          <li><strong>Health/Products fallan con 403:</strong> Problema de autenticación en backend</li>
          <li><strong>Raw Health sin token funciona:</strong> Backend está funcionando</li>
          <li><strong>Raw Products con token manual falla:</strong> Problema de configuración CORS o validación JWT</li>
          <li><strong>Todos fallan:</strong> Backend caído o inaccesible</li>
        </ul>
      </div>
    </div>
  );
};
