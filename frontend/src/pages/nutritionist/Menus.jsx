import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function NutritionistMenus() {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [activeView, setActiveView] = useState('calendar'); // calendar, pending

  // Datos de ejemplo de menús creados por el nutricionista
  const myMenus = [
    {
      id: 1,
      date: '2025-01-13',
      day: 'Lunes',
      breakfast: {
        name: 'Avena con frutas y nueces',
        ingredients: ['Avena', 'Plátano', 'Manzana', 'Nueces', 'Leche'],
        calories: 280,
        proteins: 12,
        carbs: 45,
        fats: 8
      },
      lunch: {
        name: 'Pollo a la plancha con vegetales',
        ingredients: ['Pechuga pollo', 'Brócoli', 'Zanahoria', 'Arroz integral', 'Aceite oliva'],
        calories: 520,
        proteins: 38,
        carbs: 55,
        fats: 15
      },
      snack: {
        name: 'Yogurt natural con granola',
        ingredients: ['Yogurt natural', 'Granola casera', 'Fresas'],
        calories: 180,
        proteins: 8,
        carbs: 25,
        fats: 6
      },
      status: 'aprobado',
      approvedBy: 'Admin Sistema',
      approvedDate: '2025-01-12',
      notes: 'Menú balanceado, cumple estándares nutricionales'
    },
    {
      id: 2,
      date: '2025-01-14',
      day: 'Martes',
      breakfast: {
        name: 'Tostadas integrales con aguacate',
        ingredients: ['Pan integral', 'Aguacate', 'Tomate', 'Huevo', 'Aceite oliva'],
        calories: 320,
        proteins: 16,
        carbs: 28,
        fats: 18
      },
      lunch: {
        name: 'Pescado al horno con quinoa',
        ingredients: ['Filete pescado', 'Quinoa', 'Espinacas', 'Limón', 'Hierbas'],
        calories: 480,
        proteins: 42,
        carbs: 40,
        fats: 16
      },
      snack: {
        name: 'Smoothie de frutas',
        ingredients: ['Mango', 'Piña', 'Yogurt', 'Avena'],
        calories: 150,
        proteins: 5,
        carbs: 32,
        fats: 2
      },
      status: 'pendiente',
      createdDate: '2025-01-10',
      notes: 'Enviado para revisión'
    }
  ];

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  const getWeekMenus = () => {
    const weekMenus = {};
    weekDays.forEach(day => {
      weekMenus[day] = myMenus.find(menu => menu.day === day) || null;
    });
    return weekMenus;
  };

  const weekMenus = getWeekMenus();
  const pendingMenus = myMenus.filter(menu => menu.status === 'pendiente');
  const approvedMenus = myMenus.filter(menu => menu.status === 'aprobado');

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Gestión de Menús</h1>
        <p className="page-description">Crea y administra los menús nutricionales para tu escuela</p>
      </div>

      {/* Estadísticas del nutricionista */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-content">
            <h3 className="stat-number">{myMenus.length}</h3>
            <p className="stat-label">Menús Creados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-number">{approvedMenus.length}</h3>
            <p className="stat-label">Menús Aprobados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3 className="stat-number">{pendingMenus.length}</h3>
            <p className="stat-label">Pendientes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🥗</div>
          <div className="stat-content">
            <h3 className="stat-number">485</h3>
            <p className="stat-label">Calorías Promedio</p>
          </div>
        </div>
      </div>

      {/* Controles de vista */}
      <div className="menu-controls">
        <div className="control-group">
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="week-selector"
          >
            <option value="current">Semana Actual</option>
            <option value="next">Próxima Semana</option>
            <option value="previous">Semana Anterior</option>
          </select>
        </div>

        <div className="view-controls">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${activeView === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveView('calendar')}
            >
              📅 Calendario
            </button>
            <button 
              className={`toggle-btn ${activeView === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveView('pending')}
            >
              ⏳ Pendientes
            </button>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Crear Menú
          </button>
        </div>
      </div>

      {/* Vista de calendario */}
      {activeView === 'calendar' && (
        <div className="menu-calendar">
          <div className="calendar-header">
            <h3>Menús de la Semana - 13 al 17 de Enero, 2025</h3>
          </div>
          <div className="calendar-grid">
            {weekDays.map(day => (
              <div key={day} className="day-column">
                <div className="day-header">
                  <h4>{day}</h4>
                  <span className="day-date">
                    {day === 'Lunes' ? '13' : day === 'Martes' ? '14' : day === 'Miércoles' ? '15' : day === 'Jueves' ? '16' : '17'}
                  </span>
                </div>
                
                {weekMenus[day] ? (
                  <div className="day-menu">
                    <div className="meal-section">
                      <h5>🌅 Desayuno</h5>
                      <div className="meal-item">
                        <span className="meal-name">{weekMenus[day].breakfast.name}</span>
                        <span className="meal-calories">{weekMenus[day].breakfast.calories} cal</span>
                        <div className="meal-macros">
                          <span>P: {weekMenus[day].breakfast.proteins}g</span>
                          <span>C: {weekMenus[day].breakfast.carbs}g</span>
                          <span>G: {weekMenus[day].breakfast.fats}g</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="meal-section">
                      <h5>🍽️ Almuerzo</h5>
                      <div className="meal-item">
                        <span className="meal-name">{weekMenus[day].lunch.name}</span>
                        <span className="meal-calories">{weekMenus[day].lunch.calories} cal</span>
                        <div className="meal-macros">
                          <span>P: {weekMenus[day].lunch.proteins}g</span>
                          <span>C: {weekMenus[day].lunch.carbs}g</span>
                          <span>G: {weekMenus[day].lunch.fats}g</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="meal-section">
                      <h5>🍎 Merienda</h5>
                      <div className="meal-item">
                        <span className="meal-name">{weekMenus[day].snack.name}</span>
                        <span className="meal-calories">{weekMenus[day].snack.calories} cal</span>
                        <div className="meal-macros">
                          <span>P: {weekMenus[day].snack.proteins}g</span>
                          <span>C: {weekMenus[day].snack.carbs}g</span>
                          <span>G: {weekMenus[day].snack.fats}g</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="menu-actions">
                      <span className={`status-badge ${weekMenus[day].status}`}>
                        {weekMenus[day].status === 'aprobado' ? 'Aprobado' : 'Pendiente'}
                      </span>
                      <div className="action-buttons">
                        <button className="btn-icon edit" title="Editar">✏️</button>
                        <button className="btn-icon view" title="Ver detalles">👁️</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-day">
                    <p>Sin menú creado</p>
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => {
                        setSelectedDate(`2025-01-${day === 'Lunes' ? '13' : day === 'Martes' ? '14' : day === 'Miércoles' ? '15' : day === 'Jueves' ? '16' : '17'}`);
                        setShowCreateModal(true);
                      }}
                    >
                      ➕ Crear
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vista de menús pendientes */}
      {activeView === 'pending' && (
        <div className="pending-menus">
          <h3>Menús Pendientes de Aprobación</h3>
          {pendingMenus.length > 0 ? (
            <div className="pending-list">
              {pendingMenus.map(menu => (
                <div key={menu.id} className="pending-menu-card">
                  <div className="menu-header">
                    <div className="menu-date">
                      <h4>{menu.day}</h4>
                      <span>{menu.date}</span>
                    </div>
                    <div className="menu-status">
                      <span className="status-badge pendiente">⏳ Pendiente</span>
                    </div>
                  </div>
                  
                  <div className="menu-summary">
                    <div className="meals-overview">
                      <div className="meal-overview">
                        <strong>Desayuno:</strong> {menu.breakfast.name}
                        <span className="calories">({menu.breakfast.calories} cal)</span>
                      </div>
                      <div className="meal-overview">
                        <strong>Almuerzo:</strong> {menu.lunch.name}
                        <span className="calories">({menu.lunch.calories} cal)</span>
                      </div>
                      <div className="meal-overview">
                        <strong>Merienda:</strong> {menu.snack.name}
                        <span className="calories">({menu.snack.calories} cal)</span>
                      </div>
                    </div>
                    
                    <div className="total-nutrition">
                      <h5>Resumen Nutricional</h5>
                      <div className="nutrition-totals">
                        <span>Total: {menu.breakfast.calories + menu.lunch.calories + menu.snack.calories} cal</span>
                        <span>Proteínas: {menu.breakfast.proteins + menu.lunch.proteins + menu.snack.proteins}g</span>
                        <span>Carbohidratos: {menu.breakfast.carbs + menu.lunch.carbs + menu.snack.carbs}g</span>
                        <span>Grasas: {menu.breakfast.fats + menu.lunch.fats + menu.snack.fats}g</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="menu-actions">
                    <small className="creation-date">Creado: {menu.createdDate}</small>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-outline">Ver Detalles</button>
                      <button className="btn btn-sm btn-primary">Editar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <h4>¡Excelente trabajo!</h4>
              <p>No tienes menús pendientes de aprobación.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal para crear menú */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3 className="modal-title">Crear Nuevo Menú</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="menu-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha del Menú</label>
                    <input 
                      type="date" 
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Número de Porciones</label>
                    <input type="number" placeholder="450" min="1" />
                  </div>
                </div>

                <div className="meals-section">
                  <h4>🌅 Desayuno</h4>
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Nombre del plato</label>
                      <input type="text" placeholder="Ej: Avena con frutas y nueces" />
                    </div>
                    <div className="form-group">
                      <label>Calorías estimadas</label>
                      <input type="number" placeholder="280" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Ingredientes (separados por coma)</label>
                    <textarea 
                      placeholder="Avena, plátano, manzana, nueces, leche descremada"
                      rows="2"
                    ></textarea>
                  </div>
                </div>

                <div className="meals-section">
                  <h4>🍽️ Almuerzo</h4>
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Nombre del plato</label>
                      <input type="text" placeholder="Ej: Pollo a la plancha con vegetales" />
                    </div>
                    <div className="form-group">
                      <label>Calorías estimadas</label>
                      <input type="number" placeholder="520" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Ingredientes (separados por coma)</label>
                    <textarea 
                      placeholder="Pechuga de pollo, brócoli, zanahoria, arroz integral"
                      rows="2"
                    ></textarea>
                  </div>
                </div>

                <div className="meals-section">
                  <h4>🍎 Merienda</h4>
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Nombre de la merienda</label>
                      <input type="text" placeholder="Ej: Yogurt natural con granola" />
                    </div>
                    <div className="form-group">
                      <label>Calorías estimadas</label>
                      <input type="number" placeholder="180" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Ingredientes (separados por coma)</label>
                    <textarea 
                      placeholder="Yogurt natural, granola casera, fresas"
                      rows="2"
                    ></textarea>
                  </div>
                </div>

                <div className="form-group">
                  <label>Notas adicionales</label>
                  <textarea 
                    placeholder="Información nutricional adicional, consideraciones especiales, etc."
                    rows="3"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Crear y Enviar para Aprobación
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
