import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmLogout) {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        navigate('/login');
      }
    }
    setIsOpen(false);
  };

  const getRoleIcon = (rol) => {
    switch (rol) {
      case 'admin': return '👨‍💼';
      case 'nutricionista': return '👩‍⚕️';
      case 'rector': return '🎓';
      case 'padre': return '👨‍👩‍👧‍👦';
      case 'estudiante': return '👨‍🎓';
      default: return '👤';
    }
  };

  const getRoleLabel = (rol) => {
    switch (rol) {
      case 'admin': return 'Administrador';
      case 'nutricionista': return 'Nutricionista';
      case 'rector': return 'Rector';
      case 'padre': return 'Padre de Familia';
      case 'estudiante': return 'Estudiante';
      default: return 'Usuario';
    }
  };

  const getProfilePath = () => {
    switch (user?.rol) {
      case 'admin': return '/admin/profile';
      case 'nutricionista': return '/nutritionist/profile';
      case 'rector': return '/rector/school-profile';
      case 'padre': return '/parent/profile';
      case 'estudiante': return '/student/profile';
      default: return '/profile';
    }
  };

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <button 
        className="user-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        title="Menú de usuario"
      >
        <div className="user-avatar">
          {getRoleIcon(user?.rol)}
        </div>
        <div className="user-info-compact">
          <span className="user-name">{user?.nombre}</span>
          <span className="user-role">{getRoleLabel(user?.rol)}</span>
        </div>
        <div className="dropdown-arrow">
          {isOpen ? '▲' : '▼'}
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <div className="user-avatar-large">
              {getRoleIcon(user?.rol)}
            </div>
            <div className="user-details-full">
              <div className="user-name-full">{user?.nombre}</div>
              <div className="user-role-full">{getRoleLabel(user?.rol)}</div>
              <div className="user-id">ID: {user?.id}</div>
            </div>
          </div>
          
          <div className="dropdown-divider"></div>
          
          <div className="dropdown-actions">
            <button 
              className="dropdown-item"
              onClick={() => {
                navigate(getProfilePath());
                setIsOpen(false);
              }}
            >
              <span className="item-icon">👤</span>
              <span className="item-text">Mi Perfil</span>
            </button>
            
            <button 
              className="dropdown-item"
              onClick={() => {
                navigate('/settings');
                setIsOpen(false);
              }}
            >
              <span className="item-icon">⚙️</span>
              <span className="item-text">Configuración</span>
            </button>
            
            <div className="dropdown-divider"></div>
            
            <button 
              className="dropdown-item logout-item"
              onClick={handleLogout}
            >
              <span className="item-icon">🚪</span>
              <span className="item-text">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}