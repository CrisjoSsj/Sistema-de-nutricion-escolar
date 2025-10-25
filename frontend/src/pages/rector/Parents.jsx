import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';
import { useState } from 'react';

export default function RectorParents() {
  const { currentSchool } = useSchool();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedParent, setSelectedParent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const [parents, setParents] = useState([
    {
      id: 1,
      rut: '11.222.333-4',
      name: 'Carlos González Pérez',
      email: 'carlos.gonzalez@email.com',
      phone: '+56 9 8765 4321',
      address: 'Av. Los Leones 123, Valparaíso',
      relationship: 'Padre',
      occupation: 'Ingeniero',
      emergencyContact: 'María González - +56 9 8765 4322',
      children: [
        { id: 1, name: 'Ana María González', grade: '3° Básico', rut: '12.345.678-9' }
      ],
      registrationDate: '2024-03-01',
      lastLogin: '2025-10-08',
      status: 'active',
      notifications: true,
      menuAlerts: true,
      academicReports: true
    },
    {
      id: 2,
      rut: '22.333.444-5',
      name: 'Patricia Rodríguez Silva',
      email: 'patricia.rodriguez@email.com',
      phone: '+56 9 7654 3210',
      address: 'Calle Principal 456, Valparaíso',
      relationship: 'Madre',
      occupation: 'Doctora',
      emergencyContact: 'Juan Rodríguez - +56 9 7654 3211',
      children: [
        { id: 2, name: 'Diego Rodríguez', grade: '5° Básico', rut: '23.456.789-0' }
      ],
      registrationDate: '2022-03-01',
      lastLogin: '2025-10-09',
      status: 'active',
      notifications: true,
      menuAlerts: false,
      academicReports: true
    },
    {
      id: 3,
      rut: '33.444.555-6',
      name: 'Luis Martínez López',
      email: 'luis.martinez@email.com',
      phone: '+56 9 6543 2109',
      address: 'Los Aromos 789, Valparaíso',
      relationship: 'Padre',
      occupation: 'Contador',
      emergencyContact: 'Carmen Martínez - +56 9 6543 2108',
      children: [
        { id: 3, name: 'Sofía Martínez', grade: '1° Básico', rut: '34.567.890-1' }
      ],
      registrationDate: '2025-03-01',
      lastLogin: 'Nunca',
      status: 'pending',
      notifications: true,
      menuAlerts: true,
      academicReports: true
    },
    {
      id: 4,
      rut: '44.555.666-7',
      name: 'Andrea Morales Fuentes',
      email: 'andrea.morales@email.com',
      phone: '+56 9 5432 1098',
      address: 'Las Flores 321, Valparaíso',
      relationship: 'Madre',
      occupation: 'Profesora',
      emergencyContact: 'Pedro Morales - +56 9 5432 1099',
      children: [
        { id: 4, name: 'Martín Morales', grade: '2° Básico', rut: '45.678.901-2' },
        { id: 5, name: 'Valentina Morales', grade: '4° Básico', rut: '56.789.012-3' }
      ],
      registrationDate: '2023-03-01',
      lastLogin: '2025-10-07',
      status: 'active',
      notifications: true,
      menuAlerts: true,
      academicReports: false
    }
  ]);

  const statuses = [
    { value: 'active', label: 'Activo', color: '#4CAF50' },
    { value: 'pending', label: 'Pendiente', color: '#FF9800' },
    { value: 'inactive', label: 'Inactivo', color: '#F44336' }
  ];

  const relationships = ['Padre', 'Madre', 'Tutor Legal', 'Abuelo/a', 'Tío/a', 'Otro'];

  const filteredParents = parents.filter(parent => {
    const matchesSearch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parent.rut.includes(searchTerm) ||
                         parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parent.children.some(child => 
                           child.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesStatus = !filterStatus || parent.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddParent = () => {
    setModalType('add');
    setSelectedParent(null);
    setShowModal(true);
  };

  const handleViewParent = (parent) => {
    setModalType('view');
    setSelectedParent(parent);
    setShowModal(true);
  };

  const handleEditParent = (parent) => {
    setModalType('edit');
    setSelectedParent(parent);
    setShowModal(true);
  };

  const handleDeleteParent = (parentId) => {
    if (confirm('¿Estás seguro de que deseas eliminar este apoderado?')) {
      setParents(parents.filter(p => p.id !== parentId));
    }
  };

  const handleSendNotification = (parent) => {
    alert(`Enviando notificación a ${parent.name}...`);
  };

  const handleResetPassword = (parent) => {
    if (confirm(`¿Deseas enviar un enlace de restablecimiento de contraseña a ${parent.email}?`)) {
      alert(`Enlace de restablecimiento enviado a ${parent.email}`);
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

  const getLastLoginText = (lastLogin) => {
    if (lastLogin === 'Nunca') {
      return <span className="last-login never">Nunca</span>;
    }
    const today = new Date();
    const loginDate = new Date(lastLogin);
    const diffDays = Math.floor((today - loginDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return <span className="last-login today">Hoy</span>;
    if (diffDays === 1) return <span className="last-login recent">Ayer</span>;
    if (diffDays <= 7) return <span className="last-login recent">Hace {diffDays} días</span>;
    return <span className="last-login old">Hace {diffDays} días</span>;
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">
          👨‍👩‍👧‍👦 Gestión de Apoderados
        </h1>
        <p className="page-description">
          Administra la información de los padres y apoderados de {currentSchool?.name}
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="stats-overview">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👨‍👩‍👧‍👦</div>
            <div className="stat-content">
              <h4>{parents.filter(p => p.status === 'active').length}</h4>
              <p>Apoderados activos</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h4>{parents.filter(p => p.status === 'pending').length}</h4>
              <p>Registros pendientes</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📧</div>
            <div className="stat-content">
              <h4>{parents.filter(p => p.notifications).length}</h4>
              <p>Con notificaciones</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔗</div>
            <div className="stat-content">
              <h4>{parents.reduce((total, parent) => total + parent.children.length, 0)}</h4>
              <p>Vinculaciones hijo-padre</p>
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
              placeholder="Buscar por nombre, RUT, email o hijo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filters">
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
          <button className="btn btn-primary" onClick={handleAddParent}>
            ➕ Nuevo apoderado
          </button>
          <button className="btn btn-secondary">
            📧 Envío masivo
          </button>
          <button className="btn btn-secondary">
            📊 Exportar listado
          </button>
        </div>
      </div>

      {/* Lista de apoderados */}
      <div className="parents-table">
        <div className="table-header">
          <h3>📋 Lista de apoderados ({filteredParents.length})</h3>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Apoderado</th>
                <th>Contacto</th>
                <th>Parentesco</th>
                <th>Hijos</th>
                <th>Último acceso</th>
                <th>Notificaciones</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredParents.map(parent => (
                <tr key={parent.id} className={`parent-row status-${parent.status}`}>
                  <td>
                    <div className="parent-info">
                      <div className="parent-details">
                        <span className="parent-name">{parent.name}</span>
                        <span className="parent-rut">{parent.rut}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <span className="contact-phone">{parent.phone}</span>
                      <span className="contact-email">{parent.email}</span>
                    </div>
                  </td>
                  <td className="parent-relationship">{parent.relationship}</td>
                  <td>
                    <div className="children-list">
                      {parent.children.map((child, index) => (
                        <div key={child.id} className="child-info">
                          <span className="child-name">{child.name}</span>
                          <span className="child-grade">({child.grade})</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    {getLastLoginText(parent.lastLogin)}
                  </td>
                  <td>
                    <div className="notification-settings">
                      <span className={`notification-status ${parent.notifications ? 'enabled' : 'disabled'}`}>
                        {parent.notifications ? '🔔' : '🔕'} General
                      </span>
                      <span className={`notification-status ${parent.menuAlerts ? 'enabled' : 'disabled'}`}>
                        {parent.menuAlerts ? '🍽️' : '🚫'} Menú
                      </span>
                    </div>
                  </td>
                  <td>
                    {getStatusBadge(parent.status)}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn btn-sm btn-info"
                        onClick={() => handleViewParent(parent)}
                        title="Ver detalles"
                      >
                        👁️
                      </button>
                      <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEditParent(parent)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn btn-sm btn-warning"
                        onClick={() => handleSendNotification(parent)}
                        title="Enviar notificación"
                      >
                        📧
                      </button>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleResetPassword(parent)}
                        title="Restablecer contraseña"
                      >
                        🔑
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteParent(parent.id)}
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

      {/* Estadísticas adicionales */}
      <div className="additional-stats">
        <div className="stats-row">
          <div className="stat-card">
            <h4>📊 Por parentesco</h4>
            <div className="relationship-stats">
              {relationships.map(rel => {
                const count = parents.filter(p => p.relationship === rel).length;
                if (count === 0) return null;
                return (
                  <div key={rel} className="relationship-stat">
                    <span className="relationship-name">{rel}</span>
                    <span className="relationship-count">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="stat-card">
            <h4>🔔 Preferencias de notificación</h4>
            <div className="notification-stats">
              <div className="notification-stat">
                <span className="notification-label">Notificaciones generales:</span>
                <span className="notification-count">
                  {parents.filter(p => p.notifications).length}/{parents.length}
                </span>
              </div>
              <div className="notification-stat">
                <span className="notification-label">Alertas de menú:</span>
                <span className="notification-count">
                  {parents.filter(p => p.menuAlerts).length}/{parents.length}
                </span>
              </div>
              <div className="notification-stat">
                <span className="notification-label">Reportes académicos:</span>
                <span className="notification-count">
                  {parents.filter(p => p.academicReports).length}/{parents.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para agregar/editar/ver apoderado */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === 'add' && '➕ Nuevo Apoderado'}
                {modalType === 'edit' && '✏️ Editar Apoderado'}
                {modalType === 'view' && '👁️ Detalles del Apoderado'}
              </h3>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              <div className="parent-form">
                <div className="form-section">
                  <h4>👤 Información personal</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>RUT:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedParent?.rut}
                        placeholder="11.222.333-4"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Nombre completo:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedParent?.name}
                        placeholder="Nombre completo del apoderado"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Parentesco:</label>
                      <select 
                        defaultValue={selectedParent?.relationship}
                        disabled={modalType === 'view'}
                      >
                        <option value="">Seleccionar parentesco</option>
                        {relationships.map(rel => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Ocupación:</label>
                      <input 
                        type="text" 
                        defaultValue={selectedParent?.occupation}
                        placeholder="Profesión u ocupación"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Dirección:</label>
                    <input 
                      type="text" 
                      defaultValue={selectedParent?.address}
                      placeholder="Dirección completa"
                      disabled={modalType === 'view'}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h4>📞 Información de contacto</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Teléfono:</label>
                      <input 
                        type="tel" 
                        defaultValue={selectedParent?.phone}
                        placeholder="+56 9 8765 4321"
                        disabled={modalType === 'view'}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        defaultValue={selectedParent?.email}
                        placeholder="email@ejemplo.com"
                        disabled={modalType === 'view'}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Contacto de emergencia:</label>
                    <input 
                      type="text" 
                      defaultValue={selectedParent?.emergencyContact}
                      placeholder="Nombre - Teléfono"
                      disabled={modalType === 'view'}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h4>👶 Hijos asociados</h4>
                  {selectedParent?.children.map((child, index) => (
                    <div key={child.id} className="child-association">
                      <div className="child-info-row">
                        <span className="child-name">{child.name}</span>
                        <span className="child-grade">{child.grade}</span>
                        <span className="child-rut">{child.rut}</span>
                        {modalType !== 'view' && (
                          <button className="btn btn-sm btn-danger">
                            Desvincular
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {modalType !== 'view' && (
                    <button className="btn btn-secondary">
                      ➕ Asociar hijo
                    </button>
                  )}
                </div>

                <div className="form-section">
                  <h4>🔔 Preferencias de notificación</h4>
                  <div className="notification-preferences">
                    <div className="preference-item">
                      <input 
                        type="checkbox" 
                        id="notifications"
                        defaultChecked={selectedParent?.notifications}
                        disabled={modalType === 'view'}
                      />
                      <label htmlFor="notifications">Notificaciones generales</label>
                    </div>
                    <div className="preference-item">
                      <input 
                        type="checkbox" 
                        id="menuAlerts"
                        defaultChecked={selectedParent?.menuAlerts}
                        disabled={modalType === 'view'}
                      />
                      <label htmlFor="menuAlerts">Alertas del menú escolar</label>
                    </div>
                    <div className="preference-item">
                      <input 
                        type="checkbox" 
                        id="academicReports"
                        defaultChecked={selectedParent?.academicReports}
                        disabled={modalType === 'view'}
                      />
                      <label htmlFor="academicReports">Reportes académicos</label>
                    </div>
                  </div>
                </div>

                {modalType !== 'add' && (
                  <div className="form-section">
                    <h4>📊 Información de cuenta</h4>
                    <div className="account-info">
                      <div className="info-item">
                        <span className="info-label">Fecha de registro:</span>
                        <span className="info-value">{selectedParent?.registrationDate}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Último acceso:</span>
                        <span className="info-value">{selectedParent?.lastLogin}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Estado:</span>
                        <span className="info-value">{getStatusBadge(selectedParent?.status)}</span>
                      </div>
                    </div>
                  </div>
                )}
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
                  {modalType === 'add' ? 'Registrar apoderado' : 'Guardar cambios'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}