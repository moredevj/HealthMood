// src/components/ProductEndpointTest.jsx
import { useState } from 'react';
import { useAuth } from '../modules/auth/hook/useAuth';

export const ProductEndpointTest = ({ productId = 4 }) => {
  const [testResult, setTestResult] = useState(null);
  const [testing, setTesting] = useState(false);
  const { isAuthenticated } = useAuth();

  const runTest = async () => {
    setTesting(true);
    setTestResult(null);
    
    const token = localStorage.getItem('authToken');
    
    const testData = {
      productId,
      isAuthenticated,
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : null,
      tests: []
    };

    // Test 1: Endpoint público /list
    try {
      console.log('🧪 Testing /api/products/list...');
      const listResponse = await fetch('http://localhost:8080/api/products/list');
      testData.tests.push({
        name: 'GET /api/products/list (público)',
        status: listResponse.status,
        success: listResponse.ok,
        data: listResponse.ok ? await listResponse.text() : 'Error'
      });
    } catch (error) {
      testData.tests.push({
        name: 'GET /api/products/list (público)',
        status: 'ERROR',
        success: false,
        data: error.message
      });
    }

    // Test 2: Endpoint específico /{id} sin token
    try {
      console.log('🧪 Testing /api/products/' + productId + ' without token...');
      const noTokenResponse = await fetch(`http://localhost:8080/api/products/${productId}`);
      testData.tests.push({
        name: `GET /api/products/${productId} (sin token)`,
        status: noTokenResponse.status,
        success: noTokenResponse.ok,
        data: noTokenResponse.ok ? await noTokenResponse.text() : await noTokenResponse.text()
      });
    } catch (error) {
      testData.tests.push({
        name: `GET /api/products/${productId} (sin token)`,
        status: 'ERROR',
        success: false,
        data: error.message
      });
    }

    // Test 3: Endpoint específico /{id} con token
    if (token) {
      try {
        console.log('🧪 Testing /api/products/' + productId + ' with token...');
        const withTokenResponse = await fetch(`http://localhost:8080/api/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const responseText = await withTokenResponse.text();
        testData.tests.push({
          name: `GET /api/products/${productId} (con token)`,
          status: withTokenResponse.status,
          success: withTokenResponse.ok,
          data: responseText
        });
      } catch (error) {
        testData.tests.push({
          name: `GET /api/products/${productId} (con token)`,
          status: 'ERROR',
          success: false,
          data: error.message
        });
      }
    }

    setTestResult(testData);
    setTesting(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>🧪 Test de Endpoints de Productos</h5>
      </div>
      <div className="card-body">
        <button 
          className="btn btn-primary"
          onClick={runTest}
          disabled={testing}
        >
          {testing ? 'Probando...' : `Probar Endpoints (ID: ${productId})`}
        </button>

        {testResult && (
          <div className="mt-3">
            <h6>Información de Autenticación:</h6>
            <ul className="list-unstyled">
              <li><strong>Autenticado:</strong> {testResult.isAuthenticated ? '✅ Sí' : '❌ No'}</li>
              <li><strong>Token:</strong> {testResult.hasToken ? '✅ Disponible' : '❌ No disponible'}</li>
              {testResult.tokenPreview && (
                <li><strong>Token Preview:</strong> <code>{testResult.tokenPreview}</code></li>
              )}
            </ul>

            <h6>Resultados de Tests:</h6>
            {testResult.tests.map((test, index) => (
              <div key={index} className={`alert ${test.success ? 'alert-success' : 'alert-danger'}`}>
                <strong>{test.name}</strong>
                <br />
                <strong>Status:</strong> {test.status}
                <br />
                <strong>Respuesta:</strong>
                <pre style={{ fontSize: '12px', maxHeight: '200px', overflow: 'auto' }}>
                  {typeof test.data === 'string' ? test.data : JSON.stringify(test.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
