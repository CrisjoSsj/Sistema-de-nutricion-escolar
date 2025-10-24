"""
Base de datos local con SQLite para desarrollo sin internet
Este archivo reemplaza la base de datos en memoria con una persistente
"""

from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, DateTime, Date, JSON, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime, date, timedelta
import hashlib
import uuid
import os
from typing import Optional

# Configuración de la base de datos
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./nutrition_local.db")

# Crear engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==================== MODELOS ====================

class UsuarioDB(Base):
    __tablename__ = "usuarios"
    
    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    rol = Column(String, nullable=False)
    escuela_id = Column(String, ForeignKey("escuelas.id"), nullable=True)
    activo = Column(Boolean, default=True)
    fecha_creacion = Column(DateTime, default=datetime.now)
    ultimo_acceso = Column(DateTime, nullable=True)
    creado_por = Column(String, nullable=True)
    
    # Relaciones
    escuela = relationship("EscuelaDB", back_populates="usuarios", foreign_keys=[escuela_id])


class EscuelaDB(Base):
    __tablename__ = "escuelas"
    
    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    direccion = Column(String, nullable=False)
    telefono = Column(String)
    email = Column(String)
    codigo_establecimiento = Column(String, unique=True, nullable=False)
    director = Column(String, nullable=False)
    director_email = Column(String, nullable=False)
    nutricionista_id = Column(String, ForeignKey("usuarios.id"), nullable=True)
    capacidad_estudiantes = Column(Integer, nullable=False)
    niveles_educativos = Column(JSON)
    activa = Column(Boolean, default=True)
    fecha_creacion = Column(DateTime, default=datetime.now)
    
    # Relaciones
    usuarios = relationship("UsuarioDB", back_populates="escuela", foreign_keys=[UsuarioDB.escuela_id])
    menus = relationship("MenuDB", back_populates="escuela")
    reportes = relationship("ReporteDB", back_populates="escuela")


class EstudianteDB(Base):
    __tablename__ = "estudiantes"
    
    id = Column(String, ForeignKey("usuarios.id"), primary_key=True)
    curso = Column(String, nullable=False)
    grado = Column(String, nullable=False)
    fecha_nacimiento = Column(Date, nullable=False)
    genero = Column(String)
    alergias = Column(JSON)
    restricciones_dieteticas = Column(JSON)
    condiciones_medicas = Column(JSON)
    padre_id = Column(String, ForeignKey("usuarios.id"), nullable=True)
    fecha_actualizacion_medica = Column(DateTime)


class ComidaDB(Base):
    __tablename__ = "comidas"
    
    id = Column(String, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    categoria = Column(String, nullable=False)
    descripcion = Column(Text)
    calorias = Column(Integer, nullable=False)
    proteinas = Column(Float, nullable=False)
    grasas = Column(Float, nullable=False)
    carbohidratos = Column(Float, nullable=False)
    fibra = Column(Float, nullable=False)
    sodio = Column(Float, nullable=False)
    azucar = Column(Float, nullable=False)
    vitaminas = Column(JSON)
    minerales = Column(JSON)
    ingredientes = Column(JSON)
    alergenos = Column(JSON)
    es_vegetariano = Column(Boolean, default=False)
    es_vegano = Column(Boolean, default=False)
    es_sin_gluten = Column(Boolean, default=False)
    activa = Column(Boolean, default=True)
    nivel_aceptacion = Column(Float, default=0.0)
    fecha_creacion = Column(DateTime, default=datetime.now)
    creado_por = Column(String, ForeignKey("usuarios.id"))


class MenuDB(Base):
    __tablename__ = "menus"
    
    id = Column(String, primary_key=True, index=True)
    escuela_id = Column(String, ForeignKey("escuelas.id"), nullable=False)
    fecha = Column(Date, nullable=False)
    tipo = Column(String, nullable=False)
    nombre = Column(String, nullable=False)
    descripcion = Column(Text)
    estado = Column(String, default="borrador")
    activo = Column(Boolean, default=True)
    creado_por = Column(String, ForeignKey("usuarios.id"), nullable=False)
    fecha_creacion = Column(DateTime, default=datetime.now)
    aprobado_rector_por = Column(String, ForeignKey("usuarios.id"))
    fecha_aprobacion_rector = Column(DateTime)
    aprobado_admin_por = Column(String, ForeignKey("usuarios.id"))
    fecha_aprobacion_admin = Column(DateTime)
    observaciones = Column(Text)
    
    # Relaciones
    escuela = relationship("EscuelaDB", back_populates="menus")
    menu_comidas = relationship("MenuComidaDB", back_populates="menu")


class MenuComidaDB(Base):
    __tablename__ = "menu_comidas"
    
    id = Column(String, primary_key=True, index=True)
    menu_id = Column(String, ForeignKey("menus.id"), nullable=False)
    comida_id = Column(String, ForeignKey("comidas.id"), nullable=False)
    porcion = Column(Float, nullable=False)
    unidad_medida = Column(String, default="gramos")
    orden = Column(Integer, default=0)
    notas = Column(Text)
    
    # Relaciones
    menu = relationship("MenuDB", back_populates="menu_comidas")


class FeedbackDB(Base):
    __tablename__ = "feedback"
    
    id = Column(String, primary_key=True, index=True)
    menu_id = Column(String, ForeignKey("menus.id"), nullable=False)
    usuario_id = Column(String, ForeignKey("usuarios.id"), nullable=False)
    comida_id = Column(String, ForeignKey("comidas.id"), nullable=True)
    tipo = Column(String, nullable=False)
    calificacion = Column(Integer, nullable=False)
    comentario = Column(Text)
    reporta_malestar = Column(Boolean, default=False)
    sintomas = Column(JSON)
    reporta_error = Column(Boolean, default=False)
    descripcion_error = Column(Text)
    fecha = Column(DateTime, default=datetime.now)


class ConsumoDB(Base):
    __tablename__ = "consumo"
    
    id = Column(String, primary_key=True, index=True)
    estudiante_id = Column(String, ForeignKey("estudiantes.id"), nullable=False)
    menu_id = Column(String, ForeignKey("menus.id"), nullable=False)
    fecha_consumo = Column(Date, nullable=False)
    cantidad_consumida = Column(Float)
    porcentaje_consumido = Column(Float)
    comidas_consumidas = Column(JSON)
    comio = Column(Boolean, default=True)
    fecha_registro = Column(DateTime, default=datetime.now)
    registrado_por = Column(String, ForeignKey("usuarios.id"))
    confirmado_padre = Column(Boolean, default=False)


class ReporteDB(Base):
    __tablename__ = "reportes"
    
    id = Column(String, primary_key=True, index=True)
    tipo = Column(String, nullable=False)
    titulo = Column(String, nullable=False)
    descripcion = Column(Text)
    fecha_inicio = Column(Date, nullable=False)
    fecha_fin = Column(Date, nullable=False)
    escuela_id = Column(String, ForeignKey("escuelas.id"))
    edad_min = Column(Integer)
    edad_max = Column(Integer)
    genero = Column(String)
    grado = Column(String)
    generado_por = Column(String, ForeignKey("usuarios.id"), nullable=False)
    datos_json = Column(JSON)
    estadisticas = Column(JSON)
    graficos = Column(JSON)
    conclusiones = Column(Text)
    recomendaciones = Column(Text)
    formato_exportacion = Column(String)
    ruta_archivo = Column(String)
    fecha_generacion = Column(DateTime, default=datetime.now)
    
    # Relaciones
    escuela = relationship("EscuelaDB", back_populates="reportes")


class NotificacionDB(Base):
    __tablename__ = "notificaciones"
    
    id = Column(String, primary_key=True, index=True)
    usuario_id = Column(String, ForeignKey("usuarios.id"), nullable=False)
    menu_id = Column(String, ForeignKey("menus.id"))
    tipo = Column(String, nullable=False)
    titulo = Column(String, nullable=False)
    mensaje = Column(Text, nullable=False)
    datos_adicionales = Column(JSON)
    estado = Column(String, default="pendiente")
    fecha_creacion = Column(DateTime, default=datetime.now)
    fecha_lectura = Column(DateTime)


class RecomendacionDB(Base):
    __tablename__ = "recomendaciones"
    
    id = Column(String, primary_key=True, index=True)
    estudiante_id = Column(String, ForeignKey("estudiantes.id"), nullable=False)
    nutricionista_id = Column(String, ForeignKey("usuarios.id"), nullable=False)
    titulo = Column(String, nullable=False)
    descripcion = Column(Text, nullable=False)
    recomendaciones = Column(JSON)
    metas_nutricionales = Column(JSON)
    fecha_creacion = Column(DateTime, default=datetime.now)
    fecha_vigencia = Column(Date)
    activa = Column(Boolean, default=True)
    leida = Column(Boolean, default=False)


class EncuestaDB(Base):
    __tablename__ = "encuestas"
    
    id = Column(String, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    descripcion = Column(Text)
    preguntas = Column(JSON, nullable=False)
    escuela_id = Column(String, ForeignKey("escuelas.id"))
    tipo_menu = Column(String)
    activa = Column(Boolean, default=True)
    fecha_inicio = Column(Date, nullable=False)
    fecha_fin = Column(Date, nullable=False)
    creado_por = Column(String, ForeignKey("usuarios.id"), nullable=False)


class RespuestaEncuestaDB(Base):
    __tablename__ = "respuestas_encuesta"
    
    id = Column(String, primary_key=True, index=True)
    encuesta_id = Column(String, ForeignKey("encuestas.id"), nullable=False)
    estudiante_id = Column(String, ForeignKey("estudiantes.id"), nullable=False)
    respuestas = Column(JSON, nullable=False)
    fecha_respuesta = Column(DateTime, default=datetime.now)


# ==================== FUNCIONES DE UTILIDAD ====================

def hash_password(password: str) -> str:
    """Hashear contraseña con SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()


def generate_id() -> str:
    """Generar UUID único"""
    return str(uuid.uuid4())


def get_db():
    """Obtener sesión de base de datos"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==================== INICIALIZACIÓN ====================

def init_database():
    """Crear todas las tablas"""
    print("🔧 Creando tablas en la base de datos...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tablas creadas exitosamente")


def create_sample_data():
    """Crear datos de ejemplo para desarrollo"""
    print("📦 Creando datos de ejemplo...")
    
    db = SessionLocal()
    
    try:
        # Verificar si ya existen datos
        if db.query(UsuarioDB).count() > 0:
            print("⚠️  Ya existen datos en la base de datos. Saltando inicialización...")
            return
        
        # Crear escuelas
        escuela1 = EscuelaDB(
            id="escuela-001",
            nombre="Escuela Primaria Umiña",
            direccion="Av. Principal 123, Umiña",
            telefono="+56912345678",
            email="contacto@umina.edu.cl",
            codigo_establecimiento="ESC001",
            director="Carlos Mendoza",
            director_email="director@umina.edu.cl",
            capacidad_estudiantes=500,
            niveles_educativos=["1° Básico", "2° Básico", "3° Básico", "4° Básico"],
            activa=True
        )
        
        escuela2 = EscuelaDB(
            id="escuela-002",
            nombre="Colegio Central",
            direccion="Calle Central 456, Centro",
            telefono="+56987654321",
            email="info@colegiocentral.cl",
            codigo_establecimiento="ESC002",
            director="María González",
            director_email="director@colegiocentral.cl",
            capacidad_estudiantes=800,
            niveles_educativos=["1° Básico", "2° Básico", "3° Básico"],
            activa=True
        )
        
        db.add(escuela1)
        db.add(escuela2)
        
        # Crear usuarios
        usuarios = [
            UsuarioDB(
                id="admin-001",
                nombre="Administrador Sistema",
                email="admin@sistema.cl",
                password_hash=hash_password("admin123"),
                rol="admin",
                activo=True
            ),
            UsuarioDB(
                id="rector-001",
                nombre="Carlos Mendoza",
                email="rector1@sistema.cl",
                password_hash=hash_password("rector123"),
                rol="rector",
                escuela_id="escuela-001",
                activo=True
            ),
            UsuarioDB(
                id="nutri-001",
                nombre="Ana López",
                email="nutricionista1@sistema.cl",
                password_hash=hash_password("nutri123"),
                rol="nutricionista",
                escuela_id="escuela-001",
                activo=True
            ),
            UsuarioDB(
                id="padre-001",
                nombre="Juan Pérez",
                email="juan.perez@email.com",
                password_hash=hash_password("padre123"),
                rol="padre",
                escuela_id="escuela-001",
                activo=True
            ),
            UsuarioDB(
                id="estudiante-001",
                nombre="Ana Martínez",
                email="ana.martinez@email.com",
                password_hash=hash_password("estudiante123"),
                rol="estudiante",
                escuela_id="escuela-001",
                activo=True
            ),
            UsuarioDB(
                id="analista-001",
                nombre="Roberto Silva",
                email="analista@sistema.cl",
                password_hash=hash_password("analista123"),
                rol="analista",
                activo=True
            )
        ]
        
        for usuario in usuarios:
            db.add(usuario)
        
        # Crear estudiante
        estudiante = EstudianteDB(
            id="estudiante-001",
            curso="3° Básico A",
            grado="3° Básico",
            fecha_nacimiento=date(2015, 5, 15),
            genero="Femenino",
            alergias=["maní", "mariscos"],
            restricciones_dieteticas=["sin lactosa"],
            condiciones_medicas=[],
            padre_id="padre-001"
        )
        db.add(estudiante)
        
        # Crear comidas
        comidas = [
            ComidaDB(
                id="comida-001",
                nombre="Pollo al Horno",
                categoria="proteina",
                descripcion="Pechuga de pollo horneada con verduras",
                calorias=350,
                proteinas=35.0,
                grasas=12.0,
                carbohidratos=25.0,
                fibra=4.0,
                sodio=450.0,
                azucar=6.0,
                ingredientes=["pollo", "zanahoria", "cebolla"],
                alergenos=[],
                activa=True,
                creado_por="nutri-001"
            ),
            ComidaDB(
                id="comida-002",
                nombre="Ensalada Verde",
                categoria="vegetal",
                descripcion="Ensalada fresca con lechuga, tomate y pepino",
                calorias=120,
                proteinas=3.0,
                grasas=2.0,
                carbohidratos=8.0,
                fibra=5.0,
                sodio=200.0,
                azucar=4.0,
                ingredientes=["lechuga", "tomate", "pepino"],
                alergenos=[],
                es_vegetariano=True,
                es_vegano=True,
                activa=True,
                creado_por="nutri-001"
            ),
            ComidaDB(
                id="comida-003",
                nombre="Arroz Integral",
                categoria="cereal",
                descripcion="Arroz integral cocido al vapor",
                calorias=200,
                proteinas=5.0,
                grasas=1.5,
                carbohidratos=42.0,
                fibra=3.5,
                sodio=10.0,
                azucar=0.5,
                ingredientes=["arroz integral"],
                alergenos=[],
                es_vegetariano=True,
                es_vegano=True,
                es_sin_gluten=True,
                activa=True,
                creado_por="nutri-001"
            )
        ]
        
        for comida in comidas:
            db.add(comida)
        
        # Crear menú
        menu = MenuDB(
            id="menu-001",
            escuela_id="escuela-001",
            fecha=date.today(),
            tipo="almuerzo",
            nombre="Almuerzo Saludable",
            descripcion="Almuerzo equilibrado y nutritivo",
            estado="aprobado",
            activo=True,
            creado_por="nutri-001",
            aprobado_rector_por="rector-001",
            fecha_aprobacion_rector=datetime.now(),
            aprobado_admin_por="admin-001",
            fecha_aprobacion_admin=datetime.now()
        )
        db.add(menu)
        
        # Commit
        db.commit()
        
        print("✅ Datos de ejemplo creados exitosamente")
        print("\n🔑 Usuarios de prueba:")
        print("  - Admin: admin@sistema.cl / admin123")
        print("  - Rector: rector1@sistema.cl / rector123")
        print("  - Nutricionista: nutricionista1@sistema.cl / nutri123")
        print("  - Padre: juan.perez@email.com / padre123")
        print("  - Estudiante: ana.martinez@email.com / estudiante123")
        print("  - Analista: analista@sistema.cl / analista123")
        
    except Exception as e:
        print(f"❌ Error al crear datos de ejemplo: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    print("="*60)
    print("INICIALIZACIÓN DE BASE DE DATOS LOCAL")
    print("="*60)
    print(f"\n📂 Base de datos: {DATABASE_URL}")
    
    # Crear tablas
    init_database()
    
    # Crear datos de ejemplo
    create_sample_data()
    
    print("\n" + "="*60)
    print("✨ BASE DE DATOS LOCAL LISTA")
    print("="*60)
    print("\n🚀 Puedes iniciar el servidor con:")
    print("   cd backend")
    print("   uvicorn main:app --reload")
    print("\n🌐 API disponible en: http://localhost:8000/docs")
