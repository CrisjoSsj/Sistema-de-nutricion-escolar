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

      {/* Sobre Nosotros */}
      <section className="seccion-informacion-importante">
        <div className="contenedor-informacion">
          <h2 className="titulo-informacion">Sobre el Sistema</h2>
          
          <div className="grilla-informacion">
            {/* Quiénes Somos */}
            <div className="tarjeta-info estado-sistema">
              <div className="icono-estado activo"></div>
              <h3 className="titulo-tarjeta">Nuestra Misión</h3>
              <p className="detalle-info">Promover hábitos alimenticios saludables</p>
              <p className="disponibilidad">En todas las instituciones educativas</p>
            </div>

            {/* Cobertura */}
            <div className="tarjeta-info menu-dia">
              <div className="icono-menu"></div>
              <h3 className="titulo-tarjeta">Cobertura Nacional</h3>
              <p className="detalle-info">Servicio disponible en todo el país</p>
              <p className="menu-disponible">Para escuelas públicas y privadas</p>
            </div>

            {/* Tecnología */}
            <div className="tarjeta-info estudiantes-activos">
              <div className="icono-estudiantes"></div>
              <h3 className="titulo-tarjeta">Tecnología Avanzada</h3>
              <p className="detalle-info">Plataforma moderna y fácil de usar</p>
              <p className="nota-estudiantes">Accesible desde cualquier dispositivo</p>
            </div>

            {/* Soporte */}
            <div className="tarjeta-info instituciones">
              <div className="icono-instituciones"></div>
              <h3 className="titulo-tarjeta">Soporte 24/7</h3>
              <p className="detalle-info">Asistencia técnica permanente</p>
              <p className="estado-instituciones">Para todas las instituciones</p>
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
              <h3 className="titulo-servicio">Rector</h3>
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
          <h2 className="titulo-beneficios">¿Por Qué Elegirnos?</h2>
          <div className="grilla-beneficios">
            <div className="tarjeta-beneficio">
              <div className="icono-beneficio nutricion"></div>
              <h3 className="nombre-beneficio">Experiencia Comprobada</h3>
              <p className="descripcion-beneficio">Más de 10 años liderando la gestión nutricional escolar en Ecuador</p>
            </div>
            
            <div className="tarjeta-beneficio">
              <div className="icono-beneficio seguimiento"></div>
              <h3 className="nombre-beneficio">Equipo Especializado</h3>
              <p className="descripcion-beneficio">Nutricionistas certificados y tecnólogos expertos a su servicio</p>
            </div>
            
            <div className="tarjeta-beneficio">
              <div className="icono-beneficio reportes"></div>
              <h3 className="nombre-beneficio">Innovación Constante</h3>
              <p className="descripcion-beneficio">Actualizaciones continuas basadas en las últimas tendencias nutricionales</p>
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
              <h3 className="titulo-info">Compromiso con la Salud</h3>
              <p className="mensaje-info">
                Trabajamos en conjunto con el Ministerio de Educación y el Ministerio de Salud 
                para garantizar los más altos estándares nutricionales en la alimentación escolar.
              </p>
            </div>
          </div>
          
          <div className="info-ayuda">
            <div className="icono-info"></div>
            <div className="contenido-info">
              <h3 className="titulo-info">¿Interesado en Nuestros Servicios?</h3>
              <p className="mensaje-info">
                Si su institución educativa desea implementar nuestro sistema, 
                contáctenos para agendar una demostración personalizada y conocer nuestros planes.
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
