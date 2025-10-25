import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [selectedReport, setSelectedReport] = useState('consumption');

  // Datos de ejemplo para reportes
  const reportData = {
    consumption: {
      title: 'Consumo de Alimentos',
      data: [
        { school: 'Escuela Primaria #1', students: 450, served: 420, percentage: 93.3 },
        { school: 'Escuela Primaria #2', students: 380, served: 360, percentage: 94.7 },
        { school: 'Escuela Secundaria #1', students: 680, served: 595, percentage: 87.5 },
        { school: 'Instituto Técnico', students: 320, served: 285, percentage: 89.1 }
      ]
    },
    nutrition: {
      title: 'Análisis Nutricional',
      weeklyCalories: [2150, 2230, 2180, 2200, 2165],
      dailyAverages: {
        calories: 485,
        proteins: 28,
        carbs: 62,
        fats: 15
      }
    },
    satisfaction: {
      title: 'Satisfacción de Usuarios',
      ratings: [
        { category: 'Sabor', rating: 4.2 },
        { category: 'Cantidad', rating: 4.0 },
        { category: 'Variedad', rating: 3.8 },
        { category: 'Presentación', rating: 4.1 }
      ]
    }
  };

  const exportReport = (format) => {
    console.log(`Exportando reporte en formato ${format}`);
    // Aquí iría la lógica de exportación
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">Reportes y Análisis</h1>
        <p className="page-description">Analiza el rendimiento y estadísticas del sistema nutricional</p>
      </div>

      {/* Controles de filtros */}
      <div className="reports-controls">
        <div className="filter-group">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector"
          >
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
            <option value="quarter">Este trimestre</option>
            <option value="year">Este año</option>
          </select>

          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="school-selector"
          >
            <option value="all">Todas las escuelas</option>
            <option value="escuela1">Escuela Primaria #1</option>
            <option value="escuela2">Escuela Primaria #2</option>
            <option value="escuela3">Escuela Secundaria #1</option>
          </select>

          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="report-selector"
          >
            <option value="consumption">Consumo de Alimentos</option>
            <option value="nutrition">Análisis Nutricional</option>
            <option value="satisfaction">Satisfacción</option>
            <option value="costs">Análisis de Costos</option>
          </select>
        </div>

        <div className="export-controls">
          <button 
            className="btn btn-outline"
            onClick={() => exportReport('pdf')}
          >
            📄 PDF
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => exportReport('excel')}
          >
            📊 Excel
          </button>
          <button className="btn btn-primary">
            📈 Generar Reporte
          </button>
        </div>
      </div>

      {/* Estadísticas generales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-content">
            <h3 className="stat-number">1,660</h3>
            <p className="stat-label">Comidas Servidas</p>
            <span className="stat-trend positive">+5.2% vs mes anterior</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3 className="stat-number">91.2%</h3>
            <p className="stat-label">Tasa de Participación</p>
            <span className="stat-trend positive">+2.1% vs mes anterior</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3 className="stat-number">4.0</h3>
            <p className="stat-label">Satisfacción Promedio</p>
            <span className="stat-trend neutral">Sin cambios</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3 className="stat-number">$2.45</h3>
            <p className="stat-label">Costo por Comida</p>
            <span className="stat-trend negative">+3.2% vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Reporte de consumo */}
      {selectedReport === 'consumption' && (
        <div className="report-section">
          <div className="section-header">
            <h2>📊 Reporte de Consumo de Alimentos</h2>
            <span className="period-label">Enero 2025</span>
          </div>

          <div className="consumption-table">
            <table>
              <thead>
                <tr>
                  <th>Escuela</th>
                  <th>Estudiantes</th>
                  <th>Comidas Servidas</th>
                  <th>Porcentaje</th>
                  <th>Tendencia</th>
                </tr>
              </thead>
              <tbody>
                {reportData.consumption.data.map((school, index) => (
                  <tr key={index}>
                    <td>{school.school}</td>
                    <td>{school.students}</td>
                    <td>{school.served}</td>
                    <td>
                      <span className={`percentage ${school.percentage >= 90 ? 'good' : 'warning'}`}>
                        {school.percentage}%
                      </span>
                    </td>
                    <td>
                      <span className="trend-indicator positive">📈 +2.3%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="consumption-chart">
            <h3>Consumo Diario - Última Semana</h3>
            <div className="chart-placeholder">
              <div className="chart-bars">
                <div className="bar" style={{ height: '80%' }}>
                  <span className="bar-label">L</span>
                  <span className="bar-value">420</span>
                </div>
                <div className="bar" style={{ height: '90%' }}>
                  <span className="bar-label">M</span>
                  <span className="bar-value">475</span>
                </div>
                <div className="bar" style={{ height: '85%' }}>
                  <span className="bar-label">X</span>
                  <span className="bar-value">445</span>
                </div>
                <div className="bar" style={{ height: '95%' }}>
                  <span className="bar-label">J</span>
                  <span className="bar-value">510</span>
                </div>
                <div className="bar" style={{ height: '88%' }}>
                  <span className="bar-label">V</span>
                  <span className="bar-value">465</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reporte nutricional */}
      {selectedReport === 'nutrition' && (
        <div className="report-section">
          <div className="section-header">
            <h2>🥗 Análisis Nutricional</h2>
            <span className="period-label">Enero 2025</span>
          </div>

          <div className="nutrition-grid">
            <div className="nutrition-card">
              <h3>Calorías Promedio Diarias</h3>
              <div className="nutrition-value">
                <span className="value">{reportData.nutrition.dailyAverages.calories}</span>
                <span className="unit">kcal</span>
              </div>
              <div className="nutrition-status good">Dentro del rango recomendado</div>
            </div>

            <div className="nutrition-card">
              <h3>Proteínas</h3>
              <div className="nutrition-value">
                <span className="value">{reportData.nutrition.dailyAverages.proteins}</span>
                <span className="unit">g</span>
              </div>
              <div className="nutrition-status good">Óptimo</div>
            </div>

            <div className="nutrition-card">
              <h3>Carbohidratos</h3>
              <div className="nutrition-value">
                <span className="value">{reportData.nutrition.dailyAverages.carbs}</span>
                <span className="unit">g</span>
              </div>
              <div className="nutrition-status warning">Ligeramente alto</div>
            </div>

            <div className="nutrition-card">
              <h3>Grasas</h3>
              <div className="nutrition-value">
                <span className="value">{reportData.nutrition.dailyAverages.fats}</span>
                <span className="unit">g</span>
              </div>
              <div className="nutrition-status good">Balanceado</div>
            </div>
          </div>

          <div className="weekly-nutrition-chart">
            <h3>Calorías Semanales</h3>
            <div className="chart-placeholder">
              <div className="line-chart">
                {reportData.nutrition.weeklyCalories.map((calories, index) => (
                  <div key={index} className="chart-point">
                    <div className="point" style={{ bottom: `${(calories / 2500) * 100}%` }}></div>
                    <span className="point-label">Sem {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reporte de satisfacción */}
      {selectedReport === 'satisfaction' && (
        <div className="report-section">
          <div className="section-header">
            <h2>⭐ Reporte de Satisfacción</h2>
            <span className="period-label">Enero 2025</span>
          </div>

          <div className="satisfaction-grid">
            {reportData.satisfaction.ratings.map((item, index) => (
              <div key={index} className="satisfaction-card">
                <h3>{item.category}</h3>
                <div className="rating-display">
                  <span className="rating-value">{item.rating}</span>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span 
                        key={star} 
                        className={`star ${star <= item.rating ? 'filled' : ''}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="feedback-summary">
            <h3>Comentarios Recientes</h3>
            <div className="feedback-items">
              <div className="feedback-item">
                <div className="feedback-header">
                  <span className="user">Padre - Escuela Primaria #1</span>
                  <span className="date">10 Ene 2025</span>
                </div>
                <p className="feedback-text">"La variedad de menús ha mejorado mucho este mes."</p>
                <div className="feedback-rating">⭐⭐⭐⭐⭐</div>
              </div>
              
              <div className="feedback-item">
                <div className="feedback-header">
                  <span className="user">Estudiante - Escuela Secundaria #1</span>
                  <span className="date">8 Ene 2025</span>
                </div>
                <p className="feedback-text">"Me gustaría más opciones vegetarianas."</p>
                <div className="feedback-rating">⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reporte de costos */}
      {selectedReport === 'costs' && (
        <div className="report-section">
          <div className="section-header">
            <h2>💰 Análisis de Costos</h2>
            <span className="period-label">Enero 2025</span>
          </div>

          <div className="costs-overview">
            <div className="cost-card">
              <h3>Costo Total Mensual</h3>
              <div className="cost-value">$4,065</div>
              <span className="cost-change positive">-2.3% vs mes anterior</span>
            </div>
            
            <div className="cost-card">
              <h3>Costo por Estudiante</h3>
              <div className="cost-value">$2.45</div>
              <span className="cost-change negative">+3.2% vs mes anterior</span>
            </div>
            
            <div className="cost-card">
              <h3>Ingredientes más Costosos</h3>
              <div className="ingredient-list">
                <div className="ingredient-item">
                  <span>Proteínas (carne/pescado)</span>
                  <span>45%</span>
                </div>
                <div className="ingredient-item">
                  <span>Lácteos</span>
                  <span>25%</span>
                </div>
                <div className="ingredient-item">
                  <span>Frutas y vegetales</span>
                  <span>20%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}