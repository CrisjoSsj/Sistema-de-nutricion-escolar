import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function StudentMenus() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Datos de ejemplo del estudiante
  const studentInfo = {
    name: 'Ana María González',
    grade: '3° Básico',
    allergies: ['nueces', 'mariscos'],
    preferences: ['pollo', 'frutas', 'yogurt'],
    avatar: '👧'
  };

  // Datos de ejemplo de menús
  const menuData = {
    '2025-10-09': {
      breakfast: {
        name: 'Avena con frutas del bosque',
        description: 'Avena integral cocida con leche, arándanos, fresas y una pizca de miel',
        calories: 280,
        allergens: ['lácteos'],
        time: '08:00 - 09:00',
        nutrients: { protein: 12, carbs: 45, fat: 6, fiber: 8 },
        rating: 0,
        consumed: false,
        image: '🥣'
      },
      lunch: {
        name: 'Pollo a la plancha con quinoa',
        description: 'Pechuga de pollo marinada a la plancha, quinoa cocida con verduras y ensalada fresca',
        calories: 420,
        allergens: [],
        time: '12:30 - 13:30',
        nutrients: { protein: 32, carbs: 35, fat: 12, fiber: 6 },
        rating: 0,
        consumed: false,
        image: '🍗'
      },
      snack: {
        name: 'Yogurt con granola',
        description: 'Yogurt natural con granola casera, miel y trocitos de manzana',
        calories: 180,
        allergens: ['lácteos'],
        time: '15:30 - 16:00',
        nutrients: { protein: 8, carbs: 24, fat: 6, fiber: 4 },
        rating: 0,
        consumed: false,
        image: '🥛'
      }
    },
    '2025-10-10': {
      breakfast: {
        name: 'Tostadas integrales con palta',
        description: 'Pan integral tostado con palta machacada, tomate cherry y huevo revuelto',
        calories: 320,
        allergens: ['gluten', 'huevos'],
        time: '08:00 - 09:00',
        nutrients: { protein: 15, carbs: 28, fat: 18, fiber: 7 },
        rating: 0,
        consumed: false,
        image: '🥑'
      },
      lunch: {
        name: 'Pescado al vapor con vegetales',
        description: 'Filete de pescado al vapor con brócoli, zanahoria y arroz integral',
        calories: 380,
        allergens: ['pescado'],
        time: '12:30 - 13:30',
        nutrients: { protein: 28, carbs: 32, fat: 10, fiber: 8 },
        rating: 0,
        consumed: false,
        image: '🐟'
      },
      snack: {
        name: 'Frutas de temporada',
        description: 'Mix de frutas frescas: manzana, pera, uvas y naranjas',
        calories: 120,
        allergens: [],
        time: '15:30 - 16:00',
        nutrients: { protein: 2, carbs: 28, fat: 0, fiber: 6 },
        rating: 0,
        consumed: false,
        image: '🍎'
      }
    }
  };

  const todayMenu = menuData[selectedDate] || {};

  const hasAllergyWarning = (meal) => {
    return meal.allergens.some(allergen => 
      studentInfo.allergies.some(studentAllergen => 
        allergen.toLowerCase().includes(studentAllergen.toLowerCase())
      )
    );
  };

  const getMealStatus = (meal) => {
    if (meal.consumed) return 'consumed';
    if (hasAllergyWarning(meal)) return 'warning';
    return 'available';
  };

  const getMealStatusIcon = (meal) => {
    const status = getMealStatus(meal);
    const icons = {
      consumed: '✅',
      warning: '⚠️',
      available: '🍽️'
    };
    return icons[status];
  };

  const getMealStatusText = (meal) => {
    const status = getMealStatus(meal);
    const texts = {
      consumed: 'Ya consumiste esta comida',
      warning: '¡Atención! Contiene alérgenos',
      available: 'Disponible para consumir'
    };
    return texts[status];
  };

  const handleRating = (mealType, rating) => {
    // Simular calificación de comida
    console.log(`Calificando ${mealType} con ${rating} estrellas`);
  };

  const markAsConsumed = (mealType) => {
    // Simular marcar como consumido
    console.log(`Marcando ${mealType} como consumido`);
  };

  const getStarRating = (currentRating, mealType) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < currentRating ? 'filled' : 'empty'}`}
        onClick={() => handleRating(mealType, index + 1)}
        style={{ cursor: 'pointer', fontSize: '20px' }}
      >
        {index < currentRating ? '⭐' : '☆'}
      </span>
    ));
  };

  const getTotalCalories = () => {
    return Object.values(todayMenu).reduce((total, meal) => total + meal.calories, 0);
  };

  const getTotalNutrients = () => {
    const totals = { protein: 0, carbs: 0, fat: 0, fiber: 0 };
    Object.values(todayMenu).forEach(meal => {
      totals.protein += meal.nutrients.protein;
      totals.carbs += meal.nutrients.carbs;
      totals.fat += meal.nutrients.fat;
      totals.fiber += meal.nutrients.fiber;
    });
    return totals;
  };

  const mealTypes = [
    { key: 'breakfast', name: 'Desayuno', icon: '🌅' },
    { key: 'lunch', name: 'Almuerzo', icon: '🍽️' },
    { key: 'snack', name: 'Colación', icon: '🍎' }
  ];

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">
          {studentInfo.avatar} ¡Hola {studentInfo.name.split(' ')[0]}!
        </h1>
        <p className="page-description">Aquí están tus menús de hoy. ¡A disfrutar la comida!</p>
      </div>

      {/* Selector de fecha */}
      <div className="date-selector">
        <label>Ver menú de:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-input"
        />
      </div>

      {/* Resumen del día */}
      <div className="daily-summary">
        <h2>Resumen del día</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <div className="card-icon">🔥</div>
            <div className="card-content">
              <h3>Calorías totales</h3>
              <p className="card-value">{getTotalCalories()} kcal</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon">🥩</div>
            <div className="card-content">
              <h3>Proteína</h3>
              <p className="card-value">{getTotalNutrients().protein}g</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon">🌾</div>
            <div className="card-content">
              <h3>Fibra</h3>
              <p className="card-value">{getTotalNutrients().fiber}g</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="card-icon">🍽️</div>
            <div className="card-content">
              <h3>Comidas</h3>
              <p className="card-value">{Object.keys(todayMenu).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menús del día */}
      <div className="meals-of-day">
        {Object.keys(todayMenu).length === 0 ? (
          <div className="no-menu">
            <div className="no-menu-icon">🍽️</div>
            <h3>No hay menú disponible</h3>
            <p>No se encontró menú para la fecha seleccionada.</p>
          </div>
        ) : (
          <div className="meals-grid">
            {mealTypes.map(mealType => {
              const meal = todayMenu[mealType.key];
              if (!meal) return null;

              return (
                <div key={mealType.key} className={`meal-card ${getMealStatus(meal)}`}>
                  {/* Header de la comida */}
                  <div className="meal-header">
                    <div className="meal-type">
                      <span className="meal-icon">{mealType.icon}</span>
                      <h3 className="meal-name">{mealType.name}</h3>
                    </div>
                    <div className="meal-status">
                      <span className="status-icon">{getMealStatusIcon(meal)}</span>
                    </div>
                  </div>

                  {/* Imagen y info básica */}
                  <div className="meal-main">
                    <div className="meal-image">
                      <span className="food-emoji">{meal.image}</span>
                    </div>
                    <div className="meal-info">
                      <h4 className="dish-name">{meal.name}</h4>
                      <p className="dish-description">{meal.description}</p>
                      <div className="meal-time">
                        <span className="time-icon">🕐</span>
                        <span className="time-text">{meal.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Alertas de alergia */}
                  {hasAllergyWarning(meal) && (
                    <div className="allergy-alert">
                      <span className="alert-icon">⚠️</span>
                      <div className="alert-content">
                        <strong>¡Atención!</strong>
                        <p>Esta comida contiene {meal.allergens.join(', ')} y tienes alergia registrada.</p>
                        <button className="btn btn-warning btn-sm">
                          Ver alternativas
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Información nutricional */}
                  <div className="nutrition-info">
                    <h5>Información Nutricional</h5>
                    <div className="nutrition-grid">
                      <div className="nutrition-item">
                        <span className="nutrition-icon">🔥</span>
                        <div className="nutrition-data">
                          <span className="nutrition-value">{meal.calories}</span>
                          <span className="nutrition-label">kcal</span>
                        </div>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-icon">🥩</span>
                        <div className="nutrition-data">
                          <span className="nutrition-value">{meal.nutrients.protein}g</span>
                          <span className="nutrition-label">Proteína</span>
                        </div>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-icon">🌾</span>
                        <div className="nutrition-data">
                          <span className="nutrition-value">{meal.nutrients.carbs}g</span>
                          <span className="nutrition-label">Carbohidratos</span>
                        </div>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-icon">🥑</span>
                        <div className="nutrition-data">
                          <span className="nutrition-value">{meal.nutrients.fat}g</span>
                          <span className="nutrition-label">Grasas</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estado y acciones */}
                  <div className="meal-status-section">
                    <p className="status-text">{getMealStatusText(meal)}</p>
                    
                    {!meal.consumed && !hasAllergyWarning(meal) && (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => markAsConsumed(mealType.key)}
                      >
                        ✅ Marcar como consumido
                      </button>
                    )}
                  </div>

                  {/* Calificación */}
                  <div className="meal-rating">
                    <h5>¿Qué te pareció?</h5>
                    <div className="rating-stars">
                      {getStarRating(meal.rating, mealType.key)}
                    </div>
                    <div className="rating-actions">
                      <button className="btn btn-outline btn-sm">
                        ❤️ Agregar a favoritos
                      </button>
                      <button className="btn btn-outline btn-sm">
                        💬 Comentar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Información personal */}
      <div className="student-info">
        <h3>Tu información</h3>
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">⚠️</div>
            <div className="info-content">
              <h4>Tus alergias</h4>
              <div className="allergy-tags">
                {studentInfo.allergies.map((allergy, index) => (
                  <span key={index} className="allergy-tag">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">❤️</div>
            <div className="info-content">
              <h4>Te gusta</h4>
              <div className="preference-tags">
                {studentInfo.preferences.map((preference, index) => (
                  <span key={index} className="preference-tag">
                    {preference}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consejos divertidos */}
      <div className="daily-tips">
        <h3>🌟 Consejo del día</h3>
        <div className="tip-card">
          <div className="tip-icon">💡</div>
          <div className="tip-content">
            <h4>¡Prueba algo nuevo!</h4>
            <p>Hoy es un buen día para probar un alimento que nunca has comido. ¡Te podría sorprender lo delicioso que puede ser!</p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="quick-actions">
        <button className="action-btn">
          🍽️ Ver menú de mañana
        </button>
        <button className="action-btn">
          ❤️ Mis comidas favoritas
        </button>
        <button className="action-btn">
          💬 Enviar comentario
        </button>
        <button className="action-btn">
          📊 Mi progreso nutricional
        </button>
      </div>
    </DashboardLayout>
  );
}