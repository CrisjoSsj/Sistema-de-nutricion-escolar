import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import Footer from '../../components/common/Footer.jsx';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await login(formData);
      
      if (result.success && result.user) {
        // Redirigir según el rol del usuario
        switch (result.user.rol) {
          case 'admin':
            navigate('/admin');
            break;
          case 'rector':
            navigate('/rector');
            break;
          case 'nutricionista':
            navigate('/nutritionist');
            break;
          case 'padre':
            navigate('/parent');
            break;
          case 'estudiante':
            navigate('/student');
            break;
          default:
            navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <main className="main-content login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            🍎
          </div>
          <h1 className="login-title">Sistema de Nutrición Escolar</h1>
          <p className="login-subtitle">
            Ingresa tus credenciales para acceder al sistema
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="label label-required">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input ${error ? 'input-error' : ''}`}
              placeholder="usuario@ejemplo.com"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label label-required">
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`input ${error ? 'input-error' : ''}`}
                placeholder="••••••••"
                required
                disabled={isLoading}
                style={{ paddingRight: '40px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--gray-500)'
                }}
                disabled={isLoading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div style={{ marginTop: 'var(--spacing-6)', textAlign: 'center' }}>
          <p className="text-sm text-gray-600">
            Usuarios de prueba:
          </p>
          <div style={{ marginTop: 'var(--spacing-2)' }}>
            <div className="text-xs text-gray-500">
              <strong>Admin:</strong> admin@sistema.cl / admin123
            </div>
            <div className="text-xs text-gray-500">
              <strong>Nutricionista:</strong> nutricionista1@sistema.cl / nutri123
            </div>
            <div className="text-xs text-gray-500">
              <strong>Rector:</strong> rector1@sistema.cl / rector123
            </div>
            <div className="text-xs text-gray-500">
              <strong>Padre:</strong> juan.perez@email.com / padre123
            </div>
            <div className="text-xs text-gray-500">
              <strong>Estudiante:</strong> ana.martinez@email.com / estudiante123
            </div>
          </div>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
}