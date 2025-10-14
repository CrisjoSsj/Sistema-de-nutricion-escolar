from fastapi import APIRouter

api_router = APIRouter()

# Importar y registrar todas las rutas
from app.api.v1.endpoints import auth, users, institutions, menus, students, consumption, reports

api_router.include_router(auth.router, prefix="/auth", tags=["Autenticación"])
api_router.include_router(users.router, prefix="/users", tags=["Usuarios"])
api_router.include_router(institutions.router, prefix="/institutions", tags=["Instituciones"])
api_router.include_router(menus.router, prefix="/menus", tags=["Menús"])
api_router.include_router(students.router, prefix="/students", tags=["Estudiantes"])
api_router.include_router(consumption.router, prefix="/consumption", tags=["Consumo"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reportes"])