import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useSchool } from "../../context/SchoolContext.jsx";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  const { schoolInfo, companyInfo, isLoading } = useSchool();

  // Mostrar loading si está cargando la información
  if (isLoading) {
    return (
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-loading">
            <div className="spinner"></div>
            <p>Cargando información...</p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          
          {/* Información de la escuela (si el usuario está logueado y no es admin) */}
          {user && user.rol !== 'admin' && schoolInfo && (
            <div className="footer-school">
              <div className="school-brand">
                {schoolInfo.logo ? (
                  <img 
                    src={schoolInfo.logo} 
                    alt={`Logo ${schoolInfo.name}`}
                    className="school-logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="school-logo-fallback" style={{ display: schoolInfo.logo ? 'none' : 'flex' }}>
                  🏫
                </div>
                <div className="school-info">
                  <h3 className="school-name">{schoolInfo.name}</h3>
                  <p className="school-motto">{schoolInfo.motto}</p>
                </div>
              </div>
              <div className="school-details">
                <p className="school-description">{schoolInfo.description}</p>
                <div className="school-stats">
                  <span className="stat">📚 {schoolInfo.level}</span>
                  <span className="stat">👥 {schoolInfo.studentsCount} estudiantes</span>
                  <span className="stat">📅 Desde {schoolInfo.foundedYear}</span>
                </div>
              </div>
            </div>
          )}

          {/* Información básica del sistema/empresa */}
          <div className="footer-info">
            <div className="footer-brand">
              <span className="brand-icon">🍎</span>
              <span className="brand-name">
                {user && user.rol === 'admin' ? companyInfo?.name : 'Sistema de Nutrición'}
              </span>
            </div>
            <p className="footer-description">
              {companyInfo?.description || 'Promoviendo una alimentación saludable en el entorno escolar'}
            </p>
            {companyInfo?.website && (
              <a href={`https://${companyInfo.website}`} className="company-website" target="_blank" rel="noopener noreferrer">
                🌐 {companyInfo.website}
              </a>
            )}
          </div>

          {/* Enlaces rápidos */}
          <div className="footer-links">
            <div className="links-group">
              <h4>Sistema</h4>
              <Link to="/about" className="footer-link">Acerca de</Link>
              <Link to="/contact" className="footer-link">Contacto</Link>
              <Link to="/help" className="footer-link">Ayuda</Link>
              {user && (
                <Link to="/dashboard" className="footer-link">Dashboard</Link>
              )}
            </div>
            <div className="links-group">
              <h4>Legal</h4>
              <Link to="/privacy" className="footer-link">Privacidad</Link>
              <Link to="/terms" className="footer-link">Términos</Link>
              <Link to="/cookies" className="footer-link">Cookies</Link>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="footer-contact">
            <h4>Contacto</h4>
            
            {/* Mostrar contacto de la escuela si no es admin */}
            {user && user.rol !== 'admin' && schoolInfo?.contact ? (
              <>
                <div className="contact-section">
                  <h5 className="contact-title">📍 {schoolInfo.name}</h5>
                  <p>👨‍� {schoolInfo.contact.director}</p>
                  <p>�📧 {schoolInfo.contact.email}</p>
                  <p>📞 {schoolInfo.contact.phone}</p>
                  <p>🏢 {schoolInfo.contact.address}</p>
                </div>
                <div className="contact-divider"></div>
              </>
            ) : null}
            
            {/* Contacto corporativo */}
            <div className="contact-section">
              <h5 className="contact-title">🏢 {companyInfo?.name || 'Sistema Central'}</h5>
              <p>📧 {companyInfo?.email || 'info@nutricionescolar.com'}</p>
              <p>📞 {companyInfo?.phone || '+57 300 123 4567'}</p>
              <p>📍 {companyInfo?.address || 'Bogotá, Colombia'}</p>
            </div>

            {/* Redes sociales */}
            {companyInfo?.socialMedia && (
              <div className="social-media">
                {companyInfo.socialMedia.facebook && (
                  <a href={`https://${companyInfo.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer">
                    📘 Facebook
                  </a>
                )}
                {companyInfo.socialMedia.twitter && (
                  <a href={`https://twitter.com/${companyInfo.socialMedia.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    🐦 Twitter
                  </a>
                )}
                {companyInfo.socialMedia.instagram && (
                  <a href={`https://instagram.com/${companyInfo.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    📸 Instagram
                  </a>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {currentYear} {companyInfo?.name || 'Sistema de Nutrición Escolar'}. Todos los derechos reservados.</p>
          {user && user.rol !== 'admin' && schoolInfo && (
            <p>🏫 Atendiendo a {schoolInfo.name} - {schoolInfo.level}</p>
          )}
          <p>Desarrollado con ❤️ para una alimentación saludable</p>
        </div>
      </div>
    </footer>
  );
}