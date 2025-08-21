// src/hooks/useProduct.js
import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../modules/auth/hook/useAuth';

// Imagen por defecto local (SVG en base64)
const DEFAULT_PRODUCT_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjgiIGZpbGw9IiNhZGI1YmQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfpbY8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2FkYjViZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdG88L3RleHQ+Cjwvc3ZnPgo=";

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
          category: response.category || 'Sin categoría',
          image: response.images || response.imageUrl || response.image || DEFAULT_PRODUCT_IMAGE,
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
