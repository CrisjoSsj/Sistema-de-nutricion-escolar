@echo off
REM Script de inicio para el Sistema de Nutrición Escolar (Windows)

echo 🍎 Sistema de Nutrición Escolar
echo ================================

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python no está instalado. Por favor, instala Python 3.8 o superior.
    pause
    exit /b 1
)

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado. Por favor, instala Node.js 16 o superior.
    pause
    exit /b 1
)

echo ✅ Prerrequisitos verificados
echo.

echo Selecciona una opción:
echo 1) Iniciar Backend (FastAPI)
echo 2) Iniciar Frontend (React)
echo 3) Ver instrucciones para iniciar ambos
echo 4) Salir

set /p option="Opción: "

if "%option%"=="1" goto backend
if "%option%"=="2" goto frontend
if "%option%"=="3" goto both
if "%option%"=="4" goto exit
goto invalid

:backend
echo 🚀 Iniciando backend (FastAPI)...
cd backend

REM Crear entorno virtual si no existe
if not exist "venv" (
    echo 📦 Creando entorno virtual...
    python -m venv venv
)

REM Activar entorno virtual
call venv\Scripts\activate

REM Instalar dependencias si es necesario
if not exist ".deps_installed" (
    echo 📚 Instalando dependencias del backend...
    pip install -r requirements.txt
    echo. > .deps_installed
)

REM Verificar archivo .env
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado. Copiando .env.example...
    copy .env.example .env
    echo 🔧 Por favor, edita el archivo .env con tus credenciales de Supabase
    pause
)

echo 🌐 Servidor backend disponible en: http://localhost:8000
python main.py
goto end

:frontend
echo 🎨 Iniciando frontend (React + Vite)...
cd frontend

REM Instalar dependencias si es necesario
if not exist "node_modules" (
    echo 📚 Instalando dependencias del frontend...
    npm install
)

REM Verificar archivo .env
if not exist ".env" (
    echo ⚠️  Archivo .env no encontrado. Copiando .env.example...
    copy .env.example .env
)

echo 🌐 Servidor frontend disponible en: http://localhost:5173
npm run dev
goto end

:both
echo 📋 Para iniciar ambos servicios:
echo    Terminal 1: Ejecuta start.bat y selecciona opción 1
echo    Terminal 2: Ejecuta start.bat y selecciona opción 2
echo.
echo 💡 Tip: Puedes abrir una nueva ventana de PowerShell para el segundo servicio
pause
goto end

:invalid
echo ❌ Opción inválida
pause
goto end

:exit
echo 👋 ¡Hasta luego!
goto end

:end