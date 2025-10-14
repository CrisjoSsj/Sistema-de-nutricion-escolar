# Los modelos ahora están definidos en Supabase
# Este archivo se mantiene para compatibilidad y puede contener
# funciones auxiliares para trabajar con los datos

from typing import Dict, Any
from datetime import datetime

class UserModel:
    """Funciones auxiliares para trabajar con usuarios"""
    
    @staticmethod
    def format_user_response(user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Formatear datos de usuario para respuesta"""
        return {
            'id': user_data['id'],
            'email': user_data['email'],
            'first_name': user_data['first_name'],
            'last_name': user_data['last_name'],
            'role': user_data['role'],
            'institution_id': user_data.get('institution_id'),
            'is_active': user_data['is_active'],
            'created_at': user_data['created_at'],
            'updated_at': user_data['updated_at']
        }

class StudentModel:
    """Funciones auxiliares para trabajar con estudiantes"""
    
    @staticmethod
    def format_student_response(student_data: Dict[str, Any]) -> Dict[str, Any]:
        """Formatear datos de estudiante para respuesta"""
        return {
            'id': student_data['id'],
            'user_id': student_data['user_id'],
            'student_code': student_data['student_code'],
            'birth_date': student_data['birth_date'],
            'gender': student_data['gender'],
            'weight': student_data.get('weight'),
            'height': student_data.get('height'),
            'grade': student_data['grade'],
            'section': student_data.get('section'),
            'allergies': student_data.get('allergies'),
            'special_diet': student_data.get('special_diet'),
            'is_active': student_data['is_active'],
            'created_at': student_data['created_at'],
            'updated_at': student_data['updated_at']
        }