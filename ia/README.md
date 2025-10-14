# 🍎 Sistema de Nutrición Escolar

Sistema web completo para la gestión de nutrición en instituciones educativas con control de menús, porciones automáticas y seguimiento de consumo.

## 🌟 Características por Rol

### 🔧 Superadmin
- Crear y gestionar instituciones educativas
- Supervisar reportes globales de todas las instituciones
- Gestionar usuarios del sistema
- Acceso a estadísticas globales

### 👩‍⚕️ Nutriólogo (Admin de Institución)
- Definir menús base para la institución
- Sistema de ajuste automático de porciones según datos biométricos del estudiante
- Supervisar consumo registrado en el comedor escolar
- Acceder a estadísticas de cumplimiento y alertas internas
- Generar reportes nutricionales

### 👦 Estudiante
- Consultar menú personalizado dentro de la institución
- Registrar consumo/rechazo de alimentos en el comedor
- Ver historial de consumo
- Acceso mediante códigos QR o registro manual

### 👨‍👩‍👧‍👦 Padre de Familia
- Visualizar reportes y menús consumidos por su hijo en la institución
- Recibir notificaciones si el niño no consume ciertos grupos alimenticios
- Enviar comentarios al nutriólogo
- Acceso a tendencias de consumo

## 🏗️ Arquitectura del Sistema

```
├── backend/              # API FastAPI + Supabase
│   ├── app/
│   │   ├── api/v1/      # Rutas de la API
│   │   ├── core/        # Configuración y seguridad
│   │   ├── schemas/     # Modelos Pydantic
│   │   ├── services/    # Lógica de negocio
│   │   └── utils/       # Utilidades
│   ├── main.py          # Punto de entrada
│   └── requirements.txt
├── frontend/            # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Páginas por rol
│   │   ├── services/    # Servicios API
│   │   ├── context/     # Estado global
│   │   └── types/       # Tipos TypeScript
│   └── package.json
├── database/            # Esquemas SQL
│   └── schema.sql       # Esquema completo para Supabase
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Python 3.8+
- Node.js 16+
- Cuenta en Supabase

### 1. Configurar Supabase
1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script `database/schema.sql` en el SQL Editor de Supabase
3. Obtén las credenciales de tu proyecto (URL y Keys)

### 2. Configurar Backend
```bash
cd backend

# Crear entorno virtual
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
copy .env.example .env
# Editar .env con tus credenciales de Supabase

# Ejecutar servidor
python main.py
```

### 3. Configurar Frontend
```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
copy .env.example .env
# Editar .env con las URLs correspondientes

# Ejecutar en desarrollo
npm run dev
```

## 🔧 Tecnologías Utilizadas

### Backend
- **FastAPI**: Framework web moderno y rápido
- **Supabase**: Base de datos PostgreSQL como servicio
- **Pydantic**: Validación de datos y serialización
- **JWT**: Autenticación y autorización
- **Uvicorn**: Servidor ASGI de alto rendimiento

### Frontend
- **React 18**: Biblioteca de interfaces de usuario
- **TypeScript**: Tipado estático para JavaScript
- **Vite**: Herramienta de construcción rápida
- **Material-UI**: Componentes de interfaz de usuario
- **Axios**: Cliente HTTP para API
- **React Router**: Enrutamiento del lado del cliente

### Base de Datos
- **PostgreSQL**: Base de datos relacional (vía Supabase)
- **Row Level Security**: Seguridad a nivel de fila
- **Real-time subscriptions**: Actualizaciones en tiempo real

## 🔐 Usuarios de Prueba

El sistema viene con usuarios pre-configurados para pruebas:

| Rol | Email | Contraseña | Descripción |
|-----|-------|------------|-------------|
| Superadmin | admin@sistema.com | admin123 | Acceso completo al sistema |
| Nutriólogo | nutri@escuela.com | nutri123 | Gestión de menús y estudiantes |
| Estudiante | estudiante@escuela.com | est123 | Consulta de menús y registro |
| Padre | padre@correo.com | padre123 | Visualización de reportes |

## 🧮 Algoritmo de Cálculo de Porciones

El sistema incluye un algoritmo inteligente que calcula automáticamente las porciones según:

- **Edad del estudiante**: Calculada desde la fecha de nacimiento
- **Peso y altura**: Datos biométricos actualizables
- **Género**: Diferencias en requerimientos nutricionales
- **Actividad física**: Nivel configurable
- **Tasa Metabólica Basal (TMB)**: Usando ecuación de Mifflin-St Jeor
- **Distribución de macronutrientes**: Personalizada por tipo de comida

### Ejemplo de Cálculo:
```
Estudiante: Juan, 8 años, 25kg, 120cm, Masculino
TMB = 10 × 25 + 6.25 × 120 - 5 × 8 + 5 = 1,045 kcal/día
Calorías diarias = TMB × 1.55 (actividad moderada) = 1,620 kcal/día
Almuerzo = 40% del total = 648 kcal
Porciones ajustadas automáticamente para alcanzar esta meta
```

## 📊 Funcionalidades Clave

### Control Interno Escolar
- ✅ Registro confiable únicamente en el comedor escolar
- ✅ Datos precisos sin dependencia de registros externos
- ✅ Interfaz optimizada para tablets y dispositivos móviles
- ✅ Sistema de códigos QR para registro rápido

### Inteligencia Nutricional
- 🧠 Cálculo automático de porciones personalizadas
- 📈 Análisis de tendencias de consumo
- ⚠️ Alertas automáticas por bajo consumo
- 📋 Reportes nutricionales detallados

### Seguridad y Privacidad
- 🔒 Autenticación JWT segura
- 🛡️ Row Level Security en base de datos
- 👥 Control de acceso basado en roles
- 🔐 Encriptación de datos sensibles

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: soporte@nutricionescolar.com
- 💬 Issues: [GitHub Issues](https://github.com/tu-usuario/sistema-nutricion-escolar/issues)
- 📖 Documentación: [Wiki del proyecto](https://github.com/tu-usuario/sistema-nutricion-escolar/wiki)