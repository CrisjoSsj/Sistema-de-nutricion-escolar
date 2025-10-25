import DashboardLayout from '../../components/common/DashboardLayout.jsx';
import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      systemName: 'Sistema de Nutrición Escolar',
      adminEmail: 'admin@nutricion.edu',
      timezone: 'America/Bogota',
      language: 'es',
      maintenance: false
    },
    nutrition: {
      minCalories: 400,
      maxCalories: 600,
      proteinPercentage: 25,
      carbsPercentage: 55,
      fatsPercentage: 20,
      allergenWarnings: true
    },
    notifications: {
      emailNotifications: true,
      menuApproval: true,
      lowStock: true,
      userRegistration: false,
      weeklyReports: true
    },
    security: {
      passwordMinLength: 8,
      requireSpecialChars: true,
      sessionTimeout: 30,
      twoFactorAuth: false,
      ipRestriction: false
    }
  });

  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    console.log('Guardando configuración:', settings);
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  const resetToDefaults = () => {
    if (confirm('¿Estás seguro de que quieres restaurar la configuración por defecto?')) {
      // Lógica para restaurar configuración por defecto
      console.log('Restaurando configuración por defecto');
    }
  };

  return (
    <DashboardLayout showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">Configuración del Sistema</h1>
        <p className="page-description">Gestiona la configuración general del sistema de nutrición escolar</p>
      </div>

      {/* Confirmación de guardado */}
      {showSaveConfirmation && (
        <div className="alert alert-success">
          ✅ Configuración guardada exitosamente
        </div>
      )}

      {/* Pestañas de configuración */}
      <div className="settings-container">
        <div className="settings-tabs">
          <button 
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            ⚙️ General
          </button>
          <button 
            className={`tab-button ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            🥗 Nutrición
          </button>
          <button 
            className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            🔔 Notificaciones
          </button>
          <button 
            className={`tab-button ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            🔒 Seguridad
          </button>
          <button 
            className={`tab-button ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            💾 Respaldo
          </button>
        </div>

        <div className="settings-content">
          {/* Configuración General */}
          {activeTab === 'general' && (
            <div className="settings-section">
              <h2>Configuración General</h2>
              
              <div className="setting-group">
                <h3>Información del Sistema</h3>
                <div className="form-group">
                  <label>Nombre del Sistema</label>
                  <input 
                    type="text" 
                    value={settings.general.systemName}
                    onChange={(e) => handleSettingChange('general', 'systemName', e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Email del Administrador</label>
                  <input 
                    type="email" 
                    value={settings.general.adminEmail}
                    onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Zona Horaria</label>
                    <select 
                      value={settings.general.timezone}
                      onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                    >
                      <option value="America/Bogota">Bogotá (GMT-5)</option>
                      <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                      <option value="America/Buenos_Aires">Buenos Aires (GMT-3)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Idioma</label>
                    <select 
                      value={settings.general.language}
                      onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                    >
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="pt">Português</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3>Mantenimiento</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={settings.general.maintenance}
                      onChange={(e) => handleSettingChange('general', 'maintenance', e.target.checked)}
                    />
                    Modo de mantenimiento
                  </label>
                  <small>El sistema estará inaccesible para usuarios durante el mantenimiento</small>
                </div>
              </div>
            </div>
          )}

          {/* Configuración Nutricional */}
          {activeTab === 'nutrition' && (
            <div className="settings-section">
              <h2>Estándares Nutricionales</h2>
              
              <div className="setting-group">
                <h3>Rangos de Calorías</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Calorías Mínimas por Comida</label>
                    <input 
                      type="number" 
                      value={settings.nutrition.minCalories}
                      onChange={(e) => handleSettingChange('nutrition', 'minCalories', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Calorías Máximas por Comida</label>
                    <input 
                      type="number" 
                      value={settings.nutrition.maxCalories}
                      onChange={(e) => handleSettingChange('nutrition', 'maxCalories', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3>Distribución de Macronutrientes</h3>
                <div className="macro-sliders">
                  <div className="macro-item">
                    <label>Proteínas: {settings.nutrition.proteinPercentage}%</label>
                    <input 
                      type="range" 
                      min="15" 
                      max="35" 
                      value={settings.nutrition.proteinPercentage}
                      onChange={(e) => handleSettingChange('nutrition', 'proteinPercentage', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="macro-item">
                    <label>Carbohidratos: {settings.nutrition.carbsPercentage}%</label>
                    <input 
                      type="range" 
                      min="45" 
                      max="65" 
                      value={settings.nutrition.carbsPercentage}
                      onChange={(e) => handleSettingChange('nutrition', 'carbsPercentage', parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="macro-item">
                    <label>Grasas: {settings.nutrition.fatsPercentage}%</label>
                    <input 
                      type="range" 
                      min="10" 
                      max="30" 
                      value={settings.nutrition.fatsPercentage}
                      onChange={(e) => handleSettingChange('nutrition', 'fatsPercentage', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3>Alertas y Advertencias</h3>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={settings.nutrition.allergenWarnings}
                      onChange={(e) => handleSettingChange('nutrition', 'allergenWarnings', e.target.checked)}
                    />
                    Mostrar advertencias de alérgenos
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Configuración de Notificaciones */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Configuración de Notificaciones</h2>
              
              <div className="setting-group">
                <h3>Notificaciones por Email</h3>
                <div className="notification-options">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                      />
                      Habilitar notificaciones por email
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.menuApproval}
                        onChange={(e) => handleSettingChange('notifications', 'menuApproval', e.target.checked)}
                      />
                      Notificar cuando un menú requiere aprobación
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.lowStock}
                        onChange={(e) => handleSettingChange('notifications', 'lowStock', e.target.checked)}
                      />
                      Alertas de inventario bajo
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.userRegistration}
                        onChange={(e) => handleSettingChange('notifications', 'userRegistration', e.target.checked)}
                      />
                      Notificar registro de nuevos usuarios
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.weeklyReports}
                        onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                      />
                      Enviar reportes semanales automáticamente
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Configuración de Seguridad */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2>Configuración de Seguridad</h2>
              
              <div className="setting-group">
                <h3>Políticas de Contraseña</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Longitud mínima de contraseña</label>
                    <input 
                      type="number" 
                      min="6" 
                      max="20" 
                      value={settings.security.passwordMinLength}
                      onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={settings.security.requireSpecialChars}
                      onChange={(e) => handleSettingChange('security', 'requireSpecialChars', e.target.checked)}
                    />
                    Requerir caracteres especiales
                  </label>
                </div>
              </div>

              <div className="setting-group">
                <h3>Sesiones y Acceso</h3>
                <div className="form-group">
                  <label>Tiempo de expiración de sesión (minutos)</label>
                  <input 
                    type="number" 
                    min="5" 
                    max="480" 
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                    />
                    Habilitar autenticación de dos factores
                  </label>
                </div>
                
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={settings.security.ipRestriction}
                      onChange={(e) => handleSettingChange('security', 'ipRestriction', e.target.checked)}
                    />
                    Restricción por IP para administradores
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Configuración de Respaldo */}
          {activeTab === 'backup' && (
            <div className="settings-section">
              <h2>Respaldo y Recuperación</h2>
              
              <div className="setting-group">
                <h3>Respaldo Automático</h3>
                <div className="backup-schedule">
                  <div className="form-group">
                    <label>Frecuencia de respaldo</label>
                    <select>
                      <option value="daily">Diario</option>
                      <option value="weekly">Semanal</option>
                      <option value="monthly">Mensual</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Hora de respaldo</label>
                    <input type="time" defaultValue="02:00" />
                  </div>
                </div>
              </div>

              <div className="setting-group">
                <h3>Acciones de Respaldo</h3>
                <div className="backup-actions">
                  <button className="btn btn-primary">
                    💾 Crear Respaldo Ahora
                  </button>
                  
                  <button className="btn btn-outline">
                    📥 Descargar Último Respaldo
                  </button>
                  
                  <button className="btn btn-warning">
                    🔄 Restaurar desde Respaldo
                  </button>
                </div>
              </div>

              <div className="setting-group">
                <h3>Historial de Respaldos</h3>
                <div className="backup-history">
                  <div className="backup-item">
                    <span className="backup-date">13 Enero 2025 - 02:00</span>
                    <span className="backup-size">45.2 MB</span>
                    <span className="backup-status success">✅ Exitoso</span>
                  </div>
                  <div className="backup-item">
                    <span className="backup-date">12 Enero 2025 - 02:00</span>
                    <span className="backup-size">44.8 MB</span>
                    <span className="backup-status success">✅ Exitoso</span>
                  </div>
                  <div className="backup-item">
                    <span className="backup-date">11 Enero 2025 - 02:00</span>
                    <span className="backup-size">44.1 MB</span>
                    <span className="backup-status success">✅ Exitoso</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="settings-actions">
        <button className="btn btn-secondary" onClick={resetToDefaults}>
          🔄 Restaurar por Defecto
        </button>
        <button className="btn btn-primary" onClick={saveSettings}>
          💾 Guardar Configuración
        </button>
      </div>
    </DashboardLayout>
  );
}