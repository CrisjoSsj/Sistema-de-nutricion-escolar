import DashboardLayout from '../../components/common/DashboardLayout.jsx';

export default function AdminDashboard() {
  // Manejadores para botones de acciones rápidas
  const handleAddUser = () => {
    alert('Función "Agregar Usuario" en desarrollo. Próximamente disponible.');
  };

  const handleRegisterSchool = () => {
    alert('Función "Registrar Escuela" en desarrollo. Próximamente disponible.');
  };

  const handleGenerateReport = () => {
    alert('Función "Generar Reporte" en desarrollo. Próximamente disponible.');
  };

  return (
    <DashboardLayout title="Panel de Administración" showSchoolHeader={false}>
      <div className="page-header">
        <h1 className="page-title">Panel de Administración</h1>
      </div>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon usuarios">
              👥
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-number">1,247</div>
            <div className="stat-label">Total de usuarios registrados</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon escuelas">
              🏫
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-number">15</div>
            <div className="stat-label">Escuelas registradas</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon reportes">
              📊
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-number">342</div>
            <div className="stat-label">Reportes generados</div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="actions-grid">
        <div className="action-card">
          <h3 className="action-title">Acciones Rápidas</h3>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleAddUser}>
              ➕ Agregar Usuario
            </button>
            <button className="btn btn-secondary" onClick={handleRegisterSchool}>
              🏫 Registrar Escuela
            </button>
            <button className="btn btn-outline" onClick={handleGenerateReport}>
              📊 Generar Reporte
            </button>
          </div>
        </div>

        <div className="recent-card">
          <h3 className="recent-title">Usuarios Recientes</h3>
          <div className="recent-list">
            <div className="recent-item">
              <div className="user-info">
                <div className="user-name">Juan Pérez</div>
                <div className="user-role">Administrador</div>
              </div>
              <div className="role-badge">Admin</div>
            </div>
            <div className="recent-item">
              <div className="user-info">
                <div className="user-name">María González</div>
                <div className="user-role">Nutricionista</div>
              </div>
              <div className="role-badge">Nutricionista</div>
            </div>
            <div className="recent-item">
              <div className="user-info">
                <div className="user-name">Luis Rodríguez</div>
                <div className="user-role">Padre</div>
              </div>
              <div className="role-badge">Padre</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen del sistema */}
      <div className="summary-card">
        <h3 className="summary-title">Resumen del Sistema</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-number">1,247</div>
            <div className="summary-label">Usuarios activos en el sistema</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">15</div>
            <div className="summary-label">Instituciones educativas registradas</div>
          </div>
          <div className="summary-item">
            <div className="summary-number">342</div>
            <div className="summary-label">Reportes nutricionales disponibles</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}