import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import '../../styles/admin/Schools.css';
import { useState } from 'react';

export default function Schools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Datos de ejemplo de escuelas
  const schools = [
    { 
      id: 1, 
      name: 'Escuela Primaria #1', 
      level: 'primaria',
      director: 'Dra. Ana García',
      address: 'Av. Principal 123, Ciudad',
      students: 450,
      nutritionist: 'María González',
      status: 'activo',
      createdDate: '2023-01-15'
    },
    { 
      id: 2, 
      name: 'Escuela Secundaria #1', 
      level: 'secundaria',
      director: 'Prof. Carlos Mendoza',
      address: 'Calle 45 #678, Ciudad',
      students: 680,
      nutritionist: 'Luis Rodríguez',
      status: 'activo',
      createdDate: '2023-02-10'
    },
    { 
      id: 3, 
      name: 'Instituto Técnico Central', 
      level: 'tecnica',
      director: 'Ing. María Fernández',
      address: 'Boulevard Norte 890, Ciudad',
      students: 320,
      nutritionist: 'No asignado',
      status: 'activo',
      createdDate: '2023-03-05'
    },
    { 
      id: 4, 
      name: 'Escuela Rural El Valle', 
      level: 'primaria',
      director: 'Prof. José Martínez',
      address: 'Zona Rural El Valle, Municipio',
      students: 85,
      nutritionist: 'Ana López',
      status: 'activo',
      createdDate: '2023-01-20'
    }
  ];

  const levelLabels = {
    'primaria': 'Primaria',
    'secundaria': 'Secundaria',
    'tecnica': 'Técnica'
  };

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.director.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || school.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const totalStudents = schools.reduce((sum, school) => sum + school.students, 0);

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="admin-schools">
        <div className="page-header">
          <h1 className="page-title">Gestión de Escuelas</h1>
          <p className="page-description">Administra las instituciones educativas del sistema</p>
        </div>

      {/* Estadísticas de escuelas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏫</div>
          <div className="stat-content">
            <h3 className="stat-number">{schools.length}</h3>
            <p className="stat-label">Total de Escuelas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3 className="stat-number">{totalStudents.toLocaleString()}</h3>
            <p className="stat-label">Total de Estudiantes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3 className="stat-number">{schools.filter(s => s.level === 'primaria').length}</h3>
            <p className="stat-label">Escuelas Primarias</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <h3 className="stat-number">{schools.filter(s => s.level === 'secundaria').length}</h3>
            <p className="stat-label">Escuelas Secundarias</p>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="filters-section">
        <div className="filters-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por nombre de escuela o director..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="level-filter"
            >
              <option value="all">Todos los niveles</option>
              <option value="primaria">Primaria</option>
              <option value="secundaria">Secundaria</option>
              <option value="tecnica">Técnica</option>
            </select>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Agregar Escuela
            </button>
          </div>
        </div>
      </div>

      {/* Grid de escuelas */}
      <div className="schools-grid">
        {filteredSchools.map(school => (
          <div key={school.id} className="school-card">
            <div className="school-header">
              <div className="school-icon">🏫</div>
              <div className="school-info">
                <h3 className="school-name">{school.name}</h3>
                <span className={`level-badge ${school.level}`}>
                  {levelLabels[school.level]}
                </span>
              </div>
              <div className="school-actions">
                <button className="btn-icon edit" title="Editar">
                  ✏️
                </button>
                <button className="btn-icon delete" title="Eliminar">
                  🗑️
                </button>
              </div>
            </div>
            
            <div className="school-details">
              <div className="detail-item">
                <strong>Director:</strong> {school.director}
              </div>
              <div className="detail-item">
                <strong>Dirección:</strong> {school.address}
              </div>
              <div className="detail-item">
                <strong>Estudiantes:</strong> {school.students}
              </div>
              <div className="detail-item">
                <strong>Nutricionista:</strong> 
                <span className={school.nutritionist === 'No asignado' ? 'text-warning' : 'text-success'}>
                  {school.nutritionist}
                </span>
              </div>
            </div>

            <div className="school-footer">
              <span className={`status-badge ${school.status}`}>
                {school.status === 'activo' ? 'Activo' : 'Inactivo'}
              </span>
              <span className="created-date">
                Creado: {school.createdDate}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar escuela */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Agregar Nueva Escuela</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="school-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre de la escuela</label>
                    <input type="text" placeholder="Nombre completo de la institución" />
                  </div>
                  <div className="form-group">
                    <label>Nivel educativo</label>
                    <select>
                      <option value="">Seleccionar nivel</option>
                      <option value="primaria">Primaria</option>
                      <option value="secundaria">Secundaria</option>
                      <option value="tecnica">Técnica</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Director/a</label>
                    <input type="text" placeholder="Nombre del director" />
                  </div>
                  <div className="form-group">
                    <label>Número de estudiantes</label>
                    <input type="number" placeholder="0" min="1" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Dirección</label>
                  <textarea 
                    placeholder="Dirección completa de la escuela"
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Nutricionista asignado</label>
                  <select>
                    <option value="">Sin asignar</option>
                    <option value="maria">María González</option>
                    <option value="luis">Luis Rodríguez</option>
                    <option value="ana">Ana López</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Contacto</label>
                  <div className="contact-inputs">
                    <input type="tel" placeholder="Teléfono" />
                    <input type="email" placeholder="Email institucional" />
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
                Crear Escuela
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}