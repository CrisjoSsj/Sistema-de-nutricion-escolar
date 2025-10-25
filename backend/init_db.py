"""
Script para inicializar la base de datos con datos de ejemplo
"""
from datetime import datetime, date
import hashlib
import uuid
from sqlalchemy.orm import Session

from db_config import engine, init_db, SessionLocal
from models_db import (
    Base, EscuelaDB, UsuarioDB, ComidaDB, MenuDB, 
    MenuComidaDB, FeedbackDB,
    RolUsuarioEnum, CategoriaComidaEnum, TipoMenuEnum
)

def _hash_password(password: str) -> str:
    """Hashear contraseña usando SHA256"""
    return hashlib.sha256(password.encode()).hexdigest()

def create_sample_data(db: Session):
    """Crear datos de ejemplo en la base de datos"""
    
    print("📊 Creando datos de ejemplo...")
    
    # Crear escuelas
    print("🏫 Creando escuelas...")
    escuela1 = EscuelaDB(
        id="escuela-001",
        nombre="Escuela Primaria Umiña",
        direccion="Av. Principal 123, Umiña",
        telefono="+56912345678",
        email="contacto@umina.edu.cl",
        codigo_establecimiento="001",
        director="Carlos Mendoza",
        director_email="director@umina.edu.cl",
        capacidad_estudiantes=500,
        niveles_educativos=["1° Básico", "2° Básico", "3° Básico", "4° Básico"],
        activa=True,
        fecha_creacion=datetime.now()
    )
    
    escuela2 = EscuelaDB(
        id="escuela-002",
        nombre="Colegio Central",
        direccion="Calle Central 456, Centro",
        telefono="+56987654321",
        email="info@colegiocentral.cl",
        codigo_establecimiento="002",
        director="María González",
        director_email="director@colegiocentral.cl",
        capacidad_estudiantes=800,
        niveles_educativos=["1° Básico", "2° Básico", "3° Básico", "4° Básico", "5° Básico"],
        activa=True,
        fecha_creacion=datetime.now()
    )
    
    escuela3 = EscuelaDB(
        id="escuela-003",
        nombre="Instituto Técnico Nacional",
        direccion="Av. Educación 789, ITN",
        telefono="+56923456789",
        email="contacto@itn.cl",
        codigo_establecimiento="003",
        director="Roberto Silva",
        director_email="director@itn.cl",
        capacidad_estudiantes=1200,
        niveles_educativos=["1° Medio", "2° Medio", "3° Medio", "4° Medio"],
        activa=True,
        fecha_creacion=datetime.now()
    )
    
    db.add_all([escuela1, escuela2, escuela3])
    db.commit()
    print(f"   ✅ {3} escuelas creadas")
    
    # Crear usuarios
    print("👥 Creando usuarios...")
    usuarios = [
        # Administrador
        UsuarioDB(
            id="admin-001",
            nombre="Administrador Sistema",
            email="admin@sistema.cl",
            password_hash=_hash_password("admin123"),
            rol=RolUsuarioEnum.ADMIN,
            escuela_id=None,
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        ),
        # Rectores
        UsuarioDB(
            id="rector-001",
            nombre="Carlos Mendoza",
            email="rector1@sistema.cl",
            password_hash=_hash_password("rector123"),
            rol=RolUsuarioEnum.RECTOR,
            escuela_id="escuela-001",
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        ),
        UsuarioDB(
            id="rector-002",
            nombre="María González",
            email="rector2@sistema.cl",
            password_hash=_hash_password("rector123"),
            rol=RolUsuarioEnum.RECTOR,
            escuela_id="escuela-002",
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        ),
        UsuarioDB(
            id="rector-003",
            nombre="Roberto Silva",
            email="rector3@sistema.cl",
            password_hash=_hash_password("rector123"),
            rol=RolUsuarioEnum.RECTOR,
            escuela_id="escuela-003",
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        ),
        # Nutricionistas
        UsuarioDB(
            id="nutri-001",
            nombre="Ana López",
            email="nutricionista1@sistema.cl",
            password_hash=_hash_password("nutri123"),
            rol=RolUsuarioEnum.NUTRICIONISTA,
            escuela_id="escuela-001",
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        ),
        UsuarioDB(
            id="nutri-002",
            nombre="Pedro Ramírez",
            email="nutricionista2@sistema.cl",
            password_hash=_hash_password("nutri123"),
            rol=RolUsuarioEnum.NUTRICIONISTA,
            escuela_id="escuela-002",
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        ),
        UsuarioDB(
            id="nutri-003",
            nombre="Laura Fernández",
            email="nutricionista3@sistema.cl",
            password_hash=_hash_password("nutri123"),
            rol=RolUsuarioEnum.NUTRICIONISTA,
            escuela_id="escuela-003",
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        ),
        # Padres
        UsuarioDB(
            id="padre-001",
            nombre="Juan Pérez",
            email="juan.perez@email.com",
            password_hash=_hash_password("padre123"),
            rol=RolUsuarioEnum.PADRE,
            escuela_id="escuela-001",
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        ),
        # Estudiantes
        UsuarioDB(
            id="estudiante-001",
            nombre="Ana Martínez",
            email="ana.martinez@email.com",
            password_hash=_hash_password("estudiante123"),
            rol=RolUsuarioEnum.ESTUDIANTE,
            escuela_id="escuela-001",
            activo=True,
            fecha_creacion=datetime.now(),
            ultimo_acceso=datetime.now()
        )
    ]
    
    db.add_all(usuarios)
    db.commit()
    print(f"   ✅ {len(usuarios)} usuarios creados")
    
    # Crear comidas
    print("🍽️  Creando comidas...")
    comidas = [
        # Proteínas
        ComidaDB(
            id="comida-001",
            nombre="Pollo al Horno",
            categoria=CategoriaComidaEnum.PROTEINA,
            descripcion="Pechuga de pollo horneada con hierbas",
            calorias=350,
            proteinas=35.0,
            grasas=12.0,
            carbohidratos=25.0,
            fibra=4.0,
            sodio=450.0,
            azucar=6.0,
            ingredientes=["pollo", "ajo", "limón", "hierbas"],
            alergenos=[],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        ComidaDB(
            id="comida-002",
            nombre="Pescado al Vapor",
            categoria=CategoriaComidaEnum.PROTEINA,
            descripcion="Filete de pescado blanco al vapor",
            calorias=280,
            proteinas=30.0,
            grasas=8.0,
            carbohidratos=15.0,
            fibra=2.0,
            sodio=380.0,
            azucar=3.0,
            ingredientes=["pescado", "limón", "sal"],
            alergenos=["pescado"],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        # Vegetales
        ComidaDB(
            id="comida-003",
            nombre="Ensalada Verde",
            categoria=CategoriaComidaEnum.VEGETAL,
            descripcion="Ensalada fresca con lechuga, tomate y pepino",
            calorias=120,
            proteinas=3.0,
            grasas=2.0,
            carbohidratos=8.0,
            fibra=5.0,
            sodio=200.0,
            azucar=4.0,
            ingredientes=["lechuga", "tomate", "pepino", "aceite de oliva"],
            alergenos=[],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        ComidaDB(
            id="comida-004",
            nombre="Brócoli al Vapor",
            categoria=CategoriaComidaEnum.VEGETAL,
            descripcion="Brócoli fresco al vapor",
            calorias=90,
            proteinas=4.0,
            grasas=1.0,
            carbohidratos=12.0,
            fibra=6.0,
            sodio=150.0,
            azucar=2.0,
            ingredientes=["brócoli", "sal"],
            alergenos=[],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        # Carbohidratos
        ComidaDB(
            id="comida-005",
            nombre="Arroz Integral",
            categoria=CategoriaComidaEnum.CARBOHIDRATO,
            descripcion="Arroz integral cocido",
            calorias=220,
            proteinas=5.0,
            grasas=2.0,
            carbohidratos=45.0,
            fibra=4.0,
            sodio=200.0,
            azucar=1.0,
            ingredientes=["arroz integral", "agua", "sal"],
            alergenos=[],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        ComidaDB(
            id="comida-006",
            nombre="Papa Cocida",
            categoria=CategoriaComidaEnum.CARBOHIDRATO,
            descripcion="Papa cocida al vapor",
            calorias=180,
            proteinas=4.0,
            grasas=0.5,
            carbohidratos=38.0,
            fibra=3.0,
            sodio=100.0,
            azucar=2.0,
            ingredientes=["papa", "agua"],
            alergenos=[],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        # Frutas
        ComidaDB(
            id="comida-007",
            nombre="Manzana",
            categoria=CategoriaComidaEnum.FRUTA,
            descripcion="Manzana fresca",
            calorias=95,
            proteinas=0.5,
            grasas=0.3,
            carbohidratos=25.0,
            fibra=4.0,
            sodio=2.0,
            azucar=19.0,
            ingredientes=["manzana"],
            alergenos=[],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        ComidaDB(
            id="comida-008",
            nombre="Plátano",
            categoria=CategoriaComidaEnum.FRUTA,
            descripcion="Plátano maduro",
            calorias=105,
            proteinas=1.3,
            grasas=0.4,
            carbohidratos=27.0,
            fibra=3.0,
            sodio=1.0,
            azucar=14.0,
            ingredientes=["plátano"],
            alergenos=[],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        # Lácteos
        ComidaDB(
            id="comida-009",
            nombre="Yogurt Natural",
            categoria=CategoriaComidaEnum.LACTEO,
            descripcion="Yogurt natural sin azúcar",
            calorias=120,
            proteinas=8.0,
            grasas=3.5,
            carbohidratos=14.0,
            fibra=0.0,
            sodio=90.0,
            azucar=12.0,
            ingredientes=["leche", "cultivos lácteos"],
            alergenos=["lácteos"],
            activa=True,
            fecha_creacion=datetime.now()
        ),
        # Bebidas
        ComidaDB(
            id="comida-010",
            nombre="Agua",
            categoria=CategoriaComidaEnum.BEBIDA,
            descripcion="Agua purificada",
            calorias=0,
            proteinas=0.0,
            grasas=0.0,
            carbohidratos=0.0,
            fibra=0.0,
            sodio=10.0,
            azucar=0.0,
            ingredientes=["agua"],
            alergenos=[],
            activa=True,
            fecha_creacion=datetime.now()
        )
    ]
    
    db.add_all(comidas)
    db.commit()
    print(f"   ✅ {len(comidas)} comidas creadas")
    
    # Crear menús
    print("📋 Creando menús...")
    menu1 = MenuDB(
        id="menu-001",
        escuela_id="escuela-001",
        fecha=date.today(),
        tipo=TipoMenuEnum.ALMUERZO,
        nombre="Almuerzo Saludable",
        descripcion="Almuerzo equilibrado y nutritivo con proteínas y vegetales",
        activo=True,
        creado_por="nutri-001",
        fecha_creacion=datetime.now()
    )
    
    menu2 = MenuDB(
        id="menu-002",
        escuela_id="escuela-001",
        fecha=date.today(),
        tipo=TipoMenuEnum.DESAYUNO,
        nombre="Desayuno Energético",
        descripcion="Desayuno completo para comenzar el día",
        activo=True,
        creado_por="nutri-001",
        fecha_creacion=datetime.now()
    )
    
    db.add_all([menu1, menu2])
    db.commit()
    print(f"   ✅ {2} menús creados")
    
    # Crear relaciones menu-comida
    print("🔗 Creando relaciones menú-comida...")
    menu_comidas = [
        # Menu 1 - Almuerzo
        MenuComidaDB(
            id=str(uuid.uuid4()),
            menu_id="menu-001",
            comida_id="comida-001",  # Pollo
            porcion=1.0,
            orden=1
        ),
        MenuComidaDB(
            id=str(uuid.uuid4()),
            menu_id="menu-001",
            comida_id="comida-003",  # Ensalada
            porcion=1.0,
            orden=2
        ),
        MenuComidaDB(
            id=str(uuid.uuid4()),
            menu_id="menu-001",
            comida_id="comida-005",  # Arroz
            porcion=1.0,
            orden=3
        ),
        MenuComidaDB(
            id=str(uuid.uuid4()),
            menu_id="menu-001",
            comida_id="comida-007",  # Manzana
            porcion=1.0,
            orden=4
        ),
        MenuComidaDB(
            id=str(uuid.uuid4()),
            menu_id="menu-001",
            comida_id="comida-010",  # Agua
            porcion=1.0,
            orden=5
        ),
        # Menu 2 - Desayuno
        MenuComidaDB(
            id=str(uuid.uuid4()),
            menu_id="menu-002",
            comida_id="comida-009",  # Yogurt
            porcion=1.0,
            orden=1
        ),
        MenuComidaDB(
            id=str(uuid.uuid4()),
            menu_id="menu-002",
            comida_id="comida-008",  # Plátano
            porcion=1.0,
            orden=2
        ),
        MenuComidaDB(
            id=str(uuid.uuid4()),
            menu_id="menu-002",
            comida_id="comida-010",  # Agua
            porcion=1.0,
            orden=3
        )
    ]
    
    db.add_all(menu_comidas)
    db.commit()
    print(f"   ✅ {len(menu_comidas)} relaciones menú-comida creadas")
    
    # Crear feedback
    print("💬 Creando feedback...")
    feedbacks = [
        FeedbackDB(
            id="feedback-001",
            menu_id="menu-001",
            usuario_id="padre-001",
            calificacion=5,
            comentario="Excelente menú, muy nutritivo y balanceado",
            fecha=date.today()
        ),
        FeedbackDB(
            id="feedback-002",
            menu_id="menu-001",
            usuario_id="estudiante-001",
            calificacion=4,
            comentario="Me gustó mucho, especialmente el pollo",
            fecha=date.today()
        ),
        FeedbackDB(
            id="feedback-003",
            menu_id="menu-002",
            usuario_id="padre-001",
            calificacion=5,
            comentario="Perfecto para comenzar el día",
            fecha=date.today()
        )
    ]
    
    db.add_all(feedbacks)
    db.commit()
    print(f"   ✅ {len(feedbacks)} feedback creados")
    
    print("\n✅ ¡Datos de ejemplo creados exitosamente!\n")

def main():
    """Función principal para inicializar la base de datos"""
    print("🚀 Inicializando base de datos PostgreSQL...\n")
    
    # Crear todas las tablas
    init_db()
    
    # Crear sesión
    db = SessionLocal()
    
    try:
        # Verificar si ya hay datos
        from models_db import EscuelaDB
        count = db.query(EscuelaDB).count()
        
        if count > 0:
            print(f"⚠️  La base de datos ya contiene {count} escuelas.")
            response = input("¿Deseas resetear y cargar datos de ejemplo? (s/n): ")
            
            if response.lower() == 's':
                print("\n🔄 Reseteando base de datos...")
                from db_config import reset_db
                reset_db()
                db = SessionLocal()  # Nueva sesión después del reset
                create_sample_data(db)
            else:
                print("✅ Manteniendo datos existentes")
        else:
            create_sample_data(db)
        
        # Mostrar credenciales
        print("\n🔐 Credenciales de acceso:")
        print("=" * 60)
        print("Admin:         admin@sistema.cl / admin123")
        print("Rector 1:      rector1@sistema.cl / rector123")
        print("Rector 2:      rector2@sistema.cl / rector123")
        print("Rector 3:      rector3@sistema.cl / rector123")
        print("Nutricionista 1: nutricionista1@sistema.cl / nutri123")
        print("Nutricionista 2: nutricionista2@sistema.cl / nutri123")
        print("Nutricionista 3: nutricionista3@sistema.cl / nutri123")
        print("Padre:         juan.perez@email.com / padre123")
        print("Estudiante:    ana.martinez@email.com / estudiante123")
        print("=" * 60)
        
    except Exception as e:
        print(f"\n❌ Error al inicializar la base de datos: {str(e)}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    main()
