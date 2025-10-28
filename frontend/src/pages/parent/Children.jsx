import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';
import '../../styles/parent/Children.css';

export default function ParentChildren() {
  const [selectedChild, setSelectedChild] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [schoolFilter, setSchoolFilter] = useState('all');

  // Datos de ejemplo de hijos
  const [children, setChildren] = useState([
    {
      id: 1,
      name: 'Ana María González',
      grade: '3° Básico',
      age: 8,
      birthDate: '2017-03-15',
      avatar: '👧',
      school: currentSchool?.name || 'Escuela Umiña', // Escuela principal del padre
      allergies: ['nueces', 'mariscos'],
      preferences: ['pollo', 'frutas', 'yogurt'],
      dislikes: ['brócoli', 'pescado'],
      medicalConditions: [],
      emergencyContact: {
        name: 'Abuela Carmen',
        phone: '+56 9 8765 4321',
        relationship: 'Abuela'
      },
      stats: {
        attendanceRate: 95,
        avgMealRating: 4.2,
        favoriteFood: 'Pollo a la plancha',
        caloriesPerDay: 1200,
        lastWeightHeight: { weight: '28kg', height: '125cm', date: '2025-09-15' }
      },
      recentActivity: [
        { date: '2025-10-09', action: 'Calificó "Lentejas guisadas" con 5 estrellas', type: 'rating' },
        { date: '2025-10-08', action: 'No consumió el snack (alergia a nueces)', type: 'alert' },
        { date: '2025-10-07', action: 'Consumió toda la comida del día', type: 'success' }
      ]
    },
    {
      id: 2,
      name: 'Carlos José González',
      grade: '5° Básico',
      age: 10,
      birthDate: '2015-07-22',
      avatar: '👦',
      school: currentSchool?.name || 'Escuela Umiña', // Mismo colegio que Ana María
      allergies: [],
      preferences: ['pasta', 'verduras', 'frutas'],
      dislikes: ['carne roja'],
      medicalConditions: ['vegetariano'],
      emergencyContact: {
        name: 'Tío Miguel',
        phone: '+56 9 1234 5678',
        relationship: 'Tío'
      },
      stats: {
        attendanceRate: 98,
        avgMealRating: 4.7,
        favoriteFood: 'Pasta con verduras',
        caloriesPerDay: 1400,
        lastWeightHeight: { weight: '35kg', height: '140cm', date: '2025-09-20' }
      },
      recentActivity: [
        { date: '2025-10-09', action: 'Agregó "Quinoa con vegetales" a favoritos', type: 'favorite' },
        { date: '2025-10-08', action: 'Dejó comentario positivo sobre el menú', type: 'feedback' },
        { date: '2025-10-07', action: 'Consumió toda la comida del día', type: 'success' }
      ]
    },
    {
      id: 3,
      name: 'Sofía González Pérez',
      grade: '1° Básico',
      age: 6,
      birthDate: '2019-11-12',
      avatar: '👧',
      school: 'Colegio Central', // Diferente escuela
      allergies: ['lácteos'],
      preferences: ['frutas', 'cereales', 'pollo'],
      dislikes: ['verduras verdes'],
      medicalConditions: ['intolerancia a la lactosa'],
      emergencyContact: {
        name: 'Abuela Carmen',
        phone: '+56 9 8765 4321',
        relationship: 'Abuela'
      },
      stats: {
        attendanceRate: 92,
        avgMealRating: 3.8,
        favoriteFood: 'Smoothie de frutas',
        caloriesPerDay: 1000,
        lastWeightHeight: { weight: '20kg', height: '110cm', date: '2025-09-10' }
      },
      recentActivity: [
        { date: '2025-10-09', action: 'Padre reportó reacción leve a lácteos', type: 'alert' },
        { date: '2025-10-08', action: 'Calificó "Arroz con pollo" con 4 estrellas', type: 'rating' },
        { date: '2025-10-07', action: 'No consumió los lácteos del desayuno', type: 'warning' }
      ]
    }
  ]);

  const getActivityIcon = (type) => {
    const icons = {
      rating: '⭐',
      alert: '⚠️',
      success: '✅',
      favorite: '❤️',
      feedback: '💬'
    };
    return icons[type] || '📝';
  };

  const getActivityColor = (type) => {
    const colors = {
      rating: 'var(--warning-500)',
      alert: 'var(--error-500)',
      success: 'var(--success-500)',
      favorite: 'var(--error-500)',
      feedback: 'var(--primary-500)'
    };
    return colors[type] || 'var(--gray-500)';
  };

  const handleEditChild = (child) => {
    setSelectedChild(child);
    setShowEditModal(true);
  };

  const handleAddChild = () => {
    setSelectedChild(null);
    setShowAddModal(true);
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="parent-children">
        <div className="page-header">
          <h1 className="page-title">Mis Hijos</h1>
          <p className="page-description">Gestiona la información y seguimiento de tus hijos</p>
        </div>

      {/* Botón para agregar hijo */}
      <div className="page-actions">
        <button className="btn btn-primary" onClick={handleAddChild}>
          👶 Agregar Hijo
        </button>
      </div>

      {/* Resumen por escuelas */}
      {(() => {
        const schoolGroups = children.reduce((acc, child) => {
          const school = child.school;
          acc[school] = (acc[school] || 0) + 1;
          return acc;
        }, {});
        
        return Object.keys(schoolGroups).length > 1 && (
          <div className="schools-summary">
            <h3>📊 Distribución por escuelas</h3>
            <div className="schools-stats">
              {Object.entries(schoolGroups).map(([school, count]) => (
                <div key={school} className="school-stat">
                  <span className="school-icon">🏫</span>
                  <div className="school-info">
                    <span className="school-name">{school}</span>
                    <span className="school-count">{count} hijo{count !== 1 ? 's' : ''}</span>
                  </div>
                  {school === currentSchool?.name && (
                    <span className="school-badge primary">Principal</span>
                  )}
                </div>
              ))}
            </div>
            <div className="multi-school-notice">
              <span className="notice-icon">ℹ️</span>
              <span className="notice-text">
                Tienes hijos en {Object.keys(schoolGroups).length} escuelas diferentes. 
                Puedes gestionar la información de cada uno desde esta sección.
              </span>
            </div>
          </div>    
        );
      })()}

      {/* Filtro por escuela (solo si hay múltiples escuelas) */}
      {(() => {
        const uniqueSchools = [...new Set(children.map(child => child.school))];
        
        return uniqueSchools.length > 1 && (
          <div className="filter-section">
            <h3>🔍 Filtrar por escuela</h3>
            <div className="filter-options">
              <button 
                className={`filter-btn ${schoolFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSchoolFilter('all')}
              >
                Todas las escuelas ({children.length})
              </button>
              {uniqueSchools.map(school => {
                const count = children.filter(child => child.school === school).length;
                return (
                  <button 
                    key={school}
                    className={`filter-btn ${schoolFilter === school ? 'active' : ''}`}
                    onClick={() => setSchoolFilter(school)}
                  >
                    {school} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Lista de hijos */}
      <div className="children-grid">
        {children
          .filter(child => schoolFilter === 'all' || child.school === schoolFilter)
          .map(child => (
          <div key={child.id} className="child-profile-card">
            {/* Header de la tarjeta */}
            <div className="child-card-header">
              <div className="child-avatar">
                <span className="avatar-emoji">{child.avatar}</span>
              </div>
              <div className="child-basic-info">
                <h3 className="child-name">{child.name}</h3>
                <div className="child-details">
                  <span className="child-grade">{child.grade}</span>
                  <span className="child-age">{child.age} años</span>
                </div>
                <div className="child-school">
                  <span className="school-icon">🏫</span>
                  <span className="school-name">{child.school}</span>
                  {child.school !== currentSchool?.name && (
                    <span className="school-badge different-school">
                      Otra escuela
                    </span>
                  )}
                </div>
              </div>
              <button 
                className="btn btn-outline btn-sm"
                onClick={() => handleEditChild(child)}
              >
                ✏️ Editar
              </button>
            </div>

            {/* Estadísticas rápidas */}
            <div className="child-quick-stats">
              <div className="quick-stat">
                <span className="stat-icon">📅</span>
                <div className="stat-info">
                  <span className="stat-value">{child.stats.attendanceRate}%</span>
                  <span className="stat-label">Asistencia</span>
                </div>
              </div>
              <div className="quick-stat">
                <span className="stat-icon">⭐</span>
                <div className="stat-info">
                  <span className="stat-value">{child.stats.avgMealRating}</span>
                  <span className="stat-label">Calificación</span>
                </div>
              </div>
              <div className="quick-stat">
                <span className="stat-icon">🔥</span>
                <div className="stat-info">
                  <span className="stat-value">{child.stats.caloriesPerDay}</span>
                  <span className="stat-label">kcal/día</span>
                </div>
              </div>
            </div>

            {/* Información importante */}
            <div className="child-important-info">
              {child.allergies.length > 0 && (
                <div className="info-item allergies">
                  <span className="info-icon">⚠️</span>
                  <div className="info-content">
                    <strong>Alergias:</strong>
                    <div className="info-tags">
                      {child.allergies.map((allergy, index) => (
                        <span key={index} className="info-tag allergy-tag">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {child.medicalConditions.length > 0 && (
                <div className="info-item medical">
                  <span className="info-icon">🏥</span>
                  <div className="info-content">
                    <strong>Condiciones médicas:</strong>
                    <div className="info-tags">
                      {child.medicalConditions.map((condition, index) => (
                        <span key={index} className="info-tag medical-tag">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="info-item preferences">
                <span className="info-icon">❤️</span>
                <div className="info-content">
                  <strong>Preferencias:</strong>
                  <div className="info-tags">
                    {child.preferences.slice(0, 3).map((preference, index) => (
                      <span key={index} className="info-tag preference-tag">
                        {preference}
                      </span>
                    ))}
                    {child.preferences.length > 3 && (
                      <span className="info-tag more-tag">
                        +{child.preferences.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Información física reciente */}
            <div className="child-physical-info">
              <h4>Última medición ({child.stats.lastWeightHeight.date})</h4>
              <div className="physical-stats">
                <div className="physical-stat">
                  <span className="physical-icon">⚖️</span>
                  <span className="physical-value">{child.stats.lastWeightHeight.weight}</span>
                </div>
                <div className="physical-stat">
                  <span className="physical-icon">📏</span>
                  <span className="physical-value">{child.stats.lastWeightHeight.height}</span>
                </div>
              </div>
            </div>

            {/* Comida favorita */}
            <div className="child-favorite-food">
              <span className="favorite-icon">🍽️</span>
              <div className="favorite-info">
                <strong>Comida favorita:</strong>
                <span className="favorite-name">{child.stats.favoriteFood}</span>
              </div>
            </div>

            {/* Actividad reciente */}
            <div className="child-recent-activity">
              <h4>Actividad Reciente</h4>
              <div className="activity-list">
                {child.recentActivity.slice(0, 3).map((activity, index) => (
                  <div key={index} className="activity-item">
                    <span 
                      className="activity-icon"
                      style={{ color: getActivityColor(activity.type) }}
                    >
                      {getActivityIcon(activity.type)}
                    </span>
                    <div className="activity-content">
                      <p className="activity-text">{activity.action}</p>
                      <span className="activity-date">{activity.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contacto de emergencia */}
            <div className="emergency-contact">
              <h4>Contacto de Emergencia</h4>
              <div className="contact-info">
                <span className="contact-icon">📞</span>
                <div className="contact-details">
                  <strong>{child.emergencyContact.name}</strong>
                  <span className="contact-relationship">({child.emergencyContact.relationship})</span>
                  <span className="contact-phone">{child.emergencyContact.phone}</span>
                </div>
              </div>
            </div>

            {/* Acciones de la tarjeta */}
            <div className="child-card-actions">
              <button className="btn btn-outline btn-sm">
                📊 Ver Estadísticas
              </button>
              <button className="btn btn-outline btn-sm">
                🍽️ Historial de Comidas
              </button>
              <button className="btn btn-outline btn-sm">
                💬 Enviar Feedback
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para editar hijo */}
      {showEditModal && selectedChild && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">Editar información de {selectedChild.name}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="child-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre completo:</label>
                    <input 
                      type="text" 
                      defaultValue={selectedChild.name}
                      placeholder="Nombre completo del hijo"
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de nacimiento:</label>
                    <input 
                      type="date" 
                      defaultValue={selectedChild.birthDate}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Grado:</label>
                    <select defaultValue={selectedChild.grade}>
                      <option value="Pre-Kinder">Pre-Kinder</option>
                      <option value="Kinder">Kinder</option>
                      <option value="1° Básico">1° Básico</option>
                      <option value="2° Básico">2° Básico</option>
                      <option value="3° Básico">3° Básico</option>
                      <option value="4° Básico">4° Básico</option>
                      <option value="5° Básico">5° Básico</option>
                      <option value="6° Básico">6° Básico</option>
                      <option value="7° Básico">7° Básico</option>
                      <option value="8° Básico">8° Básico</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Avatar:</label>
                    <select defaultValue={selectedChild.avatar}>
                      <option value="👧">👧 Niña</option>
                      <option value="👦">👦 Niño</option>
                      <option value="🧒">🧒 Niño/a</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Alergias alimentarias:</label>
                  <input 
                    type="text" 
                    defaultValue={selectedChild.allergies.join(', ')}
                    placeholder="Ejemplo: nueces, mariscos, lácteos"
                  />
                  <small>Separa múltiples alergias con comas</small>
                </div>

                <div className="form-group">
                  <label>Condiciones médicas especiales:</label>
                  <input 
                    type="text" 
                    defaultValue={selectedChild.medicalConditions.join(', ')}
                    placeholder="Ejemplo: diabetes, vegetariano, celiaco"
                  />
                  <small>Separa múltiples condiciones con comas</small>
                </div>

                <div className="form-group">
                  <label>Preferencias alimentarias:</label>
                  <textarea 
                    rows="3"
                    defaultValue={selectedChild.preferences.join(', ')}
                    placeholder="Ejemplo: pollo, frutas, verduras verdes"
                  ></textarea>
                  <small>Alimentos que le gustan especialmente</small>
                </div>

                <div className="form-group">
                  <label>Alimentos que no le gustan:</label>
                  <textarea 
                    rows="3"
                    defaultValue={selectedChild.dislikes.join(', ')}
                    placeholder="Ejemplo: brócoli, pescado, coliflor"
                  ></textarea>
                  <small>Alimentos que prefiere evitar</small>
                </div>

                <div className="form-section">
                  <h4>Contacto de Emergencia</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedChild.emergencyContact.name}
                        placeholder="Nombre del contacto"
                      />
                    </div>
                    <div className="form-group">
                      <label>Relación:</label>
                      <select defaultValue={selectedChild.emergencyContact.relationship}>
                        <option value="Madre">Madre</option>
                        <option value="Padre">Padre</option>
                        <option value="Abuela">Abuela</option>
                        <option value="Abuelo">Abuelo</option>
                        <option value="Tía">Tía</option>
                        <option value="Tío">Tío</option>
                        <option value="Hermana">Hermana</option>
                        <option value="Hermano">Hermano</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Teléfono:</label>
                    <input 
                      type="tel" 
                      defaultValue={selectedChild.emergencyContact.phone}
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar hijo */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">Agregar Nuevo Hijo</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="child-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre completo:</label>
                    <input 
                      type="text" 
                      placeholder="Nombre completo del hijo"
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de nacimiento:</label>
                    <input type="date" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Grado:</label>
                    <select>
                      <option value="">Seleccionar grado</option>
                      <option value="Pre-Kinder">Pre-Kinder</option>
                      <option value="Kinder">Kinder</option>
                      <option value="1° Básico">1° Básico</option>
                      <option value="2° Básico">2° Básico</option>
                      <option value="3° Básico">3° Básico</option>
                      <option value="4° Básico">4° Básico</option>
                      <option value="5° Básico">5° Básico</option>
                      <option value="6° Básico">6° Básico</option>
                      <option value="7° Básico">7° Básico</option>
                      <option value="8° Básico">8° Básico</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Avatar:</label>
                    <select>
                      <option value="👧">👧 Niña</option>
                      <option value="👦">👦 Niño</option>
                      <option value="🧒">🧒 Niño/a</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Alergias alimentarias:</label>
                  <input 
                    type="text" 
                    placeholder="Ejemplo: nueces, mariscos, lácteos"
                  />
                  <small>Separa múltiples alergias con comas</small>
                </div>

                <div className="form-group">
                  <label>Condiciones médicas especiales:</label>
                  <input 
                    type="text" 
                    placeholder="Ejemplo: diabetes, vegetariano, celiaco"
                  />
                  <small>Separa múltiples condiciones con comas</small>
                </div>

                <div className="form-section">
                  <h4>Contacto de Emergencia</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre:</label>
                      <input 
                        type="text" 
                        placeholder="Nombre del contacto"
                      />
                    </div>
                    <div className="form-group">
                      <label>Relación:</label>
                      <select>
                        <option value="">Seleccionar relación</option>
                        <option value="Madre">Madre</option>
                        <option value="Padre">Padre</option>
                        <option value="Abuela">Abuela</option>
                        <option value="Abuelo">Abuelo</option>
                        <option value="Tía">Tía</option>
                        <option value="Tío">Tío</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Teléfono:</label>
                    <input 
                      type="tel" 
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Agregar Hijo
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}