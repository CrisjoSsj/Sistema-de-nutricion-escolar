import { Link } from "react-router-dom";
import PublicNavbar from "../../components/common/PublicNavbar.jsx";
import Footer from "../../components/common/Footer.jsx";

export default function Home() {
  return (
    <div className="page-container">
      <PublicNavbar />
      <main className="main-content">
      {/* Banner principal del sistema */}
      <section className="banner-principal">
        <div className="banner-contenido">
          <h1 className="titulo-sistema">Sistema de Nutrición Escolar</h1>
          <p className="descripcion-sistema">Gestión integral de alimentación para instituciones educativas</p>
          <p className="eslogan-sistema">¡Nutrición saludable para el futuro de nuestros estudiantes!</p>
        </div>
      </section>

      {/* Información importante del día */}
      <section className="seccion-informacion-importante">
        <div className="contenedor-informacion">
          <h2 className="titulo-informacion">Estado del Sistema</h2>
          
          <div className="grilla-informacion">
            {/* Estado actual */}
            <div className="tarjeta-info estado-sistema">
              <div className="icono-estado activo"></div>
              <h3 className="titulo-tarjeta">Sistema Activo</h3>
              <p className="detalle-info">Servicios disponibles</p>
              <p className="disponibilidad">Todos los módulos operativos</p>
            </div>

            {/* Menú del día */}
            <div className="tarjeta-info menu-dia">
              <div className="icono-menu"></div>
              <h3 className="titulo-tarjeta">Menú de Hoy</h3>
              <p className="detalle-info">Almuerzo nutritivo disponible</p>
              <p className="menu-disponible">Consulta el menú completo</p>
            </div>

            {/* Estudiantes registrados */}
            <div className="tarjeta-info estudiantes-activos">
              <div className="icono-estudiantes"></div>
              <h3 className="titulo-tarjeta">Estudiantes Activos</h3>
              <p className="detalle-info">1,247 estudiantes registrados</p>
              <p className="nota-estudiantes">En el sistema actual</p>
            </div>

            {/* Instituciones */}
            <div className="tarjeta-info instituciones">
              <div className="icono-instituciones"></div>
              <h3 className="titulo-tarjeta">Instituciones</h3>
              <p className="detalle-info">15 escuelas conectadas</p>
              <p className="estado-instituciones">Todas activas y monitoreadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Acceso por roles */}
      <section className="seccion-acceso-rapido">
        <div className="contenedor-acceso">
          <h2 className="titulo-acceso">Acceso al Sistema</h2>
          <div className="grilla-servicios">
            
            <Link to="/login" className="tarjeta-servicio admin">
              <div className="icono-servicio admin"></div>
              <h3 className="titulo-servicio">Administrador</h3>
              <p className="descripcion-servicio">Gestión completa del sistema y reportes generales</p>
            </Link>

            <Link to="/login" className="tarjeta-servicio nutricionista">
              <div className="icono-servicio nutricionista"></div>
              <h3 className="titulo-servicio">Nutricionista</h3>
              <p className="descripcion-servicio">Planificación de menús y supervisión nutricional</p>
            </Link>

            <Link to="/login" className="tarjeta-servicio padre">
              <div className="icono-servicio padre"></div>
              <h3 className="titulo-servicio">Padre/Tutor</h3>
              <p className="descripcion-servicio">Seguimiento de la alimentación de sus hijos</p>
            </Link>

            <Link to="/login" className="tarjeta-servicio estudiante">
              <div className="icono-servicio estudiante"></div>
              <h3 className="titulo-servicio">Estudiante</h3>
              <p className="descripcion-servicio">Consulta de menús y feedback sobre comidas</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios del sistema */}
      <section className="seccion-beneficios">
        <div className="contenedor-beneficios">
          <h2 className="titulo-beneficios">Beneficios del Sistema</h2>
          <div className="grilla-beneficios">
            <div className="tarjeta-beneficio">
              <div className="icono-beneficio nutricion"></div>
              <h3 className="nombre-beneficio">Nutrición Balanceada</h3>
              <p className="descripcion-beneficio">Menús diseñados por especialistas en nutrición infantil</p>
            </div>
            
            <div className="tarjeta-beneficio">
              <div className="icono-beneficio seguimiento"></div>
              <h3 className="nombre-beneficio">Seguimiento Personalizado</h3>
              <p className="descripcion-beneficio">Control individual del consumo de cada estudiante</p>
            </div>
            
            <div className="tarjeta-beneficio">
              <div className="icono-beneficio reportes"></div>
              <h3 className="nombre-beneficio">Reportes Detallados</h3>
              <p className="descripcion-beneficio">Análisis completo de hábitos alimenticios y preferencias</p>
            </div>
          </div>
        </div>
      </section>

      {/* Información adicional */}
      <section className="seccion-informacion">
        <div className="contenedor-info-adicional">
          <div className="info-importante">
            <div className="icono-info"></div>
            <div className="contenido-info">
              <h3 className="titulo-info">¡Importante!</h3>
              <p className="mensaje-info">
                Para acceder al sistema, cada usuario debe utilizar sus credenciales 
                proporcionadas por la institución educativa correspondiente.
              </p>
            </div>
          </div>
          
          <div className="info-ayuda">
            <div className="icono-info"></div>
            <div className="contenido-info">
              <h3 className="titulo-info">¿Necesitas ayuda?</h3>
              <p className="mensaje-info">
                Contacta al administrador del sistema de tu institución para 
                obtener soporte técnico o resolver dudas sobre el uso del sistema.
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
