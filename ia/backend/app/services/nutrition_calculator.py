from typing import Dict, List
from datetime import date, datetime
import math

class NutritionCalculator:
    """Servicio para calcular porciones automáticas según datos biométricos del estudiante"""
    
    @staticmethod
    def calculate_bmr(weight: float, height: float, age: int, gender: str) -> float:
        """
        Calcular Tasa Metabólica Basal (BMR) usando la ecuación de Mifflin-St Jeor
        """
        if gender.upper() == 'M':
            bmr = 10 * weight + 6.25 * height - 5 * age + 5
        else:
            bmr = 10 * weight + 6.25 * height - 5 * age - 161
        
        return bmr
    
    @staticmethod
    def calculate_daily_calories(bmr: float, activity_level: str = "moderate") -> float:
        """
        Calcular calorías diarias necesarias según nivel de actividad
        """
        activity_multipliers = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "active": 1.725,
            "very_active": 1.9
        }
        
        multiplier = activity_multipliers.get(activity_level, 1.55)
        return bmr * multiplier
    
    @staticmethod
    def calculate_age_from_birth_date(birth_date: date) -> int:
        """Calcular edad desde fecha de nacimiento"""
        today = date.today()
        age = today.year - birth_date.year
        
        if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):
            age -= 1
            
        return age
    
    @staticmethod
    def calculate_meal_calories(daily_calories: float, meal_type: str) -> float:
        """
        Distribuir calorías por tipo de comida
        """
        meal_distribution = {
            "breakfast": 0.25,  # 25% del total diario
            "lunch": 0.40,      # 40% del total diario
            "snack": 0.15       # 15% del total diario
        }
        
        percentage = meal_distribution.get(meal_type, 0.25)
        return daily_calories * percentage
    
    @staticmethod
    def calculate_portion_multiplier(student_calories: float, base_calories: float) -> float:
        """
        Calcular multiplicador de porción basado en necesidades calóricas
        """
        if base_calories == 0:
            return 1.0
            
        multiplier = student_calories / base_calories
        
        # Limitar el multiplicador entre 0.5 y 2.0 para evitar porciones extremas
        return max(0.5, min(2.0, multiplier))
    
    @classmethod
    def calculate_personalized_portions(
        cls,
        student_data: Dict,
        menu_foods: List[Dict],
        meal_type: str
    ) -> Dict:
        """
        Calcular porciones personalizadas para un estudiante específico
        
        Args:
            student_data: Datos del estudiante (peso, altura, fecha_nacimiento, género)
            menu_foods: Lista de alimentos del menú con sus porciones base
            meal_type: Tipo de comida (breakfast, lunch, snack)
        
        Returns:
            Dict con porciones calculadas y información nutricional
        """
        # Calcular datos base del estudiante
        age = cls.calculate_age_from_birth_date(student_data['birth_date'])
        bmr = cls.calculate_bmr(
            student_data['weight'],
            student_data['height'],
            age,
            student_data['gender']
        )
        
        daily_calories = cls.calculate_daily_calories(bmr)
        meal_calories = cls.calculate_meal_calories(daily_calories, meal_type)
        
        # Calcular calorías base del menú
        base_menu_calories = sum(
            (food['calories_per_100g'] * food['base_portion_g'] / 100)
            for food in menu_foods
        )
        
        # Calcular multiplicador de porción
        portion_multiplier = cls.calculate_portion_multiplier(meal_calories, base_menu_calories)
        
        # Calcular porciones personalizadas
        personalized_foods = []
        total_calories = 0
        total_proteins = 0
        total_carbs = 0
        total_fats = 0
        
        for food in menu_foods:
            # Calcular porción personalizada
            personalized_portion = food['base_portion_g'] * portion_multiplier
            
            # Calcular valores nutricionales de la porción personalizada
            portion_factor = personalized_portion / 100
            food_calories = food['calories_per_100g'] * portion_factor
            food_proteins = food['proteins_per_100g'] * portion_factor
            food_carbs = food['carbs_per_100g'] * portion_factor
            food_fats = food['fats_per_100g'] * portion_factor
            
            personalized_foods.append({
                'food_id': food['id'],
                'food_name': food['name'],
                'food_group': food['food_group'],
                'base_portion_g': food['base_portion_g'],
                'calculated_portion_g': round(personalized_portion, 1),
                'calories': round(food_calories, 1),
                'proteins': round(food_proteins, 1),
                'carbs': round(food_carbs, 1),
                'fats': round(food_fats, 1)
            })
            
            total_calories += food_calories
            total_proteins += food_proteins
            total_carbs += food_carbs
            total_fats += food_fats
        
        return {
            'student_data': {
                'age': age,
                'bmr': round(bmr, 1),
                'daily_calories': round(daily_calories, 1),
                'meal_calories_target': round(meal_calories, 1)
            },
            'personalized_foods': personalized_foods,
            'totals': {
                'calories': round(total_calories, 1),
                'proteins': round(total_proteins, 1),
                'carbs': round(total_carbs, 1),
                'fats': round(total_fats, 1)
            },
            'portion_multiplier': round(portion_multiplier, 2)
        }
    
    @staticmethod
    def validate_student_biometric_data(student_data: Dict) -> List[str]:
        """
        Validar que los datos biométricos del estudiante sean válidos
        """
        errors = []
        
        if not student_data.get('weight') or student_data['weight'] <= 0:
            errors.append("Peso del estudiante requerido y debe ser mayor a 0")
            
        if not student_data.get('height') or student_data['height'] <= 0:
            errors.append("Altura del estudiante requerida y debe ser mayor a 0")
            
        if not student_data.get('birth_date'):
            errors.append("Fecha de nacimiento del estudiante requerida")
            
        if not student_data.get('gender') or student_data['gender'] not in ['M', 'F']:
            errors.append("Género del estudiante requerido (M o F)")
            
        # Validar rangos razonables
        if student_data.get('weight') and (student_data['weight'] < 10 or student_data['weight'] > 150):
            errors.append("Peso debe estar entre 10 y 150 kg")
            
        if student_data.get('height') and (student_data['height'] < 50 or student_data['height'] > 200):
            errors.append("Altura debe estar entre 50 y 200 cm")
            
        return errors