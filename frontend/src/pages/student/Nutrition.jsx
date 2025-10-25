import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function StudentNutrition() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Datos de ejemplo del estudiante
  const studentInfo = {
    name: 'Ana María González',
    age: 8,
    grade: '3° Básico',
    avatar: '👧'
  };

  // Datos nutricionales de ejemplo
  const nutritionData = {
    currentWeek: {
      caloriesTarget: 1200,
      caloriesConsumed: 1150,
      nutrients: {
        protein: { consumed: 58, target: 65, unit: 'g' },
        carbs: { consumed: 172, target: 180, unit: 'g' },
        fat: { consumed: 48, target: 55, unit: 'g' },
        fiber: { consumed: 22, target: 25, unit: 'g' },
        calcium: { consumed: 950, target: 1000, unit: 'mg' },
        iron: { consumed: 12, target: 15, unit: 'mg' },
        vitaminC: { consumed: 85, target: 75, unit: 'mg' }
      },
      dailyIntake: [
        { day: 'Lun', calories: 1180, mood: '😊', energy: 'high' },
        { day: 'Mar', calories: 1220, mood: '😄', energy: 'high' },
        { day: 'Mié', calories: 1100, mood: '😐', energy: 'medium' },
        { day: 'Jue', calories: 1180, mood: '😊', energy: 'high' },
        { day: 'Vie', calories: 1160, mood: '😍', energy: 'high' },
        { day: 'Sáb', calories: 1090, mood: '😐', energy: 'medium' },
        { day: 'Dom', calories: 1120, mood: '😊', energy: 'medium' }
      ],
      hydration: {
        glasses: 6,
        target: 8,
        percentage: 75
      },
      physicalActivity: {
        steps: 8500,
        target: 8000,
        activities: ['Educación Física', 'Recreo activo', 'Caminar a casa']
      }
    },
    achievements: [
      {
        id: 1,
        title: '🏆 Semana Completa',
        description: 'Completaste todos los menús de la semana',
        earned: true,
        date: '2025-10-06'
      },
      {
        id: 2,
        title: '🥗 Explorador de Verduras',
        description: 'Probaste 5 verduras diferentes esta semana',
        earned: true,
        date: '2025-10-04'
      },
      {
        id: 3,
        title: '💧 Hidratación Perfecta',
        description: 'Tomaste suficiente agua por 3 días seguidos',
        earned: false,
        progress: 2
      },
      {
        id: 4,
        title: '⭐ Crítico Gastronómico',
        description: 'Califica 10 comidas diferentes',
        earned: false,
        progress: 7
      }
    ],
    personalGoals: [
      {
        id: 1,
        title: 'Comer más frutas',
        target: 2,
        current: 1.5,
        unit: 'porciones/día',
        color: '#FF6B6B'
      },
      {
        id: 2,
        title: 'Tomar más agua',
        target: 8,
        current: 6,
        unit: 'vasos/día',
        color: '#4ECDC4'
      },
      {
        id: 3,
        title: 'Probar nuevas comidas',
        target: 2,
        current: 1,
        unit: 'por semana',
        color: '#45B7D1'
      }
    ]
  };

  const getNutrientStatus = (consumed, target) => {
    const percentage = (consumed / target) * 100;
    if (percentage >= 95) return 'excellent';
    if (percentage >= 80) return 'good';
    if (percentage >= 60) return 'warning';
    return 'poor';
  };

  const getNutrientColor = (status) => {
    const colors = {
      excellent: '#4CAF50',
      good: '#8BC34A',
      warning: '#FF9800',
      poor: '#F44336'
    };
    return colors[status] || '#666';
  };

  const getEnergyIcon = (energy) => {
    const icons = {
      high: '⚡',
      medium: '🔋',
      low: '🪫'
    };
    return icons[energy] || '🔋';
  };

  const getEnergyColor = (energy) => {
    const colors = {
      high: '#4CAF50',
      medium: '#FF9800',
      low: '#F44336'
    };
    return colors[energy] || '#666';
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">
          {studentInfo.avatar} Mi Nutrición
        </h1>
        <p className="page-description">¡Descubre cómo está tu cuerpo y qué tan bien te estás alimentando!</p>
      </div>

      {/* Resumen diario */}
      <div className="nutrition-summary">
        <h2>¿Cómo vas hoy?</h2>
        <div className="summary-cards">
          <div className="summary-card energy">
            <div className="card-icon">⚡</div>
            <div className="card-content">
              <h3>Tu energía</h3>
              <div className="energy-level high">
                <span className="energy-emoji">😄</span>
                <span className="energy-text">¡Súper energético!</span>
              </div>
            </div>
          </div>

          <div className="summary-card calories">
            <div className="card-icon">🔥</div>
            <div className="card-content">
              <h3>Calorías</h3>
              <div className="calorie-progress">
                <span className="calorie-number">{nutritionData.currentWeek.caloriesConsumed}</span>
                <span className="calorie-target">/ {nutritionData.currentWeek.caloriesTarget}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${(nutritionData.currentWeek.caloriesConsumed / nutritionData.currentWeek.caloriesTarget) * 100}%`,
                    backgroundColor: '#4CAF50'
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="summary-card hydration">
            <div className="card-icon">💧</div>
            <div className="card-content">
              <h3>Agua tomada</h3>
              <div className="water-glasses">
                {Array.from({ length: 8 }, (_, index) => (
                  <span 
                    key={index} 
                    className={`water-glass ${index < nutritionData.currentWeek.hydration.glasses ? 'filled' : 'empty'}`}
                  >
                    {index < nutritionData.currentWeek.hydration.glasses ? '💧' : '🥛'}
                  </span>
                ))}
              </div>
              <p>{nutritionData.currentWeek.hydration.glasses}/8 vasos</p>
            </div>
          </div>

          <div className="summary-card activity">
            <div className="card-icon">🏃‍♀️</div>
            <div className="card-content">
              <h3>Actividad</h3>
              <div className="steps-counter">
                <span className="steps-number">{nutritionData.currentWeek.physicalActivity.steps.toLocaleString()}</span>
                <span className="steps-label">pasos hoy</span>
              </div>
              <div className="activity-status">
                {nutritionData.currentWeek.physicalActivity.steps >= nutritionData.currentWeek.physicalActivity.target ? '🎉 ¡Meta alcanzada!' : '👍 ¡Sigue así!'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrientes de la semana */}
      <div className="nutrients-section">
        <h3>🥗 Tus nutrientes esta semana</h3>
        <p className="section-description">Los nutrientes son como superpoderes para tu cuerpo</p>
        
        <div className="nutrients-grid">
          {Object.entries(nutritionData.currentWeek.nutrients).map(([nutrient, data]) => {
            const status = getNutrientStatus(data.consumed, data.target);
            const percentage = Math.round((data.consumed / data.target) * 100);
            
            return (
              <div key={nutrient} className="nutrient-card">
                <div className="nutrient-header">
                  <div className="nutrient-icon">
                    {nutrient === 'protein' && '🥩'}
                    {nutrient === 'carbs' && '🍞'}
                    {nutrient === 'fat' && '🥑'}
                    {nutrient === 'fiber' && '🌾'}
                    {nutrient === 'calcium' && '🥛'}
                    {nutrient === 'iron' && '🔧'}
                    {nutrient === 'vitaminC' && '🍊'}
                  </div>
                  <h4 className="nutrient-name">
                    {nutrient === 'protein' && 'Proteína'}
                    {nutrient === 'carbs' && 'Energía'}
                    {nutrient === 'fat' && 'Grasas buenas'}
                    {nutrient === 'fiber' && 'Fibra'}
                    {nutrient === 'calcium' && 'Calcio'}
                    {nutrient === 'iron' && 'Hierro'}
                    {nutrient === 'vitaminC' && 'Vitamina C'}
                  </h4>
                </div>

                <div className="nutrient-progress">
                  <div className="progress-circle">
                    <div 
                      className="progress-ring"
                      style={{ 
                        background: `conic-gradient(${getNutrientColor(status)} ${percentage * 3.6}deg, #e0e0e0 0deg)`
                      }}
                    >
                      <div className="progress-center">
                        <span className="progress-percentage">{percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="nutrient-info">
                  <p className="nutrient-description">
                    {nutrient === 'protein' && 'Te ayuda a crecer fuerte'}
                    {nutrient === 'carbs' && 'Te da energía para jugar'}
                    {nutrient === 'fat' && 'Buenas para tu cerebro'}
                    {nutrient === 'fiber' && 'Ayuda a tu digestión'}
                    {nutrient === 'calcium' && 'Hace tus huesos súper fuertes'}
                    {nutrient === 'iron' && 'Te ayuda a no cansarte'}
                    {nutrient === 'vitaminC' && 'Te protege de enfermarte'}
                  </p>
                  <div className="nutrient-status">
                    {status === 'excellent' && '🌟 ¡Perfecto!'}
                    {status === 'good' && '👍 ¡Muy bien!'}
                    {status === 'warning' && '💪 Puedes mejorar'}
                    {status === 'poor' && '🎯 Necesitas más'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráfico de energía semanal */}
      <div className="energy-chart">
        <h3>⚡ Tu energía durante la semana</h3>
        <div className="chart-container">
          <div className="energy-bars">
            {nutritionData.currentWeek.dailyIntake.map((day, index) => (
              <div key={index} className="day-energy">
                <div className="energy-bar-container">
                  <div 
                    className="energy-bar"
                    style={{ 
                      height: `${(day.calories / 1300) * 100}%`,
                      backgroundColor: getEnergyColor(day.energy)
                    }}
                  ></div>
                </div>
                <div className="day-info">
                  <div className="day-mood">{day.mood}</div>
                  <div className="day-name">{day.day}</div>
                  <div className="day-energy-icon">{getEnergyIcon(day.energy)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metas personales */}
      <div className="personal-goals">
        <h3>🎯 Tus metas personales</h3>
        <div className="goals-grid">
          {nutritionData.personalGoals.map(goal => (
            <div key={goal.id} className="goal-card">
              <div className="goal-header">
                <h4>{goal.title}</h4>
                <div className="goal-progress-text">
                  {goal.current}/{goal.target} {goal.unit}
                </div>
              </div>
              
              <div className="goal-progress-bar">
                <div 
                  className="goal-fill"
                  style={{ 
                    width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                    backgroundColor: goal.color
                  }}
                ></div>
              </div>
              
              <div className="goal-status">
                {goal.current >= goal.target ? (
                  <span className="goal-complete">🎉 ¡Meta cumplida!</span>
                ) : (
                  <span className="goal-pending">
                    Te faltan {(goal.target - goal.current).toFixed(1)} {goal.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logros */}
      <div className="achievements">
        <h3>🏆 Tus logros</h3>
        <div className="achievements-grid">
          {nutritionData.achievements.map(achievement => (
            <div key={achievement.id} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
              <div className="achievement-icon">
                {achievement.earned ? achievement.title.split(' ')[0] : '🔒'}
              </div>
              <div className="achievement-content">
                <h4>{achievement.title.slice(2)}</h4>
                <p>{achievement.description}</p>
                {achievement.earned ? (
                  <div className="achievement-date">
                    Conseguido el {achievement.date}
                  </div>
                ) : (
                  <div className="achievement-progress">
                    {achievement.progress && (
                      <span>Progreso: {achievement.progress}/{achievement.title.includes('10') ? '10' : '3'}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consejos personalizados */}
      <div className="nutrition-tips">
        <h3>💡 Consejos especiales para ti</h3>
        <div className="tips-grid">
          <div className="tip-card success">
            <div className="tip-icon">🌟</div>
            <div className="tip-content">
              <h4>¡Súper trabajo con la vitamina C!</h4>
              <p>Estás comiendo muchas frutas y verduras. ¡Tu cuerpo está súper protegido contra los resfriados!</p>
            </div>
          </div>
          
          <div className="tip-card warning">
            <div className="tip-icon">💪</div>
            <div className="tip-content">
              <h4>Un poquito más de hierro</h4>
              <p>Come más lentejas, espinacas o carne para tener más energía durante el día. ¡Te ayudarán a no cansarte!</p>
            </div>
          </div>
          
          <div className="tip-card info">
            <div className="tip-icon">💧</div>
            <div className="tip-content">
              <h4>¡A tomar más agua!</h4>
              <p>Trata de tomar 2 vasos más de agua cada día. Te ayudará a concentrarte mejor en clases.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparación divertida */}
      <div className="fun-comparison">
        <h3>🎈 ¿Sabías que...?</h3>
        <div className="comparison-cards">
          <div className="comparison-card">
            <div className="comparison-icon">🦴</div>
            <div className="comparison-content">
              <h4>Tu calcio esta semana</h4>
              <p>¡Es como si hubieras tomado <strong>4.75 vasos de leche</strong> para tener huesos súper fuertes!</p>
            </div>
          </div>
          
          <div className="comparison-card">
            <div className="comparison-icon">🏃‍♀️</div>
            <div className="comparison-content">
              <h4>Tu energía diaria</h4>
              <p>Con {nutritionData.currentWeek.caloriesConsumed} calorías puedes <strong>correr por 2 horas</strong> o <strong>estudiar todo el día</strong>!</p>
            </div>
          </div>
          
          <div className="comparison-card">
            <div className="comparison-icon">🍎</div>
            <div className="comparison-content">
              <h4>Tu fibra</h4>
              <p>¡Es como si hubieras comido <strong>7 manzanas</strong> para que tu pancita funcione súper bien!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="quick-actions">
        <button className="action-btn">
          📊 Ver mi progreso del mes
        </button>
        <button className="action-btn">
          🎯 Crear nueva meta
        </button>
        <button className="action-btn">
          🍽️ Ver menú de mañana
        </button>
        <button className="action-btn">
          👨‍👩‍👧‍👦 Compartir con mis papás
        </button>
      </div>
    </DashboardLayout>
  );
}