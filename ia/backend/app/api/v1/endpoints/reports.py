from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_stats():
    return {
        "total_students": 120,
        "total_menus": 15,
        "daily_consumption_rate": 85.5,
        "weekly_consumption_trend": [],
        "food_group_consumption": []
    }

@router.get("/nutrition/{student_id}")
async def get_nutrition_report(student_id: int):
    return {"message": f"Reporte nutricional para estudiante {student_id}"}