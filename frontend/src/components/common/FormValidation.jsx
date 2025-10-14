import React, { useState, useEffect } from 'react';

// Hook para validación de formularios
export function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validar un campo específico
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      if (rule.required && (!value || value.toString().trim() === '')) {
        return rule.message || `${name} es requerido`;
      }
      
      if (rule.minLength && value && value.length < rule.minLength) {
        return rule.message || `${name} debe tener al menos ${rule.minLength} caracteres`;
      }
      
      if (rule.maxLength && value && value.length > rule.maxLength) {
        return rule.message || `${name} no puede exceder ${rule.maxLength} caracteres`;
      }
      
      if (rule.pattern && value && !rule.pattern.test(value)) {
        return rule.message || `${name} tiene un formato inválido`;
      }
      
      if (rule.min && value && parseFloat(value) < rule.min) {
        return rule.message || `${name} debe ser mayor a ${rule.min}`;
      }
      
      if (rule.max && value && parseFloat(value) > rule.max) {
        return rule.message || `${name} debe ser menor a ${rule.max}`;
      }
      
      if (rule.custom && !rule.custom(value, values)) {
        return rule.message || `${name} es inválido`;
      }
    }
    
    return '';
  };

  // Validar todos los campos
  const validateAll = () => {
    const newErrors = {};
    let formIsValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  // Manejar cambio de valores
  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Manejar cuando un campo pierde el foco
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Efecto para revalidar cuando cambian los valores
  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error !== '');
    const allRequiredFieldsFilled = Object.keys(validationRules).every(name => {
      const rules = validationRules[name];
      const isRequired = rules.some(rule => rule.required);
      if (!isRequired) return true;
      return values[name] && values[name].toString().trim() !== '';
    });

    setIsValid(!hasErrors && allRequiredFieldsFilled);
  }, [values, errors, validationRules]);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
    setErrors
  };
}

// Componente de campo de formulario con validación
export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder,
  helpText,
  options = [], // Para selects
  className = '',
  disabled = false
}) {
  const fieldId = `field-${name}`;
  const hasError = touched && error;

  const renderInput = () => {
    const baseProps = {
      id: fieldId,
      name,
      value: value || '',
      onChange: (e) => onChange(name, e.target.value),
      onBlur: () => onBlur(name),
      className: `form-input ${hasError ? 'error' : ''} ${className}`,
      placeholder,
      disabled
    };

    switch (type) {
      case 'textarea':
        return <textarea {...baseProps} rows={4} />;
      
      case 'select':
        return (
          <select {...baseProps}>
            <option value="">Seleccionar...</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(name, e.target.checked)}
              onBlur={() => onBlur(name)}
              disabled={disabled}
              className="checkbox-input"
            />
            <span className="checkbox-label">{label}</span>
          </label>
        );
      
      default:
        return <input {...baseProps} type={type} />;
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="form-field checkbox-field">
        {renderInput()}
        {hasError && <span className="field-error">{error}</span>}
        {helpText && <span className="field-help">{helpText}</span>}
      </div>
    );
  }

  return (
    <div className="form-field">
      <label htmlFor={fieldId} className="field-label">
        {label}
        {required && <span className="required-indicator">*</span>}
      </label>
      {renderInput()}
      {hasError && <span className="field-error">{error}</span>}
      {helpText && !hasError && <span className="field-help">{helpText}</span>}
    </div>
  );
}

// Componente de formulario completo
export function ValidatedForm({
  children,
  onSubmit,
  isValid,
  isLoading = false,
  submitText = 'Guardar',
  className = ''
}) {
  return (
    <form
      className={`validated-form ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        if (isValid && !isLoading) {
          onSubmit();
        }
      }}
    >
      {children}
      <div className="form-actions">
        <button
          type="submit"
          className={`btn btn-primary ${!isValid ? 'disabled' : ''}`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-small"></span>
              Guardando...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
}