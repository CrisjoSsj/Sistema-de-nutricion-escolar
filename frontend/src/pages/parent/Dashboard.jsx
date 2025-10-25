import React, { useState } from 'react';
import DashboardLayout from '../../components/common/DashboardLayout.jsx';

export default function ParentDashboard() {
  // Manejadores para botones de acciones rápidas
  const handleViewNutrition = () => {
    alert('Función "Ver Información Nutricional" en desarrollo. Próximamente disponible.');
  };

  const handleSendMessage = () => {
    alert('Función "Enviar Mensaje" en desarrollo. Próximamente disponible.');
  };

  const handleViewReports = () => {
    alert('Función "Ver Reportes" en desarrollo. Próximamente disponible.');
  };

  const handleScheduleMeeting = () => {
    alert('Función "Programar Reunión" en desarrollo. Próximamente disponible.');
  };

  // Datos de ejemplo de hijos (mismo que en Children.jsx)
  const [children] = useState([
    {
      id: 1,
      name: 'Ana María González',
      grade: '3° Básico',
      age: 8,
      avatar: '👧',
      school: 'Escuela Umiña',
      allergies: ['nueces', 'mariscos'],
      stats: {
        attendanceRate: 95,
        avgMealRating: 4.2,
        favoriteFood: 'Pollo a la plancha'
      }
    },
    {
      id: 2,
      name: 'Carlos José González',
      grade: '5° Básico',
      age: 10,
      avatar: '👦',
      school: 'Escuela Umiña',
      allergies: [],
      stats: {
        attendanceRate: 88,
        avgMealRating: 3.9,
        favoriteFood: 'Pasta con verduras'
      }
    },
    {
      id: 3,
      name: 'Sofía González Pérez',
      grade: '1° Básico',
      age: 6,
      avatar: '👧',
      school: 'Colegio Central',
      allergies: ['lácteos'],
      stats: {
        attendanceRate: 92,
        avgMealRating: 3.8,
        favoriteFood: 'Smoothie de frutas'
      }
    }
  ]);
  const getMenuTypeIcon = (tipo) => {
    switch (tipo) {
      case 'desayuno': return '🌅';
      case 'almuerzo': return '🍽️';
      case 'merienda': return '🍎';
      default: return '🍴';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star empty'}>
        ★
      </span>
    ));
  };

  return (
    <DashboardLayout title="Panel de Padre/Tutor">
      <h2 className="parent-title">Panel de Padre/Tutor</h2>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon menus">
              📋
            </div>
            <h3 className="stat-title">Menús Disponibles</h3>
          </div>
          <div className="stat-content">
            <div className="stat-number">45</div>
            <div className="stat-label">Total de menús en el sistema</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon comentarios">
              💬
            </div>
            <h3 className="stat-title">Mis Comentarios</h3>
          </div>
          <div className="stat-content">
            <div className="stat-number">12</div>
            <div className="stat-label">Feedback enviado</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon calificacion">
              ⭐
            </div>
            <h3 className="stat-title">Mi Calificación Promedio</h3>
          </div>
          <div className="stat-content">
            <div className="stat-number">4.5</div>
            <div className="stat-label">Promedio de mis calificaciones</div>
          </div>
        </div>
      </div>

      {/* Resumen de Mis Hijos */}
      <div className="children-summary-section">
        <h3 className="section-title">👨‍👩‍👧‍👦 Mis Hijos</h3>
        
        {/* Resumen por escuelas si hay múltiples */}
        {(() => {
          const schoolGroups = children.reduce((acc, child) => {
            const school = child.school;
            acc[school] = (acc[school] || 0) + 1;
            return acc;
          }, {});
          
          return Object.keys(schoolGroups).length > 1 && (
            <div className="schools-summary-dashboard">
              <div className="summary-info">
                <span className="summary-icon">📊</span>
                <span className="summary-text">
                  Tienes {children.length} hijos en {Object.keys(schoolGroups).length} escuelas diferentes
                </span>
              </div>
            </div>
          );
        })()}

        <div className="children-cards-grid">
          {children.map(child => (
            <div key={child.id} className="child-summary-card">
              <div className="child-header">
                <div className="child-avatar-small">
                  <span className="avatar-emoji">{child.avatar}</span>
                </div>
                <div className="child-info">
                  <h4 className="child-name">{child.name}</h4>
                  <div className="child-details-small">
                    <span className="child-grade">{child.grade}</span>
                    <span className="child-age">{child.age} años</span>
                  </div>
                </div>
              </div>
              
              <div className="child-school-info">
                <span className="school-icon">🏫</span>
                <span className="school-name">{child.school}</span>
              </div>
              
              <div className="child-quick-stats">
                <div className="quick-stat">
                  <span className="stat-label">Asistencia</span>
                  <span className="stat-value">{child.stats.attendanceRate}%</span>
                </div>
                <div className="quick-stat">
                  <span className="stat-label">Calificación</span>
                  <span className="stat-value">{child.stats.avgMealRating}/5</span>
                </div>
              </div>
              
              {child.allergies.length > 0 && (
                <div className="child-allergies">
                  <span className="allergy-icon">⚠️</span>
                  <span className="allergy-text">
                    Alergias: {child.allergies.join(', ')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Menús de hoy */}
      <div className="today-menus">
        <h3 className="today-title">Menús de Hoy - 9 de octubre de 2025</h3>
        
        <div className="menu-grid">
          <div className="menu-card">
            <div className="menu-header">
              <span className="menu-icon">{getMenuTypeIcon('desayuno')}</span>
              <div className="menu-type">Desayuno</div>
            </div>
            <div className="menu-description">Avena con frutas y yogurt natural</div>
            <div className="menu-foods">
              <div className="food-item">
                <div className="food-name">Avena integral</div>
                <div className="food-calories">150 cal</div>
              </div>
              <div className="food-item">
                <div className="food-name">Frutas mixtas</div>
                <div className="food-calories">80 cal</div>
              </div>
              <div className="food-item">
                <div className="food-name">Yogurt natural</div>
                <div className="food-calories">120 cal</div>
              </div>
            </div>
            <div className="nutrition-summary">
              <div className="nutrition-item">
                <div className="nutrition-value">350</div>
                <div className="nutrition-label">Calorías</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-value">12g</div>
                <div className="nutrition-label">Proteínas</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-value">8g</div>
                <div className="nutrition-label">Grasas</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-value">58g</div>
                <div className="nutrition-label">Carbohidratos</div>
              </div>
            </div>
          </div>

          <div className="menu-card">
            <div className="menu-header">
              <span className="menu-icon">{getMenuTypeIcon('almuerzo')}</span>
              <div className="menu-type">Almuerzo</div>
            </div>
            <div className="menu-description">Pollo a la plancha con vegetales y arroz</div>
            <div className="menu-foods">
              <div className="food-item">
                <div className="food-name">Pechuga de pollo</div>
                <div className="food-calories">250 cal</div>
              </div>
              <div className="food-item">
                <div className="food-name">Vegetales al vapor</div>
                <div className="food-calories">60 cal</div>
              </div>
              <div className="food-item">
                <div className="food-name">Arroz integral</div>
                <div className="food-calories">180 cal</div>
              </div>
            </div>
            <div className="nutrition-summary">
              <div className="nutrition-item">
                <div className="nutrition-value">490</div>
                <div className="nutrition-label">Calorías</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-value">35g</div>
                <div className="nutrition-label">Proteínas</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-value">12g</div>
                <div className="nutrition-label">Grasas</div>
              </div>
              <div className="nutrition-item">
                <div className="nutrition-value">42g</div>
                <div className="nutrition-label">Carbohidratos</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas y feedback reciente */}
      <div className="bottom-grid">
        <div className="actions-card">
          <h3 className="actions-title">Acciones Rápidas</h3>
          <div className="actions-buttons">
            <button className="btn btn-primary">
              📋 Ver Todos los Menús
            </button>
            <button className="btn btn-secondary">
              💬 Enviar Feedback
            </button>
            <button className="btn btn-outline">
              📊 Ver Historial de Comentarios
            </button>
            <button className="btn btn-outline">
              🍎 Información Nutricional
            </button>
          </div>
        </div>

        <div className="feedback-card">
          <h3 className="feedback-title">Mis Comentarios Recientes</h3>
          <div className="feedback-list">
            <div className="feedback-item">
              <div className="feedback-header">
                <div className="feedback-rating">
                  {renderStars(5)}
                </div>
                <div className="feedback-date">Hace 2 días</div>
              </div>
              <div className="feedback-comment">
                Excelente el menú de ayer. Mi hijo disfrutó mucho el almuerzo.
              </div>
            </div>
            
            <div className="feedback-item">
              <div className="feedback-header">
                <div className="feedback-rating">
                  {renderStars(4)}
                </div>
                <div className="feedback-date">Hace 1 semana</div>
              </div>
              <div className="feedback-comment">
                Muy buena variedad de vegetales. Sería genial más opciones de frutas.
              </div>
            </div>

            <div className="feedback-item">
              <div className="feedback-header">
                <div className="feedback-rating">
                  {renderStars(5)}
                </div>
                <div className="feedback-date">Hace 2 semanas</div>
              </div>
              <div className="feedback-comment">
                Perfecto balance nutricional. Los menús están muy bien planificados.
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}