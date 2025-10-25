from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Date, ForeignKey, Enum, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime, date
import enum

Base = declarative_base()

# Enums
class RolUsuarioEnum(str, enum.Enum):
    ADMIN = "Administrador"
    RECTOR = "Rector"
    NUTRICIONISTA = "Nutricionista"
    PADRE = "Padre"
    ESTUDIANTE = "Estudiante"

class CategoriaComidaEnum(str, enum.Enum):
    PROTEINA = "Proteína"
    CARBOHIDRATO = "Carbohidrato"
    VEGETAL = "Vegetal"
    FRUTA = "Fruta"
    LACTEO = "Lácteo"
    BEBIDA = "Bebida"
    POSTRE = "Postre"

class TipoMenuEnum(str, enum.Enum):
    DESAYUNO = "Desayuno"
    ALMUERZO = "Almuerzo"
    ONCE = "Once"
    CENA = "Cena"

# Modelo de Escuela
class EscuelaDB(Base):
    __tablename__ = "escuelas"
    
    id = Column(String, primary_key=True)
    nombre = Column(String, nullable=False, index=True)
    direccion = Column(String, nullable=False)
    telefono = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    codigo_establecimiento = Column(String, nullable=False, unique=True, index=True)
    director = Column(String, nullable=False)
    director_email = Column(String, nullable=False)
    capacidad_estudiantes = Column(Integer, nullable=False)
    niveles_educativos = Column(JSON, default=list)  # Compatible con SQLite y PostgreSQL
    activa = Column(Boolean, default=True, index=True)
    fecha_creacion = Column(DateTime, default=datetime.now)
    
    # Relaciones
    usuarios = relationship("UsuarioDB", back_populates="escuela", cascade="all, delete-orphan")
    menus = relationship("MenuDB", back_populates="escuela", cascade="all, delete-orphan")

# Modelo de Usuario
class UsuarioDB(Base):
    __tablename__ = "usuarios"
    
    id = Column(String, primary_key=True)
    nombre = Column(String, nullable=False, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    rol = Column(Enum(RolUsuarioEnum), nullable=False, index=True)
    escuela_id = Column(String, ForeignKey("escuelas.id", ondelete="SET NULL"), nullable=True, index=True)
    activo = Column(Boolean, default=True, index=True)
    fecha_creacion = Column(DateTime, default=datetime.now)
    ultimo_acceso = Column(DateTime, default=datetime.now)
    
    # Relaciones
    escuela = relationship("EscuelaDB", back_populates="usuarios")
    menus_creados = relationship("MenuDB", foreign_keys="MenuDB.creado_por", back_populates="creador")
    feedback = relationship("FeedbackDB", back_populates="usuario", cascade="all, delete-orphan")

# Modelo de Comida
class ComidaDB(Base):
    __tablename__ = "comidas"
    
    id = Column(String, primary_key=True)
    nombre = Column(String, nullable=False, index=True)
    categoria = Column(Enum(CategoriaComidaEnum), nullable=False, index=True)
    descripcion = Column(Text, nullable=True)
    calorias = Column(Integer, nullable=False)
    proteinas = Column(Float, nullable=False)
    grasas = Column(Float, nullable=False)
    carbohidratos = Column(Float, nullable=False)
    fibra = Column(Float, default=0.0)
    sodio = Column(Float, default=0.0)
    azucar = Column(Float, default=0.0)
    ingredientes = Column(JSON, default=list)  # Compatible con SQLite y PostgreSQL
    alergenos = Column(JSON, default=list)  # Compatible con SQLite y PostgreSQL
    activa = Column(Boolean, default=True, index=True)
    fecha_creacion = Column(DateTime, default=datetime.now)
    
    # Relaciones
    menu_comidas = relationship("MenuComidaDB", back_populates="comida", cascade="all, delete-orphan")

# Modelo de Menú
class MenuDB(Base):
    __tablename__ = "menus"
    
    id = Column(String, primary_key=True)
    escuela_id = Column(String, ForeignKey("escuelas.id", ondelete="CASCADE"), nullable=False, index=True)
    fecha = Column(Date, nullable=False, index=True)
    tipo = Column(Enum(TipoMenuEnum), nullable=False, index=True)
    nombre = Column(String, nullable=False)
    descripcion = Column(Text, nullable=True)
    activo = Column(Boolean, default=True, index=True)
    creado_por = Column(String, ForeignKey("usuarios.id", ondelete="SET NULL"), nullable=True)
    fecha_creacion = Column(DateTime, default=datetime.now)
    
    # Relaciones
    escuela = relationship("EscuelaDB", back_populates="menus")
    creador = relationship("UsuarioDB", foreign_keys=[creado_por], back_populates="menus_creados")
    menu_comidas = relationship("MenuComidaDB", back_populates="menu", cascade="all, delete-orphan")
    feedback = relationship("FeedbackDB", back_populates="menu", cascade="all, delete-orphan")

# Modelo de MenuComida (tabla intermedia)
class MenuComidaDB(Base):
    __tablename__ = "menu_comidas"
    
    id = Column(String, primary_key=True)
    menu_id = Column(String, ForeignKey("menus.id", ondelete="CASCADE"), nullable=False, index=True)
    comida_id = Column(String, ForeignKey("comidas.id", ondelete="CASCADE"), nullable=False, index=True)
    porcion = Column(Float, default=1.0)
    orden = Column(Integer, default=0)
    
    # Relaciones
    menu = relationship("MenuDB", back_populates="menu_comidas")
    comida = relationship("ComidaDB", back_populates="menu_comidas")

# Modelo de Feedback
class FeedbackDB(Base):
    __tablename__ = "feedback"
    
    id = Column(String, primary_key=True)
    menu_id = Column(String, ForeignKey("menus.id", ondelete="CASCADE"), nullable=False, index=True)
    usuario_id = Column(String, ForeignKey("usuarios.id", ondelete="CASCADE"), nullable=False, index=True)
    calificacion = Column(Integer, nullable=False)
    comentario = Column(Text, nullable=True)
    fecha = Column(Date, nullable=False, index=True)
    
    # Relaciones
    menu = relationship("MenuDB", back_populates="feedback")
    usuario = relationship("UsuarioDB", back_populates="feedback")
