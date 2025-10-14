from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, date
from enum import Enum

# Enums para roles y estados
class RolUsuario(str, Enum):
    ADMINISTRADOR = "administrador"
    RECTOR = "rector"
    NUTRICIONISTA = "nutricionista"
    PADRE = "padre"
    ESTUDIANTE = "estudiante"

class EstadoMenu(str, Enum):
    BORRADOR = "borrador"
    PUBLICADO = "publicado"
    APROBADO = "aprobado"
    RECHAZADO = "rechazado"

class TipoMenu(str, Enum):
    DESAYUNO = "desayuno"
    ALMUERZO = "almuerzo"
    MERIENDA = "merienda"
    CENA = "cena"

class TipoComida(str, Enum):
    DESAYUNO = "desayuno"
    ALMUERZO = "almuerzo"
    MERIENDA = "merienda"
    CENA = "cena"

class CategoriaComida(str, Enum):
    PROTEINA = "proteina"
    VEGETAL = "vegetal"
    FRUTA = "fruta"
    CEREAL = "cereal"
    LACTEO = "lacteo"
    BEBIDA = "bebida"

class TipoFeedback(str, Enum):
    SABOR = "sabor"
    PRESENTACION = "presentacion"
    CANTIDAD = "cantidad"
    TEMPERATURA = "temperatura"
    VARIEDAD = "variedad"
    GENERAL = "general"

# Modelos base
class UsuarioBase(BaseModel):
    nombre: str
    email: EmailStr
    rol: RolUsuario
    escuela_id: Optional[str] = None
    activo: bool = True

class UsuarioCreate(UsuarioBase):
    password: str

class UsuarioUpdate(BaseModel):
    nombre: Optional[str] = None
    email: Optional[EmailStr] = None
    escuela_id: Optional[str] = None
    activo: Optional[bool] = None

class Usuario(UsuarioBase):
    id: str
    fecha_creacion: datetime
    ultimo_acceso: Optional[datetime] = None
    creado_por: Optional[str] = None

class UsuarioLogin(BaseModel):
    email: EmailStr
    password: str

class UsuarioResponse(BaseModel):
    id: str
    nombre: str
    email: str
    rol: RolUsuario
    escuela_id: Optional[str] = None
    activo: bool
    fecha_creacion: datetime
    ultimo_acceso: Optional[datetime] = None

# Modelo de Escuela
class EscuelaBase(BaseModel):
    nombre: str
    direccion: str
    telefono: str
    email: EmailStr
    codigo_establecimiento: str
    director: str
    director_email: EmailStr
    capacidad_estudiantes: int
    niveles_educativos: List[str]

class EscuelaCreate(EscuelaBase):
    pass

class EscuelaUpdate(BaseModel):
    nombre: Optional[str] = None
    direccion: Optional[str] = None
    telefono: Optional[str] = None
    email: Optional[EmailStr] = None
    director: Optional[str] = None
    director_email: Optional[EmailStr] = None
    capacidad_estudiantes: Optional[int] = None
    niveles_educativos: Optional[List[str]] = None

class Escuela(EscuelaBase):
    id: str
    fecha_creacion: datetime
    activa: bool = True

# Modelo de Estudiante (extiende Usuario)
class EstudianteBase(BaseModel):
    curso: str
    grado: str
    fecha_nacimiento: date
    alergias: Optional[List[str]] = []
    restricciones_dieteticas: Optional[List[str]] = []
    padre_id: Optional[int] = None

class EstudianteCreate(UsuarioCreate, EstudianteBase):
    pass

class EstudianteUpdate(BaseModel):
    nombre: Optional[str] = None
    curso: Optional[str] = None
    grado: Optional[str] = None
    alergias: Optional[List[str]] = None
    restricciones_dieteticas: Optional[List[str]] = None
    padre_id: Optional[int] = None

class Estudiante(Usuario, EstudianteBase):
    pass

# Modelo de Comida
class ComidaBase(BaseModel):
    nombre: str
    descripcion: str
    categoria: CategoriaComida
    calorias_por_porcion: float
    proteinas: float
    carbohidratos: float
    grasas: float
    fibra: float
    sodio: float
    azucares: float
    ingredientes: List[str]
    alergenos: List[str]
    es_vegetariano: bool = False
    es_vegano: bool = False
    es_sin_gluten: bool = False

class ComidaCreate(ComidaBase):
    pass

class ComidaUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    categoria: Optional[CategoriaComida] = None
    calorias_por_porcion: Optional[float] = None
    proteinas: Optional[float] = None
    carbohidratos: Optional[float] = None
    grasas: Optional[float] = None
    fibra: Optional[float] = None
    sodio: Optional[float] = None
    azucares: Optional[float] = None
    ingredientes: Optional[List[str]] = None
    alergenos: Optional[List[str]] = None
    es_vegetariano: Optional[bool] = None
    es_vegano: Optional[bool] = None
    es_sin_gluten: Optional[bool] = None

class Comida(ComidaBase):
    id: int
    fecha_creacion: datetime
    creado_por: int
    activa: bool = True

# Modelo de Menú
class MenuBase(BaseModel):
    nombre: str
    descripcion: str
    fecha_inicio: date
    fecha_fin: date
    tipo_comida: TipoComida
    escuela_id: int
    dirigido_a: List[str]  # grados/cursos

class MenuCreate(MenuBase):
    comidas_ids: List[int]

class MenuUpdate(BaseModel):
    nombre: Optional[str] = None
    descripcion: Optional[str] = None
    fecha_inicio: Optional[date] = None
    fecha_fin: Optional[date] = None
    tipo_comida: Optional[TipoComida] = None
    dirigido_a: Optional[List[str]] = None
    estado: Optional[EstadoMenu] = None

class Menu(MenuBase):
    id: int
    estado: EstadoMenu = EstadoMenu.BORRADOR
    fecha_creacion: datetime
    creado_por: int
    aprobado_por: Optional[int] = None
    fecha_aprobacion: Optional[datetime] = None
    comidas: List[Comida] = []

# Modelo de Feedback
class FeedbackBase(BaseModel):
    menu_id: int
    estudiante_id: int
    tipo: TipoFeedback
    calificacion: int  # 1-5
    comentario: Optional[str] = None

class FeedbackCreate(FeedbackBase):
    pass

class FeedbackUpdate(BaseModel):
    calificacion: Optional[int] = None
    comentario: Optional[str] = None

class Feedback(FeedbackBase):
    id: int
    fecha_creacion: datetime
    respondido: bool = False
    respuesta: Optional[str] = None
    respondido_por: Optional[int] = None
    fecha_respuesta: Optional[datetime] = None

# Modelo de Consumo (para tracking)
class ConsumoBase(BaseModel):
    estudiante_id: int
    menu_id: int
    fecha_consumo: date
    cantidad_consumida: float  # porcentaje 0-1
    comidas_consumidas: List[int]  # IDs de comidas

class ConsumoCreate(ConsumoBase):
    pass

class Consumo(ConsumoBase):
    id: int
    fecha_registro: datetime

# Modelos de respuesta
class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UsuarioResponse
    expires_in: int

class MessageResponse(BaseModel):
    message: str
    success: bool = True

class DashboardStats(BaseModel):
    total_usuarios: int
    total_escuelas: int
    total_estudiantes: int
    total_menus: int
    menus_activos: int
    feedback_pendiente: int

class NutritionAnalysis(BaseModel):
    menu_id: int
    total_calorias: float
    total_proteinas: float
    total_carbohidratos: float
    total_grasas: float
    total_fibra: float
    total_sodio: float
    recomendaciones: List[str]
    alertas: List[str]

# Modelos de reporte
class ReporteConsumo(BaseModel):
    fecha_inicio: date
    fecha_fin: date
    escuela_id: int
    estadisticas: dict
    menus_mas_consumidos: List[dict]
    menus_menos_consumidos: List[dict]

class ReporteFeedback(BaseModel):
    fecha_inicio: date
    fecha_fin: date
    escuela_id: int
    promedio_calificacion: float
    total_feedback: int
    feedback_por_categoria: dict
    comentarios_destacados: List[str]

# Modelos de respuesta adicionales
class EscuelaResponse(BaseModel):
    id: str
    nombre: str
    direccion: str
    telefono: Optional[str] = None
    email: Optional[str] = None
    activa: bool
    fecha_creacion: datetime

    class Config:
        from_attributes = True

class MenuResponse(BaseModel):
    id: str
    escuela_id: str
    fecha: date
    tipo: TipoMenu
    nombre: str
    descripcion: Optional[str] = None
    activo: bool
    creado_por: str
    fecha_creacion: datetime

    class Config:
        from_attributes = True

class ComidaResponse(BaseModel):
    id: str
    nombre: str
    categoria: CategoriaComida
    descripcion: Optional[str] = None
    calorias: int
    proteinas: float
    grasas: float
    carbohidratos: float
    fibra: float
    sodio: float
    azucar: float
    ingredientes: List[str] = []
    alergenos: List[str] = []
    activa: bool
    fecha_creacion: datetime

    class Config:
        from_attributes = True

class FeedbackResponse(BaseModel):
    id: str
    menu_id: str
    usuario_id: str
    calificacion: int
    comentario: Optional[str] = None
    fecha: date
    usuario_nombre: str
    menu_nombre: str
    menu_fecha: Optional[date] = None
    menu_tipo: Optional[TipoMenu] = None

    class Config:
        from_attributes = True

class FeedbackEstadisticas(BaseModel):
    menu_id: str
    total_feedback: int
    promedio_calificacion: float
    distribucion_calificaciones: dict
    calificacion_mas_comun: int
    comentarios_recientes: List[str]