import DashboardLayout from '../../components/common/DashboardLayout.jsx';

export default function NutritionistDashboard() {
  const getMenuTypeIcon = (tipo) => {
    switch (tipo) {
      case 'desayuno': return '🌅';
      case 'almuerzo': return '�️';
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
    <DashboardLayout title="Panel de Nutricionista">
      <h2 className="nutritionist-title">Panel de Nutricionista</h2>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon menus">
              🍽️
            </div>
            <h3 className="stat-title">Menús Creados</h3>
          </div>
          <div className="stat-content">
            <div className="stat-number">45</div>
            <div className="stat-label">Total de menús diseñados</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon comidas">
              🥗
            </div>
            <h3 className="stat-title">Comidas Disponibles</h3>
          </div>
          <div className="stat-content">
            <div className="stat-number">128</div>
            <div className="stat-label">Opciones de comida registradas</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon calificacion">
              ⭐
            </div>
            <h3 className="stat-title">Calificación Promedio</h3>
          </div>
          <div className="stat-content">
            <div className="stat-number">4.2</div>
            <div className="stat-label">De 89 comentarios</div>
          </div>
        </div>
      </div>

      {/* Menús de hoy y acciones rápidas */}
      <div className="main-grid">
        <div className="menu-card">
          <h3 className="menu-title">Menús de Hoy</h3>
          <div className="menu-list">
            <div className="menu-item">
              <span className="menu-icon">{getMenuTypeIcon('desayuno')}</span>
              <div className="menu-info">
                <div className="menu-name">Desayuno</div>
                <div className="menu-description">Avena con frutas y yogurt</div>
              </div>
              <div className="menu-badge">Hoy</div>
            </div>
            <div className="menu-item">
              <span className="menu-icon">{getMenuTypeIcon('almuerzo')}</span>
              <div className="menu-info">
                <div className="menu-name">Almuerzo</div>
                <div className="menu-description">Pollo a la plancha con vegetales</div>
              </div>
              <div className="menu-badge">Hoy</div>
            </div>
            <div className="menu-item">
              <span className="menu-icon">{getMenuTypeIcon('merienda')}</span>
              <div className="menu-info">
                <div className="menu-name">Merienda</div>
                <div className="menu-description">Frutas frescas variadas</div>
              </div>
              <div className="menu-badge">Hoy</div>
            </div>
          </div>
        </div>

        <div className="actions-card">
          <h3 className="actions-title">Acciones Rápidas</h3>
          <div className="actions-buttons">
            <button className="btn btn-primary">
              ➕ Crear Nuevo Menú
            </button>
            <button className="btn btn-secondary">
              🥗 Agregar Comida
            </button>
            <button className="btn btn-outline">
              📊 Ver Estadísticas de Feedback
            </button>
            <button className="btn btn-outline">
              📋 Generar Reporte Nutricional
            </button>
          </div>
        </div>
      </div>

      {/* Feedback reciente */}
      <div className="feedback-card">
        <h3 className="feedback-title">Feedback Reciente</h3>
        <div className="feedback-list">
          <div className="feedback-item">
            <div className="feedback-header">
              <div className="feedback-user-info">
                <div className="feedback-user">Ana Martínez</div>
                <div className="feedback-date">Hace 2 horas</div>
              </div>
              <div className="feedback-rating">
                {renderStars(5)}
              </div>
            </div>
            <div className="feedback-comment">
              ¡Excelente el menú de hoy! Mi hijo quedó muy satisfecho con el almuerzo.
            </div>
          </div>
          
          <div className="feedback-item">
            <div className="feedback-header">
              <div className="feedback-user-info">
                <div className="feedback-user">Carlos López</div>
                <div className="feedback-date">Ayer</div>
              </div>
              <div className="feedback-rating">
                {renderStars(4)}
              </div>
            </div>
            <div className="feedback-comment">
              Muy buena variedad de vegetales. Sería genial incluir más opciones sin gluten.
            </div>
          </div>

          <div className="feedback-item">
            <div className="feedback-header">
              <div className="feedback-user-info">
                <div className="feedback-user">María González</div>
                <div className="feedback-date">Hace 2 días</div>
              </div>
              <div className="feedback-rating">
                {renderStars(5)}
              </div>
            </div>
            <div className="feedback-comment">
              Perfecto balance nutricional. Los niños disfrutan mucho las comidas.
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}