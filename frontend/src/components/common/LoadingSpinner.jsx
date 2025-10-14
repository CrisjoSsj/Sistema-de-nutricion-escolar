import React from 'react';

export default function LoadingSpinner({ size = 'medium', message = 'Cargando...' }) {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium', 
    large: 'spinner-large'
  };

  return (
    <div className="loading-container">
      <div className={`loading-spinner ${sizeClasses[size]}`}>
        <div className="spinner-circle"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}

// Componente para skeleton loading
export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-text-group">
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-text skeleton-subtitle"></div>
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-text skeleton-line"></div>
        <div className="skeleton-text skeleton-line short"></div>
        <div className="skeleton-text skeleton-line"></div>
      </div>
    </div>
  );
}

// Loading para listas
export function SkeletonList({ items = 3 }) {
  return (
    <div className="skeleton-list">
      {Array.from({ length: items }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}