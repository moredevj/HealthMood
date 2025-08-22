import { useState } from 'react';
import { FaPaw, FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaLock, FaShieldAlt } from 'react-icons/fa';

export default function RegisterForm({ onSubmit, submitText = 'Registrarse' }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!form.firstName.trim()) newErrors.firstName = 'El nombre es requerido';
    if (!form.lastName.trim()) newErrors.lastName = 'El apellido es requerido';
    if (!form.email.trim()) newErrors.email = 'El email es requerido';
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido';
    if (!form.password) newErrors.password = 'La contraseña es requerida';
    if (form.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (!form.confirm) newErrors.confirm = 'Debes confirmar la contraseña';
    if (form.password && form.confirm && form.password !== form.confirm) {
      newErrors.confirm = 'Las contraseñas no coinciden';
    }
    if (!acceptTerms) newErrors.terms = 'Debes aceptar los términos y condiciones';

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const customerData = {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          password: form.password
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

  // Función para validación en tiempo real pero solo después de que el campo fue tocado
  const validateField = (fieldName, value) => {
    if (!touched[fieldName]) return '';
    
    switch (fieldName) {
      case 'firstName':
        return !value.trim() ? 'El nombre es requerido' : '';
      case 'lastName':
        return !value.trim() ? 'El apellido es requerido' : '';
      case 'email':
        if (!value.trim()) return 'El email es requerido';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email inválido';
        return '';
      case 'password':
        if (!value) return 'La contraseña es requerida';
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return '';
      case 'confirm':
        if (!value) return 'Debes confirmar la contraseña';
        if (form.password && value !== form.password) return 'Las contraseñas no coinciden';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, form[fieldName]);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleChange = (fieldName, value) => {
    setForm(prev => ({ ...prev, [fieldName]: value }));
    
    // Solo validar si el campo ya fue tocado
    if (touched[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
    
    // Validación especial para confirmar contraseña cuando cambie la contraseña
    if (fieldName === 'password' && touched.confirm && form.confirm) {
      const confirmError = value !== form.confirm ? 'Las contraseñas no coinciden' : '';
      setErrors(prev => ({ ...prev, confirm: confirmError }));
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
    form.confirm &&
    passwordsMatch && 
    acceptTerms &&
    Object.keys(errors).filter(key => errors[key] && key !== 'submit').length === 0;

  return (
    <form onSubmit={handleSubmit} noValidate className="needs-validation">

      <div className="row g-3">
        {/* Nombre y Apellido */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : form.firstName && touched.firstName ? 'is-valid' : ''}`}
              id="firstName"
              placeholder="Nombre"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
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
              className={`form-control ${errors.lastName ? 'is-invalid' : form.lastName && touched.lastName ? 'is-valid' : ''}`}
              id="lastName"
              placeholder="Apellido"
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              disabled={isLoading}
            />
            <label htmlFor="lastName" className="text-muted">
              <FaUserCircle className="me-2" />
              Apellido
            </label>
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
        </div>

        {/* Email */}
        <div className="col-12">
          <div className="form-floating">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : form.email && touched.email ? 'is-valid' : ''}`}
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              disabled={isLoading}
            />
            <label htmlFor="email" className="text-muted">
              <FaEnvelope className="me-2" />
              Email
            </label>
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
        </div>

        {/* Contraseña */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${errors.password ? 'is-invalid' : form.password && touched.password ? 'is-valid' : ''}`}
              id="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
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
              className={`form-control ${errors.confirm ? 'is-invalid' : form.confirm && touched.confirm && form.password === form.confirm ? 'is-valid' : ''}`}
              id="confirm"
              placeholder="Confirmar Contraseña"
              value={form.confirm}
              onChange={(e) => handleChange('confirm', e.target.value)}
              onBlur={() => handleBlur('confirm')}
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
              className={`form-check-input ${errors.terms ? 'is-invalid' : ''}`}
              type="checkbox" 
              id="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (errors.terms) {
                  setErrors(prev => ({ ...prev, terms: '' }));
                }
              }}
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
            {errors.terms && <div className="invalid-feedback d-block">{errors.terms}</div>}
          </div>
        </div>
      </div>

      {/* Botón de Registro */}
      <div className="d-grid mt-4">
        <button 
          type="submit" 
          className="btn btn-lg py-3 btn-morado-outline"
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
