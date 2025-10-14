from supabase import create_client, Client
from app.core.config import settings

# Cliente de Supabase
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# Cliente administrativo de Supabase (para operaciones que requieren privilegios elevados)
supabase_admin: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_KEY)

async def init_db():
    """Inicializar la base de datos y crear tablas si es necesario"""
    try:
        # Verificar conexión a Supabase
        response = supabase.table('users').select('id').limit(1).execute()
        print("✅ Conexión a Supabase establecida correctamente")
    except Exception as e:
        print(f"❌ Error conectando a Supabase: {e}")
        
async def get_supabase_client() -> Client:
    """Obtener cliente de Supabase"""
    return supabase

async def get_supabase_admin_client() -> Client:
    """Obtener cliente administrativo de Supabase"""
    return supabase_admin