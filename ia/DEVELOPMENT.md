# Configuración de Desarrollo - Sistema de Nutrición Escolar

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd Sistema-de-nutricion-escolar
```

### 2. Configurar Supabase
1. Ve a https://supabase.com y crea un nuevo proyecto
2. En el SQL Editor, ejecuta el contenido de `database/schema.sql`
3. Ve a Settings > API y copia tus credenciales

### 3. Configurar variables de entorno

#### Backend (.env)
```env
SUPABASE_URL=https://tu-proyecto-id.supabase.co
SUPABASE_KEY=tu-anon-key
SUPABASE_SERVICE_KEY=tu-service-role-key
SECRET_KEY=tu-super-secret-key-cambia-en-produccion
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
DEBUG=True
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### 4. Ejecutar el sistema

#### Opción 1: Scripts automáticos
```bash
# Windows
start.bat

# Linux/Mac
chmod +x start.sh
./start.sh
```

#### Opción 2: Manual

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 🔐 Usuarios de Prueba

Una vez que ejecutes el schema SQL, tendrás estos usuarios disponibles:

| Email | Contraseña | Rol |
|-------|------------|-----|
| admin@sistema.com | admin123 | Superadmin |
| nutri@escuela.com | nutri123 | Nutriólogo |
| estudiante@escuela.com | est123 | Estudiante |
| padre@correo.com | padre123 | Padre |

## 🐛 Solución de Problemas

### Error: "No se puede conectar a Supabase"
- Verifica que las URLs y keys estén correctas
- Asegúrate de que el proyecto de Supabase esté activo

### Error: "CORS policy"
- Verifica que la URL del frontend esté en la configuración CORS del backend
- Por defecto permite: localhost:5173 y localhost:3000

### Error: "Token inválido"
- Los tokens expiran en 24 horas por defecto
- Cierra sesión e inicia sesión nuevamente

### Error en instalación de dependencias
- Asegúrate de tener Python 3.8+ y Node.js 16+
- Usa entornos virtuales para Python

## 📦 Dependencias Principales

### Backend
- FastAPI: Framework web
- Supabase-py: Cliente de Supabase
- Python-JOSE: Manejo de JWT
- Passlib: Encriptación de contraseñas
- Uvicorn: Servidor ASGI

### Frontend  
- React 18: Biblioteca UI
- TypeScript: Tipado estático
- Material-UI: Componentes UI
- Vite: Build tool
- Axios: Cliente HTTP

## 🔧 Configuración de Desarrollo

### Estructura de directorios recomendada:
```
Sistema-de-nutricion-escolar/
├── backend/
│   ├── venv/           # Entorno virtual (se crea automático)
│   ├── .env            # Variables de entorno (crear desde .env.example)
│   └── ...
├── frontend/
│   ├── node_modules/   # Dependencias (se crea automático)
│   ├── .env            # Variables de entorno (crear desde .env.example)
│   └── ...
└── database/
    └── schema.sql      # Ejecutar en Supabase
```

### Puertos utilizados:
- Backend: http://localhost:8000
- Frontend: http://localhost:5173

### Herramientas de desarrollo recomendadas:
- VS Code con extensiones de Python, TypeScript y React
- Postman para pruebas de API
- Supabase Dashboard para gestión de BD

## 🚀 Despliegue en Producción

### Backend (Recomendaciones):
- Railway, Heroku, o DigitalOcean
- Configurar variables de entorno de producción
- Usar gunicorn en lugar de uvicorn en desarrollo

### Frontend (Recomendaciones):
- Vercel, Netlify, o GitHub Pages
- Configurar variables de entorno de producción
- Build con `npm run build`

### Base de Datos:
- Supabase ya está listo para producción
- Configurar backups automáticos
- Revisar políticas de Row Level Security