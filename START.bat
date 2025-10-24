@echo off
chcp 65001 >nul
cls
echo ============================================================
echo   SISTEMA DE NUTRICION ESCOLAR - INICIO RAPIDO
echo ============================================================
echo.

cd backend

echo [+] Verificando sistema...
echo.

REM Verificar si existe database_smart.py
if not exist "database_smart.py" (
    echo [!] Error: No se encuentra database_smart.py
    pause
    exit /b 1
)

REM Verificar si existe .env
if not exist ".env" (
    echo [+] Creando archivo .env...
    (
        echo # Configuracion Simple
        echo SUPABASE_URL=tu_url_aqui
        echo SUPABASE_KEY=tu_key_aqui
        echo SECRET_KEY=clave_secreta_%RANDOM%
        echo ALGORITHM=HS256
        echo ACCESS_TOKEN_EXPIRE_MINUTES=60
    ) > .env
    echo [OK] Archivo .env creado
    echo.
)

echo [+] Probando base de datos...
python database_smart.py
echo.

if %ERRORLEVEL% EQU 0 (
    echo [OK] Sistema listo
    echo.
    echo ============================================================
    echo   INICIANDO SERVIDOR
    echo ============================================================
    echo.
    echo - API disponible en: http://localhost:8000
    echo - Documentacion en: http://localhost:8000/docs
    echo.
    echo USUARIOS DE PRUEBA:
    echo   Admin:         admin@sistema.cl / admin123
    echo   Rector:        rector1@sistema.cl / rector123
    echo   Nutricionista: nutricionista1@sistema.cl / nutri123
    echo   Padre:         juan.perez@email.com / padre123
    echo   Estudiante:    ana.martinez@email.com / estudiante123
    echo.
    echo Presiona Ctrl+C para detener el servidor
    echo.
    echo ============================================================
    echo.
    
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
) else (
    echo [!] Error al verificar la base de datos
    pause
)
