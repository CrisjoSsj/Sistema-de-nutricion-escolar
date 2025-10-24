"""
Sistema de Base de Datos con Fallback Automático
- Intenta conectar a Supabase (producción)
- Si no hay internet, usa base de datos local en memoria
- Los datos de prueba están disponibles siempre sin internet
"""

import os
from typing import Dict, Optional, List
from datetime import datetime, date
import hashlib
import uuid

# Intentar importar Supabase
try:
    from supabase import create_client, Client
    SUPABASE_AVAILABLE = True
except ImportError:
    SUPABASE_AVAILABLE = False
    print("⚠️  Supabase no disponible, usando modo local")

class SmartDatabase:
    """Base de datos inteligente que usa Supabase o modo local según disponibilidad"""
    
    def __init__(self):
        self.mode = "cloud"  # cloud o local
        self.supabase_client = None
        
        # Base de datos local en memoria (fallback)
        self.usuarios: Dict[str, dict] = {}
        self.escuelas: Dict[str, dict] = {}
        self.comidas: Dict[str, dict] = {}
        self.menus: Dict[str, dict] = {}
        self.feedback: Dict[str, dict] = {}
        self.estudiantes: Dict[str, dict] = {}
        
        # Intentar conectar a Supabase
        self._try_connect_supabase()
        
        # Si no hay conexión, inicializar datos locales
        if self.mode == "local":
            self._initialize_local_data()
    
    def _try_connect_supabase(self):
        """Intentar conectar a Supabase"""
        if not SUPABASE_AVAILABLE:
            print("📦 Modo LOCAL: Supabase no instalado")
            self.mode = "local"
            return
        
        supabase_url = os.getenv("SUPABASE_URL", "")
        supabase_key = os.getenv("SUPABASE_KEY", "")
        
        if not supabase_url or not supabase_key:
            print("📦 Modo LOCAL: Variables de Supabase no configuradas")
            self.mode = "local"
            return
        
        try:
            # Intentar crear cliente
            self.supabase_client = create_client(supabase_url, supabase_key)
            
            # Probar conexión con timeout corto
            import socket
            socket.setdefaulttimeout(2)
            
            # Hacer una consulta simple para verificar
            self.supabase_client.table('usuarios').select('id').limit(1).execute()
            
            print("☁️  Modo CLOUD: Conectado a Supabase")
            self.mode = "cloud"
            
        except Exception as e:
            print(f"📦 Modo LOCAL: Sin conexión a Supabase ({str(e)[:50]}...)")
            self.mode = "local"
            self.supabase_client = None
    
    def _hash_password(self, password: str) -> str:
        """Hashear contraseña"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def _initialize_local_data(self):
        """Crear datos de prueba locales"""
        print("🔧 Inicializando datos locales de prueba...")
        
        # Escuelas
        self.escuelas = {
            "escuela-001": {
                "id": "escuela-001",
                "nombre": "Escuela Primaria Umiña",
                "direccion": "Av. Principal 123, Umiña",
                "telefono": "+56912345678",
                "email": "contacto@umina.edu.cl",
                "codigo_establecimiento": "ESC001",
                "director": "Carlos Mendoza",
                "director_email": "director@umina.edu.cl",
                "capacidad_estudiantes": 500,
                "niveles_educativos": ["1° Básico", "2° Básico", "3° Básico"],
                "activa": True,
                "fecha_creacion": datetime.now().isoformat()
            },
            "escuela-002": {
                "id": "escuela-002",
                "nombre": "Colegio Central",
                "direccion": "Calle Central 456",
                "telefono": "+56987654321",
                "email": "info@central.cl",
                "codigo_establecimiento": "ESC002",
                "director": "María González",
                "director_email": "maria@central.cl",
                "capacidad_estudiantes": 800,
                "niveles_educativos": ["1° Básico", "2° Básico"],
                "activa": True,
                "fecha_creacion": datetime.now().isoformat()
            }
        }
        
        # Usuarios
        self.usuarios = {
            "admin-001": {
                "id": "admin-001",
                "nombre": "Administrador Sistema",
                "email": "admin@sistema.cl",
                "password_hash": self._hash_password("admin123"),
                "rol": "admin",
                "escuela_id": None,
                "activo": True,
                "fecha_creacion": datetime.now().isoformat(),
                "ultimo_acceso": None
            },
            "rector-001": {
                "id": "rector-001",
                "nombre": "Carlos Mendoza",
                "email": "rector1@sistema.cl",
                "password_hash": self._hash_password("rector123"),
                "rol": "rector",
                "escuela_id": "escuela-001",
                "activo": True,
                "fecha_creacion": datetime.now().isoformat(),
                "ultimo_acceso": None
            },
            "nutri-001": {
                "id": "nutri-001",
                "nombre": "Ana López",
                "email": "nutricionista1@sistema.cl",
                "password_hash": self._hash_password("nutri123"),
                "rol": "nutricionista",
                "escuela_id": "escuela-001",
                "activo": True,
                "fecha_creacion": datetime.now().isoformat(),
                "ultimo_acceso": None
            },
            "padre-001": {
                "id": "padre-001",
                "nombre": "Juan Pérez",
                "email": "juan.perez@email.com",
                "password_hash": self._hash_password("padre123"),
                "rol": "padre",
                "escuela_id": "escuela-001",
                "activo": True,
                "fecha_creacion": datetime.now().isoformat(),
                "ultimo_acceso": None
            },
            "estudiante-001": {
                "id": "estudiante-001",
                "nombre": "Ana Martínez",
                "email": "ana.martinez@email.com",
                "password_hash": self._hash_password("estudiante123"),
                "rol": "estudiante",
                "escuela_id": "escuela-001",
                "activo": True,
                "fecha_creacion": datetime.now().isoformat(),
                "ultimo_acceso": None
            },
            "analista-001": {
                "id": "analista-001",
                "nombre": "Roberto Silva",
                "email": "analista@sistema.cl",
                "password_hash": self._hash_password("analista123"),
                "rol": "analista",
                "escuela_id": None,
                "activo": True,
                "fecha_creacion": datetime.now().isoformat(),
                "ultimo_acceso": None
            }
        }
        
        # Estudiantes
        self.estudiantes = {
            "estudiante-001": {
                "id": "estudiante-001",
                "curso": "3° Básico A",
                "grado": "3° Básico",
                "fecha_nacimiento": "2015-05-15",
                "alergias": ["maní", "mariscos"],
                "restricciones_dieteticas": ["sin lactosa"],
                "padre_id": "padre-001"
            }
        }
        
        # Comidas
        self.comidas = {
            "comida-001": {
                "id": "comida-001",
                "nombre": "Pollo al Horno",
                "categoria": "proteina",
                "descripcion": "Pechuga de pollo horneada con verduras",
                "calorias": 350,
                "proteinas": 35.0,
                "grasas": 12.0,
                "carbohidratos": 25.0,
                "fibra": 4.0,
                "sodio": 450.0,
                "azucar": 6.0,
                "ingredientes": ["pollo", "zanahoria", "cebolla"],
                "alergenos": [],
                "activa": True,
                "fecha_creacion": datetime.now().isoformat(),
                "creado_por": "nutri-001"
            },
            "comida-002": {
                "id": "comida-002",
                "nombre": "Ensalada Verde",
                "categoria": "vegetal",
                "descripcion": "Ensalada fresca",
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
                "fecha_creacion": datetime.now().isoformat(),
                "creado_por": "nutri-001"
            },
            "comida-003": {
                "id": "comida-003",
                "nombre": "Arroz Integral",
                "categoria": "cereal",
                "descripcion": "Arroz cocido",
                "calorias": 200,
                "proteinas": 5.0,
                "grasas": 1.5,
                "carbohidratos": 42.0,
                "fibra": 3.5,
                "sodio": 10.0,
                "azucar": 0.5,
                "ingredientes": ["arroz"],
                "alergenos": [],
                "activa": True,
                "fecha_creacion": datetime.now().isoformat(),
                "creado_por": "nutri-001"
            }
        }
        
        # Menús
        self.menus = {
            "menu-001": {
                "id": "menu-001",
                "escuela_id": "escuela-001",
                "fecha": date.today().isoformat(),
                "tipo": "almuerzo",
                "nombre": "Almuerzo Saludable",
                "descripcion": "Almuerzo equilibrado",
                "activo": True,
                "creado_por": "nutri-001",
                "fecha_creacion": datetime.now().isoformat()
            }
        }
        
        # Feedback
        self.feedback = {
            "feedback-001": {
                "id": "feedback-001",
                "menu_id": "menu-001",
                "usuario_id": "padre-001",
                "calificacion": 5,
                "comentario": "Excelente menú",
                "fecha": date.today().isoformat()
            }
        }
        
        print("✅ Datos locales cargados")
    
    # ========== MÉTODOS DE USUARIOS ==========
    
    def get_usuario_by_email(self, email: str) -> Optional[dict]:
        """Obtener usuario por email"""
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('usuarios')\
                    .select('*')\
                    .eq('email', email)\
                    .execute()
                return response.data[0] if response.data else None
            except:
                self.mode = "local"  # Cambiar a local si falla
        
        # Modo local
        for usuario in self.usuarios.values():
            if usuario['email'] == email:
                return usuario
        return None
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verificar contraseña"""
        return self._hash_password(plain_password) == hashed_password
    
    def get_all_usuarios(self) -> List[dict]:
        """Obtener todos los usuarios"""
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('usuarios').select('*').execute()
                return response.data
            except:
                self.mode = "local"
        
        return list(self.usuarios.values())
    
    def create_usuario(self, usuario_data: dict) -> dict:
        """Crear nuevo usuario"""
        nuevo_id = str(uuid.uuid4())
        usuario_data['id'] = nuevo_id
        usuario_data['fecha_creacion'] = datetime.now().isoformat()
        usuario_data['password_hash'] = self._hash_password(usuario_data.get('password', 'default123'))
        
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('usuarios').insert(usuario_data).execute()
                return response.data[0]
            except:
                self.mode = "local"
        
        # Modo local
        self.usuarios[nuevo_id] = usuario_data
        return usuario_data
    
    # ========== MÉTODOS DE ESCUELAS ==========
    
    def get_all_escuelas(self) -> List[dict]:
        """Obtener todas las escuelas"""
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('escuelas').select('*').execute()
                return response.data
            except:
                self.mode = "local"
        
        return list(self.escuelas.values())
    
    def get_escuela(self, escuela_id: str) -> Optional[dict]:
        """Obtener escuela por ID"""
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('escuelas')\
                    .select('*')\
                    .eq('id', escuela_id)\
                    .execute()
                return response.data[0] if response.data else None
            except:
                self.mode = "local"
        
        return self.escuelas.get(escuela_id)
    
    # ========== MÉTODOS DE COMIDAS ==========
    
    def get_all_comidas(self) -> List[dict]:
        """Obtener todas las comidas"""
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('comidas').select('*').execute()
                return response.data
            except:
                self.mode = "local"
        
        return list(self.comidas.values())
    
    # ========== MÉTODOS DE MENÚS ==========
    
    def get_all_menus(self) -> List[dict]:
        """Obtener todos los menús"""
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('menus').select('*').execute()
                return response.data
            except:
                self.mode = "local"
        
        return list(self.menus.values())
    
    def get_menus_by_escuela(self, escuela_id: str) -> List[dict]:
        """Obtener menús de una escuela"""
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('menus')\
                    .select('*')\
                    .eq('escuela_id', escuela_id)\
                    .execute()
                return response.data
            except:
                self.mode = "local"
        
        return [m for m in self.menus.values() if m['escuela_id'] == escuela_id]
    
    # ========== MÉTODOS DE FEEDBACK ==========
    
    def get_all_feedback(self) -> List[dict]:
        """Obtener todo el feedback"""
        if self.mode == "cloud" and self.supabase_client:
            try:
                response = self.supabase_client.table('feedback').select('*').execute()
                return response.data
            except:
                self.mode = "local"
        
        return list(self.feedback.values())
    
    # ========== UTILIDADES ==========
    
    def get_mode(self) -> str:
        """Obtener modo actual"""
        return self.mode
    
    def is_online(self) -> bool:
        """Verificar si está en modo online"""
        return self.mode == "cloud"


# Instancia global
db = SmartDatabase()

# Funciones helper para usar en la API
def get_database():
    """Obtener instancia de base de datos"""
    return db

if __name__ == "__main__":
    print("="*60)
    print("SISTEMA DE BASE DE DATOS INTELIGENTE")
    print("="*60)
    print(f"\n🔍 Modo actual: {db.get_mode().upper()}")
    print(f"📊 Usuarios cargados: {len(db.get_all_usuarios())}")
    print(f"🏫 Escuelas cargadas: {len(db.get_all_escuelas())}")
    print(f"🍽️  Comidas cargadas: {len(db.get_all_comidas())}")
    print(f"📋 Menús cargados: {len(db.get_all_menus())}")
    print("\n✅ Base de datos lista para usar")
    print("\n💡 Si no hay internet, usa datos locales automáticamente")
