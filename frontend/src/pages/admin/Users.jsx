import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import '../../styles/admin/Users.css';
import { useState } from 'react';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Datos de ejemplo de usuarios
  const users = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', role: 'administrador', school: 'Sistema Central', status: 'activo', lastLogin: '2025-10-09' },
    { id: 2, name: 'María González', email: 'maria.gonzalez@example.com', role: 'nutricionista', school: 'Escuela Primaria #1', status: 'activo', lastLogin: '2025-10-08' },
    { id: 3, name: 'Luis Rodríguez', email: 'luis.rodriguez@example.com', role: 'padre', school: 'Escuela Primaria #2', status: 'activo', lastLogin: '2025-10-07' },
    { id: 4, name: 'Ana Martínez', email: 'ana.martinez@example.com', role: 'estudiante', school: 'Escuela Secundaria #1', status: 'activo', lastLogin: '2025-10-09' },
    { id: 5, name: 'Carlos Silva', email: 'carlos.silva@example.com', role: 'nutricionista', school: 'Escuela Primaria #3', status: 'inactivo', lastLogin: '2025-09-30' }
  ];

  const roleLabels = {
    'administrador': 'Administrador',
    'nutricionista': 'Nutricionista', 
    'padre': 'Padre/Tutor',
    'estudiante': 'Estudiante'
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="admin-users">
        <div className="page-header">
          <h1 className="page-title">Gestión de Usuarios</h1>
          <p className="page-description">Administra todos los usuarios del sistema de nutrición escolar</p>
        </div>

      {/* Estadísticas de usuarios */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3 className="stat-number">1,247</h3>
            <p className="stat-label">Total de Usuarios</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍💼</div>
          <div className="stat-content">
            <h3 className="stat-number">5</h3>
            <p className="stat-label">Administradores</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👩‍⚕️</div>
          <div className="stat-content">
            <h3 className="stat-number">25</h3>
            <p className="stat-label">Nutricionistas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍👩‍👧‍👦</div>
          <div className="stat-content">
            <h3 className="stat-number">1,217</h3>
            <p className="stat-label">Padres/Estudiantes</p>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="filters-section">
        <div className="filters-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-controls">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="role-filter"
            >
              <option value="all">Todos los roles</option>
              <option value="administrador">Administradores</option>
              <option value="nutricionista">Nutricionistas</option>
              <option value="padre">Padres</option>
              <option value="estudiante">Estudiantes</option>
            </select>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Agregar Usuario
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Escuela</th>
              <th>Estado</th>
              <th>Último acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <div className="user-name">{user.name}</div>
                      <div className="user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td>{user.school}</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon edit" title="Editar">
                      ✏️
                    </button>
                    <button className="btn-icon delete" title="Eliminar">
                      🗑️
                    </button>
                    <button className="btn-icon reset" title="Resetear contraseña">
                      🔑
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar usuario */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Agregar Nuevo Usuario</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <form className="user-form">
                <div className="form-group">
                  <label>Nombre completo</label>
                  <input type="text" placeholder="Ingrese el nombre completo" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="usuario@ejemplo.com" />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select>
                    <option value="">Seleccionar rol</option>
                    <option value="administrador">Administrador</option>
                    <option value="nutricionista">Nutricionista</option>
                    <option value="padre">Padre/Tutor</option>
                    <option value="estudiante">Estudiante</option>
                  </select>
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
                <div className="form-group">
                  <label>Contraseña temporal</label>
                  <input type="password" placeholder="Contraseña inicial" />
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
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}
