import { useState } from 'react';
import SafeImage from './SafeImage';

const ImageGallery = ({ images = [], productName = 'Producto' }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Si no hay imágenes, mostrar imagen por defecto
  if (!images || images.length === 0) {
    return (
      <div className="image-gallery">
        <SafeImage 
          src=""
          alt={productName}
          className="img-fluid rounded"
          style={{ objectFit: 'cover', height: '400px', width: '100%' }}
        />
      </div>
    );
  }

  // Si solo hay una imagen, mostrarla directamente
  if (images.length === 1) {
    return (
      <div className="image-gallery">
        <SafeImage 
          src={images[0].url}
          alt={images[0].alt || productName}
          className="img-fluid rounded"
          style={{ objectFit: 'cover', height: '400px', width: '100%' }}
        />
      </div>
    );
  }

  // Si hay múltiples imágenes, mostrar galería
  return (
    <div className="image-gallery">
      {/* Imagen principal */}
      <div className="main-image mb-3">
        <SafeImage 
          src={images[selectedImageIndex]?.url}
          alt={images[selectedImageIndex]?.alt || productName}
          className="img-fluid rounded shadow-sm"
          style={{ 
            objectFit: 'cover', 
            height: '400px', 
            width: '100%',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
          onClick={() => {
            // Opcional: abrir modal con imagen ampliada
            console.log('Imagen clickeada:', images[selectedImageIndex]);
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
        
        {/* Indicador de imagen actual */}
        <div className="position-absolute top-0 end-0 mt-2 me-2">
          <span className="badge bg-dark bg-opacity-75">
            {selectedImageIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Miniaturas */}
      <div className="thumbnails d-flex gap-2 overflow-auto pb-2" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#ccc transparent'
      }}>
        {images.map((image, index) => (
          <div 
            key={image.id || index}
            className="thumbnail-container"
            style={{ minWidth: '80px' }}
          >
            <SafeImage 
              src={image.url}
              alt={image.alt || `${productName} - Imagen ${index + 1}`}
              className={`img-fluid rounded border ${
                index === selectedImageIndex 
                  ? 'border-primary border-2' 
                  : 'border-light'
              }`}
              style={{ 
                objectFit: 'cover', 
                height: '80px', 
                width: '80px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: index === selectedImageIndex ? 1 : 0.7
              }}
              onClick={() => setSelectedImageIndex(index)}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = index === selectedImageIndex ? '1' : '0.7';
                e.target.style.transform = 'scale(1)';
              }}
            />
          </div>
        ))}
      </div>

      {/* Navegación con flechas (opcional) */}
      {images.length > 1 && (
        <div className="position-absolute top-50 start-0 end-0 d-flex justify-content-between px-3" 
             style={{ transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <button 
            className="btn btn-dark btn-sm rounded-circle"
            style={{ 
              pointerEvents: 'auto',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.75
            }}
            onClick={() => setSelectedImageIndex(prev => 
              prev === 0 ? images.length - 1 : prev - 1
            )}
            disabled={images.length <= 1}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.75';
            }}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="btn btn-dark btn-sm rounded-circle"
            style={{ 
              pointerEvents: 'auto',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.75
            }}
            onClick={() => setSelectedImageIndex(prev => 
              prev === images.length - 1 ? 0 : prev + 1
            )}
            disabled={images.length <= 1}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.75';
            }}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
