import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function NutritionistFoods() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  // Base de datos de alimentos
  const foods = [
    {
      id: 1,
      name: 'Pollo (pechuga)',
      category: 'proteinas',
      calories: 165,
      proteins: 31,
      carbs: 0,
      fats: 3.6,
      fiber: 0,
      sodium: 74,
      unit: '100g',
      allergens: [],
      description: 'Carne magra rica en proteínas'
    },
    {
      id: 2,
      name: 'Arroz integral',
      category: 'cereales',
      calories: 123,
      proteins: 2.6,
      carbs: 23,
      fats: 0.9,
      fiber: 1.8,
      sodium: 1,
      unit: '100g',
      allergens: ['gluten'],
      description: 'Cereal integral rico en fibra'
    },
    {
      id: 3,
      name: 'Brócoli',
      category: 'vegetales',
      calories: 34,
      proteins: 2.8,
      carbs: 7,
      fats: 0.4,
      fiber: 2.6,
      sodium: 33,
      unit: '100g',
      allergens: [],
      description: 'Vegetal rico en vitaminas y minerales'
    },
    {
      id: 4,
      name: 'Yogurt natural',
      category: 'lacteos',
      calories: 59,
      proteins: 10,
      carbs: 3.6,
      fats: 0.4,
      fiber: 0,
      sodium: 36,
      unit: '100g',
      allergens: ['lactosa'],
      description: 'Lácteo probiótico bajo en grasa'
    },
    {
      id: 5,
      name: 'Avena',
      category: 'cereales',
      calories: 389,
      proteins: 16.9,
      carbs: 66.3,
      fats: 6.9,
      fiber: 10.6,
      sodium: 2,
      unit: '100g',
      allergens: ['gluten'],
      description: 'Cereal integral rico en fibra beta-glucano'
    },
    {
      id: 6,
      name: 'Plátano',
      category: 'frutas',
      calories: 89,
      proteins: 1.1,
      carbs: 22.8,
      fats: 0.3,
      fiber: 2.6,
      sodium: 1,
      unit: '100g',
      allergens: [],
      description: 'Fruta rica en potasio y energía'
    },
    {
      id: 7,
      name: 'Salmón',
      category: 'proteinas',
      calories: 208,
      proteins: 25.4,
      carbs: 0,
      fats: 12.4,
      fiber: 0,
      sodium: 64,
      unit: '100g',
      allergens: ['pescado'],
      description: 'Pescado graso rico en omega-3'
    },
    {
      id: 8,
      name: 'Espinacas',
      category: 'vegetales',
      calories: 23,
      proteins: 2.9,
      carbs: 3.6,
      fats: 0.4,
      fiber: 2.2,
      sodium: 79,
      unit: '100g',
      allergens: [],
      description: 'Vegetal de hoja verde rico en hierro'
    }
  ];

  const categories = [
    { value: 'all', label: 'Todos los alimentos' },
    { value: 'proteinas', label: 'Proteínas' },
    { value: 'cereales', label: 'Cereales y Granos' },
    { value: 'vegetales', label: 'Vegetales' },
    { value: 'frutas', label: 'Frutas' },
    { value: 'lacteos', label: 'Lácteos' },
    { value: 'grasas', label: 'Grasas y Aceites' }
  ];

  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryStats = () => {
    const stats = {};
    categories.forEach(cat => {
      if (cat.value !== 'all') {
        stats[cat.value] = foods.filter(food => food.category === cat.value).length;
      }
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  const getCategoryIcon = (category) => {
    const icons = {
      'proteinas': '🥩',
      'cereales': '🌾',
      'vegetales': '🥬',
      'frutas': '🍎',
      'lacteos': '🥛',
      'grasas': '🫒'
    };
    return icons[category] || '🍽️';
  };

  const getAllergenColor = (allergen) => {
    const colors = {
      'gluten': '#f59e0b',
      'lactosa': '#3b82f6',
      'pescado': '#06b6d4',
      'nueces': '#8b5cf6',
      'soja': '#84cc16'
    };
    return colors[allergen] || '#6b7280';
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">Base de Alimentos</h1>
        <p className="page-description">Consulta y gestiona la información nutricional de los alimentos</p>
      </div>

      {/* Estadísticas por categoría */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-content">
            <h3 className="stat-number">{foods.length}</h3>
            <p className="stat-label">Total de Alimentos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🥩</div>
          <div className="stat-content">
            <h3 className="stat-number">{categoryStats.proteinas || 0}</h3>
            <p className="stat-label">Proteínas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🥬</div>
          <div className="stat-content">
            <h3 className="stat-number">{categoryStats.vegetales || 0}</h3>
            <p className="stat-label">Vegetales</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🍎</div>
          <div className="stat-content">
            <h3 className="stat-number">{categoryStats.frutas || 0}</h3>
            <p className="stat-label">Frutas</p>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="filters-section">
        <div className="filters-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar alimentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-filter"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Agregar Alimento
            </button>
          </div>
        </div>
      </div>

      {/* Lista de alimentos */}
      <div className="foods-grid">
        {filteredFoods.map(food => (
          <div key={food.id} className="food-card">
            <div className="food-header">
              <div className="food-icon">
                {getCategoryIcon(food.category)}
              </div>
              <div className="food-info">
                <h3 className="food-name">{food.name}</h3>
                <span className="food-unit">Por {food.unit}</span>
              </div>
              <div className="food-actions">
                <button 
                  className="btn-icon view" 
                  title="Ver detalles"
                  onClick={() => setSelectedFood(food)}
                >
                  👁️
                </button>
                <button className="btn-icon edit" title="Editar">
                  ✏️
                </button>
              </div>
            </div>

            <div className="food-nutrition">
              <div className="nutrition-main">
                <div className="calories">
                  <span className="value">{food.calories}</span>
                  <span className="label">kcal</span>
                </div>
              </div>
              
              <div className="macros-grid">
                <div className="macro-item">
                  <span className="macro-label">Proteínas</span>
                  <span className="macro-value">{food.proteins}g</span>
                </div>
                <div className="macro-item">
                  <span className="macro-label">Carbohidratos</span>
                  <span className="macro-value">{food.carbs}g</span>
                </div>
                <div className="macro-item">
                  <span className="macro-label">Grasas</span>
                  <span className="macro-value">{food.fats}g</span>
                </div>
                <div className="macro-item">
                  <span className="macro-label">Fibra</span>
                  <span className="macro-value">{food.fiber}g</span>
                </div>
              </div>
            </div>

            {food.allergens.length > 0 && (
              <div className="food-allergens">
                <span className="allergens-label">Alérgenos:</span>
                <div className="allergens-list">
                  {food.allergens.map(allergen => (
                    <span 
                      key={allergen} 
                      className="allergen-tag"
                      style={{ backgroundColor: getAllergenColor(allergen) }}
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="food-description">
              <p>{food.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles del alimento */}
      {selectedFood && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">
                {getCategoryIcon(selectedFood.category)} {selectedFood.name}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedFood(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="food-details">
                <div className="detail-section">
                  <h4>Información Nutricional (por {selectedFood.unit})</h4>
                  <div className="nutrition-table">
                    <div className="nutrition-row">
                      <span className="nutrition-label">Calorías</span>
                      <span className="nutrition-value">{selectedFood.calories} kcal</span>
                    </div>
                    <div className="nutrition-row">
                      <span className="nutrition-label">Proteínas</span>
                      <span className="nutrition-value">{selectedFood.proteins} g</span>
                    </div>
                    <div className="nutrition-row">
                      <span className="nutrition-label">Carbohidratos</span>
                      <span className="nutrition-value">{selectedFood.carbs} g</span>
                    </div>
                    <div className="nutrition-row">
                      <span className="nutrition-label">Grasas</span>
                      <span className="nutrition-value">{selectedFood.fats} g</span>
                    </div>
                    <div className="nutrition-row">
                      <span className="nutrition-label">Fibra</span>
                      <span className="nutrition-value">{selectedFood.fiber} g</span>
                    </div>
                    <div className="nutrition-row">
                      <span className="nutrition-label">Sodio</span>
                      <span className="nutrition-value">{selectedFood.sodium} mg</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Descripción</h4>
                  <p>{selectedFood.description}</p>
                </div>

                {selectedFood.allergens.length > 0 && (
                  <div className="detail-section">
                    <h4>Alérgenos</h4>
                    <div className="allergens-list">
                      {selectedFood.allergens.map(allergen => (
                        <span 
                          key={allergen} 
                          className="allergen-tag large"
                          style={{ backgroundColor: getAllergenColor(allergen) }}
                        >
                          ⚠️ {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="detail-section">
                  <h4>Calculadora de Porciones</h4>
                  <div className="portion-calculator">
                    <div className="form-group">
                      <label>Cantidad (gramos)</label>
                      <input type="number" defaultValue="100" min="1" />
                    </div>
                    <div className="calculated-nutrition">
                      <p><strong>Calorías calculadas:</strong> {selectedFood.calories} kcal</p>
                      <p><strong>Proteínas:</strong> {selectedFood.proteins} g</p>
                      <p><strong>Carbohidratos:</strong> {selectedFood.carbs} g</p>
                      <p><strong>Grasas:</strong> {selectedFood.fats} g</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedFood(null)}
              >
                Cerrar
              </button>
              <button className="btn btn-primary">
                Usar en Menú
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar alimento */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3 className="modal-title">Agregar Nuevo Alimento</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="food-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre del alimento</label>
                    <input type="text" placeholder="Ej: Quinoa cocida" />
                  </div>
                  <div className="form-group">
                    <label>Categoría</label>
                    <select>
                      <option value="">Seleccionar categoría</option>
                      <option value="proteinas">Proteínas</option>
                      <option value="cereales">Cereales y Granos</option>
                      <option value="vegetales">Vegetales</option>
                      <option value="frutas">Frutas</option>
                      <option value="lacteos">Lácteos</option>
                      <option value="grasas">Grasas y Aceites</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Descripción</label>
                  <textarea 
                    placeholder="Descripción del alimento y sus beneficios nutricionales"
                    rows="2"
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Unidad de medida</label>
                    <select>
                      <option value="100g">100 gramos</option>
                      <option value="1 taza">1 taza</option>
                      <option value="1 unidad">1 unidad</option>
                      <option value="1 porción">1 porción</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Calorías</label>
                    <input type="number" placeholder="0" min="0" />
                  </div>
                </div>

                <h4>Información Nutricional</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Proteínas (g)</label>
                    <input type="number" step="0.1" placeholder="0" min="0" />
                  </div>
                  <div className="form-group">
                    <label>Carbohidratos (g)</label>
                    <input type="number" step="0.1" placeholder="0" min="0" />
                  </div>
                  <div className="form-group">
                    <label>Grasas (g)</label>
                    <input type="number" step="0.1" placeholder="0" min="0" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Fibra (g)</label>
                    <input type="number" step="0.1" placeholder="0" min="0" />
                  </div>
                  <div className="form-group">
                    <label>Sodio (mg)</label>
                    <input type="number" step="0.1" placeholder="0" min="0" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Alérgenos</label>
                  <div className="allergens-checkboxes">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      Gluten
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      Lactosa
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      Pescado
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      Nueces
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      Soja
                    </label>
                  </div>
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
                Agregar Alimento
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}