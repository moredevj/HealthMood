// src/hooks/useProduct.js
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../modules/auth/hook/useAuth';

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
        // Extraer la primera imagen del array de imágenes
        let imageUrl = null;
        if (response.images && Array.isArray(response.images) && response.images.length > 0) {
          imageUrl = response.images[0].imageUrl || response.images[0].url || response.images[0].src;
        }

        const transformedProduct = {
          id: response.productId || response.id,
          name: response.name || 'Producto sin nombre',
          description: response.description || 'Sin descripción',
          price: response.price || 0,
          // Extraer nombre de categoría del objeto
          category: response.category?.name || String(response.category || 'Sin categoría'),
          // Extraer primera imagen del array
          image: imageUrl,
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
