import React from 'react';

export default function ErrorState({ 
  type = 'general',
  title,
  message,
  onRetry,
  showHome = true 
}) {
  const getErrorConfig = () => {
    switch (type) {
      case '404':
        return {
          icon: '🔍',
          title: title || 'Página no encontrada',
          message: message || 'La página que buscas no existe o ha sido movida.',
          suggestions: ['Verifica la URL', 'Regresa al inicio', 'Usa el menú de navegación']
        };
      case '500':
        return {
          icon: '⚠️',
          title: title || 'Error del servidor',
          message: message || 'Algo salió mal en nuestros servidores. Estamos trabajando para solucionarlo.',
          suggestions: ['Recarga la página', 'Intenta más tarde', 'Contacta soporte si persiste']
        };
      case 'network':
        return {
          icon: '📡',
          title: title || 'Sin conexión',
          message: message || 'No pudimos conectar con el servidor. Verifica tu conexión a internet.',
          suggestions: ['Verifica tu conexión', 'Recarga la página', 'Intenta más tarde']
        };
      case 'empty':
        return {
          icon: '📋',
          title: title || 'No hay datos',
          message: message || 'No encontramos información para mostrar.',
          suggestions: []
        };
      default:
        return {
          icon: '❌',
          title: title || 'Algo salió mal',
          message: message || 'Ocurrió un error inesperado.',
          suggestions: ['Recarga la página', 'Intenta más tarde']
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className="error-state">
      <div className="error-content">
        <div className="error-icon">{config.icon}</div>
        <h3 className="error-title">{config.title}</h3>
        <p className="error-message">{config.message}</p>
        
        {config.suggestions.length > 0 && (
          <div className="error-suggestions">
            <p className="suggestions-title">Puedes intentar:</p>
            <ul className="suggestions-list">
              {config.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="error-actions">
          {onRetry && (
            <button className="btn btn-primary" onClick={onRetry}>
              🔄 Reintentar
            </button>
          )}
          {showHome && (
            <button 
              className="btn btn-outline"
              onClick={() => window.location.href = '/'}
            >
              🏠 Ir al inicio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Componente específico para estados vacíos
export function EmptyState({ 
  icon = '📋',
  title = 'No hay elementos',
  message = 'No se encontraron elementos para mostrar.',
  actionText,
  onAction,
  illustration
}) {
  return (
    <div className="empty-state">
      <div className="empty-content">
        {illustration ? (
          <div className="empty-illustration">{illustration}</div>
        ) : (
          <div className="empty-icon">{icon}</div>
        )}
        <h3 className="empty-title">{title}</h3>
        <p className="empty-message">{message}</p>
        
        {actionText && onAction && (
          <button className="btn btn-primary empty-action" onClick={onAction}>
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}