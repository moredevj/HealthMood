import { useState } from 'react';

export function useForm(initialState = {}) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo cuando cambia
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = (validationRules) => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const value = formData[field];
      const rules = validationRules[field];
      
      if (rules.required && !value) {
        newErrors[field] = rules.required;
      } else if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.message;
      } else if (rules.custom) {
        const customError = rules.custom(value, formData);
        if (customError) {
          newErrors[field] = customError;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };
  
  return {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFormData,
    setErrors
  };
}
