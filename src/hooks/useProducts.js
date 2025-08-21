// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { MOCK } from '../modules/home/utils/dummyData';
import { useAuth } from '../modules/auth/hook/useAuth';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('🔄 useProducts useEffect triggered, isAuthenticated:', isAuthenticated);
    
    const fetchProducts = async () => {
      // Verificar token antes de decidir usar mock
      const token = localStorage.getItem('authToken');
      console.log('🔑 Token verificado en useProducts:', token ? 'PRESENTE' : 'AUSENTE');
      
      // Si no está autenticado o no hay token, usar datos mock directamente
      if (!isAuthenticated || !token) {
        console.log('🔄 Usuario no autenticado o sin token, usando datos mock...');
        setProducts(MOCK);
        setIsUsingFallback(true);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getProducts();
        
        // Verificar si la respuesta es válida
        if (response && Array.isArray(response)) {
          // Transformar la estructura del backend al formato esperado del frontend
          const transformedProducts = response.map(product => ({
            // Mapear productId a id
            id: product.productId || product.id,
            // Mapear campos básicos
            name: product.name || 'Producto sin nombre',
            description: product.description || 'Sin descripción',
            price: product.price || 0,
            category: product.category || 'Sin categoría',
            // Mapear images/imageUrl a image
            image: product.images || product.imageUrl || product.image || 'https://via.placeholder.com/300x200?text=Sin+Imagen',
            // Campos adicionales
            stock: product.stock !== undefined ? product.stock : 10, // Stock por defecto si no viene
            active: product.active !== undefined ? product.active : true
          }));
          
          setProducts(transformedProducts);
          setIsUsingFallback(false);
        } else if (response && response.data && Array.isArray(response.data)) {
          // Si la respuesta viene envuelta en un objeto data
          const transformedProducts = response.data.map(product => ({
            id: product.productId || product.id,
            name: product.name || 'Producto sin nombre',
            description: product.description || 'Sin descripción',
            price: product.price || 0,
            category: product.category || 'general',
            image: product.images || product.imageUrl || product.image || 'https://via.placeholder.com/300x200?text=Sin+Imagen',
            stock: product.stock !== undefined ? product.stock : 10,
            active: product.active !== undefined ? product.active : true
          }));
          
          setProducts(transformedProducts);
          setIsUsingFallback(false);
        } else {
          setProducts(MOCK);
          setIsUsingFallback(true);
        }
        
      } catch (err) {
        setError(err.message);
        setProducts(MOCK);
        setIsUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Escuchar eventos de cambio de autenticación
    const handleAuthChange = () => {
      fetchProducts();
    };

    window.addEventListener('auth-changed', handleAuthChange);
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange);
    };
  }, [isAuthenticated]); // Dependencia en isAuthenticated

  const refetch = async () => {
    if (!isAuthenticated) {
      setProducts(MOCK);
      setIsUsingFallback(true);
      return MOCK;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getProducts();
      setProducts(response);
      setIsUsingFallback(false);
      return response;
    } catch (err) {
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
    isUsingFallback,
    isAuthenticated
  };
};
