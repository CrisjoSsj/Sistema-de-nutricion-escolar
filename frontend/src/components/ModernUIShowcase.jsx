import React, { useState, useEffect } from 'react';

const ModernUIShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
    notifications: false,
    theme: 'light'
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-wave particles-background">
      <div className="container mx-auto px-6 py-12">
        
        {/* Header con animación */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h1 className="text-6xl font-bold text-shine mb-6">
            🎨 Showcase de Mejoras UI/UX
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experimenta con los nuevos componentes y efectos visuales implementados para mejorar la experiencia del usuario
          </p>
        </div>

        {/* Grid de componentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          
          {/* Card con Glass Effect */}
          <div className={`glass-card p-8 hover-lift hover-glow ${isVisible ? 'animate-fade-in-left animate-delay-100' : 'opacity-0'}`}>
            <div className="text-center">
              <div className="text-4xl mb-4 icon-bounce cursor-pointer">✨</div>
              <h3 className="text-xl font-bold gradient-text mb-3">Glass Morphism</h3>
              <p className="text-gray-600">
                Efectos de cristal con blur y transparencias para un diseño moderno
              </p>
            </div>
          </div>

          {/* Card con animaciones */}
          <div className={`card p-8 hover-scale-105 ${isVisible ? 'animate-fade-in-up animate-delay-200' : 'opacity-0'}`}>
            <div className="text-center">
              <div className="text-4xl mb-4 pulse-glow cursor-pointer">🚀</div>
              <h3 className="text-xl font-bold text-primary-600 mb-3">Animaciones Suaves</h3>
              <p className="text-gray-600">
                Transiciones fluidas y animaciones que mejoran la interactividad
              </p>
            </div>
          </div>

          {/* Card con efectos hover */}
          <div className={`card p-8 hover-shadow-2xl card-tilt ${isVisible ? 'animate-fade-in-right animate-delay-300' : 'opacity-0'}`}>
            <div className="text-center">
              <div className="text-4xl mb-4 float-animation cursor-pointer">🎯</div>
              <h3 className="text-xl font-bold text-secondary-600 mb-3">Efectos Hover</h3>
              <p className="text-gray-600">
                Interacciones visuales que responden al movimiento del usuario
              </p>
            </div>
          </div>
        </div>

        {/* Formulario moderno */}
        <div className={`max-w-2xl mx-auto ${isVisible ? 'animate-slide-in-scale animate-delay-400' : 'opacity-0'}`}>
          <div className="glass-card p-8 border-animated">
            <h2 className="text-3xl font-bold text-center gradient-text mb-8">
              Formulario Moderno
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Input con floating label */}
              <div className="floating-label-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="floating-input focus-ring"
                  placeholder=" "
                />
                <label className="floating-label">Nombre completo</label>
              </div>

              {/* Input con validación */}
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${formData.email ? (formData.email.includes('@') ? 'valid' : 'invalid') : ''}`}
                  placeholder="correo@ejemplo.com"
                />
                {formData.email && (
                  <div className={`validation-icon ${formData.email.includes('@') ? 'valid' : 'invalid'}`}>
                    {formData.email.includes('@') ? '✓' : '✗'}
                  </div>
                )}
                {formData.email && !formData.email.includes('@') && (
                  <div className="error-message">
                    ⚠️ Por favor ingresa un email válido
                  </div>
                )}
              </div>

              {/* Select moderno */}
              <div className="modern-select">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="focus-ring"
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="general">Consulta General</option>
                  <option value="support">Soporte Técnico</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              {/* Textarea moderno */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="modern-textarea focus-ring"
                placeholder="Escribe tu mensaje aquí..."
              />

              {/* Checkbox moderno */}
              <label className="modern-checkbox">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                <span className="ml-3">Recibir notificaciones por email</span>
              </label>

              {/* Switch toggle */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tema de la aplicación</span>
                <label className="modern-switch">
                  <input
                    type="checkbox"
                    name="theme"
                    checked={formData.theme === 'dark'}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      theme: e.target.checked ? 'dark' : 'light'
                    }))}
                  />
                  <span className="switch-slider"></span>
                </label>
              </div>

              {/* Botones modernos */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  className="btn-modern btn-outline-modern flex-1"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-modern btn-primary-modern flex-1"
                >
                  <span>Enviar</span>
                  <span className="icon-bounce">📤</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sección de elementos adicionales */}
        <div className={`mt-16 ${isVisible ? 'animate-fade-in-up animate-delay-600' : 'opacity-0'}`}>
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">
            Elementos Interactivos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Progress bar animado */}
            <div className="card p-6 text-center">
              <div className="text-2xl mb-4">📊</div>
              <h3 className="font-bold mb-4">Progress Bar</h3>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">75% Completado</p>
            </div>

            {/* Badge animado */}
            <div className="card p-6 text-center">
              <div className="text-2xl mb-4">🏷️</div>
              <h3 className="font-bold mb-4">Badge Animado</h3>
              <span className="badge-animated bg-primary-500 text-white px-4 py-2 rounded-full cursor-pointer">
                Hover me!
              </span>
            </div>

            {/* Loading states */}
            <div className="card p-6 text-center">
              <div className="text-2xl mb-4">⏳</div>
              <h3 className="font-bold mb-4">Loading States</h3>
              <div className="flex justify-center items-center space-x-2">
                <div className="loading-wave"></div>
                <div className="loading-wave"></div>
                <div className="loading-wave"></div>
                <div className="loading-wave"></div>
                <div className="loading-wave"></div>
              </div>
            </div>

            {/* Hover effects */}
            <div className="card p-6 text-center hover-rotate-3">
              <div className="text-2xl mb-4 icon-spin">⚡</div>
              <h3 className="font-bold mb-4">Hover Effects</h3>
              <p className="text-sm text-gray-600">
                Pasa el cursor sobre esta tarjeta
              </p>
            </div>
          </div>
        </div>

        {/* Footer con efectos */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in-up animate-delay-800' : 'opacity-0'}`}>
          <div className="glass-effect p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-shine mb-4">
              ✨ Experiencia de Usuario Mejorada ✨
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Estos son solo algunos ejemplos de las mejoras implementadas. 
              Cada componente ha sido diseñado pensando en la usabilidad, 
              accesibilidad y experiencia visual del usuario.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="text-4xl cursor-pointer hover-scale-110">🎨</div>
              <div className="text-4xl cursor-pointer hover-scale-110">🚀</div>
              <div className="text-4xl cursor-pointer hover-scale-110">✨</div>
              <div className="text-4xl cursor-pointer hover-scale-110">🎯</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernUIShowcase;