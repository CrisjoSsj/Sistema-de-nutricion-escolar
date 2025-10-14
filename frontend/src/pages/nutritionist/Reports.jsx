import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState, useRef } from 'react';

export default function NutritionistReports() {
  const [selectedReport, setSelectedReport] = useState('nutrition');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const reportRef = useRef();

  // Datos de ejemplo para los reportes
  const reportData = {
    nutrition: {
      title: 'Reporte Nutricional',
      summary: {
        menusAnalyzed: 45,
        nutritionalGoals: 42,
        averageCalories: 1850,
        proteinCompliance: 95
      },
      details: [
        { nutrient: 'Calorías', target: 1800, actual: 1850, percentage: 103, status: 'good' },
        { nutrient: 'Proteínas', target: 65, actual: 62, percentage: 95, status: 'good' },
        { nutrient: 'Carbohidratos', target: 250, actual: 245, percentage: 98, status: 'good' },
        { nutrient: 'Grasas', target: 60, actual: 58, percentage: 97, status: 'good' },
        { nutrient: 'Fibra', target: 25, actual: 22, percentage: 88, status: 'warning' },
        { nutrient: 'Calcio', target: 1000, actual: 950, percentage: 95, status: 'good' },
        { nutrient: 'Hierro', target: 15, actual: 12, percentage: 80, status: 'warning' },
        { nutrient: 'Vitamina C', target: 75, actual: 85, percentage: 113, status: 'excellent' }
      ]
    },
    consumption: {
      title: 'Reporte de Consumo',
      summary: {
        totalMeals: 1250,
        averageConsumption: 87,
        mostPopular: 'Pollo a la plancha',
        leastPopular: 'Pescado al vapor'
      },
      details: [
        { meal: 'Pollo a la plancha con vegetales', served: 150, consumed: 142, percentage: 95, rating: 4.8 },
        { meal: 'Arroz con lentejas', served: 140, consumed: 128, percentage: 91, rating: 4.5 },
        { meal: 'Pasta con salsa boloñesa', served: 135, consumed: 125, percentage: 93, rating: 4.6 },
        { meal: 'Sopa de verduras', served: 120, consumed: 98, percentage: 82, rating: 4.2 },
        { meal: 'Pescado al vapor', served: 110, consumed: 85, percentage: 77, rating: 3.8 },
        { meal: 'Quinoa con vegetales', served: 105, consumed: 89, percentage: 85, rating: 4.1 }
      ]
    },
    feedback: {
      title: 'Reporte de Feedback',
      summary: {
        totalFeedback: 85,
        averageRating: 4.3,
        responseRate: 92,
        satisfactionLevel: 'Alta'
      },
      details: [
        { category: 'Sabor', count: 35, avgRating: 4.5, sentiment: 'positive' },
        { category: 'Cantidad', count: 20, avgRating: 4.2, sentiment: 'positive' },
        { category: 'Variedad', count: 15, avgRating: 4.0, sentiment: 'neutral' },
        { category: 'Presentación', count: 10, avgRating: 4.4, sentiment: 'positive' },
        { category: 'Temperatura', count: 5, avgRating: 3.8, sentiment: 'neutral' }
      ]
    },
    compliance: {
      title: 'Reporte de Cumplimiento',
      summary: {
        menuCompliance: 96,
        allergenCompliance: 100,
        nutritionalCompliance: 94,
        safetyCompliance: 98
      },
      details: [
        { aspect: 'Porciones adecuadas', target: 100, actual: 98, status: 'good' },
        { aspect: 'Grupos alimenticios balanceados', target: 100, actual: 95, status: 'good' },
        { aspect: 'Restricciones dietéticas', target: 100, actual: 100, status: 'excellent' },
        { aspect: 'Alérgenos identificados', target: 100, actual: 100, status: 'excellent' },
        { aspect: 'Variedad semanal', target: 100, actual: 92, status: 'good' },
        { aspect: 'Calidad nutricional', target: 100, actual: 96, status: 'good' }
      ]
    }
  };

  const periods = [
    { value: 'week', label: 'Última semana' },
    { value: 'month', label: 'Último mes' },
    { value: 'quarter', label: 'Último trimestre' },
    { value: 'year', label: 'Último año' },
    { value: 'custom', label: 'Período personalizado' }
  ];

  const reportTypes = [
    { value: 'nutrition', label: 'Reporte Nutricional', icon: '🥗' },
    { value: 'consumption', label: 'Reporte de Consumo', icon: '📊' },
    { value: 'feedback', label: 'Reporte de Feedback', icon: '💬' },
    { value: 'compliance', label: 'Reporte de Cumplimiento', icon: '✅' }
  ];

  const currentReport = reportData[selectedReport];

  const getStatusColor = (status) => {
    const colors = {
      excellent: '#4CAF50',
      good: '#8BC34A',
      warning: '#FF9800',
      poor: '#F44336'
    };
    return colors[status] || '#666';
  };

  const getStatusIcon = (status) => {
    const icons = {
      excellent: '🟢',
      good: '🔵',
      warning: '🟡',
      poor: '🔴'
    };
    return icons[status] || '⚪';
  };

  const handleGenerateReport = () => {
    setShowGenerateModal(true);
  };

  const handleDownloadReport = (format) => {
    // Simulación de descarga
    alert(`Descargando reporte en formato ${format.toUpperCase()}...`);
    setShowGenerateModal(false);
  };

  const renderNutritionReport = () => (
    <div className="report-content">
      <div className="nutrition-overview">
        <h4>Análisis Nutricional General</h4>
        <div className="nutrition-grid">
          {currentReport.details.map((nutrient, index) => (
            <div key={index} className="nutrition-item">
              <div className="nutrition-header">
                <span className="nutrient-name">{nutrient.nutrient}</span>
                <span className="nutrient-status">{getStatusIcon(nutrient.status)}</span>
              </div>
              <div className="nutrition-values">
                <div className="value-row">
                  <span>Objetivo:</span>
                  <span>{nutrient.target}{nutrient.nutrient === 'Calorías' ? ' kcal' : nutrient.nutrient.includes('Vitamina') ? ' mg' : ' g'}</span>
                </div>
                <div className="value-row">
                  <span>Actual:</span>
                  <span>{nutrient.actual}{nutrient.nutrient === 'Calorías' ? ' kcal' : nutrient.nutrient.includes('Vitamina') ? ' mg' : ' g'}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${Math.min(nutrient.percentage, 100)}%`,
                      backgroundColor: getStatusColor(nutrient.status)
                    }}
                  ></div>
                </div>
                <div className="percentage">{nutrient.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations">
        <h4>Recomendaciones Nutricionales</h4>
        <div className="recommendation-list">
          <div className="recommendation-item warning">
            <span className="rec-icon">⚠️</span>
            <div className="rec-content">
              <h5>Aumentar contenido de fibra</h5>
              <p>Los menús están por debajo del objetivo de fibra. Considera incluir más legumbres, frutas y cereales integrales.</p>
            </div>
          </div>
          <div className="recommendation-item warning">
            <span className="rec-icon">⚠️</span>
            <div className="rec-content">
              <h5>Fortificar con hierro</h5>
              <p>El contenido de hierro está en 80%. Incluye más carnes rojas, espinacas y legumbres.</p>
            </div>
          </div>
          <div className="recommendation-item good">
            <span className="rec-icon">✅</span>
            <div className="rec-content">
              <h5>Excelente aporte de vitamina C</h5>
              <p>Los menús superan el objetivo de vitamina C. Mantén la inclusión de frutas cítricas y verduras frescas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsumptionReport = () => (
    <div className="report-content">
      <div className="consumption-table">
        <h4>Análisis de Consumo por Menú</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Menú</th>
              <th>Servido</th>
              <th>Consumido</th>
              <th>% Consumo</th>
              <th>Calificación</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {currentReport.details.map((meal, index) => (
              <tr key={index}>
                <td className="meal-name">{meal.meal}</td>
                <td>{meal.served}</td>
                <td>{meal.consumed}</td>
                <td>
                  <div className="consumption-bar">
                    <div 
                      className="consumption-fill"
                      style={{ width: `${meal.percentage}%` }}
                    ></div>
                    <span>{meal.percentage}%</span>
                  </div>
                </td>
                <td>
                  <div className="rating">
                    ⭐ {meal.rating}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${meal.percentage >= 90 ? 'excellent' : meal.percentage >= 80 ? 'good' : 'warning'}`}>
                    {meal.percentage >= 90 ? 'Excelente' : meal.percentage >= 80 ? 'Bueno' : 'Mejorar'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="consumption-insights">
        <h4>Insights de Consumo</h4>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon">📈</div>
            <div className="insight-content">
              <h5>Tendencia Positiva</h5>
              <p>El consumo promedio ha aumentado 5% este mes</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🥗</div>
            <div className="insight-content">
              <h5>Menús Populares</h5>
              <p>Los platos con pollo tienen 95% de aceptación</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🐟</div>
            <div className="insight-content">
              <h5>Oportunidad de Mejora</h5>
              <p>Los platos con pescado necesitan más variedad</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeedbackReport = () => (
    <div className="report-content">
      <div className="feedback-analysis">
        <h4>Análisis de Feedback por Categoría</h4>
        <div className="feedback-categories">
          {currentReport.details.map((category, index) => (
            <div key={index} className="feedback-category">
              <div className="category-header">
                <h5>{category.category}</h5>
                <span className={`sentiment-badge ${category.sentiment}`}>
                  {category.sentiment === 'positive' ? '😊' : category.sentiment === 'neutral' ? '😐' : '😞'}
                </span>
              </div>
              <div className="category-stats">
                <div className="stat">
                  <span className="stat-label">Comentarios:</span>
                  <span className="stat-value">{category.count}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Calificación:</span>
                  <span className="stat-value">⭐ {category.avgRating}</span>
                </div>
              </div>
              <div className="category-bar">
                <div 
                  className="category-fill"
                  style={{ 
                    width: `${(category.avgRating / 5) * 100}%`,
                    backgroundColor: category.sentiment === 'positive' ? '#4CAF50' : category.sentiment === 'neutral' ? '#FF9800' : '#F44336'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="feedback-trends">
        <h4>Tendencias de Satisfacción</h4>
        <div className="trend-chart">
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: '60%' }}>Ene</div>
            <div className="chart-bar" style={{ height: '70%' }}>Feb</div>
            <div className="chart-bar" style={{ height: '65%' }}>Mar</div>
            <div className="chart-bar" style={{ height: '80%' }}>Abr</div>
            <div className="chart-bar" style={{ height: '85%' }}>May</div>
            <div className="chart-bar" style={{ height: '90%' }}>Jun</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplianceReport = () => (
    <div className="report-content">
      <div className="compliance-overview">
        <h4>Estado de Cumplimiento</h4>
        <div className="compliance-grid">
          {currentReport.details.map((aspect, index) => (
            <div key={index} className="compliance-item">
              <div className="compliance-header">
                <span className="aspect-name">{aspect.aspect}</span>
                <span className="compliance-status">{getStatusIcon(aspect.status)}</span>
              </div>
              <div className="compliance-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${aspect.actual}%`,
                      backgroundColor: getStatusColor(aspect.status)
                    }}
                  ></div>
                </div>
                <div className="progress-text">
                  {aspect.actual}% / {aspect.target}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="compliance-actions">
        <h4>Acciones Recomendadas</h4>
        <div className="action-list">
          <div className="action-item">
            <span className="action-priority high">Alta</span>
            <div className="action-content">
              <h5>Mejorar variedad semanal</h5>
              <p>Incluir más opciones de proteínas alternativas y vegetales de temporada</p>
            </div>
          </div>
          <div className="action-item">
            <span className="action-priority medium">Media</span>
            <div className="action-content">
              <h5>Ajustar porciones</h5>
              <p>Revisar las porciones en los menús de almuerzo para alcanzar el 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch(selectedReport) {
      case 'nutrition':
        return renderNutritionReport();
      case 'consumption':
        return renderConsumptionReport();
      case 'feedback':
        return renderFeedbackReport();
      case 'compliance':
        return renderComplianceReport();
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Reportes y Análisis</h1>
        <p className="page-description">Genera reportes detallados sobre tus menús y su desempeño</p>
      </div>

      {/* Controles de reporte */}
      <div className="report-controls">
        <div className="control-group">
          <label>Tipo de Reporte:</label>
          <div className="report-type-selector">
            {reportTypes.map(type => (
              <button
                key={type.value}
                className={`report-type-btn ${selectedReport === type.value ? 'active' : ''}`}
                onClick={() => setSelectedReport(type.value)}
              >
                <span className="type-icon">{type.icon}</span>
                <span className="type-label">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="control-group">
          <label>Período:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="period-selector"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        {selectedPeriod === 'custom' && (
          <div className="custom-date-range">
            <input
              type="date"
              value={customDateFrom}
              onChange={(e) => setCustomDateFrom(e.target.value)}
              placeholder="Fecha desde"
            />
            <input
              type="date"
              value={customDateTo}
              onChange={(e) => setCustomDateTo(e.target.value)}
              placeholder="Fecha hasta"
            />
          </div>
        )}

        <div className="control-actions">
          <button 
            className="btn btn-primary"
            onClick={handleGenerateReport}
          >
            📋 Generar Reporte
          </button>
        </div>
      </div>

      {/* Resumen del reporte */}
      <div className="report-summary">
        <h3>{currentReport.title}</h3>
        <div className="summary-stats">
          {Object.entries(currentReport.summary).map(([key, value]) => (
            <div key={key} className="summary-stat">
              <div className="stat-value">{value}</div>
              <div className="stat-label">
                {key === 'menusAnalyzed' && 'Menús Analizados'}
                {key === 'nutritionalGoals' && 'Objetivos Nutricionales'}
                {key === 'averageCalories' && 'Calorías Promedio'}
                {key === 'proteinCompliance' && 'Cumplimiento Proteína (%)'}
                {key === 'totalMeals' && 'Comidas Servidas'}
                {key === 'averageConsumption' && 'Consumo Promedio (%)'}
                {key === 'mostPopular' && 'Más Popular'}
                {key === 'leastPopular' && 'Menos Popular'}
                {key === 'totalFeedback' && 'Total Comentarios'}
                {key === 'averageRating' && 'Calificación Promedio'}
                {key === 'responseRate' && 'Tasa Respuesta (%)'}
                {key === 'satisfactionLevel' && 'Nivel Satisfacción'}
                {key === 'menuCompliance' && 'Cumplimiento Menú (%)'}
                {key === 'allergenCompliance' && 'Cumplimiento Alérgenos (%)'}
                {key === 'nutritionalCompliance' && 'Cumplimiento Nutricional (%)'}
                {key === 'safetyCompliance' && 'Cumplimiento Seguridad (%)'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido específico del reporte */}
      <div className="report-main" ref={reportRef}>
        {renderReportContent()}
      </div>

      {/* Modal para generar reporte */}
      {showGenerateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Generar y Descargar Reporte</h3>
              <button 
                className="modal-close"
                onClick={() => setShowGenerateModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="download-options">
                <h4>Selecciona el formato de descarga:</h4>
                <div className="format-options">
                  <button 
                    className="format-btn"
                    onClick={() => handleDownloadReport('pdf')}
                  >
                    <span className="format-icon">📄</span>
                    <div className="format-info">
                      <h5>PDF</h5>
                      <p>Reporte completo con gráficos</p>
                    </div>
                  </button>
                  <button 
                    className="format-btn"
                    onClick={() => handleDownloadReport('excel')}
                  >
                    <span className="format-icon">📊</span>
                    <div className="format-info">
                      <h5>Excel</h5>
                      <p>Datos en hojas de cálculo</p>
                    </div>
                  </button>
                  <button 
                    className="format-btn"
                    onClick={() => handleDownloadReport('csv')}
                  >
                    <span className="format-icon">📋</span>
                    <div className="format-info">
                      <h5>CSV</h5>
                      <p>Datos separados por comas</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="report-preview">
                <h4>Vista previa del reporte:</h4>
                <div className="preview-info">
                  <p><strong>Tipo:</strong> {currentReport.title}</p>
                  <p><strong>Período:</strong> {periods.find(p => p.value === selectedPeriod)?.label}</p>
                  <p><strong>Fecha de generación:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowGenerateModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}