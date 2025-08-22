import { useState, useEffect } from 'react';

export default function SafeImage({ 
  src, 
  alt = 'Imagen', 
  className = '', 
  style = {},
  fallbackSrc,
  ...props 
}) {
  // Si no hay src inicial, usar directamente el fallback
  const [imageSrc, setImageSrc] = useState(src || fallbackSrc || defaultImage);
  const [hasError, setHasError] = useState(!src); // Si no hay src, ya es un error

  // Imagen por defecto mejorada con icono de producto
  const defaultImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNhZGI1YmQiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfpbY8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2FkYjViZCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U2luIGltYWdlbjwvdGV4dD4KPC9zdmc+Cg==";

  // Efecto para resetear cuando cambia src
  useEffect(() => {
    if (src && src !== imageSrc) {
      setImageSrc(src);
      setHasError(false);
    } else if (!src) {
      setImageSrc(fallbackSrc || defaultImage);
      setHasError(true);
    }
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Intentar usar fallbackSrc si está disponible, sino usar defaultImage
      const nextSrc = fallbackSrc || defaultImage;
      if (imageSrc !== nextSrc) {
        setImageSrc(nextSrc);
      }
    }
  };

  const handleLoad = () => {
    // Solo marcar como exitoso si tenemos una imagen válida del backend
    if (src && imageSrc === src) {
      setHasError(false);
    }
  };

  return (
    <img
      src={imageSrc || defaultImage}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      onLoad={handleLoad}
      {...props}
    />
  );
}
