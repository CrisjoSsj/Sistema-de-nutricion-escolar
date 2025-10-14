import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';
import { useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown.jsx';

export default function PrivateNavbar() {
  const { user } = useAuth();
  const { currentSchool } = useSchool();
  const location = useLocation();

  // Configurar navegación según el rol del usuario
  const getNavItems = () => {
    const dashboardPath = getDashboardPath();

    switch (user?.rol) {
      case 'admin':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/admin/users', label: ' Gestión de Usuarios', icon: '👥' },
          { path: '/admin/schools', label: ' Gestión de Escuelas', icon: '🏫' },
          { path: '/admin/menus', label: ' Supervisar Menús', icon: '🍽️' },
          { path: '/admin/reports', label: ' Reportes Generales', icon: '📈' },
          { path: '/admin/settings', label: ' Configuración Sistema', icon: '⚙️' }
        ];
      case 'nutricionista':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/nutritionist/menus', label: ' Crear Menús', icon: '🍽️' },
          { path: '/nutritionist/foods', label: ' Base de Alimentos', icon: '🥗' },
          { path: '/nutritionist/nutrition', label: ' Análisis Nutricional', icon: '📊' },
          { path: '/nutritionist/feedback', label: ' Feedback Recibido', icon: '💬' },
          { path: '/nutritionist/reports', label: ' Mis Reportes', icon: '' }
        ];
      case 'padre':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/parent/menus', label: ' Menús Semanales', icon: '📋' },
          { path: '/parent/nutrition', label: ' Seguimiento Nutricional', icon: '🍎' },
          { path: '/parent/feedback', label: ' Enviar Comentarios', icon: '💬' },
          { path: '/parent/notifications', label: ' Notificaciones', icon: '🔔' }
        ];
      case 'estudiante':
        return [
          { path: dashboardPath, label: ' Mi Dashboard', icon: '📊' },
          { path: '/student/menus', label: ' Menús de Hoy', icon: '🍽️' },
          { path: '/student/favorites', label: ' Mis Favoritos', icon: '⭐' },
          { path: '/student/nutrition', label: ' Mi Nutrición', icon: '📊' },
          { path: '/student/feedback', label: ' Calificar Comida', icon: '💬' },
          { path: '/student/profile', label: ' Mi Perfil', icon: '👤' }
        ];
      case 'rector':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/rector/school-profile', label: ' Perfil de Escuela', icon: '🏫' },
          { path: '/rector/students', label: ' Gestión Estudiantes', icon: '👨‍🎓' },
          { path: '/rector/parents', label: ' Gestión Apoderados', icon: '👨‍👩‍👧‍👦' },
          { path: '/rector/staff', label: ' Gestión Personal', icon: '👥' },
          { path: '/rector/reports', label: ' Reportes Institucionales', icon: '📈' }
        ];
      default:
        return [
          { path: '/dashboard', label: ' Dashboard', icon: '📊' }
        ];
    }
  };

  const getDashboardPath = () => {
    switch (user?.rol) {
      case 'admin': return '/admin';
      case 'nutricionista': return '/nutritionist';
      case 'padre': return '/parent';
      case 'estudiante': return '/student';
      case 'rector': return '/rector';
      default: return '/dashboard';
    }
  };



  const navItems = getNavItems();

  return (
    <nav className="private-navbar">
      <div className="navbar-container">
        {/* Logo y nombre de la escuela */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <div className="school-brand-section">
              <div className="school-logo">
                {currentSchool?.logo ? (
                  <img 
                    src={currentSchool.logo} 
                    alt={`Logo ${currentSchool.name}`}
                    className="school-logo-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="school-logo-fallback" style={{display: currentSchool?.logo ? 'none' : 'flex'}}>
                  🏫
                </div>
              </div>
              <div className="school-info">
                <span className="school-title">{currentSchool?.name || 'Cargando escuela...'}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Enlaces de navegación */}
        <div className="navbar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Usuario y logout */}
        <div className="navbar-user">
          <UserDropdown />
        </div>

        {/* Menú móvil */}
        <div className="navbar-mobile">
          <button className="mobile-menu-btn">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}