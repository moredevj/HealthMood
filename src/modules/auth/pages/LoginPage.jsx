// src/modules/auth/pages/Login.jsx
import { useState } from 'react';
import AlertBox from '../../layouts/AlertBox';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../hook/useAuth';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, msg: '', variant: 'success' });

  const handleLogin = ({ username, password }) => {
    const { ok, message } = login(username, password);
    if (ok) {
      setAlert({ show: true, msg: '¡Ingreso con éxito! 🎉', variant: 'success' });
      setTimeout(() => navigate('/'), 1500);
    } else {
      setAlert({ show: true, msg: message || 'Credenciales incorrectas. Inténtalo nuevamente.', variant: 'danger' });
    }
  };

  return (
    <div className="container-fluid min-vh-100">
      <div className="row min-vh-100">
        {/* Left Side - Form */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center py-5">
          <div className="w-100" style={{ maxWidth: '450px' }}>
            
         {/* Header */}
<div className="text-center mb-5">
  <div
    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
    style={{
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #8061c5 0%, #5706ad 100%)'
    }}
  >
    <i className="fas fa-sign-in-alt fs-2" style={{ color: '#fff' }}></i>
  </div>
  <h1 className="display-6 fw-bold text-dark mb-2">¡Hola manadista!</h1>
  <p className="text-muted mb-0">Ingresa para ver la información de tu manada</p>
</div>

            {/* Alert */}
            <AlertBox
              show={alert.show}
              variant={alert.variant}
              message={alert.msg}
              onClose={() => setAlert(a => ({ ...a, show: false }))}
            />

            {/* Login Form Card */}
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <LoginForm onSubmit={handleLogin} submitText="Iniciar Sesión" />
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center mt-4">
              <p className="text-muted mb-3">¿No tienes una cuenta?</p>
              <Link 
                to="/register" 
                className="btn btn-outline-primary btn-lg rounded-pill px-4"
              >
                <i className="fas fa-user-plus me-2"></i>
                Crear cuenta
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="alert alert-info border-0 rounded-3 mt-4" role="alert">
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-info-circle text-info me-2"></i>
                <strong>Credenciales de prueba</strong>
              </div>
              <div className="row g-2">
                <div className="col-sm-6">
                  <small>
                    <strong>Usuario:</strong>{' '}
                    <code className="bg-light text-dark px-2 py-1 rounded">demo</code>
                  </small>
                </div>
                <div className="col-sm-6">
                  <small>
                    <strong>Contraseña:</strong>{' '}
                    <code className="bg-light text-dark px-2 py-1 rounded">1234</code>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Hero Image/Content */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-5" style={{ 
          background: 'linear-gradient(135deg, #5706ad  0%, #70d187ff  100%)' 
        }}>
          <div className="text-center text-white">
            <div className="mb-4">
              <i className="fas fa-paw" style={{ fontSize: '120px', opacity: 0.9 }}></i>
            </div>
            
            <h2 className="display-4 fw-bold mb-4">Health Mood</h2>
            <p className="lead mb-4 opacity-75">
              Cuidar a tu familia multiespecie ahora es más fácil que nunca
            </p>
            
            {/* Features */}
            <div className="row g-4 mt-5">
              <div className="col-md-6">
                <div className="text-center">
                  <div className="bg-white bg-opacity-25 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-shipping-fast text-white fs-4"></i>
                  </div>
                  <h5 className="fw-bold">Envío rápido</h5>
                  <small className="opacity-75">Entrega en menos de 24 horas en la región metropolitana</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center">
                  <div className="bg-white bg-opacity-25 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-shield-alt text-white fs-4"></i>
                  </div>
                  <h5 className="fw-bold">Compra Segura</h5>
                  <small className="opacity-75">Protección total de datos</small>
                </div>
              </div>
              <div className="col-md-12">
                <div className="text-center">
                  <div className="bg-white bg-opacity-25 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                    <i className="fas fa-paw text-white fs-4"></i>
                  </div>
                  <h5 className="fw-bold">Asesoria personalizada</h5>
                  <small className="opacity-75">Para que elijas el producto ideal para tu manada</small>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="row g-4 mt-5 pt-4 border-top border-white border-opacity-25">
              <div className="col-4">
                <h3 className="fw-bold">10K+</h3>
                <small className="opacity-75">Productos</small>
              </div>
              <div className="col-4">
                <h3 className="fw-bold">50K+</h3>
                <small className="opacity-75">Clientes</small>
              </div>
              <div className="col-4">
                <h3 className="fw-bold">4.9★</h3>
                <small className="opacity-75">Rating</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}