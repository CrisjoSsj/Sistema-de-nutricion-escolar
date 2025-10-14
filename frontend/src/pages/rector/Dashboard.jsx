import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';
import { useState, useEffect } from 'react';

export default function RectorDashboard() {
  const { currentSchool } = useSchool();
  const [dashboardData, setDashboardData] = useState({
    schoolStats: {
      totalStudents: 342,
      activeParents: 298,
      nutritionistCount: 3,
      teacherCount: 24,
      avgMenuRating: 4.3,
      weeklyAttendance: 89.5
    },
    recentActivity: [
      {
        id: 1,
        type: 'new_student',
        description: 'Nuevo estudiante registrado: María González (3° Básico)',
        time: '2 horas',
        icon: '👨‍🎓'
      },
      {
        id: 2,
        type: 'parent_feedback',
        description: 'Nuevo comentario de padre sobre menú vegetariano',
        time: '4 horas',
        icon: '💬'
      },
      {
        id: 3,
        type: 'menu_update',
        description: 'Nutricionista actualizó menú de la próxima semana',
        time: '1 día',
        icon: '🍽️'
      },
      {
        id: 4,
        type: 'staff_update',
        description: 'Nueva nutricionista agregada al equipo',
        time: '2 días',
        icon: '👩‍⚕️'
      }
    ],
    weeklyMenuStats: {
      totalMealsServed: 1580,
      studentSatisfaction: 4.2,
      allergicReactions: 0,
      wastePercentage: 12.3
    },
    upcomingEvents: [
      {
        id: 1,
        title: 'Reunión de Padres - Nutrición',
        date: '2025-10-15',
        time: '19:00',
        type: 'meeting'
      },
      {
        id: 2,
        title: 'Capacitación Personal Cocina',
        date: '2025-10-18',
        time: '08:00',
        type: 'training'
      },
      {
        id: 3,
        title: 'Evaluación Menú Mensual',
        date: '2025-10-25',
        time: '10:00',
        type: 'evaluation'
      }
    ],
    alerts: [
      {
        id: 1,
        type: 'warning',
        message: '3 estudiantes nuevos pendientes de asignación de curso',
        priority: 'medium'
      },
      {
        id: 2,
        type: 'info',
        message: 'Recordatorio: Actualizar información de contacto de emergencia',
        priority: 'low'
      }
    ]
  });

  const getActivityIcon = (type) => {
    const icons = {
      new_student: '👨‍🎓',
      parent_feedback: '💬',
      menu_update: '🍽️',
      staff_update: '👩‍⚕️',
      system_update: '🔧'
    };
    return icons[type] || '📋';
  };

  const getEventIcon = (type) => {
    const icons = {
      meeting: '👥',
      training: '📚',
      evaluation: '📊',
      event: '📅'
    };
    return icons[type] || '📅';
  };

  const getAlertClass = (priority) => {
    const classes = {
      high: 'alert-high',
      medium: 'alert-medium',
      low: 'alert-low'
    };
    return `alert-item ${classes[priority] || 'alert-low'}`;
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">
          🎓 Panel del Rector - {currentSchool?.name}
        </h1>
        <p className="page-description">
          Gestión integral de tu institución educativa
        </p>
      </div>

      {/* Alertas importantes */}
      {dashboardData.alerts.length > 0 && (
        <div className="alerts-section">
          <h3>🚨 Alertas importantes</h3>
          <div className="alerts-list">
            {dashboardData.alerts.map(alert => (
              <div key={alert.id} className={getAlertClass(alert.priority)}>
                <span className="alert-icon">
                  {alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                </span>
                <span className="alert-message">{alert.message}</span>
                <button className="alert-dismiss">✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estadísticas principales */}
      <div className="stats-overview">
        <h3>📊 Resumen de la escuela</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <h4>{dashboardData.schoolStats.totalStudents}</h4>
              <p>Estudiantes activos</p>
              <span className="stat-change positive">+12 este mes</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👨‍👩‍👧‍👦</div>
            <div className="stat-content">
              <h4>{dashboardData.schoolStats.activeParents}</h4>
              <p>Padres registrados</p>
              <span className="stat-change positive">+8 este mes</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h4>{dashboardData.schoolStats.nutritionistCount + dashboardData.schoolStats.teacherCount}</h4>
              <p>Personal total</p>
              <span className="stat-change neutral">Sin cambios</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h4>{dashboardData.schoolStats.avgMenuRating}/5</h4>
              <p>Satisfacción menú</p>
              <span className="stat-change positive">+0.2 esta semana</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h4>{dashboardData.schoolStats.weeklyAttendance}%</h4>
              <p>Asistencia semanal</p>
              <span className="stat-change positive">+2.1% vs semana anterior</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🍽️</div>
            <div className="stat-content">
              <h4>{dashboardData.weeklyMenuStats.totalMealsServed}</h4>
              <p>Comidas servidas</p>
              <span className="stat-change neutral">Esta semana</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad reciente */}
      <div className="recent-activity">
        <div className="section-header">
          <h3>📋 Actividad reciente</h3>
          <button className="view-all-btn">Ver todo</button>
        </div>
        
        <div className="activity-feed">
          {dashboardData.recentActivity.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content">
                <p className="activity-description">{activity.description}</p>
                <span className="activity-time">Hace {activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Próximos eventos */}
      <div className="upcoming-events">
        <div className="section-header">
          <h3>📅 Próximos eventos</h3>
          <button className="add-event-btn">➕ Nuevo evento</button>
        </div>
        
        <div className="events-list">
          {dashboardData.upcomingEvents.map(event => (
            <div key={event.id} className="event-item">
              <div className="event-date">
                <span className="event-day">
                  {new Date(event.date).getDate()}
                </span>
                <span className="event-month">
                  {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                </span>
              </div>
              <div className="event-content">
                <div className="event-header">
                  <span className="event-icon">{getEventIcon(event.type)}</span>
                  <h4 className="event-title">{event.title}</h4>
                </div>
                <p className="event-time">🕐 {event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas del menú */}
      <div className="menu-stats">
        <h3>🍽️ Estadísticas del menú escolar</h3>
        <div className="menu-stats-grid">
          <div className="menu-stat-card">
            <div className="menu-stat-header">
              <span className="menu-stat-icon">📊</span>
              <h4>Satisfacción estudiantil</h4>
            </div>
            <div className="menu-stat-value">
              <span className="stat-number">{dashboardData.weeklyMenuStats.studentSatisfaction}/5</span>
              <div className="rating-bars">
                {[5,4,3,2,1].map(rating => (
                  <div key={rating} className="rating-bar">
                    <span className="rating-label">{rating}⭐</span>
                    <div className="rating-progress">
                      <div 
                        className="rating-fill"
                        style={{ 
                          width: `${Math.random() * 80 + 10}%`,
                          backgroundColor: rating >= 4 ? '#4CAF50' : rating >= 3 ? '#FF9800' : '#F44336'
                        }}
                      ></div>
                    </div>
                    <span className="rating-count">{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="menu-stat-card">
            <div className="menu-stat-header">
              <span className="menu-stat-icon">🛡️</span>
              <h4>Seguridad alimentaria</h4>
            </div>
            <div className="safety-stats">
              <div className="safety-item">
                <span className="safety-icon">⚠️</span>
                <div className="safety-info">
                  <span className="safety-label">Reacciones alérgicas</span>
                  <span className="safety-value success">{dashboardData.weeklyMenuStats.allergicReactions}</span>
                </div>
              </div>
              <div className="safety-item">
                <span className="safety-icon">♻️</span>
                <div className="safety-info">
                  <span className="safety-label">Desperdicio</span>
                  <span className="safety-value warning">{dashboardData.weeklyMenuStats.wastePercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="quick-actions">
        <h3>⚡ Acciones rápidas</h3>
        <div className="actions-grid">
          <button className="action-card">
            <div className="action-icon">👨‍🎓</div>
            <div className="action-content">
              <h4>Registrar estudiante</h4>
              <p>Agregar nuevo estudiante al sistema</p>
            </div>
          </button>
          
          <button className="action-card">
            <div className="action-icon">👨‍👩‍👧‍👦</div>
            <div className="action-content">
              <h4>Registrar padre</h4>
              <p>Vincular padre a estudiante</p>
            </div>
          </button>
          
          <button className="action-card">
            <div className="action-icon">🏫</div>
            <div className="action-content">
              <h4>Actualizar perfil escuela</h4>
              <p>Modificar información institucional</p>
            </div>
          </button>
          
          <button className="action-card">
            <div className="action-icon">📊</div>
            <div className="action-content">
              <h4>Generar reporte</h4>
              <p>Reportes de nutrición y asistencia</p>
            </div>
          </button>
          
          <button className="action-card">
            <div className="action-icon">👥</div>
            <div className="action-content">
              <h4>Gestionar personal</h4>
              <p>Administrar equipo de la escuela</p>
            </div>
          </button>
          
          <button className="action-card">
            <div className="action-icon">📅</div>
            <div className="action-content">
              <h4>Programar evento</h4>
              <p>Crear reuniones y actividades</p>
            </div>
          </button>
        </div>
      </div>

      {/* Información de la escuela */}
      <div className="school-info-summary">
        <h3>🏫 Información de {currentSchool?.name}</h3>
        <div className="school-info-card">
          <div className="school-logo">
            <span className="school-emoji">{currentSchool?.logo}</span>
          </div>
          <div className="school-details">
            <div className="school-detail-row">
              <span className="detail-label">Director:</span>
              <span className="detail-value">Roberto Mendoza Silva</span>
            </div>
            <div className="school-detail-row">
              <span className="detail-label">Dirección:</span>
              <span className="detail-value">Av. Principal 123, Valparaíso</span>
            </div>
            <div className="school-detail-row">
              <span className="detail-label">Teléfono:</span>
              <span className="detail-value">+56 32 234 5678</span>
            </div>
            <div className="school-detail-row">
              <span className="detail-label">Email:</span>
              <span className="detail-value">contacto@{currentSchool?.name.toLowerCase().replace(/\s+/g, '')}.edu.cl</span>
            </div>
            <div className="school-detail-row">
              <span className="detail-label">Nivel:</span>
              <span className="detail-value">Educación Básica (1° a 8°)</span>
            </div>
          </div>
          <button className="edit-school-btn">
            ✏️ Editar información
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}