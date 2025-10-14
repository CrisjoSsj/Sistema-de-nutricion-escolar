export type UserRole = 'superadmin' | 'nutritionist' | 'student' | 'parent';

export type Gender = 'M' | 'F';

export type MealType = 'breakfast' | 'lunch' | 'snack';

export type FoodGroup = 'proteins' | 'carbohydrates' | 'vegetables' | 'fruits' | 'dairy' | 'fats';

export type ConsumptionStatus = 'consumed' | 'rejected' | 'partial';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  institution_id?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Institution {
  id: number;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: number;
  user_id: number;
  student_code: string;
  birth_date: string;
  gender: Gender;
  weight?: number;
  height?: number;
  grade: string;
  section?: string;
  allergies?: string;
  special_diet?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Food {
  id: number;
  name: string;
  food_group: FoodGroup;
  calories_per_100g: number;
  proteins_per_100g: number;
  carbs_per_100g: number;
  fats_per_100g: number;
  base_portion_g: number;
  created_at: string;
  updated_at: string;
}

export interface Menu {
  id: number;
  name: string;
  description?: string;
  meal_type: MealType;
  institution_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  foods?: Food[];
}

export interface PersonalizedFood {
  food_id: number;
  food_name: string;
  food_group: FoodGroup;
  base_portion_g: number;
  calculated_portion_g: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export interface PersonalizedMenu {
  menu: Menu;
  student_id: number;
  personalized_foods: PersonalizedFood[];
  totals: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
  portion_multiplier: number;
}

export interface Consumption {
  id: number;
  student_id: number;
  menu_id: number;
  consumption_date: string;
  meal_type: MealType;
  foods_consumed: Array<{
    food_id: number;
    status: ConsumptionStatus;
    portion_consumed_g: number;
  }>;
  created_at: string;
  student?: Student;
  menu?: Menu;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface DashboardStats {
  total_students: number;
  total_menus: number;
  daily_consumption_rate: number;
  weekly_consumption_trend: Array<{
    date: string;
    consumption_rate: number;
  }>;
  food_group_consumption: Array<{
    food_group: FoodGroup;
    consumption_percentage: number;
  }>;
}

export interface NutritionReport {
  student_id: number;
  student_name: string;
  period: {
    start_date: string;
    end_date: string;
  };
  consumption_summary: {
    total_meals: number;
    consumed_meals: number;
    consumption_rate: number;
  };
  nutrition_summary: {
    average_calories: number;
    average_proteins: number;
    average_carbs: number;
    average_fats: number;
  };
  food_group_analysis: Array<{
    food_group: FoodGroup;
    consumption_frequency: number;
    recommended_frequency: number;
    status: 'good' | 'warning' | 'critical';
  }>;
  alerts: string[];
  recommendations: string[];
}