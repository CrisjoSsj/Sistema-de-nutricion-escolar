import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';
import { useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function PrivateNavbar() {
  const { user } = useAuth();
  const { schoolInfo, companyInfo, getSchoolLogo, isLoading } = useSchool();
  const location = useLocation();

  // Configurar navegación según el rol del usuario
  const getNavItems = () => {
    const dashboardPath = getDashboardPath();

    switch (user?.rol) {
      case 'admin':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/admin/users', label: ' Usuarios', icon: '👥' },
          { path: '/admin/schools', label: ' Escuelas', icon: '🏫' },
          { path: '/admin/menus', label: ' Menús', icon: '🍽️' },
          { path: '/admin/reports', label: ' Reportes', icon: '📈' }
        ];
      case 'nutricionista':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/nutritionist/menus', label: ' Menús', icon: '🍽️' },
          { path: '/nutritionist/foods', label: ' Alimentos', icon: '🥗' },
          { path: '/nutritionist/nutrition', label: ' Análisis', icon: '📊' },
          { path: '/nutritionist/feedback', label: ' Feedback', icon: '💬' }
        ];
      case 'padre':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/parent/menus', label: ' Menús', icon: '📋' },
          { path: '/parent/nutrition', label: ' Nutrición', icon: '🍎' },
          { path: '/parent/feedback', label: ' Comentarios', icon: '💬' }
        ];
      case 'estudiante':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/student/menus', label: ' Menús', icon: '🍽️' },
          { path: '/student/favorites', label: ' Favoritos', icon: '⭐' },
          { path: '/student/nutrition', label: ' Nutrición', icon: '📊' },
          { path: '/student/feedback', label: ' Calificar', icon: '💬' }
        ];
      case 'rector':
        return [
          { path: dashboardPath, label: ' Dashboard', icon: '📊' },
          { path: '/rector/school-profile', label: ' Perfil', icon: '🏫' },
          { path: '/rector/students', label: ' Estudiantes', icon: '👨‍🎓' },
          { path: '/rector/parents', label: ' Apoderados', icon: '👨‍👩‍👧‍👦' },
          { path: '/rector/reports', label: ' Reportes', icon: '📈' }
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

  // Determinar qué información mostrar en el navbar
  const getNavbarInfo = () => {
    if (isLoading) {
      return { name: 'Cargando...', logo: null };
    }
    
    // Para administradores, mostrar información corporativa
    if (user?.rol === 'admin') {
      return {
        name: companyInfo?.name || 'NutriEscolar Corp',
        logo: null,
        isCompany: true
      };
    }
    
    // Para otros usuarios, mostrar información de la escuela
    return {
      name: schoolInfo?.name || 'Cargando escuela...',
      logo: schoolInfo?.logo,
      isCompany: false
    };
  };

  const navbarInfo = getNavbarInfo();

  return (
    <nav className="private-navbar">
      <div className="navbar-container">
        {/* Logo y nombre de la escuela/empresa */}
        <div className="navbar-brand">
          <div className="brand-link">
            <div className="school-brand-section">
              <div className="school-logo">
                {navbarInfo.logo && !navbarInfo.isCompany ? (
                  <img 
                    src={getSchoolLogo()} 
                    alt={`Logo ${navbarInfo.name}`}
                    className="school-logo-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="school-logo-fallback" style={{display: navbarInfo.logo && !navbarInfo.isCompany ? 'none' : 'flex'}}>
                  {navbarInfo.isCompany ? '🏢' : '🏫'}
                </div>
              </div>
              <div className="school-info">
                <span className="school-title">{navbarInfo.name}</span>
              </div>
            </div>
          </div>
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
          <ThemeToggle />
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