import { useAuth } from '../context/AuthContext.jsx';
import Footer from '../components/common/Footer.jsx';

export default function TestPage() {
  const { user, isAuthenticated, isLoading, error } = useAuth();

  return (
    <div className="page-container">
      <main className="main-content" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🔧 Página de Prueba - Autenticación</h1>
      
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Estado de la Autenticación:</h2>
        <p><strong>isLoading:</strong> {isLoading ? 'true' : 'false'}</p>
        <p><strong>isAuthenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
        <p><strong>error:</strong> {error || 'null'}</p>
      </div>

      <div style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Datos del Usuario:</h2>
        <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div style={{ backgroundColor: '#f0fff0', padding: '20px', borderRadius: '8px' }}>
        <h2>Información de localStorage:</h2>
        <p><strong>Token:</strong> {localStorage.getItem('auth_token') ? 'Existe' : 'No existe'}</p>
        <p><strong>User Data:</strong></p>
        <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
          {localStorage.getItem('user_data') || 'null'}
        </pre>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <a href="/login" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Ir al Login
        </a>
        <span style={{ margin: '0 10px' }}>|</span>
        <a href="/" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
          Ir al Home
        </a>
      </div>
      </main>

      <Footer />
    </div>
  );
}