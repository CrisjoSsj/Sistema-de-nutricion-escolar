from datetime import datetime, date, timedelta
from typing import Dict, Optional
from models import *
import hashlib
import uuid

class Database:
    def __init__(self):
        self.usuarios: Dict[str, Usuario] = {}
        self.escuelas: Dict[str, Escuela] = {}
        self.comidas: Dict[str, Comida] = {}
        self.menus: Dict[str, Menu] = {}
        self.feedback: Dict[str, Feedback] = {}
        
        # Inicializar con datos de ejemplo
        self._initialize_data()
    
    def initialize_sample_data(self):
        """Método público para inicializar datos de ejemplo"""
        self._initialize_data()
        return True
    
    def _hash_password(self, password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()
    
    def get_current_timestamp(self):
        """Retorna el timestamp actual"""
        return datetime.now().isoformat()
    
    def _initialize_data(self):
        # Limpiar datos existentes
        self.usuarios.clear()
        self.escuelas.clear()
        self.comidas.clear()
        self.menus.clear()
        self.feedback.clear()
        
        # Crear escuelas
        escuelas_data = [
            {
                "id": "escuela-001",
                "nombre": "Escuela Primaria Umiña",
                "direccion": "Av. Principal 123, Umiña",
                "telefono": "+56912345678",
                "email": "contacto@umina.edu.cl",
                "codigo_establecimiento": "001",
                "director": "Carlos Mendoza",
                "director_email": "director@umina.edu.cl",
                "capacidad_estudiantes": 500,
                "niveles_educativos": ["1° Básico", "2° Básico", "3° Básico"],
                "activa": True,
                "fecha_creacion": datetime.now()
            },
            {
                "id": "escuela-002",
                "nombre": "Colegio Central",
                "direccion": "Calle Central 456, Centro",
                "telefono": "+56987654321",
                "email": "info@colegiocentral.cl",
                "codigo_establecimiento": "002",
                "director": "María González",
                "director_email": "director@colegiocentral.cl",
                "capacidad_estudiantes": 800,
                "niveles_educativos": ["1° Básico", "2° Básico", "3° Básico"],
                "activa": True,
                "fecha_creacion": datetime.now()
            }
        ]
        
        # Crear las escuelas
        for escuela_data in escuelas_data:
            escuela = Escuela(**escuela_data)
            self.escuelas[escuela.id] = escuela
        
        # Crear usuarios
        usuarios_data = [
            {
                "id": "admin-001",
                "nombre": "Administrador Sistema",
                "email": "admin@sistema.cl",
                "password_hash": self._hash_password("admin123"),
                "rol": RolUsuario.ADMIN,
                "escuela_id": None,
                "activo": True,
                "fecha_creacion": datetime.now(),
                "ultimo_acceso": datetime.now()
            },
            {
                "id": "rector-001",
                "nombre": "Carlos Mendoza",
                "email": "rector1@sistema.cl",
                "password_hash": self._hash_password("rector123"),
                "rol": RolUsuario.RECTOR,
                "escuela_id": "escuela-001",
                "activo": True,
                "fecha_creacion": datetime.now(),
                "ultimo_acceso": datetime.now()
            },
            {
                "id": "nutri-001",
                "nombre": "Ana López",
                "email": "nutricionista1@sistema.cl",
                "password_hash": self._hash_password("nutri123"),
                "rol": RolUsuario.NUTRICIONISTA,
                "escuela_id": "escuela-001",
                "activo": True,
                "fecha_creacion": datetime.now(),
                "ultimo_acceso": datetime.now()
            },
            {
                "id": "padre-001",
                "nombre": "Juan Pérez",
                "email": "juan.perez@email.com",
                "password_hash": self._hash_password("padre123"),
                "rol": RolUsuario.PADRE,
                "escuela_id": "escuela-001",
                "activo": True,
                "fecha_creacion": datetime.now(),
                "ultimo_acceso": datetime.now()
            },
            {
                "id": "estudiante-001",
                "nombre": "Ana Martínez",
                "email": "ana.martinez@email.com",
                "password_hash": self._hash_password("estudiante123"),
                "rol": RolUsuario.ESTUDIANTE,
                "escuela_id": "escuela-001",
                "activo": True,
                "fecha_creacion": datetime.now(),
                "ultimo_acceso": datetime.now()
            }
        ]
        
        # Crear los usuarios
        for usuario_data in usuarios_data:
            usuario = Usuario(**usuario_data)
            self.usuarios[usuario.id] = usuario
        
        # Crear comidas de ejemplo
        comidas_data = [
            {
                "id": "comida-001",
                "nombre": "Pollo al Horno",
                "categoria": CategoriaComida.PROTEINA,
                "descripcion": "Pechuga de pollo horneada con verduras",
                "calorias": 350,
                "proteinas": 35.0,
                "grasas": 12.0,
                "carbohidratos": 25.0,
                "fibra": 4.0,
                "sodio": 450.0,
                "azucar": 6.0,
                "ingredientes": ["pollo", "verduras"],
                "alergenos": [],
                "activa": True,
                "fecha_creacion": datetime.now()
            },
            {
                "id": "comida-002",
                "nombre": "Ensalada Verde",
                "categoria": CategoriaComida.VEGETAL,
                "descripcion": "Ensalada fresca con lechuga y tomate",
                "calorias": 120,
                "proteinas": 3.0,
                "grasas": 2.0,
                "carbohidratos": 8.0,
                "fibra": 5.0,
                "sodio": 200.0,
                "azucar": 4.0,
                "ingredientes": ["lechuga", "tomate"],
                "alergenos": [],
                "activa": True,
                "fecha_creacion": datetime.now()
            }
        ]
        
        # Crear las comidas
        for comida_data in comidas_data:
            comida = Comida(**comida_data)
            self.comidas[comida.id] = comida
        
        # Crear menú de ejemplo
        menu_data = {
            "id": "menu-001",
            "escuela_id": "escuela-001",
            "fecha": date.today(),
            "tipo": TipoMenu.ALMUERZO,
            "nombre": "Almuerzo Saludable",
            "descripcion": "Almuerzo equilibrado y nutritivo",
            "activo": True,
            "creado_por": "nutri-001",
            "fecha_creacion": datetime.now()
        }
        
        menu = Menu(**menu_data)
        self.menus[menu.id] = menu
        
        # Crear feedback de ejemplo
        feedback_data = {
            "id": "feedback-001",
            "menu_id": "menu-001",
            "usuario_id": "padre-001",
            "calificacion": 5,
            "comentario": "Excelente menú, muy nutritivo",
            "fecha": date.today()
        }
        
        feedback = Feedback(**feedback_data)
        self.feedback[feedback.id] = feedback
    
    # Métodos CRUD para Usuarios
    def create_usuario(self, usuario_data):
        """Crea un nuevo usuario"""
        nuevo_id = str(uuid.uuid4())
        nuevo_usuario = Usuario(
            id=nuevo_id,
            nombre=usuario_data.nombre,
            email=usuario_data.email,
            password_hash=self._hash_password("password123"),
            rol=usuario_data.rol,
            escuela_id=usuario_data.escuela_id,
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        )
        self.usuarios[nuevo_id] = nuevo_usuario
        return nuevo_usuario
    
    def update_usuario(self, usuario_id, usuario_data):
        """Actualiza un usuario existente"""
        if usuario_id not in self.usuarios:
            return None
        
        usuario = self.usuarios[usuario_id]
        if usuario_data.nombre:
            usuario.nombre = usuario_data.nombre
        if usuario_data.email:
            usuario.email = usuario_data.email
        if usuario_data.rol:
            usuario.rol = usuario_data.rol
        if usuario_data.escuela_id:
            usuario.escuela_id = usuario_data.escuela_id
        if usuario_data.activo is not None:
            usuario.activo = usuario_data.activo
        
        return usuario
    
    # Métodos CRUD para Escuelas
    def create_escuela(self, escuela_data):
        """Crea una nueva escuela"""
        nuevo_id = str(uuid.uuid4())
        nueva_escuela = Escuela(
            id=nuevo_id,
            nombre=escuela_data.nombre,
            direccion=escuela_data.direccion,
            telefono=escuela_data.telefono,
            email=escuela_data.email,
            codigo_establecimiento=f"ESC{len(self.escuelas) + 1:03d}",
            director=escuela_data.nombre,
            director_email=escuela_data.email,
            capacidad_estudiantes=500,
            niveles_educativos=["1° Básico", "2° Básico", "3° Básico"],
            activa=True,
            fecha_creacion=datetime.now()
        )
        self.escuelas[nuevo_id] = nueva_escuela
        return nueva_escuela
    
    def update_escuela(self, escuela_id, escuela_data):
        """Actualiza una escuela existente"""
        if escuela_id not in self.escuelas:
            return None
        
        escuela = self.escuelas[escuela_id]
        if escuela_data.nombre:
            escuela.nombre = escuela_data.nombre
        if escuela_data.direccion:
            escuela.direccion = escuela_data.direccion
        if escuela_data.telefono:
            escuela.telefono = escuela_data.telefono
        if escuela_data.email:
            escuela.email = escuela_data.email
        
        return escuela
    
    # Métodos CRUD para Comidas
    def create_comida(self, comida_data):
        """Crea una nueva comida"""
        nuevo_id = str(uuid.uuid4())
        nueva_comida = Comida(
            id=nuevo_id,
            nombre=comida_data.nombre,
            categoria=comida_data.categoria,
            descripcion=comida_data.descripcion,
            calorias=comida_data.calorias,
            proteinas=comida_data.proteinas,
            grasas=comida_data.grasas,
            carbohidratos=comida_data.carbohidratos,
            fibra=comida_data.fibra,
            sodio=comida_data.sodio,  
            azucar=comida_data.azucar,
            ingredientes=comida_data.ingredientes,
            alergenos=comida_data.alergenos,
            activa=True,
            fecha_creacion=datetime.now()
        )
        self.comidas[nuevo_id] = nueva_comida
        return nueva_comida
    
    def update_comida(self, comida_id, comida_data):
        """Actualiza una comida existente"""
        if comida_id not in self.comidas:
            return None
        
        comida = self.comidas[comida_id]
        if comida_data.nombre:
            comida.nombre = comida_data.nombre
        if comida_data.categoria:
            comida.categoria = comida_data.categoria
        if comida_data.descripcion:
            comida.descripcion = comida_data.descripcion
        if comida_data.calorias:
            comida.calorias = comida_data.calorias
        if comida_data.proteinas:
            comida.proteinas = comida_data.proteinas
        if comida_data.grasas:
            comida.grasas = comida_data.grasas
        if comida_data.carbohidratos:
            comida.carbohidratos = comida_data.carbohidratos
        
        return comida
    
    # Métodos CRUD para Menús
    def create_menu(self, menu_data, creado_por):
        """Crea un nuevo menú"""
        nuevo_id = str(uuid.uuid4())
        nuevo_menu = Menu(
            id=nuevo_id,
            escuela_id=menu_data.escuela_id,
            fecha=menu_data.fecha,
            tipo=menu_data.tipo,
            nombre=menu_data.nombre,
            descripcion=menu_data.descripcion,
            activo=True,
            creado_por=creado_por,
            fecha_creacion=datetime.now()
        )
        self.menus[nuevo_id] = nuevo_menu
        return nuevo_menu
    
    def update_menu(self, menu_id, menu_data):
        """Actualiza un menú existente"""
        if menu_id not in self.menus:
            return None
        
        menu = self.menus[menu_id]
        if menu_data.nombre:
            menu.nombre = menu_data.nombre
        if menu_data.descripcion:
            menu.descripcion = menu_data.descripcion
        if menu_data.fecha:
            menu.fecha = menu_data.fecha
        if menu_data.tipo:
            menu.tipo = menu_data.tipo
        
        return menu
    
    # Métodos CRUD para Feedback
    def create_feedback(self, feedback_data, usuario_id):
        """Crea un nuevo feedback"""
        nuevo_id = str(uuid.uuid4())
        nuevo_feedback = Feedback(
            id=nuevo_id,
            menu_id=feedback_data.menu_id,
            usuario_id=usuario_id,
            calificacion=feedback_data.calificacion,
            comentario=feedback_data.comentario,
            fecha=date.today()
        )
        self.feedback[nuevo_id] = nuevo_feedback
        return nuevo_feedback
    
    def update_feedback(self, feedback_id, feedback_data):
        """Actualiza un feedback existente"""
        if feedback_id not in self.feedback:
            return None
        
        feedback = self.feedback[feedback_id]
        if feedback_data.calificacion:
            feedback.calificacion = feedback_data.calificacion
        if feedback_data.comentario:
            feedback.comentario = feedback_data.comentario
        
        return feedback

# Instancia global de la base de datos
db = Database()