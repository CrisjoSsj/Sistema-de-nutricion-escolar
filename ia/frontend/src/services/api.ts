import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { LoginRequest, LoginResponse, User, Institution, Student, Menu, PersonalizedMenu, Consumption, DashboardStats, NutritionReport } from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string = 'http://localhost:8000/api/v1';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para agregar token de autenticación
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para manejar respuestas
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expirado o inválido
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Métodos de autenticación
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response: AxiosResponse<User> = await this.api.get('/auth/me');
    return response.data;
  }

  async refreshToken(): Promise<{ access_token: string; token_type: string }> {
    const response = await this.api.post('/auth/refresh');
    return response.data;
  }

  // Métodos para instituciones (Solo Superadmin)
  async getInstitutions(): Promise<Institution[]> {
    const response: AxiosResponse<Institution[]> = await this.api.get('/institutions');
    return response.data;
  }

  async createInstitution(institution: Omit<Institution, 'id' | 'created_at' | 'updated_at'>): Promise<Institution> {
    const response: AxiosResponse<Institution> = await this.api.post('/institutions', institution);
    return response.data;
  }

  async updateInstitution(id: number, institution: Partial<Institution>): Promise<Institution> {
    const response: AxiosResponse<Institution> = await this.api.put(`/institutions/${id}`, institution);
    return response.data;
  }

  async deleteInstitution(id: number): Promise<void> {
    await this.api.delete(`/institutions/${id}`);
  }

  // Métodos para usuarios
  async getUsers(institutionId?: number): Promise<User[]> {
    const params = institutionId ? { institution_id: institutionId } : {};
    const response: AxiosResponse<User[]> = await this.api.get('/users', { params });
    return response.data;
  }

  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'> & { password: string }): Promise<User> {
    const response: AxiosResponse<User> = await this.api.post('/users', user);
    return response.data;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response: AxiosResponse<User> = await this.api.put(`/users/${id}`, user);
    return response.data;
  }

  // Métodos para estudiantes
  async getStudents(institutionId?: number): Promise<Student[]> {
    const params = institutionId ? { institution_id: institutionId } : {};
    const response: AxiosResponse<Student[]> = await this.api.get('/students', { params });
    return response.data;
  }

  async getStudent(id: number): Promise<Student> {
    const response: AxiosResponse<Student> = await this.api.get(`/students/${id}`);
    return response.data;
  }

  async createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>): Promise<Student> {
    const response: AxiosResponse<Student> = await this.api.post('/students', student);
    return response.data;
  }

  async updateStudent(id: number, student: Partial<Student>): Promise<Student> {
    const response: AxiosResponse<Student> = await this.api.put(`/students/${id}`, student);
    return response.data;
  }

  // Métodos para menús
  async getMenus(institutionId?: number): Promise<Menu[]> {
    const params = institutionId ? { institution_id: institutionId } : {};
    const response: AxiosResponse<Menu[]> = await this.api.get('/menus', { params });
    return response.data;
  }

  async getMenu(id: number): Promise<Menu> {
    const response: AxiosResponse<Menu> = await this.api.get(`/menus/${id}`);
    return response.data;
  }

  async createMenu(menu: Omit<Menu, 'id' | 'created_at' | 'updated_at'>): Promise<Menu> {
    const response: AxiosResponse<Menu> = await this.api.post('/menus', menu);
    return response.data;
  }

  async updateMenu(id: number, menu: Partial<Menu>): Promise<Menu> {
    const response: AxiosResponse<Menu> = await this.api.put(`/menus/${id}`, menu);
    return response.data;
  }

  async deleteMenu(id: number): Promise<void> {
    await this.api.delete(`/menus/${id}`);
  }

  // Obtener menú personalizado para estudiante
  async getPersonalizedMenu(studentId: number, menuId: number): Promise<PersonalizedMenu> {
    const response: AxiosResponse<PersonalizedMenu> = await this.api.get(`/menus/${menuId}/personalized/${studentId}`);
    return response.data;
  }

  // Métodos para consumo
  async getConsumption(studentId?: number, date?: string): Promise<Consumption[]> {
    const params: any = {};
    if (studentId) params.student_id = studentId;
    if (date) params.date = date;
    
    const response: AxiosResponse<Consumption[]> = await this.api.get('/consumption', { params });
    return response.data;
  }

  async createConsumption(consumption: Omit<Consumption, 'id' | 'created_at' | 'student' | 'menu'>): Promise<Consumption> {
    const response: AxiosResponse<Consumption> = await this.api.post('/consumption', consumption);
    return response.data;
  }

  async updateConsumption(id: number, consumption: Partial<Consumption>): Promise<Consumption> {
    const response: AxiosResponse<Consumption> = await this.api.put(`/consumption/${id}`, consumption);
    return response.data;
  }

  // Métodos para reportes
  async getDashboardStats(institutionId?: number): Promise<DashboardStats> {
    const params = institutionId ? { institution_id: institutionId } : {};
    const response: AxiosResponse<DashboardStats> = await this.api.get('/reports/dashboard', { params });
    return response.data;
  }

  async getNutritionReport(studentId: number, startDate: string, endDate: string): Promise<NutritionReport> {
    const response: AxiosResponse<NutritionReport> = await this.api.get(`/reports/nutrition/${studentId}`, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data;
  }

  async getInstitutionReport(institutionId: number, startDate: string, endDate: string): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(`/reports/institution/${institutionId}`, {
      params: { start_date: startDate, end_date: endDate }
    });
    return response.data;
  }

  // Métodos para alimentos
  async getFoods(): Promise<any[]> {
    const response: AxiosResponse<any[]> = await this.api.get('/foods');
    return response.data;
  }

  async createFood(food: any): Promise<any> {
    const response: AxiosResponse<any> = await this.api.post('/foods', food);
    return response.data;
  }

  async updateFood(id: number, food: any): Promise<any> {
    const response: AxiosResponse<any> = await this.api.put(`/foods/${id}`, food);
    return response.data;
  }

  async deleteFood(id: number): Promise<void> {
    await this.api.delete(`/foods/${id}`);
  }
}

export const apiService = new ApiService();
export default apiService;