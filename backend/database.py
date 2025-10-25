"""
Database class usando SQLAlchemy con SQLite
"""
from datetime import datetime, date
from typing import Dict, Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func
import hashlib
import uuid

from db_config import SessionLocal, get_db
from models_db import (
    EscuelaDB, UsuarioDB, ComidaDB, MenuDB, 
    MenuComidaDB, FeedbackDB,
    RolUsuarioEnum, CategoriaComidaEnum, TipoMenuEnum
)
from models import (
    Usuario, Escuela, Comida, Menu, Feedback,
    RolUsuario, CategoriaComida, TipoMenu
)


# Mapeo de roles entre SQLAlchemy Enum y Pydantic Enum
ROLE_MAP_DB_TO_PYDANTIC = {
    "Administrador": "admin",
    "Rector": "rector",
    "Nutricionista": "nutricionista",
    "Padre": "padre",
    "Estudiante": "estudiante"
}

ROLE_MAP_PYDANTIC_TO_DB = {
    "admin": RolUsuarioEnum.ADMIN,
    "rector": RolUsuarioEnum.RECTOR,
    "nutricionista": RolUsuarioEnum.NUTRICIONISTA,
    "padre": RolUsuarioEnum.PADRE,
    "estudiante": RolUsuarioEnum.ESTUDIANTE
}

# Mapeo de categorías
CATEGORIA_MAP_DB_TO_PYDANTIC = {
    "Proteína": "proteina",
    "Carbohidrato": "carbohidrato",
    "Vegetal": "vegetal",
    "Fruta": "fruta",
    "Lácteo": "lacteo",
    "Bebida": "bebida",
    "Postre": "postre",
    "Cereal": "cereal"
}

CATEGORIA_MAP_PYDANTIC_TO_DB = {
    "proteina": CategoriaComidaEnum.PROTEINA,
    "carbohidrato": CategoriaComidaEnum.CARBOHIDRATO,
    "vegetal": CategoriaComidaEnum.VEGETAL,
    "fruta": CategoriaComidaEnum.FRUTA,
    "lacteo": CategoriaComidaEnum.LACTEO,
    "bebida": CategoriaComidaEnum.BEBIDA,
    "postre": CategoriaComidaEnum.POSTRE,
    "cereal": CategoriaComidaEnum.CARBOHIDRATO
}

# Mapeo de tipos de menú
TIPO_MENU_MAP_DB_TO_PYDANTIC = {
    "Desayuno": "desayuno",
    "Almuerzo": "almuerzo",
    "Once": "merienda",
    "Cena": "cena"
}

TIPO_MENU_MAP_PYDANTIC_TO_DB = {
    "desayuno": TipoMenuEnum.DESAYUNO,
    "almuerzo": TipoMenuEnum.ALMUERZO,
    "merienda": TipoMenuEnum.ONCE,
    "cena": TipoMenuEnum.CENA
}


class Database:
    """Clase Database que usa SQLAlchemy con SQLite"""
    
    def __init__(self):
        pass
    
    def _get_db(self) -> Session:
        return SessionLocal()
    
    def initialize_sample_data(self):
        return True
    
    def _hash_password(self, password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()
    
    def get_current_timestamp(self):
        return datetime.now().isoformat()
    
    @property
    def usuarios(self) -> Dict[str, Usuario]:
        db = self._get_db()
        try:
            usuarios_db = db.query(UsuarioDB).all()
            return {
                u.id: Usuario(
                    id=u.id,
                    nombre=u.nombre,
                    email=u.email,
                    password_hash=u.password_hash,
                    rol=ROLE_MAP_DB_TO_PYDANTIC.get(u.rol.value, u.rol.value.lower()),
                    escuela_id=u.escuela_id,
                    activo=u.activo,
                    fecha_creacion=u.fecha_creacion.isoformat() if u.fecha_creacion else None,
                    ultimo_acceso=u.ultimo_acceso.isoformat() if u.ultimo_acceso else None
                )
                for u in usuarios_db
            }
        finally:
            db.close()
    
    def create_usuario(self, usuario_data):
        db = self._get_db()
        try:
            usuario_db = UsuarioDB(
                id=f"user-{str(uuid.uuid4())[:8]}",
                nombre=usuario_data.get("nombre"),
                email=usuario_data.get("email"),
                password_hash=self._hash_password(usuario_data.get("password")),
                rol=ROLE_MAP_PYDANTIC_TO_DB.get(usuario_data.get("rol"), RolUsuarioEnum.ESTUDIANTE),
                escuela_id=usuario_data.get("escuela_id"),
                activo=usuario_data.get("activo", True),
                fecha_creacion=datetime.now(),
                ultimo_acceso=datetime.now()
            )
            db.add(usuario_db)
            db.commit()
            db.refresh(usuario_db)
            
            return Usuario(
                id=usuario_db.id,
                nombre=usuario_db.nombre,
                email=usuario_db.email,
                password_hash=usuario_db.password_hash,
                rol=ROLE_MAP_DB_TO_PYDANTIC.get(usuario_db.rol.value, usuario_db.rol.value.lower()),
                escuela_id=usuario_db.escuela_id,
                activo=usuario_db.activo,
                fecha_creacion=usuario_db.fecha_creacion.isoformat(),
                ultimo_acceso=usuario_db.ultimo_acceso.isoformat() if usuario_db.ultimo_acceso else None
            )
        finally:
            db.close()
    
    def update_usuario(self, usuario_id, usuario_data):
        db = self._get_db()
        try:
            usuario_db = db.query(UsuarioDB).filter(UsuarioDB.id == usuario_id).first()
            if not usuario_db:
                return None
            
            if "nombre" in usuario_data:
                usuario_db.nombre = usuario_data["nombre"]
            if "email" in usuario_data:
                usuario_db.email = usuario_data["email"]
            if "password" in usuario_data:
                usuario_db.password_hash = self._hash_password(usuario_data["password"])
            if "rol" in usuario_data:
                usuario_db.rol = ROLE_MAP_PYDANTIC_TO_DB.get(usuario_data["rol"], RolUsuarioEnum.ESTUDIANTE)
            if "escuela_id" in usuario_data:
                usuario_db.escuela_id = usuario_data["escuela_id"]
            if "activo" in usuario_data:
                usuario_db.activo = usuario_data["activo"]
            
            db.commit()
            db.refresh(usuario_db)
            
            return Usuario(
                id=usuario_db.id,
                nombre=usuario_db.nombre,
                email=usuario_db.email,
                password_hash=usuario_db.password_hash,
                rol=ROLE_MAP_DB_TO_PYDANTIC.get(usuario_db.rol.value, usuario_db.rol.value.lower()),
                escuela_id=usuario_db.escuela_id,
                activo=usuario_db.activo,
                fecha_creacion=usuario_db.fecha_creacion.isoformat(),
                ultimo_acceso=usuario_db.ultimo_acceso.isoformat() if usuario_db.ultimo_acceso else None
            )
        finally:
            db.close()
    
    @property
    def escuelas(self) -> Dict[str, Escuela]:
        db = self._get_db()
        try:
            escuelas_db = db.query(EscuelaDB).all()
            return {
                e.id: Escuela(
                    id=e.id,
                    nombre=e.nombre,
                    direccion=e.direccion,
                    telefono=e.telefono,
                    email=e.email,
                    codigo_establecimiento=e.codigo_establecimiento,
                    director=e.director,
                    director_email=e.director_email,
                    capacidad_estudiantes=e.capacidad_estudiantes,
                    niveles_educativos=e.niveles_educativos or [],
                    activa=e.activa,
                    fecha_creacion=e.fecha_creacion.isoformat() if e.fecha_creacion else None
                )
                for e in escuelas_db
            }
        finally:
            db.close()
    
    def create_escuela(self, escuela_data):
        db = self._get_db()
        try:
            escuela_db = EscuelaDB(
                id=f"escuela-{str(uuid.uuid4())[:8]}",
                nombre=escuela_data.get("nombre"),
                direccion=escuela_data.get("direccion"),
                telefono=escuela_data.get("telefono"),
                email=escuela_data.get("email"),
                codigo_establecimiento=escuela_data.get("codigo_establecimiento"),
                director=escuela_data.get("director"),
                director_email=escuela_data.get("director_email"),
                capacidad_estudiantes=escuela_data.get("capacidad_estudiantes"),
                niveles_educativos=escuela_data.get("niveles_educativos", []),
                activa=escuela_data.get("activa", True),
                fecha_creacion=datetime.now()
            )
            db.add(escuela_db)
            db.commit()
            db.refresh(escuela_db)
            
            return Escuela(
                id=escuela_db.id,
                nombre=escuela_db.nombre,
                direccion=escuela_db.direccion,
                telefono=escuela_db.telefono,
                email=escuela_db.email,
                codigo_establecimiento=escuela_db.codigo_establecimiento,
                director=escuela_db.director,
                director_email=escuela_db.director_email,
                capacidad_estudiantes=escuela_db.capacidad_estudiantes,
                niveles_educativos=escuela_db.niveles_educativos or [],
                activa=escuela_db.activa,
                fecha_creacion=escuela_db.fecha_creacion.isoformat()
            )
        finally:
            db.close()
    
    def update_escuela(self, escuela_id, escuela_data):
        db = self._get_db()
        try:
            escuela_db = db.query(EscuelaDB).filter(EscuelaDB.id == escuela_id).first()
            if not escuela_db:
                return None
            
            for field in ["nombre", "direccion", "telefono", "email", "codigo_establecimiento",
                         "director", "director_email", "capacidad_estudiantes", "niveles_educativos", "activa"]:
                if field in escuela_data:
                    setattr(escuela_db, field, escuela_data[field])
            
            db.commit()
            db.refresh(escuela_db)
            
            return Escuela(
                id=escuela_db.id,
                nombre=escuela_db.nombre,
                direccion=escuela_db.direccion,
                telefono=escuela_db.telefono,
                email=escuela_db.email,
                codigo_establecimiento=escuela_db.codigo_establecimiento,
                director=escuela_db.director,
                director_email=escuela_db.director_email,
                capacidad_estudiantes=escuela_db.capacidad_estudiantes,
                niveles_educativos=escuela_db.niveles_educativos or [],
                activa=escuela_db.activa,
                fecha_creacion=escuela_db.fecha_creacion.isoformat()
            )
        finally:
            db.close()
    
    @property
    def comidas(self) -> Dict[str, Comida]:
        db = self._get_db()
        try:
            comidas_db = db.query(ComidaDB).all()
            return {
                c.id: Comida(
                    id=c.id,
                    nombre=c.nombre,
                    categoria=CATEGORIA_MAP_DB_TO_PYDANTIC.get(c.categoria.value, c.categoria.value.lower()),
                    descripcion=c.descripcion,
                    calorias=c.calorias,
                    proteinas=c.proteinas,
                    grasas=c.grasas,
                    carbohidratos=c.carbohidratos,
                    fibra=c.fibra,
                    sodio=c.sodio,
                    azucar=c.azucar,
                    ingredientes=c.ingredientes or [],
                    alergenos=c.alergenos or [],
                    activa=c.activa,
                    fecha_creacion=c.fecha_creacion.isoformat() if c.fecha_creacion else None
                )
                for c in comidas_db
            }
        finally:
            db.close()
    
    def create_comida(self, comida_data):
        db = self._get_db()
        try:
            # Map Pydantic categoria to DB enum
            categoria_input = CATEGORIA_MAP_PYDANTIC_TO_DB.get(
                comida_data.get("categoria"), 
                CategoriaComidaEnum.PROTEINA
            )
            
            comida_db = ComidaDB(
                id=f"comida-{str(uuid.uuid4())[:8]}",
                nombre=comida_data.get("nombre"),
                categoria=categoria_input,
                descripcion=comida_data.get("descripcion"),
                calorias=comida_data.get("calorias"),
                proteinas=comida_data.get("proteinas"),
                grasas=comida_data.get("grasas"),
                carbohidratos=comida_data.get("carbohidratos"),
                fibra=comida_data.get("fibra", 0.0),
                sodio=comida_data.get("sodio", 0.0),
                azucar=comida_data.get("azucar", 0.0),
                ingredientes=comida_data.get("ingredientes", []),
                alergenos=comida_data.get("alergenos", []),
                activa=comida_data.get("activa", True),
                fecha_creacion=datetime.now()
            )
            db.add(comida_db)
            db.commit()
            db.refresh(comida_db)
            
            return Comida(
                id=comida_db.id,
                nombre=comida_db.nombre,
                categoria=CATEGORIA_MAP_DB_TO_PYDANTIC.get(comida_db.categoria.value, comida_db.categoria.value.lower()),
                descripcion=comida_db.descripcion,
                calorias=comida_db.calorias,
                proteinas=comida_db.proteinas,
                grasas=comida_db.grasas,
                carbohidratos=comida_db.carbohidratos,
                fibra=comida_db.fibra,
                sodio=comida_db.sodio,
                azucar=comida_db.azucar,
                ingredientes=comida_db.ingredientes or [],
                alergenos=comida_db.alergenos or [],
                activa=comida_db.activa,
                fecha_creacion=comida_db.fecha_creacion.isoformat()
            )
        finally:
            db.close()
    
    def update_comida(self, comida_id, comida_data):
        db = self._get_db()
        try:
            comida_db = db.query(ComidaDB).filter(ComidaDB.id == comida_id).first()
            if not comida_db:
                return None
            
            for field in ["nombre", "descripcion", "calorias", "proteinas", "grasas", 
                         "carbohidratos", "fibra", "sodio", "azucar", "ingredientes", 
                         "alergenos", "activa"]:
                if field in comida_data:
                    setattr(comida_db, field, comida_data[field])
            
            if "categoria" in comida_data:
                comida_db.categoria = CATEGORIA_MAP_PYDANTIC_TO_DB.get(
                    comida_data["categoria"],
                    CategoriaComidaEnum.PROTEINA
                )
            
            db.commit()
            db.refresh(comida_db)
            
            return Comida(
                id=comida_db.id,
                nombre=comida_db.nombre,
                categoria=CATEGORIA_MAP_DB_TO_PYDANTIC.get(comida_db.categoria.value, comida_db.categoria.value.lower()),
                descripcion=comida_db.descripcion,
                calorias=comida_db.calorias,
                proteinas=comida_db.proteinas,
                grasas=comida_db.grasas,
                carbohidratos=comida_db.carbohidratos,
                fibra=comida_db.fibra,
                sodio=comida_db.sodio,
                azucar=comida_db.azucar,
                ingredientes=comida_db.ingredientes or [],
                alergenos=comida_db.alergenos or [],
                activa=comida_db.activa,
                fecha_creacion=comida_db.fecha_creacion.isoformat()
            )
        finally:
            db.close()
    
    @property
    def menus(self) -> Dict[str, Menu]:
        db = self._get_db()
        try:
            menus_db = db.query(MenuDB).all()
            result = {}
            
            for m in menus_db:
                menu_comidas = db.query(MenuComidaDB).filter(
                    MenuComidaDB.menu_id == m.id
                ).order_by(MenuComidaDB.orden).all()
                
                comidas_ids = [mc.comida_id for mc in menu_comidas]
                
                result[m.id] = Menu(
                    id=m.id,
                    escuela_id=m.escuela_id,
                    fecha=m.fecha.isoformat() if isinstance(m.fecha, date) else m.fecha,
                    tipo=TIPO_MENU_MAP_DB_TO_PYDANTIC.get(m.tipo.value, m.tipo.value.lower()),
                    nombre=m.nombre,
                    descripcion=m.descripcion,
                    comidas=comidas_ids,
                    activo=m.activo,
                    creado_por=m.creado_por,
                    fecha_creacion=m.fecha_creacion.isoformat() if m.fecha_creacion else None
                )
            
            return result
        finally:
            db.close()
    
    def create_menu(self, menu_data, creado_por):
        db = self._get_db()
        try:
            # Map Pydantic tipo to DB enum
            tipo_input = TIPO_MENU_MAP_PYDANTIC_TO_DB.get(
                menu_data.get("tipo"),
                TipoMenuEnum.ALMUERZO
            )
            
            menu_db = MenuDB(
                id=f"menu-{str(uuid.uuid4())[:8]}",
                escuela_id=menu_data.get("escuela_id"),
                fecha=datetime.strptime(menu_data.get("fecha"), "%Y-%m-%d").date() if isinstance(menu_data.get("fecha"), str) else menu_data.get("fecha"),
                tipo=tipo_input,
                nombre=menu_data.get("nombre"),
                descripcion=menu_data.get("descripcion", ""),
                activo=menu_data.get("activo", True),
                creado_por=creado_por,
                fecha_creacion=datetime.now()
            )
            db.add(menu_db)
            db.flush()
            
            comidas_ids = menu_data.get("comidas", [])
            for orden, comida_id in enumerate(comidas_ids, start=1):
                menu_comida = MenuComidaDB(
                    id=str(uuid.uuid4()),
                    menu_id=menu_db.id,
                    comida_id=comida_id,
                    porcion=1.0,
                    orden=orden
                )
                db.add(menu_comida)
            
            db.commit()
            db.refresh(menu_db)
            
            return Menu(
                id=menu_db.id,
                escuela_id=menu_db.escuela_id,
                fecha=menu_db.fecha.isoformat() if isinstance(menu_db.fecha, date) else menu_db.fecha,
                tipo=TIPO_MENU_MAP_DB_TO_PYDANTIC.get(menu_db.tipo.value, menu_db.tipo.value.lower()),
                nombre=menu_db.nombre,
                descripcion=menu_db.descripcion,
                comidas=comidas_ids,
                activo=menu_db.activo,
                creado_por=menu_db.creado_por,
                fecha_creacion=menu_db.fecha_creacion.isoformat()
            )
        except Exception as e:
            db.rollback()
            raise e
        finally:
            db.close()
    
    def update_menu(self, menu_id, menu_data):
        db = self._get_db()
        try:
            menu_db = db.query(MenuDB).filter(MenuDB.id == menu_id).first()
            if not menu_db:
                return None
            
            if "nombre" in menu_data:
                menu_db.nombre = menu_data["nombre"]
            if "descripcion" in menu_data:
                menu_db.descripcion = menu_data["descripcion"]
            if "fecha" in menu_data:
                menu_db.fecha = datetime.strptime(menu_data["fecha"], "%Y-%m-%d").date() if isinstance(menu_data["fecha"], str) else menu_data["fecha"]
            if "tipo" in menu_data:
                menu_db.tipo = TIPO_MENU_MAP_PYDANTIC_TO_DB.get(
                    menu_data["tipo"],
                    TipoMenuEnum.ALMUERZO
                )
            if "activo" in menu_data:
                menu_db.activo = menu_data["activo"]
            
            if "comidas" in menu_data:
                db.query(MenuComidaDB).filter(MenuComidaDB.menu_id == menu_id).delete()
                
                for orden, comida_id in enumerate(menu_data["comidas"], start=1):
                    menu_comida = MenuComidaDB(
                        id=str(uuid.uuid4()),
                        menu_id=menu_id,
                        comida_id=comida_id,
                        porcion=1.0,
                        orden=orden
                    )
                    db.add(menu_comida)
            
            db.commit()
            db.refresh(menu_db)
            
            menu_comidas = db.query(MenuComidaDB).filter(
                MenuComidaDB.menu_id == menu_id
            ).order_by(MenuComidaDB.orden).all()
            comidas_ids = [mc.comida_id for mc in menu_comidas]
            
            return Menu(
                id=menu_db.id,
                escuela_id=menu_db.escuela_id,
                fecha=menu_db.fecha.isoformat() if isinstance(menu_db.fecha, date) else menu_db.fecha,
                tipo=TIPO_MENU_MAP_DB_TO_PYDANTIC.get(menu_db.tipo.value, menu_db.tipo.value.lower()),
                nombre=menu_db.nombre,
                descripcion=menu_db.descripcion,
                comidas=comidas_ids,
                activo=menu_db.activo,
                creado_por=menu_db.creado_por,
                fecha_creacion=menu_db.fecha_creacion.isoformat()
            )
        except Exception as e:
            db.rollback()
            raise e
        finally:
            db.close()
    
    @property
    def feedback(self) -> Dict[str, Feedback]:
        db = self._get_db()
        try:
            feedbacks_db = db.query(FeedbackDB).all()
            return {
                f.id: Feedback(
                    id=f.id,
                    menu_id=f.menu_id,
                    usuario_id=f.usuario_id,
                    calificacion=f.calificacion,
                    comentario=f.comentario,
                    fecha=f.fecha.isoformat() if isinstance(f.fecha, date) else f.fecha
                )
                for f in feedbacks_db
            }
        finally:
            db.close()
    
    def create_feedback(self, feedback_data, usuario_id):
        db = self._get_db()
        try:
            feedback_db = FeedbackDB(
                id=f"feedback-{str(uuid.uuid4())[:8]}",
                menu_id=feedback_data.get("menu_id"),
                usuario_id=usuario_id,
                calificacion=feedback_data.get("calificacion"),
                comentario=feedback_data.get("comentario", ""),
                fecha=date.today()
            )
            db.add(feedback_db)
            db.commit()
            db.refresh(feedback_db)
            
            return Feedback(
                id=feedback_db.id,
                menu_id=feedback_db.menu_id,
                usuario_id=feedback_db.usuario_id,
                calificacion=feedback_db.calificacion,
                comentario=feedback_db.comentario,
                fecha=feedback_db.fecha.isoformat() if isinstance(feedback_db.fecha, date) else feedback_db.fecha
            )
        finally:
            db.close()
    
    def update_feedback(self, feedback_id, feedback_data):
        db = self._get_db()
        try:
            feedback_db = db.query(FeedbackDB).filter(FeedbackDB.id == feedback_id).first()
            if not feedback_db:
                return None
            
            if "calificacion" in feedback_data:
                feedback_db.calificacion = feedback_data["calificacion"]
            if "comentario" in feedback_data:
                feedback_db.comentario = feedback_data["comentario"]
            
            db.commit()
            db.refresh(feedback_db)
            
            return Feedback(
                id=feedback_db.id,
                menu_id=feedback_db.menu_id,
                usuario_id=feedback_db.usuario_id,
                calificacion=feedback_db.calificacion,
                comentario=feedback_db.comentario,
                fecha=feedback_db.fecha.isoformat() if isinstance(feedback_db.fecha, date) else feedback_db.fecha
            )
        finally:
            db.close()


# Instancia global de la base de datos
db = Database()
