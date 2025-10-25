import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function ParentFeedback() {
  const [selectedChild, setSelectedChild] = useState('1');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Datos de ejemplo
  const children = [
    { id: '1', name: 'Ana María', grade: '3° Básico' },
    { id: '2', name: 'Carlos José', grade: '5° Básico' }
  ];

  const recentMenus = [
    { id: '1', name: 'Pollo a la plancha con quinoa', date: '2025-10-09', meal: 'Almuerzo' },
    { id: '2', name: 'Avena con frutas y nueces', date: '2025-10-09', meal: 'Desayuno' },
    { id: '3', name: 'Pescado al vapor con vegetales', date: '2025-10-08', meal: 'Almuerzo' },
    { id: '4', name: 'Tostadas integrales con palta', date: '2025-10-08', meal: 'Desayuno' },
    { id: '5', name: 'Lentejas guisadas con arroz', date: '2025-10-07', meal: 'Almuerzo' }
  ];

  const feedbackCategories = [
    { value: 'sabor', label: 'Sabor', icon: '👅', description: 'Comentarios sobre el sabor de la comida' },
    { value: 'cantidad', label: 'Cantidad/Porción', icon: '🍽️', description: 'Tamaño de las porciones servidas' },
    { value: 'presentacion', label: 'Presentación', icon: '🎨', description: 'Apariencia y presentación de los platos' },
    { value: 'variedad', label: 'Variedad', icon: '🌈', description: 'Diversidad en el menú' },
    { value: 'temperatura', label: 'Temperatura', icon: '🌡️', description: 'Temperatura de la comida al servir' },
    { value: 'servicio', label: 'Servicio', icon: '👨‍🍳', description: 'Atención del personal de comedor' },
    { value: 'general', label: 'Comentario General', icon: '💬', description: 'Comentario general sobre el servicio' }
  ];

  const myFeedbackHistory = [
    {
      id: 1,
      date: '2025-10-08',
      child: 'Ana María',
      menu: 'Pescado al vapor con vegetales',
      category: 'sabor',
      rating: 4,
      comment: 'A Ana María le gustó el pescado, pero me gustaría que hubiera más variedad de verduras.',
      response: {
        date: '2025-10-09',
        author: 'Nutricionista María Paz',
        text: 'Gracias por el comentario. Estamos trabajando en incluir más variedad de vegetales en nuestros menús de pescado.'
      }
    },
    {
      id: 2,
      date: '2025-10-06',
      child: 'Carlos José',
      menu: 'Pasta con salsa de tomate',
      category: 'cantidad',
      rating: 5,
      comment: 'Perfecta porción para Carlos, llegó satisfecho a casa.',
      response: null
    },
    {
      id: 3,
      date: '2025-10-04',
      child: 'Ana María',
      menu: 'Sopa de lentejas',
      category: 'general',
      rating: 5,
      comment: 'Excelente sopa! Ana María me pidió que la hagan más seguido.',
      response: {
        date: '2025-10-05',
        author: 'Nutricionista María Paz',
        text: '¡Qué alegría saber que Ana María disfruta las lentejas! Las incluiremos más frecuentemente.'
      }
    }
  ];

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubmitModal(true);
  };

  const getStarRating = (currentRating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < currentRating ? 'filled' : 'empty'}`}
        onClick={() => handleRatingClick(index + 1)}
        style={{ cursor: 'pointer', fontSize: '24px' }}
      >
        {index < currentRating ? '⭐' : '☆'}
      </span>
    ));
  };

  const getViewStarRating = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getCategoryIcon = (category) => {
    const cat = feedbackCategories.find(c => c.value === category);
    return cat ? cat.icon : '💬';
  };

  const getCategoryName = (category) => {
    const cat = feedbackCategories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">Enviar Comentarios</h1>
        <p className="page-description">Comparte tu opinión sobre los menús y servicios</p>
      </div>

      {/* Formulario de feedback */}
      <div className="feedback-form-section">
        <h2>Nuevo Comentario</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Selección de hijo */}
          <div className="form-group">
            <label>Sobre qué hijo quieres comentar:</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              required
            >
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.name} ({child.grade})
                </option>
              ))}
            </select>
          </div>

          {/* Selección de menú */}
          <div className="form-group">
            <label>Menú específico (opcional):</label>
            <select
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
            >
              <option value="">Comentario general</option>
              {recentMenus.map(menu => (
                <option key={menu.id} value={menu.id}>
                  {menu.name} - {menu.meal} ({menu.date})
                </option>
              ))}
            </select>
            <small>Selecciona un menú específico si tu comentario es sobre una comida en particular</small>
          </div>

          {/* Categoría de feedback */}
          <div className="form-group">
            <label>Categoría del comentario:</label>
            <div className="category-selector">
              {feedbackCategories.map(category => (
                <div
                  key={category.value}
                  className={`category-option ${feedbackType === category.value ? 'selected' : ''}`}
                  onClick={() => setFeedbackType(category.value)}
                >
                  <div className="category-icon">{category.icon}</div>
                  <div className="category-info">
                    <h4>{category.label}</h4>
                    <p>{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calificación */}
          <div className="form-group">
            <label>Calificación general:</label>
            <div className="rating-selector">
              <div className="stars">
                {getStarRating(rating)}
              </div>
              <div className="rating-labels">
                <span className="rating-text">
                  {rating === 0 && 'Sin calificar'}
                  {rating === 1 && 'Muy malo'}
                  {rating === 2 && 'Malo'}
                  {rating === 3 && 'Regular'}
                  {rating === 4 && 'Bueno'}
                  {rating === 5 && 'Excelente'}
                </span>
              </div>
            </div>
          </div>

          {/* Comentario detallado */}
          <div className="form-group">
            <label>Tu comentario:</label>
            <textarea
              rows="4"
              placeholder="Comparte tus observaciones, sugerencias o comentarios sobre la alimentación de tu hijo/a..."
              required
            ></textarea>
            <small>Se específico para que podamos mejorar el servicio</small>
          </div>

          {/* Checkbox para solicitar respuesta */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Me gustaría recibir una respuesta del equipo de nutrición
            </label>
          </div>

          {/* Botón de envío */}
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              📤 Enviar Comentario
            </button>
            <button type="button" className="btn btn-secondary">
              📝 Borrador
            </button>
          </div>
        </form>
      </div>

      {/* Historial de comentarios */}
      <div className="feedback-history">
        <h2>Mis Comentarios Anteriores</h2>
        
        {myFeedbackHistory.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h4>No hay comentarios anteriores</h4>
            <p>Cuando envíes tu primer comentario, aparecerá aquí.</p>
          </div>
        ) : (
          <div className="feedback-list">
            {myFeedbackHistory.map(feedback => (
              <div key={feedback.id} className="feedback-history-card">
                <div className="feedback-header">
                  <div className="feedback-meta">
                    <h4 className="feedback-menu">{feedback.menu}</h4>
                    <div className="feedback-details">
                      <span className="feedback-child">👤 {feedback.child}</span>
                      <span className="feedback-date">📅 {feedback.date}</span>
                      <span className="feedback-category">
                        {getCategoryIcon(feedback.category)} {getCategoryName(feedback.category)}
                      </span>
                    </div>
                  </div>
                  <div className="feedback-rating">
                    <span className="rating-stars">{getViewStarRating(feedback.rating)}</span>
                    <span className="rating-text">({feedback.rating}/5)</span>
                  </div>
                </div>

                <div className="feedback-content">
                  <div className="user-comment">
                    <h5>Tu comentario:</h5>
                    <p>"{feedback.comment}"</p>
                  </div>

                  {feedback.response ? (
                    <div className="nutrition-response">
                      <h5>Respuesta del equipo:</h5>
                      <div className="response-content">
                        <p>"{feedback.response.text}"</p>
                        <div className="response-meta">
                          <span className="response-author">- {feedback.response.author}</span>
                          <span className="response-date">{feedback.response.date}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="no-response">
                      <span className="pending-icon">⏳</span>
                      <span className="pending-text">Esperando respuesta del equipo de nutrición</span>
                    </div>
                  )}
                </div>

                <div className="feedback-actions">
                  <button className="btn btn-outline btn-sm">
                    ✏️ Editar
                  </button>
                  <button className="btn btn-outline btn-sm">
                    🔄 Seguimiento
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Guías y consejos */}
      <div className="feedback-tips">
        <h3>💡 Consejos para dar feedback efectivo</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">🎯</div>
            <h4>Sé específico</h4>
            <p>Menciona detalles específicos sobre la comida, porción o servicio para que podamos entender mejor tu experiencia.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🏗️</div>
            <h4>Sugiere mejoras</h4>
            <p>Además de señalar problemas, sugiere posibles soluciones o alternativas que te gustaría ver.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">❤️</div>
            <h4>Mantén un tono constructivo</h4>
            <p>Los comentarios constructivos y respetuosos ayudan a crear un mejor ambiente para todos.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">⚡</div>
            <h4>Comenta pronto</h4>
            <p>Envía tu feedback lo antes posible después de la comida para que los detalles estén frescos en tu memoria.</p>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showSubmitModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Comentario Enviado</h3>
              <button 
                className="modal-close"
                onClick={() => setShowSubmitModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h4>¡Gracias por tu comentario!</h4>
                <p>Tu feedback ha sido enviado exitosamente al equipo de nutrición. Te responderemos pronto si has solicitado una respuesta.</p>
                
                <div className="feedback-summary">
                  <h5>Resumen de tu comentario:</h5>
                  <div className="summary-details">
                    <p><strong>Hijo:</strong> {children.find(c => c.id === selectedChild)?.name}</p>
                    <p><strong>Categoría:</strong> {getCategoryName(feedbackType)}</p>
                    <p><strong>Calificación:</strong> {getViewStarRating(rating)} ({rating}/5)</p>
                    {selectedMenu && (
                      <p><strong>Menú:</strong> {recentMenus.find(m => m.id === selectedMenu)?.name}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setShowSubmitModal(false);
                  // Reset form
                  setRating(0);
                  setSelectedMenu('');
                  setFeedbackType('general');
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}