import { useState } from 'react';
import { FaPaw, FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaLock, FaShieldAlt } from 'react-icons/fa';

export default function RegisterForm({ onSubmit, submitText = 'Registrarse' }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    commune: '',
    password: '',
    confirm: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!form.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!form.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!form.email.trim()) newErrors.email = 'El email es requerido';
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.password) newErrors.password = 'La contraseña es requerida';
    if (form.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (form.password !== form.confirm) newErrors.confirm = 'Las contraseñas no coinciden';

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const customerData = {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          street: form.street.trim(),
          city: form.city.trim(),
          commune: form.commune.trim(),
          password: form.password,
          rol: 'USER'
        };
        await onSubmit?.(customerData);
      } catch (error) {
        setErrors({ submit: 'Error al registrar. Por favor intente nuevamente.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const passwordStrength = form.password.length >= 8 ? 'strong' : form.password.length >= 6 ? 'medium' : 'weak';
  const passwordsMatch = form.confirm && form.password === form.confirm;
  const isFormValid = 
    form.firstName.trim() && 
    form.lastName.trim() && 
    form.email.trim() && 
    /\S+@\S+\.\S+/.test(form.email) && 
    form.password.length >= 6 && 
    passwordsMatch && 
    acceptTerms;

  return (
    <form onSubmit={handleSubmit} noValidate className="needs-validation">
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
             style={{ 
               width: '80px', 
               height: '80px', 
               background: 'linear-gradient(135deg, #8061c5 0%, #5706ad 100%)',
               animation: 'pawFloat 3s ease-in-out infinite'
             }}>
          <FaPaw className="text-white" style={{ fontSize: '2.5rem' }} />
        </div>
        <h2 className="fw-bold" style={{ color: '#5706ad' }}>Únete a nuestra familia peludita</h2>
        <p className="text-muted">Crea tu cuenta y descubre productos increíbles para tu mascota</p>
      </div>

      <div className="row g-3">
        {/* Nombre y Apellido */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : form.firstName ? 'is-valid' : ''}`}
              id="firstName"
              placeholder="Nombre"
              value={form.firstName}
              onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="firstName" className="text-muted">
              <FaUserCircle className="me-2" />
              Nombre
            </label>
            {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : form.lastName ? 'is-valid' : ''}`}
              id="lastName"
              placeholder="Apellido"
              value={form.lastName}
              onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="lastName" className="text-muted">
              <FaUserCircle className="me-2" />
              Apellido
            </label>
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
        </div>

        {/* Email y Teléfono */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : form.email ? 'is-valid' : ''}`}
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="email" className="text-muted">
              <FaEnvelope className="me-2" />
              Email
            </label>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Teléfono"
              value={form.phone}
              onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="phone" className="text-muted">
              <FaPhone className="me-2" />
              Teléfono
            </label>
          </div>
        </div>

        {/* Dirección */}
        <div className="col-12">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="street"
              placeholder="Dirección"
              value={form.street}
              onChange={(e) => setForm(f => ({ ...f, street: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="street" className="text-muted">
              <FaMapMarkerAlt className="me-2" />
              Dirección
            </label>
          </div>
        </div>

        {/* Ciudad y Comuna */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="Ciudad"
              value={form.city}
              onChange={(e) => setForm(f => ({ ...f, city: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="city" className="text-muted">
              <FaCity className="me-2" />
              Ciudad
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="commune"
              placeholder="Comuna"
              value={form.commune}
              onChange={(e) => setForm(f => ({ ...f, commune: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="commune" className="text-muted">
              <FaMapMarkerAlt className="me-2" />
              Comuna
            </label>
          </div>
        </div>

        {/* Contraseña */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : form.password ? 'is-valid' : ''}`}
              id="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="password" className="text-muted">
              <FaLock className="me-2" />
              Contraseña
            </label>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type={showConfirm ? 'text' : 'password'}
              className={`form-control ${errors.confirm ? 'is-invalid' : form.confirm ? 'is-valid' : ''}`}
              id="confirm"
              placeholder="Confirmar Contraseña"
              value={form.confirm}
              onChange={(e) => setForm(f => ({ ...f, confirm: e.target.value }))}
              disabled={isLoading}
            />
            <label htmlFor="confirm" className="text-muted">
              <FaShieldAlt className="me-2" />
              Confirmar Contraseña
            </label>
            {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
          </div>
        </div>

        {/* Términos y Condiciones */}
        <div className="col-12">
          <div className="form-check p-3 rounded-3" style={{ background: 'rgba(128,97,197,0.1)' }}>
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              disabled={isLoading}
            />
            <label className="form-check-label text-muted" htmlFor="acceptTerms">
              <small>
                Acepto los{' '}
                <a href="#" style={{ color: '#5706ad' }}>términos y condiciones</a>
                {' '}y la{' '}
                <a href="#" style={{ color: '#5706ad' }}>política de privacidad</a>
              </small>
            </label>
          </div>
        </div>
      </div>

      {/* Botón de Registro */}
      <div className="d-grid mt-4">
        <button 
          type="submit" 
          className="btn btn-lg py-3"
          disabled={!isFormValid || isLoading}
          style={{
            background: 'linear-gradient(135deg, #8061c5 0%, #5706ad 100%)',
            color: 'white',
            borderRadius: '50px'
          }}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creando tu cuenta...
            </>
          ) : (
            <>
              <FaPaw className="me-2" />
              {submitText}
            </>
          )}
        </button>
      </div>

      {/* Mensaje de Error */}
      {errors.submit && (
        <div className="alert alert-danger mt-3" role="alert">
          {errors.submit}
        </div>
      )}
    </form>
  );
}
