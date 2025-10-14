#!/bin/bash
# Script de inicio para el Sistema de Nutrición Escolar

echo "🍎 Sistema de Nutrición Escolar"
echo "================================"

# Verificar si Python está instalado
if ! command -v python &> /dev/null; then
    echo "❌ Python no está instalado. Por favor, instala Python 3.8 o superior."
    exit 1
fi

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor, instala Node.js 16 o superior."
    exit 1
fi

echo "✅ Prerrequisitos verificados"

# Función para iniciar el backend
start_backend() {
    echo "🚀 Iniciando backend (FastAPI)..."
    cd backend
    
    if [ ! -d "venv" ]; then
        echo "📦 Creando entorno virtual..."
        python -m venv venv
    fi
    
    # Activar entorno virtual
    if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        source venv/Scripts/activate
    else
        source venv/bin/activate
    fi
    
    # Instalar dependencias si es necesario
    if [ ! -f ".deps_installed" ]; then
        echo "📚 Instalando dependencias del backend..."
        pip install -r requirements.txt
        touch .deps_installed
    fi
    
    # Verificar archivo .env
    if [ ! -f ".env" ]; then
        echo "⚠️  Archivo .env no encontrado. Copiando .env.example..."
        cp .env.example .env
        echo "🔧 Por favor, edita el archivo .env con tus credenciales de Supabase"
        read -p "Presiona Enter cuando hayas configurado el archivo .env..."
    fi
    
    echo "🌐 Servidor backend disponible en: http://localhost:8000"
    python main.py
}

# Función para iniciar el frontend
start_frontend() {
    echo "🎨 Iniciando frontend (React + Vite)..."
    cd frontend
    
    # Instalar dependencias si es necesario
    if [ ! -d "node_modules" ]; then
        echo "📚 Instalando dependencias del frontend..."
        npm install
    fi
    
    # Verificar archivo .env
    if [ ! -f ".env" ]; then
        echo "⚠️  Archivo .env no encontrado. Copiando .env.example..."
        cp .env.example .env
    fi
    
    echo "🌐 Servidor frontend disponible en: http://localhost:5173"
    npm run dev
}

# Menú principal
echo ""
echo "Selecciona una opción:"
echo "1) Iniciar Backend (FastAPI)"
echo "2) Iniciar Frontend (React)"
echo "3) Iniciar ambos (requiere terminales separadas)"
echo "4) Salir"

read -p "Opción: " option

case $option in
    1)
        start_backend
        ;;
    2)
        start_frontend
        ;;
    3)
        echo "📋 Para iniciar ambos servicios:"
        echo "   Terminal 1: ./start.sh y selecciona opción 1"
        echo "   Terminal 2: ./start.sh y selecciona opción 2"
        ;;
    4)
        echo "👋 ¡Hasta luego!"
        exit 0
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac