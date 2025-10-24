@echo off
chcp 65001 >nul
echo ============================================================
echo   CONFIGURACION AUTOMATICA - DESARROLLO LOCAL SIN INTERNET
echo ============================================================
echo.

REM Paso 1: Verificar ubicación
echo [1/4] Verificando ubicacion...
if not exist "backend\" (
    echo Error: No se encuentra la carpeta backend
    echo Ejecuta este script desde la raiz del proyecto
    pause
    exit /b 1
)
echo OK - Carpeta backend encontrada
echo.

REM Paso 2: Crear archivo .env
cd backend
echo [2/4] Configurando variables de entorno...

if exist ".env" (
    echo Ya existe archivo .env
) else (
    echo Creando archivo .env...
    (
        echo # Configuracion de Base de Datos Local
        echo DATABASE_MODE=local
        echo DATABASE_URL=sqlite:///./nutrition_local.db
        echo.
        echo # JWT Secret
        echo SECRET_KEY=desarrollo_local_secret_key_%RANDOM%
        echo ALGORITHM=HS256
        echo ACCESS_TOKEN_EXPIRE_MINUTES=60
        echo.
        echo # Servidor
        echo HOST=0.0.0.0
        echo PORT=8000
        echo DEBUG=True
    ) > .env
    echo Archivo .env creado
)
echo.

REM Paso 3: Instalar dependencias
echo [3/4] Instalando dependencias...
echo Esto puede tardar unos minutos...
pip install -r requirements.txt --quiet
if %ERRORLEVEL% EQU 0 (
    echo Dependencias instaladas correctamente
) else (
    echo Advertencia: Hubo problemas al instalar dependencias
    echo Ejecuta manualmente: pip install -r requirements.txt
)
echo.

REM Paso 4: Inicializar base de datos
echo [4/4] Inicializando base de datos...

if exist "nutrition_local.db" (
    echo Base de datos ya existe
    set /p resetear="Deseas resetearla? (S/N): "
    if /i "%resetear%"=="S" (
        del nutrition_local.db
        echo Base de datos anterior eliminada
    )
)

if not exist "nutrition_local.db" (
    echo Creando base de datos y datos de ejemplo...
    python database_local.py
    if %ERRORLEVEL% EQU 0 (
        echo Base de datos creada exitosamente
    ) else (
        echo Error al crear base de datos
        pause
        exit /b 1
    )
) else (
    echo Base de datos lista
)
echo.

echo ============================================================
echo   CONFIGURACION COMPLETADA EXITOSAMENTE
echo ============================================================
echo.
echo PROXIMOS PASOS:
echo.
echo 1. Iniciar el servidor:
echo    uvicorn main:app --reload
echo.
echo 2. Abrir en navegador:
echo    http://localhost:8000/docs
echo.
echo 3. Probar login con:
echo    Email: admin@sistema.cl
echo    Pass:  admin123
echo.
echo USUARIOS DE PRUEBA:
echo    - Admin:         admin@sistema.cl          / admin123
echo    - Rector:        rector1@sistema.cl        / rector123
echo    - Nutricionista: nutricionista1@sistema.cl / nutri123
echo    - Padre:         juan.perez@email.com      / padre123
echo    - Estudiante:    ana.martinez@email.com    / estudiante123
echo    - Analista:      analista@sistema.cl       / analista123
echo.
echo DOCUMENTACION:
echo    Ver archivo DESARROLLO_LOCAL.md
echo.
echo.
set /p iniciar="Deseas iniciar el servidor ahora? (S/N): "

if /i "%iniciar%"=="S" (
    echo.
    echo Iniciando servidor...
    echo Presiona Ctrl+C para detener
    echo.
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
) else (
    echo.
    echo Listo! Ejecuta 'uvicorn main:app --reload' cuando quieras iniciar
)

pause
