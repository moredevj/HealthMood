import { useState, useEffect } from 'react';

// Imagen por defecto (SVG en base64) - exportada para reutilización
export const DEFAULT_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfpbY8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdG88L3RleHQ+Cjwvc3ZnPgo=";

/**
 * Componente seguro para mostrar imágenes con fallback
 * Maneja diferentes formatos de URLs de imágenes y proporciona una imagen por defecto si falla
 */
export default function SafeImage({ src, alt, className, style, ...rest }) {
  const [imageSrc, setImageSrc] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Resetear el estado cuando cambia la fuente
    setHasError(false);

    // Verificar si la fuente es válida
    if (!src || src === '') {
      console.log('⚠️ SafeImage: URL de imagen vacía o nula');
      // Intentar cargar la imagen desde la API en lugar de usar la imagen por defecto
      const fetchImageFromApi = async () => {
        try {
          // Intentar extraer el ID del producto de las propiedades disponibles
          const productId = rest.productId || rest.id;
          if (productId) {
            const apiService = (await import('../services/api')).default;
            const imageData = await apiService.getProductImage(productId);
            if (imageData && (imageData.url || imageData.src || imageData.path)) {
              console.log(`✅ SafeImage: Imagen cargada desde API para producto ${productId}`);
              setImageSrc(imageData.url || imageData.src || imageData.path);
              return;
            }
          }
          // Si no hay ID o falla la carga, usar imagen por defecto
          setImageSrc(DEFAULT_IMAGE);
        } catch (error) {
          console.error('Error al cargar imagen desde API:', error);
          setImageSrc(DEFAULT_IMAGE);
        }
      };
      fetchImageFromApi();
      return;
    }

    // Manejar arrays de imágenes (algunas APIs devuelven arrays)
    if (Array.isArray(src)) {
      if (src.length > 0 && typeof src[0] === 'string') {
        console.log('🖼️ SafeImage: Usando primera imagen del array');
        setImageSrc(src[0]);
      } else {
        console.log('⚠️ SafeImage: Array de imágenes vacío o inválido');
        setImageSrc(DEFAULT_IMAGE);
      }
      return;
    }

    // Manejar objetos (algunas APIs devuelven objetos con urls)
    if (typeof src === 'object' && src !== null) {
      // Intentar buscar una propiedad común que contenga la URL
      const possibleUrlProps = ['url', 'src', 'path', 'href', 'link', 'source'];
      for (const prop of possibleUrlProps) {
        if (src[prop] && typeof src[prop] === 'string') {
          console.log(`🖼️ SafeImage: Usando propiedad ${prop} del objeto de imagen`);
          setImageSrc(src[prop]);
          return;
        }
      }
      console.log('⚠️ SafeImage: Objeto de imagen sin URL válida');
      setImageSrc(DEFAULT_IMAGE);
      return;
    }

    // Si es un string, usarlo directamente
    if (typeof src === 'string') {
      console.log('🖼️ SafeImage: Usando URL de imagen string');
      setImageSrc(src);
      return;
    }

    // Para cualquier otro caso, usar imagen por defecto
    console.log('⚠️ SafeImage: Formato de imagen no reconocido');
    setImageSrc(DEFAULT_IMAGE);
  }, [src]);

  // Manejador de errores de carga
  const handleError = () => {
    console.log('❌ SafeImage: Error al cargar la imagen, usando fallback');
    setHasError(true);
    setImageSrc(DEFAULT_IMAGE);
  };

  return (
    <img
      src={hasError ? DEFAULT_IMAGE : imageSrc}
      alt={alt || 'Imagen'}
      className={className || ''}
      style={{ ...style }}
      onError={handleError}
      loading="lazy"
      {...rest}
    />
  );
}
