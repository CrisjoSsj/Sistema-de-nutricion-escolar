import React from 'react';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
  type = 'danger', // 'danger', 'warning', 'info'
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  isLoading = false
}) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'danger': return '⚠️';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '❓';
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger': return 'btn btn-danger';
      case 'warning': return 'btn btn-warning';
      case 'info': return 'btn btn-primary';
      default: return 'btn btn-primary';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon">{getIcon()}</div>
          <h3 className="modal-title">{title}</h3>
        </div>
        
        <div className="modal-body">
          <p className="confirm-message">{message}</p>
        </div>
        
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button 
            type="button" 
            className={getConfirmButtonClass()}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-small"></span>
                Procesando...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook para manejar modales de confirmación
export function useConfirmModal() {
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'danger',
    onConfirm: null,
    isLoading: false
  });

  const showConfirm = ({
    title = '¿Estás seguro?',
    message = 'Esta acción no se puede deshacer.',
    type = 'danger',
    onConfirm
  }) => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        title,
        message,
        type,
        onConfirm: async () => {
          setModalState(prev => ({ ...prev, isLoading: true }));
          try {
            if (onConfirm) await onConfirm();
            resolve(true);
          } catch (error) {
            resolve(false);
          } finally {
            setModalState(prev => ({ ...prev, isOpen: false, isLoading: false }));
          }
        },
        isLoading: false
      });
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    modalState,
    showConfirm,
    closeModal
  };
}