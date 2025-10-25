import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function StudentFeedback() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Datos de ejemplo del estudiante
  const studentInfo = {
    name: 'Ana María González',
    avatar: '👧'
  };

  // Datos de ejemplo de comidas recientes
  const [recentMeals, setRecentMeals] = useState([
    {
      id: 1,
      name: 'Pollo a la plancha con quinoa',
      date: '2025-10-09',
      meal: 'Almuerzo',
      image: '🍗',
      consumed: true,
      rating: 5,
      comment: '¡Estaba súper rico! Me gustó mucho la quinoa.',
      categories: {
        sabor: 5,
        cantidad: 4,
        presentacion: 5,
        temperatura: 5
      }
    },
    {
      id: 2,
      name: 'Avena con frutas del bosque',
      date: '2025-10-09',
      meal: 'Desayuno',
      image: '🥣',
      consumed: true,
      rating: 4,
      comment: 'Me gustaron los arándanos, pero la avena estaba un poquito fría.',
      categories: {
        sabor: 4,
        cantidad: 5,
        presentacion: 4,
        temperatura: 3
      }
    },
    {
      id: 3,
      name: 'Yogurt con granola',
      date: '2025-10-09',
      meal: 'Colación',
      image: '🥛',
      consumed: true,
      rating: 0,
      comment: '',
      categories: {
        sabor: 0,
        cantidad: 0,
        presentacion: 0,
        temperatura: 0
      }
    },
    {
      id: 4,
      name: 'Pescado al vapor con vegetales',
      date: '2025-10-08',
      meal: 'Almuerzo',
      image: '🐟',
      consumed: true,
      rating: 3,
      comment: 'El pescado estaba bien, pero no me gustaron mucho las verduras.',
      categories: {
        sabor: 3,
        cantidad: 4,
        presentacion: 3,
        temperatura: 4
      }
    },
    {
      id: 5,
      name: 'Tostadas integrales con palta',
      date: '2025-10-08',
      meal: 'Desayuno',
      image: '🥑',
      consumed: true,
      rating: 5,
      comment: '¡Me encanta la palta! Las tostadas estaban crujientes.',
      categories: {
        sabor: 5,
        cantidad: 4,
        presentacion: 5,
        temperatura: 4
      }
    },
    {
      id: 6,
      name: 'Frutas de temporada',
      date: '2025-10-08',
      meal: 'Colación',
      image: '🍎',
      consumed: true,
      rating: 4,
      comment: 'Las frutas estaban fresquitas y dulces.',
      categories: {
        sabor: 4,
        cantidad: 3,
        presentacion: 4,
        temperatura: 0
      }
    }
  ]);

  const categoryLabels = {
    sabor: { label: 'Sabor', icon: '👅', description: '¿Qué tan rico estaba?' },
    cantidad: { label: 'Cantidad', icon: '🍽️', description: '¿Fue suficiente comida?' },
    presentacion: { label: 'Se veía bonito', icon: '🎨', description: '¿Se veía apetitoso?' },
    temperatura: { label: 'Temperatura', icon: '🌡️', description: '¿Estaba calentito/fresco?' }
  };

  const moodEmojis = ['😢', '😕', '😐', '😊', '😍'];
  const moodLabels = ['No me gustó nada', 'No me gustó', 'Estuvo ok', 'Me gustó', '¡Me encantó!'];

  const unratedMeals = recentMeals.filter(meal => meal.consumed && meal.rating === 0);
  const ratedMeals = recentMeals.filter(meal => meal.consumed && meal.rating > 0);

  const handleRateMeal = (meal) => {
    setSelectedMeal(meal);
    setShowFeedbackModal(true);
  };

  const getStarRating = (rating, interactive = false, onRate = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
        onClick={interactive && onRate ? () => onRate(index + 1) : undefined}
        style={{ cursor: interactive ? 'pointer' : 'default', fontSize: '24px' }}
      >
        {index < rating ? '⭐' : '☆'}
      </span>
    ));
  };

  const getCategoryStars = (rating, interactive = false, onRate = null) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`category-star ${index < rating ? 'filled' : 'empty'} ${interactive ? 'interactive' : ''}`}
        onClick={interactive && onRate ? () => onRate(index + 1) : undefined}
        style={{ cursor: interactive ? 'pointer' : 'default', fontSize: '18px' }}
      >
        {index < rating ? '⭐' : '☆'}
      </span>
    ));
  };

  const getAverageRating = () => {
    const ratedMealsList = recentMeals.filter(meal => meal.rating > 0);
    if (ratedMealsList.length === 0) return 0;
    return (ratedMealsList.reduce((sum, meal) => sum + meal.rating, 0) / ratedMealsList.length).toFixed(1);
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">
          {studentInfo.avatar} Califica tus comidas
        </h1>
        <p className="page-description">¡Cuéntanos qué te pareció la comida para hacerla aún más rica!</p>
      </div>

      {/* Estadísticas de calificaciones */}
      <div className="feedback-stats">
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h3>{getAverageRating()}</h3>
              <p>Tu calificación promedio</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-content">
              <h3>{ratedMeals.length}</h3>
              <p>Comidas calificadas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>{unratedMeals.length}</h3>
              <p>Por calificar</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">😍</div>
            <div className="stat-content">
              <h3>{recentMeals.filter(m => m.rating === 5).length}</h3>
              <p>Comidas que te encantaron</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comidas por calificar */}
      {unratedMeals.length > 0 && (
        <div className="pending-ratings">
          <h2>🍽️ ¡Califica estas comidas!</h2>
          <p className="section-description">Ayúdanos a mejorar contándonos qué te pareció</p>
          
          <div className="meals-grid">
            {unratedMeals.map(meal => (
              <div key={meal.id} className="meal-card pending">
                <div className="meal-header">
                  <div className="meal-image">
                    <span className="food-emoji">{meal.image}</span>
                  </div>
                  <div className="meal-info">
                    <h3>{meal.name}</h3>
                    <div className="meal-meta">
                      <span className="meal-type">{meal.meal}</span>
                      <span className="meal-date">{meal.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="meal-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleRateMeal(meal)}
                  >
                    ⭐ Calificar ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historial de calificaciones */}
      <div className="ratings-history">
        <h2>📝 Tus calificaciones anteriores</h2>
        
        {ratedMeals.length === 0 ? (
          <div className="empty-ratings">
            <div className="empty-icon">⭐</div>
            <h3>Aún no has calificado ninguna comida</h3>
            <p>Cuando califiques tus primeras comidas, aparecerán aquí.</p>
          </div>
        ) : (
          <div className="ratings-list">
            {ratedMeals.map(meal => (
              <div key={meal.id} className="rating-card">
                <div className="rating-header">
                  <div className="meal-basic-info">
                    <span className="food-emoji">{meal.image}</span>
                    <div className="meal-details">
                      <h4>{meal.name}</h4>
                      <div className="meal-meta">
                        <span>{meal.meal} - {meal.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overall-rating">
                    <div className="rating-stars">
                      {getStarRating(meal.rating)}
                    </div>
                    <div className="rating-mood">
                      <span className="mood-emoji">{moodEmojis[meal.rating - 1]}</span>
                      <span className="mood-text">{moodLabels[meal.rating - 1]}</span>
                    </div>
                  </div>
                </div>

                <div className="detailed-ratings">
                  <h5>Calificación detallada:</h5>
                  <div className="categories-grid">
                    {Object.entries(meal.categories).map(([category, rating]) => (
                      <div key={category} className="category-rating">
                        <div className="category-info">
                          <span className="category-icon">{categoryLabels[category].icon}</span>
                          <span className="category-name">{categoryLabels[category].label}</span>
                        </div>
                        <div className="category-stars">
                          {rating > 0 ? getCategoryStars(rating) : (
                            <span className="no-rating">Sin calificar</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {meal.comment && (
                  <div className="meal-comment">
                    <h5>Tu comentario:</h5>
                    <p>"{meal.comment}"</p>
                  </div>
                )}

                <div className="rating-actions">
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => handleRateMeal(meal)}
                  >
                    ✏️ Editar calificación
                  </button>
                  <button className="btn btn-outline btn-sm">
                    ❤️ Agregar a favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de calificación */}
      {showFeedbackModal && selectedMeal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedMeal.image} Califica: {selectedMeal.name}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowFeedbackModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="feedback-form">
                {/* Calificación general */}
                <div className="general-rating">
                  <h4>¿Qué te pareció en general?</h4>
                  <div className="rating-options">
                    {moodEmojis.map((emoji, index) => (
                      <div 
                        key={index}
                        className={`rating-option ${selectedMeal.rating === index + 1 ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedMeal(prev => ({ ...prev, rating: index + 1 }));
                        }}
                      >
                        <div className="option-emoji">{emoji}</div>
                        <div className="option-text">{moodLabels[index]}</div>
                        <div className="option-stars">
                          {getStarRating(index + 1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calificaciones por categoría */}
                <div className="category-ratings">
                  <h4>Califica cada aspecto:</h4>
                  <div className="categories-detailed">
                    {Object.entries(categoryLabels).map(([category, info]) => (
                      <div key={category} className="category-detail">
                        <div className="category-header">
                          <span className="category-icon">{info.icon}</span>
                          <div className="category-text">
                            <h5>{info.label}</h5>
                            <p>{info.description}</p>
                          </div>
                        </div>
                        <div className="category-rating-input">
                          {getCategoryStars(
                            selectedMeal.categories[category], 
                            true, 
                            (rating) => {
                              setSelectedMeal(prev => ({
                                ...prev,
                                categories: {
                                  ...prev.categories,
                                  [category]: rating
                                }
                              }));
                            }
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comentario */}
                <div className="comment-section">
                  <h4>Cuéntanos más (opcional):</h4>
                  <textarea
                    rows="3"
                    placeholder="¿Qué fue lo que más te gustó? ¿Qué podríamos mejorar? ¡Cuéntanos todo!"
                    value={selectedMeal.comment}
                    onChange={(e) => {
                      setSelectedMeal(prev => ({
                        ...prev,
                        comment: e.target.value
                      }));
                    }}
                  ></textarea>
                </div>

                {/* Opciones rápidas */}
                <div className="quick-options">
                  <h4>Opciones rápidas:</h4>
                  <div className="quick-buttons">
                    <button 
                      className="quick-btn"
                      onClick={() => {
                        setSelectedMeal(prev => ({
                          ...prev,
                          comment: prev.comment + (prev.comment ? ' ' : '') + '¡Estaba súper rico!'
                        }));
                      }}
                    >
                      😋 ¡Estaba súper rico!
                    </button>
                    <button 
                      className="quick-btn"
                      onClick={() => {
                        setSelectedMeal(prev => ({
                          ...prev,
                          comment: prev.comment + (prev.comment ? ' ' : '') + 'Me gustaría que lo hagan más seguido.'
                        }));
                      }}
                    >
                      🔄 Quiero que lo repitan
                    </button>
                    <button 
                      className="quick-btn"
                      onClick={() => {
                        setSelectedMeal(prev => ({
                          ...prev,
                          comment: prev.comment + (prev.comment ? ' ' : '') + 'La cantidad fue perfecta.'
                        }));
                      }}
                    >
                      👌 Cantidad perfecta
                    </button>
                    <button 
                      className="quick-btn"
                      onClick={() => {
                        setSelectedMeal(prev => ({
                          ...prev,
                          comment: prev.comment + (prev.comment ? ' ' : '') + 'Se veía muy bonito en el plato.'
                        }));
                      }}
                    >
                      🎨 Se veía bonito
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowFeedbackModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary"
                disabled={selectedMeal.rating === 0}
              >
                ⭐ Enviar calificación
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consejos para calificar */}
      <div className="rating-tips">
        <h3>💡 Consejos para calificar</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">😊</div>
            <div className="tip-content">
              <h4>Sé honesto</h4>
              <p>Tu opinión es muy importante. Si algo no te gustó, dínos para que podamos mejorarlo.</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📝</div>
            <div className="tip-content">
              <h4>Escribe detalles</h4>
              <p>Cuéntanos qué fue lo que más te gustó o qué podríamos cambiar. ¡Cada comentario nos ayuda!</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🎯</div>
            <div className="tip-content">
              <h4>Califica todo</h4>
              <p>Trata de calificar sabor, cantidad, presentación y temperatura para darnos una idea completa.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="quick-actions">
        <button className="action-btn">
          🍽️ Ver menú de hoy
        </button>
        <button className="action-btn">
          ❤️ Mis comidas favoritas
        </button>
        <button className="action-btn">
          📊 Mi promedio de calificaciones
        </button>
        <button className="action-btn">
          💬 Ver respuestas del chef
        </button>
      </div>
    </DashboardLayout>
  );
}