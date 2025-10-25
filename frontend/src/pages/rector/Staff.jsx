import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';
import { useState } from 'react';

export default function RectorStaff() {
  const { currentSchool } = useSchool();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [staff, setStaff] = useState([
    {
      id: 1,
      rut: '15.555.777-8',
      name: 'Dr. María Elena Sánchez',
      email: 'maria.sanchez@umina.edu.cl',
      phone: '+56 9 1234 5678',
      role: 'nutritionist',
      department: 'Nutrición Escolar',
      position: 'Nutricionista Jefe',
      hireDate: '2020-03-15',
      experience: '8 años',
      certifications: ['Nutricionista Clínica', 'Especialista en Nutrición Infantil', 'Certificación HACCP'],
      schedule: 'Lunes a Viernes 08:00-16:00',
      status: 'active',
      permissions: ['menu_management', 'nutrition_reports', 'food_analysis'],
      lastActivity: '2025-10-09'
    },
    {
      id: 2,
      rut: '14.444.666-7',
      name: 'Carmen Olivares Rojas',
      email: 'carmen.olivares@umina.edu.cl',
      phone: '+56 9 2345 6789',
      role: 'nutritionist',
      department: 'Nutrición Escolar',
      position: 'Nutricionista',
      hireDate: '2022-08-01',
      experience: '3 años',
      certifications: ['Nutricionista', 'Manipulación de Alimentos'],
      schedule: 'Lunes a Viernes 09:00-17:00',
      status: 'active',
      permissions: ['menu_assistance', 'student_consultations'],
      lastActivity: '2025-10-08'
    },
    {
      id: 3,
      rut: '13.333.555-6',
      name: 'Jorge Ramírez Díaz',
      email: 'jorge.ramirez@umina.edu.cl',
      phone: '+56 9 3456 7890',
      role: 'kitchen_staff',
      department: 'Cocina',
      position: 'Jefe de Cocina',
      hireDate: '2018-01-10',
      experience: '12 años',
      certifications: ['Manipulación de Alimentos', 'Seguridad Alimentaria', 'Gestión de Cocinas Industriales'],
      schedule: 'Lunes a Viernes 06:00-14:00',
      status: 'active',
      permissions: ['kitchen_management', 'inventory_control'],
      lastActivity: '2025-10-09'
    },
    {
      id: 4,
      rut: '12.222.444-5',
      name: 'Ana Beatriz Torres',
      email: 'ana.torres@umina.edu.cl',
      phone: '+56 9 4567 8901',
      role: 'admin_assistant',
      department: 'Administración',
      position: 'Asistente Administrativa',
      hireDate: '2021-06-15',
      experience: '5 años',
      certifications: ['Administración Educacional'],
      schedule: 'Lunes a Viernes 08:30-17:30',
      status: 'active',
      permissions: ['data_entry', 'parent_communication'],
      lastActivity: '2025-10-09'
    },
    {
      id: 5,
      rut: '11.111.333-4',
      name: 'Pedro González Muñoz',
      email: 'pedro.gonzalez@umina.edu.cl',
      phone: '+56 9 5678 9012',
      role: 'kitchen_staff',
      department: 'Cocina',
      position: 'Cocinero',
      hireDate: '2023-09-01',
      experience: '2 años',
      certifications: ['Manipulación de Alimentos'],
      schedule: 'Lunes a Viernes 07:00-15:00',
      status: 'probation',
      permissions: ['food_preparation'],
      lastActivity: '2025-10-08'
    }
  ]);

  const roles = [
    { value: 'nutritionist', label: 'Nutricionista', icon: '👩‍⚕️' },
    { value: 'kitchen_staff', label: 'Personal de Cocina', icon: '👨‍🍳' },
    { value: 'admin_assistant', label: 'Asistente Administrativo', icon: '👩‍💻' },
    { value: 'teacher', label: 'Profesor', icon: '👨‍🏫' },
    { value: 'support_staff', label: 'Personal de Apoyo', icon: '👷‍♂️' }
  ];

  const statuses = [
    { value: 'active', label: 'Activo', color: '#4CAF50' },
    { value: 'probation', label: 'En Prueba', color: '#FF9800' },
    { value: 'vacation', label: 'De Vacaciones', color: '#2196F3' },
    { value: 'inactive', label: 'Inactivo', color: '#F44336' }
  ];

  const permissions = [
    { value: 'menu_management', label: 'Gestión de Menús', category: 'nutrition' },
    { value: 'nutrition_reports', label: 'Reportes Nutricionales', category: 'nutrition' },
    { value: 'food_analysis', label: 'Análisis de Alimentos', category: 'nutrition' },
    { value: 'menu_assistance', label: 'Asistencia en Menús', category: 'nutrition' },
    { value: 'student_consultations', label: 'Consultas Estudiantiles', category: 'nutrition' },
    { value: 'kitchen_management', label: 'Gestión de Cocina', category: 'kitchen' },
    { value: 'inventory_control', label: 'Control de Inventario', category: 'kitchen' },
    { value: 'food_preparation', label: 'Preparación de Alimentos', category: 'kitchen' },
    { value: 'data_entry', label: 'Entrada de Datos', category: 'admin' },
    { value: 'parent_communication', label: 'Comunicación con Padres', category: 'admin' }
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.rut.includes(searchTerm) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || member.role === filterRole;
    const matchesStatus = !filterStatus || member.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddStaff = () => {
    setModalType('add');
    setSelectedStaff(null);
    setShowModal(true);
  };

  const handleViewStaff = (staff) => {
    setModalType('view');
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const handleEditStaff = (staff) => {
    setModalType('edit');
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const handleDeleteStaff = (staffId) => {
    if (confirm('¿Estás seguro de que deseas eliminar este miembro del personal?')) {
      setStaff(staff.filter(s => s.id !== staffId));
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

  const getRoleInfo = (role) => {
    return roles.find(r => r.value === role) || { label: role, icon: '👤' };
  };

  const getPermissionLabel = (permissionValue) => {
    const permission = permissions.find(p => p.value === permissionValue);
    return permission ? permission.label : permissionValue;
  };

  const getDepartmentStats = () => {
    const stats = {};
    staff.forEach(member => {
      stats[member.department] = (stats[member.department] || 0) + 1;
    });
    return stats;
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">
          👥 Gestión de Personal
        </h1>
        <p className="page-description">
          Administra el equipo de trabajo de {currentSchool?.name}
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="stats-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h4>{staff.filter(s => s.status === 'active').length}</h4>
              <p>Personal activo</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👩‍⚕️</div>
            <div className="stat-content">
              <h4>{staff.filter(s => s.role === 'nutritionist').length}</h4>
              <p>Nutricionistas</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👨‍🍳</div>
            <div className="stat-content">
              <h4>{staff.filter(s => s.role === 'kitchen_staff').length}</h4>
              <p>Personal de cocina</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h4>{staff.filter(s => s.status === 'probation').length}</h4>
              <p>En período de prueba</p>
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
              placeholder="Buscar por nombre, RUT, email o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos los roles</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.icon} {role.label}
                </option>
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
          <button className="btn btn-primary" onClick={handleAddStaff}>
            ➕ Nuevo empleado
          </button>
          <button className="btn btn-secondary">
            📊 Reportes de personal
          </button>
          <button className="btn btn-secondary">
            📅 Gestionar horarios
          </button>
        </div>
      </div>

      {/* Lista de personal */}
      <div className="staff-table">
        <div className="table-header">
          <h3>📋 Personal de la escuela ({filteredStaff.length})</h3>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Empleado</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Contacto</th>
                <th>Horario</th>
                <th>Experiencia</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map(member => {
                const roleInfo = getRoleInfo(member.role);
                return (
                  <tr key={member.id} className={`staff-row status-${member.status}`}>
                    <td>
                      <div className="staff-info">
                        <span className="staff-icon">{roleInfo.icon}</span>
                        <div className="staff-details">
                          <span className="staff-name">{member.name}</span>
                          <span className="staff-rut">{member.rut}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="position-info">
                        <span className="position-title">{member.position}</span>
                        <span className="role-label">{roleInfo.label}</span>
                      </div>
                    </td>
                    <td className="department-name">{member.department}</td>
                    <td>
                      <div className="contact-info">
                        <span className="contact-phone">{member.phone}</span>
                        <span className="contact-email">{member.email}</span>
                      </div>
                    </td>
                    <td className="schedule-info">{member.schedule}</td>
                    <td className="experience-info">{member.experience}</td>
                    <td>
                      {getStatusBadge(member.status)}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-sm btn-info"
                          onClick={() => handleViewStaff(member)}
                          title="Ver detalles"
                        >
                          👁️
                        </button>
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEditStaff(member)}
                          title="Editar"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteStaff(member.id)}
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Estadísticas por departamento */}
      <div className="department-stats">
        <h3>📊 Personal por departamento</h3>
        <div className="department-grid">
          {Object.entries(getDepartmentStats()).map(([department, count]) => (
            <div key={department} className="department-card">
              <div className="department-header">
                <span className="department-icon">
                  {department === 'Nutrición Escolar' && '👩‍⚕️'}
                  {department === 'Cocina' && '👨‍🍳'}
                  {department === 'Administración' && '👩‍💻'}
                  {department === 'Educación' && '👨‍🏫'}
                </span>
                <h4>{department}</h4>
              </div>
              <div className="department-count">
                <span className="count-number">{count}</span>
                <span className="count-label">empleados</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar/editar/ver personal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === 'add' && '➕ Nuevo Empleado'}
                {modalType === 'edit' && '✏️ Editar Empleado'}
                {modalType === 'view' && '👁️ Detalles del Empleado'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="staff-form">
                <div className="form-section">
                  <h4>👤 Información personal</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>RUT:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStaff?.rut}
                        placeholder="15.555.777-8"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre completo:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStaff?.name}
                        placeholder="Nombre completo del empleado"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Teléfono:</label>
                      <input 
                        type="tel" 
                        defaultValue={selectedStaff?.phone}
                        placeholder="+56 9 1234 5678"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        defaultValue={selectedStaff?.email}
                        placeholder="empleado@umina.edu.cl"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>💼 Información laboral</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Rol:</label>
                      <select 
                        defaultValue={selectedStaff?.role}
                        disabled={modalType === 'view'}
                      >
                        <option value="">Seleccionar rol</option>
                        {roles.map(role => (
                          <option key={role.value} value={role.value}>
                            {role.icon} {role.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Departamento:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStaff?.department}
                        placeholder="Departamento o área"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Cargo:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStaff?.position}
                        placeholder="Título del cargo"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Fecha de contratación:</label>
                      <input 
                        type="date" 
                        defaultValue={selectedStaff?.hireDate}
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Horario:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedStaff?.schedule}
                        placeholder="Lunes a Viernes 08:00-16:00"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Estado:</label>
                      <select 
                        defaultValue={selectedStaff?.status}
                        disabled={modalType === 'view'}
                      >
                        {statuses.map(status => (
                          <option key={status.value} value={status.value}>{status.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>🎓 Experiencia y certificaciones</h4>
                  <div className="form-group">
                    <label>Años de experiencia:</label>
                    <input 
                      type="text" 
                      defaultValue={selectedStaff?.experience}
                      placeholder="5 años"
                      disabled={modalType === 'view'}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Certificaciones:</label>
                    <textarea 
                      rows="3"
                      defaultValue={selectedStaff?.certifications.join(', ')}
                      placeholder="Lista de certificaciones separadas por comas"
                      disabled={modalType === 'view'}
                    ></textarea>
                  </div>
                </div>

                <div className="form-section">
                  <h4>🔐 Permisos del sistema</h4>
                  <div className="permissions-grid">
                    {permissions.filter(p => p.category === 'nutrition').length > 0 && (
                      <div className="permission-category">
                        <h5>👩‍⚕️ Nutrición</h5>
                        {permissions.filter(p => p.category === 'nutrition').map(permission => (
                          <div key={permission.value} className="permission-item">
                            <input 
                              type="checkbox" 
                              id={permission.value}
                              defaultChecked={selectedStaff?.permissions.includes(permission.value)}
                              disabled={modalType === 'view'}
                            />
                            <label htmlFor={permission.value}>{permission.label}</label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {permissions.filter(p => p.category === 'kitchen').length > 0 && (
                      <div className="permission-category">
                        <h5>👨‍🍳 Cocina</h5>
                        {permissions.filter(p => p.category === 'kitchen').map(permission => (
                          <div key={permission.value} className="permission-item">
                            <input 
                              type="checkbox" 
                              id={permission.value}
                              defaultChecked={selectedStaff?.permissions.includes(permission.value)}
                              disabled={modalType === 'view'}
                            />
                            <label htmlFor={permission.value}>{permission.label}</label>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {permissions.filter(p => p.category === 'admin').length > 0 && (
                      <div className="permission-category">
                        <h5>👩‍💻 Administración</h5>
                        {permissions.filter(p => p.category === 'admin').map(permission => (
                          <div key={permission.value} className="permission-item">
                            <input 
                              type="checkbox" 
                              id={permission.value}
                              defaultChecked={selectedStaff?.permissions.includes(permission.value)}
                              disabled={modalType === 'view'}
                            />
                            <label htmlFor={permission.value}>{permission.label}</label>
                          </div>
                        ))}
                      </div>
                    )}
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
                  {modalType === 'add' ? 'Registrar empleado' : 'Guardar cambios'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}