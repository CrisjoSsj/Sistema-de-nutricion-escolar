import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas por rol
import SuperadminDashboard from './pages/SuperadminDashboard';
import NutritionistDashboard from './pages/NutritionistDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';

// Páginas adicionales
import InstitutionsPage from './pages/InstitutionsPage';
import UsersPage from './pages/UsersPage';
import StudentsPage from './pages/StudentsPage';
import MenusPage from './pages/MenusPage';
import ConsumptionPage from './pages/ConsumptionPage';
import ReportsPage from './pages/ReportsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Verde para tema de nutrición
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FF9800', // Naranja para complementar
      light: '#FFB74D',
      dark: '#E65100',
    },
    background: {
      default: '#F8F9FA',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

const AppContent: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>; // Aquí puedes poner un componente de loading más bonito
  }

  const getDashboardComponent = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'superadmin':
        return <SuperadminDashboard />;
      case 'nutritionist':
        return <NutritionistDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" replace />} 
      />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              {getDashboardComponent()}
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/institutions" 
        element={
          <ProtectedRoute requiredRole="superadmin">
            <DashboardLayout>
              <InstitutionsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/users" 
        element={
          <ProtectedRoute requiredRole={['superadmin', 'nutritionist']}>
            <DashboardLayout>
              <UsersPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/students" 
        element={
          <ProtectedRoute requiredRole={['superadmin', 'nutritionist']}>
            <DashboardLayout>
              <StudentsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/menus" 
        element={
          <ProtectedRoute requiredRole={['superadmin', 'nutritionist', 'student']}>
            <DashboardLayout>
              <MenusPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/consumption" 
        element={
          <ProtectedRoute requiredRole={['nutritionist', 'student']}>
            <DashboardLayout>
              <ConsumptionPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute requiredRole={['superadmin', 'nutritionist', 'parent']}>
            <DashboardLayout>
              <ReportsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
