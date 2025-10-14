import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';
import { useState } from 'react';

export default function RectorStudents() {
  const { currentSchool } = useSchool();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [students, setStudents] = useState([
    {
      id: 1,
      rut: '12.345.678-9',
      name: 'Ana María González',
      grade: '3° Básico',
      age: 8,
      birthDate: '2017-03-15',
      address: 'Av. Los Leones 123, Valparaíso',
      phone: '+56 9 8765 4321',
      email: 'ana.gonzalez@email.com',
      parentName: 'Carlos González',
      parentPhone: '+56 9 8765 4321',
      parentEmail: 'carlos.gonzalez@email.com',
      emergencyContact: 'María González - +56 9 8765 4322',
      allergies: ['nueces', 'mariscos'],
      medicalConditions: [],
      enrollmentDate: '2024-03-01',
      status: 'active',
      avatar: '👧',
      academicYear: 2025
    },
    {
      id: 2,
      rut: '23.456.789-0',
      name: 'Diego Rodríguez',
      grade: '5° Básico',
      age: 10,
      birthDate: '2015-07-22',
      address: 'Calle Principal 456, Valparaíso',
      phone: '+56 9 7654 3210',
      email: 'diego.rodriguez@email.com',
      parentName: 'Patricia Rodríguez',
      parentPhone: '+56 9 7654 3210',
      parentEmail: 'patricia.rodriguez@email.com',
      emergencyContact: 'Juan Rodríguez - +56 9 7654 3211',
      allergies: [],
      medicalConditions: ['Asma leve'],
      enrollmentDate: '2022-03-01',
      status: 'active',
      avatar: '👦',
      academicYear: 2025
    },
    {
      id: 3,
      rut: '34.567.890-1',
      name: 'Sofía Martínez',
      grade: '1° Básico',
      age: 6,
      birthDate: '2019-01-10',
      address: 'Los Aromos 789, Valparaíso',
      phone: '+56 9 6543 2109',
      email: 'sofia.martinez@email.com',
      parentName: 'Luis Martínez',
      parentPhone: '+56 9 6543 2109',
      parentEmail: 'luis.martinez@email.com',
      emergencyContact: 'Carmen Martínez - +56 9 6543 2108',
      allergies: ['lácteos'],
      medicalConditions: [],
      enrollmentDate: '2025-03-01',
      status: 'pending',
      avatar: '👧',
      academicYear: 2025
    }
  ]);

  const grades = ['Pre-kinder', 'Kinder', '1° Básico', '2° Básico', '3° Básico', '4° Básico', '5° Básico', '6° Básico', '7° Básico', '8° Básico'];
  const statuses = [
    { value: 'active', label: 'Activo', color: '#4CAF50' },
    { value: 'pending', label: 'Pendiente', color: '#FF9800' },
    { value: 'inactive', label: 'Inactivo', color: '#F44336' },
    { value: 'graduated', label: 'Egresado', color: '#2196F3' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rut.includes(searchTerm) ||
                         student.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !filterGrade || student.grade === filterGrade;
    const matchesStatus = !filterStatus || student.status === filterStatus;
    
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const handleAddStudent = () => {
    setModalType('add');
    setSelectedStudent(null);
    setShowModal(true);
  };

  const handleViewStudent = (student) => {
    setModalType('view');
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setModalType('edit');
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDeleteStudent = (studentId) => {
    if (confirm('¿Estás seguro de que deseas eliminar este estudiante?')) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  const getStatusBadge = (status) => {
    const statusInfo = statuses.find(s => s.value === status);
    return (
      <span 
        className="status-badge"
        style={{ backgroundColor: statusInfo?.color }}
      >
        {statusInfo?.label}
      </span>
    );
  };

  const getGradeStats = () => {
    const gradeStats = {};
    students.forEach(student => {
      gradeStats[student.grade] = (gradeStats[student.grade] || 0) + 1;
    });
    return gradeStats;
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title">
          👨‍🎓 Gestión de Estudiantes
        </h1>
        <p className="page-description">
          Administra la matrícula y información de todos los estudiantes de {currentSchool?.name}
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="stats-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>
            <div className="stat-content">
              <h4>{students.filter(s => s.status === 'active').length}</h4>
              <p>Estudiantes activos</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h4>{students.filter(s => s.status === 'pending').length}</h4>
              <p>Matrículas pendientes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h4>{students.length}</h4>
              <p>Total estudiantes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h4>{students.filter(s => s.allergies.length > 0).length}</h4>
              <p>Con alergias</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controles y filtros */}
      <div className="page-controls">
        <div className="search-section">
          <div className="search-input">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por nombre, RUT o apoderado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los grados</option>
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los estados</option>
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={handleAddStudent}>
            ➕ Nuevo estudiante
          </button>
          <button className="btn btn-secondary">
            📊 Exportar listado
          </button>
          <button className="btn btn-secondary">
            📁 Importar desde Excel
          </button>
        </div>
      </div>

      {/* Lista de estudiantes */}
      <div className="students-table">
        <div className="table-header">
          <h3>📋 Lista de estudiantes ({filteredStudents.length})</h3>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>RUT</th>
                <th>Grado</th>
                <th>Edad</th>
                <th>Apoderado</th>
                <th>Contacto</th>
                <th>Alergias</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} className={`student-row status-${student.status}`}>
                  <td>
                    <div className="student-info">
                      <span className="student-avatar">{student.avatar}</span>
                      <div className="student-details">
                        <span className="student-name">{student.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="student-rut">{student.rut}</td>
                  <td className="student-grade">{student.grade}</td>
                  <td className="student-age">{student.age} años</td>
                  <td>
                    <div className="parent-info">
                      <span className="parent-name">{student.parentName}</span>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <span className="contact-phone">{student.parentPhone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="allergies-info">
                      {student.allergies.length > 0 ? (
                        <div className="allergies-list">
                          {student.allergies.map((allergy, index) => (
                            <span key={index} className="allergy-tag">
                              ⚠️ {allergy}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="no-allergies">Sin alergias</span>
                      )}
                    </div>
                  </td>
                  <td>
                    {getStatusBadge(student.status)}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-sm btn-info"
                        onClick={() => handleViewStudent(student)}
                        title="Ver detalles"
                      >
                        👁️
                      </button>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditStudent(student)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteStudent(student.id)}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estadísticas por grado */}
      <div className="grade-distribution">
        <h3>📊 Distribución por grado</h3>
        <div className="grade-stats">
          {Object.entries(getGradeStats()).map(([grade, count]) => (
            <div key={grade} className="grade-stat">
              <span className="grade-name">{grade}</span>
              <span className="grade-count">{count} estudiantes</span>
              <div className="grade-bar">
                <div 
                  className="grade-fill"
                  style={{ width: `${(count / students.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar/editar/ver estudiante */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === 'add' && '➕ Nuevo Estudiante'}
                {modalType === 'edit' && '✏️ Editar Estudiante'}
                {modalType === 'view' && '👁️ Detalles del Estudiante'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="student-form">
                <div className="form-section">
                  <h4>👤 Información personal</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>RUT:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStudent?.rut}
                        placeholder="12.345.678-9"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre completo:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStudent?.name}
                        placeholder="Nombre completo del estudiante"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Fecha de nacimiento:</label>
                      <input 
                        type="date" 
                        defaultValue={selectedStudent?.birthDate}
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Grado:</label>
                      <select 
                        defaultValue={selectedStudent?.grade}
                        disabled={modalType === 'view'}
                      >
                        <option value="">Seleccionar grado</option>
                        {grades.map(grade => (
                          <option key={grade} value={grade}>{grade}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Dirección:</label>
                    <input 
                      type="text" 
                      defaultValue={selectedStudent?.address}
                      placeholder="Dirección completa"
                      disabled={modalType === 'view'}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h4>👨‍👩‍👧‍👦 Información del apoderado</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nombre del apoderado:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStudent?.parentName}
                        placeholder="Nombre completo del apoderado"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Teléfono:</label>
                      <input 
                        type="tel" 
                        defaultValue={selectedStudent?.parentPhone}
                        placeholder="+56 9 8765 4321"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        defaultValue={selectedStudent?.parentEmail}
                        placeholder="email@ejemplo.com"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Contacto de emergencia:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStudent?.emergencyContact}
                        placeholder="Nombre - Teléfono"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>🏥 Información médica</h4>
                  <div className="form-group">
                    <label>Alergias alimentarias:</label>
                    <input 
                      type="text" 
                      defaultValue={selectedStudent?.allergies.join(', ')}
                      placeholder="Separar por comas: nueces, mariscos, lactosa"
                      disabled={modalType === 'view'}
                    />
                    <small>Importante: Esta información será utilizada para los menús escolares</small>
                  </div>
                  
                  <div className="form-group">
                    <label>Condiciones médicas:</label>
                    <textarea 
                      rows="3"
                      defaultValue={selectedStudent?.medicalConditions.join(', ')}
                      placeholder="Condiciones médicas relevantes..."
                      disabled={modalType === 'view'}
                    ></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <h4>📋 Estado académico</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Estado:</label>
                      <select 
                        defaultValue={selectedStudent?.status}
                        disabled={modalType === 'view'}
                      >
                        {statuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Fecha de matrícula:</label>
                      <input 
                        type="date" 
                        defaultValue={selectedStudent?.enrollmentDate}
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {modalType !== 'view' && (
              <div className="modal-footer">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary">
                  {modalType === 'add' ? 'Registrar estudiante' : 'Guardar cambios'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}