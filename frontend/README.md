# 🍎 Sistema de Nutrición Escolar - Frontend

Frontend desarrollado en React + Vite para el Sistema de Nutrición Escolar.

## 📁 Estructura del Proyecto

```
src/
├── 📂 scripts/          # Utilidades y configuraciones
│   ├── apiConfig.js     # Configuración de API y endpoints
│   ├── constants.js     # Constantes de la aplicación
│   ├── utils.js         # Funciones de utilidad
│   └── storage.js       # Manejo de localStorage
├── 📂 styles/           # Estilos CSS organizados
│   ├── globals.css      # Variables CSS y utilidades globales
│   ├── components.css   # Estilos de componentes
│   └── pages.css        # Estilos específicos de páginas
├── 📂 pages/            # Páginas JSX
│   ├── home.jsx         # Página principal (redirección)
│   ├── LoginPage.jsx    # Página de inicio de sesión
│   ├── DashboardPage.jsx # Dashboard principal
│   ├── AdminDashboard.jsx # Dashboard de administrador
│   ├── NutritionistDashboard.jsx # Dashboard de nutricionista
│   ├── ParentDashboard.jsx # Dashboard de padre/tutor
│   └── StudentDashboard.jsx # Dashboard de estudiante
├── 📂 context/          # Contextos de React
│   └── AuthContext.jsx  # Contexto de autenticación
└── 📂 services/         # Servicios de API
    ├── api.js           # Configuración base de Axios
    ├── authService.js   # Servicios de autenticación y usuarios
    ├── menuService.js   # Servicios de menús y comidas
    └── feedbackService.js # Servicios de feedback y reportes
```

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## 👥 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Administrador | juan.perez@example.com | password123 |
| Nutricionista | maria.gomez@example.com | password456 |
| Padre | luis.rodriguez@example.com | password789 |
| Estudiante | ana.martinez@example.com | password000 |

## ✅ Funcionalidades Implementadas

- **Sistema de Autenticación** con JWT
- **Dashboards específicos** por rol de usuario
- **Gestión de menús** y visualización nutricional
- **Sistema de feedback** y calificaciones
- **Responsive design** para móviles y tablets
- **Manejo de estado global** con Context API

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
