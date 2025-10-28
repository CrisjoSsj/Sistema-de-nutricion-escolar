import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import '../../styles/nutritionist/Nutrition.css';
import { useState } from 'react';

export default function NutritionistNutrition() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('calories');

  // Datos de ejemplo para análisis nutricional
  const nutritionData = {
    weekly: {
      calories: {
        target: 485,
        average: 478,
        daily: [465, 495, 470, 485, 492, 445, 475],
        status: 'good'
      },
      proteins: {
        target: 25,
        average: 24.2,
        daily: [23, 26, 24, 25, 26, 22, 23],
        status: 'good'
      },
      carbs: {
        target: 65,
        average: 68.5,
        daily: [70, 65, 72, 68, 67, 69, 69],
        status: 'warning'
      },
      fats: {
        target: 15,
        average: 14.8,
        daily: [15, 14, 16, 15, 14, 13, 16],
        status: 'good'
      }
    },
    distribution: {
      proteins: 20.1,
      carbs: 57.2,
      fats: 22.7
    },
    compliance: {
      caloriesInRange: 85,
      proteinAdequate: 92,
      lowSodium: 78,
      highFiber: 65
    }
  };

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return '#059669';
      case 'warning': return '#d97706';
      case 'danger': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'good': return '✅';
      case 'warning': return '⚠️';
      case 'danger': return '❌';
      default: return '➖';
    }
  };

  const getMetricUnit = (metric) => {
    switch (metric) {
      case 'calories': return 'kcal';
      case 'proteins': return 'g';
      case 'carbs': return 'g';
      case 'fats': return 'g';
      default: return '';
    }
  };

  const currentData = nutritionData.weekly[selectedMetric];

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="nutritionist-nutrition">
        <div className="page-header">
          <h1 className="page-title">Análisis Nutricional</h1>
          <p className="page-description">Monitorea el cumplimiento de los estándares nutricionales en tus menús</p>
        </div>

      {/* Resumen de cumplimiento */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3 className="stat-number">{nutritionData.compliance.caloriesInRange}%</h3>
            <p className="stat-label">Calorías en Rango</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-content">
            <h3 className="stat-number">{nutritionData.compliance.proteinAdequate}%</h3>
            <p className="stat-label">Proteína Adecuada</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🧂</div>
          <div className="stat-content">
            <h3 className="stat-number">{nutritionData.compliance.lowSodium}%</h3>
            <p className="stat-label">Bajo en Sodio</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌾</div>
          <div className="stat-content">
            <h3 className="stat-number">{nutritionData.compliance.highFiber}%</h3>
            <p className="stat-label">Rico en Fibra</p>
          </div>
        </div>
      </div>

      {/* Controles de análisis */}
      <div className="analysis-controls">
        <div className="control-group">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
          </select>

          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="metric-selector"
          >
            <option value="calories">Calorías</option>
            <option value="proteins">Proteínas</option>
            <option value="carbs">Carbohidratos</option>
            <option value="fats">Grasas</option>
          </select>
        </div>

        <div className="export-controls">
          <button className="btn btn-outline">
            📊 Exportar Análisis
          </button>
          <button className="btn btn-primary">
            📈 Generar Informe
          </button>
        </div>
      </div>

      <div className="analysis-content">
        {/* Gráfico de tendencias */}
        <div className="analysis-section">
          <div className="section-header">
            <h2>Tendencia Semanal - {selectedMetric === 'calories' ? 'Calorías' : selectedMetric === 'proteins' ? 'Proteínas' : selectedMetric === 'carbs' ? 'Carbohidratos' : 'Grasas'}</h2>
            <div className="metric-status">
              <span className="status-indicator" style={{ color: getStatusColor(currentData.status) }}>
                {getStatusIcon(currentData.status)} 
                {currentData.status === 'good' ? 'Óptimo' : currentData.status === 'warning' ? 'Atención' : 'Crítico'}
              </span>
            </div>
          </div>

          <div className="trend-chart">
            <div className="chart-info">
              <div className="target-line">
                <span className="target-label">Meta: {currentData.target} {getMetricUnit(selectedMetric)}</span>
                <span className="average-label">Promedio: {currentData.average} {getMetricUnit(selectedMetric)}</span>
              </div>
            </div>
            
            <div className="chart-bars">
              {currentData.daily.map((value, index) => {
                const percentage = (value / (currentData.target * 1.2)) * 100;
                const isAboveTarget = value > currentData.target;
                const isBelowTarget = value < currentData.target * 0.9;
                
                return (
                  <div key={index} className="chart-day">
                    <div className="bar-container">
                      <div 
                        className={`bar ${isAboveTarget ? 'above-target' : isBelowTarget ? 'below-target' : 'in-range'}`}
                        style={{ height: `${Math.max(percentage, 10)}%` }}
                      >
                        <span className="bar-value">{value}</span>
                      </div>
                      <div className="target-line-marker" style={{ bottom: `${(currentData.target / (currentData.target * 1.2)) * 100}%` }}></div>
                    </div>
                    <span className="day-label">{weekDays[index]}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Distribución de macronutrientes */}
        <div className="analysis-section">
          <div className="section-header">
            <h2>Distribución de Macronutrientes</h2>
            <span className="period-label">Promedio Semanal</span>
          </div>

          <div className="macros-distribution">
            <div className="macro-chart">
              <div className="pie-chart">
                <div className="pie-segment proteins" style={{ 
                  background: `conic-gradient(#059669 0deg ${nutritionData.distribution.proteins * 3.6}deg, transparent ${nutritionData.distribution.proteins * 3.6}deg)` 
                }}>
                  <span className="pie-label">{nutritionData.distribution.proteins}%</span>
                </div>
              </div>
              <div className="macro-legend">
                <div className="legend-item">
                  <span className="legend-color proteins"></span>
                  <span className="legend-label">Proteínas ({nutritionData.distribution.proteins}%)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color carbs"></span>
                  <span className="legend-label">Carbohidratos ({nutritionData.distribution.carbs}%)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color fats"></span>
                  <span className="legend-label">Grasas ({nutritionData.distribution.fats}%)</span>
                </div>
              </div>
            </div>

            <div className="macro-recommendations">
              <h3>Recomendaciones Nutricionales</h3>
              <div className="recommendation-item">
                <div className="rec-header">
                  <span className="rec-icon">💪</span>
                  <span className="rec-title">Proteínas</span>
                  <span className={`rec-status ${nutritionData.distribution.proteins >= 15 && nutritionData.distribution.proteins <= 25 ? 'good' : 'warning'}`}>
                    {nutritionData.distribution.proteins >= 15 && nutritionData.distribution.proteins <= 25 ? '✅' : '⚠️'}
                  </span>
                </div>
                <p className="rec-description">
                  Recomendado: 15-25%. Actual: {nutritionData.distribution.proteins}%
                  {nutritionData.distribution.proteins >= 15 && nutritionData.distribution.proteins <= 25 
                    ? ' - Excelente balance proteico' 
                    : ' - Considera ajustar las fuentes de proteína'}
                </p>
              </div>

              <div className="recommendation-item">
                <div className="rec-header">
                  <span className="rec-icon">🌾</span>
                  <span className="rec-title">Carbohidratos</span>
                  <span className={`rec-status ${nutritionData.distribution.carbs >= 45 && nutritionData.distribution.carbs <= 65 ? 'good' : 'warning'}`}>
                    {nutritionData.distribution.carbs >= 45 && nutritionData.distribution.carbs <= 65 ? '✅' : '⚠️'}
                  </span>
                </div>
                <p className="rec-description">
                  Recomendado: 45-65%. Actual: {nutritionData.distribution.carbs}%
                  {nutritionData.distribution.carbs >= 45 && nutritionData.distribution.carbs <= 65 
                    ? ' - Proporción adecuada de carbohidratos' 
                    : ' - Revisa las fuentes de carbohidratos complejos'}
                </p>
              </div>

              <div className="recommendation-item">
                <div className="rec-header">
                  <span className="rec-icon">🫒</span>
                  <span className="rec-title">Grasas</span>
                  <span className={`rec-status ${nutritionData.distribution.fats >= 20 && nutritionData.distribution.fats <= 35 ? 'good' : 'warning'}`}>
                    {nutritionData.distribution.fats >= 20 && nutritionData.distribution.fats <= 35 ? '✅' : '⚠️'}
                  </span>
                </div>
                <p className="rec-description">
                  Recomendado: 20-35%. Actual: {nutritionData.distribution.fats}%
                  {nutritionData.distribution.fats >= 20 && nutritionData.distribution.fats <= 35 
                    ? ' - Balance de grasas saludables' 
                    : ' - Prioriza grasas insaturadas'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alertas y sugerencias */}
        <div className="analysis-section">
          <div className="section-header">
            <h2>Alertas y Sugerencias</h2>
          </div>

          <div className="alerts-grid">
            <div className="alert-card success">
              <div className="alert-icon">✅</div>
              <div className="alert-content">
                <h4>Proteínas Balanceadas</h4>
                <p>Los menús mantienen un excelente balance de proteínas de alta calidad.</p>
              </div>
            </div>

            <div className="alert-card warning">
              <div className="alert-icon">⚠️</div>
              <div className="alert-content">
                <h4>Carbohidratos Ligeramente Altos</h4>
                <p>Considera reducir carbohidratos simples e incrementar fibra dietética.</p>
              </div>
            </div>

            <div className="alert-card info">
              <div className="alert-icon">💡</div>
              <div className="alert-content">
                <h4>Sugerencia: Más Vegetales</h4>
                <p>Incrementar la variedad de vegetales puede mejorar el perfil de micronutrientes.</p>
              </div>
            </div>

            <div className="alert-card success">
              <div className="alert-icon">🧂</div>
              <div className="alert-content">
                <h4>Sodio Controlado</h4>
                <p>Los niveles de sodio se mantienen dentro de los rangos recomendados.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparación con estándares */}
        <div className="analysis-section">
          <div className="section-header">
            <h2>Cumplimiento de Estándares</h2>
          </div>

          <div className="standards-comparison">
            <div className="standard-item">
              <div className="standard-header">
                <span className="standard-title">Calorías Diarias</span>
                <span className="standard-range">400-600 kcal</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '85%' }}></div>
              </div>
              <span className="compliance-percentage">85% de cumplimiento</span>
            </div>

            <div className="standard-item">
              <div className="standard-header">
                <span className="standard-title">Proteína Mínima</span>
                <span className="standard-range">≥20g por comida</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '92%' }}></div>
              </div>
              <span className="compliance-percentage">92% de cumplimiento</span>
            </div>

            <div className="standard-item">
              <div className="standard-header">
                <span className="standard-title">Sodio Máximo</span>
                <span className="standard-range">≤800mg por día</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '78%' }}></div>
              </div>
              <span className="compliance-percentage">78% de cumplimiento</span>
            </div>

            <div className="standard-item">
              <div className="standard-header">
                <span className="standard-title">Fibra Mínima</span>
                <span className="standard-range">≥8g por día</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <span className="compliance-percentage">65% de cumplimiento</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}