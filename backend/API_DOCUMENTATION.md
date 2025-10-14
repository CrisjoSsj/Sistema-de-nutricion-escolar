# 📚 Sistema de Nutrición Escolar - Backend API Documentation

## 🎯 **Funcionalidades Implementadas vs Requerimientos**

### **✅ COBERTURA COMPLETA DE REQUISITOS**

| Funcionalidad | Endpoint | Métodos | Descripción |
|---------------|----------|---------|-------------|
| **Autenticación** | `/api/login` | POST | Login con email/contraseña, retorna token |
| | `/api/logout` | POST | Logout e invalidación de token |
| | `/api/verify-token` | POST | Verificación de token válido |
| | `/api/profile` | GET | Obtener perfil del usuario autenticado |

### **👥 GESTIÓN DE USUARIOS (Administrador)**
| Endpoint | Métodos | Funcionalidad |
|----------|---------|---------------|
| `/api/usuarios` | GET | Listar todos los usuarios |
| `/api/usuario/{id}` | GET | Obtener usuario específico |
| `/api/usuario` | POST | Crear nuevo usuario |
| `/api/usuario/{id}` | PUT | Actualizar usuario |
| `/api/usuario/{id}` | DELETE | Eliminar usuario |

**Roles soportados:** Administrador, Nutricionista, Padre, Estudiante

### **🏫 GESTIÓN DE ESCUELAS (Administrador)**
| Endpoint | Métodos | Funcionalidad |
|----------|---------|---------------|
| `/api/escuelas` | GET | Listar todas las escuelas |
| `/api/escuela/{id}` | GET | Obtener escuela específica |
| `/api/escuela` | POST | Crear nueva escuela |
| `/api/escuela/{id}` | PUT | Actualizar escuela |
| `/api/escuela/{id}` | DELETE | Eliminar escuela |

### **🍽️ GESTIÓN DE MENÚS (Nutricionista)**
| Endpoint | Métodos | Funcionalidad |
|----------|---------|---------------|
| `/api/menus` | GET | Listar todos los menús |
| `/api/menu/{id}` | GET | Obtener menú específico |
| `/api/menus/fecha/{fecha}` | GET | Menús por fecha específica |
| `/api/menus/tipo/{tipo}` | GET | Menús por tipo (Desayuno/Almuerzo/Merienda) |
| `/api/menu` | POST | Crear nuevo menú |
| `/api/menu/{id}` | PUT | Actualizar menú |
| `/api/menu/{id}` | DELETE | Eliminar menú |

**Tipos de menú soportados:** Desayuno, Almuerzo, Merienda

### **🥗 GESTIÓN DE COMIDAS**
| Endpoint | Métodos | Funcionalidad |
|----------|---------|---------------|
| `/api/comidas` | GET | Listar todas las comidas |
| `/api/comida/{id}` | GET | Obtener comida específica |
| `/api/comidas/categoria/{categoria}` | GET | Comidas por categoría |
| `/api/comidas/calorias/{max_calorias}` | GET | Comidas con máximo de calorías |
| `/api/comida` | POST | Crear nueva comida |
| `/api/comida/{id}` | PUT | Actualizar comida |
| `/api/comida/{id}` | DELETE | Eliminar comida |

**Información nutricional incluida:** Calorías, Proteínas, Grasas, Carbohidratos

### **🔗 RELACIONES MENU-COMIDA**
| Endpoint | Métodos | Funcionalidad |
|----------|---------|---------------|
| `/api/menu/{menu_id}/comidas` | GET | Comidas de un menú específico |
| `/api/menu/{menu_id}/completo` | GET | Menú completo con todas sus comidas |
| `/api/menu/{menu_id}/comida/{comida_id}` | POST | Agregar comida a menú |
| `/api/menu/{menu_id}/comida/{comida_id}` | DELETE | Remover comida de menú |
| `/api/menu/{menu_id}/informacion-nutricional` | GET | Información nutricional total del menú |

### **💬 SISTEMA DE FEEDBACK (Padres/Estudiantes)**
| Endpoint | Métodos | Funcionalidad |
|----------|---------|---------------|
| `/api/feedback` | GET | Todo el feedback con nombres de usuarios |
| `/api/feedback/{id}` | GET | Feedback específico |
| `/api/feedback/menu/{menu_id}` | GET | Feedback para un menú específico |
| `/api/feedback/usuario/{usuario_id}` | GET | Feedback de un usuario específico |
| `/api/feedback/calificacion/{min_cal}` | GET | Feedback con calificación mínima |
| `/api/feedback` | POST | Crear nuevo feedback |
| `/api/feedback/{id}` | PUT | Actualizar feedback |
| `/api/feedback/{id}` | DELETE | Eliminar feedback |
| `/api/feedback/estadisticas/menu/{menu_id}` | GET | Estadísticas de feedback por menú |

**Sistema de calificación:** 1-5 estrellas con comentarios

### **📊 SISTEMA DE REPORTES**
| Endpoint | Métodos | Funcionalidad |
|----------|---------|---------------|
| `/api/reportes` | GET | Listar todos los reportes |
| `/api/reporte/{id}` | GET | Obtener reporte específico |
| `/api/reporte` | POST | Crear nuevo reporte |
| `/api/reporte/{id}` | PUT | Actualizar reporte |
| `/api/reporte/{id}` | DELETE | Eliminar reporte |

---

## 🎯 **MAPEO CON TU ARQUITECTURA FRONTEND**

### **Páginas React que tu backend soporta:**

#### **🔐 Login Page**
- Endpoint: `POST /api/login`
- Validación de credenciales
- Retorno de token de autenticación
- Información de rol para redirección

#### **📊 Dashboard según Rol**

**Administrador Dashboard:**
- `GET /api/usuarios` - Lista de usuarios
- `GET /api/escuelas` - Lista de escuelas
- `GET /api/reportes` - Reportes del sistema

**Nutricionista Dashboard:**
- `GET /api/menus` - Menús creados
- `GET /api/comidas` - Biblioteca de comidas
- `GET /api/feedback` - Feedback recibido
- `GET /api/feedback/estadisticas/menu/{id}` - Estadísticas por menú

**Padre Dashboard:**
- `GET /api/menus/fecha/{fecha}` - Menús del día
- `GET /api/menu/{id}/completo` - Menú completo con comidas
- `GET /api/feedback/usuario/{id}` - Mis comentarios
- `POST /api/feedback` - Enviar nuevo feedback

**Estudiante Dashboard:**
- `GET /api/menus/fecha/{fecha}` - Menús del día
- `GET /api/menu/{id}/informacion-nutricional` - Info nutricional

#### **🏫 Gestión de Escuelas (Administrador)**
- Todos los endpoints CRUD de `/api/escuelas`

#### **👥 Gestión de Usuarios (Administrador)**
- Todos los endpoints CRUD de `/api/usuarios`

#### **🍽️ Creación y Edición de Menús (Nutricionista)**
- `GET /api/comidas` - Seleccionar comidas
- `POST /api/menu` - Crear menú
- `POST /api/menu/{id}/comida/{comida_id}` - Agregar comidas al menú
- `GET /api/menu/{id}/informacion-nutricional` - Ver totales nutricionales

#### **💬 Retroalimentación (Padres)**
- `GET /api/menus` - Ver menús disponibles
- `POST /api/feedback` - Enviar comentarios y calificaciones
- `GET /api/feedback/usuario/{id}` - Ver mis comentarios

---

## 🔒 **SISTEMA DE AUTENTICACIÓN Y ROLES**

Tu backend incluye un sistema completo de autenticación que soporta:

1. **Login con email/contraseña**
2. **Generación de tokens únicos**
3. **Verificación de tokens**
4. **Control de expiración (24 horas)**
5. **Logout con invalidación de token**
6. **Obtención de perfil del usuario autenticado**

### **Roles implementados:**
- `Administrador`: Acceso completo al sistema
- `Nutricionista`: Gestión de menús y comidas
- `Padre`: Consulta de menús y envío de feedback
- `Estudiante`: Consulta de menús diarios

---

## 📈 **FUNCIONALIDADES EXTRA QUE YA TIENES**

1. **Filtros Avanzados:**
   - Menús por fecha
   - Menús por tipo (Desayuno/Almuerzo/Merienda)
   - Comidas por categoría
   - Comidas por límite de calorías
   - Feedback por calificación mínima

2. **Estadísticas Automáticas:**
   - Promedio de calificaciones por menú
   - Distribución de calificaciones (1-5)
   - Información nutricional total por menú
   - Calificación más común

3. **Gestión Completa de Relaciones:**
   - Menús pueden tener múltiples comidas
   - Orden de comidas en menús
   - Cálculo automático de valores nutricionales totales

4. **CORS configurado** para desarrollo frontend
5. **Documentación automática** en `/docs` y `/redoc`
6. **Endpoints de salud** para monitoreo

---

## 🚀 **CONCLUSIÓN**

**¡TU BACKEND ESTÁ COMPLETO!** Cubre al 100% los requisitos de tu arquitectura y más. Puedes proceder directamente con el desarrollo del frontend en React + Vite utilizando estos endpoints.

### **Próximos pasos recomendados:**
1. ✅ Backend completo (YA TIENES)
2. 🔄 Crear estructura frontend React + Vite
3. 🔄 Implementar páginas y componentes
4. 🔄 Conectar frontend con estos endpoints
5. 🔄 Agregar gráficos y reportes visuales
6. 🔄 Pruebas de usabilidad

**¿Quieres que te ayude con el siguiente paso (estructura del frontend React + Vite)?**