// src/modules/auth/pages/Register.jsx
import { useState } from 'react';
import AlertBox from '../../layouts/AlertBox';
import RegisterForm from '../components/RegisterForm';
import { useAuth } from '../hook/useAuth';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, msg: '', variant: 'success' });

  const handleSubmit = ({ username, password, confirm }) => {
    if (password.length < 4) {
      setAlert({ show: true, msg: 'La contraseña debe tener al menos 4 caracteres.', variant: 'danger' });
      return;
    }
    if (password !== confirm) {
      setAlert({ show: true, msg: 'Las contraseñas no coinciden.', variant: 'danger' });
      return;
    }

    const { ok, message } = register(username.trim(), password);
    if (ok) {
      setAlert({ show: true, msg: '¡Cuenta creada exitosamente! 🎉', variant: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } else {
      setAlert({ show: true, msg: message || 'No se pudo crear la cuenta', variant: 'danger' });
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">
        {/* Left Side - Hero Content */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5" style={{ 
          background: 'linear-gradient(135deg, #70d187ff 0%, #5706ad  100%)' 
        }}>
          <div className="text-center text-white">
            <div className="mb-4">
              <i className="fas fa-users" style={{ fontSize: '120px', opacity: 0.9 }}></i>
            </div>
            
            <h2 className="display-4 fw-bold mb-4">¡Bienvenido a Health Mood!</h2>
            <p className="lead mb-4 opacity-75">
              ¡Comparte, aprende y crece junto a otras familias que aman a sus animales como tú!
            </p>

            {/* Benefits */}
            <div className="row g-4 mt-5">
              <div className="col-md-12">
                <div className="text-center">
                  <div className="bg-white bg-opacity-25 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-hands-helping text-white fs-4"></i>
                  </div>
                  <h5 className="fw-bold mb-2">Asesoría a tu medida</h5>
                  <p className="small opacity-75 mb-0">Consejos y recomendaciones específicas para tu familia multiespecie</p>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="text-center">
                  <div className="bg-white bg-opacity-25 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-shipping-fast text-white fs-4"></i>
                  </div>
                  <h5 className="fw-bold mb-2">Envío Seguro</h5>
                  <p className="small opacity-75 mb-0">Entrega en menos de 24 horas en la región metropolitana</p>
                </div>
              </div>  
              <div className="col-md-6">
                <div className="text-center">
                  <div className="bg-white bg-opacity-25 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-heart text-white fs-4"></i>
                  </div>
                  <h5 className="fw-bold mb-2">Contenido excluvio</h5>
                  <p className="small opacity-75 mb-0">Accede a guías, tips y consejos de bienestar animal creados por veterinarios</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-5 pt-4 border-top border-white border-opacity-25">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <div className="me-3">
                  <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="fas fa-user text-success fs-5"></i>
                  </div>
                </div>
                <div className="text-start">
                  <h6 className="mb-1 fw-bold">María González</h6>
                  <div className="d-flex">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-warning me-1"></i>
                    ))}
                  </div>
                </div>
              </div>
              <p className="small opacity-75 fst-italic mb-0">
                "Excelente experiencia desde el principio. Es como sentirse en familia."
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: '480px' }}>
            
            {/* Mobile Logo/Header */}
            <div className="text-center mb-5 d-lg-none">
              <div className="mb-3">
                <i className="fas fa-store text-success" style={{ fontSize: '48px' }}></i>
              </div>
              <h3 className="text-success fw-bold mb-2">¡Únete a la manada!</h3>
              <p className="text-muted">Tu familia, nuestra manada</p>
            </div>

            {/* Desktop Header */}
            <div className="text-center mb-5 d-none d-lg-block">
              <div className="mb-4 d-flex align-items-center justify-content-center">
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: '#5706ad',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-paw" style={{ fontSize: '48px', color: 'white' }}></i>
                </div>
              </div>
              <h2 className="text-dark fw-bold mb-2">¡Únete a la manada!</h2>
              <p className="text-muted fs-5">Tu familia, nuestra manada</p>
            </div>

            {/* Toast Notification */}
            <AlertBox 
              show={alert.show}
              message={alert.msg} 
              variant={alert.variant} 
              onClose={() => setAlert({ show: false, msg: '', variant: 'success' })}
              position="bottom-end"
              autoClose={true}
              duration={alert.variant === 'success' ? 3000 : 5000}
            />

            {/* Registration Form */}
            <div className="mb-4">
              <RegisterForm onSubmit={handleSubmit} />
            </div>

            {/* Divider */}
            <div className="text-center mb-4">
              <div className="d-flex align-items-center">
                <hr className="flex-grow-1" />
                <span className="px-3 text-muted small">O REGÍSTRATE CON</span>
                <hr className="flex-grow-1" />
              </div>
            </div>

            {/* Social Registration Buttons */}
            <div className="row g-2 mb-4">
              <div className="col-6">
                <button className="btn btn-outline-danger btn-lg w-100 rounded-3 d-flex align-items-center justify-content-center">
                  <i className="fab fa-google me-2"></i>
                  Google
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-primary btn-lg w-100 rounded-3 d-flex align-items-center justify-content-center">
                  <i className="fab fa-facebook-f me-2"></i>
                  Facebook
                </button>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-muted mb-0">
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="text-success text-decoration-none fw-medium">
                  Iniciar sesión
                </Link>
              </p>
            </div>

            {/* Additional Links */}
            <div className="text-center mt-4 pt-3 border-top">
              <div className="row g-2">
                <div className="col-4">
                  <a href="#" className="text-muted text-decoration-none small">
                    <i className="fas fa-shield-alt me-1"></i>
                    Privacidad
                  </a>
                </div>
                <div className="col-4">
                  <a href="#" className="text-muted text-decoration-none small">
                    <i className="fas fa-file-contract me-1"></i>
                    Términos
                  </a>
                </div>
                <div className="col-4">
                  <a href="#" className="text-muted text-decoration-none small">
                    <i className="fas fa-question-circle me-1"></i>
                    Ayuda
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 pt-3">
              <div className="row g-2 text-center">
                <div className="col-3">
                  <i className="fas fa-lock text-success fs-4 mb-1"></i>
                  <p className="small text-muted mb-0">Seguro</p>
                </div>
                <div className="col-3">
                  <i className="fas fa-users text-success fs-4 mb-1"></i>
                  <p className="small text-muted mb-0">+10K usuarios</p>
                </div>
                <div className="col-3">
                  <i className="fas fa-award text-success fs-4 mb-1"></i>
                  <p className="small text-muted mb-0">Certificado</p>
                </div>
                <div className="col-3">
                  <i className="fas fa-star text-success fs-4 mb-1"></i>
                  <p className="small text-muted mb-0">4.9/5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}