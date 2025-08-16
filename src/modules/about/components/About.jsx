import React from 'react';
import '../styles/about.css';

export default function About() {
  return (
    <div className="about-container py-5">
<div className="container mb-5 about-header">
        <h1 className="display-5 fw-bold mb-4">Quienes Somos</h1>
        <p className="lead col-lg-8">
          En HealthMood, somos más que una tienda de productos para mascotas. Somos una comunidad dedicada al
          bienestar animal integral, comprometidos con la salud, felicidad y calidad de vida de tu mejor amigo.
        </p>
      </div>

      <div className="container position-relative my-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="row g-4">
              {/* Misión Card */}
              <div className="col-12">
              <div className="card vision-card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h2 className="h4 fw-bold mb-3">
                      <i className="fas fa-heart text-primary me-2"></i>
                      Nuestra Misión
                    </h2>
                    <p className="card-text">
                      En HealthMood, buscamos enseñar bienestar animal, ofreciendo
                      productos y servicios que promuevan una vida sana, segura y
                      feliz para los animales de compañía.
                      Queremos hacer del mundo un lugar mejor para las mascotas, 
                      creando conciencia y entregando soluciones reales para su 
                      bienestar físico y emocional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visión Card */}
              <div className="col-12">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <h2 className="h4 fw-bold mb-3">
                      <i className="fas fa-eye text-primary me-2"></i>
                      Nuestra Visión
                    </h2>
                    <p className="card-text">
                      Ser la marca de referencia en bienestar animal a nivel nacional,
                      integrando educación, productos de calidad y servicios
                      personalizados que ayuden a las familias a cuidar mejor de sus animales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 d-none d-lg-block">
            <img 
              src="/src/assets/golden-retriever-dog-1370773977VyS.jpg"
              alt="Perro amigable"
              className="img-fluid rounded-4 shadow-sm"
              style={{
                maxHeight: '100%',
                objectFit: 'cover',
                width: '100%'
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center fw-bold mb-4">Nuestros Valores</h2>
        <div className="row g-4">
          {/* Valor 1 */}
          <div className="col-md-4">
          <div className="card value-card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="rounded-circle bg-light p-3 mx-auto mb-3" style={{width: 'fit-content'}}>
                  <i className="fas fa-heart fa-2x text-primary"></i>
                </div>
                <h3 className="h5 fw-bold mb-3">Compromiso</h3>
                <p className="text-muted mb-0">
                  Dedicación total al bienestar de las mascotas y sus familias.
                </p>
              </div>
            </div>
          </div>

          {/* Valor 2 */}
          <div className="col-md-4">
<div className="card value-card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="rounded-circle bg-light p-3 mx-auto mb-3" style={{width: 'fit-content'}}>
                  <i className="fas fa-shield-alt fa-2x text-primary"></i>
                </div>
                <h3 className="h5 fw-bold mb-3">Calidad</h3>
                <p className="text-muted mb-0">
                  Productos premium y servicio de excelencia.
                </p>
              </div>
            </div>
          </div>

          {/* Valor 3 */}
          <div className="col-md-4">
<div className="card value-card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="rounded-circle bg-light p-3 mx-auto mb-3" style={{width: 'fit-content'}}>
                  <i className="fas fa-users fa-2x text-primary"></i>
                </div>
                <h3 className="h5 fw-bold mb-3">Comunidad</h3>
                <p className="text-muted mb-0">
                  Construyendo una red de amantes de las mascotas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
