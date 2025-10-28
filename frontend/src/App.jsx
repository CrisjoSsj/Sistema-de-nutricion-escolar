import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { SchoolProvider } from './context/SchoolContext.jsx';

// Estilos
import './styles/globals.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/enhanced-animations.css';
import './styles/enhanced-utilities.css';
import './styles/enhanced-forms.css';

// Páginas principales
import HomePagePublic from './pages/public/home.jsx';
import LoginPage from './pages/public/LoginPage.jsx';
import DashboardPage from './pages/public/DashboardPage.jsx';

// Páginas de roles específicos
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AdminUsers from './pages/admin/Users.jsx';
import AdminSchools from './pages/admin/Schools.jsx';
import AdminMenus from './pages/admin/Menus.jsx';
import AdminReports from './pages/admin/Reports.jsx';
import AdminSettings from './pages/admin/Settings.jsx';
import NutritionistDashboard from './pages/nutritionist/Dashboard.jsx';
import NutritionistMenus from './pages/nutritionist/Menus.jsx';
import NutritionistFoods from './pages/nutritionist/Foods.jsx';
import NutritionistNutrition from './pages/nutritionist/Nutrition.jsx';
import NutritionistFeedback from './pages/nutritionist/Feedback.jsx';
import NutritionistReports from './pages/nutritionist/Reports.jsx';

// Páginas de Padres
import ParentDashboard from './pages/parent/Dashboard.jsx';
import ParentMenus from './pages/parent/Menus.jsx';
import ParentNutrition from './pages/parent/Nutrition.jsx';
import ParentFeedback from './pages/parent/Feedback.jsx';
import ParentNotifications from './pages/parent/Notifications.jsx';

// Páginas de Estudiantes
import StudentDashboard from './pages/student/Dashboard.jsx';
import StudentMenus from './pages/student/Menus.jsx';
import StudentFavorites from './pages/student/Favorites.jsx';
import StudentNutrition from './pages/student/Nutrition.jsx';
import StudentFeedback from './pages/student/Feedback.jsx';
import StudentProfile from './pages/student/Profile.jsx';

// Páginas de Rector
import RectorDashboard from './pages/rector/Dashboard.jsx';
import RectorSchoolProfile from './pages/rector/SchoolProfile.jsx';
import RectorStudents from './pages/rector/Students.jsx';
import RectorParents from './pages/rector/Parents.jsx';
import RectorStaff from './pages/rector/Staff.jsx';
import RectorReports from './pages/rector/Reports.jsx';

// Página de prueba
import EnhancedPageExample from './components/examples/EnhancedPageExample.jsx';
import ModernUIShowcase from './components/ModernUIShowcase.jsx';

// Componente para la página de inicio (redirección inteligente)
const HomePage = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-lg"></div>
        <p className="ml-2">Cargando...</p>
      </div>
    );
  }

  // Si el usuario está autenticado, redirigir a su dashboard
  if (isAuthenticated && user) {
    const dashboardPath = getDashboardPathForUser(user.rol);
    return <Navigate to={dashboardPath} replace />;
  }

  // Si no está autenticado, mostrar página pública
  return <HomePagePublic />;
};

// Función auxiliar para obtener la ruta del dashboard según el rol
const getDashboardPathForUser = (rol) => {
  switch (rol) {
    case 'admin': return '/admin';
    case 'nutricionista': return '/nutritionist';
    case 'padre': return '/parent';
    case 'estudiante': return '/student';
    case 'rector': return '/rector';
    default: return '/dashboard';
  }
};
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-lg"></div>
        <p className="ml-2">Verificando autenticación...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/example" element={<EnhancedPageExample />} />
          <Route path="/showcase" element={<ModernUIShowcase />} />
          
          {/* Rutas protegidas - Dashboard general */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas protegidas - Dashboards por rol */}
          
          {/* Rutas de Administrador */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute>
                <AdminUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/schools" 
            element={
              <ProtectedRoute>
                <AdminSchools />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/menus" 
            element={
              <ProtectedRoute>
                <AdminMenus />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/reports" 
            element={
              <ProtectedRoute>
                <AdminReports />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas de Nutricionista */}
          <Route 
            path="/nutritionist" 
            element={
              <ProtectedRoute>
                <NutritionistDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nutritionist/menus" 
            element={
              <ProtectedRoute>
                <NutritionistMenus />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nutritionist/foods" 
            element={
              <ProtectedRoute>
                <NutritionistFoods />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nutritionist/nutrition" 
            element={
              <ProtectedRoute>
                <NutritionistNutrition />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nutritionist/feedback" 
            element={
              <ProtectedRoute>
                <NutritionistFeedback />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nutritionist/reports" 
            element={
              <ProtectedRoute>
                <NutritionistReports />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas de Padres */}
          <Route 
            path="/parent" 
            element={
              <ProtectedRoute>
                <ParentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/menus" 
            element={
              <ProtectedRoute>
                <ParentMenus />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/nutrition" 
            element={
              <ProtectedRoute>
                <ParentNutrition />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/feedback" 
            element={
              <ProtectedRoute>
                <ParentFeedback />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/parent/notifications" 
            element={
              <ProtectedRoute>
                <ParentNotifications />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas de Estudiantes */}
          <Route 
            path="/student" 
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/menus" 
            element={
              <ProtectedRoute>
                <StudentMenus />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/favorites" 
            element={
              <ProtectedRoute>
                <StudentFavorites />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/nutrition" 
            element={
              <ProtectedRoute>
                <StudentNutrition />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/feedback" 
            element={
              <ProtectedRoute>
                <StudentFeedback />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/profile" 
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Rutas de Rector */}
          <Route 
            path="/rector" 
            element={
              <ProtectedRoute>
                <RectorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rector/school-profile" 
            element={
              <ProtectedRoute>
                <RectorSchoolProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rector/students" 
            element={
              <ProtectedRoute>
                <RectorStudents />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rector/parents" 
            element={
              <ProtectedRoute>
                <RectorParents />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rector/staff" 
            element={
              <ProtectedRoute>
                <RectorStaff />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/rector/reports" 
            element={
              <ProtectedRoute>
                <RectorReports />
              </ProtectedRoute>
            } 
          />
          
          {/* Ruta por defecto */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
  );
}

// Componente para manejar rutas no encontradas
const NotFoundPage = () => {
  const { isAuthenticated, user } = useAuth();

  // Si el usuario está autenticado, redirigir a su dashboard
  if (isAuthenticated && user) {
    const dashboardPath = getDashboardPathForUser(user.rol);
    return <Navigate to={dashboardPath} replace />;
  }

  // Si no está autenticado, redirigir al home
  return <Navigate to="/" replace />;
};

// Componente principal con providers anidados
function AppWithProviders() {
  return (
    <AuthProvider>
      <SchoolProvider>
        <App />
      </SchoolProvider>
    </AuthProvider>
  );
}

export default AppWithProviders;
