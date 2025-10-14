from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_consumption():
    return {"message": "Registros de consumo"}

@router.post("/")
async def create_consumption():
    return {"message": "Consumo registrado"}