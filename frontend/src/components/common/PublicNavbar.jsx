import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="public-navbar">
      <div className="navbar-container">
        {/* Logo y nombre del sistema */}
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <div className="brand-icon">🍎</div>
            <span className="brand-text">Nutrición Escolar</span>
          </Link>
        </div>

        {/* Enlaces de navegación */}
        <div className="navbar-nav">
          <Link to="/login" className="nav-link login-btn">
            🔑 Iniciar Sesión
          </Link>
        </div>

        {/* Menú móvil (hamburger) */}
        <div className="navbar-mobile">
          <button className="mobile-menu-btn">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}