// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { MOCK } from '../modules/home/utils/dummyData';

// Importar imagen por defecto desde constante compartida
import { DEFAULT_IMAGE } from '../components/SafeImage';

// Alias para mantener compatibilidad con código existente
const DEFAULT_PRODUCT_IMAGE = DEFAULT_IMAGE;

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
            // Asegurar que la categoría siempre sea un string para evitar errores de renderización
            category: typeof product.category === 'object' && product.category !== null 
              ? product.category.name || 'Sin categoría'
              : product.category || 'Sin categoría',
            // Priorizar imageUrl que viene de la tabla 'img'
            image: product.imageUrl || (() => {
              // Si es un array, tomar el primer elemento
              if (Array.isArray(product.images) && product.images.length > 0) {
                return product.images[0];
              }
              // Si tenemos un objeto con url
              if (product.images && typeof product.images === 'object' && product.images.url) {
                return product.images.url;
              }
              // Otras opciones como fallback
              return product.images || product.image || null;
            })(),
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
          // Priorizar imageUrl que viene de la tabla 'img'
          image: product.imageUrl || (() => {
            // Si es un array, tomar el primer elemento
            if (Array.isArray(product.images) && product.images.length > 0) {
              return product.images[0];
            }
            // Si tenemos un objeto con url
            if (product.images && typeof product.images === 'object' && product.images.url) {
              return product.images.url;
            }
            // Otras opciones como fallback
            return product.images || product.image || null;
          })(),
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
