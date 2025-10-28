import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';
import { useState } from 'react';
import '../../styles/rector/Reports.css';

export default function RectorReports() {
  const { currentSchool } = useSchool();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [dateRange, setDateRange] = useState({
    start: '2025-10-01',
    end: '2025-10-09'
  });

  const [reportData, setReportData] = useState({
    overview: {
      totalStudents: 342,
      activeParents: 298,
      staffMembers: 24,
      mealsServed: 1580,
      attendance: 89.5,
      satisfaction: 4.3,
      allergicIncidents: 0,
      wastePercentage: 12.3
    },
    academic: {
      enrollmentTrend: [
        { month: 'Marzo', students: 320 },
        { month: 'Abril', students: 325 },
        { month: 'Mayo', students: 335 },
        { month: 'Junio', students: 340 },
        { month: 'Julio', students: 342 }
      ],
      gradeDistribution: [
        { grade: 'Pre-kinder', count: 25 },
        { grade: 'Kinder', count: 28 },
        { grade: '1° Básico', count: 42 },
        { grade: '2° Básico', count: 45 },
        { grade: '3° Básico', count: 48 },
        { grade: '4° Básico', count: 44 },
        { grade: '5° Básico', count: 41 },
        { grade: '6° Básico', count: 39 },
        { grade: '7° Básico', count: 35 },
        { grade: '8° Básico', count: 32 }
      ],
      attendanceByGrade: [
        { grade: '1° Básico', attendance: 92.3 },
        { grade: '2° Básico', attendance: 89.7 },
        { grade: '3° Básico', attendance: 91.2 },
        { grade: '4° Básico', attendance: 88.5 },
        { grade: '5° Básico', attendance: 87.1 }
      ]
    },
    nutrition: {
      menuSatisfaction: [
        { day: 'Lunes', rating: 4.2 },
        { day: 'Martes', rating: 4.5 },
        { day: 'Miércoles', rating: 4.1 },
        { day: 'Jueves', rating: 4.4 },
        { day: 'Viernes', rating: 4.3 }
      ],
      allergyBreakdown: [
        { allergy: 'Nueces', students: 15 },
        { allergy: 'Mariscos', students: 8 },
        { allergy: 'Lácteos', students: 12 },
        { allergy: 'Gluten', students: 6 },
        { allergy: 'Huevos', students: 4 }
      ],
      nutritionalCompliance: {
        calories: 95.2,
        protein: 92.8,
        vegetables: 88.4,
        fruits: 91.6,
        wholegrains: 85.3
      },
      wasteAnalysis: [
        { category: 'Frutas', percentage: 8.2 },
        { category: 'Verduras', percentage: 15.7 },
        { category: 'Proteínas', percentage: 6.1 },
        { category: 'Carbohidratos', percentage: 12.9 }
      ]
    },
    financial: {
      budgetOverview: {
        allocated: 250000,
        spent: 195000,
        remaining: 55000,
        categories: [
          { name: 'Ingredientes', budget: 150000, spent: 125000 },
          { name: 'Personal Cocina', budget: 60000, spent: 48000 },
          { name: 'Equipamiento', budget: 25000, spent: 15000 },
          { name: 'Servicios', budget: 15000, spent: 7000 }
        ]
      },
      costPerMeal: {
        current: 1250,
        target: 1200,
        trend: [
          { month: 'Marzo', cost: 1280 },
          { month: 'Abril', cost: 1265 },
          { month: 'Mayo', cost: 1255 },
          { month: 'Junio', cost: 1245 },
          { month: 'Julio', cost: 1250 }
        ]
      }
    },
    operational: {
      staffPerformance: [
        { department: 'Nutrición', performance: 94.2, staff: 3 },
        { department: 'Cocina', performance: 91.8, staff: 5 },
        { department: 'Administración', performance: 88.5, staff: 2 }
      ],
      equipmentStatus: [
        { equipment: 'Hornos', status: 'Excelente', lastMaintenance: '2025-09-15' },
        { equipment: 'Refrigeradores', status: 'Bueno', lastMaintenance: '2025-08-20' },
        { equipment: 'Lavavajillas', status: 'Requiere mantención', lastMaintenance: '2025-07-10' }
      ],
      safetyIncidents: {
        total: 2,
        minor: 2,
        major: 0,
        incidents: [
          { date: '2025-09-22', type: 'Menor', description: 'Corte superficial en cocina' },
          { date: '2025-08-15', type: 'Menor', description: 'Pequeña quemadura' }
        ]
      }
    }
  });

  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: '📊' },
    { id: 'academic', label: 'Académico', icon: '🎓' },
    { id: 'nutrition', label: 'Nutrición', icon: '🍽️' },
    { id: 'financial', label: 'Financiero', icon: '💰' },
    { id: 'operational', label: 'Operacional', icon: '⚙️' }
  ];

  const handleExportReport = (format) => {
    alert(`Exportando reporte en formato ${format}...`);
  };

  const handleDateRangeChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="rector-reports">
        <div className="page-header">
        <h1 className="page-title">
          📊 Reportes Institucionales
        </h1>
        <p className="page-description">
          Análisis completo del desempeño de {currentSchool?.name}
        </p>
      </div>

      {/* Controles de fecha y exportación */}
      <div className="report-controls">
        <div className="date-controls">
          <div className="date-group">
            <label>Desde:</label>
            <input 
              type="date" 
              value={dateRange.start}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
            />
          </div>
          <div className="date-group">
            <label>Hasta:</label>
            <input 
              type="date" 
              value={dateRange.end}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
            />
          </div>
          <button className="btn btn-primary">
            🔄 Actualizar
          </button>
        </div>
        
        <div className="export-controls">
          <button 
            className="btn btn-secondary"
            onClick={() => handleExportReport('PDF')}
          >
            📄 Exportar PDF
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleExportReport('Excel')}
          >
            📊 Exportar Excel
          </button>
          <button className="btn btn-secondary">
            📧 Enviar por email
          </button>
        </div>
      </div>

      {/* Navegación por tabs */}
      <div className="tabs-navigation">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${selectedTab === tab.id ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Resumen General */}
      {selectedTab === 'overview' && (
        <div className="tab-content">
          <h3>📊 Resumen general de la institución</h3>
          
          <div className="overview-stats">
            <div className="stats-grid">
              <div className="stat-card highlight">
                <div className="stat-icon">👨‍🎓</div>
                <div className="stat-content">
                  <h4>{reportData.overview.totalStudents}</h4>
                  <p>Estudiantes totales</p>
                  <span className="stat-change positive">+12 este mes</span>
                </div>
              </div>
              
              <div className="stat-card highlight">
                <div className="stat-icon">👨‍👩‍👧‍👦</div>
                <div className="stat-content">
                  <h4>{reportData.overview.activeParents}</h4>
                  <p>Padres activos</p>
                  <span className="stat-change positive">+8 nuevos</span>
                </div>
              </div>
              
              <div className="stat-card highlight">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h4>{reportData.overview.staffMembers}</h4>
                  <p>Personal total</p>
                  <span className="stat-change neutral">Sin cambios</span>
                </div>
              </div>
              
              <div className="stat-card highlight">
                <div className="stat-icon">🍽️</div>
                <div className="stat-content">
                  <h4>{reportData.overview.mealsServed}</h4>
                  <p>Comidas servidas</p>
                  <span className="stat-change positive">Esta semana</span>
                </div>
              </div>
            </div>
          </div>

          <div className="kpi-section">
            <h4>📈 Indicadores clave de desempeño</h4>
            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">📈</span>
                  <h5>Asistencia promedio</h5>
                </div>
                <div className="kpi-value success">
                  {reportData.overview.attendance}%
                </div>
                <div className="kpi-progress">
                  <div 
                    className="kpi-bar"
                    style={{ width: `${reportData.overview.attendance}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">⭐</span>
                  <h5>Satisfacción menú</h5>
                </div>
                <div className="kpi-value success">
                  {reportData.overview.satisfaction}/5
                </div>
                <div className="kpi-progress">
                  <div 
                    className="kpi-bar"
                    style={{ width: `${(reportData.overview.satisfaction / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">🛡️</span>
                  <h5>Incidentes alérgicos</h5>
                </div>
                <div className="kpi-value success">
                  {reportData.overview.allergicIncidents}
                </div>
                <div className="kpi-status success">
                  ✅ Excelente
                </div>
              </div>
              
              <div className="kpi-card">
                <div className="kpi-header">
                  <span className="kpi-icon">♻️</span>
                  <h5>Desperdicio de comida</h5>
                </div>
                <div className="kpi-value warning">
                  {reportData.overview.wastePercentage}%
                </div>
                <div className="kpi-status warning">
                  ⚠️ Mejorable
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reporte Académico */}
      {selectedTab === 'academic' && (
        <div className="tab-content">
          <h3>🎓 Análisis académico</h3>
          
          <div className="academic-charts">
            <div className="chart-card">
              <div className="chart-header">
                <h4>📈 Tendencia de matrícula</h4>
              </div>
              <div className="chart-content">
                <div className="enrollment-chart">
                  {reportData.academic.enrollmentTrend.map((data, index) => (
                    <div key={index} className="chart-bar">
                      <div className="bar-container">
                        <div 
                          className="bar-fill"
                          style={{ height: `${(data.students / 350) * 100}%` }}
                        ></div>
                      </div>
                      <span className="bar-label">{data.month}</span>
                      <span className="bar-value">{data.students}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h4>👨‍🎓 Distribución por grado</h4>
              </div>
              <div className="chart-content">
                <div className="grade-distribution">
                  {reportData.academic.gradeDistribution.map((data, index) => (
                    <div key={index} className="grade-item">
                      <span className="grade-name">{data.grade}</span>
                      <div className="grade-bar">
                        <div 
                          className="grade-fill"
                          style={{ width: `${(data.count / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="grade-count">{data.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="attendance-analysis">
            <h4>📊 Análisis de asistencia por grado</h4>
            <div className="attendance-table">
              <table>
                <thead>
                  <tr>
                    <th>Grado</th>
                    <th>Asistencia promedio</th>
                    <th>Estado</th>
                    <th>Tendencia</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.academic.attendanceByGrade.map((data, index) => (
                    <tr key={index}>
                      <td>{data.grade}</td>
                      <td>{data.attendance}%</td>
                      <td>
                        <span className={`status-badge ${
                          data.attendance >= 90 ? 'success' : 
                          data.attendance >= 85 ? 'warning' : 'danger'
                        }`}>
                          {data.attendance >= 90 ? 'Excelente' : 
                           data.attendance >= 85 ? 'Bueno' : 'Necesita atención'}
                        </span>
                      </td>
                      <td>
                        <span className="trend-indicator positive">📈 +2.1%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reporte Nutricional */}
      {selectedTab === 'nutrition' && (
        <div className="tab-content">
          <h3>🍽️ Análisis nutricional</h3>
          
          <div className="nutrition-overview">
            <div className="nutrition-card">
              <h4>⭐ Satisfacción del menú por día</h4>
              <div className="satisfaction-chart">
                {reportData.nutrition.menuSatisfaction.map((data, index) => (
                  <div key={index} className="satisfaction-day">
                    <span className="day-name">{data.day}</span>
                    <div className="rating-display">
                      <span className="rating-stars">
                        {'⭐'.repeat(Math.floor(data.rating))}
                      </span>
                      <span className="rating-number">{data.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="nutrition-card">
              <h4>⚠️ Estudiantes con alergias</h4>
              <div className="allergy-breakdown">
                {reportData.nutrition.allergyBreakdown.map((data, index) => (
                  <div key={index} className="allergy-item">
                    <span className="allergy-name">{data.allergy}</span>
                    <div className="allergy-bar">
                      <div 
                        className="allergy-fill"
                        style={{ width: `${(data.students / 20) * 100}%` }}
                      ></div>
                    </div>
                    <span className="allergy-count">{data.students} estudiantes</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="nutritional-compliance">
            <h4>📊 Cumplimiento nutricional</h4>
            <div className="compliance-grid">
              {Object.entries(reportData.nutrition.nutritionalCompliance).map(([nutrient, percentage]) => (
                <div key={nutrient} className="compliance-item">
                  <div className="compliance-header">
                    <span className="nutrient-name">
                      {nutrient === 'calories' && '🔥 Calorías'}
                      {nutrient === 'protein' && '🥩 Proteínas'}
                      {nutrient === 'vegetables' && '🥬 Verduras'}
                      {nutrient === 'fruits' && '🍎 Frutas'}
                      {nutrient === 'wholegrains' && '🌾 Granos integrales'}
                    </span>
                  </div>
                  <div className="compliance-progress">
                    <div 
                      className="compliance-bar"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: percentage >= 95 ? '#4CAF50' : 
                                       percentage >= 85 ? '#FF9800' : '#F44336'
                      }}
                    ></div>
                  </div>
                  <span className="compliance-percentage">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="waste-analysis">
            <h4>♻️ Análisis de desperdicio por categoría</h4>
            <div className="waste-chart">
              {reportData.nutrition.wasteAnalysis.map((data, index) => (
                <div key={index} className="waste-category">
                  <span className="category-name">{data.category}</span>
                  <div className="waste-bar">
                    <div 
                      className="waste-fill"
                      style={{ 
                        width: `${(data.percentage / 20) * 100}%`,
                        backgroundColor: data.percentage <= 10 ? '#4CAF50' : 
                                       data.percentage <= 15 ? '#FF9800' : '#F44336'
                      }}
                    ></div>
                  </div>
                  <span className="waste-percentage">{data.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reporte Financiero */}
      {selectedTab === 'financial' && (
        <div className="tab-content">
          <h3>💰 Análisis financiero</h3>
          
          <div className="budget-overview">
            <div className="budget-summary">
              <div className="budget-stat">
                <span className="budget-label">Presupuesto asignado:</span>
                <span className="budget-value">${reportData.financial.budgetOverview.allocated.toLocaleString()}</span>
              </div>
              <div className="budget-stat">
                <span className="budget-label">Gastado:</span>
                <span className="budget-value spent">${reportData.financial.budgetOverview.spent.toLocaleString()}</span>
              </div>
              <div className="budget-stat">
                <span className="budget-label">Restante:</span>
                <span className="budget-value remaining">${reportData.financial.budgetOverview.remaining.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="budget-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${(reportData.financial.budgetOverview.spent / reportData.financial.budgetOverview.allocated) * 100}%`
                  }}
                ></div>
              </div>
              <span className="progress-label">
                {Math.round((reportData.financial.budgetOverview.spent / reportData.financial.budgetOverview.allocated) * 100)}% utilizado
              </span>
            </div>
          </div>

          <div className="budget-categories">
            <h4>📊 Presupuesto por categorías</h4>
            <div className="categories-table">
              <table>
                <thead>
                  <tr>
                    <th>Categoría</th>
                    <th>Presupuesto</th>
                    <th>Gastado</th>
                    <th>Restante</th>
                    <th>% Utilizado</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.financial.budgetOverview.categories.map((category, index) => {
                    const percentage = (category.spent / category.budget) * 100;
                    return (
                      <tr key={index}>
                        <td>{category.name}</td>
                        <td>${category.budget.toLocaleString()}</td>
                        <td>${category.spent.toLocaleString()}</td>
                        <td>${(category.budget - category.spent).toLocaleString()}</td>
                        <td>
                          <span className={`percentage ${
                            percentage <= 70 ? 'success' : 
                            percentage <= 90 ? 'warning' : 'danger'
                          }`}>
                            {Math.round(percentage)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cost-analysis">
            <h4>💲 Análisis de costo por comida</h4>
            <div className="cost-overview">
              <div className="cost-current">
                <span className="cost-label">Costo actual:</span>
                <span className="cost-value">${reportData.financial.costPerMeal.current}</span>
              </div>
              <div className="cost-target">
                <span className="cost-label">Meta:</span>
                <span className="cost-value target">${reportData.financial.costPerMeal.target}</span>
              </div>
              <div className="cost-difference">
                <span className="cost-label">Diferencia:</span>
                <span className="cost-value over">
                  +${reportData.financial.costPerMeal.current - reportData.financial.costPerMeal.target}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reporte Operacional */}
      {selectedTab === 'operational' && (
        <div className="tab-content">
          <h3>⚙️ Análisis operacional</h3>
          
          <div className="operational-overview">
            <div className="performance-section">
              <h4>👥 Desempeño del personal por departamento</h4>
              <div className="performance-cards">
                {reportData.operational.staffPerformance.map((dept, index) => (
                  <div key={index} className="performance-card">
                    <div className="performance-header">
                      <span className="dept-icon">
                        {dept.department === 'Nutrición' && '👩‍⚕️'}
                        {dept.department === 'Cocina' && '👨‍🍳'}
                        {dept.department === 'Administración' && '👩‍💻'}
                      </span>
                      <h5>{dept.department}</h5>
                    </div>
                    <div className="performance-score">
                      <span className="score-value">{dept.performance}%</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${dept.performance}%`,
                            backgroundColor: dept.performance >= 95 ? '#4CAF50' : 
                                           dept.performance >= 85 ? '#FF9800' : '#F44336'
                          }}
                        ></div>
                      </div>
                    </div>
                    <span className="staff-count">{dept.staff} empleados</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="equipment-section">
              <h4>🔧 Estado del equipamiento</h4>
              <div className="equipment-table">
                <table>
                  <thead>
                    <tr>
                      <th>Equipo</th>
                      <th>Estado</th>
                      <th>Última mantención</th>
                      <th>Próxima mantención</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.operational.equipmentStatus.map((equipment, index) => (
                      <tr key={index}>
                        <td>{equipment.equipment}</td>
                        <td>
                          <span className={`status-badge ${
                            equipment.status === 'Excelente' ? 'success' :
                            equipment.status === 'Bueno' ? 'warning' : 'danger'
                          }`}>
                            {equipment.status}
                          </span>
                        </td>
                        <td>{equipment.lastMaintenance}</td>
                        <td>
                          {equipment.status === 'Requiere mantención' ? (
                            <span className="urgent">Urgente</span>
                          ) : (
                            '2025-11-15'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="safety-section">
              <h4>🛡️ Incidentes de seguridad</h4>
              <div className="safety-overview">
                <div className="safety-stats">
                  <div className="safety-stat">
                    <span className="stat-icon">📊</span>
                    <div className="stat-data">
                      <span className="stat-number">{reportData.operational.safetyIncidents.total}</span>
                      <span className="stat-label">Total incidentes</span>
                    </div>
                  </div>
                  <div className="safety-stat">
                    <span className="stat-icon">⚠️</span>
                    <div className="stat-data">
                      <span className="stat-number">{reportData.operational.safetyIncidents.minor}</span>
                      <span className="stat-label">Incidentes menores</span>
                    </div>
                  </div>
                  <div className="safety-stat">
                    <span className="stat-icon">🚨</span>
                    <div className="stat-data">
                      <span className="stat-number">{reportData.operational.safetyIncidents.major}</span>
                      <span className="stat-label">Incidentes mayores</span>
                    </div>
                  </div>
                </div>
                
                <div className="incidents-list">
                  <h5>Incidentes recientes:</h5>
                  {reportData.operational.safetyIncidents.incidents.map((incident, index) => (
                    <div key={index} className="incident-item">
                      <span className="incident-date">{incident.date}</span>
                      <span className={`incident-type ${incident.type.toLowerCase()}`}>
                        {incident.type}
                      </span>
                      <span className="incident-description">{incident.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}