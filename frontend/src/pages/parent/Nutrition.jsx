import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';
import '../../styles/parent/Nutrition.css';

export default function ParentNutrition() {
  const [selectedChild, setSelectedChild] = useState('1');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Datos de ejemplo de hijos
  const children = [
    { id: '1', name: 'Ana María', age: 8, grade: '3° Básico' },
    { id: '2', name: 'Carlos José', age: 10, grade: '5° Básico' }
  ];

  // Datos nutricionales de ejemplo
  const nutritionData = {
    '1': {
      currentWeek: {
        caloriesConsumed: 8400,
        caloriesTarget: 8400,
        nutrients: {
          protein: { consumed: 420, target: 455, unit: 'g' },
          carbs: { consumed: 1260, target: 1225, unit: 'g' },
          fat: { consumed: 350, target: 385, unit: 'g' },
          fiber: { consumed: 168, target: 175, unit: 'g' },
          calcium: { consumed: 6300, target: 7000, unit: 'mg' },
          iron: { consumed: 77, target: 105, unit: 'mg' },
          vitaminC: { consumed: 525, target: 525, unit: 'mg' }
        },
        dailyIntake: [
          { day: 'Lunes', calories: 1150, protein: 58, carbs: 172, fat: 48 },
          { day: 'Martes', calories: 1220, protein: 62, carbs: 183, fat: 52 },
          { day: 'Miércoles', calories: 1100, protein: 55, carbs: 165, fat: 45 },
          { day: 'Jueves', calories: 1280, protein: 68, carbs: 192, fat: 58 },
          { day: 'Viernes', calories: 1190, protein: 60, carbs: 178, fat: 50 },
          { day: 'Sábado', calories: 1230, protein: 61, carbs: 185, fat: 53 },
          { day: 'Domingo', calories: 1230, protein: 56, carbs: 185, fat: 44 }
        ],
        mealDistribution: {
          breakfast: 25,
          lunch: 45,
          snack: 20,
          dinner: 10
        },
        hydration: {
          waterGoal: 1400, // ml
          waterConsumed: 1200,
          daysMetGoal: 5
        }
      },
      recommendations: [
        {
          type: 'warning',
          icon: '⚠️',
          title: 'Bajo consumo de hierro',
          message: 'Ana María está consumiendo solo el 73% del hierro recomendado. Incluye más carnes rojas, espinacas y legumbres.',
          priority: 'high'
        },
        {
          type: 'warning',
          icon: '🥛',
          title: 'Calcio por debajo del objetivo',
          message: 'El consumo de calcio está en 90%. Asegúrate de que consuma lácteos o alternativas fortificadas.',
          priority: 'medium'
        },
        {
          type: 'success',
          icon: '✅',
          title: 'Excelente consumo de vitamina C',
          message: 'Ana María está cumpliendo perfectamente con sus necesidades de vitamina C.',
          priority: 'low'
        },
        {
          type: 'info',
          icon: '💧',
          title: 'Hidratación mejorable',
          message: 'Solo alcanzó la meta de hidratación 5 de 7 días. Recuerda que debe beber al menos 1.4L de agua diarios.',
          priority: 'medium'
        }
      ],
      growthData: [
        { month: 'Enero', weight: 26.5, height: 122 },
        { month: 'Febrero', weight: 26.8, height: 122 },
        { month: 'Marzo', weight: 27.1, height: 123 },
        { month: 'Abril', weight: 27.3, height: 123 },
        { month: 'Mayo', weight: 27.6, height: 124 },
        { month: 'Junio', weight: 27.9, height: 124 },
        { month: 'Julio', weight: 28.1, height: 125 },
        { month: 'Agosto', weight: 28.3, height: 125 },
        { month: 'Septiembre', weight: 28.5, height: 125 }
      ]
    }
  };

  const selectedChildData = nutritionData[selectedChild];
  const selectedChildInfo = children.find(c => c.id === selectedChild);

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

  const getRecommendationColor = (type) => {
    const colors = {
      success: 'var(--success-100)',
      warning: 'var(--warning-100)',
      info: 'var(--primary-100)',
      error: 'var(--error-100)'
    };
    return colors[type] || 'var(--gray-100)';
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="parent-nutrition">
        <div className="page-header">
          <h1 className="page-title">Seguimiento Nutricional</h1>
          <p className="page-description">Monitorea el progreso nutricional de tus hijos</p>
        </div>

      {/* Selectores */}
      <div className="nutrition-controls">
        <div className="control-group">
          <label>Hijo:</label>
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="child-selector"
          >
            {children.map(child => (
              <option key={child.id} value={child.id}>
                {child.name} ({child.grade})
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Período:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
          </select>
        </div>
      </div>

      {/* Resumen general */}
      <div className="nutrition-summary">
        <h2>Resumen Nutricional - {selectedChildInfo?.name}</h2>
        <div className="summary-cards">
          <div className="summary-card calories">
            <div className="card-icon">🔥</div>
            <div className="card-content">
              <h3>Calorías Diarias</h3>
              <div className="card-value">
                {Math.round(selectedChildData.currentWeek.caloriesConsumed / 7)} / {Math.round(selectedChildData.currentWeek.caloriesTarget / 7)}
              </div>
              <div className="card-label">kcal promedio</div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${(selectedChildData.currentWeek.caloriesConsumed / selectedChildData.currentWeek.caloriesTarget) * 100}%`,
                    backgroundColor: '#4CAF50'
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="summary-card hydration">
            <div className="card-icon">💧</div>
            <div className="card-content">
              <h3>Hidratación</h3>
              <div className="card-value">
                {selectedChildData.currentWeek.hydration.waterConsumed} / {selectedChildData.currentWeek.hydration.waterGoal}
              </div>
              <div className="card-label">ml promedio/día</div>
              <div className="hydration-days">
                {selectedChildData.currentWeek.hydration.daysMetGoal}/7 días cumplidos
              </div>
            </div>
          </div>

          <div className="summary-card meals">
            <div className="card-icon">🍽️</div>
            <div className="card-content">
              <h3>Distribución de Comidas</h3>
              <div className="meal-distribution">
                <div className="meal-item">
                  <span className="meal-name">Desayuno</span>
                  <span className="meal-percentage">{selectedChildData.currentWeek.mealDistribution.breakfast}%</span>
                </div>
                <div className="meal-item">
                  <span className="meal-name">Almuerzo</span>
                  <span className="meal-percentage">{selectedChildData.currentWeek.mealDistribution.lunch}%</span>
                </div>
                <div className="meal-item">
                  <span className="meal-name">Colación</span>
                  <span className="meal-percentage">{selectedChildData.currentWeek.mealDistribution.snack}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Análisis de nutrientes */}
      <div className="nutrients-analysis">
        <h3>Análisis de Nutrientes (Semana Actual)</h3>
        <div className="nutrients-grid">
          {Object.entries(selectedChildData.currentWeek.nutrients).map(([nutrient, data]) => {
            const status = getNutrientStatus(data.consumed, data.target);
            const percentage = Math.round((data.consumed / data.target) * 100);
            
            return (
              <div key={nutrient} className="nutrient-card">
                <div className="nutrient-header">
                  <h4 className="nutrient-name">
                    {nutrient === 'protein' && '🥩 Proteína'}
                    {nutrient === 'carbs' && '🌾 Carbohidratos'}
                    {nutrient === 'fat' && '🥑 Grasas'}
                    {nutrient === 'fiber' && '🌿 Fibra'}
                    {nutrient === 'calcium' && '🥛 Calcio'}
                    {nutrient === 'iron' && '⚡ Hierro'}
                    {nutrient === 'vitaminC' && '🍊 Vitamina C'}
                  </h4>
                  <span className={`status-badge ${status}`}>
                    {percentage}%
                  </span>
                </div>
                
                <div className="nutrient-values">
                  <div className="value-row">
                    <span>Consumido:</span>
                    <span>{data.consumed}{data.unit}</span>
                  </div>
                  <div className="value-row">
                    <span>Objetivo:</span>
                    <span>{data.target}{data.unit}</span>
                  </div>
                </div>
                
                <div className="nutrient-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: getNutrientColor(status)
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gráfico de consumo diario */}
      <div className="daily-intake-chart">
        <h3>Consumo Diario de Calorías</h3>
        <div className="chart-container">
          <div className="chart-bars">
            {selectedChildData.currentWeek.dailyIntake.map((day, index) => (
              <div key={index} className="day-bar">
                <div className="bar-container">
                  <div 
                    className="calorie-bar"
                    style={{ 
                      height: `${(day.calories / 1400) * 100}%`,
                      backgroundColor: day.calories >= 1200 ? '#4CAF50' : '#FF9800'
                    }}
                  ></div>
                </div>
                <div className="day-info">
                  <div className="day-name">{day.day}</div>
                  <div className="day-calories">{day.calories} kcal</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color good"></span>
              <span>Objetivo alcanzado (≥1200 kcal)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color warning"></span>
              <span>Por debajo del objetivo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crecimiento físico */}
      <div className="growth-tracking">
        <h3>Seguimiento de Crecimiento - {selectedChildInfo?.name}</h3>
        <div className="growth-chart">
          <div className="growth-metrics">
            <div className="growth-line weight-line">
              <h4>📊 Peso (kg)</h4>
              <div className="metric-chart">
                {selectedChildData.growthData.slice(-6).map((data, index) => (
                  <div key={index} className="metric-point">
                    <div 
                      className="point-bar"
                      style={{ 
                        height: `${(data.weight / 30) * 100}%`,
                        backgroundColor: '#2196F3'
                      }}
                    ></div>
                    <div className="point-label">
                      <div className="point-month">{data.month.slice(0, 3)}</div>
                      <div className="point-value">{data.weight}kg</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="growth-line height-line">
              <h4>📏 Altura (cm)</h4>
              <div className="metric-chart">
                {selectedChildData.growthData.slice(-6).map((data, index) => (
                  <div key={index} className="metric-point">
                    <div 
                      className="point-bar"
                      style={{ 
                        height: `${((data.height - 120) / 10) * 100}%`,
                        backgroundColor: '#4CAF50'
                      }}
                    ></div>
                    <div className="point-label">
                      <div className="point-month">{data.month.slice(0, 3)}</div>
                      <div className="point-value">{data.height}cm</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="growth-summary">
            <div className="growth-stat">
              <span className="stat-icon">📈</span>
              <div className="stat-info">
                <span className="stat-label">Crecimiento (último mes)</span>
                <span className="stat-value">+0.2kg / +0cm</span>
              </div>
            </div>
            <div className="growth-stat">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-label">IMC actual</span>
                <span className="stat-value">18.2 (Normal)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="nutrition-recommendations">
        <h3>Recomendaciones Personalizadas</h3>
        <div className="recommendations-list">
          {selectedChildData.recommendations.map((rec, index) => (
            <div 
              key={index} 
              className={`recommendation-card ${rec.type} priority-${rec.priority}`}
              style={{ backgroundColor: getRecommendationColor(rec.type) }}
            >
              <div className="rec-icon">{rec.icon}</div>
              <div className="rec-content">
                <h4 className="rec-title">{rec.title}</h4>
                <p className="rec-message">{rec.message}</p>
              </div>
              <div className={`rec-priority ${rec.priority}`}>
                {rec.priority === 'high' && '🔴 Alta'}
                {rec.priority === 'medium' && '🟡 Media'}
                {rec.priority === 'low' && '🟢 Baja'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="nutrition-actions">
        <button className="btn btn-primary">
          📊 Descargar Reporte Completo
        </button>
        <button className="btn btn-outline">
          📧 Recibir Resumen Semanal
        </button>
        <button className="btn btn-outline">
          👨‍⚕️ Consultar con Nutricionista
        </button>
        <button className="btn btn-outline">
          📱 Configurar Recordatorios
        </button>
      </div>
      </div>
    </DashboardLayout>
  );
}