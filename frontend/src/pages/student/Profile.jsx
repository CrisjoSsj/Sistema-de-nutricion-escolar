import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function StudentProfile() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSection, setEditSection] = useState('');

  // Datos de ejemplo del estudiante
  const [studentProfile, setStudentProfile] = useState({
    name: 'Ana María González',
    grade: '3° Básico',
    age: 8,
    birthDate: '2017-03-15',
    avatar: '👧',
    school: 'Escuela Umiña',
    allergies: ['nueces', 'mariscos'],
    preferences: ['pollo', 'frutas', 'yogurt', 'pasta'],
    dislikes: ['brócoli', 'pescado crudo'],
    favoriteFoods: [
      { name: 'Pollo a la plancha', emoji: '🍗', rating: 5 },
      { name: 'Smoothie de frutas', emoji: '🥤', rating: 5 },
      { name: 'Avena con canela', emoji: '🥣', rating: 4 }
    ],
    stats: {
      totalMeals: 45,
      favoriteAdded: 6,
      averageRating: 4.2,
      daysActive: 23,
      joinDate: '2025-08-15'
    },
    achievements: [
      { name: 'Explorador de Sabores', emoji: '🌟', description: 'Probaste 20 comidas diferentes' },
      { name: 'Crítico Gastronómico', emoji: '⭐', description: 'Calificaste 10 comidas' },
      { name: 'Amante de las Frutas', emoji: '🍎', description: 'Comiste frutas 7 días seguidos' }
    ],
    personalGoals: [
      { name: 'Probar 2 comidas nuevas por semana', progress: 75, emoji: '🎯' },
      { name: 'Tomar 8 vasos de agua al día', progress: 60, emoji: '💧' },
      { name: 'Calificar todas mis comidas', progress: 85, emoji: '⭐' }
    ],
    healthInfo: {
      height: '125 cm',
      weight: '28 kg',
      lastCheckup: '2025-09-15',
      medicalNotes: 'Sin restricciones médicas especiales'
    }
  });

  const handleEditSection = (section) => {
    setEditSection(section);
    setShowEditModal(true);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#4CAF50';
    if (progress >= 60) return '#FF9800';
    return '#F44336';
  };

  const avatarOptions = [
    { emoji: '👧', label: 'Niña 1' },
    { emoji: '👦', label: 'Niño 1' },
    { emoji: '🧒', label: 'Niño/a 1' },
    { emoji: '👧🏻', label: 'Niña 2' },
    { emoji: '👦🏻', label: 'Niño 2' },
    { emoji: '👧🏽', label: 'Niña 3' },
    { emoji: '👦🏽', label: 'Niño 3' },
    { emoji: '👧🏿', label: 'Niña 4' },
    { emoji: '👦🏿', label: 'Niño 4' }
  ];

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">
          {studentProfile.avatar} Mi Perfil
        </h1>
        <p className="page-description">Aquí está toda tu información y tu progreso en la alimentación saludable</p>
      </div>

      {/* Información básica */}
      <div className="profile-basic">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <span className="avatar-emoji">{studentProfile.avatar}</span>
              </div>
              <button 
                className="change-avatar-btn"
                onClick={() => handleEditSection('avatar')}
              >
                📷 Cambiar
              </button>
            </div>
            
            <div className="profile-info">
              <h2>{studentProfile.name}</h2>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-icon">🎓</span>
                  <span className="detail-text">{studentProfile.grade}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🎂</span>
                  <span className="detail-text">{studentProfile.age} años</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🏫</span>
                  <span className="detail-text">{studentProfile.school}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  <span className="detail-text">Desde {studentProfile.stats.joinDate}</span>
                </div>
              </div>
            </div>

            <button 
              className="edit-profile-btn"
              onClick={() => handleEditSection('basic')}
            >
              ✏️ Editar
            </button>
          </div>
        </div>
      </div>

      {/* Estadísticas del perfil */}
      <div className="profile-stats">
        <h3>📊 Tus números</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🍽️</div>
            <div className="stat-content">
              <h4>{studentProfile.stats.totalMeals}</h4>
              <p>Comidas consumidas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">❤️</div>
            <div className="stat-content">
              <h4>{studentProfile.stats.favoriteAdded}</h4>
              <p>Comidas favoritas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h4>{studentProfile.stats.averageRating}</h4>
              <p>Calificación promedio</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h4>{studentProfile.stats.daysActive}</h4>
              <p>Días activo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Información de salud */}
      <div className="health-info">
        <div className="section-header">
          <h3>🏥 Mi información de salud</h3>
          <button 
            className="edit-section-btn"
            onClick={() => handleEditSection('health')}
          >
            ✏️ Editar
          </button>
        </div>
        
        <div className="health-cards">
          <div className="health-card">
            <div className="health-item">
              <span className="health-icon">📏</span>
              <div className="health-data">
                <span className="health-label">Altura</span>
                <span className="health-value">{studentProfile.healthInfo.height}</span>
              </div>
            </div>
            <div className="health-item">
              <span className="health-icon">⚖️</span>
              <div className="health-data">
                <span className="health-label">Peso</span>
                <span className="health-value">{studentProfile.healthInfo.weight}</span>
              </div>
            </div>
          </div>
          
          <div className="health-card">
            <div className="health-item">
              <span className="health-icon">📋</span>
              <div className="health-data">
                <span className="health-label">Último chequeo</span>
                <span className="health-value">{studentProfile.healthInfo.lastCheckup}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alergias y preferencias */}
      <div className="dietary-info">
        <div className="dietary-section">
          <div className="section-header">
            <h3>⚠️ Mis alergias</h3>
            <button 
              className="edit-section-btn"
              onClick={() => handleEditSection('allergies')}
            >
              ✏️ Editar
            </button>
          </div>
          
          <div className="dietary-tags">
            {studentProfile.allergies.length > 0 ? (
              studentProfile.allergies.map((allergy, index) => (
                <span key={index} className="dietary-tag allergy-tag">
                  ⚠️ {allergy}
                </span>
              ))
            ) : (
              <span className="no-items">No tienes alergias registradas</span>
            )}
          </div>
        </div>

        <div className="dietary-section">
          <div className="section-header">
            <h3>❤️ Me gusta comer</h3>
            <button 
              className="edit-section-btn"
              onClick={() => handleEditSection('preferences')}
            >
              ✏️ Editar
            </button>
          </div>
          
          <div className="dietary-tags">
            {studentProfile.preferences.map((preference, index) => (
              <span key={index} className="dietary-tag preference-tag">
                ❤️ {preference}
              </span>
            ))}
          </div>
        </div>

        <div className="dietary-section">
          <div className="section-header">
            <h3>😕 No me gusta mucho</h3>
            <button 
              className="edit-section-btn"
              onClick={() => handleEditSection('dislikes')}
            >
              ✏️ Editar
            </button>
          </div>
          
          <div className="dietary-tags">
            {studentProfile.dislikes.length > 0 ? (
              studentProfile.dislikes.map((dislike, index) => (
                <span key={index} className="dietary-tag dislike-tag">
                  😕 {dislike}
                </span>
              ))
            ) : (
              <span className="no-items">¡Te gusta todo!</span>
            )}
          </div>
        </div>
      </div>

      {/* Comidas favoritas */}
      <div className="favorite-foods">
        <div className="section-header">
          <h3>🏆 Mis comidas favoritas</h3>
          <button className="view-all-btn">
            👀 Ver todas
          </button>
        </div>
        
        <div className="favorites-grid">
          {studentProfile.favoriteFoods.map((food, index) => (
            <div key={index} className="favorite-food-card">
              <div className="food-emoji">{food.emoji}</div>
              <div className="food-info">
                <h4>{food.name}</h4>
                <div className="food-rating">
                  {'⭐'.repeat(food.rating)} ({food.rating}/5)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logros */}
      <div className="achievements">
        <h3>🏆 Mis logros</h3>
        <div className="achievements-grid">
          {studentProfile.achievements.map((achievement, index) => (
            <div key={index} className="achievement-card earned">
              <div className="achievement-emoji">{achievement.emoji}</div>
              <div className="achievement-info">
                <h4>{achievement.name}</h4>
                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metas personales */}
      <div className="personal-goals">
        <div className="section-header">
          <h3>🎯 Mis metas</h3>
          <button 
            className="edit-section-btn"
            onClick={() => handleEditSection('goals')}
          >
            ➕ Nueva meta
          </button>
        </div>
        
        <div className="goals-list">
          {studentProfile.personalGoals.map((goal, index) => (
            <div key={index} className="goal-item">
              <div className="goal-info">
                <span className="goal-emoji">{goal.emoji}</span>
                <div className="goal-text">
                  <h4>{goal.name}</h4>
                  <div className="goal-progress-bar">
                    <div 
                      className="goal-progress-fill"
                      style={{ 
                        width: `${goal.progress}%`,
                        backgroundColor: getProgressColor(goal.progress)
                      }}
                    ></div>
                  </div>
                  <span className="goal-percentage">{goal.progress}% completado</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">
                Editar {
                  editSection === 'avatar' && 'Avatar' ||
                  editSection === 'basic' && 'Información Básica' ||
                  editSection === 'health' && 'Información de Salud' ||
                  editSection === 'allergies' && 'Alergias' ||
                  editSection === 'preferences' && 'Preferencias' ||
                  editSection === 'dislikes' && 'Comidas que no te gustan' ||
                  editSection === 'goals' && 'Metas Personales'
                }
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              {editSection === 'avatar' && (
                <div className="avatar-selection">
                  <h4>Elige tu avatar favorito:</h4>
                  <div className="avatar-grid">
                    {avatarOptions.map((option, index) => (
                      <div 
                        key={index}
                        className={`avatar-option ${studentProfile.avatar === option.emoji ? 'selected' : ''}`}
                        onClick={() => {
                          setStudentProfile(prev => ({ ...prev, avatar: option.emoji }));
                        }}
                      >
                        <span className="option-emoji">{option.emoji}</span>
                        <span className="option-label">{option.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {editSection === 'preferences' && (
                <div className="preferences-edit">
                  <h4>¿Qué comidas te gustan?</h4>
                  <textarea
                    rows="4"
                    placeholder="Escribe las comidas que te gustan, separadas por comas..."
                    defaultValue={studentProfile.preferences.join(', ')}
                  ></textarea>
                  <small>Ejemplo: pollo, frutas, pasta, yogurt</small>
                </div>
              )}

              {editSection === 'allergies' && (
                <div className="allergies-edit">
                  <h4>¿Tienes alguna alergia alimentaria?</h4>
                  <textarea
                    rows="3"
                    placeholder="Escribe tus alergias separadas por comas, o deja vacío si no tienes..."
                    defaultValue={studentProfile.allergies.join(', ')}
                  ></textarea>
                  <small>Ejemplo: nueces, mariscos, lácteos</small>
                  <div className="allergy-warning">
                    <span className="warning-icon">⚠️</span>
                    <span className="warning-text">
                      Es muy importante que nos digas si tienes alergias para mantenerte seguro
                    </span>
                  </div>
                </div>
              )}

              {editSection === 'dislikes' && (
                <div className="dislikes-edit">
                  <h4>¿Hay comidas que no te gustan mucho?</h4>
                  <textarea
                    rows="3"
                    placeholder="Escribe las comidas que no te gustan mucho, separadas por comas..."
                    defaultValue={studentProfile.dislikes.join(', ')}
                  ></textarea>
                  <small>Ejemplo: brócoli, pescado, coliflor</small>
                  <div className="encourage-message">
                    <span className="encourage-icon">💪</span>
                    <span className="encourage-text">
                      ¡Recuerda que a veces las comidas que no nos gustan pueden sorprendernos si las probamos de nuevo!
                    </span>
                  </div>
                </div>
              )}

              {editSection === 'goals' && (
                <div className="goals-edit">
                  <h4>Crea una nueva meta:</h4>
                  <div className="form-group">
                    <label>¿Qué quieres lograr?</label>
                    <input 
                      type="text" 
                      placeholder="Ejemplo: Comer más verduras"
                    />
                  </div>
                  <div className="form-group">
                    <label>¿Con qué frecuencia?</label>
                    <select>
                      <option value="">Selecciona...</option>
                      <option value="daily">Todos los días</option>
                      <option value="weekly">Cada semana</option>
                      <option value="monthly">Cada mes</option>
                    </select>
                  </div>
                  <div className="goal-suggestions">
                    <h5>💡 Algunas ideas de metas:</h5>
                    <div className="suggestion-buttons">
                      <button className="suggestion-btn">🥗 Comer más verduras</button>
                      <button className="suggestion-btn">💧 Tomar más agua</button>
                      <button className="suggestion-btn">🍎 Probar frutas nuevas</button>
                      <button className="suggestion-btn">⭐ Calificar todas mis comidas</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje motivacional */}
      <div className="motivational-message">
        <div className="message-card">
          <div className="message-icon">🌟</div>
          <div className="message-content">
            <h4>¡Sigue así, {studentProfile.name.split(' ')[0]}!</h4>
            <p>
              Llevas {studentProfile.stats.daysActive} días siendo parte de nuestra comunidad de alimentación saludable. 
              ¡Tu opinión y participación ayudan a hacer que la comida del colegio sea cada vez mejor!
            </p>
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
          📊 Mi progreso nutricional
        </button>
        <button className="action-btn">
          👨‍👩‍👧‍👦 Compartir con mis papás
        </button>
      </div>
    </DashboardLayout>
  );
}