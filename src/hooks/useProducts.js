// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { MOCK } from '../modules/home/utils/dummyData';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiService.getProducts();
        
        // El backend puede devolver los datos directamente o en response.data
        const rawProducts = response.data || response;
        
        // Verificar si la respuesta es válida
        if (rawProducts && Array.isArray(rawProducts)) {
          
          // Transformar la estructura del backend al formato esperado del frontend
          const transformedProducts = rawProducts.map(product => {
            // Extraer la primera imagen del array de imágenes
            let imageUrl = null;
            if (product.images && Array.isArray(product.images) && product.images.length > 0) {
              imageUrl = product.images[0].imageUrl || product.images[0].url || product.images[0].src;
            }

            return {
              // Mapear productId a id
              id: product.productId || product.id,
              // Mapear campos básicos
              name: product.name || 'Producto sin nombre',
              description: product.description || 'Sin descripción',
              price: product.price || 0,
              // Extraer nombre de categoría del objeto
              category: product.category?.name || String(product.category || 'Sin categoría'),
              // Extraer primera imagen del array
              image: imageUrl,
              // Campos adicionales
              rating: product.rating || 4.5,
              stock: product.stock !== undefined ? product.stock : 10,
              active: product.active !== undefined ? product.active : true
            };
          });
          
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
  }, []); // Sin dependencias - se ejecuta solo una vez

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
