from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_menus():
    return {"message": "Lista de menús"}

@router.post("/")
async def create_menu():
    return {"message": "Menú creado"}