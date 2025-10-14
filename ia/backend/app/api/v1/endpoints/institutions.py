from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_institutions():
    return [
        {
            "id": 1,
            "name": "Escuela Primaria El Futuro",
            "address": "Av. Educación 123, Ciudad",
            "phone": "+1234567890",
            "email": "contacto@escuelafuturo.edu",
            "is_active": True,
            "created_at": "2025-01-01T00:00:00Z",
            "updated_at": "2025-01-01T00:00:00Z"
        }
    ]

@router.post("/")
async def create_institution():
    return {"message": "Institución creada"}