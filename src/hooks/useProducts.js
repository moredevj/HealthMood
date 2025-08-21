// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { MOCK } from '../modules/home/utils/dummyData';

// Imagen por defecto local (SVG en base64)
const DEFAULT_PRODUCT_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfpbY8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdG88L3RleHQ+Cjwvc3ZnPgo=";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    console.log('🔄 useProducts: Cargando productos del backend...');
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('� Haciendo petición a backend: http://localhost:8080/api/products/list');
        const response = await apiService.getProducts();
        console.log('📦 Respuesta del backend:', response);
        
        // El backend puede devolver los datos directamente o en response.data
        const rawProducts = response.data || response;
        
        // Verificar si la respuesta es válida
        if (rawProducts && Array.isArray(rawProducts)) {
          console.log(`✅ ${rawProducts.length} productos recibidos del backend`);
          
          // Transformar la estructura del backend al formato esperado del frontend
          const transformedProducts = rawProducts.map(product => ({
            // Mapear productId a id
            id: product.productId || product.id,
            // Mapear campos básicos
            name: product.name || 'Producto sin nombre',
            description: product.description || 'Sin descripción',
            price: product.price || 0,
            // IMPORTANTE: Manejar category como string, no como array
            category: product.category || 'Sin categoría',
            // Mapear images/imageUrl a image
            image: product.images || product.imageUrl || product.image || DEFAULT_PRODUCT_IMAGE,
            // Campos adicionales
            rating: product.rating || 4.5,
            stock: product.stock !== undefined ? product.stock : 10,
            active: product.active !== undefined ? product.active : true
          }));
          
          console.log('🔄 Productos transformados:', transformedProducts);
          setProducts(transformedProducts);
          setIsUsingFallback(false);
        } else {
          console.warn('⚠️ Respuesta del backend no válida, usando datos mock');
          setProducts(MOCK);
          setIsUsingFallback(true);
        }
        
      } catch (err) {
        console.error('❌ Error al cargar productos del backend:', err);
        console.log('🔄 Usando datos mock como fallback');
        setError(err.message);
        setProducts(MOCK);
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Sin dependencias - se ejecuta solo una vez

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Refetching productos...');
      const response = await apiService.getProducts();
      const rawProducts = response.data || response;
      
      if (rawProducts && Array.isArray(rawProducts)) {
        const transformedProducts = rawProducts.map(product => ({
          id: product.productId || product.id,
          name: product.name || 'Producto sin nombre',
          description: product.description || 'Sin descripción',
          price: product.price || 0,
          category: product.category || 'Sin categoría',
          image: product.images || product.imageUrl || product.image || DEFAULT_PRODUCT_IMAGE,
          rating: product.rating || 4.5,
          stock: product.stock !== undefined ? product.stock : 10,
          active: product.active !== undefined ? product.active : true
        }));
        
        setProducts(transformedProducts);
        setIsUsingFallback(false);
        return transformedProducts;
      } else {
        setProducts(MOCK);
        setIsUsingFallback(true);
        return MOCK;
      }
    } catch (err) {
      console.error('❌ Error en refetch:', err);
      setError(err.message);
      setProducts(MOCK);
      setIsUsingFallback(true);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    products, 
    loading, 
    error, 
    refetch, 
    isUsingFallback
  };
};
