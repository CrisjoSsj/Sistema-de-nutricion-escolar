from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime, date
from enum import Enum

class MealType(str, Enum):
    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    SNACK = "snack"

class FoodGroup(str, Enum):
    PROTEINS = "proteins"
    CARBOHYDRATES = "carbohydrates"
    VEGETABLES = "vegetables"
    FRUITS = "fruits"
    DAIRY = "dairy"
    FATS = "fats"

class ConsumptionStatus(str, Enum):
    CONSUMED = "consumed"
    REJECTED = "rejected"
    PARTIAL = "partial"

# Schemas para Menú Base
class MenuBase(BaseModel):
    name: str
    description: Optional[str] = None
    meal_type: MealType
    institution_id: int
    is_active: bool = True

class MenuCreate(MenuBase):
    pass

class MenuUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    meal_type: Optional[MealType] = None
    is_active: Optional[bool] = None

class MenuResponse(MenuBase):
    id: int
    created_at: datetime
    updated_at: datetime
    foods: List["FoodResponse"] = []

    class Config:
        from_attributes = True

# Schemas para Alimentos
class FoodBase(BaseModel):
    name: str
    food_group: FoodGroup
    calories_per_100g: float
    proteins_per_100g: float
    carbs_per_100g: float
    fats_per_100g: float
    base_portion_g: float  # Porción base en gramos

class FoodCreate(FoodBase):
    pass

class FoodUpdate(BaseModel):
    name: Optional[str] = None
    food_group: Optional[FoodGroup] = None
    calories_per_100g: Optional[float] = None
    proteins_per_100g: Optional[float] = None
    carbs_per_100g: Optional[float] = None
    fats_per_100g: Optional[float] = None
    base_portion_g: Optional[float] = None

class FoodResponse(FoodBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Schemas para Menú-Alimento (relación con porciones calculadas)
class MenuFoodBase(BaseModel):
    menu_id: int
    food_id: int
    base_portion_g: float

class MenuFoodCreate(MenuFoodBase):
    pass

class MenuFoodResponse(MenuFoodBase):
    id: int
    food: FoodResponse
    calculated_portion_g: Optional[float] = None  # Calculada según el estudiante

    class Config:
        from_attributes = True

# Schemas para Consumo
class ConsumptionBase(BaseModel):
    student_id: int
    menu_id: int
    consumption_date: date
    meal_type: MealType

class ConsumptionCreate(ConsumptionBase):
    foods_consumed: List[dict]  # [{"food_id": int, "status": ConsumptionStatus, "portion_consumed_g": float}]

class ConsumptionUpdate(BaseModel):
    foods_consumed: List[dict]

class ConsumptionResponse(ConsumptionBase):
    id: int
    created_at: datetime
    foods_consumed: List[dict]
    student: Optional["StudentResponse"] = None
    menu: Optional[MenuResponse] = None

    class Config:
        from_attributes = True

# Schemas para Menú Personalizado (con porciones ajustadas)
class PersonalizedMenuResponse(BaseModel):
    menu: MenuResponse
    student_id: int
    personalized_foods: List[dict]  # [{"food": FoodResponse, "calculated_portion_g": float, "calories": float}]
    total_calories: float
    total_proteins: float
    total_carbs: float
    total_fats: float

    class Config:
        from_attributes = True