import DashboardLayout from '../../components/common/DashboardLayout.jsx';

export default function StudentDashboard() {
  // Manejadores para botones de acciones rápidas
  const handleViewWeeklyMenus = () => {
    alert('Función "Ver Menús de la Semana" en desarrollo. Próximamente disponible.');
  };

  const handleFoodInfo = () => {
    alert('Función "Información de Alimentos" en desarrollo. Próximamente disponible.');
  };

  const handleCommentMenu = () => {
    alert('Función "Comentar sobre el Menú" en desarrollo. Próximamente disponible.');
  };

  const getMenuTypeIcon = (tipo) => {
    switch (tipo) {
      case 'desayuno': return '🌅';
      case 'almuerzo': return '🍽️';
      case 'merienda': return '🍎';
      default: return '🍴';
    }
  };

  const nutritionTips = [
    {
      id: 1,
      icon: '💧',
      title: 'Hidratación',
      tip: 'Bebe al menos 6-8 vasos de agua al día para mantenerte hidratado.'
    },
    {
      id: 2,
      icon: '🥬',
      title: 'Verduras',
      tip: 'Come verduras de diferentes colores para obtener vitaminas variadas.'
    },
    {
      id: 3,
      icon: '🏃‍♂️',
      title: 'Actividad Física',
      tip: 'Combina una buena alimentación con ejercicio regular.'
    }
  ];

  return (
    <DashboardLayout title="Panel de Estudiante">
      <h2 className="student-title">Panel de Estudiante</h2>

      {/* Menús de hoy */}
      <div className="today-menus">
        <h3 className="today-title">🍽️ Tu Menú de Hoy - 9 de octubre de 2025</h3>
        
        <div className="menu-grid">
          <div className="menu-card desayuno">
            <div className="menu-header">
              <span className="menu-icon">{getMenuTypeIcon('desayuno')}</span>
              <div className="menu-type">Desayuno</div>
            </div>
            <div className="menu-date">Desayuno - Hoy</div>
            <div className="menu-description">Avena con frutas y yogurt natural</div>
            <div className="menu-foods">
              <div className="food-item">
                <div>
                  <div className="food-name">Avena integral</div>
                  <div className="food-category">Cereales</div>
                </div>
                <div className="food-calories">150 cal</div>
              </div>
              <div className="food-item">
                <div>
                  <div className="food-name">Frutas mixtas</div>
                  <div className="food-category">Frutas</div>
                </div>
                <div className="food-calories">80 cal</div>
              </div>
              <div className="food-item">
                <div>
                  <div className="food-name">Yogurt natural</div>
                  <div className="food-category">Lácteos</div>
                </div>
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

          <div className="menu-card almuerzo">
            <div className="menu-header">
              <span className="menu-icon">{getMenuTypeIcon('almuerzo')}</span>
              <div className="menu-type">Almuerzo</div>
            </div>
            <div className="menu-date">Almuerzo - Hoy</div>
            <div className="menu-description">Pollo a la plancha con vegetales y arroz</div>
            <div className="menu-foods">
              <div className="food-item">
                <div>
                  <div className="food-name">Pechuga de pollo</div>
                  <div className="food-category">Proteínas</div>
                </div>
                <div className="food-calories">250 cal</div>
              </div>
              <div className="food-item">
                <div>
                  <div className="food-name">Vegetales al vapor</div>
                  <div className="food-category">Verduras</div>
                </div>
                <div className="food-calories">60 cal</div>
              </div>
              <div className="food-item">
                <div>
                  <div className="food-name">Arroz integral</div>
                  <div className="food-category">Cereales</div>
                </div>
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

      {/* Tips nutricionales y información adicional */}
      <div className="info-grid">
        <div className="tips-card">
          <h3 className="tips-title">💡 Tips Nutricionales</h3>
          <div className="tips-list">
            {nutritionTips.map((tip) => (
              <div key={tip.id} className="tip-item">
                <span className="tip-icon">{tip.icon}</span>
                <div className="tip-content">
                  <div className="tip-title">{tip.title}</div>
                  <div className="tip-description">{tip.tip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="nutrition-card">
          <h3 className="nutrition-title">📊 Información Nutricional</h3>
          <div className="nutrition-total">
            <div className="total-calories">840</div>
            <div className="total-label">Calorías totales de hoy</div>
          </div>
          
          <div className="nutrition-breakdown">
            <div className="nutrition-stat">
              <div className="stat-value">47g</div>
              <div className="stat-label">Proteínas</div>
            </div>
            <div className="nutrition-stat">
              <div className="stat-value">20g</div>
              <div className="stat-label">Grasas</div>
            </div>
            <div className="nutrition-stat">
              <div className="stat-value">100g</div>
              <div className="stat-label">Carbohidratos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="actions-card">
        <h3 className="actions-title">🚀 Acciones Rápidas</h3>
        <div className="actions-buttons">
          <button className="btn btn-primary" onClick={handleViewWeeklyMenus}>
            📅 Ver Menús de la Semana
          </button>
          <button className="btn btn-secondary" onClick={handleFoodInfo}>
            🥗 Información de Alimentos
          </button>
          <button className="btn btn-outline" onClick={handleCommentMenu}>
            💬 Comentar sobre el Menú
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}