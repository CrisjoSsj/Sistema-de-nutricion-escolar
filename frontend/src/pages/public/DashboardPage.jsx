import { useAuth } from '../../context/AuthContext.jsx';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-error">
        <div className="error-container">
          <h2 className="error-title">Error de autenticación</h2>
          <p className="error-message">No se pudo cargar la información del usuario</p>
        </div>
      </div>
    );
  }

  // Redirigir automáticamente según el rol del usuario
  switch (user.rol) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'nutricionista':
      return <Navigate to="/nutritionist" replace />;
    case 'rector':
      return <Navigate to="/rector" replace />;
    case 'padre':
      return <Navigate to="/parent" replace />;
    case 'estudiante':
      return <Navigate to="/student" replace />;
    default:
      // Si el rol no es reconocido, mostrar mensaje de error
      return (
        <div className="dashboard-error">
          <div className="error-container">
            <h2 className="error-title">Rol no reconocido</h2>
            <p className="error-message">El rol "{user.rol}" no está configurado en el sistema</p>
          </div>
        </div>
      );
  }

}