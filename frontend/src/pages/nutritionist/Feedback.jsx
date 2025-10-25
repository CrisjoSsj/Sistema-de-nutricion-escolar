import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function NutritionistFeedback() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Datos de ejemplo de feedback recibido
  const feedbackData = [
    {
      id: 1,
      date: '2025-01-12',
      menu: 'Pollo a la plancha con vegetales',
      menuDate: '2025-01-10',
      user: 'María González',
      userType: 'padre',
      rating: 5,
      category: 'sabor',
      comment: 'Excelente menú! Mi hijo está muy contento con la variedad y el sabor. El pollo estaba muy bien sazonado.',
      response: null,
      status: 'pending'
    },
    {
      id: 2,
      date: '2025-01-11',
      menu: 'Pescado al horno con quinoa',
      menuDate: '2025-01-09',
      user: 'Carlos Ramírez',
      userType: 'estudiante',
      rating: 4,
      category: 'cantidad',
      comment: 'La comida está rica pero me gustaría que hubiera un poco más de porción.',
      response: {
        date: '2025-01-12',
        text: 'Gracias por tu comentario Carlos. Revisaremos las porciones para asegurar que sean adecuadas.'
      },
      status: 'responded'
    },
    {
      id: 3,
      date: '2025-01-10',
      menu: 'Avena con frutas y nueces',
      menuDate: '2025-01-08',
      user: 'Ana Martínez',
      userType: 'padre',
      rating: 3,
      category: 'variedad',
      comment: 'El desayuno está bien, pero me gustaría ver más opciones vegetarianas para mi hija.',
      response: null,
      status: 'pending'
    },
    {
      id: 4,
      date: '2025-01-09',
      menu: 'Sopa de lentejas con pan integral',
      menuDate: '2025-01-07',
      user: 'Luis Pérez',
      userType: 'estudiante',
      rating: 5,
      category: 'sabor',
      comment: '¡Me encanta la sopa de lentejas! Es mi favorita. Ojalá la pongan más seguido.',
      response: {
        date: '2025-01-10',
        text: '¡Qué alegría saber que te gusta Luis! Incluiremos las lentejas más frecuentemente en el menú.'
      },
      status: 'responded'
    },
    {
      id: 5,
      date: '2025-01-08',
      menu: 'Arroz con pollo y ensalada',
      menuDate: '2025-01-06',
      user: 'Carmen Silva',
      userType: 'padre',
      rating: 2,
      category: 'presentacion',
      comment: 'La comida llegó un poco fría y la presentación no era muy apetitosa. Espero mejoren esto.',
      response: null,
      status: 'pending'
    }
  ];

  const categories = [
    { value: 'all', label: 'Todas las categorías' },
    { value: 'sabor', label: 'Sabor' },
    { value: 'cantidad', label: 'Cantidad' },
    { value: 'variedad', label: 'Variedad' },
    { value: 'presentacion', label: 'Presentación' },
    { value: 'temperatura', label: 'Temperatura' }
  ];

  const ratings = [
    { value: 'all', label: 'Todas las calificaciones' },
    { value: '5', label: '5 estrellas' },
    { value: '4', label: '4 estrellas' },
    { value: '3', label: '3 estrellas' },
    { value: '2', label: '2 estrellas' },
    { value: '1', label: '1 estrella' }
  ];

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesFilter = selectedFilter === 'all' || feedback.status === selectedFilter;
    const matchesRating = selectedRating === 'all' || feedback.rating.toString() === selectedRating;
    return matchesFilter && matchesRating;
  });

  const feedbackStats = {
    total: feedbackData.length,
    pending: feedbackData.filter(f => f.status === 'pending').length,
    responded: feedbackData.filter(f => f.status === 'responded').length,
    averageRating: (feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1)
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'sabor': '👅',
      'cantidad': '🍽️',
      'variedad': '🌈',
      'presentacion': '🎨',
      'temperatura': '🌡️'
    };
    return icons[category] || '💬';
  };

  const getUserTypeIcon = (userType) => {
    return userType === 'padre' ? '👨‍👩‍👧‍👦' : '🎓';
  };

  const handleRespond = (feedback) => {
    setSelectedFeedback(feedback);
    setShowResponseModal(true);
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">Feedback Recibido</h1>
        <p className="page-description">Revisa y responde a los comentarios sobre tus menús</p>
      </div>

      {/* Estadísticas de feedback */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <h3 className="stat-number">{feedbackStats.total}</h3>
            <p className="stat-label">Total de Comentarios</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3 className="stat-number">{feedbackStats.pending}</h3>
            <p className="stat-label">Sin Responder</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-number">{feedbackStats.responded}</h3>
            <p className="stat-label">Respondidos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3 className="stat-number">{feedbackStats.averageRating}</h3>
            <p className="stat-label">Calificación Promedio</p>
          </div>
        </div>
      </div>

      {/* Filtros de feedback */}
      <div className="filters-section">
        <div className="filters-header">
          <div className="filter-controls">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="feedback-filter"
            >
              <option value="all">Todos los comentarios</option>
              <option value="pending">Sin responder</option>
              <option value="responded">Ya respondidos</option>
            </select>

            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="rating-filter"
            >
              {ratings.map(rating => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
          </div>

          <div className="export-controls">
            <button className="btn btn-outline">
              📊 Exportar Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Lista de feedback */}
      <div className="feedback-list">
        {filteredFeedback.map(feedback => (
          <div key={feedback.id} className={`feedback-card ${feedback.status}`}>
            <div className="feedback-header">
              <div className="feedback-user">
                <div className="user-avatar">
                  {getUserTypeIcon(feedback.userType)}
                </div>
                <div className="user-info">
                  <h4 className="user-name">{feedback.user}</h4>
                  <span className="user-type">
                    {feedback.userType === 'padre' ? 'Padre/Tutor' : 'Estudiante'}
                  </span>
                </div>
              </div>

              <div className="feedback-meta">
                <div className="feedback-rating">
                  <span className="rating-stars">{getRatingStars(feedback.rating)}</span>
                  <span className="rating-number">({feedback.rating}/5)</span>
                </div>
                <span className="feedback-date">{feedback.date}</span>
              </div>

              <div className="feedback-status">
                <span className={`status-badge ${feedback.status}`}>
                  {feedback.status === 'pending' ? '⏳ Pendiente' : '✅ Respondido'}
                </span>
              </div>
            </div>

            <div className="feedback-content">
              <div className="menu-reference">
                <span className="menu-icon">🍽️</span>
                <div className="menu-info">
                  <span className="menu-name">{feedback.menu}</span>
                  <span className="menu-date">Servido el {feedback.menuDate}</span>
                </div>
                <div className="feedback-category">
                  <span className="category-icon">{getCategoryIcon(feedback.category)}</span>
                  <span className="category-name">{feedback.category}</span>
                </div>
              </div>

              <div className="comment-section">
                <h5>Comentario:</h5>
                <p className="comment-text">{feedback.comment}</p>
              </div>

              {feedback.response && (
                <div className="response-section">
                  <h5>Tu respuesta:</h5>
                  <div className="response-content">
                    <p className="response-text">{feedback.response.text}</p>
                    <span className="response-date">Respondido el {feedback.response.date}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="feedback-actions">
              {feedback.status === 'pending' ? (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleRespond(feedback)}
                >
                  💬 Responder
                </button>
              ) : (
                <button 
                  className="btn btn-outline"
                  onClick={() => handleRespond(feedback)}
                >
                  ✏️ Editar Respuesta
                </button>
              )}
              <button className="btn btn-outline">
                👁️ Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h4>No hay comentarios</h4>
          <p>No se encontraron comentarios con los filtros seleccionados.</p>
        </div>
      )}

      {/* Modal para responder feedback */}
      {showResponseModal && selectedFeedback && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedFeedback.response ? 'Editar Respuesta' : 'Responder Comentario'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowResponseModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="feedback-context">
                <div className="context-header">
                  <h4>Comentario de {selectedFeedback.user}</h4>
                  <div className="context-rating">
                    {getRatingStars(selectedFeedback.rating)}
                  </div>
                </div>
                <div className="context-menu">
                  <strong>Menú:</strong> {selectedFeedback.menu} ({selectedFeedback.menuDate})
                </div>
                <div className="context-category">
                  <strong>Categoría:</strong> {getCategoryIcon(selectedFeedback.category)} {selectedFeedback.category}
                </div>
                <div className="context-comment">
                  <strong>Comentario:</strong>
                  <p>"{selectedFeedback.comment}"</p>
                </div>
              </div>

              <form className="response-form">
                <div className="form-group">
                  <label>Tu respuesta:</label>
                  <textarea
                    rows="4"
                    placeholder="Escribe tu respuesta aquí..."
                    defaultValue={selectedFeedback.response?.text || ''}
                  ></textarea>
                </div>

                <div className="response-tips">
                  <h5>💡 Consejos para una buena respuesta:</h5>
                  <ul>
                    <li>Agradece el feedback, tanto positivo como constructivo</li>
                    <li>Sé específico sobre las acciones que tomarás</li>
                    <li>Mantén un tono profesional y empático</li>
                    <li>Ofrece explicaciones cuando sea apropiado</li>
                  </ul>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowResponseModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                {selectedFeedback.response ? 'Actualizar Respuesta' : 'Enviar Respuesta'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resumen de categorías de feedback */}
      <div className="feedback-summary">
        <h3>Resumen por Categorías</h3>
        <div className="category-stats">
          {categories.slice(1).map(category => {
            const categoryFeedback = feedbackData.filter(f => f.category === category.value);
            const avgRating = categoryFeedback.length > 0 
              ? (categoryFeedback.reduce((sum, f) => sum + f.rating, 0) / categoryFeedback.length).toFixed(1)
              : 0;
            
            return (
              <div key={category.value} className="category-stat">
                <div className="category-header">
                  <span className="category-icon">{getCategoryIcon(category.value)}</span>
                  <span className="category-title">{category.label}</span>
                </div>
                <div className="category-metrics">
                  <span className="category-count">{categoryFeedback.length} comentarios</span>
                  <span className="category-rating">⭐ {avgRating}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}