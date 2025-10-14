import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function ParentMenus() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedChild, setSelectedChild] = useState('all');

  // Datos de ejemplo de hijos
  const children = [
    { id: 1, name: 'Ana María', grade: '3° Básico', allergies: ['nueces'], preferences: ['pollo', 'frutas'] },
    { id: 2, name: 'Carlos José', grade: '5° Básico', allergies: [], preferences: ['pasta', 'verduras'] }
  ];

  // Datos de ejemplo de menús semanales
  const weeklyMenus = [
    {
      week: 'Semana del 7 - 11 de Octubre, 2025',
      days: [
        {
          date: '2025-10-07',
          day: 'Lunes',
          meals: {
            breakfast: {
              name: 'Avena con frutas y nueces',
              description: 'Avena integral con plátano, fresas y nueces picadas',
              calories: 320,
              allergens: ['nueces'],
              nutrients: { protein: 12, carbs: 45, fat: 8, fiber: 6 }
            },
            lunch: {
              name: 'Pollo a la plancha con quinoa',
              description: 'Pechuga de pollo a la plancha, quinoa cocida y ensalada mixta',
              calories: 480,
              allergens: [],
              nutrients: { protein: 35, carbs: 40, fat: 12, fiber: 8 }
            },
            snack: {
              name: 'Yogurt con granola',
              description: 'Yogurt natural con granola casera y miel',
              calories: 180,
              allergens: ['lácteos'],
              nutrients: { protein: 8, carbs: 25, fat: 5, fiber: 3 }
            }
          }
        },
        {
          date: '2025-10-08',
          day: 'Martes',
          meals: {
            breakfast: {
              name: 'Tostadas integrales con palta',
              description: 'Pan integral tostado con palta, tomate y huevo revuelto',
              calories: 350,
              allergens: ['gluten', 'huevos'],
              nutrients: { protein: 15, carbs: 35, fat: 18, fiber: 7 }
            },
            lunch: {
              name: 'Pescado al vapor con vegetales',
              description: 'Filete de pescado al vapor con mix de vegetales y arroz integral',
              calories: 420,
              allergens: ['pescado'],
              nutrients: { protein: 30, carbs: 38, fat: 10, fiber: 6 }
            },
            snack: {
              name: 'Frutas de temporada',
              description: 'Mix de frutas frescas: manzana, pera y uvas',
              calories: 120,
              allergens: [],
              nutrients: { protein: 2, carbs: 30, fat: 0, fiber: 5 }
            }
          }
        },
        {
          date: '2025-10-09',
          day: 'Miércoles',
          meals: {
            breakfast: {
              name: 'Batido de frutas con avena',
              description: 'Batido de plátano, frutilla y avena con leche',
              calories: 280,
              allergens: ['lácteos'],
              nutrients: { protein: 10, carbs: 50, fat: 4, fiber: 8 }
            },
            lunch: {
              name: 'Lentejas guisadas con arroz',
              description: 'Lentejas guisadas con verduras acompañadas de arroz blanco',
              calories: 380,
              allergens: [],
              nutrients: { protein: 18, carbs: 55, fat: 6, fiber: 12 }
            },
            snack: {
              name: 'Galletas de avena caseras',
              description: 'Galletas de avena integral con pasas',
              calories: 160,
              allergens: ['gluten'],
              nutrients: { protein: 4, carbs: 28, fat: 6, fiber: 4 }
            }
          }
        },
        {
          date: '2025-10-10',
          day: 'Jueves',
          meals: {
            breakfast: {
              name: 'Cereales integrales con leche',
              description: 'Cereales integrales con leche descremada y plátano',
              calories: 300,
              allergens: ['gluten', 'lácteos'],
              nutrients: { protein: 12, carbs: 55, fat: 3, fiber: 8 }
            },
            lunch: {
              name: 'Pasta con salsa de tomate y albahaca',
              description: 'Pasta integral con salsa de tomate natural y queso parmesano',
              calories: 450,
              allergens: ['gluten', 'lácteos'],
              nutrients: { protein: 18, carbs: 65, fat: 12, fiber: 8 }
            },
            snack: {
              name: 'Palitos de apio con hummus',
              description: 'Palitos de apio fresco con hummus de garbanzos',
              calories: 140,
              allergens: [],
              nutrients: { protein: 6, carbs: 15, fat: 7, fiber: 5 }
            }
          }
        },
        {
          date: '2025-10-11',
          day: 'Viernes',
          meals: {
            breakfast: {
              name: 'Panqueques de avena con miel',
              description: 'Panqueques de avena integral con miel y frutas del bosque',
              calories: 340,
              allergens: ['huevos', 'lácteos'],
              nutrients: { protein: 14, carbs: 48, fat: 10, fiber: 6 }
            },
            lunch: {
              name: 'Pollo al horno con papas',
              description: 'Muslo de pollo al horno con papas doradas y ensalada verde',
              calories: 520,
              allergens: [],
              nutrients: { protein: 32, carbs: 45, fat: 20, fiber: 6 }
            },
            snack: {
              name: 'Smoothie de frutas',
              description: 'Smoothie de mango, piña y yogurt natural',
              calories: 200,
              allergens: ['lácteos'],
              nutrients: { protein: 6, carbs: 40, fat: 3, fiber: 4 }
            }
          }
        }
      ]
    }
  ];

  const currentWeekMenu = weeklyMenus[selectedWeek];

  const getAllergenWarnings = (meal, childAllergies) => {
    return meal.allergens.filter(allergen => 
      childAllergies.some(childAllergen => 
        allergen.toLowerCase().includes(childAllergen.toLowerCase())
      )
    );
  };

  const getMealTypeIcon = (mealType) => {
    const icons = {
      breakfast: '🌅',
      lunch: '🍽️',
      snack: '🍎'
    };
    return icons[mealType] || '🍽️';
  };

  const getMealTypeName = (mealType) => {
    const names = {
      breakfast: 'Desayuno',
      lunch: 'Almuerzo',
      snack: 'Colación'
    };
    return names[mealType] || mealType;
  };

  const getFilteredChildren = () => {
    if (selectedChild === 'all') return children;
    return children.filter(child => child.id.toString() === selectedChild);
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">Menús Semanales</h1>
        <p className="page-description">Revisa los menús programados para tus hijos</p>
      </div>

      {/* Controles de filtro */}
      <div className="menu-controls">
        <div className="control-group">
          <label>Ver menús para:</label>
          <select
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            className="child-selector"
          >
            <option value="all">Todos mis hijos</option>
            {children.map(child => (
              <option key={child.id} value={child.id.toString()}>
                {child.name} ({child.grade})
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Semana:</label>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
            className="week-selector"
          >
            <option value={0}>Semana Actual</option>
            <option value={1}>Próxima Semana</option>
          </select>
        </div>
      </div>

      {/* Información de hijos seleccionados */}
      {selectedChild !== 'all' && (
        <div className="child-info">
          {getFilteredChildren().map(child => (
            <div key={child.id} className="child-card">
              <div className="child-header">
                <h3>{child.name}</h3>
                <span className="child-grade">{child.grade}</span>
              </div>
              <div className="child-details">
                {child.allergies.length > 0 && (
                  <div className="child-allergies">
                    <strong>⚠️ Alergias:</strong> {child.allergies.join(', ')}
                  </div>
                )}
                {child.preferences.length > 0 && (
                  <div className="child-preferences">
                    <strong>❤️ Preferencias:</strong> {child.preferences.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Menú semanal */}
      <div className="weekly-menu">
        <div className="week-header">
          <h2>{currentWeekMenu.week}</h2>
        </div>

        <div className="menu-week-grid">
          {currentWeekMenu.days.map((dayMenu, dayIndex) => (
            <div key={dayIndex} className="day-column">
              <div className="day-header">
                <h3 className="day-name">{dayMenu.day}</h3>
                <span className="day-date">{new Date(dayMenu.date).toLocaleDateString()}</span>
              </div>

              <div className="day-meals">
                {Object.entries(dayMenu.meals).map(([mealType, meal]) => (
                  <div key={mealType} className="meal-card">
                    <div className="meal-header">
                      <div className="meal-type">
                        <span className="meal-icon">{getMealTypeIcon(mealType)}</span>
                        <span className="meal-name">{getMealTypeName(mealType)}</span>
                      </div>
                      <span className="meal-calories">{meal.calories} kcal</span>
                    </div>

                    <div className="meal-content">
                      <h4 className="dish-name">{meal.name}</h4>
                      <p className="dish-description">{meal.description}</p>

                      {/* Alertas de alergias para hijos seleccionados */}
                      {getFilteredChildren().map(child => {
                        const warnings = getAllergenWarnings(meal, child.allergies);
                        return warnings.length > 0 ? (
                          <div key={child.id} className="allergy-warning">
                            <span className="warning-icon">⚠️</span>
                            <span className="warning-text">
                              ¡Atención {child.name}! Contiene: {warnings.join(', ')}
                            </span>
                          </div>
                        ) : null;
                      })}

                      {/* Información nutricional */}
                      <div className="nutrition-summary">
                        <div className="nutrition-item">
                          <span className="nutrition-value">{meal.nutrients.protein}g</span>
                          <span className="nutrition-label">Proteína</span>
                        </div>
                        <div className="nutrition-item">
                          <span className="nutrition-value">{meal.nutrients.carbs}g</span>
                          <span className="nutrition-label">Carbohidratos</span>
                        </div>
                        <div className="nutrition-item">
                          <span className="nutrition-value">{meal.nutrients.fat}g</span>
                          <span className="nutrition-label">Grasas</span>
                        </div>
                        <div className="nutrition-item">
                          <span className="nutrition-value">{meal.nutrients.fiber}g</span>
                          <span className="nutrition-label">Fibra</span>
                        </div>
                      </div>

                      {/* Alérgenos */}
                      {meal.allergens.length > 0 && (
                        <div className="allergens-info">
                          <strong>Contiene:</strong> {meal.allergens.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen nutricional semanal */}
      <div className="weekly-summary">
        <h3>Resumen Nutricional Semanal</h3>
        <div className="summary-stats">
          <div className="summary-stat">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <h4>Calorías Promedio</h4>
              <p>980 kcal/día</p>
            </div>
          </div>
          <div className="summary-stat">
            <div className="stat-icon">💪</div>
            <div className="stat-content">
              <h4>Proteína Diaria</h4>
              <p>65g promedio</p>
            </div>
          </div>
          <div className="summary-stat">
            <div className="stat-icon">🌾</div>
            <div className="stat-content">
              <h4>Fibra Diaria</h4>
              <p>28g promedio</p>
            </div>
          </div>
          <div className="summary-stat">
            <div className="stat-icon">🥗</div>
            <div className="stat-content">
              <h4>Variedad</h4>
              <p>15 alimentos diferentes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="menu-actions">
        <button className="btn btn-primary">
          📱 Descargar Menú PDF
        </button>
        <button className="btn btn-outline">
          📧 Recibir por Email
        </button>
        <button className="btn btn-outline">
          💬 Enviar Comentario
        </button>
      </div>
    </DashboardLayout>
  );
}