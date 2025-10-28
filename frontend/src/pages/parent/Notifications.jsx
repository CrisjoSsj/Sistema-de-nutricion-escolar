import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';
import '../../styles/parent/Notifications.css';

export default function ParentNotifications() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Datos de ejemplo de notificaciones
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'menu',
      priority: 'info',
      title: 'Nuevo menú semanal disponible',
      message: 'Ya está disponible el menú de la semana del 14 al 18 de octubre. Revisa las opciones para tus hijos.',
      date: '2025-10-09 09:30',
      read: false,
      children: ['Ana María', 'Carlos José'],
      actions: [
        { label: 'Ver menú', action: 'view_menu' },
        { label: 'Descargar PDF', action: 'download_pdf' }
      ]
    },
    {
      id: 2,
      type: 'allergy',
      priority: 'high',
      title: 'Alerta de alérgeno - Ana María',
      message: 'El menú de mañana (pasta con salsa de nueces) contiene nueces. Ana María tiene alergia registrada a este alimento.',
      date: '2025-10-08 16:45',
      read: false,
      children: ['Ana María'],
      actions: [
        { label: 'Ver alternativas', action: 'view_alternatives' },
        { label: 'Contactar nutricionista', action: 'contact_nutritionist' }
      ]
    },
    {
      id: 3,
      type: 'feedback',
      priority: 'info',
      title: 'Respuesta a tu comentario',
      message: 'La nutricionista María Paz respondió a tu comentario sobre el menú de pescado al vapor.',
      date: '2025-10-08 14:20',
      read: true,
      children: ['Ana María'],
      actions: [
        { label: 'Ver respuesta', action: 'view_response' },
        { label: 'Responder', action: 'reply' }
      ]
    },
    {
      id: 4,
      type: 'nutrition',
      priority: 'medium',
      title: 'Reporte nutricional semanal - Carlos José',
      message: 'Carlos José ha cumplido el 95% de sus objetivos nutricionales esta semana. ¡Excelente progreso!',
      date: '2025-10-07 18:00',
      read: true,
      children: ['Carlos José'],
      actions: [
        { label: 'Ver reporte completo', action: 'view_report' },
        { label: 'Compartir progreso', action: 'share_progress' }
      ]
    },
    {
      id: 5,
      type: 'system',
      priority: 'info',
      title: 'Actualización del sistema',
      message: 'Hemos mejorado la sección de seguimiento nutricional. Ahora puedes ver más detalles sobre el consumo diario.',
      date: '2025-10-06 12:00',
      read: true,
      children: [],
      actions: [
        { label: 'Ver novedades', action: 'view_updates' }
      ]
    },
    {
      id: 6,
      type: 'reminder',
      priority: 'low',
      title: 'Recordatorio: Actualizar información médica',
      message: 'Recuerda actualizar la información médica y alergias de tus hijos al menos una vez al semestre.',
      date: '2025-10-05 10:30',
      read: true,
      children: ['Ana María', 'Carlos José'],
      actions: [
        { label: 'Actualizar información', action: 'update_info' },
        { label: 'Posponer recordatorio', action: 'snooze' }
      ]
    },
    {
      id: 7,
      type: 'event',
      priority: 'medium',
      title: 'Charla nutricional para padres',
      message: 'Te invitamos a la charla "Alimentación saludable en casa" el viernes 18 de octubre a las 19:00.',
      date: '2025-10-04 08:15',
      read: true,
      children: [],
      actions: [
        { label: 'Confirmar asistencia', action: 'confirm_attendance' },
        { label: 'Ver más detalles', action: 'view_details' }
      ]
    }
  ]);

  const notificationTypes = [
    { value: 'all', label: 'Todas', icon: '📬' },
    { value: 'menu', label: 'Menús', icon: '🍽️' },
    { value: 'allergy', label: 'Alertas de alérgenos', icon: '⚠️' },
    { value: 'feedback', label: 'Respuestas', icon: '💬' },
    { value: 'nutrition', label: 'Reportes nutricionales', icon: '📊' },
    { value: 'system', label: 'Sistema', icon: '⚙️' },
    { value: 'reminder', label: 'Recordatorios', icon: '🔔' },
    { value: 'event', label: 'Eventos', icon: '📅' }
  ];

  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(notif => {
        if (selectedFilter === 'unread') return !notif.read;
        if (selectedFilter === 'read') return notif.read;
        return true;
      });
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(notif => notif.type === selectedType);
    }
    
    return filtered;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: '🔴',
      medium: '🟡',
      low: '🟢',
      info: '🔵'
    };
    return icons[priority] || '🔵';
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const getTypeIcon = (type) => {
    const typeObj = notificationTypes.find(t => t.value === type);
    return typeObj ? typeObj.icon : '📬';
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const handleAction = (action, notificationId) => {
    // Marcar como leída cuando se ejecuta una acción
    markAsRead(notificationId);
    
    // Simular acciones
    switch(action) {
      case 'view_menu':
        alert('Redirigiendo a menús semanales...');
        break;
      case 'download_pdf':
        alert('Descargando menú en PDF...');
        break;
      case 'view_alternatives':
        alert('Mostrando alternativas para alérgenos...');
        break;
      case 'contact_nutritionist':
        alert('Abriendo chat con nutricionista...');
        break;
      default:
        alert(`Ejecutando acción: ${action}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="parent-notifications">
        <div className="page-header">
          <h1 className="page-title">
            Notificaciones 
            {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
          </h1>
          <p className="page-description">Mantente al día con las novedades sobre la alimentación de tus hijos</p>
        </div>

      {/* Controles de notificaciones */}
      <div className="notifications-controls">
        <div className="filter-controls">
          <div className="filter-group">
            <label>Filtrar por estado:</label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todas las notificaciones</option>
              <option value="unread">No leídas ({unreadCount})</option>
              <option value="read">Leídas</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Filtrar por tipo:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="type-select"
            >
              {notificationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="action-controls">
          <button 
            className="btn btn-outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            ✅ Marcar todas como leídas
          </button>
          <button 
            className="btn btn-outline"
            onClick={() => setShowSettingsModal(true)}
          >
            ⚙️ Configurar notificaciones
          </button>
        </div>
      </div>

      {/* Lista de notificaciones */}
      <div className="notifications-list">
        {getFilteredNotifications().length === 0 ? (
          <div className="empty-notifications">
            <div className="empty-icon">📭</div>
            <h4>No hay notificaciones</h4>
            <p>No se encontraron notificaciones con los filtros seleccionados.</p>
          </div>
        ) : (
          getFilteredNotifications().map(notification => (
            <div 
              key={notification.id} 
              className={`notification-card ${!notification.read ? 'unread' : 'read'} ${getPriorityClass(notification.priority)}`}
            >
              <div className="notification-header">
                <div className="notification-meta">
                  <span className="notification-type">
                    {getTypeIcon(notification.type)}
                  </span>
                  <span className="notification-priority">
                    {getPriorityIcon(notification.priority)}
                  </span>
                  <h4 className="notification-title">{notification.title}</h4>
                </div>
                <div className="notification-controls">
                  <span className="notification-date">{notification.date}</span>
                  {!notification.read && (
                    <button 
                      className="mark-read-btn"
                      onClick={() => markAsRead(notification.id)}
                      title="Marcar como leída"
                    >
                      👁️
                    </button>
                  )}
                  <button 
                    className="delete-btn"
                    onClick={() => deleteNotification(notification.id)}
                    title="Eliminar notificación"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                
                {notification.children.length > 0 && (
                  <div className="notification-children">
                    <strong>Relacionado con:</strong>
                    <div className="children-tags">
                      {notification.children.map((child, index) => (
                        <span key={index} className="child-tag">
                          👤 {child}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {notification.actions.length > 0 && (
                <div className="notification-actions">
                  {notification.actions.map((action, index) => (
                    <button
                      key={index}
                      className="btn btn-outline btn-sm"
                      onClick={() => handleAction(action.action, notification.id)}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal de configuración */}
      {showSettingsModal && (
        <div className="modal-overlay">
          <div className="modal modal-large">
            <div className="modal-header">
              <h3 className="modal-title">Configurar Notificaciones</h3>
              <button 
                className="modal-close"
                onClick={() => setShowSettingsModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="notification-settings">
                <h4>Tipos de notificaciones que deseas recibir:</h4>
                
                <div className="settings-grid">
                  {notificationTypes.slice(1).map(type => (
                    <div key={type.value} className="setting-item">
                      <div className="setting-header">
                        <span className="setting-icon">{type.icon}</span>
                        <h5>{type.label}</h5>
                      </div>
                      <div className="setting-options">
                        <label className="setting-option">
                          <input type="checkbox" defaultChecked />
                          <span>En la aplicación</span>
                        </label>
                        <label className="setting-option">
                          <input type="checkbox" defaultChecked />
                          <span>Por email</span>
                        </label>
                        <label className="setting-option">
                          <input type="checkbox" />
                          <span>Por SMS</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="timing-settings">
                  <h4>Horarios de notificación:</h4>
                  <div className="timing-options">
                    <div className="timing-item">
                      <label>Horario de notificaciones por email:</label>
                      <select>
                        <option value="immediate">Inmediato</option>
                        <option value="daily">Resumen diario (18:00)</option>
                        <option value="weekly">Resumen semanal (Domingo 18:00)</option>
                      </select>
                    </div>
                    <div className="timing-item">
                      <label>No molestar entre:</label>
                      <div className="time-range">
                        <input type="time" defaultValue="22:00" />
                        <span>y</span>
                        <input type="time" defaultValue="07:00" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="priority-settings">
                  <h4>Configuración por prioridad:</h4>
                  <div className="priority-options">
                    <div className="priority-item">
                      <span className="priority-icon">🔴</span>
                      <span className="priority-label">Alta prioridad</span>
                      <label className="priority-option">
                        <input type="checkbox" defaultChecked />
                        <span>Notificar siempre, incluso en horario "No molestar"</span>
                      </label>
                    </div>
                    <div className="priority-item">
                      <span className="priority-icon">🟡</span>
                      <span className="priority-label">Prioridad media</span>
                      <label className="priority-option">
                        <input type="checkbox" defaultChecked />
                        <span>Notificar durante horario normal</span>
                      </label>
                    </div>
                    <div className="priority-item">
                      <span className="priority-icon">🟢</span>
                      <span className="priority-label">Prioridad baja</span>
                      <label className="priority-option">
                        <input type="checkbox" />
                        <span>Solo en resúmenes programados</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowSettingsModal(false)}
              >
                Cancelar
              </button>
              <button className="btn btn-primary">
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resumen de notificaciones */}
      <div className="notifications-summary">
        <h3>Resumen de Actividad</h3>
        <div className="summary-stats">
          <div className="summary-stat">
            <div className="stat-icon">📬</div>
            <div className="stat-content">
              <h4>Total</h4>
              <p>{notifications.length} notificaciones</p>
            </div>
          </div>
          <div className="summary-stat">
            <div className="stat-icon">📭</div>
            <div className="stat-content">
              <h4>No leídas</h4>
              <p>{unreadCount} pendientes</p>
            </div>
          </div>
          <div className="summary-stat">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h4>Alta prioridad</h4>
              <p>{notifications.filter(n => n.priority === 'high').length} urgentes</p>
            </div>
          </div>
          <div className="summary-stat">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h4>Esta semana</h4>
              <p>{notifications.filter(n => new Date(n.date) > new Date(Date.now() - 7*24*60*60*1000)).length} recientes</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}