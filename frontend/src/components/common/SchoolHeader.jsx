import { useAuth } from '../../context/AuthContext.jsx';
import { useSchool } from '../../context/SchoolContext.jsx';

export default function SchoolHeader() {
  const { user } = useAuth();
  const { schoolInfo, companyInfo, getSchoolLogo, isLoading } = useSchool();

  // No mostrar nada si está cargando
  if (isLoading) {
    return (
      <div className="school-header loading">
        <div className="header-skeleton">
          <div className="logo-skeleton"></div>
          <div className="text-skeleton"></div>
        </div>
      </div>
    );
  }

  // Para administradores, mostrar información corporativa
  if (user?.rol === 'admin') {
    return (
      <div className="school-header corporate">
        <div className="header-content">
          <div className="header-logo">
            <div className="corporate-logo">🏢</div>
          </div>
          <div className="header-info">
            <h1 className="company-name">{companyInfo?.name || 'NutriEscolar Corp'}</h1>
            <p className="company-description">{companyInfo?.description}</p>
            <div className="admin-badge">
              <span className="badge-icon">👨‍💼</span>
              <span className="badge-text">Panel de Administración</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Para otros usuarios, mostrar información de la escuela
  if (user && schoolInfo) {
    return (
      <div className="school-header" style={{ 
        '--school-primary': schoolInfo.colors?.primary,
        '--school-secondary': schoolInfo.colors?.secondary,
        '--school-accent': schoolInfo.colors?.accent 
      }}>
        <div className="header-content">
          <div className="header-logo">
            {schoolInfo.logo ? (
              <img 
                src={getSchoolLogo()} 
                alt={`Logo ${schoolInfo.name}`}
                className="school-logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="school-logo-fallback" 
              style={{ display: schoolInfo.logo ? 'none' : 'flex' }}
            >
              🏫
            </div>
          </div>
          
          <div className="header-info">
            <h1 className="school-name">{schoolInfo.name}</h1>
            <p className="school-motto">{schoolInfo.motto}</p>
            
            <div className="school-meta">
              <span className="meta-item">
                <span className="meta-icon">📚</span>
                <span className="meta-text">{schoolInfo.level}</span>
              </span>
              <span className="meta-item">
                <span className="meta-icon">👥</span>
                <span className="meta-text">{schoolInfo.studentsCount} estudiantes</span>
              </span>
              <span className="meta-item">
                <span className="meta-icon">👨‍💼</span>
                <span className="meta-text">{schoolInfo.contact?.director}</span>
              </span>
            </div>
          </div>

          <div className="header-actions">
            <div className="user-role-badge">
              <span className="role-icon">
                {user.rol === 'nutricionista' ? '👩‍⚕️' : 
                 user.rol === 'padre' ? '👨‍👩‍👧‍👦' : 
                 user.rol === 'estudiante' ? '🎓' : '👤'}
              </span>
              <span className="role-text">
                {user.rol === 'nutricionista' ? 'Nutricionista' : 
                 user.rol === 'padre' ? 'Padre/Tutor' : 
                 user.rol === 'estudiante' ? 'Estudiante' : user.rol}
              </span>
            </div>
          </div>
        </div>

        {/* Barra de colores de la escuela */}
        <div className="school-color-bar">
          <div className="color-strip primary"></div>
          <div className="color-strip secondary"></div>
          <div className="color-strip accent"></div>
        </div>
      </div>
    );
  }

  // Para usuarios no logueados, mostrar header genérico
  return (
    <div className="school-header generic">
      <div className="header-content">
        <div className="header-logo">
          <div className="generic-logo">🍎</div>
        </div>
        <div className="header-info">
          <h1 className="system-name">Sistema de Nutrición Escolar</h1>
          <p className="system-description">Alimentación saludable para el futuro</p>
        </div>
      </div>
    </div>
  );
}