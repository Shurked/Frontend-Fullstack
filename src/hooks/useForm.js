import { useState } from 'react';

// Hook personalizado para manejo de formularios
export function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field];
      const value = values[field];
      
      if (rule.required && !value) {
        newErrors[field] = rule.message || `${field} es requerido`;
      }
      
      if (rule.minLength && value && value.length < rule.minLength) {
        newErrors[field] = rule.message || `${field} debe tener al menos ${rule.minLength} caracteres`;
      }
      
      if (rule.pattern && value && !rule.pattern.test(value)) {
        newErrors[field] = rule.message || `${field} no tiene el formato correcto`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true);
    
    if (validate()) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Error en el formulario:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
    setValues,
    setErrors
  };
}