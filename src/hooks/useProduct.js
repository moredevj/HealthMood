// src/hooks/useProduct.js
import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { useAuth } from '../modules/auth/hook/useAuth';

// Importar imagen por defecto desde constante compartida
import { DEFAULT_IMAGE } from '../components/SafeImage';

// Alias para mantener compatibilidad con código existente
const DEFAULT_PRODUCT_IMAGE = DEFAULT_IMAGE;

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        setError('ID de producto no proporcionado');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Intentar obtener producto del backend (endpoint público)
        const response = await apiService.getProduct(productId);
        
        // Transformar la estructura del backend
        const transformedProduct = {
          id: response.productId || response.id,
          name: response.name || 'Producto sin nombre',
          description: response.description || 'Sin descripción',
          price: response.price || 0,
          category: typeof response.category === 'object' && response.category !== null 
            ? response.category.name || 'Sin categoría'
            : response.category || 'Sin categoría',
          // Priorizar imageUrl que viene de la tabla 'img'
          image: response.imageUrl || (() => {
            // Si es un array, tomar el primer elemento
            if (Array.isArray(response.images) && response.images.length > 0) {
              return response.images[0];
            }
            // Si tenemos un objeto con url
            if (response.images && typeof response.images === 'object' && response.images.url) {
              return response.images.url;
            }
            // Otras opciones como fallback
            return response.images || response.image || null;
          })(),
          stock: response.stock !== undefined ? response.stock : 10,
          active: response.active !== undefined ? response.active : true
        };

        setProduct(transformedProduct);
        setUsingMockData(false);
        
      } catch (error) {
        // Si hay cualquier error, usar datos mock como fallback
        try {
          const { getProductsDummy } = await import('../modules/products/utils/dummyData');
          const mockProducts = getProductsDummy();
          const mockProduct = mockProducts.find(p => p.id == productId);
          
          if (mockProduct) {
            setProduct(mockProduct);
            setUsingMockData(true);
            setError(`Error de conexión: ${error.message}. Mostrando datos de prueba.`);
          } else {
            setError('Producto no encontrado');
          }
        } catch (mockError) {
          setError('Producto no encontrado');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // Solo depende del productId, no de autenticación

  return {
    product,
    loading,
    error,
    usingMockData,
    refetch: () => fetchProduct()
  };
};
