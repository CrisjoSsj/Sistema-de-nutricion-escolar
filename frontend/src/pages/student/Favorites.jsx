import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function StudentFavorites() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Datos de ejemplo del estudiante
  const studentInfo = {
    name: 'Ana María González',
    avatar: '👧'
  };

  // Datos de ejemplo de comidas favoritas
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Pollo a la plancha con quinoa',
      category: 'lunch',
      image: '🍗',
      rating: 5,
      description: 'Pechuga de pollo marinada a la plancha con quinoa y verduras',
      calories: 420,
      dateAdded: '2025-10-05',
      timesConsumed: 8,
      lastEaten: '2025-10-09',
      nutrients: { protein: 32, carbs: 35, fat: 12, fiber: 6 },
      tags: ['proteína', 'saludable', 'sabroso'],
      notes: '¡Me encanta como queda el pollo! La quinoa está súper rica.'
    },
    {
      id: 2,
      name: 'Smoothie de frutas del bosque',
      category: 'snack',
      image: '🥤',
      rating: 5,
      description: 'Batido cremoso con arándanos, fresas y yogurt natural',
      calories: 180,
      dateAdded: '2025-09-28',
      timesConsumed: 12,
      lastEaten: '2025-10-08',
      nutrients: { protein: 8, carbs: 32, fat: 3, fiber: 6 },
      tags: ['frutas', 'refrescante', 'dulce'],
      notes: '¡Mi favorito absoluto! Me recuerda a los smoothies de casa.'
    },
    {
      id: 3,
      name: 'Avena con canela y manzana',
      category: 'breakfast',
      image: '🥣',
      rating: 4,
      description: 'Avena integral cocida con trocitos de manzana y canela',
      calories: 260,
      dateAdded: '2025-09-20',
      timesConsumed: 15,
      lastEaten: '2025-10-07',
      nutrients: { protein: 10, carbs: 48, fat: 5, fiber: 8 },
      tags: ['fibra', 'energía', 'desayuno'],
      notes: 'Me da mucha energía para toda la mañana. La canela le da un sabor súper rico.'
    },
    {
      id: 4,
      name: 'Pasta con salsa de tomate casera',
      category: 'lunch',
      image: '🍝',
      rating: 4,
      description: 'Pasta integral con salsa de tomate natural y albahaca fresca',
      calories: 380,
      dateAdded: '2025-09-15',
      timesConsumed: 6,
      lastEaten: '2025-10-03',
      nutrients: { protein: 15, carbs: 68, fat: 8, fiber: 7 },
      tags: ['pasta', 'tomate', 'clásico'],
      notes: 'La salsa de tomate está buenísima, no es como la del supermercado.'
    },
    {
      id: 5,
      name: 'Yogurt con granola y miel',
      category: 'snack',
      image: '🥛',
      rating: 5,
      description: 'Yogurt natural con granola casera y un toque de miel',
      calories: 200,
      dateAdded: '2025-08-30',
      timesConsumed: 20,
      lastEaten: '2025-10-09',
      nutrients: { protein: 12, carbs: 28, fat: 6, fiber: 4 },
      tags: ['lácteos', 'crujiente', 'miel'],
      notes: 'La granola es súper crujiente y la miel le da el dulzor perfecto.'
    },
    {
      id: 6,
      name: 'Sopa de lentejas con verduras',
      category: 'lunch',
      image: '🍲',
      rating: 4,
      description: 'Sopa cremosa de lentejas con zanahoria, apio y espinacas',
      calories: 320,
      dateAdded: '2025-08-20',
      timesConsumed: 10,
      lastEaten: '2025-10-02',
      nutrients: { protein: 18, carbs: 45, fat: 4, fiber: 15 },
      tags: ['legumbres', 'fibra', 'calentito'],
      notes: 'Me encanta cuando hace frío. Las lentejas están súper suaves.'
    }
  ]);

  const categories = [
    { value: 'all', label: 'Todas mis favoritas', icon: '⭐' },
    { value: 'breakfast', label: 'Desayunos', icon: '🌅' },
    { value: 'lunch', label: 'Almuerzos', icon: '🍽️' },
    { value: 'snack', label: 'Colaciones', icon: '🍎' }
  ];

  const getFilteredFavorites = () => {
    if (selectedCategory === 'all') return favorites;
    return favorites.filter(fav => fav.category === selectedCategory);
  };

  const removeFavorite = (favoriteId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
  };

  const getStarRating = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getCategoryName = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const getTotalStats = () => {
    return {
      totalFavorites: favorites.length,
      totalConsumptions: favorites.reduce((sum, fav) => sum + fav.timesConsumed, 0),
      averageRating: (favorites.reduce((sum, fav) => sum + fav.rating, 0) / favorites.length).toFixed(1),
      mostEaten: favorites.reduce((max, fav) => fav.timesConsumed > max.timesConsumed ? fav : max, favorites[0])
    };
  };

  const stats = getTotalStats();

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">
          {studentInfo.avatar} Mis Comidas Favoritas
        </h1>
        <p className="page-description">Aquí están todas las comidas que más te gustan</p>
      </div>

      {/* Estadísticas de favoritos */}
      <div className="favorites-stats">
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <h3>{stats.totalFavorites}</h3>
              <p>Comidas favoritas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🍽️</div>
            <div className="stat-content">
              <h3>{stats.totalConsumptions}</h3>
              <p>Veces que las comiste</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{stats.averageRating}</h3>
              <p>Calificación promedio</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <h3>{stats.mostEaten?.name.split(' ')[0]}...</h3>
              <p>Tu favorito absoluto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="favorites-controls">
        <div className="filter-controls">
          <label>Mostrar:</label>
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category.value}
                className={`tab-btn ${selectedCategory === category.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-label">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            🔲 Cuadrícula
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            📋 Lista
          </button>
        </div>
      </div>

      {/* Lista de favoritos */}
      <div className={`favorites-container ${viewMode}`}>
        {getFilteredFavorites().length === 0 ? (
          <div className="empty-favorites">
            <div className="empty-icon">⭐</div>
            <h3>No tienes favoritos en esta categoría</h3>
            <p>Cuando pruebes comidas que te gusten mucho, márcalas como favoritas para verlas aquí.</p>
            <button className="btn btn-primary">
              🍽️ Ver menú de hoy
            </button>
          </div>
        ) : (
          <div className={`favorites-${viewMode}`}>
            {getFilteredFavorites().map(favorite => (
              <div key={favorite.id} className="favorite-card">
                {viewMode === 'grid' ? (
                  <>
                    {/* Vista de cuadrícula */}
                    <div className="favorite-header">
                      <div className="favorite-image">
                        <span className="food-emoji">{favorite.image}</span>
                      </div>
                      <button 
                        className="remove-favorite"
                        onClick={() => removeFavorite(favorite.id)}
                        title="Quitar de favoritos"
                      >
                        💔
                      </button>
                    </div>

                    <div className="favorite-content">
                      <h3 className="favorite-name">{favorite.name}</h3>
                      <p className="favorite-description">{favorite.description}</p>
                      
                      <div className="favorite-rating">
                        <span className="rating-stars">{getStarRating(favorite.rating)}</span>
                        <span className="rating-text">({favorite.rating}/5)</span>
                      </div>

                      <div className="favorite-stats">
                        <div className="stat-item">
                          <span className="stat-icon">🔥</span>
                          <span className="stat-value">{favorite.calories} kcal</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon">🍽️</span>
                          <span className="stat-value">{favorite.timesConsumed} veces</span>
                        </div>
                      </div>

                      <div className="favorite-tags">
                        {favorite.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {favorite.notes && (
                        <div className="favorite-notes">
                          <h5>Tus notas:</h5>
                          <p>"{favorite.notes}"</p>
                        </div>
                      )}
                    </div>

                    <div className="favorite-actions">
                      <button className="btn btn-primary btn-sm">
                        🔍 Ver detalles
                      </button>
                      <button className="btn btn-outline btn-sm">
                        📝 Editar notas
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Vista de lista */}
                    <div className="favorite-list-content">
                      <div className="favorite-main">
                        <div className="favorite-image">
                          <span className="food-emoji">{favorite.image}</span>
                        </div>
                        <div className="favorite-info">
                          <h3 className="favorite-name">{favorite.name}</h3>
                          <p className="favorite-description">{favorite.description}</p>
                          <div className="favorite-meta">
                            <span className="meta-item">
                              📅 Agregado: {favorite.dateAdded}
                            </span>
                            <span className="meta-item">
                              🕐 Última vez: {favorite.lastEaten}
                            </span>
                            <span className="meta-item">
                              🏷️ {getCategoryName(favorite.category)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="favorite-stats-list">
                        <div className="stat-column">
                          <span className="stat-label">Calificación</span>
                          <span className="stat-value">{getStarRating(favorite.rating)}</span>
                        </div>
                        <div className="stat-column">
                          <span className="stat-label">Calorías</span>
                          <span className="stat-value">{favorite.calories} kcal</span>
                        </div>
                        <div className="stat-column">
                          <span className="stat-label">Veces comido</span>
                          <span className="stat-value">{favorite.timesConsumed}</span>
                        </div>
                      </div>

                      <div className="favorite-actions-list">
                        <button className="btn btn-primary btn-sm">
                          🔍 Detalles
                        </button>
                        <button className="btn btn-outline btn-sm">
                          📝 Notas
                        </button>
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => removeFavorite(favorite.id)}
                        >
                          💔 Quitar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comida más popular */}
      {favorites.length > 0 && (
        <div className="most-popular">
          <h3>🏆 Tu comida más popular</h3>
          <div className="popular-card">
            <div className="popular-image">
              <span className="food-emoji">{stats.mostEaten.image}</span>
            </div>
            <div className="popular-info">
              <h4>{stats.mostEaten.name}</h4>
              <p>Has comido esta deliciosa comida <strong>{stats.mostEaten.timesConsumed} veces</strong></p>
              <div className="popular-rating">
                {getStarRating(stats.mostEaten.rating)} ({stats.mostEaten.rating}/5)
              </div>
              {stats.mostEaten.notes && (
                <div className="popular-notes">
                  <p>💭 "{stats.mostEaten.notes}"</p>
                </div>
              )}
            </div>
            <div className="popular-actions">
              <button className="btn btn-primary">
                🍽️ Ver cuándo la sirven próximamente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consejos personalizados */}
      <div className="personalized-tips">
        <h3>💡 Consejos para ti</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">🌟</div>
            <div className="tip-content">
              <h4>¡Explora nuevos sabores!</h4>
              <p>Te gustan mucho los platos con pollo. ¿Qué tal si pruebas el pescado la próxima vez? ¡Podría convertirse en tu nuevo favorito!</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📝</div>
            <div className="tip-content">
              <h4>Comparte tus notas</h4>
              <p>Tus comentarios sobre las comidas ayudan a la cocina a mejorar. ¡Sigue escribiendo qué te gusta de cada plato!</p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🥗</div>
            <div className="tip-content">
              <h4>Equilibrio nutricional</h4>
              <p>Veo que te encantan los smoothies y yogurts. También prueba ensaladas frescas para más vitaminas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="quick-actions">
        <button className="action-btn">
          🍽️ Ver menú de hoy
        </button>
        <button className="action-btn">
          📊 Mi progreso nutricional
        </button>
        <button className="action-btn">
          💬 Calificar comidas
        </button>
        <button className="action-btn">
          📱 Compartir favoritos
        </button>
      </div>
    </DashboardLayout>
  );
}