import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import '../../styles/admin/Menus.css';
import { useState } from 'react';

export default function Menus() {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [selectedSchool, setSelectedSchool] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeView, setActiveView] = useState('calendar'); // calendar, list

  // Datos de ejemplo de menús
  const menus = [
    {
      id: 1,
      date: '2025-01-13',
      day: 'Lunes',
      school: 'Escuela Primaria #1',
      breakfast: {
        name: 'Avena con frutas',
        calories: 250,
        proteins: 8,
        carbs: 45,
        fats: 5
      },
      lunch: {
        name: 'Pollo a la plancha con arroz y vegetales',
        calories: 520,
        proteins: 35,
        carbs: 60,
        fats: 12
      },
      snack: {
        name: 'Yogurt con granola',
        calories: 180,
        proteins: 6,
        carbs: 25,
        fats: 6
      },
      status: 'aprobado'
    },
    {
      id: 2,
      date: '2025-01-14',
      day: 'Martes', 
      school: 'Escuela Primaria #1',
      breakfast: {
        name: 'Tostadas integrales con huevo',
        calories: 280,
        proteins: 15,
        carbs: 30,
        fats: 12
      },
      lunch: {
        name: 'Pescado al horno con puré de papas',
        calories: 480,
        proteins: 40,
        carbs: 45,
        fats: 15
      },
      snack: {
        name: 'Fruta fresca',
        calories: 80,
        proteins: 1,
        carbs: 20,
        fats: 0
      },
      status: 'pendiente'
    }
  ];

  const schools = [
    { id: 'all', name: 'Todas las escuelas' },
    { id: 'escuela1', name: 'Escuela Primaria #1' },
    { id: 'escuela2', name: 'Escuela Primaria #2' },
    { id: 'escuela3', name: 'Escuela Secundaria #1' }
  ];

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  const filteredMenus = menus.filter(menu => {
    const matchesSchool = selectedSchool === 'all' || menu.school.includes(selectedSchool);
    return matchesSchool;
  });

  const getWeekMenus = () => {
    const weekMenus = {};
    weekDays.forEach(day => {
      weekMenus[day] = filteredMenus.find(menu => menu.day === day) || null;
    });
    return weekMenus;
  };

  const weekMenus = getWeekMenus();

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="admin-menus">
        <div className="page-header">
          <h1 className="page-title">Gestión de Menús</h1>
          <p className="page-description">Administra los menús nutricionales de todas las escuelas</p>
        </div>

      {/* Estadísticas de menús */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-content">
            <h3 className="stat-number">156</h3>
            <p className="stat-label">Menús Activos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-number">142</h3>
            <p className="stat-label">Menús Aprobados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3 className="stat-number">14</h3>
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

      {/* Controles de filtro y vista */}
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

          <select
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
            className="school-selector"
          >
            {schools.map(school => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
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
              className={`toggle-btn ${activeView === 'list' ? 'active' : ''}`}
              onClick={() => setActiveView('list')}
            >
              📋 Lista
            </button>
          </div>
          
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            ➕ Crear Menú
          </button>
        </div>
      </div>

      {/* Vista de calendario */}
      {activeView === 'calendar' && (
        <div className="menu-calendar">
          <div className="calendar-header">
            <h3>Semana del 13 al 17 de Enero, 2025</h3>
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
                      </div>
                    </div>
                    
                    <div className="meal-section">
                      <h5>🍽️ Almuerzo</h5>
                      <div className="meal-item">
                        <span className="meal-name">{weekMenus[day].lunch.name}</span>
                        <span className="meal-calories">{weekMenus[day].lunch.calories} cal</span>
                      </div>
                    </div>
                    
                    <div className="meal-section">
                      <h5>🍎 Merienda</h5>
                      <div className="meal-item">
                        <span className="meal-name">{weekMenus[day].snack.name}</span>
                        <span className="meal-calories">{weekMenus[day].snack.calories} cal</span>
                      </div>
                    </div>
                    
                    <div className="menu-status">
                      <span className={`status-badge ${weekMenus[day].status}`}>
                        {weekMenus[day].status === 'aprobado' ? 'Aprobado' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="empty-day">
                    <p>Sin menú asignado</p>
                    <button className="btn btn-sm btn-outline">
                      ➕ Agregar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vista de lista */}
      {activeView === 'list' && (
        <div className="menu-list">
          <div className="table-container">
            <table className="menus-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Escuela</th>
                  <th>Desayuno</th>
                  <th>Almuerzo</th>
                  <th>Merienda</th>
                  <th>Calorías Totales</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredMenus.map(menu => (
                  <tr key={menu.id}>
                    <td>
                      <div className="date-info">
                        <span className="day">{menu.day}</span>
                        <span className="date">{menu.date}</span>
                      </div>
                    </td>
                    <td>{menu.school}</td>
                    <td>
                      <div className="meal-summary">
                        <span className="meal-name">{menu.breakfast.name}</span>
                        <span className="meal-calories">{menu.breakfast.calories}cal</span>
                      </div>
                    </td>
                    <td>
                      <div className="meal-summary">
                        <span className="meal-name">{menu.lunch.name}</span>
                        <span className="meal-calories">{menu.lunch.calories}cal</span>
                      </div>
                    </td>
                    <td>
                      <div className="meal-summary">
                        <span className="meal-name">{menu.snack.name}</span>
                        <span className="meal-calories">{menu.snack.calories}cal</span>
                      </div>
                    </td>
                    <td>
                      <strong>{menu.breakfast.calories + menu.lunch.calories + menu.snack.calories}</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${menu.status}`}>
                        {menu.status === 'aprobado' ? 'Aprobado' : 'Pendiente'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="Ver detalles">
                          👁️
                        </button>
                        <button className="btn-icon edit" title="Editar">
                          ✏️
                        </button>
                        <button className="btn-icon approve" title="Aprobar">
                          ✅
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para crear menú */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3 className="modal-title">Crear Nuevo Menú</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="menu-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha</label>
                    <input type="date" />
                  </div>
                  <div className="form-group">
                    <label>Escuela</label>
                    <select>
                      <option value="">Seleccionar escuela</option>
                      <option value="escuela1">Escuela Primaria #1</option>
                      <option value="escuela2">Escuela Primaria #2</option>
                      <option value="escuela3">Escuela Secundaria #1</option>
                    </select>
                  </div>
                </div>

                <div className="meals-section">
                  <h4>🌅 Desayuno</h4>
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Plato principal</label>
                      <input type="text" placeholder="Ej: Avena con frutas" />
                    </div>
                    <div className="form-group">
                      <label>Calorías</label>
                      <input type="number" placeholder="250" />
                    </div>
                  </div>
                </div>

                <div className="meals-section">
                  <h4>🍽️ Almuerzo</h4>
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Plato principal</label>
                      <input type="text" placeholder="Ej: Pollo a la plancha con arroz" />
                    </div>
                    <div className="form-group">
                      <label>Calorías</label>
                      <input type="number" placeholder="520" />
                    </div>
                  </div>
                </div>

                <div className="meals-section">
                  <h4>🍎 Merienda</h4>
                  <div className="form-row">
                    <div className="form-group flex-2">
                      <label>Merienda</label>
                      <input type="text" placeholder="Ej: Yogurt con granola" />
                    </div>
                    <div className="form-group">
                      <label>Calorías</label>
                      <input type="number" placeholder="180" />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Observaciones nutricionales</label>
                  <textarea 
                    placeholder="Información adicional sobre el menú..."
                    rows="3"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Guardar Menú
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}